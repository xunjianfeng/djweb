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
					<LeagueSwitch :index="7"></LeagueSwitch>
				</div>
			</div>
			<div class="league_table">
				<div class="leag_table_head">
					<div class="table_text1"></div>
					<div class="table_text1">Player Name</div>
					<div class="table_text1">Team</div>
					<div class="table_text1">Position</div>
				</div>
				<div class="leag_table_btom_container">
					<div class="leag_table_btom" v-for="(item,index) in player_list" :key='index'>
						<div class="table_info2">
							<div class="tinfo_block">
								<div class="tinfo_text">Top {{item.rank}}</div>
							</div>
						</div>
						<div class="table_info1">
							<div class="tinfo_block">
								<el-image :src="HOST + item.playerAvatar" class="tinfo_team">
									<div slot="error" class="image-slot"> 
										<img src="../../assets/images/default.png" class="tinfo_team"/>
									</div>
								</el-image>
								<!-- <img class="tinfo_team" :src="HOST + item.playerAvatar" alt="" v-if="item.playerAvatar"> -->
								<div class="tinfo_text">{{item.playerName}}</div>
							</div>
						</div>
						<div class="table_info1">
							<div class="tinfo_block">
								<img class="tinfo_team" :src="HOST + item.teamLogo" alt="">
								<div class="tinfo_text">{{item.teamName}}</div>
							</div>
						</div>
						<div class="table_info3">
							<div class="tinfo_block">
								<img class="tinfo_team" src="../../assets/images/icon.png" alt="">
								<div class="tinfo_text">{{item.playerPosition}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeagueSwitch from '@/components/league/league.vue'
	import {getTopPlayers} from '@/api/league.js'
	export default {
		name: "top_players",
		components:{
			LeagueSwitch
		},
		data() {
			return {
				leagueItem:{},
				h_swith:1,
				list:[
					{
						top:'TOP 1',
						PlayerName:'Frogs',
						Team:'Frogs',
						Position:'WARRIOR',
					},
					{
						top:'TOP 2',
						PlayerName:'Frogs',
						Team:'Frogs',
						Position:'WARRIOR',
					},
				],
				player_list:[]
			}
		},
		mounted() {
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			this.getList()
		},
		methods: {
			getList(){
				let params = {
					leagueId: this.$route.query.leagueId
				}
				console.log(params)
				getTopPlayers(params).then(res => {
					this.player_list = res.data
				})
			},
			hswith(index){
				this.h_swith = index
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
		.league_table{
			width: calc(100% - 36px);
			background: #000000;
			margin-bottom: 60px;
			border-radius: 17px;
			.leag_table_head{
				display: flex;
				align-items: center;
				border-bottom: 2px solid #2D2D2D;
				padding: 34px 0 20px 0;
				margin: 0 2% 0 2%;
				color: #E4E4E4;
				font-weight: bold;
				font-size: 18px;
				font-family:'Roboto-Bold';
				.table_text1{
					width: 16.6%;
				}
			}
			.leag_table_btom_container{
				.leag_table_btom{
					height: 74px;
					display: flex;
					align-items: center;				
					margin: 0 1% 0 1%;
					padding: 0 1% 0 1%;
					color: #989898;
					font-size: 18px;
					.table_info1{
						width: 16.6%;
						.tinfo_block{
							display: flex;
							align-items: center;
							.tinfo_team{
								width: 39px;
								height: 39px;
								border-radius: 50%;
								margin-right: 40px;
							}
							.tinfo_text{
								color: #999999;
								font-family:'Roboto-Regular';
							}
						}
					}
					.table_info2{
						width: 16.6%;
						.tinfo_block{
							display: flex;
							align-items: center;
							font-family:'Roboto-Bold';
							.tinfo_text{
								color: #E5A518;
								font-size: 18px;
								font-weight: bold;
							}
						}
					}
					.table_info3{
						width: 16.6%;
						.tinfo_block{
							display: flex;
							align-items: center;
							font-family:'Roboto-Bold';
							.tinfo_team{
								width: 30px;
								margin-right: 20px;
							}
							.tinfo_text{
								color: #FFFFFF;
								font-weight: bold;
							}
						}
					}
					
				}
				.leag_table_btom:nth-child(2n){
					background-color:#1B2023;
				}
			}
		}
	}
</style>
