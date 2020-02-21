<template>
  <div class="container">
    <a-card class="login m-auto" :bordered="false">
      <div class="logo">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </div>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item has-feedback>
          <a-input
            size="large"
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: 'Vui lòng nhập họ tên' },
                  { max: 255, message: 'Tối đa 255 ký tự' }
                ]
              }
            ]"
            placeholder="Họ tên"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item has-feedback>
          <a-input
            size="large"
            v-decorator="[
              'email',
              {
                rules: [
                  { type: 'email', message: 'Email không hợp lệ' },
                  { required: true, message: 'Vui lòng nhập email' },
                  { max: 255, message: 'Tối đa 255 ký tự' }
                ]
              }
            ]"
            placeholder="Email"
          >
            <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item has-feedback>
          <a-input
            size="large"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Vui lòng nhập mật khẩu' },
                  { min: 6, message: 'Tối thiểu 6 ký tự' },
                  { max: 255, message: 'Tối đa 255 ký tự' }
                ]
              }
            ]"
            type="password"
            placeholder="Mật khẩu"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item has-feedback>
          <a-select
            v-decorator="[
              'role_id',
              {
                rules: [{ required: true, message: 'Vui lòng chọn quyền' }]
              }
            ]"
            size="large"
            placeholder="Chọn..."
          >
            <a-select-option value="3">Người dùng</a-select-option>
            <a-select-option value="2">Đối tác</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="mb-1">
          <a-button
            size="large"
            type="primary"
            html-type="submit"
            :loading="loading"
            block
          >
            Đăng ký
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-row :gutter="16">
            <a-col :style="{ textAlign: 'center' }">
              <span>đăng nhập bằng</span>
            </a-col>
            <a-col>
              <a-button class="btn-facebook" size="large" icon="facebook" block
                >Facebook</a-button
              >
            </a-col>
          </a-row>
        </a-form-item>
        <div class="foot-login">
          <span>
            Hoặc
            <router-link :to="{ name: 'login' }">đăng nhập</router-link>
          </span>
          <router-link :to="{ name: 'forgotpassword' }"
            >Quên mật khẩu?</router-link
          >
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters("auth", ["loading"])
    },
    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    methods: {
      ...mapActions("auth", ["register"]),
      async handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.register(values).then(() => {
              this.$router.push({ name: "home" });
            });
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    background: #f0f2f5
      url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg")
      no-repeat center 110px;
    background-size: 100%;
    .login {
      width: 410px;
      .logo {
        text-align: center;
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 20px;
      }
    }
  }
  .foot-login {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .btn-facebook {
    color: #365899 !important;
    border: 1px solid #365899 !important;
  }
</style>
