<template>
	<div class="index">
		<div class="container">
			<LeftView :index="5"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<router-link to="/membership/membership_plans">
						<p class="av">Membership Plans</p>
					</router-link>
					<router-link to="/membership/current_plan">
						<p>Current Plan</p>
					</router-link>
				</div>
				<div class="content_right_form">
					<div class="right_form_1">
						<div class="form_1_top">
							<div class="top_left">
								<p class="title">Basic Account</p>
								<p>Free</p>
							</div>
							<div class="top_right" v-if="userinfo.vipLevel == 'BASE'">
								<button class="change_btn" >Current Plan</button>
							</div>
						</div>
						<div class="form_1_content">
							<div>
								<img src="../../assets/images/right_green.png" />
								<p>Able to join free government tournaments ONLY</p>
							</div>
							<div>
								<img src="../../assets/images/right_green.png" />
								<p>Friends's capacity capped at 20</p>
							</div>
							<div>
								<img src="../../assets/images/right_green.png" />
								<p>Can view chat rooms' chat from users,but unable to chat</p>
							</div>
							<!-- 正式服隐蔽项start -->
							<!-- <div>
								<img src="../../assets/images/right_green.png" />
								<p>Able to join FREE rapid challenge</p>
							</div> -->
							<!-- 正式服隐蔽项end -->
						</div>
					</div>
					<div class="right_form_2">
						<div class="form_2_top">
							<div class="top_left">
								<div class="title">Pro Max Account</div>
								<!-- <p>Monthly</p> -->
							</div>
							<div class="top_right" v-if="userinfo.vipLevel == 'BASIC'">
								<button class="cancel_btn2" @click="jump_current_one">Upgrade</button>
							</div>
							<div class="top_right" v-if="userinfo.vipLevel == 'PRO MAX'">
								<button class="cancel_btn" @click="jump_current_one">View Plan</button>
							</div>
						</div>
						<div class="form_2_content">
							<div class="content_area">
								<div class="area_left">
									<div>
										<img src="../../assets/images/right_green.png" />
										<p>Able to join ALL tournaments</p>
									</div>
									<div>
										<img src="../../assets/images/right_green.png" />
										<p>NO capped for friend's capacity</p>
									</div>
									<div>
										<img src="../../assets/images/right_green.png" />
										<p>Can start to chit chat with different users</p>
									</div>
									<!-- 正式服隐蔽项start -->
									<!-- <div>
										<img src="../../assets/images/right_green.png" />
										<p>Unlock host function for rapid challenge</p>
									</div>
									<div>
										<img src="../../assets/images/right_green.png" />
										<p>Unlimited time to join rapid challenge</p>
									</div> -->
									<!-- 正式服隐蔽项end -->
								</div>
								<div class="area_right">
									<div>
										<img src="../../assets/images/right_green.png" />
										<p>Unlock daily task to gain points</p>
									</div>
									<div>
										<img src="../../assets/images/right_green.png" />
										<p>Unlock achievement/badges</p>
									</div>
									<div>
										<img src="../../assets/images/right_green.png" />
										<p>Unlock top plays</p>
									</div>
									<!-- 正式服隐蔽项start -->
									<!-- <div>
										<img src="../../assets/images/right_green.png" />
										<p>Free 1 time trial on Companion</p>
									</div>
									<div>
										<img src="../../assets/images/right_green.png" />
										<p>5% Discount on Shops</p>
									</div> -->
									<!-- 正式服隐蔽项end -->
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
		userInfo,
	} from '@/api/user_info'
	import LeftView from '@/components/order/left.vue'
	export default{
		name:"membership_plans",
		data(){
			return{
				userinfo: JSON.parse(sessionStorage.getItem("userinfo")) || {}
			}
		},
		components:{
			LeftView
		},
		mounted() {
			this.get_userinfo();
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
		.content_right_nav{
			// margin-top: 100px;
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
						p{
							font-family:'Roboto-Regular';
						}
					}
					.top_right{
						.change_btn{
							width: 183px;
							height: 58px;
							background: #D3AA53;
							border-radius: 27px;
							border: 1px solid #D3AA53;
							font-size: 20px;
							font-family:'Roboto-Regular';
						}
					}
				}
				.form_1_content{
					margin-top: 30px;
					margin-left: 80px;
					div{
						display: flex;
						img{
							width: 20px;
							height: 17px;
						}
						p{
							color: #A3A3A3;
							font-size: 20px;
							margin: 0;
							font-family:'Roboto-Regular';
							padding: 0px 0 20px 15px;
						}
					}
				}
			}
			.right_form_2{
				background: #0E0F11;
				border-radius: 57px;
				margin-top: 24px;
				padding-bottom: 30px;
				.form_2_top{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 40px 0 25px 0;
					margin: 0px 80px 32px 80px;
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
						
						.cancel_btn{
							width: 183px;
							height: 58px;
							background: #D3AA53;
							border-radius: 27px;
							border: 1px solid #777777;
							font-size: 20px;
							font-family:'Roboto-Regular';
							color: #0E0F11;
							cursor:pointer;
						}
						.cancel_btn2{
							width: 183px;
							height: 58px;
							background: #f11515;
							border-radius: 27px;
							border: 1px solid #f11515;
							font-size: 20px;
							color: #fff;
							font-family:'Roboto-Regular';
							cursor:pointer;
						}
					}
				}
				.form_2_content{
					margin-left: 80px;
					.content_area{
						display: flex;
						.area_left{
							div{
								display: flex;
								align-items: center;
								padding: 0px 0 20px 0px;
								img{
									width: 20px;
									height: 17px;
								}
								p{
									color: #A3A3A3;
									font-size: 20px;
									margin: 0;
									font-family:'Roboto-Regular';
									padding: 0px 0 0px 15px;
								}
							}
						}
						.area_right{
							margin-left: 90px;
							div{
								display: flex;
								align-items: center;
								padding: 0px 0 20px 0px;
								img{
									width: 20px;
									height: 17px;
								}
								p{
									color: #A3A3A3;
									font-size: 20px;
									margin: 0;
									font-family:'Roboto-Regular';
									padding: 0px 0 0px 15px;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
