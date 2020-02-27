<template>
  <a-table
    :bordered="bordered"
    :columns="columns"
    :loading="loading"
    :rowKey="record => record.id"
    :dataSource="dataSource"
    :pagination="pagination"
    @change="onChange"
  >
    <slot></slot>
  </a-table>
</template>

<script>
  export default {
    props: {
      bordered: {
        type: Boolean,
        default: false
      },
      columns: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      },
      dataSource: {
        type: Array,
        required: true
      },
      pagination: {
        type: Object,
        default: {}
      }
    },
    methods: {
      onChange(pagination, filters, sorter) {
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        let params = {
          page: pagination.current,
          sortBy: sorter.field,
          orderBy: sorter.order === "ascend" ? "asc" : sorter.order === "descend" ? "desc" : undefined,
          keyword: this.keyword
        };
        this.fetch(params);
      }
    }
  };
</script>

<style></style>
