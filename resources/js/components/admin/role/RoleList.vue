<template>
  <div>
    <h3>Danh sách quyền</h3>

    <div class="nav-table-data">
      <a-button type="primary" icon="plus" @click="addRole">Thêm</a-button>
      <a-input-search
        placeholder="Tìm kiếm..."
        style="width: 200px"
        @search="onSearch"
      />
    </div>

    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :loading="isLoading"
      :dataSource="roles"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template slot="createdAt" slot-scope="record">
        <span>{{ record | date }}</span>
      </template>

      <template slot="updatedAt" slot-scope="record">
        <span>{{ record | date }}</span>
      </template>

      <template slot="action" slot-scope="record">
        <a href="javascript:;" @click="updateRole(record)">Cập nhật</a>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="roles.length"
          title="Bạn có chắc chắn?"
          @confirm="() => onDelete(record.id)"
        >
          <a href="javascript:;">Xóa</a>
        </a-popconfirm>
      </template>
    </a-table>

    <create-drawer></create-drawer>
  </div>
</template>

<script>
  const columns = [
    {
      title: "Id",
      dataIndex: "id"
    },
    {
      title: "Tên quyền",
      dataIndex: "role_name"
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      scopedSlots: { customRender: "createdAt" }
    },
    {
      title: "Updated at",
      dataIndex: "updated_at",
      scopedSlots: { customRender: "updatedAt" }
    },
    {
      title: "Tùy chọn",
      key: "action",
      scopedSlots: { customRender: "action" }
    }
  ];
  import { mapGetters, mapActions } from "vuex";
  import CreateDrawer from "./CreateDrawer";
  // import UpdateDrawer from "./UpdateDrawer";
  import { vp } from "@/helpers/prototype";

  export default {
    components: {
      CreateDrawer
    },
    data() {
      return {
        pagination: {},
        columns,
        editMode: false
      };
    },
    computed: {
      ...mapGetters("role", ["roles", "isLoading"])
    },
    mounted() {
      this.fetch();
    },
    methods: {
      ...mapActions("role", ["FETCH_ROLES", "DELETE_ROLE"]),

      async fetch(page = 1) {
        const resp = await this.FETCH_ROLES(page);
        const pagination = { ...this.pagination };
        pagination.total = resp.data.meta.total;
        pagination.pageSize = resp.data.meta.per_page;
        this.pagination = pagination;
      },

      addRole() {
        eventBus.$emit("show-drawer", this.editMode);
        vp.$notification.destroy();
      },

      updateRole(role) {
        this.editMode = true;
        eventBus.$emit("show-drawer", this.editMode);
        eventBus.$emit("send-role", role);
      },

      onDelete(roleId) {
        this.DELETE_ROLE(roleId);
      },

      onSearch() {},

      handleTableChange(pagination, filters, sorter) {
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch(pagination.current);
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
