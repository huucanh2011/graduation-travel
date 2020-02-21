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
        <a-form-item>
          <a-button
            size="large"
            type="primary"
            html-type="submit"
            :loading="loading"
            block
          >
            Khôi phục
          </a-button>
        </a-form-item>
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
      ...mapActions("auth", ["resetPassword"]),
      async handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            let params = {
              email: values.email,
              password: values.password,
              resetToken: this.$route.query.token
            };
            this.resetPassword(params).then(() => {
              this.$router.push({ name: "login" });
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
</style>
