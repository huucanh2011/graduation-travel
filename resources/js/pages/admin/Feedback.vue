<template>
  <card-table :title="title" @reset="reset" @search="search">
    <a-table
      :columns="columns"
      :loading="loading"
      :rowKey="record => record.id"
      :dataSource="feedbacks"
      :pagination="false"
      @change="onTableChange"
    >
      <template slot="seen" slot-scope="record">
        <a-switch
          size="small"
          :key="record.id"
          :name="`f__${record.id}`"
          :checked="record.is_active"
          :defaultChecked="record.seen"
          @click="onClickSeen"
        >
        </a-switch>
      </template>
      <template slot="action" slot-scope="record">
        <a-popconfirm v-if="feedbacks.length" title="Bạn có chắc chắn?" @confirm="onDelete(record.id)">
          <a-button type="dashed" size="small">
            <a-icon type="delete"></a-icon>
          </a-button>
        </a-popconfirm>
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
  import { convertOrderBy } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  import CardTable from "@/components/card/CardTable.vue";
  import PaginationTable from "@/components/pagination/PaginationTable";
  export default {
    components: { CardTable, PaginationTable },
    data() {
      return {
        title: "Phản hồi",
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
      ...mapGetters("feedback", ["loading", "feedbacks"]),
      columns() {
        const columns = [
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
            title: "Số điện thoại",
            dataIndex: "phone_number"
          },
          {
            title: "Tiêu đề",
            dataIndex: "subject"
          },
          {
            title: "Nội dung",
            dataIndex: "content"
          },
          {
            title: "Đã xem",
            scopedSlots: { customRender: "seen" }
          },
          {
            title: "Ngày gửi",
            dataIndex: "created_at",
            sorter: true
          },
          {
            title: "Tùy chọn",
            key: "action",
            width: "10%",
            align: "center",
            scopedSlots: { customRender: "action" }
          }
        ];
        return columns;
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      ...mapActions("feedback", ["fetchFeedbacks", "updateFeedback", "deleteFeedbacks"]),
      async fetchData(params = {}) {
        const pagination = { ...this.pagination };
        const { data, config } = await this.fetchFeedbacks(params);
        pagination.total = data.meta.total;
        pagination.pageSize = data.meta.per_page;
        pagination.current = data.meta.current_page;
        this.pagination = pagination;
        window.history.replaceState("feedbacks", "", config.url);
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
      onClickSeen(is_active, e) {
        const id = +e.target.name.replace("f__", "");
        const feedback = { id, values: { is_active } };
        this.updateFeedback(feedback);
      }
    }
  };
</script>

<style></style>
