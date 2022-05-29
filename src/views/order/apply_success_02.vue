<template>
	<div class="index">
		<!-- <div class="apply_bac" v-if="pw_one"></div> -->
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<div class="adiv" @click="jump_pagee(1)">
						<p>Profile</p>
					</div>
					<div class="adiv" @click="jump_pagee(2)">
						<p>Wallet</p>
					</div>
					<div class="adiv" @click="jump_pagee(3)">
						<p>Host</p>
					</div>
					<div class="adiv" @click="jump_pagee(4)">
						<p class="av">Companion</p>
					</div>
				</div>
				<div class="content_right_form">
					<div class="right_form_top">
						<div class="top_left">
							<p class="top_value">Popularity value</p>
							<img src="../../assets/images/huo.png" class="huo"/>
							<p class="number">{{pw_one == false ? info.popularity :'0'}}</p>
						</div>
						<!-- 已完善  false -->
						<img v-if="!pw_one" src="../../assets/images/setting.png" class="setting" @click="edit_companion"/>
						<!-- 未完善 true -->
						<el-popover
							v-if="pw_one"
							v-model="pq"
						    placement="bottom"
						    width="200"
						    trigger="click"
							offset-x="-5"
							ref="popover"
							>
							<!-- content="Click here to complete my profile" -->
							<p style="cursor: pointer; font-family: 'Roboto-Regular';" @click.stop="edit_companion">Click here to complete my profile</p>
						    <img src="../../assets/images/setting.png" slot="reference" @click.stop="edit_companion" class="setting"/>
							<!-- <div class="prompt_scroll"></div> --> <!-- 设置同级盒子使得页面可以滚动 -->
						</el-popover>
					</div>
					<div class="finance_part">
						<p class="title">Finance</p>
						<p>Date Range</p>
						<div class="date_area">
							<el-date-picker
								v-model="compan_time"
								value-format="yyyy-MM-dd HH:mm:ss"
								type="datetimerange"
								range-separator="至"
								start-placeholder="Start Date"
								end-placeholder="End Date">
							</el-date-picker>
						</div>
						<div class="finance_table">
							<div class="table_header">
								<p>Earnings</p>
								<p>Order</p>
								<p>To Complete</p>
							</div>
							<div class="table_body">
								<div class="">
									<p>{{pw_one == false ? all_companion_info.amount || 0: 0}}</p>
									<p>{{pw_one == false ? all_companion_info.orderCount :  0}}</p>
									<p>{{pw_one == false ? all_companion_info.complete :  0}}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="order_part">
						<div class="order_choice">
							<div class="choice_left">
								<div class="status">
									<p class="status_text">Status</p>
									<div class="options">
										<el-select v-model="listQuery.state" placeholder="Please select" style="margin-right: 20px;" :popper-append-to-body="false" @change="selectChanged">
											<el-option label="All" value=""></el-option>
											<el-option label="To accept order" value="1"></el-option>
											<el-option label="To complete" value="2"></el-option>
											<el-option label="To leave a review" value="3"></el-option>
											<el-option label="Completed" value="4"></el-option>
											<el-option label="Rejected" value="5"></el-option>
										</el-select>
									</div>
								</div>
								<div class="sort_by">
									<p class="sort_by_text">Sort by</p>
									<div class="options">
										<el-select v-model="listQuery.order.create_time" placeholder="Please select" style="margin-right: 20px;" :popper-append-to-body="false" @change="selectChanged">
											<el-option label="Newest" value="desc"></el-option>
											<el-option label="Oldest" value="asc"></el-option>
										</el-select>
									</div>
								</div>
							</div>
							
							<div class="search">
								<input placeholder="Search Order ID" v-model="listQuery.orderId" />
								<button class="btn" @click.stop="search_list">
									<img src="../../assets/images/search.png" />
								</button>
							</div>
						</div>
						<!-- 第一次 提示完善信息  不展示订单 -->
						<div class="apply_sucess" v-if="pw_one">
							<div class="in_content">
							  <div class="in_tit">Please complete your profile first</div>
							  <div class="in_info">Alter completing your profile,you can officially start your Companion career</div>
							  <div class="in_btn" @click="edit_companion">Complete my profile</div>
							</div>
						</div>
						<!-- 没有数据 -->
						<div class="no_data_area"  v-if="order_list == '' && !pw_one" >
							<div class="no_data">
								<img src="../../assets/images/no_tournament.svg" />
								<div class="no_data_text">No order</div>
							</div>
						</div>
						<!-- 陪玩订单 -->
						<div class="order_form"  v-if="!pw_one" v-for="(item,index) in order_list" :key="index" >
							<div class="order_form_header" >
								<div class="left_block" @click.stop="openDetail(item.orderId)">
									<p>Date<span>{{(item.createTime).substring(0,10)}}</span></p>
									<!-- <p class="buyer_name">
										
									</p> -->
									<div class="buyer_name">
										Buyer
										<div class="buyer_text">{{item.fullName}}</div>
									</div>
									<p>Game Type<span>{{item.gameName}}</span></p>
									<p class="options">
										Status
										<span :style="item.state==1?'color: #FF971A;':item.state==2?'color: #23B709;':item.state==3?'color: #FF971A;':item.state==4?'color: #00AAFF;':item.state==5?'color: #FF3636;':''">
											{{item.state==1?'To accept order':item.state==2?'To complete':item.state==3?'To leave a review':item.state==4?'Completed':item.state==5?'Rejected':''}}
										</span>
									</p>
								</div>
								<div class="right_block">
									<img src="../../assets/images/close.png" @click.stop="item.detail_open = false"/>
								</div>
							</div>
							<div class="order_form_user" v-if="item.detail_open == true">
								<div class="user">
									<el-image :src="HOST + item.avatar" class="user_pic">
										<div slot="error" class="image-slot"> 
											<img src="../../assets/images/default.png" class="user_pic"/>
										</div>
									</el-image>
									<!-- <img class="user_pic" :src="HOST+item.avatar" v-if="item.avatar"/> -->
									<!-- <img class="user_pic" src="../../assets/images/default.png" v-else /> -->
									<p>{{item.fullName}}</p>
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
								<!-- <div class="form_user_right" v-show="item.state==4">
									<div class="form_review" @click.stop="update_up = true;companionOrderId=item.orderId">Review</div>
								</div> -->
							</div>
							
							<div class="order_form_table"  v-if="item.detail_open === true">
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
										<p>{{initDete(item.createTime)}}</p>
										<p>{{item.price}} {{item.payMethod}}</p>
										<p>{{item.hours}}</p>
										<p>{{item.totalAmount}} {{item.payMethod}}</p>
										<p>-</p>
									</div>
									<div class="total_price">
										<p>Total</p>
										<p>{{item.totalAmount}}{{item.payMethod}}</p>
									</div>
								</div>
								<div class="table_bottom" v-if="item.state == 1">
									<div class="flx_l" @click="companionAgree(item.orderId,false)">
										<img  src="../../assets/images/ban.png"/>
										<p>Reject Order</p>
									</div>
									
									<button class="order_btn" @click="companionAgree(item.orderId,true)">Order Accept</button>
								</div>
							</div>
						</div>
						<div class="order_pagination" v-if="!pw_one">
							<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"  @pagination="handlePageChange"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		reviewList,
		companionDetail,
		companionOrder,
		companionAgree,
		companionComplete
	} from '@/api/companion'
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	import Listing from '@/mixin/Listing';
	import LeftView from '@/components/order/left.vue'
	export default{
		name:"apply_success_02",
		mixins: [Listing],
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'info',
					deleted: 'danger'
				};
				return statusMap[status];
			}
		},
		components:{
			LeftView,
			Pagination
		},
		data(){
			 return {
				pw_one: '',  // false  第一次  true 不是第一次
				userinfo: JSON.parse(sessionStorage.getItem("userinfo")) || {},
				info: {}, //基本信息
				companionGame: [] ,//陪玩信息
				compan_time:'', //陪玩时间筛选
				listQuery: {
					orderId: '',
					order: {create_time: 'desc'},
					state: '',
					startTime: '',
					endTime: '',
					page: 1,
					size: 10,
					isme:true
				},
				total_count: 0,
				order_list:[], //陪玩订单
				all_companion_info:'', //接口全部数据
				pq:true,
			}
		},
		mounted() {
			
			this.playDetail();
		},
		methods:{
			search_list(){
				console.log('点击了搜索')
				this.getList();
			},
			// 陪玩订单列表
			getList() {
				if(this.compan_time == null || this.compan_time == ''){
					this.listQuery['startTime'] = ''
					this.listQuery['endTime'] = ''
				}else{
					let [ startTime, endTime ] = this.compan_time
					this.listQuery['startTime'] = startTime?(this.initDetes(startTime)*1000):''
					this.listQuery['endTime'] = endTime?(this.initDetes(endTime)*1000):''
				}
				console.log(this.listQuery)
				companionOrder(this.listQuery).then(res => {
					for ( let i in res.data.list.list ) {
						res.data.list.list[i]['createTime'] = this.initDete(res.data.list.list[i]['createTime'])
						res.data.list.list[i]['detail_open'] = false
					}
					const {
						list,
						total
					} = res.data.list
					this.all_companion_info = res.data
					this.order_list = list;
					this.total_count = total;
				})
			},
			openDetail(orderId){
				let that= this;
				for(let i=0;i<that.order_list.length;i++){
					if(that.order_list[i].orderId == orderId){
						that.order_list[i].detail_open = ! that.order_list[i].detail_open;
					}else{
						that.order_list[i]['detail_open'] = false;
					}
				}
			},
			selectChanged(value) {
				let that = this;
				that.getList();
			},
			// 陪玩信息
			playDetail(userId) {
				let that = this;
				let params = {
					userId:that.userinfo.userId
				}
				companionDetail(params).then(res => {
					const {
						info,
						companionGame
					} = res.data
					that.info = info
					that.companionGame = companionGame
					// 判断 陪玩信息里的第一个陪玩的价格和类型 等于null   一直提示完善信息
					companionGame[0].startTime
					// console.log(companionGame[0].startTime)
					if( companionGame[0].price  == null ||  companionGame[0].type  == null){
							// console.log('等于空')
							that.pw_one = true
							// sessionStorage.setItem('pw_one',true)
					}else{
							// console.log('已设置')
							that.pw_one = false
							// sessionStorage.setItem('pw_one',false)
					}
				})
			},
			// 同意/取消订单
			companionAgree(companionOrderId,agree) {
				let params = {
					companionOrderId,
					agree
				}
				if(agree == false){
					this.$confirm('Confirm to reject this order?', 'Confirmation', {//是否确定拒绝该订单
					  confirmButtonText: 'Confirm',
					  cancelButtonText: 'Cancel',
					  type: 'warning',
					  center: true
					}).then(() => {
						companionAgree(params).then(res => {
							this.$message({
								type: 'success',
								message: res.message
							});
							this.getList()
						})
					})
				}else{
					companionAgree(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.getList()
					})
				}
				
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
			// 跳转完善个人资料
			edit_companion(){
				this.$router.push({path:'/order/edit_info'})
			},
			// 跳转页面
			jump_pagee(index) {
				if (index == 1) {
					this.$router.push({path: '/center/profile'})
				} else if (index == 2) {
					this.$router.push({path: '/order/wallet'})
				} else if (index == 3) {
					this.$router.push({path: '/order/host'})
				} else if (index == 4) {
					// this.$router.push({path: '/center/companion'})
				}
			},
		}
		
	}
