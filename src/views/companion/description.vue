<template>
	<div class="index">
		<div class="container">
			<!-- Check out 02 弹窗 -->
			<div class="mark_cancel" v-if="update_up == true || status_1 == true || status_2 == true" @click.stop="close_pop">
				<img src="@/assets/images/cancel.png">
			</div>
			<div class="mark_bac" v-if="update_up == true || status_1 == true || status_2 == true"></div>
			<div class="mark_container1" v-if="status_1 == true && pop_index == 1">
				<div class="mark_my_content ">
					<div class="mark_text_one">Confirm to purchase companion</div>
					<div class="mark_text_two">Please select play date</div>
					<div class="content_left_info1">
						<div class="img">
							<el-image :src="HOST + popup_game.avatar" class="avatar_img">
								<div slot="error" class="image-slot"> 
									<img src="../../assets/images/default.png" class="avatar_img"/>
								</div>
							</el-image>
							<!-- <img :src="HOST + popup_game.avatar" v-if="popup_game.avatar"/> -->
						</div>
						<div class="per_info">
							<div class="per_name">
								<p class="user_name">{{popup_game.fullName}}</p>
								<img class="like" v-if="follow == false" src="../../assets/images/like.png" />
								<img class="like" v-else src="../../assets/images/like_a.png"  />
							</div>
							<div class="fire_num">
								<div class="text_price">{{popup_game.price}} <span>{{popup_game.priceUnit}}</span></div>
								<div class="text_hour">/ Per {{popup_game.type}}</div>
							</div>
							<div class="text">Availability Time Slot</div>
							<div class="text_time">
								<img src="../../assets/images/clock.png" />
								<div >{{popup_game.startTime.substring(0,5)}} - {{popup_game.endTime.substring(0,5) }}</div>
							</div>
							<!-- <div class="per_price">
								<p>Follow</p>
								<p>1,093</p>
							</div> -->
						</div>
					</div>
				</div>
				<div class="game_time">
					<div class="date_part">
						<div class="label">Play Date</div>
						<div class="date_picker">
							<el-date-picker v-model="listQuery.dateTime" type="date" placeholder="Choose date" value-format="yyyy-MM-dd" :picker-options="pickerOptions0">
							</el-date-picker>
							<img src="../../assets/images/date.png" class="date_icon" />
						</div>
					</div>
					<div class="time_part">
						<div class="label">Play Time</div>
						<div class="time_picker">
							<el-time-select v-model="listQuery.time" :picker-options="{
							    start:popup_start_time ,
							    step: '00:15',
							    end: popup_end_time
							  }"
							 placeholder="Choose time">
							</el-time-select>
							<img src="../../assets/images/clock_gray.png" class="date_icon" />
						</div>
					</div>
				</div>
				<div class="mark_my_foot">
					<div class="mark_foot_button" @click="swith_league(2)">Purchase</div>
					<div class="mark_foot_button_cancel" @click="swith_league(5)">Cancel</div>
				</div>
			</div>
			<div class="mark_container2" v-if="status_2 == true && pop_index == 2">
				<div class="mark_my_content ">
					<div class="mark_text_one">Confirm to purchase companion</div>
					<div class="content_left_info1">
						<div class="img">
							<el-image :src="HOST + popup_game.avatar" class="avatar_img">
								<div slot="error" class="image-slot"> 
									<img src="../../assets/images/default.png" class="avatar_img"/>
								</div>
							</el-image>
							<!-- <img :src="HOST + popup_game.avatar" v-if="popup_game.avatar"/> -->
							<!-- <img src="../../assets/images/default.png" v-else /> -->
						</div>
						<div class="per_info">
							<div class="per_name">
								<p class="user_name">{{popup_game.fullName}}</p>
								<img class="like" v-if="follow == false" src="../../assets/images/like.png" />
								<img class="like" v-else src="../../assets/images/like_a.png"  />
							</div>
							<div class="fire_num">
								<div class="text_price">{{popup_game.price}} <span>{{popup_game.priceUnit}}</span></div>
								<div class="text_hour">/ Per {{popup_game.type}}</div>
							</div>
							<div class="text">Availability Time Slot</div>
							<div class="text_time">
								<img src="../../assets/images/clock.png" />
								<div class="" >{{ (popup_game.startTime).substring(0,5) }} - {{ (popup_game.endTime).substring(0,5) }}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="table_area">
					<div class="table_header">
						<div class="header_nav">Game Type</div>
						<div class="header_nav">Unit Price</div>
						<div class="header_nav">Quantity</div>
					</div>
					<div class="table_body">
						<div class="body_row">
							<div class="row_col">{{popup_game.gameName}} </div>
							<div class="row_col">{{popup_game.price}}{{popup_game.priceUnit}}</div>
							<div class="row_col">{{ companionGame[game_index].compan_num}}</div>
						</div>
					</div>
				</div>
				<div class="content_table">
					<div class="total_area">
						<div class="label">Total Pay</div>
						<div class="total_value">{{popup_game.price*companionGame[game_index].compan_num}} {{popup_game.priceUnit}}</div>
					</div>
					<div class="net_area">
						<div class="label">Net</div>
						<div class="net_value">
							<img src="../../assets/images/dollar.png" />
							<div class="text">{{popup_game.price*companionGame[game_index].compan_num}} <span>{{popup_game.priceUnit}}</span></div>
						</div>
					</div>
				</div>
				<div class="mark_my_foot">
					<div class="mark_foot_button" @click="swith_league(3)">Check Out</div>
				</div>
			</div>
			<div class="mark_Top_container" v-if="update_up == true && pop_index == 3">
				<div class="mark_my_content ">
					<div class="mark_text_one">Thank you for your order</div>
					<div class="mark_text_two">Please wait for your Companion to accept your order. </div>
					<div class="mark_text_three">Your coins/points will be locked until the transaction is completed before deduction.</div>
				</div>
				<div class="mark_my_foot">
					<div class="mark_foot_button" @click="swith_league(4)">Close</div>
				</div>
			</div>
			<!-- Check out 02 end -->
			<div class="content_left_info">
				<div class="img">
					<el-image :src="HOST + info.avatar" class="avatar_img">
						<div slot="error" class="image-slot"> 
							<img src="../../assets/images/default.png" class="default_img"/>
						</div>
					</el-image>
					<!-- <img :src="HOST + info.avatar" v-if="info.avatar"/> -->
					<!-- <img src="../../assets/images/default.png" v-else /> -->
				</div>
				<div class="per_info">
					<div class="per_name">
						<p class="user_name">{{info.fullName}}</p>
						<img class="like" v-if="follow == false" src="../../assets/images/like.png" />
						<img class="like" v-else src="../../assets/images/like_a.png"  />
					</div>
					<div class="fire_num">
						<img class="fire" src="../../assets/images/huo.png" />
						<p>{{info.popularity}}</p>
					</div>
					<div class="per_price">
						<p>Follow</p>
						<p>{{followList.length}}</p>
					</div>
				</div>
			</div>
			<div class="content_right">
				<div class="right_big_block">
					<div class="img_nav">
						<div :class="game_index == mtex ? 'nav_1 nav_av':'nav_1'" v-for="(mtem,mtex) in companionGame" :key="mtex">
							<el-image :src="HOST + mtem.gameLogo" class="game_img" @click="switch_game(mtex)">
								<div slot="error" class="image-slot"> 
									<img src="../../assets/images/default_game.png" class="game_img" @click="switch_game(mtex)"/>
								</div>
							</el-image>
							<!-- <img :src="HOST + mtem.gameLogo"  @click="switch_game(mtex)" v-if="mtem.gameLogo"/> -->
							<!-- <img src="../../assets/images/default_game.png" v-else @click="switch_game(mtex)"/> -->
						</div>
					</div>
					<div class="content_right_info">
						<div class="top_1">
							<div class="price_hour">
								<p class="price"><span>{{companionGame[game_index].price}}</span>{{companionGame[game_index].priceUnit}}</p>
								<p>/ Per {{companionGame[game_index].type}}</p>
							</div>
							<div class="select_num">
								<div class="reduce_num" @click="reduce">-</div>
								<div class="num">{{ companionGame[game_index].compan_num}}</div>
								<div class="add_num" @click="increase">+</div>
							</div>
						</div>
						<div class="top_2">
							<div class="left_audio">
								<div class="audio"  v-if="companionGame[game_index].soundUrl != ''">
									<audio controls>
									  <!-- https://img.tukuppt.com/newpreview_music/00/10/93/5d819c5a0582950889.mp3 -->
									  <source :src="HOST + companionGame[game_index].soundUrl" type="audio/mpeg">您的浏览器不支持 audio 元素。
									</audio>
								</div>
							</div>
							<div class="chat_buy">
								<button class="chat">
									<img src="../../assets/images/chat.png" />
									Chat
								</button>
								<button class="buy" @click="swith_league(1,companionGame[game_index])">Buy</button>
					
							</div>
						</div>
						<div class="top_3">
							<div class="table">
								<div class="tb_header">
									<p>In Game ID</p>
									<p>In Game Name</p>
									<p>Game Character</p>
									<p>Strength</p>
									<p>Availability Time Slot</p>
								</div>
								<div class="tb_body">
									<p>{{companionGame[game_index].inGameId}}</p>
									<p>{{companionGame[game_index].gameNickname}}</p>
									<p>{{companionGame[game_index].role}}</p>
									<p>{{companionGame[game_index].strength}}</p>
									<p>
										<img src="../../assets/images/yg.png" />
										<span v-if="companionGame[game_index].startTime!= null && companionGame[game_index].endTime  != null">
											{{ (companionGame[game_index].startTime).substring(0,5) }} - {{ (companionGame[game_index].endTime).substring(0,5)}}
										</span> 
										<!-- {{initDete(companionGame[game_index].startTime)}} - {{initDete(companionGame[game_index].endTime)}} -->
									</p>
								</div>
							</div>
							<div class="note_tip">
								<p class="note_tit">Note For User Before Place Order</p>
								<p>{{companionGame[game_index].note}}</p>
							</div>
						</div>
					</div>
					<div class="content_right_info_2">
						<div class="text_info">
							<div class="text_nav">
								<p :class="nav == 1?'acv':''" @click="nav=1">Description</p>
								<p :class="nav == 2?'acv':''" @click="nav=2">Review({{review_list.length}})</p>
							</div>
							<div class="text_block" v-if="nav == 1">
								<div class="text_area">
									<p>{{info.introduction}}</p>
								</div>
							</div>
							<div class="text_blocks" v-if="nav == 2">
								<div class="main" v-for="(item,index) in review_list" :key="index">
									<div class="avatarText">
										<img :src="HOST + item.avatar" alt="" v-if="item.avatar">
										<img src="../../assets/images/default.png" v-else/>
										<span class="avatar_name">{{item.fullName}}</span>
										<span class="create_time">{{initDete(item.createTime).substring(8,10)}}&nbsp;{{monEng(item.createTime)}}，&nbsp;{{initDete(item.createTime).substring(0,4)}}</span>
									</div>
									<div class="star">
										<el-rate v-model="item.score" disabled text-color="#ff9900">
										</el-rate>
									</div>
									<div class="starText">
										<p>{{item.evaluate}}</p>
									</div>
								</div>
								<!-- <div class="main">
									<div class="avatarText">
										<img src="../../assets/images/avatar.png" alt="">
										<span>Jack Lim</span>
										<span>11 July，2021</span>
									</div>
									<div class="star">
										<el-rate
											v-model="value"
											disabled
											text-color="#ff9900">
											</el-rate>
									</div>
									<div class="starText">
										<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
										aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis 
										nisl ut aliquip ex ea commodo consequat. </p>
									</div>
								</div> -->
					
							</div>
						</div>
						
						<div class="img_info" v-if="companionGame[game_index].displayArea != ''">
							<div class="img_info_nav">
								<p>Display Area</p>
							</div>
							<div class="display_area">
								<div class="big_img">
									<img :src="HOST + companionGame[game_index].displayArea[latex].url" />
								</div>
								<div class="small_img">
									<img v-for="(atem,atex) in companionGame[game_index].displayArea" :key="atex" :src="HOST + atem.url" @click="uparea(atex)" />
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
	import {
		reviewList,
		companionDetail,
		companionBuy,
		followAdd,followRemove
	} from '@/api/companion'
	import {
		userInfo
	} from '@/api/user_info.js'
	export default {
		inject:["reload"],
		name: 'app',
		data() {
			return {
				nav: 1,
				value: 3,
				update_up: false,//陪玩弹窗
				status_1: false,//选择陪玩时间的内容
				status_2: false,//查看选择后的陪玩信息
				review_list: [],//评论列表
				monthEnglish: '',//英文的月份
				listQuery: {
					dateTime: '',
					time: ''
				},
				pop_index: 1,
				userId:'',
				info: {}, //基本信息
				companionGame: [] ,//陪玩信息
				game_index:0,
				latex:0, //Display Area 切换index
				add_num:1,
				popup_game:'', //弹窗的数据
				popupQuery:{
					companionGameId:'',
					hours:'',
					startTime:'',
				},
				followList:[],
				yue:true,  // true 余额足够  false  余额不足
				follow:'',
				pickerOptions0: {
					disabledDate(time){
						return time.getTime()  < Date.now() - 8.64e7;
					}
				},
				popup_start_time:'',
				popup_end_time:'',
			}

		},
		mounted() {
			if (this.$route.query.userId != undefined && this.$route.query.userId != '' && this.$route.query.userId != null) {
				this.listQuery.gameId = this.$route.query.gameId
				this.userId = this.$route.query.userId
				this.playDetail(this.userId)
				this.getList()
			}
		},
		methods: {
			// 减
			reduce(){
				if(this.companionGame[this.game_index].compan_num > 1){
					this.companionGame[this.game_index].compan_num --
				}
			},
			// 加
			increase(){
				this.companionGame[this.game_index].compan_num ++
			},
			// 关注用户
			add_follow(userId){
				let params = {
					userId
				}
				followAdd(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.playDetail(userId);
				})
			},
			// 取消关注
			remove_follow(userId){
				let params = {
					userId
				}
				followRemove(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.playDetail(userId);
				})
			},
			// 陪玩信息
			playDetail(userId) {
				let that = this;
				let params = {
					userId
				}
				companionDetail(params).then(res => {
					const {
						info,
						companionGame,
						followList,
						follow
					} = res.data
					that.info = info
					that.followList = followList
					that.follow = follow
					for(let i in companionGame){
						companionGame[i].compan_num = 1
					}
					that.companionGame = companionGame
				})
			},
			// 切换陪玩信息
			switch_game(index) {
				this.game_index = index
			},
			// Display Area 切换
			uparea(index){
				this.latex = index
			},
			// 下陪玩订单
			get_buy(){
				let that = this;
				 let startTTime = this.listQuery.dateTime + ' ' + (this.listQuery.time + ':00')
				let params = {
					companionGameId:this.companionGame[this.game_index].companionGameId,
					startTime:this.initDetes(startTTime),
					hours:this.companionGame[this.game_index].compan_num
				}
				companionBuy(params).then(res => {
					if(res.message == '余额不足' || res.message=='Insufficient balance'){
						// console.log("余额不足")
						that.$message.error(res.message);
						that.pop_index = 2
						// that.update_up = false
						// that.status_1 = false
						// that.status_2 = false
					}else{
						if(res.code == 200){
							this.$message({
								type: 'success',
								message: res.message
							});
							that.listQuery = {
								dateTime: '',
								time: ''
							},
							that.status_2 = false
							that.update_up = true
							this.$emit("topRefresh")	//向父组件发送一个事件
						}else{
							this.$message({
								type: 'error',
								message: res.message
							});
							that.pop_index = 2
						}						
					}
				})
			},
			// 跳转弹窗
			swith_league(index,companionGame) {
				let that  = this;
				if(that.info.userId == sessionStorage.getItem('userId')){
					that.$message({
						type:'warning',
						message:"You cannot purchase own companion's service."//您不能购买自己的陪玩！
					})
				}else{
					if (index == 1) {
						if(companionGame != ''){
							that.popup_game = companionGame
							if((companionGame.startTime == '' || companionGame.startTime == null) && (companionGame.endTime == '' || companionGame.endTime == null) ){
								that.$message({
									type:'warning',
									message:"Please pick other companion as this companion provider not yet complete his/her profile."//该用户的陪玩时间未完善，请购买其他用户的陪玩
								})
							}else{
								that.popup_start_time =  companionGame.startTime.substring(0,5)
								// console.log(companionGame.startTime)
								that.popup_end_time =  companionGame.endTime.substring(0,5) 
								// console.log(companionGame.endTime)
								// console.log(companionGame)
							}
						}
						that.status_1 = true
					} else if (index == 2) {
						if(that.listQuery.dateTime == '' || that.listQuery.time  == ''){
							that.$message({
								message: ' Please pick a date.',//请选择日期时间
								type: 'warning'
							})
							return
						}
						that.status_1 = false
						that.status_2 = true
					} else if (index == 3) {
						that.get_buy();
					} else if (index == 4) {
						that.update_up = false
					} else if (index == 5) {
						that.status_1 = false
					}
					that.pop_index = index
				}
			},
			// 关闭弹窗
			close_pop() {
				// console.log(this.pop_index,"关闭弹窗")
				if (this.pop_index == 1) {
					this.status_1 = false
				} else if (this.pop_index == 2) {
					this.status_2 = false
				} else if (this.pop_index == 3) {
					// this.status_1 = false
					this.status_2 = false
					this.update_up = false
				}else if (this.pop_index == 4) {
					this.status_2 = false
					this.update_up = false
				}
			},
			//陪玩评论列表
			getList() {
				let params = {
					companionId: this.userId
				}
				reviewList(params).then(res => {
					for(let a = 0; a< res.data.list.length;a++){
						res.data.list[a]['fullName'] = ''
					}
					this.review_list = res.data.list
					// console.log(this.initDete(this.review_list[0].createTime))
					for (let i = 0; i < this.review_list.length; i++) {
						let params = {
							userId: this.review_list[i].userId
						}
						userInfo(params).then(res => {
							if (this.review_list[i].userId == res.data.userInfo.userId) {
								this.review_list[i]['fullName'] = res.data.userInfo.fullName
							} else {
							}
						})
					}
				})
			},
			monEng(k) {
				let d = new Date(k);
				// console.log(d.toDateString())
				return d.toDateString().split(" ")[1]
			},
		}

	}
