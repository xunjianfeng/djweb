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
					<LeagueSwitch :index="3"></LeagueSwitch>
				</div>
			</div>
			<!-- <div class="league_date">
				<div class="date_block">
					<div class="date_head">Date Range</div>
					<div class="date_btom">
						<el-date-picker
						  v-model="value1"
						  type="date"
						  placeholder="Date">
						</el-date-picker>
					</div>
				</div>
			</div> -->
			<div class="league_table">
				<div class="leag_table_head">
					<!-- <div class="table_text1">Date</div> -->
					<div class="table_text1">Team</div>
					<div class="table_text2">P</div>
					<div class="table_text2">W</div>
					<div class="table_text2">D</div>
					<div class="table_text2">L</div>
					<div class="table_text2">F</div>
					<div class="table_text2">A</div>
					<div class="table_text2">Diffi</div>
					<div class="table_text2">Points</div>
				</div>
				<div class="leag_table_btom_container">
					<div class="leag_table_btom" v-for="(item,index) in list" :key='index'>
						<!-- <div class="table_info1">{{item.date}}</div> -->
						<div class="table_info1">
							<div class="tinfo_block">
								<!-- <img class="tinfo_team" src="../../assets/images/radiu1.png" alt=""> -->
								<img class="tinfo_team" :src="HOST + item.team.teamLogo" alt="">
								<!-- <div class="tinfo_text">{{item.team.teamName}}</div> -->
								<div class="tinfo_text">{{item.team.teamName}}</div>
							</div>
						</div>
						<div class="table_info2">{{item.p}}</div>
						<div class="table_info2">{{item.w}}</div>
						<div class="table_info2">{{item.d}}</div>
						<div class="table_info2">{{item.l}}</div>
						<div class="table_info2">{{item.f}}</div>
						<div class="table_info2">{{item.a}}</div>
						<div class="table_info2">{{item.diff}}</div>
						<div class="table_info2">{{item.point}}</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeagueSwitch from '@/components/league/league.vue'
	import {leagueStanding} from '@/api/league.js'
	export default {
		name: "standing",
		components:{
			LeagueSwitch
		},
		data() {
			return {
				h_swith:1,
				value1:'',
				list:[
					// {
					// 	date:'Matchday 1 23 July, 2021',
					// 	teamName:'LLPSA',
					// 	p:'1',
					// 	w:'1',
					// 	d:'1',
					// 	l:'1',
					// 	f:'1',
					// 	a:'1',
					// 	diff:'1',
					// 	points:'3',
					// },
					
					
				],
				listQuery:{
					leagueId: this.$route.query.leagueId
				},
				leagueItem:{}
			}
		},
		mounted() {
			this.showStanding()
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
		},
		methods: {
			hswith(index){
				this.h_swith = index
			},
			showStanding(){
				
				// console.log(params)
				leagueStanding(this.listQuery).then(res => {
					// console.log(res)
					this.list = res.data.list
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
				margin-bottom: 60px;
			}
		}
		.league_date{
			margin-bottom: 15px;
			.date_block{
				.date_head{
					color: #909090;
					font-size: 16px;
					margin-bottom: 12px;
				}
				.date_btom{
					/deep/ .el-date-editor {
						width: 230px;
						height: 59px;
						border-radius: 20px;
						background-color: #000000;
						// /deep/ .el-input__inner {
						// 	background-color: #000000;
						// 	color: #ffffff;
						// 	height: 59px;
						// 	border-radius: 20px;
						// 	border: 1px solid #000000;
						// }
					}
					/deep/ .el-input__inner {
						background-color: #000000;
						color: #ffffff;
						height: 59px;
						border-radius: 20px;
						border: 1px solid #000000;
					}
				}
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
					width: 24%;
				}
				.table_text2{
					// width: 6.5%;
					width: 9%;
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
					font-family:'Roboto-Regular';
					.table_info1{
						width: 24%;
						.tinfo_block{
							display: flex;
							align-items: center;
							.tinfo_team{
								width: 39px;
								height: 39px;
								border-radius: 50%;
								margin-right: 54px;
							}
							.tinfo_text{
								color: #989898;
							}
						}
					}
					.table_info2{
						// width: 6.5%;
						width: 9%;
					}
				}
				.leag_table_btom:nth-child(2n){
					background-color:#1B2023;
				}
			}
		}
	}
</style>
