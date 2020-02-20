<template>
  <a-card title="Phân quyền" :bordered="false">
    <div slot="extra">
      <a-button
        icon="sync"
        :style="{ marginLeft: '8px' }"
        @click="onReset"
      ></a-button>
      <a-input-search
        placeholder="Tìm kiếm..."
        v-model="keyword"
        @search="onSearch"
        style="margin-left: 8px; width: 250px;"
      />
    </div>

    <a-table
      :columns="columns"
      :loading="loading"
      :rowKey="record => record.id"
      :dataSource="permissions"
      :pagination="pagination"
      @change="onChange"
    >
      <template slot="name" slot-scope="record">
        <span>
          {{ record.name }}
          <a-tag :color="tagColor(record.role)" :style="{ float: 'right' }">{{
            record.role
          }}</a-tag>
        </span>
      </template>
      <template slot="status" slot-scope="record">
        <a-tag :color="colorActive(record)">{{ record | status }}</a-tag>
      </template>
      <template slot="active" slot-scope="record">
        <a-checkbox
          @change="onChangeActive"
          :defaultChecked="record.is_active"
          :value="record.id"
        ></a-checkbox>
      </template>
      <template slot="action" slot-scope="record">
        <a-radio-group
          :name="`p__${record.id}`"
          :defaultValue="record.role_id"
          @change="onChangeRole"
        >
          <a-radio
            v-for="(role, index) in roles"
            :key="index"
            :value="role.id"
            :style="{ margin: '0 4px' }"
          >
            <a-tag :color="tagColor(role.role_name)">
              {{ role.role_name }}
            </a-tag>
          </a-radio>
        </a-radio-group>
      </template>
    </a-table>
  </a-card>
</template>

<script>
  import {
    isNotNull,
    colorActive,
    tagColor,
    cleanAccents
  } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        pagination: {},
        keyword: null
      };
    },
    computed: {
      ...mapGetters("permission", ["loading", "permissions", "roles"]),
      columns() {
        const columns = [
          {
            title: "Họ tên",
            scopedSlots: { customRender: "name" }
          },
          {
            title: "Email",
            dataIndex: "email",
            sorter: true
          },
          {
            title: "Trạng thái",
            dataIndex: "is_active",
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
      this.fetch();
      this.fetchRoles();
    },
    methods: {
      ...mapActions("permission", [
        "fetchPermissions",
        "fetchRoles",
        "updatePermission"
      ]),
      retrievePermissions() {
        this.fetch();
      },
      onSearch(value, event) {
        if (isNotNull(value)) {
          let params = {
            page: this.pagination.current,
            keyword: value
          };
          this.fetch(params);
          this.keyword = value;
        }
      },
      onReset() {
        this.retrievePermissions();
        this.keyword = null;
      },
      onChangeActive(e) {
        const permission = {
          id: e.target.value,
          values: { is_active: e.target.checked }
        };
        this.updatePermission(permission);
      },
      onChangeRole(e) {
        const roleId = e.target.value;
        const userId = +e.target.name.replace("p__", "");
        const permission = {
          id: userId,
          values: { role_id: roleId }
        };
        this.updatePermission(permission);
      },
      async fetch(params = {}) {
        const pagination = { ...this.pagination };
        const { data, config } = await this.fetchPermissions(params);
        window.history.replaceState("permission", "", config.url);
        pagination.total = data.meta.total;
        pagination.pageSize = data.meta.per_page;
        pagination.current = data.meta.current_page;
        this.pagination = pagination;
      },
      onChange(pagination, filters, sorter) {
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        let params = {
          page: pagination.current,
          sortBy: sorter.field,
          orderBy:
            sorter.order === "ascend"
              ? "asc"
              : sorter.order === "descend"
              ? "desc"
              : undefined,
          keyword: this.keyword
        };
        this.fetch(params);
      },
      tagColor(v) {
        return tagColor(v);
      },
      colorActive(v) {
        return colorActive(v);
      }
    }
  };
</script>

<style></style>
