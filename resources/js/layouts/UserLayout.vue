<template>
  <a-layout id="layout-user-fixed-header">
    <app-header></app-header>

    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <div
        :style="{
          background: '#fff',
          margin: '16px 0',
          padding: '24px',
          minHeight: 'calc(100vh - 165px)'
        }"
      >
        <router-view></router-view>
      </div>
    </a-layout-content>
    <app-footer></app-footer>
  </a-layout>
</template>
<script>
  import AppHeader from "@/components/user/AppHeader";
  import AppFooter from "@/components/user/AppFooter";
  export default {
    components: { AppHeader, AppFooter }
  };
</script>
<style></style>
