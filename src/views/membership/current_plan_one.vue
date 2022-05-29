<template>
	<div class="index">
		<div class="container">
			<LeftView :index="5"></LeftView>
			<div class="playent_right">
				<div class="playent_right_nav">
					<router-link to="/membership/membership_plans">
						<p class="av"><< Back</p>
					</router-link>
				</div>
				<div class="playent_right_form">
					<div class="right_form_1">
						<div class="form_1_top">
							<div class="top_left">
								<div class="title">Pro Max Account</div>
							</div>
						</div>
						<div class="form_1_content">
							<div class="account_list">
								<img class="accoun_img" src="../../assets/images/right_green.png" />
								<div class="accoun_text">Able to join ALL tournaments</div>
							</div>
							<div class="account_list">
								<img class="accoun_img" src="../../assets/images/right_green.png" />
								<div class="accoun_text">NO capped for friend’s capacity</div>
							</div>
							<div class="account_list">
								<img class="accoun_img" src="../../assets/images/right_green.png" />
								<div class="accoun_text">Can start to chit chat with different users</div>
							</div>
							<!-- 正式服隐蔽项start -->
							<!-- <div class="account_list">
								<img class="accoun_img" src="../../assets/images/right_green.png" />
								<div class="accoun_text">Unlock host function for rapid challenge</div>
							</div>
							<div class="account_list">
								<img class="accoun_img" src="../../assets/images/right_green.png" />
								<div class="accoun_text">Unlimited time to join rapid challenge</div>
							</div> -->
							<!-- 正式服隐蔽项end -->
							<div class="account_list">
								<img class="accoun_img" src="../../assets/images/right_green.png" />
								<div class="accoun_text">Unlock daily task to gain points</div>
							</div>
							<div class="account_list">
								<img class="accoun_img" src="../../assets/images/right_green.png" />
								<div class="accoun_text">Unlock achievement/badges</div>
							</div>
							<div class="account_list">
								<img class="accoun_img" src="../../assets/images/right_green.png" />
								<div class="accoun_text">Unlock top plays</div>
							</div>
							<!-- 正式服隐蔽项start -->
							<!-- <div class="account_list">
								<img class="accoun_img" src="../../assets/images/right_green.png" />
								<div class="accoun_text">Free 1 time trial on Companion</div>
							</div>
							<div class="account_list">
								<img class="accoun_img" src="../../assets/images/right_green.png" />
								<div class="accoun_text">5% Discount on Shops</div>
							</div> -->
							<!-- 正式服隐蔽项end -->
						</div>
					</div>
					<div class="right_forom_2">
						<div class="bonus_block" v-for="(item,index) in list" :key="index">
							<div class="bonus_head">Best Value</div>
							<div class="bonus_content">
								<div class="bonus_left_tent">
									<div class="tent_block1">{{item.month}} Months</div>
									<div class="tent_block2">MYR {{item.price}}</div>
									<div class="tent_block3">Bonus:</div>
									<div class="tent_block4">
										<div class="tent_photo">
											<img class="tent_img" src="../../assets/images/dollar.png" alt="">
											<div class="tent_text">{{item.coins || 0}} Coins</div>
										</div>
										<div class="tent_jia">+</div>
										<div class="tent_photo">
											<img class="tent_img" src="../../assets/images/human.png" alt="">
											<div class="tent_text">{{item.points || 0}} Points</div>
										</div>
									</div>
								</div>
								<div class="bonus_right_tent">
									<div class="tent_btn" @click="buyItem(item.id)">Subcribe Now</div>
								</div>
							</div>
						</div>
						<form target="_blank" hidden="hidden" method="POST" id="ePayment" name="ePayment" action="https://payment.ipay88.com.my/ePayment/entry.asp">
							<input name="MerchantCode" :value="pay_detail.MerchantCode"><br>
							<input name="PaymentId":value="pay_detail.PaymentId"><br data-tomark-pass>
							<input name="RefNo" :value="pay_detail.RefNo"><br data-tomark-pass>
							<input name="Amount" :value="pay_detail.Amount"><br data-tomark-pass>
							<input name="Currency" :value="pay_detail.Currency"><br data-tomark-pass>
							<input name="ProdDesc" :value="pay_detail.ProdDesc"><br data-tomark-pass>
							<input name="UserName" :value="pay_detail.UserName"><br data-tomark-pass>
							<input name="UserEmail" :value="pay_detail.UserEmail"><br data-tomark-pass>
							<input name="UserContact" :value="pay_detail.UserContact"><br data-tomark-pass>
							<input name="Remark" :value="pay_detail.Remark"><br data-tomark-pass>
							<input name="Lang" :value="pay_detail.Lang"><br data-tomark-pass>
							<input name="SignatureType" :value="pay_detail.SignatureType"><br data-tomark-pass>
							<input name="ResponseURL" :value="pay_detail.ResponseURL"><br data-tomark-pass>
							<input name="BackendURL" :value="pay_detail.BackendURL"><br data-tomark-pass>
							<input name="Signature" :value="pay_detail.Signature"><br data-tomark-pass>
							<input type="submit" value="提交" />
						</form>
						<!-- <div class="bonus_block">
							<div class="bonus_content">
								<div class="bonus_left_tent">
									<div class="tent_block1">3 Months</div>
									<div class="tent_block2">MYR 46.99</div>
									<div class="tent_block3">Bonus:</div>
									<div class="tent_block4">
										<div class="tent_photo">
											<img class="tent_img" src="../../assets/images/dollar.png" alt="">
											<div class="tent_text">220 Coins</div>
										</div>
										<div class="tent_jia">+</div>
										<div class="tent_photo">
											<img class="tent_img" src="../../assets/images/human.png" alt="">
											<div class="tent_text">120 Points</div>
										</div>
									</div>
								</div>
								<div class="bonus_right_tent">
									<div class="tent_btn">Subcribe Now</div>
								</div>
							</div>
						</div> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import LeftView from '@/components/order/left.vue'
	import {subscribeList,subscribeUser} from '@/api/user_info.js'
	export default{
		name:"current_plan_one",
		data(){
			return{
				list:[],
				pay_detail:{}
			}
		},
		components:{
			LeftView
		},
		mounted() {
			this.getList()
		},
		methods:{
			getList(){
				subscribeList().then(res => {
					this.list = res.data.subscribeVos
				})
			},
			//点击订阅会员
			buyItem(id){
				this.$confirm('Confirm to subscribe?', 'Confirmation', {
				  confirmButtonText: 'Confirm',
				  cancelButtonText: 'Cancel',
				  type: 'warning',
				  center: true
				}).then(() => {
					subscribeUser({id}).then(res => {
						this.$message({
							type:'success',
							message:res.message
						})
						this.pay_detail = res.data
						setTimeout( () => {
							this.ePayment()
						},1000)
						// ePayment.submit()
						// this.$router.push({path:'/membership/membership_plans'})
					})
				})
			},
			//提交订阅会员表单，去支付
			ePayment(){
				let ePaymentSubmit = document.getElementById("ePayment")
				// console.log(this.pay_detail)
				ePaymentSubmit.submit()
			}
		}
	}
