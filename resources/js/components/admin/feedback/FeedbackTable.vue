<template>
  <a-card title="Danh sách phản hồi" :bordered="false">
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
      :dataSource="feedbacks"
      :pagination="pagination"
      @change="onChange"
    >
      <template slot="seen" slot-scope="record">
        <a-checkbox
          @change="onChangeSeen"
          :defaultChecked="record.seen"
          :value="record.id"
        ></a-checkbox>
      </template>
      <template slot="action" slot-scope="record">
        <a-popconfirm
          v-if="feedbacks.length"
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
  import { isNotNull, cleanAccents } from "@/helpers/tools";
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        pagination: {},
        keyword: null
      };
    },
    computed: {
      ...mapGetters("feedback", ["loading", "feedbacks", "getFeedbackById"]),
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
      this.fetch();
    },
    methods: {
      ...mapActions("feedback", [
        "fetchFeedbacks",
        "updateFeedback",
        "deleteFeedbacks"
      ]),
      retrieveFeedbacks() {
        this.fetch();
      },
      onDelete(feedbackId) {
        this.deleteFeedbacks(feedbackId);
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
        this.retrieveFeedbacks();
        this.keyword = null;
      },
      onChangeSeen(e) {
        const feedback = {
          id: e.target.value,
          values: { seen: e.target.checked }
        };
        this.updateFeedback(feedback);
      },
      async fetch(params = {}) {
        const pagination = { ...this.pagination };
        const { data, config } = await this.fetchFeedbacks(params);
        window.history.replaceState("feedbacks", "", config.url);
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
      }
    }
  };
</script>

<style></style>
