<template>
  <a-drawer
    :title="!editMode ? 'Thêm mới' : 'Cập nhật'"
    :width="480"
    @close="onClose"
    :visible="visible"
    :wrapStyle="{
      height: 'calc(100% - 108px)'
    }"
  >
    <a-form
      :form="form"
      layout="vertical"
      @submit.prevent="handleAddRole"
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
      <div class="drawer-footer">
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          Hủy
        </a-button>
        <a-button html-type="submit" type="primary">Lưu</a-button>
      </div>
    </a-form>
  </a-drawer>
</template>

<script>
  import { mapActions } from "vuex";
  
  export default {
    data() {
      return {
        form: this.$form.createForm(this, { name: "horizontal_role" }),
        visible: false,
        editMode: false
      };
    },
    created() {
      eventBus.$on("show-drawer", e => {
        this.editMode = e;
        this.visible = true;
      });
      this.editMode ? eventBus.$on("send-role", this.handleUpdate) : () => {};
    },
    beforeDestroy() {
      this.visible = false;
      eventBus.$off("show-drawer", e => {
        this.editMode = e;
        this.visible = true;
      });
      eventBus.$off("send-role", this.handleUpdate);
    },
    methods: {
      ...mapActions("role", ["CREATE_ROLE", "UPDATE_ROLE"]),

      onClose() {
        this.visible = false;
        this.form.resetFields();
      },

      handleAddRole(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.CREATE_ROLE(values);
            this.onClose();
          }
        });
      },

      handleUpdate(e) {
        let name = e.role_name;
        console.log(name);

        this.form.setFieldsValue({ role_name: name });
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
