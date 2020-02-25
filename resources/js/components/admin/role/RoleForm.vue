<template>
  <a-drawer
    :title="title"
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
            'name',
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
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
        editMode: false,
        visible: false,
        roleIdUpdate: null
      };
    },
    computed: {
      title() {
        return this.editMode ? "Cập nhật quyền" : "Thêm mới quyền";
      }
    },
    created() {
      this.initForm();
      eventBus.$on("openDrawerRole", this.onOpen);
      eventBus.$on("setFormRole", this.setFieldForm);
    },
    beforeDestroy() {
      eventBus.$off("openDrawerRole");
      eventBus.$off("setFormRole");
    },
    methods: {
      ...mapActions("role", ["createRole", "updateRole"]),
      onOpen() {
        this.visible = true;
      },
      onClose() {
        this.visible = this.editMode = false;
        this.roleIdUpdate = null;
        this.form.resetFields();
      },
      initForm() {
        this.form = this.$form.createForm(this);
        this.form.getFieldDecorator("name", { initialValue: "" });
      },
      setFieldForm(data, roleId, visible, editMode) {
        this.roleIdUpdate = roleId;
        this.form.setFieldsValue({
          name: data.name
        });
        this.editMode = editMode;
        this.visible = visible;
      },
      handleSubmitForm() {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.editMode) {
              this.createRole(values);
              eventBus.$emit("retrieveRoles");
            } else {
              this.updateRole({
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
