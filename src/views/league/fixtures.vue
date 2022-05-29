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
					<LeagueSwitch :index="2"></LeagueSwitch>
				</div>
			</div>
			<div class="league_result_container">
				<div class="result_list" v-for="(item,index) in list" :key="index">
					<div class="result_title">Matchday {{item.no}} of {{leagueItem.matchDayCount}}</div>
					<div class="result_matchdoy">
						<div class="matchdoy_block" v-for="(ttem,tndex) in item.fixtures" :key="index">
							<div class="matchdoy_left">
								<div class="team_1">
									<img class="matchdoy_team" :src="HOST + ttem.team1.teamLogo" alt="">
									<div class="matchdoy_text">{{ttem.team1.teamName}}</div>
								</div>
								<div class="team_2">
									<img class="matchdoy_team" :src="HOST + ttem.team2.teamLogo " alt="">
									<div class="matchdoy_text">{{ttem.team2.teamName}}</div>
								</div>
							</div>
							<div class="matchdoy_right">
								<div class="matchdoy_text">
									{{ttem.playTime}}
								</div>
							</div>
						</div>
						<!-- <div class="matchdoy_block">
							<div class="matchdoy_left">
								<div class="team_1">
									<img class="matchdoy_team" src="../../assets/images/radiu1.png" alt="">
									<div class="matchdoy_text">Manchester City</div>
								</div>
								<div class="team_2">
									<img class="matchdoy_team" src="../../assets/images/radiu1.png" alt="">
									<div class="matchdoy_text">Manchester City</div>
								</div>
							</div>
							<div class="matchdoy_right">
								<div class="matchdoy_text">
									20th September 2020 20:00(UTC+8)
								</div>
							</div>
						</div> -->
						
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import LeagueSwitch from '@/components/league/league.vue'
	import {findMatchDay,findFixture} from '@/api/league.js'
	export default {
		name: "fixtures",
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
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			this.getList()
		},
		methods: {
			hswith(index){
				this.h_swith = index
			},
			getList(){
				let params = {
					leagueId: this.$route.query.leagueId
				}
				findMatchDay(params).then(res => {
					this.list  = res.data.list
					// console.log(this.list)
				})
			}
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
			// margin-bottom: 60px;
			// border-radius: 17px;
			// padding: 42px 0 35px 0px;
			.result_list{
				background: #000000;
				// padding-left:52px;
				margin-bottom: 50px;
				border-radius: 17px;
				padding: 42px 0 35px 52px;
				.result_title{
					color: #DBA83F;
					font-size: 21px;
					margin-bottom: 20px;
					font-family:'Quicksand-Regular';
				}
				.result_matchdoy{
					width: 95%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					.matchdoy_block{
						width: 46%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						// width: 594px;
						height: 146px;
						border: 1px solid #2A3235;
						border-radius: 23px;
						margin: 0 42px 20px 0;
						.matchdoy_left{
							// display: flex;
							// align-items: center;
							padding-left: 38px;
							.team_1{
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
							.team_2{
								display: flex;
								align-items: center;
								margin-top: 15px;
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
						}
						.matchdoy_right{
							width: 170px;
							text-align: right;
							line-height: 25px;
							font-size: 14px;
							// background-color: #fff000;
							padding-right: 24px;
							.matchdoy_text{
								color: #727272;
								font-family:'Roboto-Regular';
							}
						}
					}
				}
			}
			.result_list:last-child{
				margin-bottom: 0;
			}
		}
		
	}
</style>
