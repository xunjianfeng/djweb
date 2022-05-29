<template>
	<div class="index">
		<div class="container">
			<LeftView :index="2"></LeftView>
			<div class="mark_container">
				<div class="mark_bac" v-if="update_up == true || port_up == true || student_up == true"></div>
				<!-- NRIC 弹窗 -->
				<div class="mark_popup_container" v-if="update_up == true">
					<div class="mark_cancel" v-if="update_up == true" @click.stop="changeUpdate">
						<img src="@/assets/images/cancel.png" alt="">
					</div>
					<div class="top_block">
						<div class="mark_top_head" >Update Your Verify</div>
						<div class="mark_top_tit">Please upload your NRIC number & front and back for verification</div>
						<div class="mark_border"></div>
						<div class="mark_content">
							<div class="mark_content_head">
								<div class="mark_head_tit">Your NRIC Number <span style="font-size: 18rpx;">(eg. xxxxxxxxxxxx)</span></div>
								<div class="mark_head_input">
									<div class="input_right">
										<input type="text" value="" v-model="dataForm.identification">
									</div>
								</div>
							</div>
							<div class="mark_content_update" style="margin-top:70px;">
								<div class="update_block">
									<div class="update_block_tit">Front View</div>
									<div :class="dataForm.frontUrl == ''? 'udpate_btom_no':'udpate_btom'">
										<img  class="active1_img" v-if="dataForm.frontUrl" :src="HOST + dataForm.frontUrl" :alt="dataForm.frontUrl">
										<el-upload
											class="avatar-uploader"
											:action="HOST + '/img/upload'"
											:show-file-list="false"
											:on-success="res => {return handleAvatarSuccess(res,'front_url');}"
											:before-upload="beforeAvatarUpload">
											<img src="../../assets/images/update.png" alt="" v-if="dataForm.frontUrl == ''">
										</el-upload>
									</div>
								</div>
								<div class="update_block">
									<div class="update_block_tit">Back View</div>
									<div :class="dataForm.backUrl == ''? 'udpate_btom_no':'udpate_btom'">
										<img  class="active1_img" v-if="dataForm.backUrl" :src="HOST + dataForm.backUrl" :alt="dataForm.backUrl">
										<el-upload
											class="avatar-uploader"
											:action="HOST + '/img/upload'"
											:show-file-list="false"
											:on-success="res => {return handleAvatarSuccess(res,'back_url');}"
											:before-upload="beforeAvatarUpload">
											<img src="../../assets/images/update.png" alt="" v-if="dataForm.backUrl == ''">
										</el-upload>
									</div>
								</div>
							</div>
							<div class="mark_foot">
								<div class="foot_right">
									<div class="foot_button" @click="handleSave">Save</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- NRIC end -->
				
				<!-- Passport 弹窗 -->
				<div class="mark_popup_container" v-if="port_up == true">
					<div class="mark_cancel" v-if="port_up == true" @click.stop="changeUpdate">
						<img src="@/assets/images/cancel.png" alt="">
					</div>
					<div class="top_block">
						<div class="mark_top_head" >Update Your Verification</div>
						<div class="mark_top_tit">Please upload your Passport without signature photo for verification</div>
						<div class="mark_border"></div>
						<div class="mark_content">
							<div class="mark_content_head">
								<div class="mark_head_tit">Your Passport Number</div>
								<div class="mark_head_input">
									<div class="input_right">
										<input type="text" value="" v-model="dataForm.identification">
									</div>
								</div>
							</div>
							<div class="update_title">Passport Photo (JPG, PNG)</div>
							<div class="mark_content_update">
								<div class="update_block">
									<div class="update_block_tit">Front View</div>
									<div :class="dataForm.frontUrl == ''? 'udpate_btom_no':'udpate_btom'">
										<img  class="active1_img" v-if="dataForm.frontUrl" :src="HOST + dataForm.frontUrl" :alt="dataForm.frontUrl">
										<el-upload
											class="avatar-uploader"
											:action="HOST + '/img/upload'"
											:show-file-list="false"
											:on-success="res => {return handleAvatarSuccess(res,'front_url');}"
											:before-upload="beforeAvatarUpload">
											<img src="../../assets/images/update.png" alt="" v-if="dataForm.frontUrl == ''">
										</el-upload>
									</div>
								</div>
							</div>
							<div class="mark_foot">
								<div class="foot_right">
									<div class="foot_button" @click="handleSave">Save</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- Passport end -->
				
				<!-- studentId 弹窗 -->			
				<div class="mark_popup_container" v-if="student_up == true">
					<div class="mark_cancel" v-if="student_up == true" @click.stop="changeUpdate">
						<img src="@/assets/images/cancel.png" alt="">
					</div>
					<div class="top_block">
						<div class="mark_top_head" >Update Your Verification</div>
						<div class="mark_top_tit">Please upload your Student ID</div>
						<div class="mark_border"></div>
						<div class="mark_content">
							<div class="mark_content_head">
								<div class="mark_head_tit">Your Student ID</div>
								<div class="mark_head_input">
									<div class="input_right">
										<input type="text" value="" v-model="dataForm.identification">
									</div>
								</div>
							</div>
							<div class="update_title">Student ID (JPG, PNG)</div>
							<div class="mark_content_update">
								<div class="update_block">
									<div class="update_block_tit">Front View</div>
									<div :class="dataForm.frontUrl == ''? 'udpate_btom_no':'udpate_btom'">
										<img  class="active1_img" v-if="dataForm.frontUrl" :src="HOST + dataForm.frontUrl" :alt="dataForm.frontUrl">
										<el-upload
											class="avatar-uploader"
											:action="HOST + '/img/upload'"
											:show-file-list="false"
											:on-success="res => {return handleAvatarSuccess(res,'front_url');}"
											:before-upload="beforeAvatarUpload">
											<img src="../../assets/images/update.png" alt="" v-if="dataForm.frontUrl == ''">
										</el-upload>
									</div>
								</div>
							</div>
							<div class="mark_foot">
								<div class="foot_right">
									<div class="foot_button" @click="handleSave">Save</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- studentID end -->
			</div>
			
			<div class="security_right">
				<!-- 修改密码 -->
				<div class="secure_block">
					<div class="secure_tit">Sign In Password Setting</div>
					<div class="secure_update">
						<div class="secure_top">
							<div class="update_left">
								<div class="update_circular"></div>
								<div class="update_circular"></div>
								<div class="update_circular"></div>
								<div class="update_circular"></div>
								<div class="update_circular"></div>
								<div class="update_circular"></div>
							</div>
							<div class="update_right">
								<div class="secure_button" @click="jump_password">Update</div>
							</div>
						</div>
						<!-- <div class="update_time">Last updated 02 February, 2021</div> -->
					</div>
				</div>
				<!-- 验证身份 -->
				<div class="secure_block2">
					<div class="secure_tit">Ways That We Can Verify That It’s You</div>
					<div class="secure_update">
						<div class="secure_top">
							<div class="update_left">
								<div class="update_left_tit">NRIC</div>
								<div class="update_time">Please upload your NRIC front and back for verification</div>
							</div>
							
							<!-- <div class="btom_right" v-if="detail!=null&&detail.type == 'nric' && detail.backUrl!=''&&detail.frontUrl!=''"> -->
							<div class="btom_right" v-if="nric_detail!=null&&nric_detail.type == 'nric'&&nric_detail.frontUrl!=''  && nric_detail.backUrl!='' && nric_detail.examine != 3">
							<!-- <div class="btom_right" v-if="nric_detail.type == 'nric' && nric_detail.examine != 3"> -->
								<img src="../../assets/images/yg.png" alt="">
							</div>
							<div class="update_right" v-else>
								<div class="secure_button" @click.stop="infoSave(1)">Update</div>
							</div>
						</div>
						<div class="secure_border"></div>
						<div class="secure_btom">
							<div class="btom_left">
								<div class="btom_left_tit">Passport</div>
								<div class="btom_left_time">Please upload your passport photo without signature page for verification</div>
							</div>
							<div class="btom_right" v-if="passport_detail!=null&&passport_detail.type == 'passport'&&passport_detail.frontUrl!='' && passport_detail.examine != 3">
							<!-- <div class="btom_right" v-if="passport_detail.type == 'passport'&&detail.type == 'passport'"> -->
							<!-- <div class="btom_right" v-if="passport_detail.type == 'passport' && passport_detail.examine != 3"> -->
								<img src="../../assets/images/yg.png" alt="">
							</div>
							<div class="update_right" v-else>
								<div class="secure_button" @click.stop="infoSave(2)">Update</div>
							</div>
						</div>
					</div>
				</div>
				<div class="secure_block3">
					<div class="secure_tit">Special Verification</div>
					<div class="secure_update">
						<div class="secure_top">
							<div class="update_left">
								<div class="update_left_tit">Student ID</div>
								<div class="update_time">Please upload your student ID for verifications.</div>
							</div>
							<!-- <div class="btom_right" v-if="detail!=null&&detail.type == 'student'&&detail.frontUrl!=''"> -->
							<div class="btom_right" v-if="student_detail!=null&&student_detail.type == 'student'&&student_detail.frontUrl!='' && student_detail.examine != 3">
							<!-- <div class="btom_right" v-if="student_detail.type == 'student' && student_detail.examine != 3"> -->
								<img src="../../assets/images/yg.png" alt="">
							</div>
							<div class="update_right" v-else>
								<div class="secure_button" @click.stop="infoSave(3)">Update</div>
							</div>
						</div>
					</div>
				</div>
			</div> 
		</div>
	</div>
