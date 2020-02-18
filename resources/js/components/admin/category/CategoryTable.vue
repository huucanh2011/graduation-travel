<template>
  <div>
    <h3>Danh sách loại tour</h3>

    <div class="nav-table-data">
      <div>
        <a-button type="primary" icon="plus" @click="onOpen">Thêm</a-button>
        <a-button
          icon="sync"
          :style="{ marginLeft: '5px' }"
          @click="clearAll"
        ></a-button>
        <!-- <a-button icon="file-excel" :style="{ marginLeft: '5px' }">Export</a-button> -->
      </div>
      <a-input-search
        placeholder="Tìm kiếm..."
        :style="{ maxWidth: '200px' }"
        v-model="keyword"
        @search="onSearch"
      />
    </div>

    <a-table
      :columns="columns"
      :loading="isLoading"
      :rowKey="record => record.id"
      :dataSource="categories"
      :pagination="pagination"
      @change="handleTableChange"
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
          @confirm="() => onDelete(record.id)"
        >
          <a-button type="dashed" size="small">
            <a-icon type="delete"></a-icon>
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
  import IsEmptyObject from "@/helpers/IsEmptyObject";
  import { vp, isNotNull, cleanAccents } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        pagination: {},
        keyword: ""
      };
    },
    created() {
      this.fetch();
    },
    computed: {
      ...mapGetters("category", ["categories", "dataCache", "isLoading"]),
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
          },
          {
            title: "Created at",
            dataIndex: "created_at",
            sorter: true,
            width: "15%"
          },
          {
            title: "Updated at",
            dataIndex: "updated_at",
            sorter: true,
            width: "15%"
          },
          {
            title: "Tùy chọn",
            key: "action",
            width: "25%",
            align: "center",
            scopedSlots: { customRender: "action" }
          }
        ];
        return columns;
      }
    },
    watch: {
      keyword(val) {
        return val;
      }
    },
    methods: {
      ...mapActions("category", [
        "FETCH_CATEGORIES",
        "GET_CATEGORY",
        "DELETE_CATEGORY"
      ]),
      onOpen() {
        this.$emit("openDrawerCategory", true);
      },
      async onUpdate(categoryId) {
        vp.$message.loading("Waiting...", 0.5);
        await this.GET_CATEGORY(categoryId);
        this.$emit("setFormCategory", this.dataCache, categoryId, true, true);
      },
      onDelete(categoryId) {
        this.DELETE_CATEGORY(categoryId);
        this.fetch(1);
      },
      onSearch(value, event) {
        console.log(value);

        if (isNotNull(value)) {
          let params = {
            sortBy: "",
            orderBy: "",
            keyword: value
          };
          this.fetch(1, params);
          this.keyword = value;
        }
      },
      clearAll() {
        this.fetch(1);
        this.keyword = "";
      },
      async fetch(page = 1, params = {}) {
        const payload = {
          page: page,
          params: params
        };
        const { data, config } = await this.FETCH_CATEGORIES(payload);
        window.history.replaceState("categories", "", config.url);
        const pagination = { ...this.pagination };
        pagination.total = data.meta.total;
        pagination.pageSize = data.meta.per_page;
        pagination.current = page;
        this.pagination = pagination;
      },
      handleTableChange(pagination, filters, sorter) {
        let params;
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        if (!IsEmptyObject(sorter)) {
          params = {
            sortBy: sorter.field,
            orderBy: sorter.order === "ascend" ? "asc" : "desc",
            keyword: this.keyword
          };
        } else {
          params = {
            keyword: this.keyword
          };
        }
        this.fetch(pager.current, params);
      }
    }
  };
</script>

<style>
  .nav-table-data {
    margin: 10px 0 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
</style>
