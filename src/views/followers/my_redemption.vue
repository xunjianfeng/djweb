<template>
	<div class="index">
		<!--  Complete  弹窗 -->
		<div class="mark_cancel" v-if="update_up == true" @click.stop="update_up = false">
			<img src="@/assets/images/cancel.png">
		</div>
		<div class="mark_bac" v-if="update_up == true"></div>
		<div class="mark_Top_container" v-if="update_up == true">
			<div class="mark_my_content ">
				<div class="mark_text_one">Redemption complete</div>
				<div class="mark_text_two">Thank you for your redemption.</div>
			</div>
			<div class="mark_my_foot">
				<div class="mark_foot_button" @click="closeComplete">Close</div>
			</div>
		</div>
		<!-- end -->
		<!--  如何使用  弹窗 -->
		<div class="use_cancel" v-if="use_status" @click.stop="use_status = false">
			<img src="@/assets/images/cancel.png">
		</div>
		<div class="use_bac" v-if="use_status"></div>
		<div class="use_Top_container" v-if="use_status">
			<div class="use_my_content ">
				<div class="use_text_one">Where to Use ?</div>
				<div class="use_text_two">{{howUse}}</div>
			</div>
		</div>
		<!-- end -->
		<div class="container">
			<LeftView :index="9"></LeftView>
			<div class="content_right">
				<div class="top_block">
					<div class="top_title">
						<p>Coin</p>
						<p>Point</p>
					</div>
					<div class="top_row">
						<p>{{statistics.coinAmount || 0}}</p>
						<p>{{statistics.pointAmount || 0}}</p>
					</div>
				</div>
				<div class="content_right_form">
					<div class="order_part">
						<div class="part_title">
							<p :class="red_type == 1 ?'title_av title_block':'title_block'" @click="switch_part(1)">My Redemption</p>
							<p :class="red_type == 2 ?'title_av title_block':'title_block'" @click="switch_part(2)">My Coupon</p>
						</div>
						<!-- 条件筛选 -->
						<div class="order_choice">
							<div class="choice_left">
								<div class="status" v-if="red_type == 1">
									<p class="status_text">Order Status</p>
									<div class="options">
										<el-select v-model="listQuery.orderState" @change="handleFilter" placeholder="请选择" style="margin-right: 20px;"
										 :popper-append-to-body="false">
											<el-option label="All" value=""></el-option>
											<el-option label="To Ship" value="1"></el-option>
											<el-option label="Shipped" value="2"></el-option>
											<el-option label="Completed" value="3"></el-option>
										</el-select>
									</div>
								</div>
								<div class="sort_by" v-if="red_type == 1">
									<p class="sort_by_text">Sort by</p>
									<div class="options">
										<el-select v-model="listQuery.order.create_time" @change="handleFilter" placeholder="请选择" style="margin-right: 20px;"
										 :popper-append-to-body="false">
											<el-option label="Desc" value="desc"></el-option>
											<el-option label="Asc" value="asc"></el-option>
										</el-select>
									</div>
								</div>
								<div class="sort_by" v-if="red_type == 2">
									<p class="sort_by_text">Sort by</p>
									<div class="options">
										<el-select v-model="listQuery2.order.receive_time" @change="handleFilter2" placeholder="请选择" style="margin-right: 20px;"
										 :popper-append-to-body="false">
											<el-option label="Desc" value="desc"></el-option>
											<el-option label="Asc" value="asc"></el-option>
										</el-select>
									</div>
								</div>
							</div>
							<div class="search">
								<input placeholder="Search Order ID" v-model="listQuery.orderId" v-if="red_type == 1" />
								<button class="btn" @click="handleFilter" v-if="red_type == 1">
									<img src="../../assets/images/search.png" />
								</button>

							</div>
						</div>
					</div>
					<div class="type_one_container" v-if="red_type == 1">
						<div class="no_data_area" v-if="list == ''">
							<div class="no_data">
								<img src="../../assets/images/no_tournament.svg" />
								<div class="no_data_text" >No Redemption Details</div>
							</div>
						</div>
						<div class="table_1" v-for="(item,index) in list" :key='index'>
							<div class="table_1_header" @click="open_shrink(item.orderId)" >
								<p>Date<span>{{initDete(item.createTime)}}</span></p>
								<p>Order No<span>{{item.orderId}}</span></p>
								<!-- <p>Order Type<span>Physical Product</span></p> -->
								<p class="status">
									<span v-if="item.orderState == 1" style="color: #23B709;">To be shipped</span><!-- 待发货 -->
									<span v-else-if="item.orderState == 2" style="color:#00AAFF;">shipped</span><!-- 发货 -->
									<span v-else-if="item.orderState == 3" style=" color:#FF3636;">completed</span><!-- 完成 -->
								</p>
								<img src="../../assets/images/close.png" />
							</div>
							<div class="shop_info" v-for="(vtem,vdex) in item.commodityVos" :key='vdex' v-if="item.shrink">
								<div class="use_info">
									<div class="info_left">
										<img v-if="vtem.picture != '' && ptdex == 0" v-for="(ptem,ptdex) in vtem.picture" :key="ptdex" :src="HOST + ptem.url" />
										<p>{{vtem.commodityName}}</p>
									</div>
									<div class="info_right">
										<div class="complete" v-if="item.orderState != 3" @click="completeOrder(item.orderId,item.orderState)">Complete</div>
										<div class="why">
											<img src="../../assets/images/why.png" slot="reference" class="why_pic" @click="showIt(index,vdex)" />
											<div class="show_Why" v-if="vtem.usage == true">
												<div class="none_text" @click="open_user(vtem.howUse)">Where to use</div>
											</div>

										</div>
									</div>
								</div>
								<div class="table_block">
									<div class="table_block_header">
										<p>Tpye</p>
										<p>Unit Price</p>
										<p>Quantity</p>
										<p>Price</p>
										<p>Remarks</p>
									</div>
									<div class="table_block_row">
										<p>{{vtem.species}}</p>
										<p>{{vtem.specsPrice}} {{vtem.payMethod}}</p>
										<p>{{vtem.amount}}</p>
										<p>
											{{vtem.specsPrice * vtem.amount}}
											{{vtem.payMethod}}
										</p>
										<p>{{item.remark}}</p>
									</div>
									
								</div>
							</div>
							<div class="total">
								<p>Total</p>
								<!-- v-if="item.totalAmount != '' && item.totalAmount != null " -->
								<p>{{item.totalAmount}} {{item.payMethod}} <span v-if="item.couponAmount != null && item.couponAmount != '' ">(-{{item.couponAmount}}
										{{item.payMethod}})</span></p>
							</div>
						</div>
						<!-- 分页组件 -->
						<div class="order_pagination">
							<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
							 @pagination="handlePageChange" />
						</div>
					</div>
					<!-- 我的优惠券 -->
					<div class="type_two_container" v-else>
						<div class="match_content_coupon">
							<div class="coupon_list" v-for="(item,index) in coupon_list" :key="index">
								<div class="coupon_img"><img src="../../assets/images/coupon.png" alt=""></div>
								<div class="coupon_list_warp">
									<div class="coupon_tit">{{item.couponTitle}}</div>
									<!-- <div class="coupon_exp">EXP：{{item.timeMode==1?item.startTime:'领券起'+item.validityDay+'天后过期'}}</div> -->
									<div class="coupon_exp">Expired at {{initDate(item.validityTime)}}</div>
								</div>
								<div class="coupon_right">
									<div class="coupon_button" @click.stop="jump_redemption">Use</div>
									<div class="coupon_rule">Rule>></div>
								</div>
							</div>
							
							<!-- 没有数据 -->
							<div class="no_data_area" v-if="coupon_list == ''">
								<div class="no_data">
									<img src="../../assets/images/no_tournament.svg" />
									<div class="no_data_text" >No Coupon Details</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		couponMy,
	} from '@/api/coupon';
	import {
		commodityUserList,orderComplete
	} from '@/api/order';
	import LeftView from '@/components/order/left.vue'
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	import Listing from '@/mixin/Listing';
	export default {
		name: "index",
		mixins: [Listing],
		components: {
			LeftView,
			Pagination
		},
		data() {
			return {
				update_up: false,   //complete 弹窗
				use_status: false,   //如何使用
				status: false,
				howUse:'', //使用方法 
				red_type: 1, //1 My Redemption    2.My Coupon
				coupon_list:'',
				listQuery: {
					orderState: '', //1 待发货 2 发货 3 完成
					order: {
						create_time: 'desc'
					},
					orderId: '',
					userId:sessionStorage.getItem("userId"),
					page: 1,
					size: 10
				},
				listQuery2: {
					order: {
						receive_time: 'desc'
					},
				},
				total_count: 0,
				list: '',
				userinfo: JSON.parse(sessionStorage.getItem("userinfo")) || {},
				statistics:{}
			}
		},
		mounted() {
			// this.userId = sessionStorage.getItem('userId')
			// console.log(this.userId)
			this.getList();
		},
		methods: {
			// 使用方法
			open_user(howUse){
				this.howUse = howUse
				this.use_status = ! this.use_status
			},
			// 展开隐藏  Where to use
			showIt(index,vdex) {
				let that = this;
				that.list[index].commodityVos[vdex].usage = ! that.list[index].commodityVos[vdex].usage
			},
			// 订单显示隐藏内容
			open_shrink(orderId){
				let that = this;
				for (let i in that.list) {
					if(that.list[i].orderId == orderId){
						that.list[i].shrink = !  that.list[i].shrink
					}
				}
			},
			// 订单列表
			getList() {
				let that = this;
				commodityUserList(that.listQuery).then(res => {
					const {
						list,
						total
					} = res.data.list
					for (let i in list) {
						list[i].shrink = true
						if(list[i].commodityVos != '' && list[i].commodityVos != null ){
							for (let j in list[i].commodityVos) {
								list[i].commodityVos[j].usage = false
							}
						}
					}
					that.list = list;
					that.total_count = total
					that.statistics = res.data.statistics
				})
				// that.red_type = type
				// if(that.red_type == 1){
				
				// }
				// else if(that.red_type == 2){
				// 	couponMy(that.listQuery).then(res => {
				// 		that.coupon_list = res.data
				// 		console.log(that.coupon_list)
						
				// 	})
				// }
				
			},
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
			handleFilter2() {
				this.listQuery2.page = 1;
				this.get_myCoupon()
			},
			// 我的优惠券
			get_myCoupon() {
				let that = this;
				couponMy(that.listQuery2).then(res => {
					for(let i = 0; i < res.data.length;i++){
						res.data[i].validityDay = ''
					}
					that.coupon_list = res.data
					// console.log(that.coupon_list)
					for(let v = 0; v < that.coupon_list.length;v++){
						//过期的日期
						var endDate = new Date(that.coupon_list[v].validityTime);
						//领取的日期
						var nowDate = new Date(that.coupon_list[v].receiveTime);
						//相差的总秒数
						var totalSeconds = parseInt((endDate - nowDate) / 1000);
						//天数
						var days = Math.floor(totalSeconds / (60 * 60 * 24));
						that.coupon_list[v].validityDay = days
						// console.log(that.coupon_list[v].validityDay)
						// console.log("无情的分割线")
					}
					// if(res.data != ''){
						
					// }
				})
			},
			switch_part(type) {
				this.red_type = type
				if (type == 1) {
					this.getList();
				} else {
					this.get_myCoupon();
					// this.getList(2);
				}
			},
			//完成订单
			completeOrder(orderId,orderState){
				if(orderState == 1){
					this.$message({
						type:'warning',
						message:"Waiting to ship's order is not yet complete!"//订单还未发货，无法完成订单
					})
				}else{
					let params = {
						orderId:orderId
					}
					// console.log(params)
					orderComplete(params).then(res => {
						this.$message({
							type:'success',
							message:res.message
						})
						this.update_up = true
					})
				}
				
			},
			closeComplete(){
				this.getList()
				this.update_up = false
			},
			//点击优惠券的use跳转到商城
			jump_redemption(){
				this.$router.push({path:'/redemption/redemption'})
			}
		}
	}
