<template>
  <div>
    Home, link to
    <router-link :to="{ name: 'admin.dashboard' }">Admin</router-link>
    <div v-if="!$auth.loggedIn && !$auth.user">
      <router-link :to="{ name: 'login' }">Login</router-link>
      <router-link :to="{ name: 'register' }">Register</router-link>
    </div>
    <div v-else>
      <span>{{ $auth.user.name }}</span>
      <a-button type="link" @click="logout">Logout</a-button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters("auth", ["loading"])
    },
    methods: {
      ...mapActions("auth", ["logout"])
    }
  };
</script>

<style></style>
