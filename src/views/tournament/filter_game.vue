<template>
	<div class="index">
		<div class="container">
			<div class="container_bacolor">
				<div class="content_right">
					<div class="content_right_form">
						<div class="content_right_center">
							<div class="center_choice">
								<div class="choice_left">									
									<div class="date_date">Game Type</div>
								</div>
								<!-- <div class="search">
									<input placeholder="Enter Your Search" />
									<button class="btn">
										<img src="../../assets/images/search.png" />
									</button>
									<button class="btn_clear">
										Clear
									</button>
								</div> -->
							</div>
						</div>
					</div>
					<!-- tab -->
					<div class="filter_container">
						<div class="filter_left">
							<div v-for="(item,cdex) in category_list" :key='cdex' :class="tab_index == item.gameCategoryId ?'filter_av':'filter_text'" @click="filter_tab(item)">{{item.gameCategoryName}}</div>
						</div>
						<div class="filter_right" >
							<div  v-for="(item,index) in game_list" :key='index'  :class="card_index == item.gameId ?'filter_card_av':'filter_card'" @click="filter_bcard(item)">
								<el-image :src="HOST + item.gameLogo" class="game_img">
									<div slot="error" class="image-slot"> 
										<img src="../../assets/images/default_game.png" class="game_img"/>
									</div>
								</el-image>
								<!-- <img :src="HOST + item.gameLogo" alt="" v-if="item.gameLogo"> -->
								<!-- <img src="../../assets/images/default_game.png" v-else /> -->
								<p>{{item.gameName}}</p>
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
		gameCategoryList,
		gameList
	} from '@/api/tournament'
	export default {
		name: "filter_game",
		data() {
			return {
				tab_index: '', //类型切换
				card_index: '', //游戏切换
				game_list:'',
				category_list:'',
				type:'',   //1 赛事列表  2 Played  Game
			}
		},
		mounted() {
			this.categoryList();
			this.type = this.$route.query.type
			console.log(this.$route.query.type)
		},
		methods: {
			// 游戏类型列表
			categoryList() {
				gameCategoryList({}).then(res => {
					this.category_list = res.data
					this.tab_index = res.data[0].gameCategoryId
					this.game_list = res.data[0].games
				})
			},
			// 游戏类型切换
			filter_tab(item) {
				let {gameCategoryId,gameCategoryName, games } = item
				this.tab_index = gameCategoryId
				this.game_list = games
			},
			// 游戏点击跳转
			filter_bcard(item) {
				let {gameId,gameName} = item
				this.card_index = gameId;
				if(this.type == 1){
					this.$router.push({path:'/tournament/registration',query:{
						gameId,
						gameName
					}})
				}else if(this.type == 2){
					this.$router.push({path:'/played/tounament',query:{
						gameId,
						gameName
					}})
				}else if(this.type == 3){
					this.$router.push({path:'/companion/index',query:{
						gameId,
						gameName
					}})
				}else if(this.type == 4){
					this.$router.push({path:'/played/predict_win',query:{
						gameId,
						gameName
					}})
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 94%;
		// margin: 0 auto;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;
		/* 换行 */
		padding-bottom: 30px;
		margin-left: 4%;
		.container_bacolor {
			width: 100%;
			height: calc(100vh - 120px);
			background: rgba(29, 32, 35, 0.8);

			.content_right {
				width: calc(100% - 120px);

				.content_right_form {
					margin-top: 60px;
					color: #ffffff;

					.content_right_center {
						margin-left: 30px;
						.center_choice {
							display: flex;
							justify-content: space-between;
							padding-bottom: 15px;
							border-bottom: 1px solid #7F7F7F;
							.choice_left {
								display: flex;
								align-items: center;
								.date_date {
									color: #FFFFFF;
									font-size: 20px;
									font-weight: 400;
									font-family:'Quicksand-Bold';
								}
							}
							.search {
								display: flex;
								align-items: center;

								input {
									width: 315px;
									height: 60px;
									background: #0E0F11 0% 0% no-repeat padding-box;
									border-radius: 23px;
									font-size: 18px;
									border: none;
									padding-left: 35px;
									color: #565656;

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

									img {
										width: 22px;
										height: 22px;
									}
								}

								.btn_clear {
									width: 120px;
									height: 60px;
									line-height: 60px;
									text-align: center;
									background-color: rgb(14, 15, 17);
									border: none;
									border-radius: 23px;
									color: #D3AA53;
									font-size: 18px;
								}
							}
						}
					}
				}
				// tab
				.filter_container {
					display: flex;
					justify-content: space-between;

					.filter_left {
						width: 380px;
						margin-left: 29px;
						margin-top: 80px;
						.filter_text {
							height: 50px;
							cursor: pointer;
							line-height: 50px;
							color: #727272;
							font-size: 18px;
							padding-left: 20px;
							margin-bottom: 15px;
							font-family:'Quicksand-Bold';
						}

						.filter_av {
							height: 50px;
							cursor: pointer;
							line-height: 50px;
							color: #727272;
							font-size: 18px;
							padding-left: 20px;
							color: #D3AA53;
							margin-bottom: 15px;
							border-right: 4px solid #D3AA53;
							background-color: rgb(50, 48, 43);
							font-family:'Quicksand-Bold';
						}
					}

					.filter_right {
						display: flex;
						flex-wrap: wrap;
						margin-top: 80px;
						width: 510px;
						cursor: pointer;
						.filter_card {
							width: 240px;
							height: 210px;
							overflow: hidden;
							background-color: #0E0F11;
							border-radius: 15px;
							border: 1px solid #0E0F11;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							margin-right: 20px;
							margin-bottom: 20px;
							font-family:'Roboto-Regular';
							.game_img {
								width: 100px;
								height: 100px;
								border-radius: 50%;
								// object-fit: contain;
								object-fit: cover;
							}

							p {
								color: #727272;
								font-size: 18px;
							}
						}
						.filter_card:nth-child(2n){
							margin-right: 0;
						}
						.filter_card_av {
							width: 240px;
							height: 210px;
							overflow: hidden;
							background-color: #0E0F11;
							border-radius: 15px;
							border: 1px solid #D3AA53;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							margin-right: 20px;
							margin-bottom: 20px;
							font-family:'Roboto-Regular';
							img {
								width: 100px;
								height: 100px;
								object-fit: contain;

							}

							p {
								color: #D3AA53;
								font-size: 18px;
							}
						}
					}
				}
			}
		}

	}
</style>
