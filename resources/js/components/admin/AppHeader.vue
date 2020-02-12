<template>
  <a-layout-header style="background: #fff; padding: 0">
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
  </a-layout-header>
</template>

<script>
  export default {
    props: ["collapsed"]
    // data() {
    //   return {
    //     collapsed: false
    //   };
    // }
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
</style>
