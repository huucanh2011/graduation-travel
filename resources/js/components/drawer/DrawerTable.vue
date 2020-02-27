<template>
  <a-drawer :title="title" :width="width" :visible="visible" :wrapStyle="{ height: '100%' }" @close="close">
    <slot></slot>
    <div class="drawer-footer">
      <a-button :style="{ marginRight: '8px' }" @click="close">
        Hủy
      </a-button>
      <a-button type="primary" @click="save">Lưu</a-button>
    </div>
  </a-drawer>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      editMode: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 480
      }
    },
    computed: {
      title() {
        return !this.editMode ? "Thêm mới" : "Cập nhật";
      }
    },
    methods: {
      close() {
        this.$emit("closeForm");
      },
      save() {
        this.$emit("saveForm");
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
