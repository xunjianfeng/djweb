<template>
	<div class="index">
		<!-- completed 弹窗 -->
		<div class="mark_completed">
			<div class="mark_cancel" v-if="update_up == true" @click.stop="update_up = false">
				<img src="@/assets/images/cancel.png" alt="">
			</div>
			<div class="mark_bac" v-if="update_up == true"></div>
			<div class="mark_popup_container" v-if="update_up == true">
				<div class="top_block">
					<div class="mark_top_head" >Clarity Inhouse Ladder 1</div>
					<!-- <div class="mark_border"></div> -->
					<div class="mark_content">
						<div class="mark_content_head">
							<div class="mark_head_tit">Result</div>
							<div class="big_table_area" v-if="game_type == 1">
								<div class="table_list">
									<div :class="table_index == mndex ? 'tname acv' : 'tname'" v-for="(mtem,mndex) in result_list.matchResults" :key="mndex" @click="tabTable(mndex)">
										{{mndex+1 == 1 ? '1st' : mndex+1 == 2 ? '2nd' : mndex+1 == 3 ? '3rd': mndex+1 +'th'  }}
									</div>
									<!-- <div :class="table_index == 1 ? 'tname acv' : 'tname'" @click="tabTable(1)">1st</div>
									<div :class="table_index == 2 ? 'tname acv' : 'tname'" @click="tabTable(2)">1st</div>
									<div :class="table_index == 3 ? 'tname acv' : 'tname'" @click="tabTable(3)">final</div> -->
								</div>
								<!-- <div class="table_area" v-if="table_index == 1">
									<div class="table_header">
										<div class="header_1">Team</div>
										<div class="header_1">Result</div>
									</div>
									<div class="table_body">
										<div class="body_row">
											<div class="row_col">1</div>
											<div class="row_col">2</div>
										</div>
									</div>
								</div> -->
								<div class="table_area2">
									<div class="table_header">
										<div class="header_1">Team</div>
										<div class="header_1">Match</div>
										<div class="header_1">Kill Points</div>
										<div class="header_1">Place Points</div>
										<div class="header_1">Total Points</div>
										<div class="header_1">WWCD</div>
									</div>
									<div class="table_body">
										<div class="body_row" v-for="(rtem,rndex) in result_list.matchResults[table_index].teamStandings">
											<div class="row_col">{{rtem.teamNo}}</div>
											<div class="row_col">{{result_list.matchResults[table_index].matchNo}}</div>
											<div class="row_col">{{rtem.killPoints || 0}}</div>
											<div class="row_col">{{rtem.placePoints || 0}}</div>
											<div class="row_col">{{rtem.totalPoints || 0}}</div>
											<div class="row_col">{{rtem.isWinner == true ? '1' : '0'}}</div>
										</div>
										<!-- <div class="body_row">
											<div class="row_col">A</div>
											<div class="row_col">1</div>
											<div class="row_col">2</div>
											<div class="row_col">3</div>
											<div class="row_col">4</div>
											<div class="row_col">5</div>
										</div> -->
									</div>
								</div>
							</div>
							<div class="mark_head_input" v-if="game_type == 2">
								<div class="mark_header">
									<div class="mark_header_1">Team</div>
									<div class="best_of_list">
										<div class="list_header">Best of 1</div>
										<div class="list_header">Best of 2</div>
										<div class="list_header">Best of 3</div>
									</div>
								</div>
								<div class="mark_body">
									<div class="mark_row">
										<div class="team_name">A</div>
										<div class="num_list">
											<div class="list_col">1</div>
											<div class="list_col">2</div>
											<div class="list_col">3</div>
										</div>
									</div>
									<div class="mark_row">
										<div class="team_name">B</div>
										<div class="num_list">
											<div class="list_col">11</div>
											<div class="list_col">22</div>
											<div class="list_col">33</div>
										</div>
									</div>
								</div>
								<!-- <div class="input_right">
									<input type="text" value="" v-model="dataForm.identification">
								</div> -->
							</div>
						</div>
						<div class="mark_content_update_block">
							<div class="mark_head_tit">Result Screenshot</div>
							<div class="mark_content_img">
								<div class="img_block_center">
									<img :src="HOST + result_list.matchResults[table_index].standingSnapshot" />
								</div>
							</div>
							<!-- <div class="mark_content_update" style="margin-top:40px;">
								<div class="update_block">
									<div class="udpate_btom_no">
										<img class="active1_img" :src="HOST + result_list.matchResults[table_index].standingSnapshot" />
									</div>
								</div>
								<div class="update_block">
									<div :class="dataForm.backUrl == ''? 'udpate_btom_no':'udpate_btom'">
										<img class="active1_img" src="../../assets/images/bac_one.png" />
									</div>
								</div>
							</div> -->
							
						</div>
						<div class="btn_area" v-if="game_type == 1">
							<div class="host_btn" @click="update_up1 = true,update_up = false">Agree</div>
							<div class="cancel_btn" @click="update_up = false">Abuse</div>
						</div>
					</div>
				</div>
			
			</div>
			
		</div>
		<!-- completed end -->
		<!-- 打分 弹窗 -->
		<div class="mark_star">
			<div class="mark_cancel" v-if="update_up1 == true" @click.stop="update_up1 = false">
				<img src="@/assets/images/cancel.png" alt="">
			</div>
			<div class="mark_bac" v-if="update_up1 == true"></div>
			<div class="mark_popup_container" v-if="update_up1 == true">
				<div class="top_block">
					<div class="mark_top_head" >Game Name</div>
					<!-- <div class="mark_border"></div> -->
					<div class="mark_content">
						<div class="host_name">Host Name</div>
						<div class="host_text">Please rate your host for this game.</div>
						<div class="mark_evaluate">
							<el-rate v-model="score" ></el-rate>
						</div>
						<div class="btn_area" >
							<div class="host_btn" @click="getAgree">Confirm</div>
							<div class="cancel_btn" @click="update_up1 = false">Cancel</div>
						</div>
					</div>
				</div>
			
			</div>
			
		</div>
		<!-- 打分 end -->
		
		<div class="container">
			<LeftView :index="3"></LeftView>
			<div class="content_right">
				<div class="upcoming_right_form">
					<div class="content_right_nav">
						<div class="right_nav_right">
							<p  @click="jump_playd(1)">Tounament</p>
							<p class="av"  @click="jump_playd(2)">Rapid Challenge</p>
							<p @click="jump_playd(3)">League</p>
							<p @click="jump_playd(4)">Predict and Win</p>
						</div>
					</div><!-- content_right_nav -->
					<!-- 赛事card -->
					<div class="upcom_container">
						<div class="center_choice">
							<div class="choice_left">
								<div class="status">
									<p class="status_text">Type</p>
									<div class="options">
										<el-select v-model="listQuery.isPublic" placeholder="Please select" style="margin-right: 20px;"
										 :popper-append-to-body="false" @change="selectChanged">
											<el-option label="All" value=""></el-option>
											<el-option label="Private" value="false"></el-option>
											<el-option label="Public" value="true"></el-option>
										</el-select>
									</div>
								</div>
								<div class="sort_by">
									<p class="sort_by_text">Status</p>
									<div class="options">
										<el-select v-model="listQuery.Status" placeholder="Please select" style="margin-right: 20px;"
										 :popper-append-to-body="false" @change="selectChanged">
											<el-option label="Low" value="1"></el-option>
											<el-option label="high" value="2"></el-option>
										</el-select>
									</div>
								</div>
							</div>
						</div>
						<!-- 没有数据 -->
						<div class="no_data_area" v-if="joinGame_list == ''">
							<div class="no_data">
								<img src="../../assets/images/no_tournament.svg" />
								<div class="no_data_text">No any data</div>
							</div>
						</div>
						<!-- 表格  -->
						<div class="center_table" v-if="joinGame_list != ''">
							<div class="table_header">
								<div class="header_2">Game Type</div>
								<div class="header_1">Date</div>
								<div class="header_2">Room Name</div>
								<div class="header_1">Type</div>
								<div class="header_1">Best of</div>
								<div class="header_1">Mode</div>
								<div class="header_1">Joinned</div>
								<div class="header_1">Coins</div>
								<div class="header_1">Status</div>
							</div>
							<div class="table_body">
								<div class="body_row" v-for="(item,index) in joinGame_list">
									<div class="row_col_1">Dota2</div>
									<div class="row_col">{{item.createTime}}</div>
									<div class="row_col_1">{{item.roomName}}</div>
									<div class="row_col">{{item.isPublic == true ? 'Public' : 'Private'}}</div>
									<div class="row_col">{{item.bestOf}}</div>
									<div class="row_col">{{item.gameMode}}</div>
									<div class="row_col">({{item.players || 0}}/{{item.capacity || 0}})</div>
									<div class="row_col">{{item.fee || 0}}</div>
									<div :class="item.gameStatus=='ToUpdate'? 'row_col text_color1' : item.gameStatus=='ToAgree'? 'row_col text_color3' : item.gameStatus == 'Win' ? 'row_col text_color2' : 'row_col text_color4'" 
										@click="item.gameStatus=='ToAgree' ? getGameResult(item.roomId) : ''"
									>
										{{item.gameStatus=='ToUpdate'? 'ToUpdate' : item.gameStatus=='ToAgree'? 'ToAgree' : item.gameStatus == 'Win' ? 'Win' : 'Lose'}}
									</div>
								</div>
								<!-- <div class="body_row">
									<div class="row_col_1">Dota2</div>
									<div class="row_col">2021-07-21 12:00:00</div>
									<div class="row_col_1">Calrity Inhouse Ladder</div>
									<div class="row_col">public</div>
									<div class="row_col"></div>
									<div class="row_col">Leader Mode</div>
									<div class="row_col">(5/10)</div>
									<div class="row_col">50</div>
									<div class="row_col text_color3"@click="update_up= true">To Agree</div>
								</div>
								 -->
							</div>
						</div>
						<div class="pagnationBox">
							<pagination v-if="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
							 @pagination="handlePageChange" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/order/left.vue'
	import {gameList} from '@/api/order.js'
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	import {joinGameList,confirmGameResult,getGameResult} from '@/api/league.js'
	import Listing from '@/mixin/Listing';
	export default {
		name: "rapic",
		mixins: [Listing],
		components: {
			LeftView,
			Pagination
		},
		data() {
			return {
				update_up:false,//查看成绩内容，弹窗
				update_up1:false,//同意成绩内容之后的打分弹窗
				game_type:1,
				table_index:0,
				listQuery: {
					isPublic:'',
					gameStatus:'',
					Status:'',
					page: 1,
					size: 10
				},
				dataForm:{
					type:1,
					backUrl:"",
					frontUrl:"",
					identification:""
				},
				score:'',	//给主持人打分
				game_list:[],
				joinGame_list:[],//参与过的比赛列表
				total_count:0,
				result_list:[],	//比赛结果列表	
				roomId:','//打开确认成绩弹窗的roomId
			};
		},
		mounted() {
			this.getList()
			this.getGameList()
		},
		methods: {
			//切换表格
			tabTable(mndex){
				this.table_index = mndex
				console.log(mndex)
			},
			// 分页查询参与过的比赛
			getList(){
				joinGameList(this.listQuery).then(res => {
					this.joinGame_list = res.data.list
					this.total_count = res.data.total
				})
			},
			//游戏列表
			getGameList(){
				gameList().then(res => {
					// console.log(res.data)
					this.game_list = res.data.list
				})
			},
			//获取比赛结果
			getGameResult(roomId){
				this.update_up = true
				this.roomId = roomId
				let params = {
					roomId:roomId
				}
				getGameResult(params).then(res => {
					this.result_list = res.data
				})
			},
			//确认并打分
			getAgree(){
				let params = {
					roomId:this.roomId,
					starToHost:this.score
				}
				confirmGameResult(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.update_up1 = false
					this.getList()
				})
			},
			// 筛选
			selectChanged(value) {
				this.handleFilter();
			},
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
			// to agree后点击status查看成绩
			afterAgree(){
				this.update_up = true
				this.game_type = 2
			},
			// 页面跳转
			jump_playd(index){
				if(index == 1){
					this.$router.push({
						path: '/played/tounament'
					})
				}else if(index == 2){
					this.$router.push({
						path: '/played/rapic_challenge'
					})
				}else if(index == 3){
					this.$router.push({
						// path: '/played/league'
					})
				}else if(index == 4){
					this.$router.push({
						path: '/played/predict_win'
					})
				}
			},
			jump_apply() {
				this.$router.push({
					path: '/order/apply'
				})
			}
		}
	};
