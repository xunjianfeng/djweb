<template>
	<div class="index">
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<!-- Top up 弹窗 -->
				<div class="mark_cancel" v-if="update_up == true" @click.stop="update_up = false">
					<img src="@/assets/images/cancel.png" alt="">
				</div>
				<div class="mark_Top_container" v-if="update_up == true">
					<div class="top_block">
						<div class="mark_top_head" @click.stop="up_mark">Top Up</div>
						<div class="mark_content">
							<div class="mark_content_head">
								<div class="mark_head_tit">Top Up Amount</div>
								<div class="mark_head_input">
									<div class="input_myr">MYR</div>
									<div class="input_border"></div>
									<div class="input_right">
										<input type="text" value="1,000">
									</div>
								</div>
							</div>
							<div class="mark_content_options">
								<div class="mark_head_tit">Please Choose Your Payment Mode</div>
								<div class="options_block bac_color">
									<div class="options_left">
										<div class="options_img">
											<img src="@/assets/images/img3.png" alt="">
										</div>
										<div class="options_text">PUBLIC BANK BERHAD</div>
										<div class="options_text2">[Default]</div>
									</div>
									<div class="options_right">
										* 7358
									</div>
								</div>
								<div class="options_block">
									<div class="options_left">
										<div class="options_img2">
											<img src="@/assets/images/img1.png" alt="">
										</div>
										<div class="options_text">MAYBANK</div>
									</div>
									<div class="options_right">
										* 1285
									</div>
								</div>
							</div>
							<div class="mark_foot">
								<div class="foot_left">
									<div class="foot_text">Need Pay</div>
									<div class="foot_text2">MYR 1,000</div>
								</div>
								<div class="foot_right">
									<div class="foot_button">Confirm</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- Top up end -->
				<div class="content_right_nav">
					<div class="adiv" @click="jump_pagee(1)">
						<p >Profile</p>
					</div>
					<div class="adiv" @click="jump_pagee(2)">
						<p class="av" >Wallet</p>
					</div>
					<!-- 隐蔽项start -->
					<!-- <div class="adiv" @click="jump_pagee(3)">
						<p >Host</p>
					</div>
					<div class="adiv" @click="jump_pagee(4)">
						<p >Companion</p>
					</div> -->
					<!-- 隐蔽项end -->
				</div>
				<div class="content_right_form">
					<div class="right_form_top">
						<div class="data_area">
							<!-- 隐蔽项start-目前已打开 -->
							<div class="">
								<p>Coin</p>
								<p>{{userinfo.coin || 0}}</p>
							</div>
							<!-- 隐蔽项end -->
							<div class="">
								<p>Point</p>
								<p>{{userinfo.point || 0}}</p>
							</div>
							<!-- 隐蔽项start-目前已打开 -->
							<div class="last_div">
								<p>My Prize</p>
								<p>+{{userinfo.prize || 0}}Coin</p>
							</div>
							<!-- 隐蔽项end -->
						</div>
						<div class="data_content">
							<!-- 隐蔽项start-目前已打开 -->
							<p class="block_1" @click.stop="up_mark(1)">Top Up</p>
							<!-- 隐蔽项end -->
							<div class="block_2" @click.stop="up_mark(2)">
								<p class="text">Redeem</p>
							</div>
						</div>
					</div><!-- right_form_top -->
					<div class="content_right_center">
						<div class="center_title">
							<!-- 正式服隐蔽项start-目前已打开 -->
							<div :class="title_index == 1?'title_active':'msg'" @click.stop="click_msg(1)">Coin Details</div>
							<!-- 正式服隐蔽项end -->
							<div :class="title_index == 2?'title_active':'msg'" @click.stop="click_msg(2)">Point Details</div>
							<!-- 未确认之前先隐蔽start -->
							<!-- <div :class="title_index == 3?'title_active':'msg'" @click.stop="click_msg(3)">Bank account info</div> -->
							<!-- 未确认之前先隐蔽end -->
						</div>
						<div class="center_choice" v-if="title_index == 1 || title_index == 2">
							<div class="choice_left">
								<div class="status" v-if="title_index == 1">
									<p class="status_text">Status</p>
									<div class="options">
										<el-select v-model="listQuery.transactionType" placeholder="Please select" style="margin-right: 20px;"
										 :popper-append-to-body="false" @change="selectChanged">
											<el-option label="All" value=""></el-option>
											<el-option label="Subscription / Top up" value="1"></el-option>
											<el-option label="Task" value="2"></el-option>
											<el-option label="Join a tournament" value="3"></el-option>
											<el-option label="Redemption order" value="4"></el-option>
											<el-option label="Predict and win" value="5"></el-option>
											<el-option label="Companion order" value="6"></el-option>
										</el-select>
									</div>
								</div>
								<div class="sort_by">
									<p class="sort_by_text">Sort by</p>
									<div class="options">
										<el-select v-model="listQuery.order.transaction_time" @change="selectChanged" placeholder="Please select" style="margin-right: 20px;"
										 :popper-append-to-body="false">
											<el-option label="Newest" value="desc"></el-option>
											<el-option label="Oldest" value="asc"></el-option>
										</el-select>
									</div>
								</div>
							</div>
							<div class="search">
								<input placeholder="Search Order ID" v-model="listQuery.orderId" />
								<button class="btn" @click="selectChanged">
									<img src="@/assets/images/search.png" />
								</button>
								<!-- <img src="@/assets/images/search.png" /> -->
							</div>
						</div>
						<!-- 没有数据 -->
						<div class="no_data_area" v-if="title_index == 1 && coin_list == '' || (title_index == 2 && point_list == '')">
							<div class="no_data">
								<img src="../../assets/images/no_tournament.svg" />
								<div class="no_data_text" v-if="title_index == 1 && coin_list == ''">No any coin details</div>
								<div class="no_data_text" v-if="title_index == 2 && point_list == ''">No any point details</div>
							</div>
						</div>
						<!-- Coin 、Point 、 Bank  表格  -->
						<div class="center_table" v-if="title_index == 1 && coin_list != '' ">
							<div class="table_header">
								<p>Date</p>
								<p>Order Name</p>
								<p>Details</p>
							</div>
							<div class="table_body">
								<div class="" v-for="(ctem,cndex) in coin_list" :key="cndex">
									<p>{{initDete(ctem.transactionTime)}}</p>
									<p>{{ctem.remark}}</p>
									<!-- <p :class="ctem.amountBalance >= 0 ? 'price_detail_add':'price_detail_minus'">{{ctem.amountBalance}} Coin</p> -->
									<p :class="ctem.prefix == '+' ? 'price_detail_add':'price_detail_minus'">
										{{ctem.prefix}}
										{{Math.abs(ctem.amountBalance)}}
									</p>
								</div>
							</div>
						</div>
						<div class="center_table" v-if="title_index == 2 && point_list != ''">
							<div class="table_header">
								<p>Date</p>
								<p>Order Name</p>
								<p>Details</p>
							</div>
							<div class="table_body">
								<div class="" v-for="(ptem,index) in point_list" :key="index">
									<p>{{initDete(ptem.transactionTime)}}</p>
									<p>{{ptem.remark}}</p>
									<p :class="(ptem.transactionType == '3' ||  ptem.transactionType == '4' || ptem.transactionType == '5' || ptem.transactionType == '6')? 'price_detail_minus':'price_detail_add'">{{ptem.prefix}}{{ptem.pointAmount}}
										Point</p>
								</div>
							</div>
						</div>
						<!-- <div class="center_block" v-if="title_index == 3">
							<div class="block_top" v-for="(btem,bdex) in bank_account" :key="bdex">
								<div class="block_left">
									<img src="../../assets/images/public_bank.png" />
									<div class="block_left_content">
										<p>{{btem.name}}</p>
										<P>{{btem.accountNumber}}</P>
									</div>
								</div>
								<div class="block_right">
									<p v-if="btem.isDefault">[Default]</p>
									<div class="more">
										<img src="../../assets/images/more.png" @click="showMore" />
										<div class="noneMoreDel" v-if="status == true">
											<div class="none_text">Update Account</div>
											<div class="none_text2">Remove Account</div>
										</div>
									</div>

								</div>
							</div>
							<div class="block_content">
								<div class="add_img"><img src="../../assets/images/big_add.png" /></div>
								<button class="btn" @click="jump_addnewAccount">Add New Account</button>
							</div>
						</div> -->
						<div class="pagnationBox" v-if="title_index ==1 && coin_list != '' || (title_index == 2 && point_list != '')">
							<pagination v-show="total_count_point>0" :total="total_count_point" :page.sync="listQuery.page" :limit.sync="listQuery.size"
							 @pagination="handlePageChange" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/order/left.vue'
	import {
		bankAccount,
		pointDetail,
		userInfo,
		coinDetail
	} from '@/api/user_info.js'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination/index.vue'; // secondary package based on el-pagination
	// import Pagination from '@/components/Pagination/wallet.vue'; 
	import {getHostOverview} from '@/api/league.js'
	export default {
		name: "wallet",
		mixins: [Listing],
		components: {
			LeftView,
			Pagination
		},
		data() {
			return {
				title_index: 1,//正式服隐蔽是为2，测试服为1
				value: 'desc',
				coin_details: [],
				update_up: false,
				status: false,
				bank_account: '', //银行账户列表
				listQuery: {
					userId: sessionStorage.getItem("userId"),
					order: {
						// balance_transaction_id: 'desc',
						transaction_time:'desc'
					},
					orderId: '',
					page: 1,
					size: 10
				},
				point_list: [],
				coin_list: [],
				total_count_point: 0,
				userinfo: {},
				host_detail:{},//主持人概况
			};
		},
		mounted() {
			this.get_userinfo()
			this.getHostOverview()	
		},
		methods: {
			selectChanged(value) {
				this.handleFilter();
			},
			up_mark(type) {
				let that = this;
				// 修改  不打开弹窗，改为跳转页面
				if(type == 1){
					// that.update_up = !that.update_up
					this.$router.push({
						path: '/redemption/top_up'
					});
				}else{
					this.$router.push({
						path: '/followers/my_redemption'
					});
				}
			},
			click_msg(index) {
				let that = this;
				that.title_index = index;
				if(index == 1){
					this.getList()
					this.listQuery.orderId = ''
					this.listQuery.order.transaction_time = 'desc'
				}else if (index == 2) {
					this.getList()
					this.listQuery.orderId = ''
					this.listQuery.order.transaction_time = 'desc'
				} else if (index == 3) {
					this.get_user_bank()
				}
			},
			showMore() {
				this.status = !this.status;
			},
			jump_addnewAccount() {
				this.$router.push({
					path: '/order/add_newAccount'
				});
			},
			// 银行账户列表
			get_user_bank() {
				let that = this;
				let params = {
					userId: sessionStorage.getItem("userId")
				}
				bankAccount(params).then(res => {
					that.bank_account = res.data
				})
			},
			// 积分交易明细
			getList() {
				let params = {
					userId: sessionStorage.getItem("userId"),
				}
				if (this.title_index == 1) {
					coinDetail(this.listQuery).then(res => {
						this.coin_list = res.data.list
						// console.log('积分类别')
						// console.log(this.coin_list)
						this.total_count_point = res.data.total
					})
				} else if (this.title_index == 2) {
					pointDetail(this.listQuery).then(res => {
						this.total_count_point = res.data.total
						this.point_list = res.data.list;
					})
				}
			},
			get_userinfo() {
				let params = {
					userId: this.listQuery.userId
				}
				userInfo(params).then(res => {
					this.userinfo = res.data.userInfo
				})
			},
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
			//获取主持人概况
			getHostOverview(){
				getHostOverview().then(res => {
					this.host_detail = res.data
					// console.log(this.host_detail)
				})
			},
			// 跳转页面
			jump_pagee(index){
				if(index == 1){
					this.$router.push({path: '/center/profile'})
				}else if(index == 2){
					this.$router.push({path: '/order/wallet'})
				}else if(index == 3){
					if(this.host_detail.status != 'ENABLE'){
						// console.log("不是你吗")
						this.$router.push({path: '/order/host'})
					}else{
						// console.log("不是你")
						this.$router.push({path: '/order/host_level'})
					}
				}else if(index == 4){
					this.$router.push({path: '/center/companion'})
				}
			},
		},
		computed: {
			indexs: function() {
				this.total_page = Math.ceil(this.total_num / this.num_size)
			}
		}

	}
