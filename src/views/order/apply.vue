<template>
	<div class="index">
		<div class="container">
			<LeftView :index="1"></LeftView>
			<!-- 多个配置时显示  配置选择弹窗 -->
			<div class="mark_check" v-if="profile_status == true" @click.stop="profile_status = false">
				<img src="@/assets/images/cancel.png" >
			</div>
			<div class="mark_bac" v-if="profile_status == true"></div>
			<div class="mark_check_container" v-if="profile_status == true">
				<div class="mark_my_in ">
					<div class="mark_text_one">Please select game profile</div>
					<div class="mark_product_container">
						<div class="mark_product">
							<div :class="profile_index === sdex ?'product_two product_border':'product_two'" v-for="(stem,sdex) in profile_info" :key='sdex' @click="selct_profile(sdex)">
								<div class="product_img">
									<el-image :src="HOST + stem.gameLogo" class="game_img">
										<div slot="error" class="image-slot"> 
											<img src="../../assets/images/default_game.png" class="game_img"/>
										</div>
									</el-image>
									<!-- <img :src="HOST + stem.gameLogo" alt="" v-if="stem.gameLogo"> -->
									<!-- <img src="../../assets/images/default_game.png" v-else /> -->
								</div>
								<div class="product_product">
									<div class="product_title">{{stem.gameName}}</div>
									<div class="product_subtitle" style="margin-bottom: 10px;">ID:{{stem.igid}}</div>
									<div class="product_subtitle">Character:{{stem.role}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mark_my_foot">
					<div class="mark_foot_button" @click="popup_close">save</div>
				</div>
			</div>
			<!-- end -->
			<!-- 无设置游戏配置、提示完善或者输入 -->
			<div class="htips_check" v-if="tips_status == true" @click.stop="tips_status = false">
				<img src="@/assets/images/cancel.png" >
			</div>
			<div class="htips_bac" v-if="tips_status == true"></div>
			<div class="htips_check_container" v-if="tips_status == true">
				<div class="htips_my_in ">
					You yet to complete your game profile, you can either go and complete your game profile first or continue with applying the companion by key in all information here.
				</div>
				<div class="htips_my_foot">
					<div class="htips_foot_button" @click="get_tips(1)">Go to game profile</div>
					<div class="htips_foot_button" @click="get_tips(2)">Continue here</div>
				</div>
			</div>
			<!-- end -->
			<div class="content_right">
				<div class="content_right_nav">
					<div class="nav_left" @click="jump_companiion"> << Please key in your Companion information</div> 
					<div class="nav_right">
						<p class="submit" @click="submit">Submit</p>
						<p class="cancel" @click="jump_companiion">Cancel</p>
					</div>
				</div>
				<div class="content_right_form">
					<div class="content_top">
						<p class="tit_1">Copy from game profile</p>
						<p class="tit_2" @click="open_popup">Copy</p>
					</div>
					<div class="right_form_div">
						<div class="right_form_info">
							<div class="game">
								<div class="tit_name">Game<span>*</span></div>
								<div class="game_type">
									<el-image :src="HOST + game_logo" class="game_img">
										<div slot="error" class="image-slot"> 
											<img src="../../assets/images/default_game.png" class="game_img"/>
										</div>
									</el-image>
									<!-- <img v-if="game_logo != ''" :src="HOST+game_logo" alt=""> -->
									<el-select :popper-append-to-body="false"  class="user_name" v-model="dataForm.gameId"  @change="selectChanged" style="width: 95%;">
										<el-option v-for="(item,index) in game_list" :key="index" :label="item.gameName" :value="item.gameId"></el-option>
									</el-select>
								</div>
								<!-- <div class="game_type">
									<select v-model="dataForm.gameId" placeholder='Please choose game type'>
										<option v-for="(item,index) in game_list" :value="item.gameId" :key="index">{{item.gameName}}</option>
									</select>
									<img class="dropdown" src="../../assets/images/dropdown.png" />
								</div> -->
							</div>
							<div class="game_id">
								<div class="tit_name">In Game ID<span>*</span></div>
								<div class="select_id">
									<input type="text" v-model="dataForm.inGameId" placeholder="Your in game ID">
								</div>
							</div>
							<div class="game_id">
								<div class="tit_name">In Game Name<span>*</span></div>
								<div class="select_id">
									<input type="text" v-model="dataForm.gameNickname" placeholder="Your in Game Name">
								</div>
							</div>
							<div class="block_3">
								<div class="game_char">
									<div class="tit_name">Game Character<span>*</span></div>
									<div class="select_char">
										<input type="text" v-model="dataForm.role" placeholder="Please key in your game character">
									</div>
								</div>
								<div class="strength">
									<div class="tit_name">Your Strength<span>*</span></div>
									<div class="select_strength">
										<input type="text" v-model="dataForm.strength" placeholder="Your strength">
									</div>
								</div>
							</div>
							<div class="upload">
								<div class="tit_name">Your Sound (in mp3 format)
								<!-- <span>*</span> -->
								</div>
								<div class="hundred_block">
									<div class="hund_left">
										<input type="text" class="input" placeholder="Please upload your sound (in mp3 format)" disabled v-model="dataForm.soundUrl">
									</div>
									<div class="hund_right">
										<el-upload class="upload-demo" 
										:action="HOST+'img/upload'"
										 accept=".MP3" 
										:show-file-list="false" 
										:on-success="res => {return handleAvatarSuccess(res,'soundUrl', 0);}"
										:before-upload="beforeAvatarUpload">
											<!-- <el-button size="small" type="primary">点击上传</el-button> -->
											<img class="hund_san" src="@/assets/images/update.png" alt="">
										</el-upload>
									</div>
								</div>
							</div><!-- upload -->
							<div class="introdution">
								<div class="tit_name">In Game Introdution (Short briefing why people want to engage you)</div>
								<textarea name="" id="" cols="30" rows="10" v-model="dataForm.introduction" placeholder="In Game Introduction (Short briefing why people want to engage you)"></textarea>
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
		profileUser
	} from '@/api/center'
	import LeftView from '@/components/order/left.vue'
	import {
		companionApply,
		gameList
	} from '@/api/order'
	export default {
		name: "apply",
		components: {
			LeftView
		},
		data() {
			return {
				dataForm: {
					companionId: sessionStorage.getItem("userId"),
					gameId: '',
					gameNickname: '',
					inGameId:'',
					soundUrl: '',
					introduction: '',
					strength: '',
					role: '',
				},
				game_list: [],
				profile_status:false,
				profile_info: [], //游戏配置
				profile_index:'', //配置下标
				game_logo:'',
				tips_status:false,
			}
		},
		mounted() {
			this.getgameList()
			this.get_profile();
		},
		methods: {
			// 选择配置
			selct_profile(index){
				let that = this;
				that.profile_index = index
			},
			popup_close(){
				let that = this;
				if(that.profile_index === ''){
					 this.$message({
					  message: 'Please choose a game',//请选择游戏配置
					  type: 'warning'
					});
					return false
				}
				that.dataForm.gameId =  that.profile_info[that.profile_index].gameId
				that.dataForm.inGameId =  that.profile_info[that.profile_index].igid
				that.dataForm.role =  that.profile_info[that.profile_index].role
				// 根据游戏id显示对应logo
				for (let i = 0; i < that.game_list.length; i++) {
					if (that.game_list[i].gameId == that.profile_info[that.profile_index].gameId) {
						that.game_logo = that.game_list[i].gameLogo
					}
				}
				that.profile_status = false
			},
			// 游戏配置有多个显示弹窗，1个直接复制信息
			open_popup(){
				let that = this;
				if(that.profile_info.length > 1){
					that.profile_status = true
				}else{
					// 当配置为空，提示去设置配置或者继续手动输入
					if(that.profile_info == ''){
						that.tips_status = true
					}else{
						that.dataForm.gameId =  that.profile_info[0].gameId
						that.dataForm.inGameId =  that.profile_info[0].igid
						that.dataForm.role =  that.profile_info[0].role
						// 根据游戏id显示对应logo
						for (let i = 0; i < that.game_list.length; i++) {
							if (that.game_list[i].gameId == that.profile_info[0].gameId) {
								that.game_logo = that.game_list[i].gameLogo
							}
						}
					}
				}
			},
			// 获取用户游戏配置
			get_profile() {
				let that = this;
				profileUser({}).then(res => {
					that.profile_info = res.data
				})
			},
			// 游戏列表
			getgameList() {
				gameList({size:0}).then(res => {
					const {
						list
					} = res.data
					this.game_list = list;
				})
			},
			// 选择游戏
			selectChanged(value) {
				let that = this;
				for (let i = 0; i < that.game_list.length; i++) {
					if (that.game_list[i].gameId == value) {
						that.game_logo = that.game_list[i].gameLogo
					}
				}
			},
			// 提交
			submit() {
				let that = this,
				{ gameId, gameNickname ,role ,strength,soundUrl , inGameId} = this.dataForm;
				if(gameId == ''  || role == '' || strength == '' || inGameId == ''  ){
					that.$message({
						message: 'Please complete all required information!',
						type: 'warning'
					})
					return false
				}
				let params = this.dataForm
				companionApply(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					setTimeout(() => {
						that.$router.push({
							path: '/center/companion'
						})
					}, 500)
				})
			},
			get_tips(type){
				// 1 跳转设置游戏配置  2关闭弹窗
				if(type == 1){
					this.$router.push({path: '/center/update_data'})
				}else{
					this.tips_status = false
				}
			},
			jump_companiion() {
				this.$router.push({
					path: '/center/companion'
				})
			},
			handleAvatarSuccess(res, attr, index) {
				console.log(index)
				this.$loading({
					customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						message: res.message,
						type: 'success'
					});
					if (attr === 'soundUrl') {
						this.dataForm.soundUrl = res.data
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
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 90%;
		margin-left: 61px;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;
		/* 换行 */
		padding-bottom: 30px;
		// 提示配置弹窗
		.htips_check{
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
		.htips_bac{
			width: 100%;
			height: 100vh;
			background:#000000b3;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 88;
		}
		.htips_check_container{
			position: absolute;
			left: 460px;
			top: 300px;
			z-index: 999;
			width: 700px;
			padding: 25px 20px 31px 28px;
			background: #0E0F11;
			border-radius: 27px;
			overflow: hidden;
			display: flex;
			flex-flow: column;
			align-items: center;
			.htips_my_in{
				width: 100%;
				color: #fff;
				line-height: 30px;
				font-size: 19px;
				font-family:'Roboto-Bold';
			}
			.htips_my_foot{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20px;
				.htips_foot_button{
					width: 45%;
					height: 50px;
					color: #0E0F11;
					font-size: 20px;
					display: flex;
					background: #DBA83F;
					border-radius: 9px;
					align-items: center;
					cursor: pointer;
					justify-content: center;
					font-family:'Roboto-Regular';
				}
			}
		}
		// end
		// 多游戏配置弹窗
		.mark_check{
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
		.mark_check_container{
			position: absolute;
			left: 357px;
			top: 0px;
			z-index: 999;
			width: 753px;
			padding: 25px 20px 31px 28px;
			background: #0E0F11;
			border-radius: 27px;
			overflow: hidden;
			display: flex;
			flex-flow: column;
			align-items: center;
			.mark_my_in{
				width: 100%;				
				.mark_text_one{
					color: #DBA83F;
					font-size: 22px;
					text-align: center;
					margin-bottom: 25px;
					font-family:'Quicksand-Bold';
				}
				.mark_product_container{
					width: 100%;
					max-height: 400px;
					overflow-y: scroll;
					margin-bottom: 28px;
					.mark_product{
						width: 98%;
						border-radius: 22px;
						.product_two{
							height: 120px;
							padding: 0 20px;
							display: flex;
							align-items: center;
							border: 1px solid #313538;
							margin-bottom: 15px;
							.product_img{
								width:90px;
								height: 90px;
								border-radius: 13px;
								overflow: hidden;
								margin-right: 46px;
								.game_img{
									width: 90px;
									height: 90px;
									object-fit: cover;
								}
							}
							.product_product{
								.product_title{
									color: #FFFFFF;
									font-size: 20px;
									font-family:'Roboto-Bold';
									margin-bottom: 15px;
								}
								.product_subtitle{
									color: #727272;
									font-size: 18px;
									font-family:'Roboto-Regular';
								}
							}
						}
						.product_border{
							border: 1px solid #dba83f;
						}
					}
					&::-webkit-scrollbar {
						/*滚动条整体样式*/
						width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
						height: 1px;
					}
					&::-webkit-scrollbar-thumb {
					/*滚动条里面小方块*/
					border-radius: 10px;
					box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
					background   : #2B2B2B;
					}
					&::-webkit-scrollbar-track {
					/*滚动条里面轨道*/
					box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
					border-radius: 10px;
					background   : #000000;
					}
				}
			}
			.mark_my_foot{
				width: 100%;
				.mark_foot_button{
					width: 100%;
					height: 69px;
					color: #0E0F11;
					font-size: 22px;
					display: flex;
					background: #DBA83F;
					border-radius: 9px;
					align-items: center;
					cursor: pointer;
					justify-content: center;
					font-family:'Roboto-Regular';
				}
			}
		}
		// end
		.content_right {
			width: calc(100% - 370px);
			.content_right_nav {
				// margin-top: 100px;
				margin-top: 50px;
				width: calc(100% - 60px);
				margin-bottom: 20px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.nav_left {
					font-size: 20px;
					color: #fff;
					font-family:'Quicksand-Bold';
					cursor: pointer;
					font-weight: 500;
				}
				.nav_right {
					display: flex;
					text-align: center;

					.submit {
						width: 120px;
						height: 50px;
						line-height: 50px;
						background-color: #D3AA53;
						border-radius: 25px;
						text-align: center;
						color: #000;
						cursor: pointer;
						font-size: 18px;
						font-family:'Roboto-Regular';
					}
					.cancel {
						cursor: pointer;
						width: 120px;
						height: 50px;
						line-height: 50px;
						border: 1px solid #777777;
						border-radius: 25px;
						text-align: center;
						color: #fff;
						font-size: 18px;
						margin-left: 15px;
						font-family:'Roboto-Regular';
					}
				}
			}
			.content_right_form {
				width: calc(100%-60px);
				.content_top {
					width: 100%;
					height: 64px;
					color: #727272;
					background-color: #0E0F11;
					border-radius: 32px;
					font-size: 20px;
					display: flex;
					font-family:'Roboto-Regular';
					align-items: center;
					.tit_1 {
						margin-left: 40px;
					}
					.tit_2 {
						cursor: pointer;
						color: #D3AA53;
						margin-left: 40px;
						font-family:'Roboto-Bold';
					}
				}
				.right_form_div {
					width: 100%;
					.right_form_info {
						width: calc(100%-100px);
						background-color: #0E0F11;
						border-radius: 50px;
						margin-top: 20px;
						padding-bottom: 50px;
						width: 100%;
						.game {
							width: 100%;
							padding-top: 50px;
							margin-left: 40px;
							.tit_name {
								color: #727272;
								font-size: 18px;
								font-family:'Roboto-Regular';
								span {
									color: red;
								}
							}
							.game_type {
								width: 88%;
								height: 50px;
								display: flex;
								align-items: center;
								padding-left: 20px;
								margin-top: 10px;
								background-color: #0E0F11;
								border: 2px solid #2D2D2D;
								border-radius: 19px;
								color: #727272;
								font-family:'Roboto-Regular';
								font-size: 18px;
								.game_img {
									width: 35px;
									height: 35px;
									object-fit: cover;
								}
								.user_name {
									// /deep/ .el-input__inner{
									// 	background-color:#0e0f11 ;
									// 	border: none;
									// 	font-family:'Roboto-Regular';
									// 	color: #FFFFFF;
									// 	font-size: 18px;
									// }
									// /deep/ .el-icon-arrow-up:before {
									// 	content: "\e78f";
									// }
									
									// /deep/ .el-icon-arrow-down:before {
									// 	content: "\e790";
									// }
									// /deep/ .el-select .el-input .el-input__inner {
									// 	border: 0px;
									// 	width: 151px;
									// 	height: 55px;
									// 	color: #727272;
									// 	background-color: #33384B;
									// 	border:0px solid #ffffff;
									// }
									// /deep/.el-input--suffix .el-input__inner{
									// 	height:45px;
									// } 
									/deep/.el-input .el-input__inner {
										border: 0px;
										// width: 230px;
										height: 50px;
										color: #fff;
										font-family:'Roboto-Regular';
										// border-radius: 20px;
										background-color: #0E0F11;
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
								}
							}
						}
						.game_id {
							width: 100%;
							padding-top: 35px;
							margin-left: 40px;

							.tit_name {
								color: #727272;
								font-size: 18px;
								font-family:'Roboto-Regular';
								span {
									color: red;
								}
							}

							.select_id {
								width: 100%;
								display: flex;
								align-items: center;
								margin-top: 10px;

								input {
									width: 88%;
									height: 50px;
									display: flex;
									padding-left: 20px;
									align-items: center;
									background-color: #0E0F11;
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									font-family:'Roboto-Regular';
									color: #FFFFFF;
									font-size: 18px;
								}
							}
						}

						.block_3 {
							width: 95%;
							padding-top: 35px;
							margin-left: 40px;
							display: flex;
							justify-content: space-between;

							.game_char {
								width: 45%;

								.tit_name {
									color: #727272;
									font-size: 18px;
									font-family:'Roboto-Regular';
									span {
										color: red;
									}
								}

								.select_char {
									width: 100%;
									display: flex;
									align-items: center;
									margin-top: 10px;
									input {
										width: 88%;
										height: 50px;
										display: flex;
										padding-left: 20px;
										align-items: center;
										background-color: #0E0F11;
										border: 2px solid #2D2D2D;
										border-radius: 19px;
										font-family:'Roboto-Regular';
										color: #FFFFFF;
										font-size: 18px;
									}

									select {
										width: 100%;
										height: 50px;
										display: flex;
										padding-left: 20px;
										align-items: center;
										background-color: #0E0F11;
										border: 2px solid #2D2D2D;
										border-radius: 19px;
										color: #727272;
										font-size: 18px;
										justify-content: space-between;
										/*取消默认箭头开始*/
										appearance: none;
										-moz-appearance: none;
										-webkit-appearance: none;
										/*取消默认箭头结束*/
									}
								}
							}
							.strength {
								width: 50%;
								.tit_name {
									color: #727272;
									font-size: 18px;
									font-family:'Roboto-Regular';
									span {
										color: red;
									}
								}

								.select_strength {
									width: 100%;
									display: flex;
									align-items: center;
									margin-top: 10px;

									input {
										width: 88%;
										height: 50px;
										display: flex;
										padding-left: 20px;
										align-items: center;
										background-color: #0E0F11;
										border: 2px solid #2D2D2D;
										border-radius: 19px;
										font-family:'Roboto-Regular';
										color: #FFFFFF;
										font-size: 18px;
									}
								}
							}
						}

						.upload {
							width: 95%;
							padding-top: 35px;
							margin-left: 40px;

							.tit_name {
								color: #727272;
								font-size: 18px;
								font-family:'Roboto-Regular';
								span {
									color: red;
								}
							}

							.hundred_block {
								width: 90%;
								height: 55px;
								border-radius: 19px;
								padding: 0 20px;
								border: 2px solid #2D2D2D;
								display: flex;
								align-items: center;
								justify-content: space-between;
								margin-top: 10px;
								.hund_left {
									width: 100%;

									.input {
										width: 100%;
										height: 55px;
										color: #727272;
										font-family:'Roboto-Regular';
										background: inherit;
										font-size: 18px;
										border: none;
									}
								}
								.hund_right {
									.upload-demo {
										width: 20px;
									}
									.hund_san {
										width: 20px;
									}
								}
							}
						}

						.introdution {
							width: 95%;
							padding-top: 35px;
							margin-left: 40px;
							.tit_name {
								color: #727272;
								font-size: 18px;
								font-family:'Roboto-Regular';
							}
							textarea {
								width: 90%;
								border: 2px solid #2D2D2D;
								border-radius: 19px;
								font-family:'Roboto-Regular';
								color: #FFFFFF;
								background: inherit;
								padding: 20px;
								font-size: 18px;
								height: 120px;
								margin-top: 10px;
								resize: none
							}
						}
					}
				}
			}
		}
	}
</style>