</script>
<style lang="less" scoped>
	.mark_completed{
		.mark_cancel{
			position: absolute;
			right: 80px;
			top: 10px;
			z-index: 999;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
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
		.mark_popup_container{
			position: absolute;
			left: 26%;
			top: 100px;
			z-index: 999;
			.top_block{
				padding: 50px 30px 50px 30px;
				// background: #0E0F11;
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
					background-color:#2D2D2D;
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
						.big_table_area{
							width: 627px;
							
							.table_list{
								display: flex;
								align-items: center;
								margin-bottom: 20px;
								.tname{
									color: #727272;
									font-size: 18px;
									font-family:'Roboto-Regular';
									margin-right: 15px;
									cursor: pointer;
								}
								.acv{
									color:#DBA83F;
								}
							}
							.table_area{
								width: 100%;
								border-radius: 19px;
								font-size: 18px;
								border: 1px solid #727272;
								.table_header{
									
									display: flex;
									align-items: center;
									text-align: center;
									color: #727272;
									border-bottom: 1px solid #7f7f7f;
									.header_1{
										width: 50%;
										height: 40px;
										line-height: 40px;
										border-right: 1px solid #7f7f7f;
										&:last-child{
											border: none;
										}
									}
								}
								.table_body{
									.body_row{
										display: flex;
										align-items: center;
										text-align: center;
										color: #727272;
										border-bottom: 1px solid #7f7f7f;
										&:last-child{
											border: none;
										}
										.row_col{
											width: 50%;
											height: 40px;
											line-height: 40px;
											border-right: 1px solid #7f7f7f;
											&:last-child{
												border: none;
											}
										}
									}
								}
							}
							.table_area2{
								width: 100%;
								border-radius: 19px;
								font-size: 18px;
								border: 1px solid #727272;
								.table_header{
									
									display: flex;
									align-items: center;
									text-align: center;
									color: #727272;
									border-bottom: 1px solid #7f7f7f;
									.header_1{
										width: 16.5%;
										height: 40px;
										line-height: 40px;
										border-right: 1px solid #7f7f7f;
										&:last-child{
											border: none;
										}
									}
								}
								.table_body{
									.body_row{
										display: flex;
										align-items: center;
										text-align: center;
										color: #727272;
										border-bottom: 1px solid #7f7f7f;
										&:last-child{
											border: none;
										}
										.row_col{
											width: 16.5%;
											height: 40px;
											line-height: 40px;
											border-right: 1px solid #7f7f7f;
											&:last-child{
												border: none;
											}
										}
									}
								}
							}
													
						}
						.mark_head_input{
							width: 627px;
							// height: 59px;
							// line-height: 59px;
							border: 1px solid #727272;
							border-radius: 19px;
							font-size: 18px;
							.mark_header{
								width: 100%;
								display: flex;
								align-items: center;
								color: #727272;
								border-bottom: 1px solid #7f7f7f;
								text-align: center;
								.mark_header_1{
									width: 20%;
									height: 40px;
									line-height: 40px;
									border-right: 1px solid #7f7f7f;
								}
								.best_of_list{
									width: 80%;
									display: flex;
									align-items: center;
									// justify-content: space-evenly;
									.list_header{
										width: 33%;
										height: 40px;
										line-height: 40px;
										border-right: 1px solid #7f7f7f;
										&:last-child{
											border: none;
										}
									}
								}
							}
							.mark_body{
								.mark_row{
									width: 100%;
									display: flex;
									align-items: center;
									color: #727272;
									border-bottom: 1px solid #7f7f7f;
									text-align: center;
									&:last-child{
										border: none;
									}
									.team_name{
										width: 20%;
										height: 40px;
										line-height: 40px;
										border-right: 1px solid #7f7f7f;
									}
									.num_list{
										width: 80%;
										display: flex;
										align-items: center;
										.list_col{
											width: 33%;
											height: 40px;
											line-height: 40px;
											border-right: 1px solid #7f7f7f;
											&:last-child{
												border: none;
											}
										}
									}
								}
							}
							// display: flex;
							// align-items: center;
							// .input_right{
							// 	height: 59px;
							// 	display: flex;
							// 	align-items: center;
							// 	padding-left: 20px;
							// 	width: 80%;
							// 	input{
							// 		width: 100%;
							// 		height: 54px;
							// 		color: #fff;
							// 		font-family:'Roboto-Regular';
							// 		font-size: 18px;
							// 		// background-color: #0E0F11;
							// 		background-color: #1D2023;
							// 		outline: none;
							// 		border: none;
							// 	}
							// }
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
					.mark_content_update_block{
						.mark_head_tit{
							color: #727272;
							font-size: 20px;
							font-family:'Roboto-Regular';
							margin: 49px 0 12px 0;
						}
						.mark_content_img{
							display: flex;
							justify-content: center;
							margin-top: 40px;
							.img_block_center{
								img{
									width: 375px;
									height: 280px;
									object-fit: cover;
								}
							}
							
						}
						.mark_content_update{
							width: 90%;
							margin: 0 auto;
							// margin-top:80px;
							display: flex;
							justify-content: space-between;
							.mark_head_tit{
								color: #727272;
								font-size: 20px;
								font-family:'Roboto-Regular';
								margin: 49px 0 12px 0;
							}
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
									// padding: 35px 0;
									text-align: center;
									background-color: #000;
									border-radius: 12px;
									img{
										// width: 100%;
										width: 275px;
										// max-height: 100%;
										// width: 40px;
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
										width: 100%;
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
						
					}
					.btn_area{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-top: 50px;
						.host_btn {
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
						.cancel_btn {
							width: 120px;
							height: 50px;
							line-height: 50px;
							border: 1px solid #FF3636;
							border-radius: 25px;
							text-align: center;
							color: #FF3636;
							font-size: 18px;
							margin-left: 20px;
							font-family:'Roboto-Regular';
							cursor: pointer;
						}
					}
				}
			}
		}
		
	}
	.mark_star{
		.mark_cancel{
			position: absolute;
			right: 80px;
			top: 10px;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
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
		.mark_popup_container{
			position: absolute;
			left: 26%;
			top: 100px;
			z-index: 99;
			width: 650px;
			.top_block{
				padding: 50px 30px 50px 30px;
				// background: #0E0F11;
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
				
				.mark_content{
					margin-top: 50px;
					.host_name{
						font-size: 20px;
						color:#DBA83F ;
						font-family:'Roboto-Bold';
						text-align: center;
						margin-bottom: 15px;
					}
					.host_text{
						font-size: 18px;
						color:#727272 ;
						font-family:'Roboto-Regular';
						text-align: center;
						margin-bottom: 30px;
					}
					.mark_evaluate{
						display: flex;
						align-items: center;
						justify-content: center;
						margin-bottom: 50px;
						/deep/ .el-rate__icon {
							font-size: 60px;
						}
					}
					.btn_area{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-top: 130px;
						.host_btn {
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
						.cancel_btn {
							width: 120px;
							height: 50px;
							line-height: 50px;
							border: 1px solid rgba(255,255,255,0.5);
							border-radius: 25px;
							text-align: center;
							color:rgba(255,255,255,0.5);
							font-size: 18px;
							margin-left: 20px;
							font-family:'Roboto-Regular';
							cursor: pointer;
						}
					}
				}
			}
		}
		
	}
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

			.upcoming_right_form {
				margin-top: 50px;
				.content_right_nav {
					display: flex;
					align-items: center;

					.right_nav_right {
						p {
							display: inline-block;
							color: #898989;
							padding: 0 30px;
							font-size: 18px;
							cursor: pointer;
							font-family:'Quicksand-Bold';
							border-right: 1px solid #7F7F7F;
						}

						p {

							&:last-child {
								border: none;
							}
						}

						.av {
							color: #BF9D62;
							font-family:'Quicksand-Bold';
						}
					}
				}

				.upcom_container {
					// margin-top: 50px;
					margin-top: 20px;
					width: 100%;
					// margin-left: 30px;
					background-color: #0E0F11;	
					padding: 0 30px 40px;
					border-radius: 19px;
					.center_choice {
						width: 100%;
						// background-color: #FFF000;
						display: flex;
						align-items: flex-end;
						justify-content: space-between;
						// margin-top: 50px;
						.choice_left {
							display: flex;
							div {
								margin-right: 20px;
								.options {
									position: relative;
									/deep/ .el-select .el-input .el-input__inner {
										border: 0px;
										width: 230px;
										height: 59px;
										color: #fff;
										font-family:'Roboto-Regular';
										border-radius: 20px;
										// background-color: #0E0F11;
										background-color: #1D2023;
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
										font-family:'Roboto-Regular';
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
					
							.status {
								.status_text {
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									opacity: 1;
									font-family:'Roboto-Regular';
									font-size: 18px;
								}
							}
					
							.sort_by {
								.sort_by_text {
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									font-family:'Roboto-Regular';
									font-size: 18px;
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
								font-family:'Roboto-Regular';
								margin-top: 20px;
							}
						}
					}
					
					.center_table {
						width: 100%;
						margin-top: 52px;
						// position: relative;
						// right: 30px;
						color: #FFFFFF;
						.table_header {
							display: flex;
							height: 75px;
							background: #000000;
							border-radius: 31px 31px 0px 0px;
							opacity: 1;
							align-items: center;
							.header_1{
								width: 10%;
								font-family:'Roboto-Bold';
								// font-family:'Roboto-Regular';
								font-size: 18px;
								text-align: center;
								// background-color: #FF0000;
							}
							.header_2{
								width: 15%;
								font-family:'Roboto-Bold';
								// font-family:'Roboto-Regular';
								font-size: 18px;
								text-align: center;
							}
						}
					
						.table_body {
							.body_row {
								display: flex;
								align-items: center;
								text-align: center;
								.row_col{
									width: 10%;
									font-size: 18px;
									height: 75px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.row_col_1{
									width: 15%;
									font-size: 18px;
									height: 75px;
									display: flex;
									align-items: center;
									justify-content: center;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
								.text_color1{
									color: #FF971A;
								}
								.text_color2{
									color: #23B709;
								}
								.text_color3{
									color:#00AAFF;
									cursor: pointer;
								}
								.text_color4{
									color:#FF3636;
								}
							}
							.body_row:nth-child(2n) {
								background: #313538;
								opacity: 1;
							}
					
							.body_row:last-child {
								border-radius: 0px 0px 26px 26px;
							}
						}
					
						//table_body
					}
					
					.pagnationBox {
						position: relative;
						right: 30px;
						margin-top: 75px;
					}
				}
			}

			//upcoming_right_form
		}
	}
</style>
