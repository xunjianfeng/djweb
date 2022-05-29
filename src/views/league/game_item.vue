<template>
	<div class="index">
		<div class="container">
			<!-- 非公开房间输入密码 -->
			<div class="mark_passwod">
				<div class="mark_cancel" v-if="update_up == true" @click.stop="update_up = false,password = ''">
					<img src="@/assets/images/cancel.png">
				</div>
				<div class="mark_bac" v-if="update_up == true"></div>
				<div class="mark_Top_container" v-if="update_up == true">
					<div class="mark_my_content ">
						<div class="mark_text_one">{{roomName}}</div>
						<div class="mark_text_two">Please key in password to join</div>
						<div class="input_password">
							<input placeholder="Please key in room's password" v-model="password" />
						</div>
					</div>
					<div class="mark_my_foot">
						<div class="enter_btn" @click="open_ws">Enter</div>
						<div class="back_btn" @click.stop="update_up = false,password = ''">Back</div>
					</div>
				</div>
			</div>
			<!-- 内容区 -->
			<div class="content">
				<div class="choice_left">
					<div class="date_date">{{gameName}}</div>
				</div>
				<div class="content_block">
					<div class="search_area">
						<div class="status">
							<p class="status_text">Type</p>
							<div class="options">
								<el-select v-model="listQuery.isPublic" placeholder="Please select" style="margin-right: 20px;"
									:popper-append-to-body="false" @change="handleFilter">
									<el-option label="All" value=""></el-option>
									<el-option label="Private" value="false"></el-option>
									<el-option label="Public" value="true"></el-option>
								</el-select>
							</div>
						</div>
						<div class="sort_by">
							<p class="sort_by_text">Fee</p>
							<div class="options">
								<el-select v-model="listQuery.roomFee" placeholder="Please select" style="margin-right: 20px;"
									:popper-append-to-body="false" @change="handleFilter">
									<el-option label="All" value=""></el-option>
									<el-option label="Highest fee" value="1"></el-option>
									<el-option label="Lowest fee" value="2"></el-option>
								</el-select>
								<!-- <el-select v-model="listQuery.roomFee" placeholder="请选择" style="margin-right: 20px;"
								 :popper-append-to-body="false" @change="handleFilter">
									<el-option :label="ftem.fee" :value="ftem.key" v-for="(ftem,fndex) in all_fee"></el-option>
								</el-select> -->
							</div>
						</div>
					</div>
					<!-- 没有数据 -->
					<div class="no_data_area" v-if="room_list == ''">
						<div class="no_data">
							<img src="../../assets/images/no_tournament.svg" />
							<div class="no_data_text">No any data</div>
						</div>
					</div>
					<div class="block_card_list" v-if="room_list != ''">
						<div class="block_card" v-for="(rtem,rndex) in room_list"
							@click.stop="rtem.isPublic == true ? jump_room(1,rtem) : jump_room(2,rtem)">
							<div class="card_top">
								<div class="card_name">{{rtem.roomName}}</div><!-- Clarity Inhouse Ladder 1 -->
								<div class="mode">{{rtem.gameMode}}</div><!-- Leader mode< -->
							</div>
							<div class="card_center">
								<div class="card_time">{{rtem.planningPlayTime}}</div><!-- 10 July, 2021 / 8:00 pm -->
								<el-tooltip class="item" effect="dark" :content="rtem.host.hostName" placement="bottom">
									<div class="level_limit">Level {{rtem.host.level}} host - {{rtem.host.hostName}}
									</div>
								</el-tooltip>
							</div>
							<div class="card_bottom">
								<div class="add_num">{{rtem.players || 0}}/{{rtem.capacity || 0}}</div>
								<div class="add_coin">{{rtem.fee}} Coins</div>
								<div class="add_way">
									<img v-if="rtem.isPublic == true" src="../../assets/images/open_lock.svg" />
									<!-- public -->
									<img v-if="rtem.isPublic == false" src="../../assets/images/lock.png" />
									<!-- private -->
									<div class="text">{{rtem.isPublic == true ? 'Public' :'Private'}}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="order_pagination">
						<pagination v-if="total_count_room>0" :total="total_count_room" :page.sync="listQuery.page"
							:limit.sync="listQuery.size" @pagination="handlePageChange" />
					</div>
				</div>
			</div>
			<div class="content_bottom">
				<div class="rapic_head">
					<div class="rapic_head_tit">Request host for a game</div>
				</div>
				<div class="search_area">
					<div class="text">If you prefer a private game with our host, just search for your host name and
						chat with them to ask for a private game creation. Enjoy your game!</div>
					<div class="search">
						<input placeholder="Search Host Name" v-model="listQuery.hostName" />
						<button class="btn" @click="handleFilter">
							<img src="@/assets/images/search.png" />
						</button>
					</div>
				</div>
				<div class="user_area">
					<!-- 没有数据 -->
					<div class="no_data_area" v-if="host_list == ''">
						<div class="no_data">
							<img src="../../assets/images/no_tournament.svg" />
							<div class="no_data_text">No any data</div>
						</div>
					</div>
					<div class="user_list" v-for="(item,index) in host_list">
						<div class="avatar">
							<img :src="HOST + item.userInfo.avatar" v-if="item.userInfo.avatar"/>
							<img src="../../assets/images/default.png" v-else />
							<div class="point"></div>
						</div>
						<div class="user_info_area">
							<el-tooltip class="item" effect="dark" :content="item.userInfo.fullName" placement="bottom">
								<div class="user_name">{{item.userInfo.fullName}}</div>
							</el-tooltip>
							<div class="level">Level {{item.level}}</div>
							<div class="game_area">{{item.hostedGames}}</div>
						</div>
					</div>
				</div>
				<div class="pagnationBox">
					<pagination v-if="total_count>0" :total="total_count" :page.sync="listQuery.page"
						:limit.sync="listQuery.size" @pagination="handlePageChange" />
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import PaginationWall from '@/components/Pagination/wallet.vue';
	import {
		hostList,
		hostRoomList,
		getAllRoomFee
	} from '@/api/league.js'
	import Pagination from '@/components/Pagination/index.vue';
	import Listing from '@/mixin/Listing';
	export default {
		name: "game_item",
		mixins: [Listing],
		components: {
			PaginationWall,
			Pagination
		},
		data() {
			return {
				path: "ws://$HOST:$PORT/rc/lobby",
				socket: "",
				websock: null,
				update_up: false,
				gameName: '',
				listQuery: {
					gameId: this.$route.query.gameId,
					roomFee: '',
					isPublic: '',
					//主持人列表筛选
					hostName: '',
					// gameId:'',
					page: 1,
					size: 10
				},
				host_list: [],
				room_list: [],
				room_index: 1,
				host_index: 1,
				total_count: 0,
				password: '',
				roomId: '',
				total_count_room: 0,
				all_fee: [],
				user_list: [{
					id: 1,
					avatar: require("../../assets/images/bac17.png"),
					userName: "Jessica Liong",
					level: 1,
					game_area: 'Dota 2 / CS Go / PUBG'
				}, ],
				token: '',
				userId: '',
				roomName: ''
			}
		},
		mounted() {
			this.gameName = this.$route.query.gameName
			this.listQuery.gameId = this.$route.query.gameId
			// console.log(this.gameId,"gameId")
			// console.log(this.gameName,"gameName")
			// setTimeout(()=>{
			// 	this.getList()
			// },1000)
			this.getAllRoomFee()
			this.token = sessionStorage.getItem("token")
		},
		methods: {
			// 获取所有房费
			getAllRoomFee() {
				getAllRoomFee().then(res => {
					this.all_fee = res.data
				})
			},
			getList() {
				if (this.room_index == 1) {
					//分页查询匹配中的房间
					hostRoomList(this.listQuery).then(res => {
						this.room_list = res.data.list
						this.total_count_room = res.data.total
					})
				}
				if (this.host_index == 1) {
					//分页查询主持人
					hostList(this.listQuery).then(res => {
						this.host_list = res.data.list
						this.total_count = res.data.total
					})
				}

			},
			// 筛选
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
			open_ws() {
				// 打开
				let Authorization = "Bearer" + this.token;
				// let Authorization = this.token;
				//测试服
				// const ws = new WebSocket("ws://13.212.212.253/game/api/rc/lobby?roomId="+this.roomId+"&password="+this.password,Authorization)
				// 正式服
				const ws = new WebSocket("wss://api.bountee.com.my/api/rc/lobby?roomId=" + this.roomId + "&password=" + this.password, Authorization)
				//慢慢
				// const ws = new WebSocket("ws://n1-03.qjun.com.cn:17780/rc/lobby?roomId="+this.roomId+"&password="+this.password,Authorization)
				ws.onopen = e => {
					// 连接后监听
					// console.log(`WebSocket 连接状态： ${ws.readyState}`)
				}
				ws.onmessage = data => {
					// 获取后端的内容
					console.log(data,"data")
					let arr = JSON.parse(data.data)
					console.log(arr)
					if (arr.message == "OK") {
						ws.close()
						this.$router.push({
							path: '/league/room_item',
							query: {
								gameId: this.gameId,
								roomId: this.roomId,
								password: this.password,
								userId: this.userId
							}
						})
						this.password = ''
					} else {
						this.$message({
							message: arr.message,
							// message: '密码错误',
							type: 'warning'
						});
					}
				}
				ws.onclose = data => {
					// 监听连接关闭   
					// 关闭
					// this.$message({
					// 	// message: arr.message,
					// 	message: '密码错误',
					// 	type: 'warning'
					// });
					// console.log(data)
					// console.log("WebSocket连接已关闭")
					// console.log(data);
				}
				ws.onerror = function() {
					// 报错
					// Message.error('ws连接异常，请稍候重试')
					errorCallback()
				}
				// sendBtn.onclick = () => {
				// 获取你自己填写的内容，传给后端，  （）里面就是你要给后端的内容
				// 点击发送按钮。将数据发送给服务端
				// ws.send(1)
				// }
				// exit.onclick = () => {

				// 客户端主动关闭连接
				// ws.close()
				// }
			},

			jump_room(index, item) {
				this.roomId = item.roomId
				this.userId = item.host.userId
				this.roomName = item.roomName
				if (index == 1) {
					this.open_ws()
					// this.$router.push({path: '/league/room_item'})
				} else if (index == 2) {
					// this.init()
					// this.initWebSocket()
					this.update_up = true
					// this.roomId = roomId
				}
			},
		},

	}
