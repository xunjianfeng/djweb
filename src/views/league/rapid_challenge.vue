<template>
	<div class="index">
		<div class="container">
			<div class="content_top">
				<div class="rapic_head">
					<div class="rapic_head_tit">Choose a game</div>
				</div>
				<div class="rapic_content ">
					<div :class="game_index == gtem.gameId ? 'game_list av' : 'game_list'" v-for="(gtem,gndex) in game_list" :key="gndex" @click="tab_game(gtem)">
						<div class="game_info">
							<div class="game_logo">
								<el-image :src="HOST + gtem.gameLogo" class="game_img">
									<div slot="error" class="image-slot"> 
										<img src="../../assets/images/default_game.png" class="default_img"/>
									</div>
								</el-image>
								<!-- <img :src="HOST + gtem.gameLogo" v-if="gtem.gameLogo"/> -->
							</div>
							<div class="game_name">{{gtem.gameName}}</div>
						</div>
					</div>
				</div>
				<div class="pagnationBox">
					<pagination v-if="total_count_game>0" :total="total_count_game" :page.sync="listQuery.page" :limit.sync="listQuery.size"
					 @pagination="handlePageChange" />
				</div>
			</div>
			<div class="content_bottom">
				<div class="rapic_head">
					<div class="rapic_head_tit">Request host for a game</div>
				</div>
				<div class="search_area">
					<div class="text">If you prefer a private game with our host, just search for your host name and chat with them to ask for a private game creation. Enjoy your game!</div>
					<div class="search">
						<input placeholder="Search Host Name" v-model="listQuery.hostName"/>
						<button class="btn" @click="handleFilter">
							<img src="@/assets/images/search.png" />
						</button>
					</div>
				</div>
				<div class="user_area">
					<div class="user_list" v-for="(item,index) in host_list">
						<div class="avatar">
							<el-image :src="HOST + item.userInfo.avatar" class="avatar_img">
								<div slot="error" class="image-slot"> 
									<img src="../../assets/images/default.png" class="default_img"/>
								</div>
							</el-image>
							<!-- <img :src="HOST + item.userInfo.avatar" v-if="item.userInfo.avatar"/> -->
							<div class="point"></div>
						</div>
						<div class="user_info_area">
							<el-tooltip class="item" effect="dark" :content="item.userInfo.fullName" placement="bottom">
								<div class="user_name">{{item.userInfo.fullName}}</div>
							</el-tooltip>
							<!-- <div class="user_name">{{item.userInfo.fullName}}</div> -->
							<div class="level">Level {{item.level}}</div>
							<div class="game_area">{{item.hostedGames}}</div>
						</div>
					</div>
				</div>
				<div class="pagnationBox">
					<pagination v-if="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
					 @pagination="handlePageChange" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {hostList} from '@/api/league.js'
	import Pagination from '@/components/Pagination'; 
	import {gameList} from '@/api/order.js'
	import Listing from '@/mixin/Listing';
	export default{
		name:"rapid_challenge1",
		mixins: [Listing],
		components: {
			Pagination
		},
		data(){
			return{
				listQuery:{
					hostName:'',
					gameId:'',
					page:1,
					size:10
				},
				game_index:0,
				total_count:0,
				total_count_game:0,
				gameList_index:1,
				host_index:1,
				host_list:[],
				game_list:[
					// {
					// 	id:1,
					// 	game_logo:require("../../assets/images/img.png"),
					// 	game_name:'Dota 2'
					// },
				],
				user_list:[
					{
						id:1,
						avatar:require("../../assets/images/bac17.png"),
						userName:"Jessica Liong",
						level:1,
						game_area:'Dota 2 / CS Go / PUBG'
					},
				]
			}
		},
		mounted() {
			// this.getGame()
			this.getList()
		},
		methods:{
			getList(){
				if(this.gameList_index == 1){
					gameList({size:0}).then(res => {
						let arr = []
						for(let g = 0; g < res.data.list.length; g++){
							if(res.data.list[g].gameName == 'Dota 2' || res.data.list[g].gameName == 'PUBG' || res.data.list[g].gameName == 'CS Go'){
								arr.push(res.data.list[g])
							}
						}
						this.game_list = arr
						console.log(this.game_list)
					})
				}
				if(this.host_index == 1){
					hostList(this.listQuery).then(res => {
						this.host_list = res.data.list
						this.total_count = res.data.total
					})
				}
			},
			tab_game(gtem){
				let {gameName,gameId} = gtem
				this.$router.push({path: '/league/game_item',query:{gameId,gameName}})
			},
			// 筛选
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
		}
	}
