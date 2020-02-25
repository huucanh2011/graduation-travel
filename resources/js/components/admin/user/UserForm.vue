<template>
  <a-drawer
    :title="title"
    :width="560"
    @close="onClose"
    :visible="visible"
    :wrapStyle="{
      height: '100%'
    }"
  >
    <a-form :form="form" @submit.prevent="handleSubmitForm">
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
              placeholder="Vui lòng nhập họ tên"
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
              placeholder="Vui lòng nhập email"
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
              placeholder="Vui lòng nhập số điện thoại"
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
              placeholder="Vui lòng nhập mật khẩu"
            />
            <a-alert
              v-else
              message="Bạn không thể cập nhật mật khẩu"
              type="info"
              showIcon
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item class="mb-1" label="Địa chỉ">
        <a-textarea
          v-decorator="['address']"
          placeholder="Vui lòng nhập địa chỉ"
          :autosize="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-item>
      <a-row :gutter="16">
        <a-col :span="12">
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
        </a-col>
        <a-col :span="12">
          <a-form-item class="mb-1" label="Quyền" has-feedback>
            <a-select
              v-decorator="[
                'role_id',
                {
                  rules: [{ required: true, message: 'Vui lòng chọn quyền' }]
                }
              ]"
              allowClear
              placeholder="Chọn quyền"
            >
              <a-select-option
                v-for="role in roles"
                :key="role.id"
                :value="role.id"
                >{{ role.name }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item class="mb-1" label="Active">
            <a-switch v-decorator="['is_active']" v-model="checked"> </a-switch>
          </a-form-item>
        </a-col>
      </a-row>

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
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        formItemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 16 }
        },
        editMode: false,
        visible: false,
        userIdUpdate: null,
        checked: false,
        previewVisible: false,
        previewImage: "",
        fileList: [],
        imageUrl: ""
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
        this.checked = this.form.getFieldValue("is_active");
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
          role_id: data.role_id,
          is_active: data.is_active
        });
        this.checked = this.form.getFieldValue("is_active");
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
          }
        });
      },
      handleCancel() {
        this.previewVisible = false;
      },
      handlePreview(file) {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
      },
      // handleChange({ fileList }) {
      //   this.fileList = fileList;
      // },
      handleUploadAvatar(file) {
        return new Promise((reslove, reject) => {
          console.log(file);
        });
      },
      beforeUpload(file) {
        const isJPG = file.type === "image/jpeg";
        if (!isJPG) {
          this.$message.error("You can only upload JPG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error("Image must smaller than 2MB!");
        }
        return isJPG && isLt2M;
      },
      handleChange(info) {
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
        });
        // if (info.file.status === "uploading") {
        //   return;
        // }
        // if (info.file.status === "done") {
        //   // Get this url from response in real world.

        // }
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

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
