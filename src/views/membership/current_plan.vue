<template>
	<div class="index">
		<div class="container">
			<LeftView :index="5"></LeftView>
			<div class="content_right">
				<!-- 导航栏 -->
				<div class="content_right_nav">
					<router-link to="/membership/membership_plans">
						<p >Membership Plans</p>
					</router-link>
					<router-link to="/membership/current_plan">
						<p class="av">Current Plan</p>
					</router-link>
				</div>
				<!-- 内容块 -->
				<div class="content_right_form">
					<!-- 方框1 -->
					<div class="right_form_1">
						<div class="form_1_top">
							<div class="top_left">
								<p class="title">{{userinfo.vipLevel == 'BASIC' ? 'Basic Account' :'Pro Max Account'}}</p>
								<p style="font-family:'Roboto-Regular';">Monthly</p>
							</div>
							<div class="top_right">
								<button class="change_btn" @click="jump_current_one">Upgrade My Plan</button>
								<!-- <button class="cancel_btn">Cancel Renewal</button> -->
							</div>
						</div>
						<div class="form_1_content">
							<div class="content_top" v-if="userinfo.vipLevel == 'BASIC'">
								<p>Upgrade your plan to enjoy more benefits.</p>
							</div>
							<div class="content_top" v-if="userinfo.vipLevel == 'PRO MAX'">
								<p>Your next payment is <span>RM 14.99</span>,to be changed on <span>Feb 4, 2021</span></p>
								<p>Your payment will be automatically renewed each month.</p>
							</div>
							<!-- <div class="content_card">
								<div class="card_info">
									<img src="../../assets/images/card.png" />
									<p>**** **** **** 8379</p>
								</div>
								<div class="card_right">
									<button class="update_btn">Update Card</button>
								</div>
							</div> -->
						</div>
					</div>
					<!-- 方框2 -->
					<!-- <div class="right_form_2">
						<div class="form_2_top">
							<div class="top_left">
								<p class="title">Payment Method</p>
							</div>
						</div>
						<div class="form_2_content">
							<div class="content_card">
								<div class="card_info">
									<img src="../../assets/images/card.png" />
									<p>**** **** **** 8379</p>
								</div>
								<div class="card_right">
									<button class="update_btn">Update Card</button>
								</div>
							</div>
						</div>
					</div> -->
					<!-- 方框3 -->
					<!-- <div class="right_form_3">
						<div class="form_3_top">
							<div class="top_left">
								<p class="title">Invoicing</p>
							</div>
						</div>
						<div class="form_3_content">
							<div class="content_card">
								<div class="card_info">
									<p>Last payment : 01/02/2021</p>
								</div>
								<div class="card_right">
									<p>Check billing history</p>
								</div>
							</div>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		userInfo,paymentOrderList
	} from '@/api/user_info'
	import LeftView from '@/components/order/left.vue'
	export default{
		name:"index",
		data(){
			return{
				listQuery:{
					orderType:2,	//1充值 2 订阅会员
					page:1,
					size:10
				},
				payment_list:[],//支付订单列表
				userinfo: JSON.parse(sessionStorage.getItem("userinfo")) || {}
			}
		},
		components:{
			LeftView
		},
		mounted() {
			this.get_userinfo();
			this.getList()
		},
		methods:{
			//vipLevel  会员等级  NA-未认证  BASE-认证  PRO MAX-会员
			get_userinfo() {
				let self = this;
				let params = {
					userId:sessionStorage.getItem('userId')
				}
				userInfo(params).then(res => {
					self.userinfo = res.data.userInfo
					sessionStorage.setItem("userinfo", JSON.stringify(res.data.userInfo))
					
				})
			},
			jump_current_one(){
				this.$router.push({path:'/membership/current_plan_one'})
			},
			getList(){
				paymentOrderList(this.listQuery).then(res => {
					this.payment_list = res.data
					// console.log(this.payment_list,"payment_list")
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.container{
	width: 90%;
	margin-left: 61px;
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	padding-bottom: 30px;
	.content_right{
		width: calc(100% - 370px);
		margin-bottom: 100px;
		.content_right_nav{
			margin-top: 50px;
			p{
				display: inline-block;
				color: #727272;
				padding: 0 30px;
				font-size: 22px;
				font-family:'Quicksand-Bold';
			}
			.av{
				font-family:'Quicksand-Bold';
			  color: #FFFFFF;
			}
		}
		.content_right_form{
			width: calc(100%-60px);
			.right_form_1{
				// height: 460px;
				background: #0E0F11;
				border-radius: 56px;
				// margin-top: 50px;
				margin-top: 20px;
				padding-bottom: 30px;
				.form_1_top{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-top: 50px;
					margin: 0px 80px 0 80px;
					border-bottom: 1px solid #727272;
					.top_left{
						text-align: left;
						color: #727272;
						font-size: 18px;
						.title{
							color: #FFFFFF;
							font-size: 22px;
							font-family:'Roboto-Bold';
						}
					}
					.top_right{
						.change_btn{
							width: 194px;
							height: 58px;
							background: #D3AA53;
							font-family:'Roboto-Regular';
							border-radius: 27px;
							border: 1px solid #D3AA53;
							font-size: 20px;
							cursor: pointer;
						}
						.cancel_btn{
							width: 183px;
							height: 58px;
							background: #0E0F11;
							border-radius: 27px;
							font-family:'Roboto-Regular';
							border: 1px solid #777777;
							font-size: 20px;
							color: #FFFFFF;
							margin-left: 28px;
						}
					}
				}
				.form_1_content{
					margin: 30px 80px 0 80px;
					.content_top{
						p{
							color: #727272;
							font-size: 18px;
							font-family:'Roboto-Regular';
							span{
								color: #CECECE;
								font-family:'Roboto-Bold';
							}
						}
					}
					.content_card{
						display: flex;
						justify-content: space-between;
						margin-top: 88px;
						.card_info{
							display: flex;
							align-items: center;
							img{
								width: 33px;
								height: 26px;
								margin-right: 33px;
							}
							p{
								color: #727272;
								font-size: 18px;
								font-family:'Roboto-Regular';
							}
						}
						.card_right{
							.update_btn{
								width: 183px;
								height: 58px;
								background: #0E0F11;
								border: 1px solid #777777;
								color: #FFFFFF;
								font-size: 20px;
								font-family:'Roboto-Regular';
								border-radius: 27px;
							}
						}
						
					}
				}
			}
			.right_form_2{
				background: #0E0F11;
				border-radius: 54px;
				margin-top: 36px;
				padding-bottom: 30px;
				.form_2_top{
					display: flex;
					align-items: center;
					padding-top: 34px;
					margin: 0px 80px 0 80px;
					border-bottom: 1px solid #727272;
					.top_left{
						.title{
							color: #FFFFFF;
							font-size: 22px;
							font-family:'Roboto-Bold';
						}
					}
					
				}
				.form_2_content{
					margin: 30px 80px 0 80px;
					.content_card{
						display: flex;
						justify-content: space-between;
						.card_info{
							display: flex;
							align-items: center;
							img{
								width: 33px;
								height: 26px;
								margin-right: 33px;
							}
							p{
								color: #727272;
								font-size: 18px;
								font-family:'Roboto-Regular';
							}
						}
						.card_right{
							.update_btn{
								width: 183px;
								height: 58px;
								background: #0E0F11;
								border: 1px solid #777777;
								color: #FFFFFF;
								font-size: 20px;
								border-radius: 27px;
								font-family:'Roboto-Regular';
							}
						}
						
					}
				}
			}
			.right_form_3{
				background: #0E0F11;
				border-radius: 54px;
				margin-top: 36px;
				padding-bottom: 30px;
				.form_3_top{
					display: flex;
					align-items: center;
					padding-top: 34px;
					margin: 0px 80px 0 80px;
					border-bottom: 1px solid #727272;
					.top_left{
						.title{
							color: #FFFFFF;
							font-size: 22px;
							font-family:'Roboto-Bold';
						}
					}
					
				}
				.form_3_content{
					margin: 30px 80px 0 80px;
					.content_card{
						display: flex;
						justify-content: space-between;
						.card_info{
							display: flex;
							align-items: center;
							p{
								color: #727272;
								font-size: 18px;
								font-family:'Roboto-Regular';
							}
						}
						.card_right{
							p{
								color: #D3AA53;
								font-size: 18px;
								font-family:'Roboto-Bold';
							}
						}
						
					}
				}
			}
		}
	}
}
</style>
