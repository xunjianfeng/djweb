<template>
	<div class="index">
		<div class="container">
			<div class="create_right">
				<div class="create_right_top">
					<div class="create_right_title">
						<div class="create_title">{{team_title}}</div>
					</div>
				</div>
				<div class="create_right_form">
					<div class="create_form_logo">
						<div class="logo_upadte">
							<img v-if="game_form.teamLogo" :src="HOST + game_form.teamLogo"  class="avatar_y">
							<img class="avatar_w" src="../../assets/images/update2.png" alt="" v-else @click="uploadPicture('flagImg')">
							<div class="cropper_img" v-if="cropper_status == true">
								<div class="mark_check" @click.stop="cropper_status = false">
									<img src="@/assets/images/cancel.png">
								</div>
								<div class="mark_bac"></div>
								<div class="cropper_img_content">
									<CropperImg :Name="cropperName" @uploadImgSuccess="handleUploadSuccess" ref="child">
									</CropperImg>
								</div>
							</div>
							<!-- <el-upload
								class="avatar-uploader"
								:action="HOST+'img/upload'"
								:show-file-list="false"
								:on-success="res => {return handleAvatarSuccess(res,'game_logo', 0);}"
								:before-upload="beforeAvatarUpload">
								
							</el-upload> -->
						</div>
						<div class="logo_info">Upload team logo ( 1:1 )</div>
					</div>
					<div class="form_user">
						<p class="form_username">Game</p>
						<div class="form_input_block">
							<el-image :src="HOST +  game_avatar" class="user_logo">
								<div slot="error" class="image-slot"> 
									<img src="../../assets/images/default_game.png" class="user_logo"/>
								</div>
							</el-image>
							<!-- <img class="user_logo" :src="HOST + game_avatar" v-if="game_avatar"> -->
							<!-- <img class="user_logo" src="../../assets/images/default_game.png" v-else /> -->
							<el-select class="user_name" :popper-append-to-body="false" placeholder="Please select a game" v-model="game_form.gameId"  @change="selectChanged">
								<el-option v-for="item in game_list" :key="item.gameId" :label="item.gameName" :value="item.gameId">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="form_team">
						<p class="form_teamname">Team Name</p>
						<div class="form_input_block">
							<input type="text" class="input-left" v-model="game_form.teamName" @input="team_name" maxlength="30"/>
							<div class="limit_num">({{name_num}}/30)</div>
						</div>
					</div>
					<div class="form_team">
						<p class="form_teamname">Team Slogan</p>
						<div class="team_input_block">
							<input type="text" class="input-left" v-model="game_form.teamSlogan" @input="team_slogan" maxlength="300" />
							<div class="limit_num">({{num}}/300)</div>
						</div>
					</div>
					<div class="form_team">
						<p class="form_teamname">About Team</p>
						<div class="area_input_block">
							<textarea rows="12" class="input-left" v-on:keyup="team_content" v-model="game_form.aboutTeam" maxlength="1000"></textarea>
							<div class="limit_num">({{text_num}}/1000)</div>
						</div>
					</div>
					<!-- 创建/取消 -->
					<div class="creat_team_btom"> 
						<div class="invite_button" @click="add_team">{{team_title == 'team_title' ?'Create':'Save'}} </div>
						<div class="skip_button" @click="jump_team">Cancel</div>
					</div>
				</div>
			</div><!-- create_right -->
		</div>
	</div>
</template>

