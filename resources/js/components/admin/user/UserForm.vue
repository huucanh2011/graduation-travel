<template>
  <a-drawer
    :title="title"
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
      <a-form-item v-bind="formItemLayout" label="Quyền" has-feedback>
        <a-select
          v-decorator="[
            'role_id',
            { rules: [{ required: true, message: 'Vui lòng chọn quyền' }] }
          ]"
          allowClear
          placeholder="Chọn quyền"
        >
          <a-select-option
            v-for="role in roles"
            :key="role.id"
            :value="role.id"
            >{{ role.role_name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Active">
        <a-switch v-decorator="['is_active']">
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
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        formItemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 17 }
        },
        editMode: false,
        visible: false,
        userIdUpdate: null
      };
    },
    computed: {
      ...mapGetters("user", ["roles"]),
      title() {
        return this.editMode ? "Cập nhật tài khoản" : "Thêm mới tài khoản";
      }
    },
    created() {
      this.initForm();
      this.fetchRoles();
      eventBus.$on("openDrawerUser", this.onOpen);
      eventBus.$on("setFormUser", this.setFieldForm);
    },
    beforeDestroy() {
      eventBus.$off("openDrawerUser");
      eventBus.$off("setFormUser");
    },
    methods: {
      ...mapActions("user", ["fetchRoles", "createUser", "updateUser"]),
      onOpen() {
        this.visible = true;
      },
      onClose() {
        this.visible = this.editMode = false;
        this.userIdUpdate = null;
        this.form.resetFields();
      },
      initForm() {
        this.form = this.$form.createForm(this);
        this.form.getFieldDecorator("name", { initialValue: "" });
        this.form.getFieldDecorator("email", { initialValue: "" });
        this.form.getFieldDecorator("password", { initialValue: "" });
        this.form.getFieldDecorator("phone_number", { initialValue: "" });
        this.form.getFieldDecorator("address", { initialValue: "" });
        this.form.getFieldDecorator("role_id", { initialValue: "" });
        this.form.getFieldDecorator("is_active", { initialValue: false });
      },
      setFieldForm(data, userId, visible, editMode) {
        this.userIdUpdate = userId;
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
              this.createUser(values);
              eventBus.$emit("retrieveUsers");
            } else {
              this.updateUser({
                id: this.userIdUpdate,
                values
              });
            }
            this.onClose();
            console.log(values);
          }
        });
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
