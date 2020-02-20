<template>
  <div class="exception">
    <img :src="config[type].img" />
    <div class="content">
      <h1>{{ config[type].title }}</h1>
      <div class="desc">{{ config[type].desc }}</div>
      <div class="action">
        <a-button type="primary" @click="backToHome">Back to home</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Config from "./typeConfig";

  export default {
    name: "ExceptionPage",
    props: ["type"],
    data() {
      return {
        config: Config
      };
    },
    methods: {
      backToHome() {
        this.$router.push("/");
      }
    }
  };
</script>

<style>
  .exception {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    align-items: center;
    text-align: center;
  }

  .exception img {
    height: 360px;
    max-width: 430px;
  }

  .exception.content {
    display: inline-block;
    flex: auto;
  }

  .exception .content h1 {
    color: #434e59;
    font-size: 72px;
    font-weight: 600;
    line-height: 72px;
    margin-bottom: 12px;
  }
  .exception .content .desc {
    color: rgba(0, 0, 0, 0.45);
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 16px;
  }
</style>
