<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="handleCollapsed"
    />

    <!-- <a-dropdown placement="bottomRight">
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
    </a-dropdown> -->
  </a-layout-header>
</template>

<script>
  export default {
    data() {
      return {
        collapsed: false
      };
    },
    methods: {
      handleCollapsed() {
        this.collapsed = !this.collapsed;
        eventBus.$emit("collapsed", this.collapsed);
      }
    }
  };
</script>

<style></style>
