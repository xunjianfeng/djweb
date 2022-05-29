<template>
	<div class="index">
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<router-link to="/center/game">
						<div class="nav_left" @click="jump_order">
							<< My Game Profile
						</div>
					</router-link>
					<div class="nav_right">
						<p class="save" @click="submit">Save</p>
						<p class="cancel" @click="jump_order">Cancel</p>
					</div>
				</div>
				<!-- 头部切换 -->
				<div class="content_top">
					<div :class="index==tabIndex?'top_block':'top_block2'" v-for="(item,index) in list" :key="index" @click="tab_nav(index)">
						<el-image :src="HOST + item.gameLogo" class="top_block_img" v-if="item.gameName != ''">
							<div slot="error" class="image-slot"> 
								<img src="../../assets/images/default_game.png" class="top_block_img"/>
							</div>
						</el-image>
						<!-- <img class="top_block_img"  v-if="item.gameName != ''" :src="HOST+item.gameLogo" alt=""> -->
						<div class="top_block_name" v-if="item.gameName != ''">{{item.gameName}}</div>
						<div class="top_block_name2" v-else>Please choose game type</div>
					</div>
					<div class="top_block3" @click="addList">
						<img class="top_block_img" src="@/assets/images/add.png" alt="">
					</div>
				</div>
				<div class="content_right_container">
					<div class="content_right_form">
						<div class="right_form_information">
							<div class="form_inputs">
								<div class="form_user">
									<p class="form_username">Game</p>
									<div class="inputs_block">
										<div class="inputs_img1">
											<el-image :src="HOST + list[tabIndex]['gameLogo']" class="game_img">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default_game.png" class="game_img"/>
												</div>
											</el-image>
											<!-- <img :src="HOST+list[tabIndex]['gameLogo']" alt="" v-if="list[tabIndex]['gameLogo']"> -->											
										</div>
										<el-select class="user_name" :popper-append-to-body="false" v-model="list[tabIndex]['gameId']"  @change="selectChanged">
											<el-option v-for="item in game_list" :key="item.gameId" :label="item.gameName" :value="item.gameId">
											</el-option>
										</el-select>
									</div>
								</div>
								<div class="form_content">
									<div class="form_input1">
										<p>In Game Name (IGN)<span>*</span></p>
										<input type="text" class="input" v-model="list[tabIndex]['ign']">
									</div>
									<div class="form_input1">
										<p>In Game ID (IGID)<span>*</span></p>
										<input type="text" class="input" v-model="list[tabIndex]['igid']">
									</div>
									<div class="form_input1">
										<p>Game Character</p>
										<input type="text" class="input" v-model="list[tabIndex]['role']">
									</div>
								</div>
								<div class="form_input3 form_margin" style="width:98%">
									<p>In Game Introduction （why people should team with me)</p>
									<textarea name="" id="" cols="30" rows="10" v-model="list[tabIndex]['introduce']"></textarea>
								</div>
								<!-- 删除 -->
								<div class="foot_del">
									<img src="../../assets/images/trash.png" class="del_img" alt="" @click="delDisplayArea">
									<div class="del_text" @click="delDisplayArea">Delete</div>
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
	import LeftView from '@/components/order/left.vue'
	import {profileUser,gamdList,profileSave,profileDelete} from '@/api/center'
	export default {
		name: "update_data",
		inject:['reload'],
		data() {
			return {
				list: [{
					profileId: '',
					userId: sessionStorage.getItem("userId"),
					gameId: '',
					gameLogo: '',
					gameName: '',
					ign: '',
					igid: '',
					role: '',
					introduce: '',
				}, ],
				tabIndex: 0,
				
				game_list:'',
				userId: sessionStorage.getItem("userId")
			}
		},
		components: {
			LeftView
		},
		mounted() {
			this.gamdList();
			this.get_profile();
			
		},
		methods:{
			// 游戏列表
			gamdList() {
				gamdList({size:0}).then(res => {
					const {
						list,total
					} = res.data
					this.game_list = list;
				})
			},
			selectChanged(value) {
				let that = this;
				for (let i = 0; i < that.game_list.length; i++) {
					if (that.game_list[i].gameId == value) {
						that.list[that.tabIndex]['gameLogo'] = that.game_list[i].gameLogo
						that.list[that.tabIndex]['gameName'] = that.game_list[i].gameName
					}
				}
			},
			// 获取用户游戏配置
			get_profile() {
				let that = this;
				profileUser({}).then(res => {
					if (res.data != '') {
						that.list = res.data
					}
				})
			},
			// 提交
			submit() {
				let that = this,
				{gameName,gameLogo,...data} = that.list[that.tabIndex],
				params = data; 
				profileSave(params).then(res => {
					that.$message({
						type: 'success',
						message: res.message
					});
					setTimeout(()=>{
						that.$router.push({path:'/center/game'})
					},500)
				})
			},
			// 添加
			addList() {
				this.list.push({
					gameName: '',
					gameLogo: '',
					profileId: '',
					userId: sessionStorage.getItem("userId"),
					gameId: '',
					ign: '',
					igid: '',
					role: '',
					introduce: '',
				})
			},
			// 切换
			tab_nav(index) {
				this.tabIndex = index
			},
			jump_order(){
				this.$router.push({path:'/center/game'})
			},
			// 删除游戏配置
			delDisplayArea() {
				let that = this;
				if(that.list[that.tabIndex]['profileId'] != ''){
					let params = {
						id:that.list[that.tabIndex]['profileId']
					}
					profileDelete(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						that.reload();
						that.get_profile();
						that.gamdList();
						that.list.splice(that.tabIndex,1)
						that.tabIndex =  that.tabIndex - 1
						setTimeout(()=>{
							
						},500)
						if(that.list == ''){
							that.$router.push({path:'/center/game'})
						}
					})
				}else{
					that.list.splice(that.tabIndex,1)
					that.tabIndex =  that.tabIndex - 1
				}
				// this.reload()
				
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
		.content_right {
			width: calc(100% - 370px);
			.content_right_nav {
				margin-top: 50px;
				width: calc(100% - 60px);
				// margin-top: 50px;
				margin-bottom: 20px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				a{
					text-decoration: none;
				}
				.nav_left {
					font-size: 20px;
					color: #fff;
					font-weight: 500;
					font-family:'Quicksand-Bold';
				}

				//nav_left
				.nav_right {
					display: flex;
					text-align: center;
					font-family:'Roboto-Regular';
					.save {
						width: 120px;
						height: 50px;
						line-height: 50px;
						background-color: #D3AA53;
						border-radius: 25px;
						text-align: center;
						color: #000;
						font-size: 18px;
						cursor: pointer;
					}
					.cancel {
						width: 120px;
						height: 50px;
						line-height: 50px;
						border: 1px solid #777777;
						border-radius: 25px;
						text-align: center;
						color: #fff;
						font-size: 18px;
						margin-left: 15px;
						cursor: pointer;
					}
				}
			}
			// 信息头部
			.content_top {
				// width: 40%;
				width: 93%;
				height: 70px;
				// background-color: #1D2023;
				// border: 1px solid #0E0F11;
				// border-top-left-radius: 30px;
				// border-top-right-radius: 30px;
				// overflow-x: scroll;
				display: flex;
				flex-direction:row;
				font-family:'Roboto-Regular';
				.top_block {
					width: 60%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #0E0F11;
					border-radius: 30px 30px 0px 0px;
					max-width: 200px;
					.top_block_img {
						width: 35px;
						height: 35px;
					}
					.top_block_name {
						color: #fff;
						font-size: 20px;
						font-weight: 500;
						margin-left: 20px;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					.top_block_name2 {
						color: #727272;
						font-size: 16px;
						font-weight: 500;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
				.top_block2 {
					width: 60%;
					background-color: #1D2023;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 30px 30px 0px 0px;
					border: 1px solid #0E0F11;
					border-left: none;
					max-width: 200px;
					.top_block_img {
						width: 35px;
						height: 35px;
					}
					.top_block_name {
						color: #fff;
						font-size: 20px;
						margin-left: 20px;
						font-weight: 500;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					.top_block_name2 {
						color: #727272;
						font-size: 16px;
						font-weight: 500;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}

				.top_block3 {
					width: 16%;
					background-color: #1D2023;
					display: flex;
					align-items: center;
					justify-content: center;
					border-top-right-radius: 30px;
					border: 1px solid #0E0F11;
					border-left: none;
					max-width: 100px;
					min-width: 50px;
					.top_block_img {
						width: 20px;
					}
				}
			}
			::-webkit-scrollbar{
				width: 7px;
				height: 7px;
				background-color: #0E0F11;
			}
			/*定义滚动条轨道 内阴影+圆角*/
			::-webkit-scrollbar-track {
				box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
				-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
				border-radius: 10px;
				background-color: #0E0F11;
			}
			
			/*定义滑块 内阴影+圆角*/
			::-webkit-scrollbar-thumb{
				border-radius: 10px;
				box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
				-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
				background-color: #1D2023;
			}
			.content_right_container {
				width: calc(100% - 60px);
				background: #0E0F11;
				border-radius: 50px;
				border-top-left-radius: 0;
				margin-bottom: 40px;
				padding: 20px;
				font-family:'Roboto-Regular';
				.content_right_form {
					.right_form_information {
						width: 95%;
						margin: 0 2.5%;
						.form_inputs {
							.form_user {
								width: 98%;
								margin-top: 20px;
								margin-right: 2%;
								.form_username {
									color: #727272;
									font-size: 15px;
									span {
										color: red;
									}
								}
								.inputs_block {
									width: 98%;
									height: 55px;
									display: flex;
									padding: 0 20px;
									align-items: center;
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									color: #fff;
									// justify-content: space-between;
									.inputs_img1 {
										color: #fff;
										background: inherit;
										font-size: 16px;
										display: flex;
										align-items: center;
										.game_img {
											width: 40px;
											height: 40px;
											object-fit: cover;
										}
									}
									.user_name {
										width: 100% !important;
										/deep/ .el-input__inner{
											width: 100%;
											border: none;
											color: #FFFFFF;
											font-size: 18px;
										}
										/deep/ .el-icon-arrow-up:before {
										    content: "";
										}
										/deep/ .el-input .el-input__inner {
											border: 0px;
											// width: 151px;
											height: 55px;
											color: #fff;
											font-family:'Roboto-Regular';
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
											content: "\e790";
										}
										//修改单个的选项的样式
										/deep/ .el-select-dropdown__item {
											background-color: transparent;
											color: #fff;
											font-family:'Roboto-Regular';
											// text-align: center;
										}
										/deep/ .el-select-dropdown__item.hover{
											// background-color: rgba(255,255,255,0.2);
											background-color: #1D2023;
										}
										/deep/ .el-select-dropdown__item.selected{
											// background-color: rgba(255,255,255,0.2);
											background-color: #1D2023;
										}
									}
								}
							}
							.form_content {
								display: flex;
								justify-content: space-between;/* 横向中间自动空间 */
								flex-wrap: wrap;/* 换行 */
								.form_input {
									width: 45%;
									&:nth-child(2n) {
										position: relative;
										left: -20px;
									}
									p {
										color: #727272;
										font-size: 15px;
										span {
											color: red;
										}
									}
									input {
										width: 100%;
										height: 55px;
										border: 2px solid #2D2D2D;
										border-radius: 19px;
										color: #fff;
										background: inherit;
										padding-left: 20px;
										font-size: 16px;
									}
								}
								.form_input1 {
									width: 45%;
									margin-top: 20px;
									position: relative;
									&:nth-child(2n) {
										position: relative;
										left: -20px;
									}
									p {
										color: #727272;
										font-size: 15px;
										span {
											color: red;
										}
									}
									.input {
										width: 100%;
										height: 55px;
										border: 2px solid #2D2D2D;
										border-radius: 19px;
										color: #fff;
										background: inherit;
										padding-left: 20px;
										font-size: 16px;
									}
									.form_input_phone {
										width: 150px;
										display: flex;
										align-items: center;
										position: absolute;
										top: 47px;
										left: 20px;

										p {
											height: 30px;
											line-height: 30px;
											margin-left: 10px;
											border-right: 1px solid #2d2d2d;
											padding-right: 10px;
										}
									}//form_input_phone
									.form_input1_content {
										width: 105%;
										height: 55px;
										border: 2px solid #2D2D2D;
										border-radius: 19px;
										position: relative;

										input {
											width: 85%;
											height: 55px;
											color: #fff;
											background: inherit;
											padding-left: 20px;
											border: none;
											font-size: 16px;
										}
										.input1 {
											width: 50%;
											margin-left: 130px;
										}
										img {
											position: absolute;
											right: 15px;
											top: 20px
										}
									}//form_input1_content
									.select_price{
										width: 108%;
										display: flex;
										border: 2px solid #2D2D2D;
										border-radius: 19px;
										align-items: center;
										margin-top: 10px;
										.input {
											width: 70%;
											height: 55px;
											border: none;
											border-radius: 19px;
											color: #fff;
											background: inherit;
											padding-left: 20px;
											font-size: 16px;
										}
										select{
											width: 20%;
											height: 55px;
											border: none;
											// border-radius: 19px;
											// padding-left: 70%;
											// padding-right: 10%;
											background-color: #0E0F11;
											color: #FFFFFF;
											font-size: 18px;
											/*取消默认箭头开始*/
											appearance:none;
											-moz-appearance:none;
											-webkit-appearance:none;
											/*取消默认箭头结束*/
										}
										
										.dropdown{
											width: 15px;
											height: 16px;
											position: relative;
											right: 50px;
										}
									}
									.select_type{
										width: 108%;
										display: flex;
										align-items: center;
										margin-top: 10px;
										select{
											width: 100%;
											height: 55px;
											border: 1px solid sandybrown;
											border-radius: 19px;
											padding-left: 20px;
											// padding-left: 70%;
											// padding-right: 10%;
											background-color: #0E0F11;
											color: #FFFFFF;
											font-size: 18px;
											/*取消默认箭头开始*/
											appearance:none;
											-moz-appearance:none;
											-webkit-appearance:none;
											/*取消默认箭头结束*/
											
										}
										
										.dropdown{
											width: 15px;
											height: 16px;
											position: relative;
											right: 50px;
										}
									}
									
								}//form_input1

								.form_input2 {
									width: 45%;
									margin-top: 20px;

									&:nth-child(2n) {
										position: relative;
										left: -20px;
									}

									p {
										color: #727272;
										font-size: 15px;

										span {
											color: red;
										}
									}

									input {
										width: 100%;
										height: 55px;
										border: 2px solid #2D2D2D;
										border-radius: 19px;
										color: #fff;
										background: inherit;
										padding-left: 20px;
										font-size: 16px;
									}
								}
							}
							.form_margin {
								margin: 20px 0;
							}
							.form_input3 {
								width: 100%;
								display: inline-block;
								.inputs_img {}
								
								p {
									color: #727272;
									font-size: 15px;
									span {
										color: red;
									}
								}
								input {
									width: 100%;
									height: 55px;
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									color: #fff;
									background: inherit;
									padding-left: 20px;
									font-size: 16px;
								}
								textarea {
									width: calc(100% - 20px);
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									color: #fff;
									background: inherit;
									padding: 20px;
									font-size: 16px;
									height: 120px;
									resize: none;
									font-family:Avenir,Helvetica,Arial,sans-serif;
								}
							}
							.foot_del {
								cursor: pointer;
								padding: 20px 20px 20px 20px;
								display: flex;
								align-items: center;
								.del_img {
									width: 22px;
									height: 22px;
								}
								.del_text {
									margin-left: 10px;
									color: red;
									font-size: 22px;
									font-weight: 500;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
