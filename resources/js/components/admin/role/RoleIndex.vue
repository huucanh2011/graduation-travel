<template>
  <div>
    <h3>Danh sách quyền</h3>

    <div class="nav-table-data">
      <a-button type="primary" icon="plus" @click="onCreate">Thêm</a-button>
      <a-input-search
        placeholder="Tìm kiếm..."
        :style="{ maxWidth: '200px' }"
        @search="onSearch"
      />
    </div>

    <role-table @setFormRole="handleSetFieldForm"></role-table>

    <app-drawer
      :title-drawer="titleDrawer"
      :visible="visible"
      @closeDrawer="onCloseDrawer"
      @submitDrawer="handleSubmit"
    >
      <div slot="form-role">
        <a-form
          :form="form"
          layout="vertical"
          @submit.prevent="handleSubmit"
          hideRequiredMark
        >
          <a-form-item label="Tên quyền">
            <a-input
              v-decorator="[
                'role_name',
                {
                  rules: [
                    { required: true, message: 'Tên quyền không được trống!' },
                    { max: 255, message: 'Tên quyền tối đa 255 ký tự' }
                  ]
                }
              ]"
              placeholder="Vui lòng nhập tên quyền"
            />
          </a-form-item>
        </a-form>
      </div>
    </app-drawer>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import RoleTable from "./RoleTable";

  export default {
    components: {
      RoleTable
    },
    data() {
      return {
        editMode: false,
        visible: false,
        roleIdUpdate: ""
      };
    },
    computed: {
      titleDrawer() {
        return this.editMode ? "Cập nhật quyền" : "Thêm mới quyền";
      }
    },
    created() {
      this.initForm();
    },
    methods: {
      ...mapActions("role", [
        "CREATE_ROLE",
        "UPDATE_ROLE",
        "GET_ROLE",
        "CLEAN_CACHE"
      ]),

      initForm() {
        this.form = this.$form.createForm(this, { name: "form_role" });
        this.form.getFieldDecorator("role_name", { initialValue: "" });
      },

      handleSetFieldForm(roleId, data, visible, editMode) {
        this.roleIdUpdate = roleId;
        this.form.setFieldsValue({
          role_name: data.role_name
        });
        this.editMode = editMode;
        this.visible = visible;
      },

      onCreate() {
        this.visible = true;
      },

      onCloseDrawer(e) {
        this.visible = this.editMode = e;
        this.roleIdUpdate = "";
        this.CLEAN_CACHE();
        this.form.resetFields();
      },

      handleSubmit() {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.editMode) {
              this.CREATE_ROLE(values);
            } else {
              this.UPDATE_ROLE({
                id: this.roleIdUpdate,
                values
              });
            }
            this.onCloseDrawer(false);
          }
        });
      },

      onSearch(value, event) {
        console.log(value);
        console.log(event);
      }
    }
  };
</script>

<style>
  .nav-table-data {
    margin: 10px 0 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
</style>
