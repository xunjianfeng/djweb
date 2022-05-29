<template>
	<div class="index">
		<div class="container">
			<div class="league_head">
				<div class="league_head_text">{{leagueItem.title}}</div>
				<!-- <div class="league_head_text">PC</div>
				<div class="league_head_spot"></div>
				<div class="league_head_text">Dota 2</div> -->
			</div>
			<div class="league_switch">
				<div class="switch_head">
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Premier'">Premier</div>
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Armature'">Amateur</div>
				</div>
				<div class="switch_bottom">
					<LeagueSwitch :index="1"></LeagueSwitch>
				</div>
			</div>
			<div class="league_result_container">
				<div class="teams_list_area">
					<div class="teams_list" v-for="(item,index) in team_list" :key="index"  @mouseenter="showMemeber(item.teamId)" @mouseleave="closeMember(item.teamId)">
						<div class="block_1">
							<div class="team_logo">
								<img :src="HOST + item.teamLogo" />
							</div>
							<div class="team_info">
								<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
									<div class="team_name">{{item.teamName}}</div>
								</el-tooltip>
								<!-- <div class="team_name">{{item.teamName}}</div> -->
								<div class="game_type">{{item.gameName}}</div>
							</div>
						</div>
						<div class="block_2" v-if="item.show_status == false">
							<div class="team_intro">
								{{item.aboutTeam}}
							</div>
						</div>
						<div class="block_3" v-if="item.show_status == false">
							<div class="rank_1">
								<img src="../../assets/images/rank4.png" />
								<div class="rank_num">{{item.champions}}</div>
							</div>
							<div class="rank_2">
								<img src="../../assets/images/rank5.png" />
								<div class="rank_num">{{item.runnerUps}}</div>
							</div>
							<div class="rank_3">
								<img src="../../assets/images/rank6.png" />
								<div class="rank_num">{{item.thirdPlaces}}</div>
							</div>
						</div>
						<div class="team_member_list" v-if="item.show_status == true">
							<div class="team_member">
								<div class="member_block" v-for="(mtem,mndex) in member_list" :key="mndex">
									<el-image :src="HOST +  mtem.avatar" class="member_avatar">
										<div slot="error" class="image-slot"> 
											<img src="../../assets/images/default.png" class="member_avatar"/>
										</div>
									</el-image>
									<!-- <img :src="HOST + mtem.avatar" class="member_avatar" v-if="mtem.avatar"/> -->
									<el-tooltip class="item" effect="dark" :content="mtem.fullName" placement="bottom">
										<div class="member_name">{{mtem.fullName}}</div>
									</el-tooltip>
								</div>
							</div>
						</div>
						<!-- <div class="block_4" >
							<div class="join_btn">Join Team</div>
						</div> -->
						
					</div>
					
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
	import LeagueSwitch from '@/components/league/league.vue'
	import {teamFindList} from '@/api/league.js'
	import {teamUsers} from '@/api/team.js'
	export default {
		name: "teams",
		components:{
			LeagueSwitch
		},
		data() {
			return {
				h_swith:1,
				team_list:[],
				listQuery: {
					order: {create_time:'desc'},
					host_name: '',
					type: 1,
					page: 1,
					size: 10
				},
				list_team:[],
				teamIds:[],
				member_list:[],
				leagueItem:{}
				// show_status: false
			}
		},
		mounted() {
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			console.log(this.leagueItem)
			this.teamList()
			// console.log(this.$route.query.leagueItem)
		},
		methods: {
			hswith(index){
				this.h_swith = index
			},
			// 联赛战队列表
			teamList() {
				let that = this;
				let params = {
					leagueId: this.$route.query.leagueId||''
				}
				teamFindList(params).then(res => {
					for(let i = 0; i < res.data.list.length;i++){
						res.data.list[i]['show_status'] = false
					}
					that.team_list = res.data.list
				})
			},
			showMemeber(teamId){
				// console.log(teamId)
				// this.show_status = true
				teamUsers({teamId}).then(res => {
					this.member_list = res.data.usrs
				})
				for(let a = 0; a< this.team_list.length; a++){
					if(this.team_list[a].teamId == teamId){
						this.team_list[a].show_status = true
					}else{
						
					}
				}
			},
			closeMember(teamId){
				for(let a = 0; a< this.team_list.length; a++){
					if(this.team_list[a].teamId == teamId){
						this.team_list[a].show_status = false
					}
				}
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
			// background: #03060D;
			background: #000000;
			// margin-bottom: 60px;
			border-radius: 17px;
			// padding: 42px 0 35px 0px;
			.teams_list_area{
				.teams_list{
					width: 95%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 2px solid #2D2D2D;
					// padding: 30px 40px;
					padding: 30px 0;
					margin-left: 30px;
					// text-align: center;
					// background-color: #FF0000;
					&:last-child{
						border: none;
					}
					.block_1{
						width: 25%;
						display: flex;
						align-items: center;
						.team_logo{
							img{
								width: 93px;
								height: 93px;
								border-radius: 46px;
							}
						}
						.team_info{
							margin: 0 30px;
							text-align: left;
							.team_name{
								color: #FFFFFF;
								font-size: 20px;
								font-family:'Roboto-Bold';
								width: 170px;
								// background-color: #FFF000;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							.game_type{
								color: #727272;
								font-size: 18px;
								margin-top: 10px;
								font-family:'Roboto-Regular';
							}
						}
					}
					.block_2{
						width: 35%;
						.team_intro{
							width: 85%;
							text-align: left;
							// background-color: #FFF000;
							color: #727272;
							font-size: 18px;
							font-family:'Roboto-Regular';
						}
					}
					.block_3{
						width: 25%;
						display: flex;
						align-items: center;
						margin-right: 30px;
						.rank_1{
							display: flex;
							align-items: center;
							margin-right: 35px;
							img{
								width: 40px;
								height: 40px;
							}
							.rank_num{
								color: #FFFFFF;
								font-size: 18px;
								margin-left: 15px;
								font-family:'Roboto-Bold';
							}
						}
						.rank_2{
							display: flex;
							align-items: center;
							margin-right: 35px;
							img{
								width: 40px;
								height: 40px;
							}
							.rank_num{
								color: #FFFFFF;
								font-size: 18px;
								margin-left: 15px;
								font-family:'Roboto-Bold';
							}
						}
						.rank_3{
							display: flex;
							align-items: center;
							img{
								width: 40px;
								height: 40px;
							}
							.rank_num{
								color: #FFFFFF;
								font-size: 18px;
								margin-left: 15px;
								font-family:'Roboto-Bold';
							}
						}
					}
					.block_4{
						width: 15%;
						.join_btn{
							color: #DBA83F;
							text-decoration: underline;
							font-size: 18px;
							text-align: center;
							cursor: pointer;
							font-family:'Roboto-Bold';
						}
					}
					.team_member_list{
						width: 70%;
						// background-color: #FFFF4F;
						.team_member{
							display: flex;
							align-items: center;
							flex-wrap: wrap;
							// justify-content: space-between;
							.member_block{
								display: flex;
								align-items: center;
								margin-right: 25px;
								margin-bottom: 20px;
								.member_avatar{
									width: 40px;
									height: 40px;
									border-radius: 50%;
									margin-right: 10px;
								}
								.member_name{
									width:100px;
									color: #FFFFFF;
									font-size: 16px;
									font-family:'Roboto-Regular';
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}
						}
					}
								
				}
				
			}
		}
		
	}
</style>
