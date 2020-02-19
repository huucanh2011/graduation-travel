<template>
  <a-card title="Danh sách thể loại tour" :bordered="false">
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
      :dataSource="categories"
      :pagination="pagination"
      @change="onChange"
    >
      <template slot="no" slot-scope="text, record, index">
        <strong>{{ ++index }}</strong>
      </template>
      <template slot="action" slot-scope="record">
        <a-button type="dashed" size="small" @click="onUpdate(record.id)">
          <a-icon type="edit"></a-icon>
        </a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="categories.length"
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
  import { isNotNull, cleanAccents } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        pagination: {},
        keyword: null
      };
    },
    computed: {
      ...mapGetters("category", ["categories", "loading", "getCategoryById"]),
      columns() {
        const columns = [
          {
            title: "#No",
            width: "10%",
            scopedSlots: { customRender: "no" }
          },
          {
            title: "Tên thể loại",
            dataIndex: "cate_name",
            sorter: true
          },
          {
            title: "Slug",
            dataIndex: "slug",
            sorter: true
          },
          {
            title: "Tổng tour",
            dataIndex: "tours_count",
            align: "center"
          },
          {
            title: "Created at",
            dataIndex: "created_at",
            sorter: true
          },
          {
            title: "Updated at",
            dataIndex: "updated_at",
            sorter: true
          },
          {
            title: "Tùy chọn",
            key: "action",
            width: "20%",
            align: "center",
            scopedSlots: { customRender: "action" }
          }
        ];
        return columns;
      }
    },
    created() {
      this.fetch();
      eventBus.$on("retrieveCategories", this.retrieveCategories);
    },
    beforeDestroy() {
      eventBus.$off("retrieveCategories", this.retrieveCategories);
    },
    methods: {
      ...mapActions("category", ["fetchCategories", "deleteCategory"]),
      retrieveCategories() {
        this.fetch();
      },
      onOpen() {
        eventBus.$emit("openDrawerCategory", true);
      },
      onUpdate(categoryId) {
        const categoryUpdate = this.getCategoryById(categoryId);
        eventBus.$emit(
          "setFormCategory",
          categoryUpdate,
          categoryId,
          true,
          true
        );
      },
      onDelete(categoryId) {
        this.deleteCategory(categoryId);
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
        this.retrieveCategories();
        this.keyword = null;
      },
      async fetch(params = {}) {
        const { data, config } = await this.fetchCategories(params);
        window.history.replaceState("categories", "", config.url);
        const pagination = { ...this.pagination };
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
      }
    }
  };
</script>

<style></style>
