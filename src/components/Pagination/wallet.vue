<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
	  popper-class="el-dropdown-my"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    limit: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default() {
        // return [2, 4, 8, 10]
		return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'prev, pager, next, sizes'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination-container {
	/* background: #fff; */
	// padding: 32px 16px;
	// margin-top: 75px;
	/deep/ .el-pagination {
		text-align: left;
		//修改每页按钮、上一页、下一页按钮样式
		&.is-background .el-pager li,.btn-next, .btn-prev {
			width: 59px;
			height: 59px;
			line-height: 59px;
			text-align: center;
			font-size: 18px;
			border-radius: 11px;
			color: #727272!important;
			background-color: #0E0F11 ;
		}
		 //选择每页条数按钮样式
		.el-select .el-input .el-input__inner {
			padding-right: 10px;
			width: 100px;
			height: 59px;
			font-size: 16px;
			background-color: #0E0F11;
			color: #727272;
			border: none;
			border-radius: 11px;
		}
		 //选择每页天数按钮上面的 字体图标 (原图标太细)
		.el-select .el-input .el-select__caret {
			color: #fff!important;
			font-weight: 900;
		}
		 //跳转到某页的输入框样式
		.el-pagination__editor.el-input .el-input__inner {
			background-color: #0E0F11 ;
			background: transparent;
			color: #fff;
		}
		 //当前所在页码的按钮样式
		&.is-background .el-pager li:not(.disabled).active {
			// background-color: rgba(0, 175, 188, .4);
			background-color: #D3AA53;
			color: #fff!important;
		}
	}
}
.pagination-container.hidden {
  display: none;
}
</style>
<style lang="less">
.el-dropdown-my {
	// background-color: transparent!important;
	background-color: #0E0F11!important;
	border: none;
	// border: 1px solid #05cdd9!important;
	min-width: 100px!important;
	width: 100px;
	.el-select-dropdown__list{
		padding: 4px!important;
	}
	.el-select-dropdown__item {
		font-size: 13px!important;
		padding: 0 10px!important;
		text-align: center;
		border-radius: 3px;
		color: #727272;
		&.selected {
			background-color: #D3AA53;
			color: #fff;
		}
	}
	.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
		background-color: rgba(211,170,83, .4);
	}
	.popper__arrow{
		// border-top-color: #05cdd9!important;
		border-top-color: #0E0F11!important;
		left: 50% !important;
		transform: translateX(-50%);
		&::after {
			display: none!important;
		}
	}
}
</style>
