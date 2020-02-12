<template>
  <a-layout id="layout-admin" :style="{ minHeight: '100vh' }">
    <app-admin-sidebar :collapsed="collapsed"></app-admin-sidebar>
    <a-layout>
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
  import AppAdminHeader from "../components/admin/AppHeader";
  import AppAdminSidebar from "../components/admin/AppSideBar";

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
