<template>
  <div class="pagination-container">
    <div class="button" @click="toFirstPage">
      <img src="../../assets/images/icon-arrow1.png" />
    </div>

    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :total="total"
      v-bind="$attrs"
      prev-text="PREV"
      next-text="NEXT"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <div class="button" @click="toLastPage">
      <img src="../../assets/images/icon-arrow2.png" />
    </div>

    <div class="pageNumber">{{ page }} of {{ Math.ceil(total / limit) }}</div>
  </div>
</template>

<script>
import { scrollTo } from "@/utils/scroll-to";
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    layout: {
      type: String,
      default: "prev, pager, next",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    toFirstPage() {
      this.currentPage = 1;
      this.$emit("pagination", { page: 1, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    toLastPage() {
      let lastPage = Math.ceil(this.total / this.limit);
      this.currentPage = lastPage;
      this.$emit("pagination", { page: lastPage, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pagination-container {
  padding: 63px 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 59px;
    height: 59px;
    background: rgba(14, 15, 17, 0.39);
    border-radius: 10px;
    cursor: pointer;
    img {
      width: 17px;
      height: 17px;
    }
  }

  /deep/.btn-prev {
    width: 76px;
    height: 59px;
    background: rgba(14, 15, 17, 0.39);
    border-radius: 11px;
    font-size: 16px;
    font-family: Roboto-Regular;
    color: #727272;
  }

  /deep/.btn-next {
    width: 76px;
    height: 59px;
    background: rgba(14, 15, 17, 0.39);
    border-radius: 11px;
    font-size: 16px;
    font-family: Roboto-Regular;
    color: #727272;
  }

  /deep/.el-pagination.is-background .el-pager li {
    width: 59px;
    height: 59px;
    background: rgba(14, 15, 17, 0.39);
    border-radius: 10px;
    font-size: 16px;
    font-family: Roboto-Regular;
    line-height: 59px;
    color: #727272;
  }
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #caaa61;
    color: #ffffff;
  }
  .pageNumber {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 76px;
    height: 59px;
    background: rgba(14, 15, 17, 0.39);
    border-radius: 11px;

    font-size: 16px;
    font-family: Roboto-Regular;
    color: #727272;
    margin-left: 14px;
  }
}
</style>
