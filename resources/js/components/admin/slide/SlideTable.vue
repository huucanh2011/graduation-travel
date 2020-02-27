<template>
  <a-card title="Danh sách slide" :bordered="false">
    <div slot="extra">
      <a-button type="primary" icon="plus" @click="onOpen">Thêm</a-button>
      <a-button icon="sync" :style="{ marginLeft: '8px' }" @click="resetTable"></a-button>
      <a-input-search placeholder="Tìm kiếm..." v-model="q" @search="onSearch" style="margin-left: 8px; width: 250px;" />
    </div>

    <a-table
      :columns="columns"
      :loading="loading"
      :rowKey="record => record.id"
      :dataSource="slides"
      :pagination="pagination"
      @change="onChangeTable"
    >
      <img slot="image" slot-scope="record" :src="record.image" :alt="record.title" width="100%" />
      <a slot="link" slot-scope="record" :href="record">Chuyển đến link</a>
      <a-switch
        slot="active"
        slot-scope="record"
        size="small"
        :key="record.id"
        :name="`s__${record.id}`"
        :checked="record.is_active"
        :defaultChecked="record.is_active"
        @click="onClickActive"
      >
      </a-switch>
      <template slot="action" slot-scope="record">
        <a-button type="dashed" size="small" @click="onUpdate(record.id)">
          <a-icon type="edit"></a-icon>
        </a-button>
        <a-divider type="vertical" />
        <a-popconfirm v-if="slides.length" title="Bạn có chắc chắn?" @confirm="onDelete(record.id)">
          <a-button type="dashed" size="small">
            <a-icon type="delete"></a-icon>
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </a-card>
</template>

<script>
  import { isNotNull, publicPath } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        pagination: {
          style: { textAlign: "center" }
        },
        q: null
      };
    },
    computed: {
      ...mapGetters("slide", ["loading", "slides", "getSlideById"]),
      columns() {
        const columns = [
          {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            sorter: true
          },
          {
            title: "Hình",
            key: "image",
            align: "center",
            width: "20%",
            scopedSlots: { customRender: "image" }
          },
          {
            title: "Link",
            dataIndex: "link",
            key: "link",
            scopedSlots: { customRender: "link" }
          },
          {
            title: "Active",
            key: "active",
            align: "center",
            scopedSlots: { customRender: "active" }
          },
          {
            title: "Tùy chọn",
            key: "action",
            align: "center",
            scopedSlots: { customRender: "action" }
          }
        ];
        return columns;
      }
    },
    created() {
      this.fetchData();
      eventBus.$on("retrieveSlides", this.retrieveSlides);
    },
    beforeDestroy() {
      eventBus.$off("retrieveSlides", this.retrieveSlides);
    },
    methods: {
      ...mapActions("slide", ["fetchSlides", "updateActiveSlide", "deleteSlide"]),
      async fetchData(params = {}) {
        const pagination = { ...this.pagination };
        const { data, config } = await this.fetchSlides(params);
        window.history.replaceState("slides", "", config.url);
        pagination.total = data.meta.total;
        pagination.pageSize = data.meta.per_page;
        pagination.current = data.meta.current_page;
        this.pagination = pagination;
      },
      onChangeTable(pagination, filters, sorter) {
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        let params = {
          page: pagination.current,
          sortBy: sorter.field,
          orderBy: sorter.order === "ascend" ? "asc" : sorter.order === "descend" ? "desc" : undefined,
          q: this.q
        };
        this.fetchData(params);
      },
      onOpen() {
        eventBus.$emit("openDrawerSlide", true);
      },
      onUpdate(slideId) {
        const slideUpdate = this.getSlideById(slideId);
        eventBus.$emit("setFormSlide", slideUpdate, slideId, true, true);
      },
      onDelete(slideId) {
        this.deleteSlide(slideId);
        this.fetchData();
      },
      retrieveSlides() {
        this.fetchData();
      },
      resetTable() {
        this.retrieveSlides();
        this.q = null;
      },
      onSearch(q) {
        if (isNotNull(q)) {
          let params = {
            page: this.pagination.current,
            q: q
          };
          this.fetchData(params);
          this.q = q;
        }
      },
      onClickActive(checked, e) {
        const slideId = +e.target.name.replace("s__", "");
        const isActive = checked;
        const slide = {
          id: slideId,
          values: { is_active: isActive }
        };
        this.updateActiveSlide(slide);
      }
    }
  };
</script>

<style></style>