</script>

<style lang="less" scoped>
	// Complete 弹窗 
	.mark_cancel {
		position: fixed;
		right: 80px;
		top: 125px;
		img {
			width: 46px;
			height: 46px;
			cursor: pointer;
		}
		z-index: 999;
	}
	.mark_bac {
		width: 100%;
		height: 100vh;
		background: #000000b3;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 88;
	}
	.mark_Top_container {
		position: fixed;
		// left: 357px;
		top: 185px;
		z-index: 999;
		width: 580px;
		padding: 84px 114px 70px 114px;
		background: #0E0F11;
		border-radius: 27px;
		overflow: hidden;
		display: flex;
		flex-flow: column;
		align-items: center;
		.mark_my_content {
			width: 100%;
			text-align: center;
			margin-bottom: 80px;

			.mark_text_one {
				color: #DBA83F;
				font-size: 24px;
				margin-bottom: 20px;
				font-family:'Quicksand-Bold';
			}

			.mark_text_two {
				color: #989898;
				font-size: 18px;
				font-family:'Roboto-Regular';
			}
		}

		.mark_my_foot {
			.mark_foot_button {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 163px;
				height: 58px;
				color: #0E0F11;
				cursor: pointer;
				font-size: 18px;
				background: #DBA83F;
				border-radius: 25px;
				font-family:'Roboto-Regular';
			}
		}
	}
	//end
	// 如何使用  弹窗
	.use_cancel {
		position: fixed;
		right: 80px;
		top: 125px;
		img {
			width: 46px;
			height: 46px;
			cursor: pointer;
		}
		z-index: 999;
	}
	.use_bac {
		width: 100%;
		height: 100vh;
		background: #000000b3;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 88;
	}
	.use_Top_container {
		position: fixed;
		// left: 357px;
		top: 185px;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 999;
		width: 580px;
		padding: 84px 114px 70px 114px;
		background: #0E0F11;
		border-radius: 27px;
		overflow: hidden;
		display: flex;
		flex-flow: column;
		align-items: center;
		.use_my_content {
			width: 100%;
			margin-bottom: 80px;
			.use_text_one {
				color: #DBA83F;
				font-size: 24px;
				text-align: center;
				margin-bottom: 20px;
				font-family:'Quicksand-Bold';
			}
			.use_text_two {
				color: #989898;
				font-size: 18px;
				font-family:'Roboto-Regular';
			}
		}
	}
	// end
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

			.top_block {
				width: 100%;
				height: 137px;
				margin-top: 100px;
				background: #0E0F11;
				border-radius: 29px;

				.top_title {
					width: 50%;
					display: flex;
					justify-content: space-around;
					color: #727272;
					font-size: 18px;
					font-family:'Roboto-Regular';
					// margin-left: 131px;
				}

				.top_row {
					width: 48%;
					display: flex;
					justify-content: space-around;
					color: #fff;
					font-size: 23px;
					font-family:'Roboto-Regular';
					// margin-right: 5px;
					// margin-left: 99px;
				}
			}

			//top_block
			.content_right_form {
				width: 100%;
				.order_part {
					margin-top: 40px;
					margin-left: 30px;
					.part_title {
						display: flex;
						align-items: center;
						font-family:'Quicksand-Bold';
						.title_block {
							color: #878787;
							font-size: 22px;
							margin-right: 90px;
							cursor: pointer;
						}

						.title_av {
							color: #FFFFFF;
							font-size: 22px;
						}
					}

					.order_choice {
						display: flex;
						justify-content: space-between;
						font-family:'Roboto-Regular';
						.choice_left {
							display: flex;
							.status {
								.status_text {
									font-size: 18px;
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									opacity: 1;
								}
							}
							.sort_by {
								.sort_by_text {
									font-size: 18px;
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									opacity: 1;
								}
							}
							div {
								margin-right: 20px;
								.options {
									.dropdown {
										width: 10px;
										height: 8px;
										position: relative;
										right: 30px;
									}
									/deep/ .el-select .el-input .el-input__inner {
										border: 0px;
										width: 230px;
										height: 59px;
										color: #fff;
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

							// margin-left: 10px;
							input {
								width: 315px;
								height: 60px;
								background: #0E0F11;
								border-radius: 23px;
								font-size: 18px;
								border: none;
								padding-left: 35px;
								color: #fff;

							}

							.btn {
								width: 60px;
								height: 60px;
								background: #D3AA53;
								border: none;
								border-radius: 22px;
								opacity: 1;
								position: relative;
								right: 60px;
								top: 5px;
								cursor: pointer;
								img {
									width: 22px;
									height: 22px;
								}
							}
						}
					}
				}
				//order_part
				.type_one_container {
					font-family:'Roboto-Regular';
					margin-top: 40px;
					.no_data_area {
						width: 100%;
						height: 350px;
						display: flex;
						align-items: center;
						justify-content: center;
						.no_data {
							text-align: center;
							.no_data_text {
								color: #565656;
								font-size: 20px;
								margin-top: 20px;
							}
						}
					}
					.table_1 {
						background: #0E0F11;
						border-radius: 27px;
						margin-top: 30px;
						cursor: pointer;

						.table_1_header {
							display: flex;
							height: 90px;
							align-items: center;
							justify-content: space-between;
							padding-left: 51px;
							padding-right: 51px;

							p {
								font-size: 18px;
								color: #727272;

								// margin-left: 24px;
								span {
									margin-left: 5px;
									font-size: 20px;
									color: #ffffff;
									font-family:'Roboto-Bold';
								}

							}

							.status {
								span {
									margin-left: 15px;
								}
							}

							img {
								width: 26px;
								height: 26px;
								// margin-right: 24px;
							}
						}

						//table_1_header
						.shop_info {
							border-top: 2px solid #2D2D2D;

							.use_info {
								display: flex;
								align-items: center;
								justify-content: space-between;
								padding: 26px 78px 31px 61px;

								.info_left {
									display: flex;

									img {
										width: 74px;
										height: 74px;
										border-radius: 20px;
									}
									p {
										color: #FFFFFF;
										font-size: 20px;
										margin-left: 31px;
										font-family:'Roboto-Bold';
										font-weight: bold;
									}
								}

								.info_right {
									display: flex;

									.complete {
										width: 163px;
										height: 51px;
										background: #D3AA53;
										border-radius: 24px;
										color: #0E0F11;
										font-size: 18px;
										text-align: center;
										line-height: 51px;
										margin-right: 40px;
										cursor: pointer;
									}

									.why {
										width: 58px;
										height: 58px;
										background: #1D2023;
										border-radius: 21px;
										text-align: center;
										cursor: pointer;
										.why_pic {
											width:40px;
											margin-top: 8px;
											cursor: pointer;
										}
										.show_Why {
											width: 130px;
											background: #1D2023;
											padding: 25px 28px;
											border-radius: 25px;
											position: relative;
											right: 120px;
											top: 20px;
											-webkit-box-shadow: 5px 5px 5px 5px #0E0F11;
											box-shadow: 0px 0px 10px 1px #0E0F11;
											font-size: 20px;
											cursor: pointer;
											.none_text {
												color: #D3AA53;
												margin-bottom: 0px;
											}

										}
									}
								}

								//info_right
							}

							.table_block {
								width: 100%;

								.table_block_header {
									// width:96%;
									height: 64px;
									background: #1B1C1E;
									display: flex;
									padding-left: 54px;

									p {
										color: #898989;
										font-size: 18px;
										width: 15%;
										text-align: left;

										&:first-child {
											width: 35%;
										}

										&:last-child {
											width: 30%;
										}
									}
								}

								.table_block_row {
									display: flex;
									padding-left: 54px;
									border-bottom: 2px solid #2D2D2D;

									p {
										color: #FFFFFF;
										font-size: 18px;
										width: 15%;
										text-align: left;
										margin: 24px 0 32px 0;

										&:first-child {
											width: 35%;
										}

										&:last-child {
											width: 30%;
										}
									}
								}

								
							}
						}
						.total {
							display: flex;
							padding-left: 54px;
						
							P {
								color: #FFFFFF;
								font-size: 18px;
								width: 30%;
								text-align: left;
						
								&:first-child {
									width: 59%;
								}
						
								span {
									color: #686868;
								}
							}
						
						}
					}
					//table_1	
					.table_2 {
						background: #0E0F11;
						border-radius: 27px;
						margin-top: 24px;

						.table_2_header {
							// width: 100%;
							display: flex;
							height: 90px;
							align-items: center;
							// margin-left: 24px;
							border-bottom: 2px solid #2D2D2D;
							justify-content: space-between;
							padding-left: 51px;
							padding-right: 51px;

							p {
								font-size: 18px;
								color: #727272;

								// margin-left: 24px;
								span {
									margin-left: 5px;
									font-size: 20px;
									color: #ffffff;
								}
							}

							.status {
								span {
									color: #00AAFF;
									margin-left: 15px;
								}
							}

							img {
								width: 26px;
								height: 26px;
								// margin-right: 24px;
							}
						}

						//table_2_header
						.use_info {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 26px 78px 31px 61px;

							.info_left {
								display: flex;

								img {
									width: 74px;
									height: 74px;
									border-radius: 20px;
								}

								p {
									color: #FFFFFF;
									font-size: 20px;
									margin-left: 31px;
								}
							}

							.info_right {
								display: flex;

								.complete {
									width: 163px;
									height: 51px;
									background: #D3AA53;
									border-radius: 24px;
									color: #0E0F11;
									font-size: 18px;
									text-align: center;
									line-height: 51px;
									margin-right: 40px;
									// cursor: pointer;
								}

								.why {
									width: 58px;
									height: 58px;
									background: #1D2023;
									border-radius: 21px;
									text-align: center;

									img {
										width: 50px;
										height: 50px;
									}
								}
							}
						}
						.table_block {
							width: 100%;
							.table_block_header {
								// width:96%;
								height: 64px;
								background: #1B1C1E;
								display: flex;
								padding-left: 54px;
								p {
									color: #898989;
									font-size: 18px;
									width: 15%;
									text-align: left;

									&:first-child {
										width: 35%;
									}
								}
							}

							.table_block_row {
								display: flex;
								padding-left: 54px;
								border-bottom: 2px solid #2D2D2D;
								p {
									color: #FFFFFF;
									font-size: 18px;
									width: 15%;
									text-align: left;
									// margin: 0;
									margin: 24px 0 32px 0;

									&:first-child {
										width: 35%;
									}

									// &:last-child{
									// 	width: 30%;
									// }
								}
							}

							.total {
								display: flex;
								padding-left: 54px;

								P {
									color: #FFFFFF;
									font-size: 18px;
									width: 30%;
									text-align: left;

									&:first-child {
										width: 65%;
									}

									span {
										color: #686868;
									}
								}

							}
						}
					}
					.order_list_1 {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 19px;
						background: #0E0F11;
						border-radius: 29px;

						p {
							width: 15%;
							text-align: left;
							color: #727272;
							font-size: 18px;
							margin: 0;
							// margin: 0 0 0 51px;
							padding-top: 40px;
							padding-bottom: 32px;

							span {
								font-size: 20px;
								color: #FFFFFF;
								margin-left: 5px;
							}

							&:first-child {
								margin: 0 0 0 51px;
							}
						}

						.order_no {
							width: 20%;
						}

						.order_type {
							width: 25%;
						}

						.status {
							span {
								color: #23B709;
								margin-left: 15px;
							}
						}

						img {
							width: 28px;
							height: 28px;
							margin-right: 29px;
						}
					}
					.order_list_2 {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 19px;
						background: #0E0F11;
						border-radius: 29px;

						p {
							width: 15%;
							text-align: left;
							color: #727272;
							font-size: 18px;
							margin: 0;
							padding-top: 40px;
							padding-bottom: 32px;

							span {
								font-size: 20px;
								color: #FFFFFF;
								margin-left: 5px;
							}

							&:first-child {
								margin: 0 0 0 51px;
							}
						}

						.order_no {
							width: 20%;
						}

						.order_type {
							width: 25%;
						}

						.status {
							span {
								color: #00AAFF;
								margin-left: 15px;
							}
						}

						img {
							width: 28px;
							height: 28px;
							margin-right: 29px;
						}
					}
					.order_list_3 {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 19px;
						background: #0E0F11;
						border-radius: 29px;

						p {
							width: 15%;
							text-align: left;
							color: #727272;
							font-size: 18px;
							margin: 0;
							padding-top: 40px;
							padding-bottom: 32px;

							span {
								font-size: 20px;
								color: #FFFFFF;
								margin-left: 5px;
							}

							&:first-child {
								margin: 0 0 0 51px;
							}
						}

						.order_no {
							width: 20%;
						}

						.order_type {
							width: 25%;
						}

						.status {
							span {
								color: #FF3636;
								margin-left: 15px;
							}
						}

						img {
							width: 28px;
							height: 28px;
							margin-right: 29px;
						}
					}

					//order_list_3
					.order_pagination {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						margin-top: 66px;
						margin-bottom: 40px;

						.prev {
							width: 79px;
							height: 59px;
						}

						.next {
							width: 79px;
							height: 59px;
						}

						p {
							width: 59px;
							height: 59px;
							line-height: 59px;
							text-align: center;
							background: #0E0F11;
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
				}
				.type_two_container {
					margin-top: 40px;
					.match_content_coupon {
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						.coupon_list {
							width: 45%;
							background: #0E0F11;
							border-radius: 16px;
							display: flex;
							align-items: center;
							padding: 30px 20px;
							margin-bottom: 30px;

							.coupon_img {
								width: 50px;
								height: 50px;
								display: flex;
								justify-content: center;
								align-items: center;
								background: #1D2023;
								border-radius: 14px;

								img {
									width: 30px;
									height: auto;
								}
							}

							.coupon_list_warp {
								margin: 0 20px;
								flex: 1;

								.coupon_tit {
									color: #fff;
									font-weight: bold;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
									overflow: hidden;
									font-size: 16px;
									line-height: 22px;
									margin-bottom: 10px;
								}

								.coupon_exp {
									color: #7c7c7c;
								}
							}

							.coupon_right {
								.coupon_button {
									width: 120px;
									background: #D3AA53;
									color: #232323;
									border-radius: 20px;
									text-align: center;
									line-height: 45px;
									font-weight: bold;
									cursor: pointer;
									font-size: 19px;
								}

								.coupon_rule {
									text-align: center;
									color: #D3AA53;
									font-size: 17px;
									margin-top: 10px;
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
								.no_data_text {
									color: #565656;
									font-size: 20px;
									margin-top: 20px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
