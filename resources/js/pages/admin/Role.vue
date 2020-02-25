<template>
  <div>
    <card-table
      :title="title"
      :add-button="true"
      @open="open"
      @reset="reset"
      @search="search"
    >
      <a-table
        :columns="columns"
        :loading="loading"
        :rowKey="record => record.id"
        :dataSource="roles"
        :pagination="false"
        @change="onTableChange"
      >
        <template slot="slug" slot-scope="record">
          <span>
            <a-tag :color="tagColor(record)">{{ record }}</a-tag>
          </span>
        </template>
        <template slot="action" slot-scope="record">
          <a-button type="dashed" size="small" @click="onUpdate(record.id)">
            <a-icon type="edit"></a-icon>
          </a-button>
          <a-divider type="vertical" />
          <a-popconfirm
            v-if="roles.length"
            title="Bạn có chắc chắn?"
            @confirm="onDelete(record.id)"
          >
            <a-button type="dashed" size="small">
              <a-icon type="delete"></a-icon>
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
      <pagination-table
        :total="pagination.total"
        :pageSize="pagination.pageSize"
        :current="pagination.current"
        @onShowSizeChange="onShowSizeChange"
        @onChange="onChange"
      />
    </card-table>

    <drawer-table
      :visible="visible"
      :edit-mode="editMode"
      @saveForm="saveForm"
      @closeForm="closeForm"
    >
      <a-form :form="form" layout="vertical" @submit.prevent="saveForm">
        <a-form-item label="Tên quyền">
          <a-input
            v-decorator="[
              'role_name',
              {
                rules: [
                  { required: true, message: 'Không được trống' },
                  { max: 255, message: 'Tối đa 255 ký tự' }
                ]
              }
            ]"
            placeholder="Nhập tên quyền"
          />
        </a-form-item>
      </a-form>
    </drawer-table>
  </div>
</template>

<script>
  import {
    colorActive,
    tagColor,
    cleanAccents,
    convertOrderBy
  } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  import CardTable from "@/components/card/CardTable.vue";
  import PaginationTable from "@/components/pagination/PaginationTable";
  import DrawerTable from "@/components/drawer/DrawerTable";
  export default {
    components: { CardTable, PaginationTable, DrawerTable },
    data() {
      return {
        title: "Danh sách quyền",
        pagination: {
          total: 0,
          pageSize: 0,
          current: 1
        },
        sorter: {},
        q: "",
        //form
        visible: false,
        editMode: false,
        updateId: ""
      };
    },
    computed: {
      ...mapGetters("role", ["loading", "roles", "getRoleById"]),
      columns() {
        const columns = [
          {
            title: "#No",
            width: "10%",
            customRender: (text, record, index) => ++index
          },
          {
            title: "Tên quyền",
            dataIndex: "slug",
            sorter: true,
            scopedSlots: { customRender: "slug" }
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
    created() {
      this.fetchData();
      this.initForm();
    },
    methods: {
      ...mapActions("role", [
        "fetchRoles",
        "createRole",
        "updateRole",
        "deleteRole"
      ]),
      async fetchData(params = {}) {
        const pagination = { ...this.pagination };
        const { data, config } = await this.fetchRoles(params);
        pagination.total = data.meta.total;
        pagination.pageSize = data.meta.per_page;
        pagination.current = data.meta.current_page;
        this.pagination = pagination;
        window.history.replaceState("roles", "", config.url);
      },
      onTableChange(pagination, filters, sorter) {
        const pager = { ...this.pagination };
        const orderBy = convertOrderBy(sorter.order);
        const params = this.setParams(
          pager.current,
          pager.pageSize,
          sorter.field,
          orderBy,
          this.q
        );
        this.fetchData(params);
        this.sorter = sorter;
      },
      onShowSizeChange({ current, pageSize }) {
        this.onChangePagination(current, pageSize);
      },
      onChange({ page, pageSize }) {
        this.onChangePagination(page, pageSize);
      },
      onChangePagination(page, pageSize) {
        const sorter = { ...this.sorter };
        const q = this.q;
        const sortBy = sorter.field;
        const orderBy = convertOrderBy(sorter.order);
        const params = this.setParams(page, pageSize, sortBy, orderBy, q);
        this.fetchData(params);
      },
      setParams(page, pageSize, sortBy, orderBy, q) {
        return { page, pageSize, sortBy, orderBy, q };
      },
      search(value) {
        console.log(cleanAccents(value));
        if (value) {
          const pager = { ...this.pagination };
          const sorter = { ...this.sorter };
          const orderBy = convertOrderBy(sorter.order);
          const params = {
            page: pager.current,
            pageSize: pager.pageSize,
            sortBy: sorter.field,
            orderBy: orderBy,
            q: cleanAccents(value)
          };
          this.fetchData(params);
          this.q = cleanAccents(value);
        }
      },
      reset() {
        this.fetchData();
        this.pagination.current = 1;
        this.q = "";
      },
      onClickActive(checked, e) {
        const userId = +e.target.name.replace("p__", "");
        const permission = {
          id: userId,
          values: { is_active: checked }
        };
        this.updatePermission(permission);
      },
      onChangeRole(e) {
        const roleSlug = e.target.value;
        const userId = +e.target.name.replace("p__", "");
        const permission = {
          id: userId,
          values: { role_slug: roleSlug }
        };
        this.updatePermission(permission);
      },
      tagColor(value) {
        return tagColor(value);
      },
      open() {
        this.editMode = false;
        this.visible = true;
      },
      onUpdate(roleId) {
        const { id, role_name } = this.getRoleById(roleId);
        this.form.setFieldsValue({ role_name });
        this.updateId = id;
        this.visible = this.editMode = true;
      },
      onDelete(roleId) {
        this.deleteRole(roleId);
        this.fetchData();
      },
      //Handle with form
      initForm() {
        this.form = this.$form.createForm(this);
        this.form.getFieldDecorator("role_name", { initialValue: "" });
      },
      saveForm() {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.editMode) {
              this.createRole(values);
              this.closeForm();
              this.reset();
            } else {
              this.updateRole({
                id: this.updateId,
                values
              });
              this.closeForm();
            }
          }
        });
      },
      closeForm() {
        this.visible = this.editMode = false;
        this.form.resetFields();
      }
    }
  };
</script>

<style></style>
