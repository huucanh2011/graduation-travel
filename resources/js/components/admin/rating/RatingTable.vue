<template>
  <a-card title="Danh sách đánh giá tour" :bordered="false">
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
      :dataSource="ratings"
      :pagination="pagination"
      @change="onChange"
    >
      <template slot="rating_scores" slot-scope="record">
        <span>
          {{ record }}
          <a-icon type="star" theme="twoTone" twoToneColor="#ffcb2b" />
        </span>
      </template>
      <template slot="active" slot-scope="record">
        <a-checkbox
          @change="onChangeActive"
          :defaultChecked="record.is_active"
          :value="record.id"
        ></a-checkbox>
      </template>
      <template slot="action" slot-scope="record">
        <a-popconfirm
          v-if="ratings.length"
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
      ...mapGetters("rating", ["loading", "ratings", "getRatingById"]),
      columns() {
        const columns = [
          {
            title: "Tour",
            dataIndex: "tour"
          },
          {
            title: "Người đánh giá",
            dataIndex: "author"
          },
          {
            title: "Điểm",
            dataIndex: "rating_scores",
            sorter: true,
            scopedSlots: { customRender: "rating_scores" }
          },
          {
            title: "Nội dung",
            dataIndex: "rating_content"
          },
          {
            title: "Active",
            scopedSlots: { customRender: "active" }
          },
          {
            title: "Ngày đánh giá",
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
      ...mapActions("rating", ["fetchRatings", "updateRating", "deleteRating"]),
      retrieveRatings() {
        this.fetch();
      },
      onDelete(ratingId) {
        this.deleteRating(ratingId);
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
        this.retrieveRatings();
        this.keyword = null;
      },
      onChangeActive(e) {
        const feedback = {
          id: e.target.value,
          values: { is_active: e.target.checked }
        };
        this.updateRating(feedback);
      },
      async fetch(params = {}) {
        const pagination = { ...this.pagination };
        const { data, config } = await this.fetchRatings(params);
        window.history.replaceState("ratings", "", config.url);
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
