<template>
	<div class="index">
		<div class="container">
			<div class="replace_right">
				<div class="replace_logo">
					<img src="../../assets/images/resgiter.png" alt="">
				</div>
				<div class="replace_Top_container">
					<div class="top_block">
						<div class="replace_top_head">Choose a strong password to protect your account.</div>
						<div class="replace_top_tit">Changing your password will sign you out of all your devices. You will need to enter your new password.</div>
						<div class="replace_border"></div>
						<div class="replace_content">
							<div class="replace_content_head">
								<div class="replace_head_tit">Your New Password</div>
								<div class="replace_head_input">
									<div class="input_right">
										<el-input v-model="password"  class="replace_input" placeholder="Enter your new password" ></el-input>
									</div>
								</div>
							</div>
							<div class="replace_content_head">
								<div class="replace_head_tit">Confirm New Password</div>
								<div class="replace_head_input">
									<div class="input_right">
										<el-input v-model="confirm_password"  class="replace_input" placeholder="Enter your new password again"   ></el-input>
									</div>
								</div>
							</div>
							<div class="replace_foot">
								<div class="foot_right">
									<div class="foot_next" @click="jump_security(1)">Change Password</div>
									<div class="foot_cancel" @click="jump_security(2)">Cancel</div>
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
	import {changePassword} from '@/api/user_info';
	export default {
		name: "replace_passwordTwo",
		components: {},
		data() {
			return {
				oldpassword:'', //旧密码
				password:'',//新密码
				confirm_password:'', //确认新密码
			};
		},
		mounted() {
			this.oldpassword = this.$route.query.oldpassword
			console.log(this.oldpassword)
		},
		methods: {
			jump_security(index){
				let that = this;
				// 1修改  2跳过
				if(index == 1){
					if(that.password == '' || that.confirm_password == ''){
						this.$message({
						  message: 'Please key in password!',
						  type: 'warning'
						});
						return false
					}else if(that.confirm_password != that.password){
						this.$message({
						  message: 'The password you keyed in is wrong.',//密码不一致，请确认密码是否一致
						  type: 'warning'
						});
						return false
					}else if(that.confirm_password.length < 6){
						this.$message({
						  message: 'Password cannot less than 6 characters.',//密码长度不能少于六位数
						  type: 'warning'
						});
						return false
					}else{
						let params = {
							oldpassword:that.oldpassword,
							password:that.password,
						}
						changePassword(params).then(res => {
							that.$message({
							  message:res.message,
							  type: 'success'
							});
							sessionStorage.setItem("token", '')
							sessionStorage.setItem("userId", '')
							sessionStorage.setItem("userinfo", '')
							setTimeout(function(){
								that.$router.push({path:'/login/index'})
							},1000)
						})
					}
				}else{
					that.$router.push({path:'/security/index'})
				}
				
			},
		}
	};
</script>
<style scoped>
	/deep/.el-input__inner {
	    -webkit-appearance: none;
	    background-color: #0E0F11;
	    background-image: none;
	    border-radius: 19px;
	    border: none;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    color: #fff;
	    display: inline-block;
		font-size: 20px;
	    height: 55px;
	    line-height: 55px;
	    outline: 0;
	    padding: 0 15px;
	    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	    width: 100%;
	}
	/deep/.el-input__inner {
	    &::placeholder {
	      /* color: #424242; */
	      font-size: 20px;
	    }
	  }
</style>
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
				width: 100%;
				padding: 50px 0 50px 0;
				background: #0E0F11;
				border-radius: 60px;
				overflow: hidden;
				.top_block {
					width: 85%;
					margin: 0 auto;
					.replace_top_head {
						font-size: 24px;
						color: #DBA83F;
						font-family:'Quicksand-Bold';
						margin-bottom: 15px;
					}

					.replace_top_tit {
						width: 65%;
						color: #727272;
						font-family:'Roboto-Regular';
						font-size: 18px;
						margin-bottom: 20px;
					}

					.replace_border {
						width: 100%;
						height: 2px;
						background-color: #2D2D2D;
						margin: 0 auto;
					}

					.replace_content {
						margin: 60px 0 0px 0;
						.replace_content_head {
							margin-bottom: 24px;
							.replace_head_tit {
								color: #727272;
								font-size: 20px;
								font-family:'Roboto-Regular';
								margin-bottom: 10px;
							}
							.replace_head_input {
								height: 59px;
								line-height: 59px;
								border: 2px solid #2D2D2D;
								border-radius: 19px;
								font-size: 20px;
								display: flex;
								align-items: center;

								.input_right {
									height: 59px;
									display: flex;
									align-items: center;
									padding-left: 20px;
									width: 80%;
									.replace_input{
										color: #fff;
										font-family:'Roboto-Regular';
										font-size: 20px;
									}
									/deep/ input::-webkit-input-placeholder{
									  color: #424242;
									}
								}
							}
						}
						.replace_foot {
							margin: 53px 0 0px 0;
							.foot_right {
								display: flex;
								justify-content: flex-end;
								.foot_next{
									width: 197px;
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
