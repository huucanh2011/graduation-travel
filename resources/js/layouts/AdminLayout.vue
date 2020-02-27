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
        <a-icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> by Huu Canh ©{{ new Date().getFullYear() }}
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

<style lang="less">
  #layout-admin {
    .trigger {
      font-size: 18px;
      line-height: 64px;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }
    .logo {
      height: 32px;
      margin: 16px;
      background: #1890ff;
    }
    .layout-content {
      margin: 24px;
      background: #fff;
      min-height: 280px;
    }
  }

  .ant-menu-root.ant-menu-inline,
  .ant-menu-root.ant-menu-vertical,
  .ant-menu-root.ant-menu-vertical-left,
  .ant-menu-root.ant-menu-vertical-right {
    border: none;
  }

  .ant-table-pagination.ant-pagination {
    float: none;
    text-align: center;
  }

  .drawer-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e9e9e9;
    padding: 10px 16px;
    background: #fff;
    text-align: right;
    .flex-drawer-footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
