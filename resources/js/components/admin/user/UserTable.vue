<template>
  <div>
    <h3>Danh sách tài khoản</h3>

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
      :dataSource="users"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template slot="no" slot-scope="text, record, index">
        <strong>{{ ++index }}</strong>
      </template>
      <!-- <template slot="createdAt" slot-scope="record">
        <span>{{ record | date }}</span>
      </template>

      <template slot="updatedAt" slot-scope="record">
        <span>{{ record | date }}</span>
      </template> -->
      <template slot="status" slot-scope="record">
        <a-tag :color="record ? 'blue': 'red'">{{ record | status }}</a-tag>
      </template>
      <template slot="active" slot-scope="record">
        <a-switch :defaultChecked="record" size="small">
          <a-icon type="check" slot="checkedChildren" />
          <a-icon type="close" slot="unCheckedChildren" />
        </a-switch>
      </template>
      <template slot="action" slot-scope="record">
        <a-button type="dashed" size="small" @click="onUpdate(record.id)">
          <a-icon type="edit"></a-icon>
        </a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="users.length"
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
      ...mapGetters("user", ["users", "dataCache", "isLoading"]),
      columns() {
        const columns = [
          {
            title: "#No",
            scopedSlots: { customRender: "no" }
          },
          {
            title: "Họ tên",
            dataIndex: "name",
            sorter: true
          },
          {
            title: "Email",
            dataIndex: "email",
            sorter: true
          },
          {
            title: "Trạng thái",
            dataIndex: "is_active",
            key: "status",
            scopedSlots: { customRender: "status" }
          },
          {
            title: "Active",
            dataIndex: "is_active",
            key: "active",
            scopedSlots: { customRender: "active" }
          },
          {
            title: "Quyền",
            dataIndex: "role",
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
    watch: {
      keyword(val) {
        return val;
      }
    },
    methods: {
      ...mapActions("user", [
        "FETCH_USERS",
        "GET_USER",
        "UPDATE_USER",
        "DELETE_USER"
      ]),
      onOpen() {
        this.$emit("openDrawerUser", true);
      },
      async onUpdate(userId) {
        vp.$message.loading("Waiting...", 0.5);
        await this.GET_USER(userId);
        this.$emit("setFormUser", this.dataCache, userId, true, true);
      },
      onDelete(userId) {
        this.DELETE_USER(userId);
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
      onChangeActive(checked, id) {
        console.log(checked);
        console.log(id);
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
        const { data, config } = await this.FETCH_USERS(payload);
        window.history.replaceState("users", "", config.url);
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
