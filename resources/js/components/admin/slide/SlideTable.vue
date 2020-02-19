<template>
  <a-card title="Danh sách slide" :bordered="false">
    <div slot="extra">
      <a-button type="primary" icon="plus" @click="onOpen">Thêm</a-button>
      <a-button
        icon="sync"
        :style="{ marginLeft: '8px' }"
        @click="onReset"
      ></a-button>
      <a-input-search
        placeholder="Tìm kiếm..."
        v-model="keyword"
        @search="onSearch"
        style="margin-left: 8px; width: 250px;"
      />
    </div>

    <a-table
      :columns="columns"
      :loading="loading"
      :rowKey="record => record.id"
      :dataSource="slides"
      :pagination="pagination"
      @change="onChange"
    >
      <template slot="no" slot-scope="text, record, index">
        <strong>{{ ++index }}</strong>
      </template>
      <template slot="image" slot-scope="record">
        <span>
          {{ record }}
        </span>
      </template>
      <template slot="link" slot-scope="record">
        <router-link :to="record">
          Link to description
        </router-link>
      </template>
      <template slot="active" slot-scope="record">
        <a-checkbox
          @change="onChangeActive"
          :defaultChecked="record.is_active"
          :value="record.id"
        ></a-checkbox>
      </template>
      <template slot="action" slot-scope="record">
        <a-button type="dashed" size="small" @click="onUpdate(record.id)">
          <a-icon type="edit"></a-icon>
        </a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="slides.length"
          title="Bạn có chắc chắn?"
          @confirm="onDelete(record.id)"
        >
          <a-button type="dashed" size="small">
            <a-icon type="delete"></a-icon>
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </a-card>
</template>

<script>
  import { isNotNull, tagColor, cleanAccents } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        pagination: {},
        keyword: null
      };
    },
    computed: {
      ...mapGetters("slide", ["loading", "slides", "getSlideById"]),
      columns() {
        const columns = [
          {
            title: "#No",
            scopedSlots: { customRender: "no" }
          },
          {
            title: "Tiêu đề",
            dataIndex: "title",
            sorter: true
          },
          {
            title: "Hình",
            dataIndex: "image",
            align: "center",
            width: "30%",
            scopedSlots: { customRender: "image" }
          },
          {
            title: "Link",
            dataIndex: "link",
            scopedSlots: { customRender: "link" }
          },
          {
            title: "Active",
            align: "center",
            scopedSlots: { customRender: "active" }
          },
          {
            title: "Created at",
            dataIndex: "created_at",
            sorter: true
          },
          {
            title: "Tùy chọn",
            align: "center",
            scopedSlots: { customRender: "action" }
          }
        ];
        return columns;
      }
    },
    created() {
      this.fetch();
      eventBus.$on("retrieveSlides", this.retrieveSlides);
    },
    beforeDestroy() {
      eventBus.$off("retrieveSlides", this.retrieveSlides);
    },
    methods: {
      ...mapActions("slide", [
        "fetchSlides",
        "updateActiveSlide",
        "deleteSlide"
      ]),
      retrieveSlides() {
        this.fetch();
      },
      onOpen() {
        eventBus.$emit("openDrawerSlide", true);
      },
      onUpdate(slideId) {
        const roleUpdate = this.getSlideById(slideId);
        eventBus.$emit("setFormSlide", roleUpdate, slideId, true, true);
      },
      onDelete(slideId) {
        this.deleteSlide(slideId);
        this.fetch();
      },
      onSearch(value, event) {
        if (isNotNull(value)) {
          let params = {
            page: this.pagination.current,
            keyword: value
          };
          this.fetch(params);
          this.keyword = value;
        }
      },
      onReset() {
        this.retrieveSlides();
        this.keyword = null;
      },
      onChangeActive(e) {
        const slide = {
          id: e.target.value,
          values: { is_active: e.target.checked }
        };
        this.updateActiveSlide(slide);
      },
      async fetch(params = {}) {
        const pagination = { ...this.pagination };
        const { data, config } = await this.fetchSlides(params);
        window.history.replaceState("slides", "", config.url);
        pagination.total = data.meta.total;
        pagination.pageSize = data.meta.per_page;
        pagination.current = data.meta.current_page;
        this.pagination = pagination;
      },
      onChange(pagination, filters, sorter) {
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        let params = {
          page: pagination.current,
          sortBy: sorter.field,
          orderBy:
            sorter.order === "ascend"
              ? "asc"
              : sorter.order === "descend"
              ? "desc"
              : undefined,
          keyword: this.keyword
        };
        this.fetch(params);
      },
      tagColor(v) {
        return tagColor(v);
      }
    }
  };
</script>

<style></style>
