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
					<LeagueSwitch :index="6"></LeagueSwitch>
				</div>
			</div>
			<div class="league_table">
				<!-- <div class="league_info_tit">KEJOHANAN MY ESPORTS PES 20 PERINGKAT NEGERI SARAWAK.</div> -->
				<div class="league_info_tit">{{leagueItem.title}}</div>
				<!-- <div class="league_info_bac">
					<img src="../../assets/images/league.png" alt="">
				</div> -->
				<div class="league_info_text" v-html="leagueInfo.introduction">
					<!-- {{leagueInfo.introduction}} -->
				</div>
				<!-- <div class="league_info_text">
					Berita Gembira Kepada Semua Peminat PRO EVOLUTION SOCCER 20!! Jabatan Belia dan Sukan Negeri Sarawak - Rasmi dengan ker-
					jasama Persatuan Sukan Elektronik Negeri Sarawak (SESA) akan mengadakan kejohanan MY Esports PES20 Peringkat Negeri Sarawak 
					secara ATAS TALIAN (ONLINE TOURNAMENT).
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	import LeagueSwitch from '@/components/league/league.vue'
	import {leagueInfo} from '@/api/league.js'
	export default {
		name: "info",
		components:{
			LeagueSwitch
		},
		data() {
			return {
				h_swith:1,
				leagueInfo:{},
				leagueItem:{}
			}
		},
		mounted() {
			// console.log(this.$route.query.leagueId)
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			this.getInfo()
		},
		methods: {
			hswith(index){
				this.h_swith = index
			},
			getInfo(){
				let pamas = {
					leagueId: this.$route.query.leagueId
				}
				leagueInfo(pamas).then(res => {
					this.leagueInfo = res.data
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
		.league_table{
			width: calc(100% - 36px);
			background: #03060D;
			margin-bottom: 70px;
			border-radius: 17px;
			padding-bottom: 40px;
			.league_info_tit{
				padding:50px 0px 40px 52px;
				font-size: 25px;
				color: #FFFFFF;
				font-weight: bold;
				font-family:'Roboto-Bold';
			}
			.league_info_bac{
				padding-left:52px;
				margin-bottom: 30px;
				img{
					width: 768px;
				}
			}
			.league_info_text{
				width: 75%;
				padding-left:52px;
				color: #999999;
				font-size: 18px;
				line-height: 23px;
				font-family:'Roboto-Regular';
			}
		}
	}
</style>
