<template>
  <div>
    <category-table></category-table>
    <category-form></category-form>
  </div>
</template>

<script>
  import CategoryForm from "@/components/admin/category/CategoryForm";
  import CategoryTable from "@/components/admin/category/CategoryTable";

  export default {
    components: { CategoryForm, CategoryTable }
  };
</script>

<style></style>