</script>

<style lang="less" scoped>
.container{
	width: calc(100% - 124px);
	margin-left: 61px;
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	padding-bottom: 30px;
	.playent_right{
		width: calc(100% - 370px);
		.playent_right_nav{
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
		.playent_right_form{
			display: flex;
			justify-content: space-between;
			.right_form_1{
				width: 485px;
				height: 762px;
				background: #0E0F11;
				border-radius: 56px;
				margin-top: 20px;
				padding-bottom: 30px;
				.form_1_top{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 70px 0 47px 0;
					margin: 0px 47px 0 47px;
					border-bottom: 1px solid #727272;
					.top_left{
						.title{
							color: #FFFFFF;
							font-size: 22px;
							font-family:'Roboto-Bold';
						}
					}
					
				}
				.form_1_content{
					margin: 37px 47px 0 47px;
					.account_list{
						display: flex;
						margin-bottom: 23px;
						.accoun_img{
							width: 20px;
							height: 17px;
							margin: 0 15px;
						}
						.accoun_text{
							color: #A3A3A3;
							font-size: 18px;
							font-family:'Roboto-Regular';
						}
					}
				}
			}
			.right_forom_2{
				width: 646px;
				margin-top: 15px;
				.bonus_block{
					padding: 35px 0 27px 0;
					background: #0E0F11;
					border-radius: 28px;
					overflow: hidden;
					margin-bottom: 21px;
					.bonus_head{
						width: 157px;
						height: 34px;
						color: #0E0F11;
						font-size: 16px;
						font-family:'Roboto-Bold';
						background: #D3AA53;
						display: flex;
						align-items: center;
						justify-content: center;
						margin: 0px 0 21px 0;
					}
					.bonus_content{
						display: flex;
						justify-content: space-between;
						padding: 0 40px;
						.bonus_left_tent{
							.tent_block1{
								color: #FFFFFF;
								font-size: 18px;
								font-family:'Roboto-Bold';
							}
							.tent_block2{
								color: #D3AA53;
								font-size: 36px;
								margin: 10px 0 20px 0;
								font-family:'Roboto-Black';
							}
							.tent_block3{
								color: #A3A3A3;
								font-size: 18px;
								font-family:'Roboto-Regular';
								margin-bottom: 13px;
							}
							.tent_block4{
								display: flex;
								align-items: center;
								.tent_photo{
									display: flex;
									align-items: center;
									.tent_img{
										width: 32px;
										height: 32px;
										margin-right: 10px;
									}
									.tent_text{
										color: #A3A3A3;
										font-size: 18px;
										font-family:'Roboto-Regular';
									}
								}
								.tent_jia{
									color: #A3A3A3;
									font-family:'Roboto-Regular';
									font-size: 18px;
									margin: 0 30px;
								}
								
							}
						}
						
						.bonus_right_tent{
							.tent_btn{
								width: 183px;
								height: 58px;
								color: #0E0F11;
								font-size: 20px;
								display: flex;
								align-items: center;
								justify-content: center;
								background: #D3AA53;
								border-radius: 27px;
								font-family:'Roboto-Regular';
								margin-top: 15px;
								cursor: pointer;
							}
						}
					}
				}
			}
		}
	}
}
</style>
