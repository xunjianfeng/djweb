<template>
	<div class="index">
		<div class="container">
			<div class="league_head">
				<div class="league_head_text">{{leagueItem.title}}</div>
			</div>
			<div class="league_switch">
				<div class="switch_head">
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Premier'">Premier</div>
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Armature'">Amateur</div>
				</div>
				<div class="switch_bottom">
					<LeagueSwitch :index="4"></LeagueSwitch>
				</div>
			</div>
			<div class="league_result_container">
				<div class="result_list" v-for="(item,index) in list" :key="index">
					<div class="result_title">Matchday {{item.no}} Result</div>
					<div class="result_matchdoy">
						<div class="matchdoy_block"  v-for="(ttem,tndex) in item.fixtures" :key="tndex">
							<div class="matchdoy_left">
								<div class="team_1">
									<div class="team_1_left">
										<img class="matchdoy_team" :src="HOST + ttem.team1.teamLogo" alt="">
										<div class="matchdoy_text">{{ttem.team1.teamName}}</div>
									</div>
									<div class="matchdoy_score">
										<input :class="ttem.team1Score > ttem.team2Score ? 'matchdoy_input text_color' : 'matchdoy_input '" v-model="ttem.team1Score" disabled/>
									</div>
								</div>
								<div class="team_2">
									<div class="team_2_left">
										<img class="matchdoy_team" :src="HOST + ttem.team2.teamLogo" alt="">
										<div class="matchdoy_text">{{ttem.team2.teamName}}</div>
									</div>
									<div class="matchdoy_score">
										<input  :class="ttem.team2Score > ttem.team1Score ? 'matchdoy_input text_color' : 'matchdoy_input '"  v-model="ttem.team2Score" disabled/>
									</div>
								</div>
							</div>
							<!-- <div class="matchdoy_right">
								<div class="matchdoy_text">
									{{ttem.playTime}}
								</div>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeagueSwitch from '@/components/league/league.vue'
	import {findMatchDay} from '@/api/league.js'
	export default {
		name: "results",
		components:{
			LeagueSwitch
		},
		data() {
			return {
				h_swith:1,
				value1:'',
				list:[
					
				],
				leagueItem:{}
			}
		},
		mounted() {
			this.getMatchDay()
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
		},
		methods: {
			hswith(index){
				this.h_swith = index
			},
			//查询比赛日和对局及结果
			getMatchDay(){
				let params = {
					leagueId:this.$route.query.leagueId
				}
				console.log(params)
				findMatchDay(params).then(res => {
					this.list = res.data.list
					console.log(this.matchday_list)
				})
			},
		}

	}
