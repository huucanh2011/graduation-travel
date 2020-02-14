<template>
  <a-layout-sider
    :trigger="null"
    :width="250"
    breakpoint="md"
    collapsible
    v-model="collapsed"
  >
    <router-link :to="{ name: 'home' }">
      <div class="logo" />
    </router-link>

    <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
      <a-menu-item key="1">
        <router-link :to="{ name: 'admin.dashboard' }">
          <a-icon type="dashboard" />
          <span>Bảng điều khiển</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link :to="{ name: 'admin.permission' }">
          <a-icon type="lock" />
          <span>Phân quyền</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link :to="{ name: 'admin.roles' }">
          <a-icon type="unlock" />
          <span>Quyền</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="4">
        <router-link :to="{ name: 'admin.users' }">
          <a-icon type="user" />
          <span>Tài khoản</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="5">
        <router-link :to="{ name: 'admin.ratings' }">
          <a-icon type="star" />
          <span>Đánh giá</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="6">
        <router-link :to="{ name: 'admin.feedbacks' }">
          <a-icon type="customer-service" />
          <span>Phản hồi</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="7">
        <router-link :to="{ name: 'admin.slides' }">
          <a-icon type="switcher" />
          <span>Slide</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
  export default {
    data() {
      return {
        collapsed: false
      };
    },
    created() {
      eventBus.$on("collapsed", e => (this.collapsed = e));
    },
    beforeDestroy() {
      eventBus.$off("collapsed", e => (this.collapsed = e));
    }
  };
</script>

<style></style>
