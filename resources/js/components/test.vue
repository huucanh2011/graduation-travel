<template>
  <a-card title="Danh sách tài khoản" :bordered="false">
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
      :dataSource="users"
      :pagination="pagination"
      @change="onChange"
    >
      <template slot="no" slot-scope="text, record, index">
        <strong>{{ ++index }}</strong>
      </template>
      <template slot="status" slot-scope="record">
        <a-tag :color="colorActive(record)">{{ record | status }}</a-tag>
      </template>
      <template slot="active" slot-scope="record">
        <a-switch
          size="small"
          :key="record.id"
          :name="`u__${record.id}`"
          :checked="record.is_active"
          :defaultChecked="record.is_active"
          @click="onClickActive"
        >
        </a-switch>
      </template>
      <template slot="role" slot-scope="record">
        <a-tag :color="tagColor(record)">
          {{ record }}
        </a-tag>
      </template>
      <template slot="action" slot-scope="record">
        <a-button type="dashed" size="small" @click="onUpdate(record.id)">
          <a-icon type="edit"></a-icon>
        </a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="users.length"
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
  import {
    isNotNull,
    tagColor,
    colorActive,
    cleanAccents
  } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  import CardTable from "@/components/card/CardTable.vue";
  export default {
    components: { CardTable },
    data() {
      return {
        pagination: {},
        keyword: null
      };
    },
    computed: {
      ...mapGetters("user", ["loading", "users", "getUserById"]),
      columns() {
        const columns = [
          {
            title: "#No",
            scopedSlots: { customRender: "no" }
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
            key: "status",
            scopedSlots: { customRender: "status" }
          },
          {
            title: "Active",
            scopedSlots: { customRender: "active" }
          },
          {
            title: "Quyền",
            dataIndex: "role",
            scopedSlots: { customRender: "role" }
          },
          {
            title: "Tùy chọn",
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
      eventBus.$on("retrieveUsers", this.retrieveUsers);
    },
    beforeDestroy() {
      eventBus.$off("retrieveUsers", this.retrieveUsers);
    },
    methods: {
      ...mapActions("user", ["fetchUsers", "updateActiveUser", "deleteUser"]),
      retrieveUsers() {
        this.fetch();
      },
      onOpen() {
        eventBus.$emit("openDrawerUser", true);
      },
      onUpdate(userId) {
        const userUpdate = this.getUserById(userId);
        eventBus.$emit("setFormUser", userUpdate, userId, true, true);
      },
      onDelete(userId) {
        this.deleteUser(userId);
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
      onClickActive(checked, e) {
        const userId = +e.target.name.replace("u__", "");
        const user = {
          id: userId,
          values: { is_active: checked }
        };
        this.updateActiveUser(user);
      },
      onReset() {
        this.retrieveUsers();
        this.keyword = null;
      },
      async fetch(params = {}) {
        const pagination = { ...this.pagination };
        const { data, config } = await this.fetchUsers(params);
        window.history.replaceState("users", "", config.url);
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
