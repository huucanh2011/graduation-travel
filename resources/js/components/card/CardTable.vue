<template>
  <a-card :title="title" :bordered="false">
    <div slot="extra">
      <a-button v-if="addButton" type="primary" icon="plus" @click="open">
        Thêm
      </a-button>
      <a-button icon="sync" :style="{ margin: '0 8px' }" @click="reset">
        Reset
      </a-button>
      <a-input-search
        placeholder="Tìm kiếm..."
        allowClear
        @search="search"
        :style="{ width: '250px' }"
      />
    </div>
    <slot></slot>
  </a-card>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      addButton: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      open() {
        this.$emit("open");
      },
      reset() {
        this.$emit("reset");
      },
      search(value) {
        this.$emit("search", value);
      }
    }
  };
</script>

<style></style>
