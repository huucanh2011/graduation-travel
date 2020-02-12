<template>
  <a-layout-sider
    :trigger="null"
    :width="250"
    breakpoint="md"
    collapsible
    v-model="collapsed"
  >
    <div class="logo" />
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
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="user" /><span>Tài khoản</span></span>
        <a-menu-item key="4">
          <router-link :to="{ name: 'admin.partners' }">Đối tác</router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link :to="{ name: 'admin.users' }">Người dùng</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="6">
        <router-link :to="{ name: 'admin.ratings' }">
          <a-icon type="star" />
          <span>Đánh giá</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="7">
        <router-link :to="{ name: 'admin.settings' }">
          <a-icon type="setting" />
          <span>Setting</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
  export default {
    props: ["collapsed"]
  };
</script>

<style></style>