<script>
	import {addTeam,gameList,teamAchievement} from '@/api/team';
	import CropperImg from '@/components/CropperImg/index.vue'
	export default {
		name: "create_team_04",
		components: {
			CropperImg
		},
		data() {
			return {
				slogan: '',
				starea: '',
				num: 0, //简介数
				text_num: 0, //公告数
				name_num:0,//战队名称数
				game_form:{
					teamId:'',
					teamName:'',
					teamLogo:'',
					teamSlogan:'',
					aboutTeam:'',
					gameId:'',
					announcement:'',
				},
				game_list:'',//游戏列表
				game_avatar:'',
				team_title:'Create Team',
				cropper_status: false,//剪裁上传的图片弹窗
				formValidate: {
					mainImage: '',
				},
				ruleValidate: {
					mainImage: [{
						required: true,
						message: 'Please upload cover image',//请上传封面
						trigger: 'blur'
					}],
				},
				//裁切图片参数
				cropperName: '',
				imgName: '',
			}
		},
		mounted() {
			if(this.$route.query.teamId != '' && this.$route.query.teamId != undefined && this.$route.query.teamId != null){
				this.game_form.teamId = this.$route.query.teamId
				this.team_title = 'Edit Team'
				this.get_team();
			}else{
				this.team_title = 'Create Team'
			}
			this.get_game();
		},
		methods: {
			//封面设置
			uploadPicture(name) {
				this.cropperName = name;
				this.cropper_status = true;
			},
			//图片上传成功后
			handleUploadSuccess(data) {
				// console.log(data)
				switch (data.name) {
					case 'flagImg':
						this.game_form.teamLogo = data.url
						// console.log(this.game_form.teamLogo)
						// this.formValidate.mainImage = 'http://ydfblog.cn/dfs/' + data.url;
						// console.log('最终输出' + data.name)
						break;
				}
				this.cropper_status = false;
			},
			// 战队详细信息
			get_team(){
				let that = this;
				let params = {
					teamId:this.$route.query.teamId
				}
				teamAchievement(params).then(res => {
					let {teamId,teamName,teamLogo,teamSlogan,aboutTeam,gameId,announcement} = res.data
					that.game_form = {
						teamId,
						teamName,
						teamLogo,
						teamSlogan,
						aboutTeam,
						gameId,
						announcement,
					}
					that.num = that.game_form.teamSlogan.length
					that.text_num = that.game_form.aboutTeam.length
					that.name_num = that.game_form.teamName.length
				})
			},
			// 游戏列表
			get_game() {
				gameList({size:0}).then(res => {
					const {
						list,total
					} = res.data
					this.game_list = list;
				})
			},
			selectChanged(value) {
				for (let i = 0; i < this.game_list.length; i++) {
					if(this.game_list[i].gameId == value){
						this.game_avatar = this.game_list[i].gameLogo
					}
				}
			},
			// 添加战队
			add_team(){
				let that  = this;
				let { teamName ,teamLogo ,teamSlogan ,aboutTeam , announcement, gameId} = that.game_form;
				if(teamName == '' || teamLogo == '' || teamSlogan == '' ||aboutTeam == '' || gameId == '' ){
					that.$message({
						message: 'Please complete all information!',
						type: 'warning'
					})
					return false
				} else {
					addTeam(that.game_form).then(res => {
						that.$message({
							message: res.message,
							type: 'success'
						})
						sessionStorage.setItem("teamId", res.data)
						if(this.team_title != 'Edit Team'){
							that.$router.push({path: '/tearm/create_team', query:{teamId:res.data}})
						}else{
							that.$router.go(-1);
						}
					})
				}
			},
			// 上传成功
			handleAvatarSuccess(res,attr,index) {
				this.$loading({
				customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						message: res.message,
						type: 'success'
					});
					if(attr === 'game_logo'){
						this.game_form.teamLogo = res.data
					}
				}else{
					this.$message({
						message: res.message,
						type: 'error'
					});
				}
				
			},
			// 上传前
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
			team_content() {
				let self = this;
				this.text_num = this.game_form.aboutTeam.length
			},
			team_slogan() {
				this.num = this.game_form.teamSlogan.length
			},
			team_name() {
				this.name_num = this.game_form.teamName.length
			},
			// 取消
			jump_team() {
				if(this.team_title != 'Edit Team'){
					this.$router.push({path: '/tearm/my_join_team'})
				}else{
					this.$router.go(-1);
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	/deep/ .el-select .el-input .el-input__inner {
		border: 0px;
		// width: 230px;
		height: 50px;
		color: #fff;
		font-family:'Roboto-Regular';
		// border-radius: 20px;
		background-color: #0E0F11;
		// background-color: #ff0;
		border: 1px solid #0E0F11;
	}
	
	/deep/ .el-select-dropdown {
		background-color: #0E0F11;
		border: 1px solid rgba(255,255,255,0.2);
	}
	
	/deep/ .el-icon-arrow-up:before {
		content: "";
	}
	
	/deep/ .el-icon-arrow-down:before {
		content: "";
	}
	//修改单个的选项的样式
	/deep/ .el-select-dropdown__item {
		background-color: transparent;
		color: #fff;
		font-family:'Roboto-Regular';
		// text-align: center;
	}
	/deep/ .el-select-dropdown__item.hover{
		background-color: #1D2023;
	}
	/deep/ .el-select-dropdown__item.selected{
		background-color: #1D2023;
	}
</style>
<style lang="less" scoped>
	.container {
		width: calc(100% - 150px);
		margin-left: 53px;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;

		/* 换行 */
		.create_right {
			width: 100%;

			.create_right_top {
				margin-top: 81px;

				.create_right_title {
					width: 1200px;
					padding-bottom: 52px;
					border-bottom: 1px solid #2D2D2D;

					.create_title {
						color: #FFFFFF;
						font-size: 24px;
						font-family:'Quicksand-Bold';
						margin-left: 60px;
					}
				}
			}

			.create_right_form {
				width: 1140px;
				margin-left: 60px;
				margin-top: 43px;

				.create_form_logo {
					display: flex;
					align-items: center;
					margin-bottom: 31px;

					.logo_upadte {
						width: 146px;
						height: 146px;
						border-radius: 50%;
						background-color: #0E0F11;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 18px;

						.avatar_w{
							width: 31px;
							height: auto;
						}
						.avatar_y{
							width: 146px;
							height: 146px;
							border-radius: 50%;
						}
						.cropper_img {
							// width: 500px;
							// height: 500px;
							position: absolute;
							z-index: 99;
							top: 20px;
							left: 20%;
							.mark_check {
								position: fixed;
								right: 80px;
								top: 140px;
								img {
									width: 46px;
									height: 46px;
									cursor: pointer;
								}
								z-index: 999;
							}
							.mark_bac {
								width: 100%;
								height: 100vh;
								background: #000000b3;
								position: fixed;
								left: 0;
								top: 0;
								z-index: 88;
							}
							.cropper_img_content {
								padding: 80px;
								border-radius: 20px;
								background-color: #0E0F11;
								position: absolute;
								z-index: 9999;
							}
						}
					}

					.logo_info {
						color: #727272;
						font-family:'Roboto-Regular';
						font-size: 20px;
					}
				}

				.form_user {
					width: 90%;
					margin-bottom: 39px;

					.form_username {
						color: #727272;
						font-family:'Roboto-Regular';
						font-size: 20px;
						margin: 10px 0 10px 0;
						
					}
					
					.form_input_block {
						width: 98%;
						height: 59px;
						display: flex;
						padding: 0 30px;
						background-color: #0E0F11;
						align-items: center;
						border-radius: 19px;
						color: #fff;

						.user_logo {
							width: 44px;
							height: 45px;
							object-fit: cover;
							margin-right: 33px;
						}

						.user_name {
							width: 100%;
							/deep/ .el-icon-arrow-up:before {
							    content: "";
							}
							/deep/ .el-input .el-input__inner {
								// width: 151px;
								width: 100%;
								height: 55px;
								color: #fff;
								background-color: #0e0f11;
								border: none;
								font-size: 18px;
							}
							/deep/ .el-input--suffix {
								input::-webkit-input-placeholder{
									color: #727272;
								}
							}
						}
					}
				}

				.form_team {
					width: 90%;
					margin-bottom: 39px;

					.form_teamname {
						color: #727272;
						font-family:'Roboto-Regular';
						font-size: 20px;
						margin: 10px 0 10px 0;
					}

					.form_input_block {
						width: 98%;
						height: 59px;
						display: flex;
						padding: 0 30px;
						background-color: #0E0F11;
						align-items: center;
						border-radius: 19px;
						position: relative;
						color: #fff;

						.input-left {
							width: 90%;
							height: 56px;
							color: #fff;
							border: none;
							font-family:'Roboto-Regular';
							background-color: #0e0f11;
							background: inherit;
							font-size: 20px;
						}
						.limit_num {
							position: absolute;
							right: 30px;
							color: #606060;
							font-family:'Roboto-Regular';
							font-size: 20px;
						}
					}

					.team_input_block {
						width: 98%;
						height: 59px;
						display: flex;
						padding: 0 30px;
						background-color: #0E0F11;
						align-items: center;
						border-radius: 19px;
						position: relative;
						color: #fff;

						.input-left {
							width: 90%;
							height: 56px;
							color: #fff;
							border: none;
							font-family:'Roboto-Regular';
							background-color: #0e0f11;
							background: inherit;
							font-size: 20px;
						}

						.limit_num {
							position: absolute;
							right: 30px;
							color: #606060;
							font-family:'Roboto-Regular';
							font-size: 20px;
						}
					}

					.area_input_block {
						width: 98%;
						display: flex;
						padding: 20px 30px;
						background-color: #0E0F11;
						align-items: center;
						border-radius: 19px;
						position: relative;
						color: #fff;

						.input-left {
							width: 90%;
							color: #fff;
							font-family:'Roboto-Regular';
							height: 207px;
							border: none;
							background-color: #0e0f11;
							background: inherit;
							font-size: 20px;
							resize: none;
						}

						.limit_num {
							position: absolute;
							right: 30px;
							bottom: 20px;
							color: #606060;
							font-size: 20px;
							font-family:'Roboto-Regular';
						}
					}
				}

				.creat_team_btom {
					margin-top: 179px;
					margin: 90px 0 97px 0;
					display: flex;
					align-items: center;

					.invite_button {
						width: 163px;
						height: 58px;
						color: #0E0F11;
						font-size: 20px;
						cursor: pointer;
						line-height: 58px;
						text-align: center;
						margin-right: 20px;
						background: #D3AA53;
						font-family:'Roboto-Regular';
						border-radius: 25px;
					}

					.skip_button {
						width: 163px;
						height: 56px;
						color: #FFFFFF;
						font-size: 20px;
						cursor: pointer;
						line-height: 58px;
						text-align: center;
						border-radius: 25px;
						font-family:'Roboto-Regular';
						border: 1px solid #777777;
					}
				}
			}
		}
	}
</style>
