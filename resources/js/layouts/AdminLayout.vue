<template>
  <a-layout id="layout-admin" :style="{ minHeight: '100vh' }">
    <app-admin-sidebar></app-admin-sidebar>
    <a-layout>
      <app-admin-header></app-admin-header>
      <a-layout-content class="layout-content">
        <router-view :key="$route.fullPath"></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Made with
        <a-icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> by Huu
        Canh ©{{ new Date().getFullYear() }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
  import AppAdminHeader from "@/components/admin/AppHeader";
  import AppAdminSidebar from "@/components/admin/AppSideBar";

  export default {
    data() {
      return {
        collapsed: false
      };
    },
    components: { AppAdminHeader, AppAdminSidebar }
  };
</script>

<style lang="css">
  #layout-admin .trigger {
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #layout-admin .trigger:hover {
    color: #1890ff;
  }

  #layout-admin .logo {
    height: 32px;
    background: rgb(241, 241, 241);
    margin: 16px;
  }

  #layout-admin .layout-content {
    margin: 24px;
    background: #fff;
    min-height: 280px;
  }

  #layout-admin .layout-header {
    background: #fff;
    padding: 0 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .ant-menu-root.ant-menu-inline,
  .ant-menu-root.ant-menu-vertical,
  .ant-menu-root.ant-menu-vertical-left,
  .ant-menu-root.ant-menu-vertical-right {
    border: none;
  }
</style>
