<template>
  <a-drawer
    :title="titleDrawer"
    :width="480"
    @close="onClose"
    :visible="visible"
    :wrapStyle="{
      height: 'calc(100% - 108px)'
    }"
  >
    <slot name="form-role"></slot>
    <div class="drawer-footer">
      <a-button :style="{ marginRight: '8px' }" @click="onClose">
        Hủy
      </a-button>
      <a-button type="primary" @click="handleSubmit">Lưu</a-button>
    </div>
  </a-drawer>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      titleDrawer: {
        type: String,
        required: true
      }
    },
    methods: {
      onClose() {
        this.$emit("closeDrawer", false);
      },
      handleSubmit() {
        this.$emit('submitDrawer')
      }
    }
  };
</script>

<style>
  .drawer-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e9e9e9;
    padding: 10px 16px;
    background: #fff;
    text-align: right;
  }
</style>
