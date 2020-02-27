<template>
  <div>
    <card-table :title="title" :add-button="true" @open="open" @reset="reset" @search="search">
      <a-table
        :columns="columns"
        :loading="loading"
        :rowKey="record => record.id"
        :dataSource="users"
        :pagination="false"
        @change="onTableChange"
      >
        <template slot="status" slot-scope="record">
          <a-tag :color="colorActive(record)">{{ record | status }}</a-tag>
        </template>
        <template slot="active" slot-scope="record">
          <a-switch
            size="small"
            :key="record.id"
            :name="`u__${record.id}`"
            :checked="record.is_active"
            :defaultChecked="record.is_active"
            @click="onClickActive"
          >
          </a-switch>
        </template>
        <template slot="role_slug" slot-scope="record">
          <a-tag :color="tagColor(record)">
            {{ record }}
          </a-tag>
        </template>
        <template slot="action" slot-scope="record">
          <a-button type="dashed" size="small" @click="onUpdate(record.id)">
            <a-icon type="edit"></a-icon>
          </a-button>
          <a-divider type="vertical" />
          <a-popconfirm v-if="users.length" title="Bạn có chắc chắn?" @confirm="onDelete(record.id)">
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

    <drawer-table :visible="visible" :edit-mode="editMode" @saveForm="saveForm" @closeForm="closeForm">
      <a-form :form="form" layout="vertical" @submit.prevent="saveForm">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item class="mb-1" label="Họ tên" has-feedback>
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [
                      { required: true, message: 'Không được trống' },
                      {
                        whitespace: true,
                        message: 'Không được nhập khoảng trắng'
                      },
                      { max: 255, message: 'Tối đa 255 ký tự' }
                    ]
                  }
                ]"
                placeholder="Nhập họ tên"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item class="mb-1" label="Email" :has-feedback="!editMode">
              <a-input
                :disabled="editMode"
                v-decorator="[
                  'email',
                  {
                    rules: [
                      { type: 'email', message: 'Không đúng định dạng email' },
                      { required: true, message: 'Không được trống' },
                      { max: 255, message: 'Tối đa 255 ký tự' }
                    ]
                  }
                ]"
                placeholder="Nhập email"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item class="mb-1" label="Số điện thoại">
              <a-input
                v-decorator="[
                  'phone_number',
                  {
                    rules: [{ max: 12, message: 'Tối đa 12 ký tự' }]
                  }
                ]"
                placeholder="Nhập số điện thoại"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item class="mb-1" label="Mật khẩu" :has-feedback="!editMode">
              <a-input-password
                v-if="!editMode"
                v-decorator="[
                  'password',
                  {
                    rules: [
                      { required: true, message: 'Không được trống' },
                      {
                        whitespace: true,
                        message: 'Không được nhập khoảng trắng'
                      },
                      { min: 6, message: 'Tối thiểu 6 ký tự' },
                      { max: 255, message: 'Tối đa 255 ký tự' }
                    ]
                  }
                ]"
                placeholder="Nhập mật khẩu"
              />
              <a-alert v-else message="Bạn không thể cập nhật mật khẩu" type="info" showIcon />
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item class="mb-1" label="Địa chỉ">
          <a-textarea v-decorator="['address']" placeholder="Nhập địa chỉ" :autosize="{ minRows: 3, maxRows: 5 }" />
        </a-form-item>
        <a-form-item :gutter="16">
          <!-- <a-col :span="12">
            <a-upload
              accept="image/*"
              listType="picture-card"
              :action="handleUploadAvatar"
              :beforeUpload="beforeUpload"
              :showUploadList="false"
              @preview="handlePreview"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal
              :visible="previewVisible"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="previewImage" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-col> -->
          <a-col :span="12">
            <a-form-item class="mb-1" label="Quyền" has-feedback>
              <a-select
                v-decorator="[
                  'role_slug',
                  {
                    rules: [{ required: true, message: 'Vui lòng chọn quyền' }]
                  }
                ]"
                allowClear
                placeholder="Chọn quyền"
              >
                <a-select-option v-for="role in roles" :key="role.id" :value="role.slug">{{ role.role_name }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item class="mb-1" label="Active">
              <a-switch v-decorator="['is_active']" v-model="checked"> </a-switch>
            </a-form-item>
          </a-col>
        </a-form-item>
      </a-form>
    </drawer-table>
  </div>
</template>

<script>
  import { colorActive, tagColor, cleanAccents, convertOrderBy } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  import CardTable from "@/components/card/CardTable.vue";
  import PaginationTable from "@/components/pagination/PaginationTable";
  import DrawerTable from "@/components/drawer/DrawerTable";
  export default {
    components: { CardTable, PaginationTable, DrawerTable },
    data() {
      return {
        title: "Danh sách tài khoản",
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
        updateId: "",
        //
        formItemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 16 }
        },
        checked: false,
        previewVisible: false,
        previewImage: "",
        fileList: [],
        imageUrl: ""
      };
    },
    computed: {
      ...mapGetters("user", ["loading", "roles", "users", "getUserById"]),
      columns() {
        const columns = [
          {
            title: "#No",
            customRender: (text, record, index) => ++index
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
            scopedSlots: { customRender: "active" }
          },
          {
            title: "Quyền",
            dataIndex: "role_slug",
            scopedSlots: { customRender: "role_slug" }
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
      this.fetchRoles();
      this.initForm();
    },
    methods: {
      ...mapActions("user", ["fetchRoles", "fetchUsers", "createUser", "updateUser", "updateActiveUser", "deleteUser"]),
      async fetchData(params = {}) {
        const pagination = { ...this.pagination };
        const { data, config } = await this.fetchUsers(params);
        pagination.total = data.meta.total;
        pagination.pageSize = data.meta.per_page;
        pagination.current = data.meta.current_page;
        this.pagination = pagination;
        window.history.replaceState("users", "", config.url);
      },
      onTableChange(pagination, filters, sorter) {
        const pager = { ...this.pagination };
        const orderBy = convertOrderBy(sorter.order);
        const params = this.setParams(pager.current, pager.pageSize, sorter.field, orderBy, this.q);
        this.fetchData(params);
        this.sorter = sorter;
      },
      onShowSizeChange({ current, pageSize }) {
        this.handleChangePagination(current, pageSize);
      },
      onChange({ page, pageSize }) {
        this.handleChangePagination(page, pageSize);
      },
      handleChangePagination(page, pageSize) {
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
      onClickActive(is_active, e) {
        const id = +e.target.name.replace("u__", "");
        const user = { id, values: { is_active } };
        this.updateActiveUser(user);
      },
      tagColor(value) {
        return tagColor(value);
      },
      colorActive(value) {
        return colorActive(value);
      },
      open() {
        this.editMode = false;
        this.visible = true;
      },
      onUpdate(userId) {
        // const { id, role_name } = this.getUserById(userId);
        // this.form.setFieldsValue({ role_name });
        // this.updateId = id;
        // this.visible = this.editMode = true;
      },
      onDelete(userId) {
        this.deleteUser(userId);
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
              this.createUser(values);
              this.closeForm();
              this.reset();
            } else {
              this.updateUser({
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
