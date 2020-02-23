<template>
  <a-modal
    title="Crop image"
    :width="600"
    :visible="visibleModal"
    @ok="modalOk"
    @cancel="modalCancel"
  >
    <div :style="{ width: '552px', height: '300px' }">
      <VueCropper ref="cropper" v-bind="options" />
    </div>
  </a-modal>
</template>

<script>
  import { VueCropper } from "vue-cropper";
  export default {
    components: { VueCropper },
    props: {
      imageUrl: {
        type: String
      },
      visibleModal: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        options: {
          img: null,
          full: true,
          canMove: true,
          canScale: true,
          autoCropWidth: 250,
          autoCrop: true,
          fixedNumber: [16, 9],
          fixed: true
        }
      };
    },
    beforeUpdate() {
      this.options.img = this.imageUrl;
    },
    methods: {
      modalCancel(e) {
        this.$emit("onCloseModal", false);
      },
      modalOk() {}
    }
  };
</script>

<style></style>
