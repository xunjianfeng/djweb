<template>
	<div class="index">
		<div class="container">
			<div class="replace_right">
				<div class="replace_logo">
					<img src="../../assets/images/resgiter.png" alt="">
				</div>
				<div class="replace_Top_container">
					<div class="top_block">
						<div class="replace_top_avater">
							<img :src="HOST + user_info.avatar" alt="" v-if="user_info.avatar">
							<img src="../../assets/images/default.png" v-else />
						</div>
						<div class="replace_top_head">{{user_info.fullName}}</div>
						<div class="replace_top_tit">{{user_info.email}}</div>
						<div class="replace_content">
							<div class="replace_content_head">
								<div class="replace_head_tit">To continue, first verify that it’s you</div>
								<div class="replace_head_input">
									<div class="input_right">
										<input type="text"  placeholder="Enter your password" v-model="oldpassword">
									</div>
									<div class="input_forgot" @click="jump_forget">Forgot password?</div>
								</div>
							</div>
							<div class="replace_foot">
								<div class="foot_right">
									<div class="foot_next" @click="jump_password">Next</div>
									<div class="foot_cancel" @click="jump_security">Cancel</div>
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
	// import {userLogin} from '@/api/login';
	export default {
		name: "replace_password",
		components: {},
		data() {
			return {
				oldpassword:'',
				user_info:{}
			};
		},
		mounted() {
			this.user_info = JSON.parse(sessionStorage.getItem("userinfo"))
			// this.oldpassword = this.$route.query.oldpassword
			// console.log(this.oldpassword)
		},
		methods: {
			jump_password(){
				let that = this;
				// let checkOldPw = params => req.set('/login',params)
				let user_Id = sessionStorage.getItem("userId");
				// userLogin().then(res => {
				// 	if(user_Id == res.data.info.userId){
				// 		let oldPw = res.data.info.password;
				// 		console.log(oldPW);
				// 	}
				// })
				// console.log(checkOldPw)
				// if(user_Id == res.data.info.userId){
				// 		let oldPw = res.data.info.password;
				// 		console.log(oldPW);
				// 	}
				// })
				if(that.oldpassword == ''){
					this.$message({
						message: 'Please key in password!',
						type: 'warning'
					});
				}
				// else if(this.oldpassword != oldPW){
				// 	this.$message({
				// 		message: '原密码不正确',
				// 		type: 'warning'
				// 	});
				// }
				else{
					// userLogin().then(res => {
					// 	if(user_Id == res.data.info.userId){
					// 		let oldPw = res.data.info.password
					// 	}
					// })
					that.$router.push({path:'/security/replace_passwordTwo',query: {oldpassword: that.oldpassword}})
				}
				// if(this.oldpassword != this.$route.query.oldpassword){
				// 	this.$message({
				// 	  message: '原密码不正确',
				// 	  type: 'warning'
				// 	});
				// }else if(that.oldpassword != ''){
				// 	that.$router.push({path:'/security/replace_passwordTwo',query: {oldpassword: that.oldpassword}})
				// }else{
				// 	this.$message({
				// 	  message: '请输入密码 ！！！',
				// 	  type: 'warning'
				// 	});
				// }
				
			},
			jump_security(){
				this.$router.push({path:'/security/index'})
			},
			jump_forget(){
				this.$router.push({path:'/security/forget_password'})
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
					padding: 50px 0 50px 0;
					background: #0E0F11;
					border-radius: 60px;
					overflow: hidden;
					.replace_top_avater{
						width: 124px;
						height: 124px;
						border-radius: 28px;
						overflow: hidden;
						margin: 0 auto;
						margin-bottom: 34px;
						img{
							width: 124px;
							height: 124px;
							object-fit: fill;
						}
					}
					.replace_top_head {
						font-size: 30px;
						color: #FFFFFF;
						font-family:'Roboto-Medium';
						text-align: center;
						margin-bottom: 17px;
					}

					.replace_top_tit {
						color: #D3AA53;
						font-family:'Roboto-Regular';
						font-size: 18px;
						text-align: center;
						margin-bottom: 20px;
					}
					.replace_content {
						width: 85%;
						margin: 0 auto;
						.replace_content_head {
							margin: 55px 0 37px 0;
							.replace_head_tit {
								color: #727272;
								font-family:'Roboto-Regular';
								font-size: 20px;
								margin-bottom: 10px;
							}

							.replace_head_input {
								// width: 627px;
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
									width: 75%;
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
								.input_forgot{
									color: #868686;
									font-family:'Roboto-Regular';
									cursor: pointer;
									font-size: 18px;
								}
							}
						}
						.replace_foot {
							margin-bottom: 50px;
							.foot_right {
								display: flex;
								justify-content: flex-end;
								.foot_next{
									width: 163px;
									height: 58px;
									color: #0E0F11;
									font-family:'Roboto-Regular';
									line-height: 58px;
									font-size: 20px;
									cursor: pointer;
									text-align: center;
									background: #D3AA53;
									border-radius: 25px;
									border: 1px solid #D3AA53;
									margin-right: 20px;
								}
								.foot_cancel{
									width: 163px;
									height: 58px;
									color: #FFFFFF;
									font-family:'Roboto-Regular';
									line-height: 58px;
									font-size: 20px;
									cursor: pointer;
									text-align: center;
									background: #0E0F11;
									border: 1px solid #777777;
									border-radius: 25px;
								}
							}
							
						}
					}
				}
			}
		}
	}
</style>