</script>

<style lang="less" scoped>
	.container {
		width: 90%;
		margin-left: 61px;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;
		/* 换行 */
		padding-bottom: 30px;

		.content_right {
			width: calc(100% - 370px);

			.mark_cancel {
				position: absolute;
				right: 80px;
				top: 10px;

				img {
					width: 46px;
					height: 46px;
					cursor: pointer;
				}
			}

			.mark_Top_container {
				position: absolute;
				left: 387px;
				top: 66px;
				z-index: 99;

				.top_block {
					width: 831px;
					padding: 70px 0 50px 0;
					background: #0E0F11;
					border-radius: 32px;
					overflow: hidden;
					.mark_top_head {
						font-size: 24px;
						color: #E5A518;
						text-align: center;
					}

					.mark_content {
						.mark_content_head {
							margin-left: 102px;

							.mark_head_tit {
								color: #727272;
								font-size: 20px;
								margin: 49px 0 12px 0;
							}

							.mark_head_input {
								width: 627px;
								height: 59px;
								line-height: 59px;
								border: 2px solid #2D2D2D;
								border-radius: 19px;
								font-size: 20px;
								display: flex;
								align-items: center;

								.input_myr {
									color: #fff;
									padding: 0 24px 0 33px;
								}

								.input_border {
									width: 1px;
									height: 30px;
									background-color: #2D2D2D;
									margin-right: 26px;
								}

								.input_right {
									height: 59px;
									display: flex;
									align-items: center;

									input {
										height: 54px;
										color: #fff;
										font-size: 18px;
										background-color: #0E0F11;
										outline: none;
										border: none;
									}
								}
							}
						}

						.mark_content_options {
							.mark_head_tit {
								margin-left: ;
								color: #727272;
								font-size: 20px;
								margin: 50px 0 22px 102px;
							}

							.options_block {
								padding: 16px 39px 29px 39px;
								margin-left: 55px;
								margin-right: 104px;
								display: flex;
								justify-content: space-between;

								.options_left {
									display: flex;
									align-items: center;

									.options_img {
										width: 62px;
										height: 63px;
										text-align: center;
										margin-right: 35px;

										img {
											width: 51px;
											height: 63px;
										}
									}

									.options_img2 {
										width: 62px;
										height: 63px;
										margin-right: 35px;

										img {
											width: 62px;
											height: 63px;
										}
									}

									.options_text {
										color: #fff;
										font-size: 24px;
										margin-right: 35px;
									}

									.options_text2 {
										color: #D3AA53;
										font-size: 20px;
									}
								}

								.options_right {
									color: #fff;
									font-size: 20px;
									display: flex;
									align-items: center;
								}
							}

							.bac_color {
								background: #232323 0% 0% no-repeat padding-box;
							}
						}

						.mark_foot {
							display: flex;
							justify-content: space-between;
							margin: 100px 104px 0 104px;

							.foot_left {
								display: flex;
								align-items: center;

								.foot_text {
									color: #727272;
									font-size: 20px;
									margin-right: 27px;
								}

								.foot_text2 {
									color: #fff;
									font-size: 22px;
								}
							}

							.foot_right {
								width: 163px;
								height: 58px;
								color: #0E0F11;
								line-height: 58px;
								font-size: 20px;
								cursor: pointer;
								text-align: center;
								background: #E5A518;
								border-radius: 25px;
							}
						}
					}
				}
			}

			.content_right_nav{
			  margin-top: 50px;
			  margin-bottom: 20px;
			  p{
			    display: inline-block;
			    color: #898989;
				font-family:'Roboto-Regular';
			    padding: 0 30px;
			    font-size: 16px;
				margin: 0;
			  }
			  .adiv{
				display: inline-block;
				cursor: pointer;
			    border-right: 1px solid #7F7F7F;
			    &:last-child{
			      border: none;
			    }
			  }
			  .av{
			    color: #BF9D62;
				font-family:'Roboto-Bold';
			  }
			}

			.content_right_form {
				width: calc(100%-60px);
				border-radius: 50px;
				// margin-top: 30px;
				color: #ffffff;

				.right_form_top {
					width: 100%;
					height: 226px;
					background: #0E0F11 0% 0% no-repeat padding-box;
					border-radius: 38px;

					.data_area {
						display: flex;
						border-bottom: 2px solid #2D2D2D;

						div {
							margin-left: 70px;
							margin-right: 50px;
						}

						div p:first-child {
							text-align: center;
							letter-spacing: 0px;
							color: #727272;
							font-family:'Roboto-Bold';
							font-size: 18px;
						}

						div p:nth-child(2) {
							text-align: center;
							letter-spacing: 0px;
							color: #FFFFFF;
							font-family:'Roboto-Regular';
							font-size: 23px;
						}

						.last_div p:nth-child(2) {
							text-align: center;
							letter-spacing: 0px;
							color: #84F71E;
							font-family:'Roboto-Regular';
							opacity: 1;
						}
					}

					.data_content {
						display: flex;
						margin-left: 60px;
						margin-top: 5px;

						.block_1 {
							width: 163px;
							height: 58px;
							cursor: pointer;
							line-height: 58px;
							background: #1D2023 0% 0% no-repeat padding-box;
							border-radius: 25px;
							text-align: center;
							letter-spacing: 0px;
							color: #D3AA53;
							opacity: 1;
							font-family:'Roboto-Regular';
							font-size: 20px;
							margin-right: 46px;
						}

						.block_2 {
							width: 183px;
							height: 58px;
							background: rgba(219, 168, 63, 0.13) 0% 0% no-repeat padding-box;
							border-radius: 25px;
							text-align: center;
							margin-top: 20px;
							
							.text {
								letter-spacing: 0px;
								color: #DBA83F;
								font-family:'Roboto-Regular';
								font-size: 20px;
								cursor: pointer;
							}
						}
					}
				}

				.content_right_center {
					width: 100%;
					margin-left: 30px;

					.center_title {
						display: flex;
						margin-top: 48px;

						p {
							text-align: left;
							letter-spacing: 0px;
							color: #878787;
							font-family:'Quicksand-Bold';
							opacity: 1;
							font-size: 22px;
							margin-right: 88px;
						}

						.msg {
							text-align: left;
							letter-spacing: 0px;
							color: #878787;
							font-family:'Quicksand-Bold';
							opacity: 1;
							font-size: 22px;
							margin-right: 88px;
							cursor: pointer;
						}

						.title_active {
							text-align: left;
							letter-spacing: 0px;
							color: #FFFFFF;
							font-family:'Quicksand-Bold';
							opacity: 1;
							font-size: 22px;
							margin-right: 88px;
							cursor: pointer;
						}
					}

					.center_choice {
						display: flex;
						justify-content: space-between;

						.choice_left {
							display: flex;

							div {
								margin-right: 20px;

								.options {
									position: relative;
									.dropdown {
										width: 10px;
										height: 8px;
										position: absolute;
										right: 30px;
										top: 45%;
									}

									select {
										/*取消默认箭头开始*/
										appearance: none;
										-moz-appearance: none;
										-webkit-appearance: none;
										/*取消默认箭头结束*/
										width: 225px;
										height: 59px;
										background-color: #0E0F11;
										color: #ffffff;
										border-radius: 20px;
										opacity: 1;
										border: none;
										font-family:'Roboto-Regular';
										font-size: 18px;
										padding-left: 20px;
										padding-right: 20px;
									}

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
										border: 1px solid rgba(255,255,255,0.2);
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

							.status {
								.status_text {
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									opacity: 1;
									font-family:'Roboto-Regular';
									font-size: 18px;
								}
							}

							.sort_by {
								.sort_by_text {
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									font-family:'Roboto-Regular';
									font-size: 18px;
								}
							}
						}

						.search {
							position: relative;
							top: 50px;
							left: 30px;

							input {
								width: 315px;
								height: 60px;
								background: #0E0F11 0% 0% no-repeat padding-box;
								border-radius: 23px;
								font-size: 18px;
								border: none;
								padding-left: 35px;
								color: #ffffff;
								font-family:'Roboto-Regular';
							}

							.btn {
								width: 60px;
								height: 60px;
								background: #D3AA53 0% 0% no-repeat padding-box;
								border: none;
								border-radius: 23px;
								opacity: 1;
								position: relative;
								right: 60px;
								font-family:'Roboto-Regular';
								cursor: pointer;
								img {
									width: 22px;
									height: 22px;
								}
							}
						}
					}

					.no_data_area {
						width: 100%;
						height: 350px;
						display: flex;
						align-items: center;
						justify-content: center;

						.no_data {
							text-align: center;

							img {}

							.no_data_text {
								color: #565656;
								font-size: 20px;
								font-family:'Roboto-Regular';
								margin-top: 20px;
							}
						}
					}

					.center_table {
						width: 100%;
						margin-top: 52px;
						position: relative;
						right: 30px;

						.table_header {
							display: flex;
							height: 75px;
							background: #000000 0% 0% no-repeat padding-box;
							border-radius: 31px 31px 0px 0px;
							opacity: 1;
							align-items: center;

							p {
								&:first-child {
									width: 25%;
								}

								&:last-child {
									width: 25%;
								}

								width: 50%;
								text-align: left;
								letter-spacing: 0px;
								color: #E5E5E5;
								font-family:'Roboto-Bold';
								opacity: 1;
								font-size: 22px;
								margin-left: 30px;
							}
						}

						.table_body {
							div {
								display: flex;
								align-items: center;

								p {
									display: flex;
									font-family:'Roboto-Regular';
									&:first-child {
										width: 25%;
									}

									&:last-child {
										width: 25%;
									}

									width: 50%;
									height: 74px;
									letter-spacing: 0px;
									color: #F4F4F4;
									opacity: 1;
									font-size: 22px;
									margin: 0;
									margin-left: 30px;
									align-items: center;
									border-right: 3px solid #161616;
									;

									&:last-child {
										border: none;
									}
								}

								.price_detail_add {
									letter-spacing: 0px;
									color: #2FEA07;
									font-family:'Roboto-Bold';
								}

								.price_detail_minus {
									text-align: left;
									letter-spacing: 0px;
									color: #FF3E24;
									font-family:'Roboto-Bold';
								}

							}

							div:nth-child(2n) {
								background: #313538 0% 0% no-repeat padding-box;
								opacity: 1;
							}

							div:last-child {
								border-radius: 0px 0px 26px 26px;
							}
						}

						//table_body
					}

					//center_table
					.center_block {
						width: 100%;
						margin-top: 52px;
						position: relative;
						right: 30px;
						border-radius: 27px;
						background: #0E0F11;

						.block_top {
							width: 90%;
							height: 142px;
							display: flex;
							align-items: center;
							justify-content: space-between;
							border-bottom: 2px solid #2D2D2D;
							margin: 0 auto;

							.block_left {
								display: flex;
								align-items: center;

								.block_left_content {
									margin-left: 84px;
								}

								p {
									color: #F4F4F4;
									font-family:'Roboto-Black';
								}

								img {
									width: 148px;
									height: 65px;
								}
							}

							.block_right {
								display: flex;
								align-items: center;
								color: #727272;
								font-family:'Roboto-Regular';

								.more {
									position: relative;

									img {
										width: 33px;
										margin-left: 77px;
									}

									.noneMoreDel {
										width: 130px;
										background: #1D2023;
										padding: 17px 28px;
										border-radius: 25px;
										position: absolute;
										right: 0px;
										-webkit-box-shadow: 5px 5px 5px 5px #0E0F11;
										box-shadow: 0px 0px 10px 1px #0E0F11;
										font-size: 16px;

										.none_text {
											color: #fff;
											padding: 10px 0;
											margin-bottom: 10px;
											cursor: pointer;
											border-bottom: 1px solid #3C3E3F;
										}

										.none_text2 {
											color: red;
											padding: 5px 0;
											cursor: pointer;
										}
									}
								}

								//more

							}
						}

						.block_content {
							width: 90%;
							height: 142px;
							display: flex;
							margin: 0 auto;
							align-items: center;
							cursor: pointer;
							.add_img {
								width: 148px;
								height: 142px;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 84px;

								img {
									width: 46px;
									height: 46px;
								}
							}

							.btn {
								width: 286px;
								height: 57px;
								background: #1D2023;
								border-radius: 22px;
								border: #1D2023;
								color: #D3AA53;
								font-size: 22px;
							}
						}
					}

					.center_pagination {
						display: flex;
						align-items: center;
						justify-content: flex-start;
						margin-top: 75px;
						margin-bottom: 40px;
						position: relative;
						right: 30px;

						.prev {
							width: 76px;
							height: 59px;
						}

						.next {
							width: 76px;
							height: 59px;
						}

						.num {
							width: 76px;
							height: 59px;
						}

						.page {
							display: flex;
							align-items: center;

							p {
								width: 59px;
								height: 59px;
								line-height: 59px;
								text-align: center;
								background: #0E0F11 0% 0% no-repeat padding-box;
								border-radius: 11px;
								margin-left: 10px;
								font-size: 16px;
								color: #727272;

								img {
									width: 17px;
									height: 17px;
								}
							}

							.active {
								background: #D3AA53 0% 0% no-repeat padding-box;
								border-radius: 10px;
								color: #FFFFFF;
							}
						}

						p {
							width: 59px;
							height: 59px;
							line-height: 59px;
							text-align: center;
							background: #0E0F11 0% 0% no-repeat padding-box;
							border-radius: 11px;
							margin-left: 10px;
							font-size: 16px;
							color: #727272;

							img {
								width: 17px;
								height: 17px;
							}
						}

					}

					.pagnationBox {
						position: relative;
						right: 30px;
						margin-top: 75px;
					}
				}
			}
		}
	}
</style>
