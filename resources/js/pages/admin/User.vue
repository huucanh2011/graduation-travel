<template>
  <div>
    <user-table></user-table>
    <user-form></user-form>
  </div>
</template>

<script>
  import UserTable from "@/components/admin/user/UserTable";
  import UserForm from "@/components/admin/user/UserForm";

  export default {
    components: { UserTable, UserForm }
  };
</script>

<style></style>
