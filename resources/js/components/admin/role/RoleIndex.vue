<template>
  <div>
    <role-table
      @setFormRole="handleSetFieldForm"
      @openDrawerRole="onOpen"
    ></role-table>

    <a-drawer
      :title="titleDrawer"
      :width="480"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{
        height: '100%'
      }"
    >
      <a-form :form="form" layout="vertical" @submit.prevent="handleSubmitForm">
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
  import { mapActions } from "vuex";
  import RoleTable from "./RoleTable";

  export default {
    components: {
      RoleTable
    },
    data() {
      return {
        editMode: false,
        visible: false,
        roleIdUpdate: ""
      };
    },
    computed: {
      titleDrawer() {
        return this.editMode ? "Cập nhật quyền" : "Thêm mới quyền";
      }
    },
    created() {
      this.initForm();
    },
    beforeDestroy() {
      this.$off("openDrawerRole");
      this.$off("setFormRole");
    },
    methods: {
      ...mapActions("role", ["CREATE_ROLE", "UPDATE_ROLE", "CLEAN_CACHE"]),
      onOpen() {
        this.visible = true;
      },
      onClose() {
        this.visible = this.editMode = false;
        this.roleIdUpdate = "";
        this.CLEAN_CACHE();
        this.form.resetFields();
      },
      initForm() {
        this.form = this.$form.createForm(this, { name: "form_role" });
        this.form.getFieldDecorator("role_name", { initialValue: "" });
      },
      handleSetFieldForm(data, roleId, visible, editMode) {
        this.roleIdUpdate = roleId;
        this.form.setFieldsValue({
          role_name: data.role_name
        });
        this.editMode = editMode;
        this.visible = visible;
      },
      handleSubmitForm() {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.editMode) {
              this.CREATE_ROLE(values);
            } else {
              this.UPDATE_ROLE({
                id: this.roleIdUpdate,
                values
              });
            }
            this.onClose();
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
