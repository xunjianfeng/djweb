<template>
	<div class="index">
		<div class="container">
			<!-- Your Email 弹窗 -->
			<div class="mark_cancel" v-if="update_up == true" @click.stop="closeUpdate">
				<img src="@/assets/images/cancel.png" alt="">
			</div>
			<div class="mark_bac" v-if="update_up == true"></div>
			<div class="mark_Top_container" v-if="update_up == true">
				<div class="top_block">
					<div class="mark_email">
						<img src="../../assets/images/email.png" alt="">
					</div>
					<div class="mark_top_head" >Check Your Email</div>
					<div class="mark_top_tit">We have sent a password recover instructions to your email.</div>
				</div>
			</div>
			<!-- Your Email end -->
			<div class="replace_right">
				<div class="replace_logo">
					<img src="../../assets/images/resgiter.png" alt="">
				</div>
				<div class="replace_Top_container">
					<div class="top_block">
						<div class="replace_content">
							<div class="replace_top_head">Fogotten Password</div>
							<div class="replace_content_head">
								<div class="replace_head_tit">You will receive an email for password resetting link</div>
								<div class="replace_input_container">
									<div class="replace_head_input">
										<div class="input_right">
											<input type="text" v-model="email">
										</div>
									</div>
									<!-- <div class="fort_email" @click.stop="update_up = true">Send Email</div> -->
									<div class="fort_email" @click="clickSendEmail()">Send Email</div>
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
	import {userInfo,sendEmail} from '@/api/user_info';
	export default {
		name: "forget_password",
		components: {},
		data() {
			return {
				update_up:false,
				email:'',
				userinfo: JSON.parse(sessionStorage.getItem("userinfo"))||{},
				token:sessionStorage.getItem("userinfo") || ''
			};
		},
		mounted() {
			console.log(this.token,"这里是token")
			console.log(sessionStorage.getItem("token"),"sessToken")
		},
		methods: {
			closeUpdate(){
				this.email = ''
				this.update_up = false
			},
			clickSendEmail(){
				let that = this;
				if(sessionStorage.getItem("token") != '' && sessionStorage.getItem("token") != undefined && sessionStorage.getItem("token") != null){
					if(that.email == ''){
						this.$message({
						  message: 'Please key in email!',
						  type: 'warning'
						});
					}else if(this.email != this.userinfo.email){
						this.$message({
						  message: ' Your email address is wrong.',//输入的邮箱与登录的邮箱不同
						  type: 'warning'
						});
					}else{
						let params = {
							email:that.email
						}
						// console.log(params);
						sendEmail(params).then(res => {
							// console.log(res)
							this.$message({
							  message: res.message,
							  type: 'success'
							});
							that.update_up = true;
						})
					}
				}else{
					if(that.email == ''){
						this.$message({
						  message: 'Please key in email!',
						  type: 'warning'
						});
					}else{
						let params = {
							email:that.email
						}
						console.log(params);
						sendEmail(params).then(res => {
							// console.log(res)
							this.$message({
							  message: res.message,
							  type: 'success'
							});
							that.update_up = true;
						})
					}
				}
				
				
			}
		}
	};
</script>

<style lang="less" scoped>
	.container {
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;
		/* 换行 */
		padding-bottom: 30px;
		margin-left: 237px;
		.mark_cancel{
			position: absolute;
			right: 80px;
			top: 10px;
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
			position: absolute;
			left: 20%;
			top: 120px;
			z-index: 999;
			.top_block{
				width: 831px;
				padding: 100px 0 100px 0;
				background: #0E0F11;
				border-radius: 32px;
				overflow: hidden;
				.mark_email{
					width: 102px;
					height: 102px;
					margin: 0 auto;
					margin-bottom: 40px;
					img{
						width: 102px;
						height: 102px;
					}
				}
				.mark_top_head{
					font-size: 24px;
					color:#DBA83F ;
					font-family:'Quicksand-Bold';
					text-align: center;
					margin-bottom: 20px;
				}
				.mark_top_tit{
					color: #989898;
					font-family:'Roboto-Regular';
					font-size: 20px;
					text-align: center;
				}
			}
		}
		
		.replace_right {
			width: calc(100% - 239px);
			margin: 20px 0px 0px 0px ;
			.replace_logo{
				width: 221px;
				height: 246px;
				margin: 0 auto ;
				margin-bottom: 25px;
				img{
					width: 221px;
					height: 246px;
				}
			}
			.replace_Top_container {
				.top_block {
					width: 100%;
					padding: 149px 0 183px 0;
					background: #0E0F11;
					border-radius: 60px;
					overflow: hidden;
					.replace_top_head {
						font-size: 24px;
						color:#DBA83F;
						font-family:'Quicksand-Bold';
						margin-bottom: 32px;
					}
					.replace_content {
						width: 85%;
						margin: 0 auto;
						.replace_content_head {
							.replace_head_tit {
								color: #727272;
								font-family:'Roboto-Regular';
								font-size: 20px;
								margin-bottom: 10px;
							}
							.replace_input_container{
								display: flex;
								align-items: center;
								.replace_head_input {
									width: 80%;
									height: 59px;
									line-height: 59px;
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									font-size: 20px;
									display: flex;
									align-items: center;
									justify-content: space-between;
									padding-right: 44px;
									.input_right {
										width: 95%;
										height: 59px;
										display: flex;
										align-items: center;
										padding-left: 20px;
										input {
											width: 100%;
											height: 54px;
											color: #fff;
											font-family:'Roboto-Regular';
											font-size: 18px;
											background-color: #0E0F11;
											outline: none;
											border: none;
										}
									}
								}
								.fort_email{
									margin-left: 18px;
									color: #0E0F11;
									font-size: 20px;
									width: 165px;
									height: 59px;
									cursor: pointer;
									line-height: 59px;
									text-align: center;
									font-family:'Roboto-Regular';
									background: #D3AA53;
									border-radius: 18px;
								}
							}
							
						}
					}
				}
			}
		}
	}
</style>