</template>
<script>
	// import {infoSave,infoDetail} from '@/api/security';
	import {identificationSave,infoDetail} from '@/api/security';
	import {userInfo} from '@/api/user_info'
	import LeftView from '@/components/order/left.vue'
	export default {
		name: "index",
		inject:['reload'],
		components: {
			LeftView
		},
		data() {
			return {
				update_up:false, //NRIC 弹窗
				port_up:false, //Passport 弹窗
				student_up:false,//studentId弹窗
				dataForm:{
					type:'',
					backUrl:"",
					frontUrl:"",
					identification:""
				},
				detail:null,
				userInfo:'',
				nric_detail:{},
				passport_detail:{},
				student_detail:{}
			};
		},
		mounted() {
			// this.infoDetail();
			this.get_userInfo();
		},
		methods: {
			handleAvatarSuccess(res,attr) {
				this.$loading({
				customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						message: res.message,
						type: 'success'
					});
					if(attr === 'back_url'){
						this.dataForm.backUrl = res.data
					}else if(attr === 'front_url'){
						this.dataForm.frontUrl = res.data
					}
				}else{
					this.$message({
						message: res.message,
						type: 'error'
					});
				}
				
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type;
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.$loading({
				background: "rgba(255, 255, 255, 0.7)",
				customClass: "animated fadeIn",
				text: "Uploading"
				});
				return isJPG && isLt2M;
			},
			get_userInfo(){
				let params = {userId:sessionStorage.getItem("userId")}
				userInfo(params).then(res => {
					this.userInfo = res.data.Identification
					// console.log(this.userInfo)
					for(let a = 0;a < this.userInfo.length;a++){
						if(this.userInfo[a].type == 'nric'){
							this.nric_detail = this.userInfo[a]
							// console.log("nric")
							// console.log(this.nric_detail)
						}else if(this.userInfo[a].type == 'passport'){
							this.passport_detail = this.userInfo[a]
							// console.log("passport")
							// console.log(this.passport_detail)
						}else if(this.userInfo[a].type == 'student'){
							this.student_detail = this.userInfo[a]
							// console.log("student")
							// console.log(this.student_detail)
						}
					}
				})
			},
			// infoDetail(){
			// 	let userId = sessionStorage.getItem("userId")
			// 	infoDetail({userId}).then(res => {
					
			// 	})
			// },
			//打开对应身份弹窗
			infoSave(type){
				if(type == 1){
					this.dataForm.type = 'nric'
					this.update_up = true
				}else if(type == 2){
					this.dataForm.type = 'passport'
					this.port_up = true
				}else{
					this.dataForm.type = 'student'
					this.student_up = true
				}
			},
			//提交用户认证
			handleSave(){
				if(this.dataForm.identification == ''){
					this.$message({
						message: 'Please fill in verification number!',//证件号不能为空
						type: 'warning'
					});
					return false
				}
				if(this.dataForm.type === 'nric' ){
					if(this.dataForm.frontUrl == '' || this.dataForm.backUrl == ''){
						this.$message({
							message: 'Please upload front and back side！',//需上传证件的正反面
							type: 'warning'
						});
						return false
					}
				}
				if(this.dataForm.type === 'passport' && this.dataForm.frontUrl == '' ){
					if( this.dataForm.frontUrl == ''){
						this.$message({
							message: 'Please upload passport！',//需上传护照
							type: 'warning'
						});
						return false
					}
				}
				if(this.dataForm.type === 'student' && this.dataForm.frontUrl == '' ){
					if( this.dataForm.frontUrl == ''){
						this.$message({
							message: 'Please upload student ID！',//需上传学生证
							type: 'warning'
						});
						return false
					}
				}
				identificationSave(this.dataForm).then(res => {
					this.$message({
						message: 'Verified!',//认证成功 
						type: 'success'
					});
					this.infoDetail();
					this.reload()
				})
				this.update_up = false
				this.port_up = false
				this.student_up = false
				this.reload()
				this.dataForm.identification = ''
				this.dataForm.backUrl = ''
				this.dataForm.frontUrl = ''
				
			},
			//关闭弹窗，清楚数据
			changeUpdate(){
				this.update_up = false
				this.port_up = false
				this.student_up = false
				this.dataForm.identification = ''
				this.dataForm.backUrl = ''
				this.dataForm.frontUrl = ''
			},
			jump_password(){
				this.$router.push({path:'/security/replace_password'})
			}
		}
	};
