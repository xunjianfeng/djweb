<template>
	<div class="index">
		<div class="container">
			<!-- Your Email 弹窗 -->
			<div class="mark_cancel" v-if="update_up == true" @click.stop="update_up = false">
				<img src="@/assets/images/cancel.png" >
			</div>
			<div class="mark_bac" v-if="update_up == true"></div>
			<div class="mark_Top_container" v-if="update_up == true">
				<div class="mark_my_head">
					<img class="head_img" :src="HOST + user_info.avatar" v-if="user_info.avatar">
					<img class="head_img" src="../../assets/images/default.png" v-else />
					<div class="head_userinfo">
						<div class="user_info_tit">{{user_info.fullName}}</div>
						<div class="user_info_text">{{gameType}}</div>
					</div>
				</div>
				<div class="mark_my_content ">
					<div class="mark_evaluate">
						<el-rate v-model="score" ></el-rate>
					</div>
					<div class="mark_field">
						<textarea cols="30" rows="16" v-model="evaluate" @input="team_name" maxlength="200">
							We believe your delivery is done. Please rate a review for your companion’s delivery. This encourages Companion to keep their momentum.
						</textarea>
						<div class="limit_num">({{num}}/200)</div>
					</div>
				</div>
				<div class="mark_my_foot">
					<div class="foot_button" @click.stop="companionReview">Confirm</div>
				</div>
			</div>
			<!-- Your Email end -->
			<LeftView :index="4"></LeftView>
			<div class="content_right">
				<div class="content_right_form">
					<div class="content_my_order">
						<div class="my_tit">My Order</div>
						<div class="my_contaniner">
							<div class="my_order_table">
								<div class="order_table_head">
									<div class="table_head_title">Amount (Coin)</div>
									<div class="table_head_title">Order Count</div>
									<div class="table_head_title">Upcoming</div>
								</div>
								<div class="order_table_btom">
									<div class="table_btom_text">{{dataForm.amount||0}}</div>
									<div class="table_btom_text">{{dataForm.orderCount||0}}</div>
									<div class="table_btom_text">{{dataForm.upcoming||0}}</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Order Details 块 -->
					<div class="order_part">
						<div class="title">Order Details</div>
						<div class="order_choice">
							<div class="choice_left">
								<div class="status">
									<p class="status_text">Status</p>
									<div class="options">
										<el-select v-model="listQuery.state" placeholder="Please select" style="margin-right: 20px;"
										 :popper-append-to-body="false" @change="handleFilter">
										 <el-option label="All" value=""></el-option>
											<el-option label="To accept order" value="1"></el-option>
											<el-option label="To complete" value="2"></el-option>
											<el-option label="To leave a review" value="3"></el-option>
											<el-option label="Completed" value="4"></el-option>
											<el-option label="Rejected" value="5"></el-option>
											
										</el-select>
										<!-- 
										<select v-model="listQuery.state" @change="handleFilter">
											<option value="">All</option>
											<option value="1">待接单</option>
											<option value="2">待完成</option>
											<option value="3">To leave a review</option>
											<option value="4">Completed</option>
											<option value="5">Rejected</option>
										</select> -->
										<!-- <img class="dropdown" src="../../assets/images/dropdown.png" /> -->
									</div>
								</div>
								<div class="sort_by">
									<p class="sort_by_text">Sort by</p>
									<div class="options">
										<el-select v-model="listQuery.order.create_time" @change="handleFilter" placeholder="Please select" style="margin-right: 20px;"
										 :popper-append-to-body="false">
											<el-option label="New to Old" value="desc"></el-option>
											<el-option label="Old to New" value="asc"></el-option>
										</el-select>
										<!-- <select v-model="listQuery.order.create_time" @change="handleFilter">
											<option value="desc">New to Old</option>
											<option value="asc">Old to New</option>
										</select> -->
										<!-- <img class="dropdown" src="../../assets/images/dropdown.png" /> -->
									</div>
								</div>
							</div>

							<div class="search">
								<input placeholder="Search Order ID" v-model="listQuery.orderId"/>
								<button class="btn" @click="handleFilter">
									<img src="../../assets/images/search.png" />
								</button>
								<!-- <img src="../../assets/images/search.png" /> -->
							</div>
						</div><!-- order_choice -->
						<!-- 没有数据 -->
						<div class="no_data_area"  v-if="order_list == ''" >
							<div class="no_data">
								<img src="../../assets/images/no_tournament.svg" />
								<div class="no_data_text">No order</div>
							</div>
						</div>
						<!-- 有数据 -->
						<div class="order_form" v-for="(item,index) in order_list" :key="index" >
							<div class="order_form_header" >
								<div class="left_block" @click="openDetail(item.orderId)">
									<p>Date<span>{{(item.createTime).substring(0,10)}}</span></p>
									<!-- <p>Buyer<span>{{item.fullName}}</span></p> -->
									<p>Order No<span>{{item.orderId}}</span></p>
									<p>Game Type<span>{{item.gameName}}</span></p>
									<p class="options">
										Status
										<span :style="item.state==1?'color: #FF971A;':item.state==2?'color: #23B709;':item.state==3?'color: #FF971A;':item.state==4?'color: #00AAFF;':item.state==5?'color: #FF3636;':''">
											{{item.state==1?'To accept order':item.state==2?'To complete':item.state==3?'To leave a review':item.state==4?'Completed':item.state==5?'Rejected':''}}
										</span>
										<!-- <img class="dropdown" src="../../assets/images/dropdown.png" /> -->
									</p>
								</div>
								<div class="right_block">
									<img src="../../assets/images/close.png" @click="item.detail_open = false"/>
								</div>
								
							</div><!-- order_form_header -->
							 <!-- v-show="item.state==1||item.state==4||item.state==2" -->
							<div class="order_form_user" v-if="item.detail_open == true">
								<div class="user">
									<img class="user_pic" :src="HOST+item.cavatar" v-if="item.cavatar"/>
									<img class="user_pic" src="../../assets/images/default.png" v-else />
									<p>{{item.cfullName}}</p>
								</div>
								<div class="form_user_right" v-show="item.state==1">
									<!-- <div class="user_right_jian">
										<img  class="jian_img" src="../../assets/images/ban.png" />
										<div class="jian_text">Reject Order</div>
									</div> -->
									<img class="msg" src="../../assets/images/chat.png" />
								</div>
								<div class="form_user_right" v-show="item.state==2">
									<div class="form_review" @click.stop="companionComplete(item.orderId)">Completed</div>
								</div>
								<div class="form_user_right" v-show="item.state==3">
									<div class="form_review" @click.stop="update_up = true;companionOrderId=item.orderId;gameType=item.gameName">Review</div>
								</div>
							</div>
							 <!-- v-show="item.state==1||item.state==4||item.state==2" -->
							<div class="order_form_table"  v-if="item.detail_open == true">
								<div class="order_table_header">
									<p>Game Type</p>
									<p>Play Date</p>
									<p>Unit Price</p>
									<p>Quantity</p>
									<p>Price</p>
									<p>Remarks</p>
								</div>
								<div class="order_table_body">
									<div>
										<p>{{item.gameName}}</p>
										<p>{{item.startDate}}</p>
										<p>{{item.price}} {{item.payMethod}}</p>
										<p>{{item.hours}}</p>
										<p>{{item.totalAmount}} {{item.payMethod}}</p>
										<p>-</p>
									</div>
								</div>
							</div>
						</div>
						<!-- 分页组件 -->
						<div class="order_pagination">
							<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"  @pagination="handlePageChange"/>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import LeftView from '@/components/order/left.vue'
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	import Listing from '@/mixin/Listing';
	import {
		companionOrderList, companionComplete, companionAgree, companionDetail, companionReview } from '@/api/order'
	export default {
		name: "index",
		mixins: [Listing],
		components:{
			LeftView,
			Pagination
		},
		data() {
			return {
				update_up:false,
				detail_up:false,
				gameType:'',
				dataForm: {},
				order_list: [],
				companionOrderId: '',
				evaluate: '',
				score: '',
				listQuery: {
					orderId: '',
					order: {create_time: 'desc'},
					state: '',
					startTime: '',
					endTime: '',
					page: 1,
					size: 10,
					isme:false
				},
				user_info:{},
				num:0
			}
		},
		mounted() {
			this.user_info = JSON.parse(sessionStorage.getItem("userinfo"))
			console.log(this.user_info)
		},
		methods: {
			team_name(){
				this.num = this.evaluate.length
			},
			//筛选
			handleFilter(){
				this.listQuery.page = 1;
				this.getList();
			},
			getList() {
				companionOrderList(this.listQuery).then(res => {
					const {
						list,orderCount,amount,complete,upcoming
					} = res.data
					for ( let i in list.list ) {
						list.list[i]['createTime'] = this.initDete(list.list[i]['createTime'])
						list.list[i]['startDate'] = this.initDete(list.list[i]['startDate'])
						list.list[i]['detail_open'] = false
					}
					this.total_count = list.total
					this.order_list = list.list;
					// console.log(this.order_list)
					this.dataForm = { orderCount, amount, complete, upcoming }
				})
			},
			openDetail(orderId){
				// console.log(orderId)
				// this.detail_up = true
				for(let i=0;i<this.order_list.length;i++){
					// this.order_list[i]['detail_open'] = false
					if(this.order_list[i].orderId == orderId){
						// this.order_list[i]['detail_open'] = true;
						this.order_list[i]['detail_open'] = ! this.order_list[i]['detail_open'];
					}else{
						this.order_list[i]['detail_open'] = false;
						// this.detail_up = false
					}
				}
				// this.detail_up = true
			},
			// 评论陪玩
			companionReview() {
				let { evaluate, companionOrderId, score } = this
				let params = {
					companionOrderId,
					evaluate,
					score
				}
				companionReview(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.companionOrderId = ''
					this.evaluate = ''
					this.score = ''
					this.update_up = false
					this.getList()
				})
			},
			// 完成订单
			companionComplete(companionOrderId) {
				let params = {
					companionOrderId,
				}
				companionComplete(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.getList()
				})
			},
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 90%;
		margin-left: 61px;
		display: flex;
		justify-content: space-between;/* 横向中间自动空间 */
		flex-wrap: wrap;/* 换行 */
		padding-bottom: 30px;
		// 弹窗 start
		.mark_cancel{
			position: fixed;
			right: 80px;
			top: 150px;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
			z-index: 999;
		}
		.mark_bac{
			width: 100%;
			height: 100vh;
			background:#000000b3;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 88;
		}
		.mark_Top_container{
			position: fixed;
			left: 490px;
			top: 105px;
			z-index: 999;
			width: 682px;
			padding: 49px 62px 47px 87px;
			background: #0E0F11;
			border-radius: 32px;
			overflow: hidden;
			display: flex;
			flex-flow: column;
			align-items: center;
			.mark_my_head{
				display: flex;
				align-items: center;
				margin-bottom: 44px;
				.head_img{
					width: 120px;
					height: 119px;
					border-radius: 12px;
					margin-right: 56px;
					object-fit: cover;
				}
				.head_userinfo{
					.user_info_tit{
						color: #FFFFFF;
						font-family:'Roboto-Medium';
						font-size: 22px;
					}
					.user_info_text{
						color: #727272;
						font-size: 18px;
						font-family:'Roboto-Regular';
					}
				}
			}
			.mark_my_content{
				width: 100%;
				margin-bottom: 47px;
				.mark_evaluate{
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 50px;
					/deep/ .el-rate__icon {
						font-size: 60px;
					}
					.eval_img{
						width: 44px;
						height: 44px;
						margin-right: 25px;
					}
					.eval_img:last-child{
						margin-right: 0px;
					}
				}
				.mark_field{
					height: 375px;
					padding: 30px 40px 20px 40px;
					background: #000000;
					border-radius: 30px;
					overflow: hidden;
					textarea{
						width: 100%;
						color: #fff;
						font-family:'Roboto-Regular';
						font-size: 20px;
						border: none;
						resize:none;
						background-color: #000;
					}
					.limit_num {
						// width: 80%;
						position: absolute;
						right: 90px;
						bottom: 180px;
						z-index: 999;
						color: #ffffff;
						color: rgba(255,255,255,0.5);
						font-family:'Roboto-Regular';
						font-size: 20px;
						background-color: #000;
					}
				}
			}
			.mark_my_foot{
				.foot_button{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 163px;
					height: 58px;
					color: #0E0F11;
					font-size: 18px;
					background: #DBA83F;
					border-radius: 25px;
					cursor: pointer;
				}
			}
		}
		// 弹窗 end
		.content_right {
			width: calc(100% - 370px);
			.content_right_form {
				border-radius: 50px;
				// margin-top: 122px;
				margin-top: 50px;
				color: #ffffff;
				.content_my_order{
					.my_tit{
						color: #fff;
						font-size: 22px;
						margin-bottom: 23px;
						font-family:'Quicksand-Bold';
					}
					.my_contaniner{
						width: 100%;
						background: #0E0F11;
						border-radius: 29px;
						.my_order_table{
							.order_table_head{
								padding: 0 53px;
								height: 55px;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: space-between;
								border-bottom:2px solid #2D2D2D;
								.table_head_title{
									width: 33%;
									color: #727272;
									font-family:'Roboto-Bold';
								}
							}
							.order_table_btom{
								padding: 25px 53px;
								font-size: 25px;
								display: flex;
								align-items: center;
								justify-content: space-between;
								.table_btom_text{
									width: 33%;
									color: #fff;
									font-family:'Roboto-Regular';
								}
							}
						}
					}
				}
				.order_part {
					margin-top: 73px;
					.title {
						color: #FFFFFF;
						font-size: 22px;
						font-family:'Quicksand-Bold';
					}
					.order_choice {
						display: flex;
						justify-content: space-between;

						.choice_left {
							display: flex;

							.status {
								.status_text {
									font-size: 18px;
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									font-family:'Roboto-Regular';
								}
							}

							.sort_by {
								.sort_by_text {
									font-size: 18px;
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									font-family:'Roboto-Regular';
								}
							}

							div {
								margin-right: 20px;

								.options {
									cursor: pointer;
									/deep/ .el-select .el-input .el-input__inner {
										border: 0px;
										width: 230px;
										height: 59px;
										color: #fff;
										font-family:'Roboto-Regular';
										border-radius: 20px;
										background-color: #0E0F11;
										border: 1px solid #0E0F11;
									}
									
									/deep/ .el-select-dropdown {
										background-color: #0E0F11;
										border:  1px solid rgba(255,255,255,0.2);
									}
									
									/deep/ .el-icon-arrow-up:before {
										content: "\e78f";
									}
									
									/deep/ .el-icon-arrow-down:before {
										content: "\e790";
									}
									//修改单个的选项的样式
									/deep/ .el-select-dropdown__item {
										background-color: transparent;
										color: #fff;
										font-family:'Roboto-Regular';
										text-align: center;
									}
									/deep/ .el-select-dropdown__item.hover{
										background-color: #1D2023;
									}
									/deep/ .el-select-dropdown__item.selected{
										background-color: #1D2023;
									}
								}
							}
						}
						.search {
							position: relative;
							top: 40px;
							left: 55px;
							input {
								width: 315px;
								height: 60px;
								background: #0E0F11;
								border-radius: 23px;
								font-size: 18px;
								border: none;
								padding-left: 35px;
								color: #565656;
								font-family:'Roboto-Regular';
							}
							.btn {
								width: 60px;
								height: 60px;
								background: #D3AA53 0% 0% no-repeat padding-box;
								border: none;
								border-radius: 22px;
								opacity: 1;
								position: relative;
								right: 60px;
								top: 3px;
								cursor: pointer;
								img {
									width: 22px;
									height: 22px;
								}
							}
						}
						
					}
					.no_data_area{
						width: 100%;
						height:500px;
						display: flex;
						align-items: center;
						justify-content: center;
						.no_data{
							text-align: center;
							img{
								
							}
							.no_data_text{
								color: #565656;
								font-family:'Roboto-Regular';
								font-size: 20px;
								margin-top: 20px;
							}
						}
					}
					.order_form {
						width: 100%;
						background: #0E0F11;
						border-radius: 29px;
						opacity: 1;
						margin-top: 30px;

						.order_form_header {
							// width: calc(100%-100px);
							width: 100%;
							display: flex;
							height: 90px;
							align-items: center;
							border-bottom: 2px solid #2D2D2D;
							justify-content: space-between;
							cursor: pointer;
							.left_block{
								width: 90%;
								display: flex;
								align-items: center;
								justify-content: space-between;
								p {
									font-size: 18px;
									color: #727272;
									margin-left: 24px;
									font-family:'Roboto-Regular';
									span {
										margin-left: 5px;
										font-size: 20px;
										color: #ffffff;
										font-family:'Roboto-Bold';
									}
								
									.dropdown {
										width: 10px;
										height: 8px;
										position: relative;
										right: 30px;
									}
								
									select {
										width: 204px;
										height: 54px;
										border: 2px solid #2D2D2D;
										border-radius: 8px;
										background-color: #1D2023;
										color: #FFCE00;
										font-family:'Roboto-Regular';
										/*取消默认箭头开始*/
										appearance: none;
										-moz-appearance: none;
										-webkit-appearance: none;
										/*取消默认箭头结束*/
										padding-left: 5px;
									}
								}
							}
							.right_block{
								cursor: pointer;
								img {
									width: 26px;
									height: 26px;
									margin-right: 24px;
								}
							}
							
						}
						.order_form_user {
							display: flex;
							align-items: center;
							margin-top: 26px;
							width: 100%;
							justify-content: space-between;
							.user {
								display: flex;
								margin-left: 34px;
								p {
									text-align: left;
									letter-spacing: 0px;
									color: #FFFFFF;
									font-family:'Roboto-Bold';
									font-size: 20px;
									margin-left: 20px;
								}
								.user_pic {
									width: 74px;
									height: 74px;
									object-fit: cover;
									border-radius: 10px;
								}
							}
							.form_user_right{
								display: flex;
								align-items: center;
								.user_right_jian{
									display: flex;
									align-items: center;
									margin-right: 45px;
									.jian_img{
										width: 29px;
										height: 29px;
										margin-right: 18px;
									}
									.jian_text{
										color: #FF1717;
										font-size: 18px;
										font-family:'Roboto-Bold';
									}
								}
								.msg {
									width: 33px;
									height: 33px;
									margin-right: 59px;
								}
								.form_review{
									width: 163px;
									height: 51px;
									line-height: 51px;
									color: #D3AA53;
									font-family:'Roboto-Regular';
									cursor: pointer;
									font-size: 18px;
									text-align: center;
									border: 1px solid #D3AA53;
									border-radius: 24px;
									margin-right: 42px;
								}
							}
							
						}
						.order_form_table {
							margin-top: 33px;
							.order_table_header {
								height: 64px;
								display: flex;
								align-items: center;
								background: #27292D;
								p {
									width: 20%;
									height: 64px;
									display: flex;
									align-items: center;
									color: #898989;
									font-size: 18px;
									margin-left: 27px;
									font-family:'Roboto-Regular';
								}
							}

							.order_table_body {
								div {
									display: flex;
									height: 68px;
									border-bottom: 2px solid #2D2D2D;
									font-size: 18px;
									color: #FFFFFF;
									font-family:'Roboto-Regular';
									p {
										width: 20%;
										margin-left: 27px;
									}
								}
								div:last-child {
									border-bottom: 0px;
								}
								.total_price {
									p:first-child {
										width: 65%;
									}
								}
							}
						}
					}
					
					.order_pagination {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						margin-top: 110px;
						margin-bottom: 40px;
					}

				}
			}
		}
	}
</style>
