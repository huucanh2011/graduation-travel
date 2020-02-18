<template>
  <div>
    <role-table></role-table>
    <role-form></role-form>
  </div>
</template>

<script>
  import RoleForm from "@/components/admin/role/RoleForm";
  import RoleTable from "@/components/admin/role/RoleTable";

  export default {
    components: { RoleForm, RoleTable }
  };
</script>

<style></style>