</script>

<style lang="less" scoped>
	.container {
		width: calc(100% - 140px);
		padding-bottom: 30px;
		margin-left: 70px;

		// background-color: #0E0F11;
		// height: 100%;
		// border-radius: 20px
		.mark_passwod {

			// Complete 弹窗
			.mark_cancel {
				position: fixed;
				right: 80px;
				top: 125px;

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
				// left: 357px;
				top: 290px;
				z-index: 999;
				width: 580px;
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
						font-family: 'Quicksand-Bold';
					}

					.mark_text_two {
						color: #989898;
						font-size: 18px;
						font-family: 'Roboto-Regular';
						margin-top: 45px;
					}

					.input_password {
						margin-top: 15px;

						input {
							width: 462px;
							height: 59px;
							background-color: #0E0F11;
							border: 2px solid #2D2D2D;
							border-radius: 10px;
							font-family: 'Roboto-Regular';
							color: #FFFFFF;
							font-size: 20px;
							text-align: center;
						}

						input::-webkit-input-placeholder {
							color: #ffffff;
							font-family: 'Roboto-Regular';
						}
					}
				}

				.mark_my_foot {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					.enter_btn {
						width: 163px;
						height: 58px;
						line-height: 58px;
						background-color: #DBA83F;
						border-radius: 25px;
						text-align: center;
						color: #000;
						font-size: 18px;
						font-family: 'Roboto-Regular';
						cursor: pointer;
					}

					.back_btn {
						width: 163px;
						height: 58px;
						line-height: 58px;
						border: 1px solid #777777;
						border-radius: 25px;
						text-align: center;
						color: #fff;
						font-size: 18px;
						margin-left: 20px;
						font-family: 'Roboto-Regular';
						cursor: pointer;
					}
				}
			}

			//end
		}

		.content {
			margin-top: 46px;

			.choice_left {
				display: flex;
				align-items: center;
				border-bottom: 2px solid #2D2D2D;
				padding-bottom: 32px;

				.date_date {
					color: #FFFFFF;
					font-size: 24px;
					font-family: 'Quicksand-Bold';
				}
			}

			.content_block {
				margin-top: 40px;

				.search_area {
					display: flex;

					.status {
						.status_text {
							font-size: 18px;
							text-align: left;
							letter-spacing: 0px;
							color: #727272;
							font-family: 'Roboto-Regular';
						}

						img {
							width: 50px;
							height: 10px;
						}
					}

					.sort_by {
						.sort_by_text {
							font-size: 18px;
							text-align: left;
							letter-spacing: 0px;
							color: #727272;
							font-family: 'Roboto-Regular';
						}
					}

					div {
						margin-right: 20px;

						.options {
							.dropdown2 {
								width: 10px;
								height: 8px;
								position: relative;
								right: 30px;
							}

							position: relative;

							.dropdown {
								width: 10px;
								height: 8px;
								position: absolute;
								right: 30px;
								top: 45%;
							}

							select {
								/*取消默认箭头开始*/
								appearance: none;
								-moz-appearance: none;
								-webkit-appearance: none;
								/*取消默认箭头结束*/
								width: 225px;
								height: 59px;
								background-color: #0E0F11;
								color: #ffffff;
								border-radius: 20px;
								opacity: 1;
								border: none;
								font-family: 'Roboto-Regular';
								font-size: 18px;
								padding-left: 20px;
								padding-right: 20px;
							}

							/deep/ .el-select .el-input .el-input__inner {
								border: 0px;
								width: 230px;
								height: 59px;
								color: #fff;
								font-family: 'Roboto-Regular';
								border-radius: 20px;
								background-color: #0E0F11;
								border: 1px solid #0E0F11;
							}

							/deep/ .el-select-dropdown {
								background-color: #0E0F11;
								border: 1px solid rgba(255,255,255,0.2);
							}

							/deep/ .el-icon-arrow-up:before {
								content: "\e78f";
							}

							/deep/ .el-icon-arrow-down:before {
								content: "\e790";
							}

							//修改单个的选项的样式
							/deep/ .el-select-dropdown__item {
								background-color: transparent;
								color: #fff;
								font-family: 'Roboto-Regular';
								text-align: center;
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

				.no_data_area {
					width: 100%;
					height: 350px;
					display: flex;
					align-items: center;
					justify-content: center;

					.no_data {
						text-align: center;

						img {}

						.no_data_text {
							color: #565656;
							font-size: 20px;
							font-family: 'Roboto-Regular';
							margin-top: 20px;
						}
					}
				}

				.block_card_list {
					margin-top: 30px;
					display: flex;
					flex-wrap: wrap;

					.block_card {
						width: 389px;
						height: 203px;
						background: #000000;
						border-radius: 14px 16px 16px 14px;
						padding: 22px 33px;
						margin: 0 21px 30px 0;
						cursor: pointer;

						.card_top {
							margin-bottom: 30px;

							.card_name {
								color: #FFFFFF;
								font-family: 'Roboto-Medium';
								font-size: 22px;
								margin-bottom: 5px;
							}

							.mode {
								color: #DBA83F;
								font-size: 18px;
								font-family: 'Roboto-Medium';
							}
						}

						.card_center {
							color: #727272;
							font-size: 18px;
							font-family: 'Roboto-Regular';
							margin-bottom: 45px;

							.card_time {
								// color: #727272;
								margin-bottom: 5px;
							}

							.level_limit {
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}

						.card_bottom {
							display: flex;
							align-items: center;
							color: #FFFFFF;
							font-size: 18px;
							font-family: 'Roboto-Regular';

							.add_num {
								width: 30%;
							}

							.add_coin {
								width: 30%;
							}

							.add_way {
								width: 30%;
								display: flex;
								align-items: flex-end;

								img {
									width: 18px;
									height: 26px;
								}

								.text {
									margin-left: 9px;
								}
							}
						}
					}
				}

				.order_pagination {
					display: flex;
					justify-content: center;
				}
			}
		}

		.content_bottom {
			.rapic_head {
				// text-align: center;
				margin: 84px 0 6px;

				.rapic_head_tit {
					color: #DBA83F;
					font-size: 24px;
					font-weight: bold;
					font-family: 'Quicksand-Bold';
				}
			}

			.search_area {
				width: 99%;
				display: flex;
				align-items: flex-end;
				justify-content: space-between;

				// background-color: #FF4D51;
				.text {
					width: 50%;
					text-align: left;
					color: #979797;
					font-family: 'Roboto-Regular';
					font-size: 18px;
				}

				.search {
					input {
						width: 315px;
						height: 60px;
						background: #0E0F11 0% 0% no-repeat padding-box;
						border-radius: 23px;
						font-size: 18px;
						border: none;
						padding-left: 35px;
						color: #ffffff;
						font-family: 'Roboto-Regular';
					}

					.btn {
						width: 60px;
						height: 60px;
						background: #D3AA53 0% 0% no-repeat padding-box;
						border: none;
						border-radius: 23px;
						opacity: 1;
						position: relative;
						right: 60px;
						font-family: 'Roboto-Regular';
						cursor: pointer;

						img {
							width: 22px;
							height: 22px;
						}
					}
				}
			}

			.user_area {
				width: 93%;
				margin-top: 40px;
				background-color: #000000;
				border-radius: 25px;
				padding: 35px 0px 0 46px;
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				.no_data_area {
					width: 100%;
					height: 350px;
					display: flex;
					align-items: center;
					justify-content: center;

					.no_data {
						text-align: center;

						img {}

						.no_data_text {
							color: #565656;
							font-size: 20px;
							font-family: 'Roboto-Regular';
							margin-top: 20px;
						}
					}
				}

				.user_list {
					// background-color: #F0C674;
					width: 25%;
					display: flex;
					align-items: center;
					// margin-right: 60px;
					margin-bottom: 55px;

					.avatar {
						width: 78px;
						height: 78px;
						border-radius: 19px;
						position: relative;

						img {
							width: 78px;
							height: 78px;
							border-radius: 19px;
						}

						.point {
							position: absolute;
							bottom: -5px;
							right: -5px;
							width: 18px;
							height: 18px;
							background: #00E900;
							border: 1px solid #FFFFFF;
							border-radius: 50%;
						}
					}

					.user_info_area {
						// flex-wrap: wrap;
						display: flex;
						flex-flow: column;
						text-align: left;
						margin-left: 29px;

						.user_name {
							color: #FFFFFF;
							font-family: 'Roboto-Medium';
							font-size: 20px;
							width: 180px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.level {
							color: #727272;
							font-size: 18px;
							font-family: 'Roboto-Regular';
						}

						.game_area {
							color: #727272;
							font-size: 18px;
							font-family: 'Roboto-Regular';
						}
					}
				}
			}

			.pagnationBox {
				display: flex;
				justify-content: flex-end;
				margin-top: 35px;
				margin-right: 50px;
			}
		}

	}
</style>
