<template>
	<div class="index">
		<div class="container">
			<div class="topup_right">
				<div class="Coin_container">
					<div class="coin_tit">Top-Up Coin</div>
					<div class="coin_content">
						<div v-for="(item,index) in list" :key='index' :class="chage_index == item.id ?'chage_block chage_av':'chage_block'">
							<div class="myr_block">MYR {{item.rm || 0}}</div>
							<div class="myr_block2">
								<img class="chage_img" src="../../assets/images/dollar.png" alt="">
								<div class="chage_money"><span>{{item.coin || 0}}</span> Coins</div>
								<div class="myr_text2">Free {{item.discount || 0}} coins</div>
								<div class="myr_text2">(For first Top Up per month)</div>
							</div>
							<div class="myr_button" @click="buy_package(item)">Top Up</div>
						</div>
					</div>
				</div>
				<!-- <div class="Term_container">
					<div class="term_tit">Term & Conditions</div>
					<div class="term_text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. </div>
					<div class="term_text">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac</div>
				</div> -->
				<!-- http://gamesclient.web.gdtuode.com/#/ -->
				
				<!-- <form target="_blank" hidden="hidden" method="POST" id="ePayment" name="ePayment" action="[https://payment.ipay88.com.my/epayment/entry.asp](https://payment.ipay88.com.my/epayment/entry.asp)"> -->
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
			</div>
		</div>
	</div>
</template>
<script>
	import { reCharge,packageList,rechargeOrderAdd} from '@/api/redemption.js'
	export default {
		name: "top_up",
		components: {},
		data() {
			return {
				chage_index:'',
				list:[],
				coin_num:'',
				pay_detail:{}
			};
		},
		mounted() {
			this.showPackage()
		},
		methods: {
			//套餐列表
			showPackage(){
				packageList().then(res => {
					this.list = res.data.list
				})
			},
			//充值
			buy_package(item){
				let params = {
					packageId: item.id,
					coin: item.coin
				}				
				reCharge(params).then(res => {
					this.get_payMent(item.id)
				})
			},
			get_payMent(id){
				rechargeOrderAdd({packageId:id}).then(res => {
					this.pay_detail = res.data
					// ePayment.submit()
					setTimeout( () => {
						this.ePayment()
					},1000)
				})
			},
			// ePayment(){
			// 	console.log("点击到这里了")
			// 	let ePaymentSubmit = document.getElementById("ePayment")
			// 	// console.log(this.pay_detail)
			// }
			ePayment(){
				let ePaymentSubmit = document.getElementById('ePayment');
				ePaymentSubmit.submit();
			},
		}
	}
</script>
<style lang="less" scoped>
	.container {
		display: flex;
		justify-content: space-between;/* 横向中间自动空间 */
		flex-wrap: wrap;/* 换行 */
		margin-left: 156px;
		.topup_right {
			width: calc(100% - 222px);
			margin-bottom: 150px;
			.Coin_container{				
				background: #0E0F11;
				margin: 76px 0 47px 0;
				padding: 0 35px 10px 35px;
				border-radius: 20px;
				.coin_tit{
					color: #FFFFFF;
					font-size: 30px;
					font-family:'Roboto-Medium';
					padding: 68px 0 27px;
				}
				.coin_content{
					display: flex;
					flex-wrap: wrap;
					// justify-content: center;
					// width: 82%;
					width: 86%;
					margin: 0 auto;
					text-align: center;
					// background-color: #FFEEAA;
					.chage_block{
						width: 320px;
						padding:52px 0 27px 0 ;
						cursor: pointer;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						margin: 0px 35px 35px 0px;
						border: 1px solid #3D4144;
						border-radius: 31px;
						// background-color: #FFFF00;
						.myr_block{
							color: #DBA83F;
							font-size: 18px;
							font-family:'Roboto-Bold';
						}
						.myr_block2{
							text-align: center;
							.chage_img{
								width: 53px;
								height: 60px;
								margin: 18px 0 30px 0;
							}
							.chage_money{
								color: #fff;
								font-family:'Roboto-Bold';
								font-size: 18px;
								margin-bottom: 6px;
								span{
									font-size: 22px;
									font-family:'Roboto-Bold';
								}
							}
							.myr_text2{
								color: #727272;
								font-size: 17px;
								margin-bottom: 5px;
								font-family:'Roboto-Regular';
							}
						}
						.myr_button{
							width: 163px;
							height: 50px;
							color: #0E0F11;
							font-family:'Roboto-Regular';
							font-size: 18px;
							font-weight: 600;
							display: flex;
							align-items: center;
							justify-content: center;
							background: #DBA83F;
							border-radius: 18px;
							margin-top: 26px;
							cursor: pointer;
						}
					}
					.chage_block:nth-child(3n){
						// margin: 0px 0px 35px 0px;
					}
					.chage_av{
						// border: 1px solid #D3AA53;
						.chage_money{
							color: #0E0F11;
							font-size: 20px;
							font-family:'Roboto-Regular';
							span{
								font-size: 22px;
								font-weight: bold;
								margin-right: 6px;
							}
						}
					}
				}
			}
			.Term_container{
				background: #0E0F11;
				border-radius: 6px;
				padding:40px 140px 40px 48px ;
				.term_tit{
					color: #FFFFFF;
					font-size: 22px;
					margin-bottom: 27px;
					font-family:'Roboto-Medium';
				}
				.term_text{
					color: #727272;
					font-size: 20px;
					line-height: 22px;
					margin-bottom: 20px;
					font-family:'Roboto-Regular';
				}
			}
		}
	}
</style>