</script>

<style lang="less" scoped>
	.container {
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;
		/* 换行 */
		padding-bottom: 30px;

		// Check out 02弹窗 start
		.mark_cancel {
			position: fixed;
			right: 80px;
			top: 135px;
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
		.mark_Top_container {
			position: fixed;
			left: 520px;
			top: 250px;
			z-index: 999;
			width: 611px;
			padding: 84px 114px 70px 114px;
			background: #0E0F11;
			border-radius: 27px;
			overflow: hidden;
			display: flex;
			flex-flow: column;
			align-items: center;

			.mark_my_content {
				width: 100%;
				text-align: center;
				margin-bottom: 80px;

				.mark_text_one {
					color: #DBA83F;
					font-size: 24px;
					margin-bottom: 20px;
				}

				.mark_text_two {
					color: #989898;
					font-size: 20px;

					span {
						color: #EDEDED;
						font-weight: bold;
					}
				}

				.mark_text_three {
					color: #989898;
					font-size: 20px;
					margin: 15px 0 0 0;
				}
			}

			.mark_my_foot {
				.mark_foot_button {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 163px;
					height: 58px;
					color: #0E0F11;
					cursor: pointer;
					font-size: 18px;
					background: #DBA83F;
					border-radius: 25px;
				}
			}
		}

		//Check out 02弹窗  end
		.mark_container1 {
			position: absolute;
			left: 357px;
			top: 100px;
			z-index: 999;
			width: 850px;
			background: #0E0F11;
			border-radius: 27px;
			overflow: hidden;
			margin: 0 auto;
			display: flex;
			flex-flow: column;
			align-items: center;
			justify-content: center;

			.mark_my_content {
				width: 100%;
				text-align: center;
				margin-bottom: 0;
				padding-top: 44px;
				.mark_text_one {
					color: #DBA83F;
					font-size: 24px;
					margin-bottom: 20px;
				}
				.mark_text_two {
					color: #989898;
					font-size: 20px;
				}

				.content_left_info1 {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 40px 120px;
					.img {
						width: 40%;
						.avatar_img {
							width: 206px;
							height: 206px;
							border-radius: 36px;
							object-fit: cover;
							.default_img{
								width: 206px;
								height: 206px;
							}
						}
					}

					.per_info {
						width: 40%;
						.per_name {
							display: flex;
							align-items: center;
							justify-content: space-between;
							color: #FFFFFF;
							font-size: 22px;
							p {
								margin: 0;
							}
							.user_name{
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								font-family:'Roboto-Medium';
							}
							.like {
								width: 31px;
								height: 28px;
							}
						}

						.fire_num {
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 10px;
							// padding: 16px 23px 0;
							color: #D3AA53;
							font-size: 18px;
							font-family:'Roboto-Regular';
							.text_price {
								color: #D3AA53;
								font-size: 30px;

								span {
									color: #D3AA53;
									font-size: 18px;
								}
							}

							.text_hour {}
						}

						.text {
							text-align: left;
							color: #727272;
							font-size: 18px;
							margin: 15px 0 10px;
						}

						.text_time {
							display: flex;
							align-items: center;
							color: #FFFFFF;
							font-size: 18px;

							img {
								width: 20px;
								height: 20px;
								margin-right: 10px;
							}
						}
					}
				}
			}

			.game_time {
				width: 100%;
				height: 202px;
				background-color: #000000;
				margin-bottom: 20px;
				display: flex;
				align-items: center;
				justify-content: center;

				.date_part {
					margin-right: 50px;

					.label {
						margin-left: 10px;
						margin-bottom: 10px;
						color: #727272;
						font-size: 18px;
					}

					.date_picker {
						width: 210px;
						height: 45px;
						display: flex;
						align-items: center;
						margin-left: 10px;
						font-size: 14px;
						background-color: #1D2023;
						border-radius: 10px;

						/deep/ .el-date-editor {
							width: 170px;
							background-color: #1D2023;
							font-size: 14px;
							border-radius: 15px;
							background-color: #1D2023;
						}

						/deep/ .el-input {
							border-radius: 15px;
							background-color: #1D2023;
						}

						/deep/ .el-input__inner {
							height: 44px;
							background-color: #1D2023;
							border: none;
							color: rgba(255, 255, 255, 0.65);
							margin-left: 10px;
						}

						/deep/ .el-input__prefix .el-input__icon {
							color: #1D2023;
							border-radius: 10px;
						}

						/deep/.el-date-editor .el-range-separator {
							color: rgba(255, 255, 255, 0.65);
						}

						.date_icon {
							width: 20px;
							height: 20px;
							// margin-right: 10px;
							margin: 0 10px 0 15px;
						}
					}
				}

				.time_part {
					.label {
						margin-left: 10px;
						margin-bottom: 10px;
						color: #727272;
						font-size: 18px;
					}

					.time_picker {
						width: 210px;
						height: 45px;
						display: flex;
						align-items: center;
						margin-left: 10px;
						font-size: 14px;
						background-color: #1D2023;
						border-radius: 10px;

						/deep/ .el-date-editor {
							width: 170px;
							background-color: #1D2023;
							font-size: 14px;
							border-radius: 15px;
							background-color: #1D2023;
						}

						/deep/ .el-input {
							border-radius: 15px;
							background-color: #1D2023;
						}

						/deep/ .el-input__inner {
							height: 44px;
							background-color: #1D2023;
							border: none;
							color: rgba(255, 255, 255, 0.65);
							margin-left: 10px;
						}

						/deep/ .el-input__prefix .el-input__icon {
							color: #1D2023;
							border-radius: 10px;
						}

						/deep/.el-date-editor .el-range-separator {
							color: rgba(255, 255, 255, 0.65);
						}

						.date_icon {
							width: 20px;
							height: 20px;
							margin: 0 10px 0 15px;
						}
					}
				}
			}

			.mark_my_foot {
				margin: 30px 0 60px;
				display: flex;
				align-items: center;

				.mark_foot_button {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 163px;
					height: 58px;
					color: #0E0F11;
					cursor: pointer;
					font-size: 18px;
					background: #DBA83F;
					border-radius: 25px;
				}

				.mark_foot_button_cancel {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 163px;
					height: 58px;
					background-color: #0E0F11;
					color: #FFFFFF;
					border: 1px solid #777777;
					border-radius: 25px;
					font-size: 18px;
					margin-left: 20px;
				}
			}
		}

		.mark_container2 {
			position: absolute;
			left: 357px;
			top: 100px;
			z-index: 999;
			width: 850px;
			// padding: 44px 114px 70px 114px;
			background: #0E0F11;
			border-radius: 27px;
			overflow: hidden;
			margin: 0 auto;
			display: flex;
			flex-flow: column;
			align-items: center;
			justify-content: center;

			.mark_my_content {
				width: 100%;
				text-align: center;
				margin-bottom: 0;
				padding-top: 44px;

				// padding: 44px 114px 0px 114px;
				// background-color: #fff000;
				// margin-bottom: 80px;
				.mark_text_one {
					color: #DBA83F;
					font-size: 24px;
					margin-bottom: 20px;
				}

				.mark_text_two {
					color: #989898;
					font-size: 20px;
				}

				.content_left_info1 {
					display: flex;
					align-items: center;
					justify-content: space-between;
					// margin-top: 40px;
					margin: 40px 120px;

					// background-color: #FFF000;
					.img {
						width: 40%;

						// background-color: #00FF00;
						.avatar_img {
							width: 206px;
							height: 206px;
							border-radius: 36px;
							object-fit: cover;
							.default_img{
								width: 206px;
								height: 206px;
							}
						}
					}

					.per_info {
						width: 40%;
						// padding: 16px 23px 0;
						// background-color: #FF0000;

						// margin: 40px auto 10px;
						.per_name {
							display: flex;
							align-items: center;
							justify-content: space-between;
							color: #FFFFFF;
							font-size: 22px;
							.user_name{
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								font-family:'Roboto-Medium';
							}
							// padding: 16px 23px 0;
							p {
								margin: 0;
							}

							.like {
								width: 31px;
								height: 28px;
							}
						}

						.fire_num {
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 10px;
							// padding: 16px 23px 0;
							color: #D3AA53;
							font-size: 18px;
							font-family:'Roboto-Regular';
							.text_price {
								color: #D3AA53;
								font-size: 30px;

								span {
									color: #D3AA53;
									font-size: 18px;
								}
							}

							.text_hour {}
						}

						.text {
							text-align: left;
							color: #727272;
							font-size: 18px;
							margin: 15px 0 10px;
						}

						.text_time {
							display: flex;
							align-items: center;
							color: #FFFFFF;
							font-size: 18px;

							img {
								width: 20px;
								height: 20px;
								margin-right: 10px;
							}
						}
					}

					//.per_info
				}
			}

			.table_area {
				width: 100%;

				.table_header {
					background-color: #27292D;
					display: flex;
					align-items: center;
					justify-content: center;

					.header_nav {
						width: 25%;
						color: #898989;
						font-size: 18px;
						line-height: 60px;

						// margin-right: 80px;
						// background-color: #D35400;
						&:first-child {
							width: 25%;
							// margin-right: 150px;
							// background-color: #D08770;
						}

						&:last-child {
							width: 15%;
							// background-color: #D19A66;
							// margin-right: 0;
						}
					}
				}

				.table_body {
					.body_row {
						display: flex;
						align-items: center;
						justify-content: center;

						.row_col {
							width: 25%;
							color: #FFFFFF;
							font-size: 18px;
							line-height: 60px;

							// margin-right: 80px;
							// background-color: #D35400;
							&:first-child {
								width: 25%;
								// margin-right: 150px;
								// background-color: #D08770;
							}

							&:last-child {
								width: 15%;
								// background-color: #D19A66;
								// margin-right: 0;
							}
						}
					}
				}
			}

			.content_table {
				width: 70%;
				border-radius: 19px;
				background-color: #000000;
				padding: 20px 30px;
				margin-top: 50px;

				.total_area {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #313538;
					line-height: 60px;

					.label {
						color: #727272;
						font-size: 20px;
						margin-left: 20px;
					}

					.total_value {
						color: #FFFFFF;
						font-size: 22px;
						margin-right: 25px;
					}
				}

				.net_area {
					display: flex;
					align-items: center;
					justify-content: space-between;
					line-height: 60px;

					.label {
						color: #FFFFFF;
						font-size: 22px;
						margin-left: 20px;
					}

					.net_value {
						display: flex;
						align-items: center;
						margin-right: 25px;

						img {
							width: 27px;
							height: 31px;
						}

						.text {
							color: #D3AA53;
							font-size: 26px;

							span {
								font-size: 22px;
							}
						}
					}
				}
			}

			.mark_my_foot {
				// width: 70%;
				width: 75%;
				margin: 60px 0;

				.mark_foot_button {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					// width: 163px;
					height: 69px;
					color: #0E0F11;
					cursor: pointer;
					font-size: 18px;
					background: #DBA83F;
					border-radius: 9px;
				}
			}
		}

		//Check out 02弹窗  end

		.content_left_info {
			width: 318px;
			height: 465px;
			background: #0E0F11;
			border-radius: 36px;
			margin-top: 45px;
			.img {
				width: 70%;
				height: 249px;
				overflow: hidden;
				display: flex;
				align-items: center;
				margin: 0 auto 35px;
				position: relative;
				top: 30px;
				border-radius: 36px;

				.avatar_img {
					max-width: 100%;
					height: 249px;
					object-fit: cover;
					border-radius: 36px;
					.default_img{
						width: 100%;
						height: 249px;
						// background-color: #F0C78A;
					}
				}
			}

			.per_info {
				width: 90%;
				margin: 40px auto 10px;

				.per_name {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #FFFFFF;
					font-size: 22px;
					padding: 16px 23px 0;
					.user_name{
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-family:'Roboto-Medium';
					}
					p {
						margin: 0;
					}

					.like {
						width: 31px;
						height: 28px;
					}
				}

				.fire_num {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 10px;
					padding: 16px 23px 0;
					font-family:'Roboto-Regular';
					.fire {
						width: 17px;
						height: 21px;
						margin-right: 10px;
					}

					p {
						margin: 0;
						color: #727272;
						font-size: 18px;
					}
				}

				.per_price {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #727272;
					font-size: 18px;
					padding: 16px 23px 0;
					margin-top: 10px;

					p {
						margin: 0;
					}

					.dollar {
						width: 17px;
						height: 21px;
						background-color: #FFFFFF;
						border-radius: 13px;
						margin-right: 10px;
					}

					.price_hour {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						span {
							font-size: 25px;
							margin-right: 5px;
						}
					}
				}
			}

			//.per_info
		}

		.content_right {
			width: calc(100% - 370px);
			margin-top: 45px;
			.right_big_block{
				.img_nav {
					display: flex;
					margin-left: 80px;
					.nav_1 {
						width: 73px;
						height: 90px;
						margin-right: 71px;
						cursor: pointer;
						.game_img {
							width: 74px;
							height: 75px;
						}
					}
					.nav_av{
						border-bottom: 1px solid #D3AA53;
						cursor: pointer;
					}
				}
				.content_right_info {
					width: calc(100%-60px);
					height: 501px;
					background: #0E0F11 0% 0% no-repeat padding-box;
					border-radius: 38px;
					font-family:'Roboto-Regular';
					.top_1 {
						color: #D3AA53;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-left: 85px;
						padding-top: 30px;
						.price_hour {
							width: 50%;
							display: flex;
							align-items: center;
							font-size: 18px;
							.price {
								margin-right: 60px;
								span {
									font-size: 30px;
									margin-right: 10px;
								}
							}
						}
						.select_num {
							height: 59px;
							font-size: 25px;
							display: flex;
							margin-right: 55px;
							.reduce_num {
								width: 59px;
								height: 59px;
								background: #2D2D2D 0% 0% no-repeat padding-box;
								cursor: pointer;
								display: flex;
								align-items: center;
								justify-content: center;
							}
				
							.num {
								width: 99px;
								height: 59px;
								border: 1px solid #2D2D2D;
								color: #FFFFFF;
								display: flex;
								align-items: center;
								justify-content: center;
							}
				
							.add_num {
								width: 59px;
								height: 59px;
								background: #2D2D2D 0% 0% no-repeat padding-box;
								display: flex;
								align-items: center;
								justify-content: center;
								cursor: pointer;
							}
						}
					}
					.top_2 {
						display: flex;
						justify-content: space-between;
						margin-left: 85px;
						margin-top: 33px;
				
						.left_audio {
							// width: 195px;
							// height: 58px;
							// background: #444444;
							// border-radius: 29px;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.audio {
								display: flex;
								img {
									width: 20px;
									height: 20px;
								}
							}
						}
						.chat_buy {
							display: flex;
							margin-right: 55px;
							font-family:'Roboto-Regular';
							.chat {
								width: 163px;
								height: 58px;
								background: #1D2023;
								border: 2px solid #1D2023;
								border-radius: 25px;
								color: #D3AA53;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
								cursor: pointer;
				
								img {
									margin-right: 5px;
								}
							}
							.buy {
								width: 163px;
								height: 58px;
								background: #D3AA53;
								border: 1px solid #D3AA53;
								border-radius: 25px;
								margin-left: 15px;
								font-size: 18px;
								cursor: pointer;
							}
						}
					}
					.top_3 {
						.table {
							height: 116px;
							background: #000000;
							margin-top: 46px;
				
							.tb_header {
								display: flex;
								color: #727272;
								font-size: 20px;
								padding-left: 73px;
								padding-right: 75px;
								padding-top: 29px;
								p {
									width: 20%;
									margin: 0;
								}
							}
							.tb_body {
								display: flex;
								color: #FFFFFF;
								font-size: 20px;
								padding-left: 73px;
								padding-right: 75px;
								margin-top: 5px;
				
								p {
									width: 20%;
									margin: 0;
								}
							}
						}
						.note_tip {
							color: #727272;
							font-size: 20px;
							margin-top: 43px;
							margin-left: 85px;
				
							.note_tit {
								color: #FFFFFF;
								font-size: 22px;
								font-family:'Roboto-Medium';
							}
						}
					}
				}
				.content_right_info_2 {
					width: calc(100%-60px);
					margin-top: 50px;
					.text_info {
						.text_nav {
							color: #727272;
							font-size: 20px;
							display: flex;
							margin-left: 40px;
				
							p {
								margin-right: 93px;
								cursor: pointer;
								font-family:'Roboto-Regular';
							}
				
							.acv {
								color: #FFFFFF;
								font-family: 'Roboto-Bold';
							}
						}
						.text_block {
							padding-bottom: 80px;
							background: #0E0F11 0% 0% no-repeat padding-box;
							border-radius: 25px;
				
							.text_area {
								width: 80%;
								text-align: left;
								color: #727272;
								margin-left: 50px;
								padding-top: 49px;
								font-family:'Roboto-Regular';
								font-size: 20px;
							}
				
						}
						.text_blocks {
							padding: 30px;
							padding-bottom: 80px;
							background: #0E0F11 0% 0% no-repeat padding-box;
							border-radius: 25px 0 0 25px;
							overflow-y: scroll;
							height: 340px;
				
							.main {
								width: 100%;
								display: inline-block;
								border-bottom: 1px solid #2B2C2D;
								margin-bottom: 20px;
				
								.avatarText {
									display: inline-block;
				
									img {
										width: 60px;
										height: 60px;
										float: left;
									}
				
									span {
										display: inline-block;
										color: #D3AA53;
										margin-left: 30px;
										margin-top: 20px;
				
										&:nth-child(3) {
											color: #727272;
										}
									}
									.avatar_name{
										font-family:'Roboto-Bold';
										font-size: 22px;
									}
									.create_time{
										font-size: 20px;
									}
								}
				
								.star {
									margin: 20px;
									float: right;
								}
				
								.starText {
									color: #727272;
									font-family:'Roboto-Regular';
									p{
										word-wrap: break-word;
										white-space: pre-wrap;
										font-size: 20px;
									}
								}
							}
				
							&::-webkit-scrollbar {
								/*滚动条整体样式*/
								width: 13px;
								/*高宽分别对应横竖滚动条的尺寸*/
								height: 1px;
							}
				
							&::-webkit-scrollbar-thumb {
								/*滚动条里面小方块*/
								border-radius: 10px;
								box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
								// background   : #535353;
								background: #000000;
							}
				
							&::-webkit-scrollbar-track {
								/*滚动条里面轨道*/
								box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
								border-radius: 10px;
								background: #2D2D2D;
							}
						}
					}
					.img_info {
						margin-top: 46px;
				
						.img_info_nav {
							color: #727272;
							font-size: 20px;
							margin-left: 50px;
							font-family:'Roboto-Regular';
						}
				
						.display_area {
							margin-left: 30px;
				
							.big_img {
								width: 677px;
								height: 383px;
				
								img {
									width: 677px;
									height: 383px;
								}
							}
				
							.small_img {
								display: flex;
								margin-top: 36px;
								cursor: pointer;
				
								img {
									width: 154px;
									height: 87px;
									margin-right: 25px;
								}
				
								.img_acv {
									border: 3px solid #D3AA53;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