</script>
<style>
 .el-popover{
		width: 260px !important;
		background: #2D3033 ;
		border: 1px solid #2D3033;
		text-align: center;
		color: #D3AA53;
		margin-right: 100px;
		border-radius: 20px;
		margin-top: 84px;
		padding: 10px 10px;
		position: absolute;
		right: -120px;
	}
.el-popover[x-placement^=bottom]{
	margin-top: 20px;
}
.el-popover[x-placement^=bottom] .popper__arrow{
	border-bottom-color: #2D3033;
	top: -12px;
}	
.el-popover[x-placement^=bottom] .popper__arrow::after{
	border-bottom-color: #2D3033;
	
}
.el-popper .popper__arrow{
	border-width: 12px;
}
</style>

<style lang="less" scoped>
	.apply_bac {
		width: 100%;
		height: 100vh;
		background: #000000b3;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 15;
	}
.container{
	width: 90%;
	margin-left: 61px;
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	padding-bottom: 30px;
	
	.content_right{
		width: calc(100% - 370px);
		.content_right_nav {
			margin-top: 50px;
			margin-bottom: 20px;
			p {
				display: inline-block;
				color: #898989;
				font-family: 'Roboto-Regular';
				padding: 0 30px;
				font-size: 16px;
				margin: 0;
			}
			.adiv {
				display: inline-block;
				cursor: pointer;
				border-right: 1px solid #7F7F7F;
		
				&:last-child {
					border: none;
				}
			}
			.av {
				color: #BF9D62;
				font-family: 'Roboto-Bold';
			}
		}
		.content_right_form{
			width: calc(100%-60px);
			background: #0E0F11;
			border-radius: 50px;
			padding: 20px;
			margin-top: 30px;
			color: #ffffff;
			.right_form_top{
				font-size: 22px;
				font-family: Qulcksand-Bold;
				display: flex;
				justify-content: space-between;
				position: relative;
				.top_left{
					display: flex;
					.top_value{
						font-family:'Quicksand-Bold';
					}
					.huo{
						width: 24px;
						height: 24px;
						margin-left: 66px;
						position: relative;
						top: 26px;
					}
					.number{
						font-size: 20px;
						color: #C9C9C9;
						margin-left: 82PX;
						font-family:'Roboto-Bold';
					}
				}
				.setting{
					width: 44px;
					height: 44px;
					margin-right: 10px;
					margin-top: 10px;
					position: absolute;
					right: 12px;
					z-index: 80;
					cursor: pointer;
				}
			}
			.finance_part{
				.title{
					color: #FFFFFF;
					font-size: 22px;
					font-family:'Quicksand-Bold';
				}
				p:nth-child(2){
					color: #898989;
					font-family:'Roboto-Regular';
				}
				.date_area{
					display: flex;
					.el-input__inner {
						background: #1D2023 0% 0% no-repeat padding-box;
						color: #FFFFFF;
						/deep/.el-range-input {
							background: #1D2023 0% 0% no-repeat padding-box;
							color: #FFFFFF;
							font-family:'Roboto-Regular';
						}
					}
					.start_date{
						width: 230px;
						height: 59px;
						line-height: 59px;
						padding-left: 10px;
						background: #1D2023 0% 0% no-repeat padding-box;
						border-radius: 20px;
						margin-right: 28px;
						span{
							font-size: 18px;
						}
						img{
							float: right;
							margin-right: 10px;
							margin-top: 10px;
						}
					}
				}
				.finance_table{
					background: #1D2023 0% 0% no-repeat padding-box;
					border-radius: 29px;
					margin-top: 33px;
					.table_header{
						height: 68px;
						display: flex;
						text-align: left;
						align-items: center;
						letter-spacing: 0px;
						color: #727272;
						opacity: 1;
						border-bottom: 2px solid #2D2D2D;
						font-size: 18px;
						P{
							width: 33%;
							margin-left: 94px;
							font-family:'Roboto-Bold';
						}
					}
					.table_body{
						div{
							display: flex;
							align-items: center;
							text-align: center;
							height: 68px;
							font-size: 25px;
							border-bottom: 2px solid #2D2D2D;
							p{
								width: 33%;
								text-align: left;
								margin-left: 94px;
								letter-spacing: 0px;
								color: #FFFFFF;
								font-family:'Roboto-Regular';
							}
							&:last-child{
								border: none;
							}
						}
					}
					
				}
			}
			.order_part{
				margin-top: 25px;
				.order_choice{
					display: flex;
					justify-content: space-between;
					.choice_left{
						display: flex;
						.status{
							.status_text{
								font-size: 18px;
								text-align: left;
								letter-spacing: 0px;
								color: #727272;
								font-family:'Roboto-Regular';
							}
						}
						.sort_by{
							.sort_by_text{
								font-size: 18px;
								text-align: left;
								letter-spacing: 0px;
								color: #727272;
								font-family:'Roboto-Regular';
							}
						}
						div{
							margin-right: 20px;
							.options{
								.dropdown{
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
									font-family:'Roboto-Regular';
									background-color: #1d2023;
									border: 1px solid #1d2023;
								}
								
								/deep/ .el-select-dropdown {
									background-color: #1d2023; 
									border: 1px solid rgba(255,255,255,0.2);
								}
								/deep/ .el-icon-arrow-up:before { content: "\e78f"; }
								/deep/ .el-icon-arrow-down:before { content: "\e790"; }
								//修改单个的选项的样式
								/deep/ .el-select-dropdown__item {
									background-color: transparent;
									color: #fff;
									font-family:'Roboto-Regular';
									text-align: center;
								}
								/deep/ .el-select-dropdown__item.hover{
									background-color: #0E0F11;
								}
								/deep/ .el-select-dropdown__item.selected{
									background-color: #0E0F11;
								}
							}
							
						}
					}
					.search{
						position: relative;
						top: 40px;
						left: 55px;
						input{
							width: 315px;
							height: 60px;
							background: #1D2023 0% 0% no-repeat padding-box;
							border-radius: 23px;
							font-size: 18px;
							border: none;
							padding-left: 35px;
							color: #565656;
							font-family:'Roboto-Regular';
						}
						.btn{
							width: 60px;
							height: 60px;
							background: #D3AA53 0% 0% no-repeat padding-box;
							border: none;
							border-radius: 22px;
							opacity: 1;
							position: relative;
							right: 66px;
							cursor: pointer;
							img{
								width: 22px;
								height: 22px;
							}
						}
					}
				}
			}
			.apply_sucess{
				width: 100%;
				padding-top: 100px;
				padding-bottom:100px;
				.in_content{
					width: 80%;
					text-align: center;
					margin: 0 auto;
					.in_tit{
						font-size: 24px;
						font-weight: 500;
						color: #DBA83F;
						font-family:'Quicksand-Bold';
					}
					.in_info{
						font-size: 20px;
						line-height: 25px;
						font-weight: 500;
						color: #989898;
						margin: 14px 0 77px 0;
						font-family:'Roboto-Regular';
					}
					.in_btn{
						width: 30%;
						height: 58px;
						font-size: 20px;
						font-weight: 500;
						color: #0E0F11;
						text-align: center;
						line-height: 58px;
						background: #D3AA53;
						border-radius: 25px;
						margin: 0 auto;
						font-family:'Roboto-Regular';
						cursor: pointer;
					}
				}
			}
			.prompt_scroll{		//设置同级盒子的样式
				width: 1730px;
				height: 1700px;
				position: absolute;
				top:-170px;
				left: -1300px;
				z-index: -1;
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
						font-size: 20px;
						font-family:'Roboto-Regular';
						margin-top: 20px;
					}
				}
			}
			.order_form {
				width: 100%;
				background: #1D2023;
				border-radius: 29px;
				opacity: 1;
				margin-top: 19px;
				.order_form_header {
					width: 100%;
					display: flex;
					height: 90px;
					align-items: center;					
					justify-content: space-between;
					.left_block{
						width: 90%;
						display: flex;
						cursor: pointer;
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
								font-family:'Roboto-Bold';
								/*取消默认箭头开始*/
								appearance: none;
								-moz-appearance: none;
								-webkit-appearance: none;
								/*取消默认箭头结束*/
								padding-left: 5px;
							}
							.buyer_text{
								// width: 80%;
								// width: 50px;
								background-color: #ff0;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								margin-left: 5px;
								font-size: 20px;
								color: #ffffff;
								font-family:'Roboto-Bold';
							}
						}
						.buyer_name{
							font-size: 18px;
							color: #727272;
							margin-left: 24px;
							// width: 100px;
							// background-color: #FF0000;
							display: flex;
							align-items: center;
							.buyer_text{
								// width: 80%;
								// width: 50px;
								width: 250px;
								// background-color: #ff0 !important;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								margin-left: 5px;
								font-size: 20px;
								color: #ffffff;
								font-family:'Roboto-Bold';
							}
						}
					}
					.right_block{
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
					padding-top: 26px;
					width: 100%;
					justify-content: space-between;
					border-top: 2px solid #2D2D2D;
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
							cursor: pointer;
							font-size: 18px;
							text-align: center;
							border: 1px solid #D3AA53;
							border-radius: 24px;
							margin-right: 42px;
							font-family:'Roboto-Bold';
							
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
							font-family:'Roboto-Regular';
							font-size: 18px;
							margin-left: 27px;
						}
					}
					.order_table_body {
						div {
							display: flex;
							height: 68px;
							border-bottom: 2px solid #2D2D2D;
							font-size: 18px;
							color: #FFFFFF;
							display: flex;
							font-family:'Roboto-Regular';
							align-items: center;
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
								width: 64.5%;
							}
						}
					}
					.table_bottom{
						display: flex;
						align-items: center;
						border: none;
						justify-content: space-between;
						height: 90px;
						border-top: 2px solid #2D2D2D;
						.flx_l{
							margin-left: 30px;
							display: flex;
							align-items: center;
							cursor: pointer;
							img{
								width: 28px;
								height: 28px;
							}
							p{
								letter-spacing: 0px;
								color: #FF1717;
								font-size: 18px;
								font-family:'Roboto-Bold';
								margin-left: 18px;
							}
						}
						.order_btn{
							width: 163px;
							height: 51px;
							background: #D3AA53 0% 0% no-repeat padding-box;
							border-radius: 24px;
							font-family:'Roboto-Regular';
							border: none;
							margin-right: 42px;
							font-size: 18px;
						}
					}
				}
			}
			.order_pagination{}
		}
	}
}
</style>