</script>

<style lang="less" scoped>
	.container{
		width: calc(100% - 140px);
		// display: flex;
		// justify-content: space-between; /* 横向中间自动空间 */
		// flex-wrap: wrap; /* 换行 */
		padding-bottom: 30px;
		margin-left: 69px;
		// background-color: #0E0F11;
		// height: 100%;
		// border-radius: 20px;
		.content_top{
			.rapic_head{
				// text-align: center;
				margin: 64px 0 38px;
				.rapic_head_tit{
					color: #DBA83F;
					font-size: 24px;
					font-weight: bold;
					font-family:'Quicksand-Bold';
				}
			}
			.rapic_content{
				width: 90%;
				// background-color: #FFF000;
				// margin: 0 auto;
				// margin-bottom: 60px;
				display: flex;
				flex-wrap: wrap;
				// justify-content: center;
				.game_list{
					background-color: #000000;
					padding: 20px 60px 30px;
					border-radius: 19px;
					margin-right: 35px;
					margin-bottom: 30px;
					cursor: pointer;
					.game_info{
						text-align: center;
						.game_logo{
							.game_img{
								width: 127px;
								height: 130px;
								.default_img{
									width: 127px;
									height: 130px;
								}
							}
						}
						.game_name{
							color: #898989;
							font-size: 18px;
							margin-top: 20px;
							font-family:'Roboto-Regular';
						}
					}
				}
				.av{
					border: 1px solid #DBA83F;
					.game_info{
						text-align: center;
						.game_logo{
							img{
								width: 127px;
								height: 130px;
							}
						}
						.game_name{
							color: #DBA83F;
							font-size: 18px;
							margin-top: 20px;
							font-family:'Roboto-Regular';
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
		.content_bottom{
			.rapic_head{
				// text-align: center;
				margin: 84px 0 6px;
				.rapic_head_tit{
					color: #DBA83F;
					font-size: 24px;
					font-weight: bold;
					font-family:'Quicksand-Bold';
				}
			}
			.search_area{
				width: 99%;
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				// background-color: #FF4D51;
				.text{
					width:50% ;
					text-align: left;
					color: #979797;
					font-family:'Roboto-Regular';
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
						font-family:'Roboto-Regular';
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
						font-family:'Roboto-Regular';
						cursor: pointer;
						img {
							width: 22px;
							height: 22px;
						}
					}
				}
			}
			.user_area{
				width: 93%;
				margin-top: 40px;
				background-color: #000000;
				border-radius: 25px;
				padding: 35px 0px 0 46px;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.user_list{
					// background-color: #F0C674;
					width: 25%;
					display: flex;
					align-items: center;
					// margin-right: 60px;
					margin-bottom: 55px;
					.avatar{
						width: 78px;
						height: 78px;
						border-radius: 19px;
						position: relative;
						.avatar_img{
							width: 78px;
							height: 78px;
							border-radius: 19px;
							.default_img{
								width: 85px;
								height: 85px;
							}
						}
						.point{
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
					.user_info_area{
						// flex-wrap: wrap;
						display: flex;
						flex-flow: column;
						text-align: left;
						margin-left: 29px;
						.user_name{
							color: #FFFFFF;
							font-family:'Roboto-Medium';
							font-size: 20px;
							width: 180px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.level{
							color: #727272;
							font-size: 18px;
							font-family:'Roboto-Regular';
						}
						.game_area{
							color: #727272;
							font-size: 18px;
							font-family:'Roboto-Regular';
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
