<template>
	<div :class="{'hidden':hidden}" class="pagination-container">
		<el-pagination :background="background" :page-size.sync="pageSize" :layout="layout" :page-sizes="pageSizes"
			:total="total" :current-page="page" v-bind="$attrs" @size-change="handleSizeChange"
			@current-change="handleCurrentChange" />
	</div>
</template>

<script>
	import {
		scrollTo
	} from '@/utils/scroll-to'
	import lang from 'element-ui/lib/locale/lang/en' //设置英文，将pagination设置成英文
	import locale from 'element-ui/lib/locale'

	locale.use(lang)


	export default {
		data() {
			return {
				pagination_index: 1 //设置默认的分页下标
			}
		},

		name: 'Pagination',
		props: {
			total: {
				required: true,
				type: Number
			},
			limit: {
				type: Number,
				default: 20
			},
			pageSizes: {
				type: Array,
				default () {
					return [10, 20, 30, 50]
				}
			},
			layout: {
				type: String,
				default: 'total, sizes, prev, pager, next, jumper'
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
			},
			page: {
				type: Number,
				default: 1
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
				this.$emit('pagination', {
					page: this.currentPage,
					limit: val
				})
				if (this.autoScroll) {
					scrollTo(0, 800)
				}
			},
			handleCurrentChange(val) {
				this.$emit('pagination', {
					page: val,
					limit: this.pageSize
				})
				this.$emit("page_change", {
					page: val,
					limit: this.pageSize
				}) //发送事件传递当前页数
				if (this.autoScroll) {
					scrollTo(0, 800)
				}
			}
		}
	}
</script>

<style>
	/deep/ .el-select-dropdown .el-popper .el-scrollbar__view .el-select-dropdown__list{
		background-color: #FF3333 !important;
	}
</style>
<style scoped>
	/deep/.el-input--suffix .el-input__inner {
		/* background-color: #fff; */
		background-color: #0e0f11;
		height: 28px;
		color: #606266;
		border-radius: 19px;
		border: 1px solid #2D2D2D;
	}

	.pagination-container {
		/* background: #fff; */
		padding: 32px 16px;
	}

	.pagination-container.hidden {
		display: none;
	}
	button{
		background-color: #0e0f11;
	}
	/deep/ .el-pagination.is-background .btn-next, /deep/ .el-pagination.is-background .btn-prev, /deep/ .el-pagination.is-background .el-pager li{
		background-color: #0e0f11 !important;
	}
	/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
		background-color: #409eff !important;
	}
	/deep/ .el-scrollbar__wrap {
		background-color: #0e0f11 !important;
		color: #FFFFFF !important;
	}
	/* /deep/ .el-select-dropdown__item.hover, /deep/ .el-select-dropdown__item:hover{
		background-color: #409eff !important;
	} */
	/deep/ .el-pagination__jump .el-input__inner{
		background-color: #0e0f11 !important;
		border: 1px solid #2d2d2d !important;
		color: #FFFFFF !important;
		
	}
</style>
