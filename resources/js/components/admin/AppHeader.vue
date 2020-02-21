<template>
  <a-layout-header class="layout-header">
    <a-icon
      class="trigger"
      :type="collapsed ? 'arrow-right' : 'arrow-left'"
      @click="handleCollapsed"
    />

    <div
      :style="{ display: 'flex', flexDirection: 'row', alignItems: 'center' }"
    >
      <router-link :to="{ name: 'home' }" :style="{ color: '#595959' }">
        <a-icon type="home" :style="{ fontSize: '18px' }" />
      </router-link>
      <a-dropdown placement="bottomRight" :trigger="['click']">
        <div :style="{ margin: '0 30px', cursor: 'pointer' }">
          <a-badge :count="0">
            <a-icon type="bell" :style="{ fontSize: '18px' }" />
          </a-badge>
        </div>

        <a-menu slot="overlay">
          <a-menu-item>
            Không có thông báo
          </a-menu-item>
        </a-menu>
      </a-dropdown>

      <a-dropdown placement="bottomRight" :trigger="['click']">
        <div :style="{ cursor: 'pointer' }">
          <a-avatar
            :style="{ backgroundColor: '#87d068' }"
            size="small"
            icon="user"
          />
          <span>{{ user.name }}</span>
        </div>

        <a-menu slot="overlay">
          <a-menu-item>
            <a href="#">
              <a-icon type="user" />
              Trang cá nhân
            </a>
          </a-menu-item>
          <a-menu-item>
            <router-link :to="{ name: 'admin.settings' }">
              <a-icon type="setting" />
              Cài đặt
            </router-link>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item>
            <a href="#" @click="logout">
              <a-icon type="logout" :style="{ marginRight: '5px' }" />Đăng xuất
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        collapsed: false
      };
    },
    computed: {
      ...mapGetters("auth", ["user"])
    },
    methods: {
      ...mapActions("auth", ["logout"]),
      handleCollapsed() {
        this.collapsed = !this.collapsed;
        eventBus.$emit("collapsed", this.collapsed);
      }
    }
  };
</script>

<style></style>
