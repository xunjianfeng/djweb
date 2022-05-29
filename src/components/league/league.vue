<template>
	<div class="index">
		<div class="container">
			<div class="switch_leag_left">
				<div class="switch_leag_left_col">
					<p :class="nav==1?'av':''" @click="navs(1,leagueId)">Teams</p>
					<p :class="nav==2?'av':''" @click="navs(2,leagueId)">Fixtures</p>
					<p :class="nav==3?'av':''" @click="navs(3,leagueId)">Standing</p>
					<p :class="nav==4?'av':''" @click="navs(4,leagueId)">Results</p>
					<p :class="nav==5?'av':''" @click="navs(5,leagueId)">Transfer</p>
					<p :class="nav==6?'av':''" @click="navs(6,leagueId)">Info</p>
					<p :class="nav==7?'av':''" @click="navs(7,leagueId)">Top Players</p>
					<p :class="nav==8?'av':''" @click="navs(8,leagueId)">Highlights</p>
					<p :class="nav==9?'av':''" @click="navs(9,leagueId)">Redemption</p>
				</div>
			</div>
			<!-- 右侧栏 -->
			<div class="switch_right">
				<div class="float_right_block" @click="west_status =! west_status " v-if="leagueItem.leagueType == 'Premier'">
					<div :class="west_status ?'flota_rotate rotate_color':'flota_rotate'">PREMIER</div>
				</div>
				<div class="float_right_block" v-if="leagueItem.leagueType == 'Armature'" @click="west_status =! west_status ">
					<div class="flota_rotate">AMATEUR</div>
				</div>
			</div>
			<!-- 右侧弹窗 -->
			<div class="west_three_rapic" v-if="west_status">
				<div class="league_table">
					<div class="leag_table_head">
						<!-- <div class="table_text1">Date</div> -->
						<div class="table_text1">Player Name</div>
						<div class="table_text2">W</div>
						<div class="table_text2">Points</div>
					</div>
					<div class="leag_table_btom_container">
						<div class="leag_table_btom" v-for="(item,index) in list" :key='index'>
							<!-- <div class="table_info1">
								<div class="info1_date">
									{{item.date}}
								</div>
							</div> -->
							<div class="table_info1">
								<div class="tinfo_block">
									<img class="tinfo_team" :src="HOST + item.team.teamLogo" alt="">
									<div class="tinfo_text">{{item.team.teamName}}</div>
								</div>
							</div>
							<div class="table_info2">{{item.w}}</div>
							<div class="table_info2">{{item.point}}</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		leagueStanding
	} from '@/api/league.js'
	export default {
		name: "league",
		components: {},
		props: ['index'],
		data() {
			return {
				nav: this.index,
				west_status: false,
				leagueId: 0,
				leagueItem: {},
				list: [
					// {
					// 	date:'Matchday 1 23 July, 2021',
					// 	player:'LLPSA',
					// 	W:'1',
					// 	Points:'3',
					// },
					// {
					// 	date:'Matchday 1 23 July, 2021',
					// 	player:'LLPSA',
					// 	W:'1',
					// 	Points:'3',
					// },

				]
			};
		},
		mounted() {
			// this.leagueItem = this.$route.query.leagueItem
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			// this.leagueId = this.$route.query.leagueId
			this.leagueId = this.leagueItem.id
			// console.log(this.leagueItem,"leagueItem")
			// console.log(this.leagueId,"leagueId")
			this.showStanding()
			// console.log(this.leagueItem)
		},
		methods: {
			showStanding() {
				let params = {
					// leagueId: this.$route.query.leagueId,
					leagueId: this.leagueId
				}
				leagueStanding(params).then(res => {
					// console.log(res)
					this.list = res.data.list
					console.log(this.list,"list")
				})
			},
			navs(index, leagueId) {
				if (index == 1) {
					this.$router.push({
						path: '/league/teams',
						query: {
							leagueId: this.leagueId
						}
					})
				} else if (index == 2) {
					this.$router.push({
						path: '/league/fixtures',
						query: {
							leagueId: this.leagueId
						}
					})
				} else if (index == 3) {
					this.$router.push({
						path: '/league/standing',
						query: {
							leagueId: this.leagueId
						}
					})
				} else if (index == 4) {
					this.$router.push({
						path: '/league/results',
						query: {
							leagueId: this.leagueId
						}
					})
				} else if (index == 5) {
					this.$router.push({
						path: '/league/transfer',
						query: {
							leagueId: this.leagueId
						}
					})
				} else if (index == 6) {
					this.$router.push({
						path: '/league/info',
						query: {
							leagueId: this.leagueId
						}
					})
				} else if (index == 7) {
					this.$router.push({
						path: '/league/top_players',
						query: {
							leagueId: this.leagueId
						}
					})
				} else if (index == 8) {
					this.$router.push({
						path: '/league/highlights',
						query: {
							leagueId: this.leagueId
						}
					})
				} else if (index == 9) {
					this.$router.push({
						path: '/redemption/redemption'
					})
					sessionStorage.setItem("nav_status", 6)
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.container {
		.switch_leag_left {
			.switch_leag_left_col {
				display: flex;
				align-items: center;
				font-family: 'Roboto-Regular';

				p {
					cursor: pointer;
					color: #898989;
					font-size: 20px;
					padding-right: 39px;
					margin: 0 39px 0 0;
					border-right: 1px solid #7F7F7F;
				}

				p:last-child {
					padding-right: 0;
					margin-right: 0;
					border-right: 0px;
				}

				.av {
					color: #BF9D62;
					font-family: 'Roboto-Bold';
				}
			}
		}

		.switch_right {
			height: 100%;
			position:fixed;
			right: 0;
			top: 0;
			margin-top: 16%;

			.float_right_block {
				width: 102px;
				height: 278px;
				background: #03060D;
				border-radius: 18px 0px 0px 18px;
				color: #C9C9C9;
				font-size: 24px;
				display: flex;
				align-items: center;
				margin-bottom: 23px;
				cursor: pointer;

				.flota_rotate {
					transform: rotate(-90deg);
				}

				.rotate_color {
					color: #DBA83F;
				}
			}
		}

		// 弹窗
		.west_three_rapic {
			position: absolute;
			right: 140px;
			// bottom: 140px;
			z-index: 999;
			width: 943px;
			background: #000000;
			border-radius: 44px 31px 31px 44px;
			overflow: hidden;
			display: flex;
			flex-flow: column;

			.league_table {
				margin-bottom: 60px;

				.leag_table_head {
					display: flex;
					align-items: center;
					border-bottom: 2px solid #2D2D2D;
					padding: 34px 0 20px 0;
					margin: 0 4% 0 4%;
					color: #E4E4E4;
					font-weight: bold;
					font-size: 18px;

					.table_text1 {
						// width: 25%;
						width: 33%;
					}

					.table_text2 {
						// width: 25%;
						width: 33%;
						text-align: center;
					}
				}

				.leag_table_btom_container {
					.leag_table_btom {
						height: 74px;
						display: flex;
						align-items: center;
						margin: 0 3% 0 3%;
						padding: 0 1% 0 1%;
						color: #989898;
						font-size: 18px;

						.table_info1 {
							// width: 25%;
							width: 33%;
							// .info1_date {
							// 	width: 50%;
							// }

							.tinfo_block {
								display: flex;
								align-items: center;

								.tinfo_team {
									width: 39px;
									height: 39px;
									border-radius: 50%;
									margin-right: 54px;
								}

								.tinfo_text {
									color: #989898;
								}
							}
						}

						.table_info2 {
							// width: 25%;
							width: 33%;
							text-align: center;
						}
					}

					.leag_table_btom:nth-child(2n) {
						background-color: #1B2023;
					}
				}
			}
		}
	}
</style>
