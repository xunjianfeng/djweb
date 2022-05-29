<template>
	<div class="index">
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<router-link to="/order/apply_success_02">
						<div class="nav_left" @click="jump_order">
							<< My Companion information
						</div>
					</router-link>
					<div class="nav_right" v-if="show_btn == true">
						<p class="save" @click="submit">Save</p>
						<p class="cancel" @click="jump_order">Cancel</p>
					</div>
				</div>
				<!-- 头部切换 -->
				<div class="content_top">
					<!-- <div class="top_block">
						<img class="top_block_img" src="@/assets/images/img.png" alt="">
						<div class="top_block_name">Dota 2</div>
					</div> -->
					<div :class="index==tabIndex?'top_block':'top_block2'" v-for="(item,index) in list" :key="index" @click="tab_nav(index)">
						<el-image :src="HOST + item.gameLogo" class="top_block_img" v-if="item.gameName != ''">
							<div slot="error" class="image-slot"> 
								<img src="../../assets/images/default_game.png" class="top_block_img"/>
							</div>
						</el-image>
						<!-- <img class="top_block_img" v-if="item.gameName != ''" :src="HOST+item.gameLogo" alt=""> -->
						<div class="top_block_name" v-if="item.gameName != ''">{{item.gameName}}</div>
						<div class="top_block_name2" v-else>Please add Companion</div>
					</div>
					<div class="top_block3" @click="addList">
						<img class="top_block_img" src="@/assets/images/add.png" alt="">
					</div>
				</div>
				<div class="content_right_container">
					<div class="content_right_form">
						<div class="right_form_information">
							<div class="form_inputs">
								<el-switch
								  v-model="list[tabIndex]['service']"
								  active-color="#13ce66"
								  :disabled="show_btn == false"
								  >
								</el-switch>
								<div class="edit_btn" @click="show_btn = true" v-if="show_btn == false">Edit</div>
								<div class="form_user">
									<p class="form_username">Game<span>*</span></p>
									
									<!-- <div class="inputs_block">
										<div class="inputs_img1">
											<img :src="HOST+list[tabIndex]['gameLogo']" alt="">
											<p>{{list[tabIndex]['gameName']}}</p>
										</div>
										<div class="inputs_right">
											<img class="inputs_san" src="@/assets/images/san.png" alt="">
										</div>
									</div> -->
									<div class="inputs_block">
										<div class="inputs_img1">
											<el-image :src="HOST + list[tabIndex]['gameLogo']" class="game_img">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default_game.png" class="game_img"/>
												</div>
											</el-image>
											<!-- <img :src="HOST+list[tabIndex]['gameLogo']" alt="" v-if="list[tabIndex]['gameLogo']"> -->
											<!-- <img src="../../assets/images/default_game.png" v-else /> -->
										</div>
										<el-select 	:disabled="show_btn == false" :popper-append-to-body="false" class="user_name" placeholder="Please select"  v-model="list[tabIndex]['gameId']" @change="selectChanged">
											<el-option v-for="item in game_list" :key="item.gameId" :label="item.gameName" :value="item.gameId">
											</el-option>
										</el-select>
									</div>
								</div>
								
								<div class="form_content">
									<div class="form_input1">
										<p>In Game ID<span>*</span></p>
										<input type="text" :disabled="show_btn == false" class="input" v-model="list[tabIndex]['inGameId']">
									</div>
									<div class="form_input1">
										<p>In Game Name</p>
										<input type="text" :disabled="show_btn == false" class="input" v-model="list[tabIndex]['gameNickname']" placeholder="Please key in your in game name">
									</div>
									<div class="form_input1">
										<p>Game Character<span>*</span></p>
										<input type="text" :disabled="show_btn == false" class="input" v-model="list[tabIndex]['role']">
									</div>
									<div class="form_input1">
										<p>Your Strength<span>*</span></p>
										<input type="text" :disabled="show_btn == false" class="input" v-model="list[tabIndex]['strength']">
									</div>
									<div class="form_input1 form_input_price">
										<p>Price<span>*</span></p>
										<div class="select_price">
											<input type="text" :disabled="show_btn == false" class="input" v-model="list[tabIndex]['price']">
											<el-select class="user_name" :popper-append-to-body="false" :disabled="show_btn == false" v-model="list[tabIndex]['priceUnit']"   style="width: 20%;">
												<el-option  label="coin" value="coin"></el-option>
												<!-- <el-option  label="point" value="point"></el-option> -->
											</el-select>
											<!-- <select v-model="list[tabIndex]['priceUnit']">
												<option value="coin">coin</option>
												<option value="point">point</option>
											</select> -->
											<!-- <img class="dropdown" src="@/assets/images/dropdown.png" /> -->
										</div>
										<!-- <input type="text" class="input" value="Coin"> -->
									</div>
									<div class="form_input1 form_input_type">
										<p>Type</p>
										<div class="select_type">
											<el-select :disabled="show_btn == false" :popper-append-to-body="false"  class="user_name" v-model="list[tabIndex]['type']" >
												<el-option  label="Game" value="Game"></el-option>
												<el-option  label="Hour" value="Hour"></el-option>
											</el-select>
											<!-- <select v-model="list[tabIndex]['type']">
												<option value="Game">Game</option>
												<option value="Hour">Hour</option>
											</select>
											<img class="dropdown" src="@/assets/images/dropdown.png" /> -->
										</div>
										<!-- <input type="text" class="input" value="Please choose a type"> -->
									</div>
									<div class="form_hundred">
										<p>Your Sound (in mp3 format)</p>
										<div class="hundred_block">
											<div class="hund_left">
												<input type="text" :disabled="show_btn == false" class="input" disabled v-model="list[tabIndex]['soundUrl']">
											</div>
											<div class="hund_right">
												<!-- <img class="hund_san" src="@/assets/images/update.png" alt=""> -->
												<el-upload
													class="upload-demo"
													:action="HOST+'img/upload'"
													accept=".MP3" 
													:disabled="show_btn == false"
													:show-file-list="false"
													:on-success="res => {return handleAvatarSuccess(res,'soundUrl', 0);}"
													:before-upload="beforeAvatarUpload">
													<img class="hund_san" src="@/assets/images/update.png" alt="">
												</el-upload>
											</div>
										</div>
									</div>
									<div class="form_2block_container">
										<div class="form_input_2block">
											<p>Availability Time Slot</p>
											<div class="time_block">
												<div class="time_left">
													Start
												</div>
												<div class="time_right" v-if="show_btn == false">
													{{list[tabIndex]['startTime']!= null&&list[tabIndex]['startTime']!=''&&list[tabIndex]['startTime']!=undefined ? list[tabIndex]['startTime'].substring(0,5):'00:00'}}
												</div>
												<div class="time_right" v-else @click="click_time(1)">
													{{list[tabIndex]['startTime']!= null&&list[tabIndex]['startTime']!=''&&list[tabIndex]['startTime']!=undefined ? list[tabIndex]['startTime'].substring(0,5):'00:00'}}
												</div>
												<!-- 弹窗 -->
												<div class="time_mask" v-if="time_status == true">
													<div class="mask_tit">Start Time</div>
													<div class="mask_time_name">
														<div class="mask_left">Time</div>
														<div class="mask_right" style="padding: 0 15px;">{{startHour||'00'}}:{{startMinute||'00'}}</div>
													</div>
													<div class="mask_time_name2">
														<div class="mask_left">Hour</div>
														<div class="mask_right">
															<input class="mask_input" type="text" oninput="value=value.replace(/[^\d]/g,'')" maxlength="2" v-model="startHour" min="00" max="24">
															</input>
														</div>
													</div>
													<div class="mask_time_name2">
														<div class="mask_left">Minute</div>
														<div class="mask_right">
															<input class="mask_input" type="text" oninput="value=value.replace(/[^\d]/g,'')" maxlength="2" v-model="startMinute" min="00" max="60">
															</input>
														</div>
													</div>
													<div class="mask_time_name3">
														<div class="mask_left" @click="timeClose(1)">Clear</div>
														<div class="mask_right" @click="timeYes(1)">Done</div>
													</div>
												</div>
											</div>
										</div>
										<div class="form_input_2block">
											<p style="height: 17px;"></p>
											<div class="time_block">
												<div class="time_left">
													To
												</div>
												<div class="time_right" v-if="show_btn == false">
													{{list[tabIndex]['endTime']!= null&&list[tabIndex]['endTime']!=''&&list[tabIndex]['endTime']!=undefined ? list[tabIndex]['endTime'].substring(0,5):'00:00'}}
												</div>
												<div class="time_right" v-else @click="click_time(2)">
													{{list[tabIndex]['endTime']!= null&&list[tabIndex]['endTime']!=''&&list[tabIndex]['endTime']!=undefined ? list[tabIndex]['endTime'].substring(0,5):'00:00'}}
												</div>
												<!-- 弹窗 -->
												<div class="time_mask" v-if="time_status2 == true">
													<div class="mask_tit">End Time</div>
													<div class="mask_time_name">
														<div class="mask_left">Time</div>
														<div class="mask_right" style="padding: 0 15px;">{{endtHour||'00'}}:{{endMinute||'00'}}</div>
													</div>
													<div class="mask_time_name2">
														<div class="mask_left">Hour</div>
														<div class="mask_right">
															<input class="mask_input"  oninput="value=value.replace(/[^\d]/g,'')" maxlength="2" v-model="endtHour" min="00" max="24">
															</input>
														</div>
													</div>
													<div class="mask_time_name2">
														<div class="mask_left">Minute</div>
														<div class="mask_right">
															<input class="mask_input" type="text" oninput="value=value.replace(/[^\d]/g,'')" maxlength="2" v-model="endMinute" min="00" max="60">
															</input>
														</div>
													</div>
													<div class="mask_time_name3">
														<div class="mask_left" @click="timeClose(2)">Clear</div>
														<div class="mask_right" @click="timeYes(2)">Done</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="form_input3 form_margin" style="width:98%">
									<p>Note For User Before Place Order</p>
									<textarea name="" id="" cols="30" rows="10" :disabled="show_btn == false" v-model="list[tabIndex]['note']">Please pm before placing an order</textarea>
								</div>
								<div class="form_input3 form_margin" style="width:98%">
									<p>In Game Introduction （Short briefing why people want to engage you)</p>
									<textarea name="" id="" cols="30" rows="10" :disabled="show_btn == false" v-model="list[tabIndex]['introduction']">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate</textarea>
								</div>
								<!-- 文件上传 -->
								<div class="form_upate">
									<div class="upate_tit">Display Area</div>
									<div class="update_content">
										<div class="upate_img_block" v-if="item !='' && item != null && item != undefined" v-for="(item,index) in list[tabIndex]['displayArea']" :key="index">
											<img :src="HOST+item" alt="" class="display_img">
											<img src="../../assets/images/close.png"  @click="delDisplayArea(item)" class="del_img_1" v-if="show_btn == true"/>
										</div>
										<div class="upate_img_block2" v-if="show_btn == true">
											<el-upload
												class="upload-demo"
												:action="HOST+'img/upload'"
												:show-file-list="false"
												:on-success="res => {return handleAvatarSuccess(res,'displayArea', 0);}"
												:before-upload="beforeAvatarUpload">
												<img src="../../assets/images/update.png" alt="">
											</el-upload>
										</div>
									</div>
								</div>
								<!-- 文件删除 -->
								<!-- <div class="foot_del" v-if="show_btn == true">
									<img src="../../assets/images/trash.png" class="del_img" alt="" @click="delDisplayArea">
									<div class="del_text" @click="delDisplayArea">Delete</div>
								</div> -->
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
	import {companionUpdate, companionDetail } from '@/api/order'
	import {gamdList} from '@/api/center'
	export default {
		name: "edit_info",
		data() {
			return {
				list: [],
				tabIndex: 0,
				startHour: '',
				startMinute: '',
				endtHour: '',
				endMinute: '',
				dataForm: {
					service:true,
					companionGameId: '',
					gameId: '',
					inGameId:'',
					gameNickname: '',
					soundUrl: '',
					introduction: '',
					strength: '',
					role: '',
					type: '',
					price: '',
					startTime: '',
					endTime: '',
					note: '',
					priceUnit: 'coin',
					displayArea: [],
				},
				time_status: false,
				time_status2: false,
				userId: sessionStorage.getItem("userId"),
				game_list:[],
				show_btn:false,
			}
		},
		components: {
			LeftView
		},
		mounted() {
			this.getCompanionDetail()
			this.gamdList()
		},
		methods:{
			gamdList() {
				gamdList({size:0}).then(res => {
					const {
						list,
						total
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
			// 提交
			submit() {
				let that = this,
				{examine,fullName,phoneNumber,gameLogo,gameName,createTime,companionId,email,avatar,...data} = this.list[this.tabIndex],
				params = data; 
				params['displayArea'] = params['displayArea'].join(',')
				console.log(params)
				// console.log(this.list[this.tabIndex])
				if(this.list[this.tabIndex].price == '' || (this.list[this.tabIndex].priceUnit == '' || this.list[this.tabIndex].priceUnit == null) || (this.list[this.tabIndex].type == null || this.list[this.tabIndex].type == '')){
					that.$message({
						message: "Please complete companion's information",//请完善陪玩信息
						type: 'warning'
					})
					return false
				}
				if(this.list[this.tabIndex].startTime == null && this.list[this.tabIndex].endTime == null){
					that.$message({
						message: "Please complete companion's time",//请完善陪玩时间
						type: 'warning'
					})
					return false
				}
				companionUpdate(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					setTimeout(()=>{
						that.$router.push({path:'/order/apply_success_02'})
					},500)
				})
			},
			// 陪玩详情信息
			getCompanionDetail() {
				let that = this,
				params = { userId: this.userId }
				companionDetail(params).then(res => {
					let { companionGame } = res.data
					for ( let i in companionGame ) {
						if ( companionGame[i]['displayArea'] ) {
							for ( let j in companionGame[i]['displayArea'] ) {
								companionGame[i]['displayArea'][j] = companionGame[i]['displayArea'][j]['url']
							}
						}
					}
					// console.log('陪玩详情信息')
					that.list = companionGame
					// console.log(that.list)
				})
			},
			// 添加
			addList() {
				this.$router.push({path:'/order/apply'})
				// this.$prompt('请输入游戏名', '提示', {
				// 	confirmButtonText: '确定',
				// 	cancelButtonText: '取消',
				// }).then(({ value }) => {
				// 	this.list.push({
				// 		service:true,
				// 		gameName: value,
				// 		companionGameId: '',
				// 		gameId: '',
				// 		inGameId:'',
				// 		gameNickname: '',
				// 		soundUrl: '',
				// 		introduction: '',
				// 		strength: '',
				// 		role: '',
				// 		type: '',
				// 		price: '',
				// 		startTime: '',
				// 		endTime: '',
				// 		note: '',
				// 		priceUnit: 'coin',
				// 		displayArea: [],
				// 	})
				// })
				
			},
			// 切换
			tab_nav(index) {
				this.tabIndex = index
			},
			jump_order(){
				this.$router.push({path:'/order/apply_success_02'})
			},
			// 日期
			click_time(e) {
				if ( e == 1 ) {
					this.time_status = !this.time_status
					this.time_status2 = false
				} else {
					this.time_status2 = !this.time_status2
					this.time_status = false
				}
			},
			// 确定选择日期
			timeYes(e) {
				if ( e == 1 ) {
					// 判断不能超过  时24  分钟60  
					if(this.startHour >= 24){
						this.$message({
						  message: 'Hour cannot more than 24.',//Hour 不能超过 24
						  type: 'warning'
						});
						return false
					}else if(this.startMinute >= 60 ){
						this.$message({
						  message: 'Minute cannot more than 59',//Minute 不能超过59
						  type: 'warning'
						});
						return false
					}
					this.list[this.tabIndex].startTime = (this.startHour||'00')+':'+(this.startMinute||'00') + ':00'
					this.time_status = !this.time_status
				} else {
					// 判断不能超过  时24  分钟60
					if(this.endtHour >= 24){
						this.$message({
						  message: 'Hour cannot more than 24.',//Hour 不能超过 24
						  type: 'warning'
						});
						return false
					}else if(this.endMinute >= 60 ){
						this.$message({
						  message: 'Minute cannot more than 59',//Minute 不能超过59
						  type: 'warning'
						});
						return false
					}
					this.list[this.tabIndex].endTime = (this.endtHour||'00')+':'+(this.endMinute||'00') + ':00'
					this.time_status2 = !this.time_status2
				}
			},
			// 关闭日期
			timeClose(e) { 
				if ( e == 1 ) {
					this.startHour = "00"
					this.startMinute = "00 "
					// this.time_status = !this.time_status
				} else {
					this.endtHour = "00"
					this.endMinute = "00"
					// this.time_status2 = !this.time_status2
				}
			},
			// 删除图片
			delDisplayArea(item) {
				for(let d in this.list[this.tabIndex]['displayArea']){
					let is_item =this.list[this.tabIndex]['displayArea'].findIndex((value)=>value == item )
					if(item ==  this.list[this.tabIndex]['displayArea'][d]){
						this.list[this.tabIndex]['displayArea'].splice(is_item,1)
					}
				}
				// if ( this.list[this.tabIndex]['displayArea'].length > 1 ) {
				// 	this.list[this.tabIndex]['displayArea'].splice(this.list[this.tabIndex]['displayArea'].length-1,1)
				// } else {
				// 	this.list[this.tabIndex]['displayArea'] = []
				// }
			},
			handleAvatarSuccess(res,attr,index) {
				console.log(index)
				this.$loading({
				customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					if(attr === 'soundUrl'){
						console.log(res)
						this.list[this.tabIndex].soundUrl = res.data
					} else if ( attr === 'displayArea' ) {
						this.list[this.tabIndex].displayArea.push(res.data)
					}
				}else{
					this.$message({
						type:'error',
						message:res.message
					})
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
	/deep/ .el-select .el-input .el-input__inner {
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
					font-family:'Quicksand-Bold';
				}
				.nav_right {
					display: flex;
					text-align: center;
					
					.save {
						width: 120px;
						height: 50px;
						line-height: 50px;
						background-color: #D3AA53;
						border-radius: 25px;
						text-align: center;
						color: #000;
						font-size: 18px;
						font-family:'Roboto-Regular';
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
						font-family:'Roboto-Regular';
						cursor: pointer;
					}
				}
			}
			// 信息头部
			.content_top {
				// width: 42%;
				// width: calc(100% - 60px);
				width: 93%;
				height: 60px;
				display: flex;
				flex-direction:row;
				font-family:'Roboto-Regular';
				// background-color: #1D2023;
				// border: 1px solid #0E0F11;
				// border-top-left-radius: 30px;
				// border-top-right-radius: 30px;
				// overflow-x: scroll;
				// display: flex;
				.top_block {
					// width: 42%;
					// border-top-right-radius: 30px;
					cursor: pointer;
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
						font-family:'Roboto-Regular';
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
					// width: 42%;
					// border-top-right-radius: 30px;
					cursor: pointer;
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
						font-family:'Roboto-Regular';
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
					// border-top-right-radius: 30px;
					border-radius: 30px 30px 0px 0px;
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

			//content_top
			.content_right_container {
				width: calc(100% - 60px);
				background: #0E0F11;
				border-radius: 50px;
				border-top-left-radius: 0;
				margin-bottom: 40px;
				padding: 20px;
				.content_right_form {
					.right_form_information {
						width: 95%;
						margin: 0 2.5%;
						.form_inputs {
							position: relative;
							padding-bottom: 30px;
							.edit_btn{
								position: absolute;
								right: 0;
								top: 0px;
								width: 110px;
								height: 45px;
								line-height: 45px;
								border: 1px solid #777777;
								border-radius: 25px;
								text-align: center;
								color: #fff;
								font-size: 18px;
								margin-left: 15px;
								font-family:'Roboto-Regular';
								cursor: pointer;
							}
							.form_user {
								width: 98%;
								margin-top: 20px;
								margin-right: 2%;
								.form_username {
									color: #727272;
									font-size: 15px;
									font-family:'Roboto-Regular';
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
										width: 100%;
										/deep/ .el-input__inner {
											width: 100%;
											background-color: #0e0f11;
											border: none;
											color: #FFFFFF;
											font-size: 18px;
										}
								
										/deep/ .el-icon-arrow-up:before {
											content: "";
										}
								
										/deep/ .el-select .el-input .el-input__inner {
											border: 0px;
											width: 151px;
											height: 55px;
											color: #fff;
											background-color: #33384B;
											border: 0px solid #ffffff;
										}
									}
								}
							// 	.inputs_block {
							// 		width: 98%;
							// 		display: flex;
							// 		padding: 0 20px;
							// 		align-items: center;
							// 		border: 2px solid #2D2D2D;
							// 		border-radius: 19px;
							// 		color: #fff;
							// 		font-family:'Roboto-Regular';
							// 		justify-content: space-between;
							// 		.inputs_img1 {
							// 			color: #fff;
							// 			background: inherit;
							// 			font-size: 16px;
							// 			display: flex;
							// 			align-items: center;
							// 			img {
							// 				width: 40px;
							// 			}
							// 			p {
							// 				color: #fff;
							// 				font-family:'Roboto-Regular';
							// 				margin-left: 20px;
							// 			}
							// 		}
							// 		.inputs_right {
							// 			.inputs_san {
							// 				width: 20px;
							// 			}
							// 		}
							// 	}
							
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
										font-family:'Roboto-Regular';
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
										font-family:'Roboto-Regular';
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
										font-family:'Roboto-Regular';
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
										font-family:'Roboto-Regular';
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
									}
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
											font-family:'Roboto-Regular';
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
									}
									.select_price{
										width: 104%;
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
											font-family:'Roboto-Regular';
											background: inherit;
											padding-left: 20px;
											font-size: 16px;
										}
										.user_name {
											// border: 1px solid #2D2D2D !important;
											/deep/ .el-input__inner{
												background-color:#0e0f11 ;
												border: none;
												color: #727272;
												font-family:'Roboto-Regular';
												font-size: 18px;
											}
											/deep/ .el-icon-arrow-up:before {
												content: "\e78f";
											}
											
											/deep/ .el-icon-arrow-down:before {
												content: "\e790";
											}
											/deep/ .el-select .el-input .el-input__inner {
												border: 0px;
												width: 151px;
												height: 55px;
												color: #727272;
												font-family:'Roboto-Regular';
												background-color: #33384B;
												border:0px solid #ffffff;
											}
											/deep/.el-input--suffix .el-input__inner{
												height:45px;
											} 
										}
									}
									.select_type{
										width: 108%;
										display: flex;
										align-items: center;
										margin-top: 10px;
										.user_name {
											width: 94%;
											height: 55px;
											// border: 1px solid sandybrown;
											border: 2px solid #2D2D2D;
											border-radius: 19px;
											padding: 0 2%;
											
											/deep/ .el-input__inner{
												background-color:#0e0f11 ;
												border: none;
												color: #727272;
												font-size: 18px;
												font-family:'Roboto-Regular';
											}
											/deep/ .el-icon-arrow-up:before {
												content: "\e78f";
											}
											
											/deep/ .el-icon-arrow-down:before {
												content: "\e790";
											}
											/deep/ .el-select .el-input .el-input__inner {
												border: 0px;
												width: 151px;
												height: 55px;
												color: #727272;
												font-family:'Roboto-Regular';
												background-color: #33384B;
												border:0px solid #ffffff;
											}
											/deep/.el-input--suffix .el-input__inner{
												height: 55px;
											} 
										}
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
										font-family:'Roboto-Regular';
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
										font-family:'Roboto-Regular';
										background: inherit;
										padding-left: 20px;
										font-size: 16px;
									}
								}

								.form_hundred {
									width: 98%;
									margin-top: 20px;
									margin-right: 2%;
									position: relative;
									p {
										color: #727272;
										font-size: 15px;
										font-family:'Roboto-Regular';
										span {
											color: red;
										}
									}

									.hundred_block {
										display: flex;
										width: 98%;
										height: 55px;
										border-radius: 19px;
										padding: 0 20px;
										border: 2px solid #2D2D2D;
										align-items: center;
										justify-content: space-between;

										.hund_left {
											width: 50%;

											.input {
												width: 100%;
												height: 55px;
												color: #fff;
												background: inherit;
												font-family:'Roboto-Regular';
												font-size: 16px;
												border: none;
											}
										}

										.hund_right {
											.hund_san {
												width: 20px;
											}
										}
									}

								}

								.form_2block_container {
									width: 98%;
									display: flex;
									justify-content: space-between;

									.form_input_2block {
										width: 45%;
										margin-top: 20px;
										position: relative;

										p {
											color: #727272;
											font-size: 15px;
											font-family:'Roboto-Regular';
											span {
												color: red;
											}
										}

										.time_block {
											width: 100%;
											height: 55px;
											border: 2px solid #2D2D2D;
											border-radius: 19px;
											color: #fff;
											font-family:'Roboto-Regular';
											background: inherit;
											padding: 0 20px;
											font-size: 16px;
											display: flex;
											align-items: center;
											position: relative;
											justify-content: space-between;

											.time_left {
												font-size: 20px;
												font-family:'Roboto-Regular';
											}

											.time_right {
												font-family:'Roboto-Regular';
												cursor: pointer;
											}

											// 时间弹窗
											.time_mask {
												position: absolute;
												right: -24px;
												width: 200px;
												top: 67px;
												padding: 15px 20px;
												border-radius: 15px;
												text-align: center;
												background-color: #1D2023;

												.mask_tit {
													color: #f7f7f7;
													font-size: 18px;
													font-family:'Roboto-Bold';
													margin-bottom: 15px;
												}

												.mask_time_name {
													display: flex;
													align-items: center;
													margin: 15px 0;

													.mask_left {
														width: 28%;
														color: #727272;
														font-size: 18px;
														font-family:'Roboto-Regular';
														margin-right: 10px;
														text-align: left;
													}

													.mask_right {
														color: #fff;
														font-family:'Roboto-Regular';
													}
												}

												.mask_time_name2 {
													display: flex;
													align-items: center;
													margin: 15px 0;

													.mask_left {
														width: 28%;
														color: #727272;
														font-size: 18px;
														margin-right: 10px;
														text-align: left;
														font-family:'Roboto-Regular';
													}

													.mask_right {
														color: #fff;

														.mask_input {
															width: 80%;
															padding: 0 20px;
															color: #fff;
															font-size: 18px;
															height: 40px;
															line-height: 40px;
															border: 1px solid #666;
															border-radius: 12px;
															font-family:'Roboto-Regular';
															background-color: #1d2023;
														}
													}
												}

												.mask_time_name3 {
													display: flex;
													align-items: center;
													justify-content: space-between;
													border-top: 1px solid #3f4143;
													margin: 15px 0 0px 0;
													padding: 20px 0 10px 0;

													.mask_left {
														color: #fff;
														cursor: pointer;
														font-size: 19px;
														font-family:'Roboto-Bold';
													}

													.mask_right {
														color: #d3aa53;
														font-size: 19px;
														cursor: pointer;
														font-family:'Roboto-Bold';
													}
												}
											}
										}

									}
								}

							}//form_content

							.form_margin {
								margin: 20px 0;
							}

							.form_input3 {
								width: 100%;
								display: inline-block;
								.inputs_img {}
								.inputs_img1 {
									display: flex;
									align-items: center;
									float: left;
									img {
										width: 70px;
									}
									p {
										color: #fff;
										font-family:'Roboto-Regular';
										margin-left: 20px;
									}
								}
								p {
									color: #727272;
									font-size: 15px;
									font-family:'Roboto-Regular';
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
									font-family:'Roboto-Regular';
									background: inherit;
									padding-left: 20px;
									font-size: 16px;
								}
								textarea {
									width: calc(100% - 20px);
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									color: #fff;
									font-family:'Roboto-Regular';
									background: inherit;
									padding: 20px;
									font-size: 16px;
									height: 120px;
									resize: none
								}
							}
							.form_upate {
								.upate_tit {
									color: #727272;
									font-size: 15px;
									margin: 10px 0;
									font-family:'Roboto-Regular';
								}
								.update_content {
									display: flex;

									.upate_img_block {
										width: 250px;
										height: 150px;
										background-color: #1D2023;
										margin-right: 20px;
										display: flex;
										align-items: center;
										justify-content: center;
										position: relative;
										.display_img {
											width: 250px;
											height: 150px;
											object-fit: cover;
											// object-fit: contain;
										}
										.del_img_1{
											position: absolute;
											right: 0px;
											top: 0px;
											// left: 0;
											width: 30px;
										}
									}

									.upate_img_block2 {
										width: 250px;
										height: 180px;
										text-align: center;
										background-color: #1D2023;
										display: flex;
										align-items: center;
										justify-content: center;

										img {
											width: 40px;
											height: 40px;
										}
									}
								}
							}
							.foot_del {
								padding: 70px 20px 20px 20px;
								display: flex;
								align-items: center;
								cursor: pointer;
								.del_img {
									width: 22px;
									height: 22px;
								}
								.del_text {
									margin-left: 10px;
									color: red;
									font-size: 22px;
									font-family:'Roboto-Regular';
								}
							}
						}
					}
				}
			}

		}
	}
</style>
