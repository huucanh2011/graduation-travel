<template>
  <div>
    <a-drawer
      :title="title"
      :width="480"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{
        height: '100%'
      }"
    >
      <a-form :form="form" layout="vertical" @submit.prevent="handleSubmitForm" hideRequiredMark>
        <a-form-item class="mb-1" label="Tiêu đề">
          <a-input
            v-decorator="[
              'title',
              {
                rules: [
                  { required: true, message: 'Vui lòng nhập tiêu đề' },
                  { max: 255, message: 'Tối đa 255 ký tự' }
                ]
              }
            ]"
            placeholder="Nhập tiêu đề"
          />
        </a-form-item>
        <a-form-item class="mb-1" label="Link">
          <a-input
            v-decorator="[
              'link',
              {
                rules: [{ max: 255, message: 'Tối đa 255 ký tự' }]
              }
            ]"
            placeholder="Nhập tiêu đề"
          />
        </a-form-item>
        <a-form-item class="mb-1" label="Mô tả">
          <a-textarea v-decorator="['description']" placeholder="Nhập mô tả" :autosize="{ minRows: 2, maxRows: 2 }" />
        </a-form-item>
        <a-form-item v-if="!imagePreview" class="mb-1">
          <a-input type="file" ref="imageSlide" accept="image/*" :style="{ display: 'none' }" @change="onChangeImage"> </a-input>
          <a-button type="dashed" icon="picture" @click="onClickUpload" block>Image</a-button>
        </a-form-item>
        <div v-else class="mb-3">
          <div :style="{ width: '370px', margin: '0 auto' }">
            <img :src="imagePreview" class="rounded w-100" />
          </div>
        </div>
        <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }" class="mb-1" label="Active">
          <a-switch v-decorator="['is_active']" size="small" v-model="checked"> </a-switch>
        </a-form-item>

        <div class="drawer-footer">
          <div class="flex-drawer-footer">
            <div>
              <a-button v-if="imagePreview" icon="close" type="dashed" @click="onClearImage">Clear</a-button>
            </div>
            <div>
              <a-button :style="{ marginRight: '8px' }" @click="onClose">
                Hủy
              </a-button>
              <a-button type="primary" html-type="submit" icon="save">Lưu</a-button>
            </div>
          </div>
        </div>
      </a-form>
    </a-drawer>

    <crop-image :visibleModal="visibleModal" :imageUrl="imageUrl" @onCloseModal="onCloseModal" @getImage="getImage"></crop-image>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import CropImage from "@/components/base/BaseCropImage";
  import { uploadImage } from "@/services/upload";
  export default {
    components: { CropImage },
    data() {
      return {
        visibleModal: false,
        imageUrl: null,
        imagePreview: null,
        image: null,
        //
        editMode: false,
        visible: false,
        slideIdUpdate: null,
        checked: true
      };
    },
    computed: {
      title() {
        return this.editMode ? "Cập nhật slide" : "Thêm mới slide";
      }
    },
    created() {
      this.initForm();
      eventBus.$on("openDrawerSlide", this.onOpen);
      eventBus.$on("setFormSlide", this.setFieldForm);
    },
    beforeDestroy() {
      eventBus.$off("openDrawerSlide");
      eventBus.$off("setFormSlide");
    },
    methods: {
      ...mapActions("slide", ["createSlide", "updateSlide"]),
      onOpen() {
        this.visible = true;
      },
      onClose() {
        this.visible = this.editMode = false;
        this.slideIdUpdate = null;
        this.form.resetFields();
        this.onClearImage();
      },
      initForm() {
        this.form = this.$form.createForm(this);
        this.form.getFieldDecorator("title", { initialValue: null });
        this.form.getFieldDecorator("description", { initialValue: null });
        this.form.getFieldDecorator("link", { initialValue: null });
        this.form.getFieldDecorator("image", { initialValue: null });
        this.form.getFieldDecorator("is_active", { initialValue: true });
      },
      setFieldForm(data, slideId, visible, editMode) {
        this.slideIdUpdate = slideId;
        this.form.setFieldsValue({
          title: data.title,
          description: data.description,
          link: data.link,
          is_active: data.is_active
        });
        this.checked = this.form.getFieldValue("is_active");
        this.imagePreview = data.image;
        this.editMode = editMode;
        this.visible = visible;
      },
      handleSubmitForm() {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.editMode) {
              if (!this.image) {
                this.$message.error("Bạn chưa chọn hình");
                return;
              }
              uploadImage("slides", this.image).then(url => {
                values.image = url;
                this.createSlide(values);
                this.onClose();
              });
              eventBus.$emit("retrieveSlides");
            } else {
              if (!this.image) {
                console.log(this.image);

                this.updateSlide({
                  id: this.slideIdUpdate,
                  values
                });
              } else {
                uploadImage("slides", this.image).then(url => {
                  values.image = url;
                  this.updateSlide({
                    id: this.slideIdUpdate,
                    values
                  });
                });
              }
              this.onClose();
            }
          }
        });
      },
      onClickUpload() {
        this.$refs.imageSlide.$el.click();
      },
      onChangeImage(e) {
        let file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        this.imageUrl = imageUrl;
        this.visibleModal = true;
      },
      onCloseModal() {
        this.imageUrl = null;
        this.visibleModal = false;
      },
      getImage(data) {
        const blodFile = URL.createObjectURL(data);
        this.imagePreview = blodFile;
        const file = new File([data], "file.webp", { type: "image/webp" });
        this.image = file;
      },
      onClearImage() {
        this.imagePreview = null;
        this.image = null;
      }
    }
  };
</script>

<style></style>
