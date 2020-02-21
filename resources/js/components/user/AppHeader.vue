<template>
  <a-layout-header id="header">
    <div class="logo" />
    <div class="menu-left">
      <a-input class="search" placeholder="Tìm kiếm" @search="onSearch">
        <a-icon slot="prefix" type="search" style="color: rgba(0,0,0,.25)" />
      </a-input>
      <a-menu
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          <router-link :to="{ name: 'home' }">Trang chủ</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link :to="{ name: 'tour.index' }">Tour</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link :to="{ name: 'company.index' }">Công ty</router-link>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="menu-right">
      <a-menu mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="4" v-if="!$auth.loggedIn && !$auth.user">
          <router-link :to="{ name: 'login' }">Đăng nhập</router-link>
        </a-menu-item>
        <a-menu-item key="5" v-else>
          <router-link :to="{ name: 'admin.dashboard' }">Quản trị</router-link>
        </a-menu-item>
        <a-menu-item key="6" v-if="!$auth.loggedIn && !$auth.user">
          <router-link :to="{ name: 'register' }">Đăng ký</router-link>
        </a-menu-item>
        <a-menu-item key="7" v-else>
          <a href="#" @click="logout">Đăng xuất</a>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-header>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    methods: {
      ...mapActions("auth", ["logout"]),
      onSearch() {}
    }
  };
</script>

<style lang="less">
  #header {
    position: fixed;
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    z-index: 10;
    width: 100%;
    display: flex;
    .logo {
      width: 32px;
      height: 32px;
      background: #6dba43;
      float: left;
      margin: 16px 16px 16px 0;
    }
    .menu-left {
      display: flex;
      align-items: center;
      .search {
        width: 200px;
        margin-right: 16px;
      }
    }
    .menu-right {
      float: right;
      margin-right: 0;
      margin-left: auto;
    }
  }

  .ant-input-affix-wrapper .ant-input {
    border: none !important;
  }
</style>
