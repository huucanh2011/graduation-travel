<template>
  <div>
    <category-table
      @setFormCategory="handleSetFieldForm"
      @openDrawerCategory="onOpen"
    ></category-table>

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
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import CategoryTable from "./CategoryTable";

  export default {
    components: {
      CategoryTable
    },
    data() {
      return {
        editMode: false,
        visible: false,
        categoryIdUpdate: ""
      };
    },
    computed: {
      titleDrawer() {
        return this.editMode ? "Cập nhật thể loại" : "Thêm mới thể loại";
      }
    },
    created() {
      this.initForm();
    },
    beforeDestroy() {
      this.$off("openDrawerCategory");
      this.$off("setFormCategory");
    },
    methods: {
      ...mapActions("category", [
        "CREATE_CATEGORY",
        "UPDATE_CATEGORY",
        "CLEAN_CACHE"
      ]),
      onOpen() {
        this.visible = true;
      },
      onClose() {
        this.visible = this.editMode = false;
        this.categoryIdUpdate = "";
        this.CLEAN_CACHE();
        this.form.resetFields();
      },
      initForm() {
        this.form = this.$form.createForm(this, { name: "form_category" });
        this.form.getFieldDecorator("cate_name", { initialValue: "" });
      },
      handleSetFieldForm(data, categoryId, visible, editMode) {
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
              this.CREATE_CATEGORY(values);
            } else {
              this.UPDATE_CATEGORY({
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
