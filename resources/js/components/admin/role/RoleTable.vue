<template>
  <a-table
    :columns="columns"
    :loading="isLoading"
    :rowKey="record => record.id"
    :dataSource="roles"
    :pagination="pagination"
    @change="handleTableChange"
  >
    <template slot="no" slot-scope="text, record, index">
      <strong>{{ ++index }}</strong>
    </template>
    <!-- <template slot="createdAt" slot-scope="record">
        <span>{{ record | date }}</span>
      </template>

      <template slot="updatedAt" slot-scope="record">
        <span>{{ record | date }}</span>
      </template> -->
    <template slot="action" slot-scope="record">
      <a-button type="dashed" size="small" @click.prevent="onUpdate(record.id)">
        <a-icon type="edit"></a-icon>
      </a-button>
      <a-divider type="vertical" />
      <a-popconfirm
        v-if="roles.length"
        title="Bạn có chắc chắn?"
        @confirm="() => onDelete(record.id)"
      >
        <a-button type="dashed" size="small">
          <a-icon type="delete"></a-icon>
        </a-button>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script>
  const columns = [
    {
      title: "#No",
      width: "10%",
      scopedSlots: { customRender: "no" }
    },
    {
      title: "Tên quyền",
      dataIndex: "role_name",
      sorter: true
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      sorter: true,
      width: "15%"
    },
    {
      title: "Last update",
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
  import IsEmptyObject from "@/helpers/IsEmptyObject";
  import { vp } from "@/helpers/tools";
  import { mapActions, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        pagination: {},
        columns,
      }
    },
    created() {
      this.fetch()
    },
    computed: {
      ...mapGetters("role", ["roles", "dataCache", "isLoading"]),
    },
    methods: {
      ...mapActions("role", [
        "FETCH_ROLES",
        "GET_ROLE",
        "DELETE_ROLE"
      ]),
      async onUpdate(roleId) {
        vp.$message.loading("Waiting...", 0.5);
        await this.GET_ROLE(roleId);
        let visible = true, editMode = true;
        this.$emit('setFormRole', roleId, this.dataCache, visible, editMode)
      },
      onDelete(roleId) {
        this.DELETE_ROLE(roleId);
        this.fetch(1);
      },
      async fetch(page = 1, params = {}) {
        const payload = {
          page: page,
          params: params
        };
        const { data } = await this.FETCH_ROLES(payload);
        const pagination = { ...this.pagination };
        pagination.total = data.meta.total;
        pagination.pageSize = data.meta.per_page;
        pagination.current = page;
        this.pagination = pagination;
      },
      handleTableChange(pagination, filters, sorter) {
        let params;
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        if (!IsEmptyObject(sorter)) {
          params = {
            sortBy: sorter.field,
            orderBy: sorter.order === "ascend" ? "asc" : "desc"
          };
        }
        this.fetch(pager.current, params);
        if(params !== undefined && params !== '' && params !== null && !IsEmptyObject(params)) {
          window.history.replaceState('roles', '', `roles?page=${pager.current}&sortBy=${params.sortBy}&orderBy=${params.orderBy}`)
        } else {
          window.history.replaceState('roles', '', `roles?page=${pager.current}`)
        }
      }
    }
  };
</script>

<style></style>