</script>
<style lang="less" scoped>
	.container{
		margin-left: 61px;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;
		/* 换行 */
		padding-bottom: 30px;
		.mark_container{
			.mark_bac{
				width: 100%;
				height: 100vh;
				background:#000000b3;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 88;
			}
			.mark_popup_container{
				position: absolute;
				left: 26%;
				top: 80px;
				z-index: 999;
				// background-color: #1D2023;
				.mark_cancel{
					position: absolute;
					right: 40px;
					top: 30px;
					img{
						width: 26px;
						height: 26px;
						cursor: pointer;
					}
				}
				.top_block{
					padding: 50px 30px 50px 30px;
					// background: #0E0F11;
					// background-color: #2d2d2d;
					background-color: #1D2023;
					border-radius: 32px;
					overflow: hidden;
					.mark_top_head{
						font-size: 24px;
						color:#DBA83F ;
						font-family:'Quicksand-Bold';
						text-align: center;
						margin-bottom: 15px;
					}
					.mark_top_tit{
						color: #727272;
						font-family:'Roboto-Regular';
						font-size: 18px;
						text-align: center;
						margin-bottom: 20px;
					}
					.mark_border{
						width: 90%;
						height: 2px;
						// background-color:#2D2D2D;
						background-color: #1D2023;
						margin: 0 auto;
					}
					.mark_content{
						.mark_content_head{
							.mark_head_tit{
								color: #727272;
								font-size: 20px;
								font-family:'Roboto-Regular';
								margin: 49px 0 12px 0;
							}
							.mark_head_input{
								width: 627px;
								height: 59px;
								line-height: 59px;
								border: 2px solid #2D2D2D;
								border-radius: 19px;
								font-size: 20px;
								display: flex;
								align-items: center;
								.input_right{
									height: 59px;
									display: flex;
									align-items: center;
									padding-left: 20px;
									width: 80%;
									input{
										width: 100%;
										height: 54px;
										color: #fff;
										font-family:'Roboto-Regular';
										font-size: 18px;
										// background-color: #0E0F11;
										background-color: #1D2023;
										outline: none;
										border: none;
									}
								}
							}
						}
						.update_title{
							width: 90%;
							margin: 0 auto;
							color: #fff;
							font-size: 18px;
							font-family:'Roboto-Bold';
							margin-top: 40px;
							margin-bottom: 20px;
						}
						.mark_content_update{
							width: 90%;
							margin: 0 auto;
							// margin-top:80px;
							display: flex;
							justify-content: space-between;
							.update_block{
								width: 48%;
								.update_block_tit{
									color: #fff;
									font-family:'Roboto-Bold';
									font-size: 18px;
									margin-bottom: 20px;
								}
								.udpate_btom_no{
									width: 100%;
									padding: 35px 0;
									text-align: center;
									background-color: #000;
									border-radius: 12px;
									img{
										width: 40px;
									}
									p{
										color: #fff;
										width: 90%;
										margin-left: 5%;
										word-break: break-all;
									}
								}
								.udpate_btom{
									width: 100%;
									height: 180px;
									text-align: center;
									background-color: #000;
									border-radius: 12px;
									.active1_img{
										// width: 100%;
										width: 270px;
										height: 180px;
										object-fit: cover;
										border-radius: 12px;
									}
									img{
										width: 40px;
									}
								}
							}
						}
						.mark_foot{
							margin-top: 80px;
							margin-bottom: 20px;
							.foot_right{
								margin: 0 auto;
								width: 163px;
								height: 58px;
								color: #0E0F11;
								line-height: 58px;
								font-size: 20px;
								cursor: pointer;
								text-align: center;
								background: #DBA83F;
								border-radius: 25px;
							}
						}
					}
				}
			}
			
		}
		.security_right {
			// width: calc(73% - 0px);
			width: calc(100% - 370px);
			margin-top: 50px;
			margin-bottom: 20px;
			.secure_block{
				width: calc(100% - 153px);
				margin-bottom: 73px;
				.secure_tit {
					color: #FFFFFF;
					font-size: 22px;
					font-family:'Quicksand-Bold';
					margin-bottom: 22px;
				}
				.secure_update {
					background: #0E0F11;
					border-radius: 45px;
					padding: 56px 55px 20px 66px;
					display:flex;
					flex-direction: column;
					justify-content: center;
					.secure_top{
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 22px;
						.update_left {
							display: flex;
							.update_circular{
								width: 12px;
								height: 12px;
								background: #D3AA53;
								border-radius: 50%;
								margin-right: 15px;
							}
						}
						.update_right {
							display: flex;
							justify-content: center;
							.secure_button{
								width: 163px;
								height: 58px;
								font-family:'Roboto-Regular';
								cursor: pointer;
								line-height: 58px;
								text-align: center;
								color: #0E0F11;
								font-size: 20px;
								background: #D3AA53;
								border-radius: 25px;
							}
						}
					}
					.update_time {
						color: #727272;
						font-size: 20px;
						font-family:'Roboto-Medium';
						text-align: right;
					}
				}
				
			}
			.secure_block2{
				width: calc(100% - 153px);
				margin-bottom: 73px;
				.secure_tit {
					color: #FFFFFF;
					font-size: 22px;
					font-family:'Quicksand-Bold';
					margin-bottom: 22px;
				}
				.secure_update {
					background: #0E0F11;
					border-radius: 45px;
					padding: 56px 55px 20px 55px;
					display:flex;
					flex-direction: column;
					justify-content: center;
					.secure_top{
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 22px;
						.update_left {
							.update_left_tit{
								color: #FFFFFF;
								font-family:'Roboto-Bold';
								font-size: 20px;
								margin-bottom: 5px;
							}
							.update_time {
								color: #727272;
								font-size: 20px;
								font-family:'Roboto-Regular';
							}
						}
						.btom_right{
							img{
								width: 27px;
								height: 27px;
							}
						}
						.update_right {
							display: flex;
							justify-content: center;
							.secure_button{
								width: 163px;
								height: 58px;
								font-family:'Roboto-Regular';
								line-height: 58px;
								cursor: pointer;
								text-align: center;
								color: #0E0F11;
								font-size: 20px;
								background: #D3AA53;
								border-radius: 25px;
							}
						}
					}
					.secure_border{
						width: 100%;
						height:  2px;
						background-color: #2D2D2D;
					}
					.secure_btom{
						display: flex;
						margin: 43px 0 10px 0;
						justify-content: space-between;
						.btom_left{
							.btom_left_tit{
								color: #FFFFFF;
								font-size: 20px;
								font-family:'Roboto-Bold';
								margin-bottom: 5px;
							}
							.btom_left_time {
								color: #727272;
								font-size: 20px;
								font-family:'Roboto-Regular';
							}
						}
						.btom_right{
							img{
								width: 27px;
								height: 27px;
							}
						}
						.secure_button{
								width: 163px;
								height: 58px;
								font-family:'Roboto-Regular';
								cursor: pointer;
								line-height: 58px;
								text-align: center;
								color: #0E0F11;
								font-size: 20px;
								background: #D3AA53;
								border-radius: 25px;
							}
					}
				}
				
			}
			.secure_block3{
				width: calc(100% - 153px);
				.secure_tit {
					color: #FFFFFF;
					font-size: 22px;
					font-family:'Quicksand-Bold';
					margin-bottom: 22px;
				}
				.secure_update {
					background: #0E0F11;
					border-radius: 45px;
					padding: 56px 55px 60px 66px;
					display:flex;
					flex-direction: column;
					justify-content: center;
					.secure_top{
						display: flex;
						align-items: center;
						justify-content: space-between;
						.update_left {
							.update_left_tit{
								color: #FFFFFF;
								font-family:'Roboto-Bold';
								font-size: 20px;
								margin-bottom: 5px;
							}
							.update_time {
								color: #727272;
								font-size: 20px;
								font-family:'Roboto-Regular';
							}
						}
						.btom_right{
							img{
								width: 27px;
								height: 27px;
							}
						}
						.update_right {
							display: flex;
							justify-content: center;
							.secure_button{
								width: 163px;
								font-family:'Roboto-Regular';
								height: 58px;
								cursor: pointer;
								line-height: 58px;
								text-align: center;
								color: #0E0F11;
								font-size: 20px;
								background: #D3AA53;
								border-radius: 25px;
							}
						}
					}
					
				}
				
			}

		}
	}
</style>
