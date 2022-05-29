<template>
	<div class="index">
		<div class="container">
			<div class="content_right">
				<div class="content_right_nav">
					<div class="nav-left">Report an abuse/Support</div>
					<div class="nav-right"></div>
				</div>
				<!-- 资料信息 -->
				<div class="content_right_container">
					<div class="content_right_form">
						<div class="right_form_information">
							<div class="form_user">
								<div class="form_overall">
									<div class="overall_text">General Information</div>
									<div class="overall_border"></div>
								</div>
								<p class="form_username">
									First and Last Name
									<span>*</span>
								</p>
								<div class="form_input_block"><input type="text" class="input-left" disabled v-model="dataForm.name" /></div>
								<p class="form_username">
									Email
									<span>*</span>
								</p>
								<div class="form_input_block"><input type="text" class="input-left" disabled v-model="dataForm.email" /></div>
								<p class="form_username">
									Phone Number
									<span>*</span>
								</p>
								<div class="Phone_Number_Input">
									<VuePhoneNumberInput
										id="phoneNumber1"
										v-model="dataForm.phoneNumber"
										:default-country-code="dataForm.countryCode"
										disabled
										/>
								</div>
								<!-- <div class="form_input_block">
									<input type="text" class="input-left" disabled v-model="dataForm.phoneNumber" />
									
								</div> -->
							</div>
							<div class="form_user" style="margin-top: 60px;">
								<div class="form_overall">
									<div class="overall_text">Detailed Information</div>
									<div class="overall_border"></div>
								</div>
							</div>
							<div class="form_option">
								<div class="option_username">
									Type of Request
									<span>*</span>
								</div>
								<div class="option_text">(Please choose the type of requests from the common options or choose ‘Other’ in case the list does not cover your request.)</div>
								<div class="option_list">
									<div class="option_in">
										<div class="option_y">
											<img class="option_wu" :src="dataForm.about === 'Tournament' ? you:wu"  @click="get_choose('Tournament')">
										</div>
										Tournament
									</div>
									<div class="option_in">
										<div class="option_y">
											<img class="option_wu" :src="dataForm.about === 'Rapic Challenge' ? you:wu"  @click="get_choose('Rapic Challenge')">
										</div>
										Rapid Challenge
									</div>
									<div class="option_in">
										<div class="option_y">
											<img class="option_wu" :src="dataForm.about === 'League' ? you:wu"  @click="get_choose('League')">
										</div>
										League
									</div>
									<div class="option_in">
										<div class="option_y">
											<img class="option_wu" :src="dataForm.about === 'Predict and Win' ? you:wu"  @click="get_choose('Predict and Win')">
										</div>
										Predict and Win
									</div>
									<div class="option_in">
										<div class="option_y">
											<img class="option_wu" :src="dataForm.about === 'Redemption' ? you:wu"  @click="get_choose('Redemption')">
										</div>
										Redemption
									</div>
									<div class="option_in">
										<div class="option_y">
											<img class="option_wu" :src="dataForm.about === 'Companion' ? you:wu" @click="get_choose('Companion')">
										</div>
										Companion
									</div>
									<div class="option_in">
										<div class="option_y">
											<img class="option_wu" :src="dataForm.about === 'Other' ? you:wu" @click="get_choose('Other')">
										</div>
										Other
									</div>
								</div>
							</div>
							<div class="form_input3 form_margin" style="width:98%">
								<p class="form_username">
									Description
									<span>*</span>
								</p>
								<el-input
								  type="textarea"
								  placeholder=""
								  v-model="dataForm.description"
								  maxlength="1000"
								  resize="none"
								  show-word-limit
								>
								</el-input>
							</div>
						</div>
					</div>
				</div>
				<div class="foot">
					<div class="foot_save"   @click="submit_report(1)">Submit</div>
					<div class="foot_cancel" @click="submit_report(2)">Cancel</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	userInfo,addReport
} from '@/api/user_info'
import VuePhoneNumberInput from 'vue-phone-number-input';
import LeftView from '@/components/order/left.vue';
export default {
	name: 'support',
	components: {
		LeftView,
		VuePhoneNumberInput
	},
	data() {
		return {
			wu:require("../../assets/images/yls.png"), 
			you:require("../../assets/images/yl.png"), 
			dataForm:{
				name:'',
				email:'',
				phoneNumber:'',
				about:'',
				description:'',
				countryCode:''
			},
			userinfo:'',
		};
	},
	mounted() {
		this.get_userinfo()
	},
	methods: {
		// 用户信息
		get_userinfo() {
			let self = this;
			let params = {
				userId:sessionStorage.getItem('userId')
			}
			userInfo(params).then(res => {
				self.userinfo = res.data.userInfo
				self.dataForm.name = self.userinfo.fullName
				self.dataForm.email = self.userinfo.email
				self.dataForm.phoneNumber = self.userinfo.phoneNumber
				self.dataForm.countryCode = self.userinfo.countryCode
				sessionStorage.setItem("userinfo", JSON.stringify(res.data.userInfo))
			})
		},
		// 选择
		get_choose(text){
			let that = this;
			that.dataForm.about = text
		},
		// 提交 
		submit_report(index){
			let that = this;
			if(index == 1){
				let { name, email, about, description} = that.dataForm
				if(name == '' || email == '' || about == '' || description == ''){
					that.$message({
						type: 'warning',
						message: 'Please complete all information!'
					});
					return false
				}else{
					addReport(that.dataForm).then(res => {
						that.$message({
							type: 'success',
							message: res.message
						});
						that.dataForm = {
							name:'',
							email:'',
							about:'',
							description:'',
						}
						that.get_userinfo();
					})
				}
			}else{
				that.dataForm = {
					name:'',
					email:'',
					about:'',
					description:'',
				}
			}
		},
	}
};
</script>
<style lang="less" scoped>
.container {
	width: 95%;
	// margin: 0 auto;
	margin-left: 90px;
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	.content_right {
		width: calc(100% - 150px);
		.content_right_nav {
			width: calc(100% - 60px);
			margin-top: 50px;
			margin-bottom: 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.nav-left {
				font-size: 20px;
				color: #fff;
				font-weight: 500;
				font-family:'Quicksand-Bold';
			}
			.nav-right {}
		}
		.content_right_container {
			width: calc(100% - 60px);
			background: #0e0f11;
			border-radius: 24px;
			margin-bottom: 57px;
			padding: 20px;
			font-family:'Roboto-Regular';
			.content_right_form {
				.right_form_information {
					// width: 95%;
					width: 1071px;
					margin: 0 2.5%;
					.form_user {
						width: 98%;
						margin-top: 20px;
						margin-right: 2%;
						.form_overall {
							display: flex;
							align-items: center;
							margin-bottom: 30px;
							.overall_text {
								color: #d3aa53;
								font-size: 20px;
								margin-right: 21px;
								font-family:'Roboto-Bold';
							}
							.overall_border {
								width: 301px;
								height: 2px;
								background-color: #2d2d2d;
							}
							.overall_border2 {
								width: 72px;
								height: 2px;
								background-color: #2d2d2d;
							}
						}
						.form_username {
							color: #727272;
							font-size: 20px;
							span {
								color: red;
							}
						}
						.form_input_block {
							width: 98%;
							height: 55px;
							display: flex;
							padding: 0 20px;
							align-items: center;
							border: 2px solid #2d2d2d;
							border-radius: 19px;
							color: #fff;
							.input-left {
								width: 100%;
								height: 55px;
								color: #fff;
								border: none;
								background-color: #0e0f11;
								background: inherit;
								padding-left: 20px;
								font-size: 16px;
							}
						}
						.Phone_Number_Input{
							// width: 105%;
							width: 102%;
							height: 55px;
							// border: 2px solid #2D2D2D;
							border-radius: 19px;
							position: relative;
							/deep/.country-selector__input{
								color: #fff;
								height: 55px;
								min-height:55px;
								border: 1px solid #2d2d2d;
								border-top-left-radius: 19px !important;
								border-bottom-left-radius: 19px !important;
								background-color:#0e0f11 !important;
							}
							/deep/.input-tel__input{
								color: #fff;
								height: 55px;
								min-height:55px;
								border: 1px solid #2d2d2d;
								border-top-right-radius: 19px !important;
								border-bottom-right-radius: 19px !important;
								background-color:#0e0f11 !important;
							}
						}
					}
					.form_margin {
						margin: 0px 0 20px 0;
					}
					.form_input3 {
						width: 100%;
						display: inline-block;
						.form_username {
							color: #727272;
							font-size: 20px;
							span {
								color: red;
							}
						}
						.form_overall {
							display: flex;
							align-items: center;
							margin-bottom: 30px;
							.overall_text {
								color: #d3aa53;
								font-size: 20px;
								margin-right: 21px;
								font-family:'Roboto-Bold';
							}
							.overall_border {
								width: 350px;
								height: 2px;
								background-color: #2d2d2d;
							}
						}
						/deep/.el-textarea__inner {
							border: 2px solid #2d2d2d;
							border-radius: 19px;
							color: #fff;
							background: inherit;
							padding: 20px;
							font-size: 16px;
							height: 180px;
						}
						/deep/ .el-textarea .el-input__count{
							background-color:#0e0f11 ;
							color:#727272;
						}
					}
					.form_option{
						margin: 31px 0px 11px 0px; 
						.option_username {
							color: #727272;
							font-size: 20px;
							margin-bottom: 10px;
							span {
								color: red;
							}
						}
						.option_text{
							color: #727272;
							font-size: 18px;
							margin-bottom: 24px;
						}
						.option_list{
							.option_in{
								display: flex;
								align-items: center;
								font-size: 20px;
								color: #fff;
								margin-bottom: 29px;
								.option_y{
									margin-right: 20px;
									.option_wu{
										width: 30px;
										height: 30px;
										display: block;
									}
									.option_you{
										width: 30px;
										height: 30px;
										display: block;
									}
								}
							}
							.option_in:last-child{
								margin-bottom: 0;
							}
						}
					}
				}
			}
		}
		.foot{
			margin-bottom: 60px;
			display: flex;
			font-family:'Roboto-Regular';
			.foot_save {
				width: 163px;
				height: 58px;
				line-height: 58px;
				background: #d3aa53;
				border: 1px solid #d3aa53;
				color: #0E0F11;
				font-size: 20px;
				font-weight: 500;
				text-align: center;
				border-radius: 25px;
				margin-right: 20px;
				cursor: pointer;
			}
			.foot_cancel {
				width: 163px;
				height: 58px;
				line-height: 58px;
				background: #1D2023;
				border: 1px solid #727273;
				color: #FFFFFF;
				font-size: 20px;
				font-weight: 500;
				text-align: center;
				border-radius: 25px;
				margin-right: 20px;
				cursor: pointer;
			}
		}
		
	}
}
</style>