</script>
<style lang="less" scoped>
	.container {
		width: calc(100% - 191px);
		margin-left: 72px;
		.league_head{
			display: flex;
			align-items: center;
			padding:46px 0 32px 0 ;
			border-bottom: 1px solid #2D2D2D;
			font-family:'Quicksand-Bold';
			.league_head_text{
				color: #FFFFFF;
				font-size: 24px;
				font-weight: bold;
			}
			.league_head_spot{
				width: 8px;
				height: 8px;
				background-color: #FFFFFF;
				border-radius: 50%;
				margin: 0 20px;
			}
		}
		.league_switch{
			.switch_head{
				display: flex;
				align-items: center;
				margin: 52px 0;
				font-family:'Quicksand-Regular';
				.switch_h_block{
					font-size: 24px;
					color: #FFFFFF;
					cursor: pointer;
					margin-right: 70px;
				}
				.switch_h_block:last-child{
					margin-right: 0;
				}
				.switch_h_av{
					color: #DBA83F;
					position: relative;
				}
				.switch_h_av:before{
				    content: '';
				    position: absolute;
					left: 0px;
				    bottom: 0px;
				    right: 0px;
				    border-top: 3px solid  #DBA83F;
				}
			}
			.switch_bottom{
				margin-bottom: 40px;
			}
		}
		.league_result_container{
			width: calc(100% - 36px);
			background: #000000;
			margin-bottom: 60px;
			border-radius: 17px;
			padding: 42px 0 35px 0px;
			.result_list{
				padding-left:52px;
				margin-bottom: 61px;
				.result_title{
					color: #DBA83F;
					font-size: 21px;
					margin-bottom: 20px;
					font-family:'Quicksand-Regular';
				}
				.result_matchdoy{
					display: flex;
					flex-wrap: wrap;
					.matchdoy_block{
						width: 46%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						// background-color: #fff;
						// width: 594px;
						height: 146px;
						border: 1px solid #2A3235;
						border-radius: 23px;
						// margin: 0 42px 20px 0;
						margin-bottom: 20px;
						.matchdoy_left{
							// display: flex;
							// align-items: center;
							width: 90%;
							// background-color: #FF0000;
							padding-left: 38px;
							.team_1{
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: space-between;
								.team_1_left{
									display: flex;
									align-items: center;
									.matchdoy_team{
										width: 51px;
										height: 51px;
										border-radius: 50%;
										margin-right: 21px;
									}
									.matchdoy_text{
										color: #FFFFFF;
										font-size: 20px;
										font-family:'Roboto-Bold';
									}
								}	
								.matchdoy_score{
									margin-left: 30px;
									.matchdoy_input{
										width: 50px;
										display: flex;
										align-items: center;
										padding-left: 18px;
										height: 40px;
										color: #989898;
										font-size: 20px;
										background: #1B2023;
										border-radius: 4px;
										border: none;
										font-family:'Roboto-Regular';
									}
									.text_color{
										color: #E5A518;
									}
								}
							}
							.team_2{
								// width: 30%;
								display: flex;
								align-items: center;
								justify-content: space-between;
								margin-top: 15px;
								.team_2_left{
									display: flex;
									align-items: center;
									// justify-content: space-between;
									.matchdoy_team{
										width: 51px;
										height: 51px;
										border-radius: 50%;
										margin-right: 21px;
									}
									.matchdoy_text{
										color: #FFFFFF;
										font-size: 20px;
									}
									
								}
								.matchdoy_score{
									margin-left: 30px;
									.matchdoy_input{
										width: 50px;
										display: flex;
										align-items: center;
										padding-left: 18px;
										height: 40px;
										color: #989898;
										font-size: 20px;
										background: #1B2023;
										border-radius: 4px;
										border: none;
										font-family:'Roboto-Regular';
									}
									.text_color{
										color: #E5A518;
									}
								}
							}
						}
						// .matchdoy_right{
						// 	width: 170px;
						// 	text-align: right;
						// 	line-height: 25px;
						// 	font-size: 14px;
						// 	// background-color: #fff000;
						// 	padding-right: 24px;
						// 	.matchdoy_text{
						// 		color: #727272;
						// 	}
						// }
					}
					
					
				// 	.matchdoy_block{
				// 		display: flex;
				// 		align-items: center;
				// 		justify-content: space-between;
				// 		width: 594px;
				// 		height: 146px;
				// 		border: 1px solid #2A3235;
				// 		border-radius: 23px;
				// 		margin: 0 42px 20px 0;
				// 		.matchdoy_left{
				// 			display: flex;
				// 			align-items: center;
				// 			padding-left: 38px;
				// 			.matchdoy_team{
				// 				width: 51px;
				// 				height: 51px;
				// 				border-radius: 50%;
				// 				margin-right: 21px;
				// 			}
				// 			.matchdoy_text{
				// 				color: #FFFFFF;
				// 				font-size: 20px;
				// 			}
				// 		}
				// 		.matchdoy_right{
				// 			padding-right: 24px;
				// 			.matchdoy_input{
				// 				width: 120px;
				// 				display: flex;
				// 				align-items: center;
				// 				padding-left: 18px;
				// 				height: 44px;
				// 				color: #989898;
				// 				font-size: 20px;
				// 				background: #1B2023;
				// 				border-radius: 4px;
				// 			}
				// 			.matchdoy_color{
				// 				color: #DBA83F;
				// 			}
				// 		}
				// 	}
				
				}
			}
			.result_list:last-child{
				margin-bottom: 0;
			}
		}
		
	}
</style>
