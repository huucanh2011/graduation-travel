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
      <a-form-item label="Tên thể loại">
        <a-input
          v-decorator="[
            'cate_name',
            {
              rules: [
                { required: true, message: 'Tên thể loại không được trống!' },
                { max: 255, message: 'Tên thể loại tối đa 255 ký tự' }
              ]
            }
          ]"
          placeholder="Vui lòng nhập tên thể loại"
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
        categoryIdUpdate: null
      };
    },
    computed: {
      title() {
        return this.editMode ? "Cập nhật thể loại" : "Thêm mới thể loại";
      }
    },
    created() {
      this.initForm();
      eventBus.$on("openDrawerCategory", this.onOpen);
      eventBus.$on("setFormCategory", this.setFieldForm);
    },
    beforeDestroy() {
      eventBus.$off("openDrawerCategory");
      eventBus.$off("setFormCategory");
    },
    methods: {
      ...mapActions("category", ["createCategory", "updateCategory"]),
      onOpen() {
        this.visible = true;
      },
      onClose() {
        this.visible = this.editMode = false;
        this.categoryIdUpdate = null;
        this.form.resetFields();
      },
      initForm() {
        this.form = this.$form.createForm(this);
        this.form.getFieldDecorator("cate_name", { initialValue: "" });
      },
      setFieldForm(data, categoryId, visible, editMode) {
        this.categoryIdUpdate = categoryId;
        this.form.setFieldsValue({
          cate_name: data.cate_name
        });
        this.editMode = editMode;
        this.visible = visible;
      },
      handleSubmitForm() {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.editMode) {
              this.createCategory(values);
              eventBus.$emit("retrieveCategories");
            } else {
              this.updateCategory({
                id: this.categoryIdUpdate,
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
