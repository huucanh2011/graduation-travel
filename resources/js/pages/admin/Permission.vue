<template>
  <card-table :title="title" @reset="reset" @search="search">
    <a-table
      :columns="columns"
      :loading="loading"
      :rowKey="record => record.id"
      :dataSource="permissions"
      :pagination="false"
      @change="onTableChange"
    >
      <template slot="status" slot-scope="record">
        <a-tag :color="colorActive(record)">{{ record | status }}</a-tag>
      </template>
      <template slot="active" slot-scope="record">
        <a-switch
          size="small"
          :key="record.id"
          :name="`p__${record.id}`"
          :checked="record.is_active"
          :defaultChecked="record.is_active"
          @click="onClickActive"
        >
        </a-switch>
      </template>
      <template slot="action" slot-scope="record">
        <a-radio-group :name="`p__${record.id}`" :defaultValue="record.role_slug" @change="onChangeRole">
          <a-radio v-for="role in roles" :key="role.id" :value="role.slug" :style="{ margin: '0 4px' }">
            <a-tag :color="tagColor(role.slug)">
              {{ role.slug }}
            </a-tag>
          </a-radio>
        </a-radio-group>
      </template>
    </a-table>
    <pagination-table
      :total="pagination.total"
      :pageSize="pagination.pageSize"
      :current="pagination.current"
      @onShowSizeChange="onShowSizeChange"
      @onChange="onChange"
    />
  </card-table>
</template>

<script>
  import { colorActive, tagColor, cleanAccents, convertOrderBy } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  import CardTable from "@/components/card/CardTable.vue";
  import PaginationTable from "@/components/pagination/PaginationTable";
  export default {
    components: { CardTable, PaginationTable },
    data() {
      return {
        title: "Phân quyền",
        pagination: {
          total: 0,
          pageSize: 0,
          current: 1
        },
        sorter: {},
        q: ""
      };
    },
    computed: {
      ...mapGetters("permission", ["loading", "permissions", "roles"]),
      columns() {
        const columns = [
          {
            title: "#No",
            customRender: (text, record, index) => ++index
          },
          {
            title: "Họ tên",
            dataIndex: "name",
            sorter: true
          },
          {
            title: "Email",
            dataIndex: "email",
            sorter: true
          },
          {
            title: "Trạng thái",
            dataIndex: "is_active",
            width: "15%",
            sorter: true,
            scopedSlots: { customRender: "status" }
          },
          {
            title: "Active",
            align: "center",
            scopedSlots: { customRender: "active" }
          },
          {
            title: "Quyền",
            key: "action",
            align: "center",
            scopedSlots: { customRender: "action" }
          }
        ];
        return columns;
      }
    },
    created() {
      this.fetchData();
      this.fetchRoles();
    },
    methods: {
      ...mapActions("permission", ["fetchPermissions", "fetchRoles", "updatePermission"]),
      async fetchData(params = {}) {
        const pagination = { ...this.pagination };
        const { data, config } = await this.fetchPermissions(params);
        pagination.total = data.meta.total;
        pagination.pageSize = data.meta.per_page;
        pagination.current = data.meta.current_page;
        this.pagination = pagination;
        window.history.replaceState("permission", "", config.url);
      },
      onTableChange(pagination, filters, sorter) {
        const pager = { ...this.pagination };
        const orderBy = convertOrderBy(sorter.order);
        const params = this.setParams(pager.current, pager.pageSize, sorter.field, orderBy, this.q);
        this.fetchData(params);
        this.sorter = sorter;
      },
      onShowSizeChange({ current, pageSize }) {
        this.onChangePagination(current, pageSize);
      },
      onChange({ page, pageSize }) {
        this.onChangePagination(page, pageSize);
      },
      onChangePagination(page, pageSize) {
        const sorter = { ...this.sorter };
        const q = this.q;
        const sortBy = sorter.field;
        const orderBy = convertOrderBy(sorter.order);
        const params = this.setParams(page, pageSize, sortBy, orderBy, q);
        this.fetchData(params);
      },
      setParams(page, pageSize, sortBy, orderBy, q) {
        return { page, pageSize, sortBy, orderBy, q };
      },
      search(value) {
        console.log(cleanAccents(value));
        if (value) {
          const pager = { ...this.pagination };
          const sorter = { ...this.sorter };
          const orderBy = convertOrderBy(sorter.order);
          const params = {
            page: pager.current,
            pageSize: pager.pageSize,
            sortBy: sorter.field,
            orderBy: orderBy,
            q: cleanAccents(value)
          };
          this.fetchData(params);
          this.q = cleanAccents(value);
        }
      },
      reset() {
        this.fetchData();
        this.pagination.current = 1;
        this.q = "";
      },
      onClickActive(checked, e) {
        const userId = +e.target.name.replace("p__", "");
        const permission = {
          id: userId,
          values: { is_active: checked }
        };
        this.updatePermission(permission);
      },
      onChangeRole(e) {
        const roleSlug = e.target.value;
        const userId = +e.target.name.replace("p__", "");
        const permission = {
          id: userId,
          values: { role_slug: roleSlug }
        };
        this.updatePermission(permission);
      },
      tagColor(value) {
        return tagColor(value);
      },
      colorActive(value) {
        return colorActive(value);
      }
    }
  };
</script>

<style></style>
