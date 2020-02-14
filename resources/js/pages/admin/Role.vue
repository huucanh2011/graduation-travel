<template>
  <div>
    <h3>Danh sách quyền</h3>

    <div class="nav-table-data">
      <a-button type="primary" icon="plus" @click="createRole">Thêm</a-button>
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
        <a-button
          type="dashed"
          size="small"
          @click.prevent="updateRole(record.id)"
        >
          <a-icon type="edit"></a-icon>
        </a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="roles.length"
          title="Bạn có chắc chắn?"
          @confirm="() => onDelete(record.id)"
        >
          <a-button type="dashed" size="small">
            <a-icon type="delete"></a-icon>
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>

    <app-drawer
      :title-drawer="titleDrawer"
      :visible="visible"
      @closeDrawer="handleCloseDrawer"
      @submitDrawer="handleSubmit"
    >
      <div slot="form-role">
        <a-form
          :form="form"
          layout="vertical"
          @submit.prevent="handleSubmit"
          hideRequiredMark
        >
          <a-form-item label="Tên quyền">
            <a-input
              v-decorator="[
                'role_name',
                {
                  rules: [
                    { required: true, message: 'Tên quyền không được trống!' },
                    { max: 255, message: 'Tên quyền tối đa 255 ký tự' }
                  ]
                }
              ]"
              placeholder="Vui lòng nhập tên quyền"
            />
          </a-form-item>
        </a-form>
      </div>
    </app-drawer>
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
  import { vp } from "@/helpers/prototype";

  export default {
    data() {
      return {
        pagination: {},
        columns,
        editMode: false,
        visible: false,
        titleDrawer: "",
        roleId: ""
      };
    },
    computed: {
      ...mapGetters("role", ["roles", "roleEdit", "isLoading"])
    },
    created() {
      this.fetch();
      this.initForm();
    },
    watch: {
      roleId(val) {
        return this.roleEdit.id;
      }
    },
    methods: {
      ...mapActions("role", [
        "FETCH_ROLES",
        "CREATE_ROLE",
        "UPDATE_ROLE",
        "GET_ROLE",
        "CLEAR_ROLE",
        "DELETE_ROLE"
      ]),

      initForm() {
        this.form = this.$form.createForm(this, { name: "form_role" });
        this.form.getFieldDecorator("role_name", { initialValue: "" });
      },

      createRole() {
        this.visible = true;
        this.titleDrawer = "Thêm mới quyền";
        vp.$notification.destroy();
      },

      async updateRole(roleId) {
        await this.GET_ROLE(roleId);
        this.visible = true;
        this.editMode = true;
        this.titleDrawer = "Cập nhật quyền";
        this.roleId = roleId;
        this.form.setFieldsValue({
          role_name: this.roleEdit.role_name
        });
        vp.$notification.destroy();
      },

      handleCloseDrawer(e) {
        this.visible = this.editMode = e;
        this.form.resetFields();
        this.CREATE_ROLE();
      },

      async fetch(page = 1) {
        const { data } = await this.FETCH_ROLES(page);
        const pagination = { ...this.pagination };
        pagination.total = data.meta.total;
        pagination.pageSize = data.meta.per_page;
        pagination.current = page;
        this.pagination = pagination;
      },

      handleSubmit() {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.editMode) {
              this.CREATE_ROLE(values);
            } else {
              this.UPDATE_ROLE({
                id: this.roleId,
                values
              });
            }
            this.handleCloseDrawer(false);
            this.fetch(1);
          }
        });
      },

      onDelete(roleId) {
        this.DELETE_ROLE(roleId);
        this.fetch(1);
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
