<template>
  <a-card title="Danh sách tour" :bordered="false">
    <div slot="extra">
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
      :dataSource="tours"
      :pagination="pagination"
      @change="onChange"
    >
      <template slot="price_default" slot-scope="record">
        <span>{{ record }} đồng</span>
      </template>
      <template slot="status" slot-scope="record">
        <a-tag :color="colorActive(record)">{{ record | status }}</a-tag>
      </template>
    </a-table>
  </a-card>
</template>

<script>
  import { isNotNull, colorActive, cleanAccents } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        pagination: {},
        keyword: null
      };
    },
    computed: {
      ...mapGetters("tour", ["loading", "tours"]),
      columns() {
        const columns = [
          {
            title: "Tên tour",
            dataIndex: "tour_name",
            sorter: true
          },
          {
            title: "Nơi đi",
            dataIndex: "from_place",
            sorter: true
          },
          {
            title: "Nơi đến",
            dataIndex: "to_place",
            sorter: true
          },
          {
            title: "Số người",
            dataIndex: "number_days",
            sorter: true
          },
          {
            title: "Giá (default)",
            dataIndex: "price_default",
            sorter: true,
            scopedSlots: { customRender: "price_default" }
          },
          {
            title: "Loại tour",
            dataIndex: "tour_category"
          },
          {
            title: "Công ty",
            dataIndex: "company"
          },
          {
            title: "Trạng thái",
            dataIndex: "is_active",
            sorter: true,
            scopedSlots: { customRender: "status" }
          }
        ];
        return columns;
      }
    },
    created() {
      this.fetch();
    },
    methods: {
      ...mapActions("tour", ["fetchTours"]),
      retrieveTours() {
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
        this.retrieveTours();
        this.keyword = null;
      },
      async fetch(params = {}) {
        const pagination = { ...this.pagination };
        const { data, config } = await this.fetchTours(params);
        window.history.replaceState("tours", "", config.url);
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
      colorActive(v) {
        return colorActive(v);
      }
    }
  };
</script>

<style></style>
