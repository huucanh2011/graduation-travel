<template>
  <a-card title="Danh sách quyền" :bordered="false">
    <div slot="extra">
      <a-button type="primary" icon="plus" @click="onOpen">Thêm</a-button>
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
      :dataSource="roles"
      :pagination="pagination"
      @change="onChange"
    >
      <template slot="no" slot-scope="text, record, index">
        <strong>{{ ++index }}</strong>
      </template>
      <template slot="role_name" slot-scope="record">
        <span>
          <a-tag :color="tagColor(record)">{{ record }}</a-tag>
        </span>
      </template>
      <template slot="action" slot-scope="record">
        <a-button type="dashed" size="small" @click="onUpdate(record.id)">
          <a-icon type="edit"></a-icon>
        </a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="roles.length"
          title="Bạn có chắc chắn?"
          @confirm="onDelete(record.id)"
        >
          <a-button type="dashed" size="small">
            <a-icon type="delete"></a-icon>
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </a-card>
</template>

<script>
  import { isNotNull, tagColor, cleanAccents } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        pagination: {},
        keyword: null
      };
    },
    computed: {
      ...mapGetters("role", ["loading", "roles", "getRoleById"]),
      columns() {
        const columns = [
          {
            title: "#No",
            width: "10%",
            scopedSlots: { customRender: "no" }
          },
          {
            title: "Tên quyền",
            dataIndex: "role_name",
            sorter: true,
            scopedSlots: { customRender: "role_name" }
          },
          {
            title: "Created at",
            dataIndex: "created_at",
            sorter: true,
            width: "15%"
          },
          {
            title: "Updated at",
            dataIndex: "updated_at",
            sorter: true,
            width: "15%"
          },
          {
            title: "Tùy chọn",
            key: "action",
            width: "25%",
            align: "center",
            scopedSlots: { customRender: "action" }
          }
        ];
        return columns;
      }
    },
    created() {
      this.fetch();
      eventBus.$on("retrieveRoles", this.retrieveRoles);
    },
    beforeDestroy() {
      eventBus.$off("retrieveRoles", this.retrieveRoles);
    },
    methods: {
      ...mapActions("role", ["fetchRoles", "deleteRole"]),
      retrieveRoles() {
        this.fetch();
      },
      onOpen() {
        eventBus.$emit("openDrawerRole", true);
      },
      onUpdate(roleId) {
        const roleUpdate = this.getRoleById(roleId);
        eventBus.$emit("setFormRole", roleUpdate, roleId, true, true);
      },
      onDelete(roleId) {
        this.deleteRole(roleId);
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
        this.retrieveRoles();
        this.keyword = null;
      },
      async fetch(params = {}) {
        const pagination = { ...this.pagination };
        const { data, config } = await this.fetchRoles(params);
        window.history.replaceState("roles", "", config.url);
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
      }
    }
  };
</script>

<style></style>
