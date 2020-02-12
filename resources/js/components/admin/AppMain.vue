<template>
  <a-layout id="layout-admin" :style="{ minHeight: '100vh' }">
    <app-admin-sidebar :collapsed="collapsed"></app-admin-sidebar>
    <!-- <a-layout-sider
      :trigger="null"
      :width="250"
      breakpoint="md"
      collapsible
      v-model="collapsed"
    >
      <div class="logo" />
      <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
        <a-menu-item key="1">
          <a-icon type="dashboard" />
          <span>Bảng điều khiển</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="lock" />
          <span>Phân quyền</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="unlock" />
          <span>Quyền</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>Tài khoản</span></span>
          <a-menu-item key="4">Tom</a-menu-item>
          <a-menu-item key="5">Bill</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider> -->
    <a-layout>
      <!-- <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />

        <a-dropdown placement="bottomRight">
          <a-avatar style="backgroundColor:#87d068;" icon="user" />
          <a-menu slot="overlay">
            <a-menu-item>
              <a rel="noopener noreferrer" href="#">
                <a-icon type="user" />
                Trang cá nhân
              </a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a rel="noopener noreferrer" href="#">
                <a-icon type="logout" />
                Đăng xuất
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header> -->
      <app-admin-header :collapsed="collapsed"></app-admin-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Created by Huu Canh ©{{ new Date().getFullYear() }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
  import AppAdminHeader from "./AppHeader";
  import AppAdminSidebar from "./AppSideBar";

  export default {
    data() {
      return {
        collapsed: false
      };
    },

    components: {
      AppAdminHeader,
      AppAdminSidebar
    }
  };
</script>

<style>
  #layout-admin .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #layout-admin .trigger:hover {
    color: #1890ff;
  }

  #layout-admin .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
