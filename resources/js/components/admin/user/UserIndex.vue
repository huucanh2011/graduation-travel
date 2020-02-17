<template>
  <div>
    <user-table
      @setFormUser="handleSetFieldForm"
      @openDrawerUser="onOpen"
    ></user-table>

    <a-drawer
      :title="titleDrawer"
      :width="540"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{
        height: '100%'
      }"
    >
      <a-form :form="form" @submit.prevent="handleSubmitForm">
        <a-form-item v-bind="formItemLayout" label="Họ tên">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: 'Họ không được trống' },
                  { max: 255, message: 'Họ tên tối đa 255 ký tự' }
                ]
              }
            ]"
            placeholder="Vui lòng nhập họ tên"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Email">
          <a-input
            :disabled="editMode"
            v-decorator="[
              'email',
              {
                rules: [
                  { required: true, message: 'Email không được trống' },
                  { max: 255, message: 'Email tối đa 255 ký tự' }
                ]
              }
            ]"
            placeholder="Vui lòng nhập email"
          />
        </a-form-item>
        <a-form-item v-if="!editMode" v-bind="formItemLayout" label="Mật khẩu">
          <a-input-password
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Mật khẩu không được trống' },
                  { max: 255, message: 'Mật khẩu tối đa 255 ký tự' }
                ]
              }
            ]"
            placeholder="Vui lòng nhập mật khẩu"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Số điện thoại">
          <a-input
            v-decorator="[
              'phone_number',
              {
                rules: [{ max: 255, message: 'Số điện thoại tối đa 255 ký tự' }]
              }
            ]"
            placeholder="Vui lòng nhập số điện thoại"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Địa chỉ">
          <a-textarea
            v-decorator="[
              'address',
              {
                rules: [{ max: 255, message: 'Số điện thoại tối đa 255 ký tự' }]
              }
            ]"
            placeholder="Vui lòng nhập địa chỉ"
            :autosize="{ minRows: 2, maxRows: 4 }"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Quyền">
          <a-radio-group name="radioGroup" v-decorator="['role_id']">
            <a-radio v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.role_name }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Active">
          <a-switch @change="changeSwitch" v-decorator="['is_active']">
            <a-icon type="check" slot="checkedChildren" />
            <a-icon type="close" slot="unCheckedChildren" />
          </a-switch>
        </a-form-item>
        <div class="drawer-footer">
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            Hủy
          </a-button>
          <a-button type="primary" html-type="submit">Lưu</a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import UserTable from "./UserTable";

  export default {
    components: {
      UserTable
    },
    data() {
      return {
        formItemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 17 }
        },
        editMode: false,
        visible: false,
        userIdUpdate: ""
      };
    },
    computed: {
      ...mapGetters("user", ["roles"]),
      titleDrawer() {
        return this.editMode ? "Cập nhật tài khoản" : "Thêm mới tài khoản";
      },
    },
    created() {
      this.initForm();
      this.FETCH_ROLES();
    },
    beforeDestroy() {
      this.$off("openDrawerUser");
      this.$off("setFormRole");
    },
    methods: {
      ...mapActions("user", [
        "FETCH_ROLES",
        "CREATE_USER",
        "UPDATE_USER",
        "CLEAN_CACHE"
      ]),
      onOpen() {
        this.visible = true;
      },
      onClose() {
        this.visible = this.editMode = false;
        this.userIdUpdate = "";
        this.CLEAN_CACHE();
        this.form.resetFields();
      },
      initForm() {
        this.form = this.$form.createForm(this, { name: "form_user" });
        this.form.getFieldDecorator("name", { initialValue: "" });
        this.form.getFieldDecorator("email", { initialValue: "" });
        this.form.getFieldDecorator("password", { initialValue: "" });
        this.form.getFieldDecorator("phone_number", { initialValue: "" });
        this.form.getFieldDecorator("address", { initialValue: "" });
        this.form.getFieldDecorator("is_active", { initialValue: "" });
        this.form.getFieldDecorator("role_id", { initialValue: "" });
      },
      changeSwitch(checked) {
        console.log(checked);
        // this.isActive = checked;
      },
      handleSetFieldForm(data, userId, visible, editMode) {
        this.userIdUpdate = userId;
        console.log(data);
        this.form.setFieldsValue({
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          address: data.address,
          is_active: data.is_active,
          role_id: data.role_id
        });
        this.editMode = editMode;
        this.visible = visible;
      },
      handleSubmitForm() {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.editMode) {
              this.CREATE_USER(values);
            } else {
              this.UPDATE_USER({
                id: this.userIdUpdate,
                values
              });
            }
            this.onClose();
            console.log(values);
          }
        });
      },
      handleChange(value) {
        console.log(`selected ${value}`);
      },
      handleBlur() {
        console.log("blur");
      },
      handleFocus() {
        console.log("focus");
      },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        );
      }
    }
  };
</script>

<style>
  .drawer-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e9e9e9;
    padding: 10px 16px;
    background: #fff;
    text-align: right;
  }
</style>
