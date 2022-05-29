<template>
	<div class="index">
		<div class="container">
			<LeftView :index="1" ></LeftView>
			<div class="content_right">
				<!-- content_right_top -->
				<div class="content_right_form">
					<div  class="about_team_container">
						<div class="about_block">
							<div class="about_block_padding">
								<div class="about_left">
									<img :src="HOST + team_info.teamLogo " alt="">
								</div>
								<div class="about_right">
									<div class="about_tit">
										<div class="tit_name">{{team_info.teamName}}</div>
										<div class="tit_dota">{{team_info.gameName}}</div>
									</div>
									<div class="about_version">{{team_info.aboutTeam}}</div>
								</div>
							</div>
						</div>
						<!-- Tournament Situation  块 -->
						<div class="about_sintuation">
							<div class="sintua_head">
								Tournament Situation
							</div>
							<div class="sintua_content">
								<div class="sintua_census">
									<div class="census_block">
										<div class="census_tit">Total Tournament</div>
										<div class="census_num">{{team_info.runnerUp || 0}}</div>
									</div>
									<div class="census_block">
										<div class="census_tit">Officially</div>
										<div class="census_num">{{team_info.officially || 0}}</div>
									</div>
									<div class="census_block">
										<div class="census_tit">Privately</div>
										<div class="census_num">{{team_info.privately || 0}}</div>
									</div>
								</div>
								<div class="sintue_trophy">
									<div class="trophy_block">
										<div class="trophy_img">
											<img src="../../assets/images/ran.png" alt="">
										</div>
										<div class="trophy_right">
											<div class="census_tit">CHAMPION</div>
											<div class="census_num">{{team_info.champion || 0}}</div>
										</div>
									</div>
									<div class="trophy_block">
										<div class="trophy_img">
											<img src="../../assets/images/ran2.png" alt="">
										</div>
										<div class="trophy_right">
											<div class="census_tit">RUNNER UP</div>
											<div class="census_num">{{team_info.runnerUp || 0}}</div>
										</div>
									</div>
									<div class="trophy_block">
										<div class="trophy_img">
											<img src="../../assets/images/ran3.png" alt="">
										</div>
										<div class="trophy_right">
											<div class="census_tit">THIRD PLACE</div>
											<div class="census_num">{{team_info.thirdPlace || 0}}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {teamAchievement} from '@/api/team';
	import LeftView from '@/components/team/left.vue'
	export default{
		name:"team_about",
		components:{
			LeftView
		},
		data(){
			return{
				teamId:sessionStorage.getItem("teamId"),
				team_info:'',
				member_list:'',
			}
		},
		mounted() {
			this.get_team(sessionStorage.getItem("teamId"))

		},
		methods:{
			// 战队详细信息
			get_team(teamId){
				let that = this;
				let params = {
					teamId
				}
				teamAchievement(params).then(res => {
					that.team_info = res.data
					sessionStorage.setItem("leaderId", res.data.leaderId)
					// console.log(sessionStorage.getItem('leaderId'))
				})
			},
		}
	}
</script>

<style lang="less" scoped>
.container{
	width: calc(100% - 150px);
	margin-left: 61px;
	margin-bottom: 100px;
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	.content_right{
		width: calc(100% - 370px);
		.content_right_form{
			// margin-top: 110px;
			margin-top: 95px;
			.about_team_container{
				display: flex;
				flex-wrap: wrap;
				.about_block{
					width: 100%;
					background-color: #0E0F11;
					border-radius: 17px;
					margin: 0 0px 30px 0px;
					padding-bottom: 60px;
					.about_block_padding{
						display: flex;
						padding: 48px 60px 0px 77px;
						.about_left{
							width: 184px;
							display: flex;
							align-items: center;
							margin-right: 81px;
							img{
								width: 184px;
								height: 184px;
								border-radius: 50%;
								overflow: hidden;
								object-fit: cover;
							}
						}
						.about_right{
							width: 75%;
							.about_tit{
								margin: 0px 0px 0px 0px;
								display: flex;
								align-items: center;
								justify-content: space-between;
								padding-bottom: 16px;
								border-bottom: 2px solid #3C3E3F;
								.tit_name{
									color: #FFFFFF;
									font-size: 30px;
									font-family:'Roboto-Bold';
								}
								.tit_dota{
									color: #D3AA53;
									font-size: 20px;
									font-family:'Roboto-Regular';
								}
							}
							.about_version{
								color: #8E8E8E;
								font-size: 20px;
								line-height: 25px;
								// height: 222px;
								font-family:'Roboto-Regular';
								word-break: break-all;
								margin:19px  0px 0px  0px;
							}
							
						}
					}
				}
			}
			.about_sintuation{
				width: 100%;
				padding-bottom: 20px;
				background: #0E0F11;
				border-radius: 17px;
				.sintua_head{
					height: 66px;
					line-height: 66px;
					font-size: 18px;
					color: #D3AA53;
					padding: 0 20px;
					font-family:'Roboto-Regular';
					border-bottom: 2px solid #3C3E3F;
				}
				.sintua_content{
					.sintua_census{
						display: flex;						
						margin: 32px 0 21px 38px;
						.census_block{
							margin-right: 119px;
							.census_tit{
								color: #5A6168;
								font-size: 18px;
								font-family:'Roboto-Regular';
								margin-bottom: 11px;
							}
							.census_num{
								color: #FFFFFF;
								font-family:'Roboto-Medium';
								font-size: 25px;
							}
						}
					}
					.sintue_trophy{
						display: flex;
						padding: 0 20px;
						.trophy_block{
							width: 295px;
							height: 151px;
							background: #1D2023;
							border-radius: 28px;
							margin-right: 85px;
							display: flex;
							align-items: center;
							.trophy_img{
								margin-right: 31px;
								margin-left: 31px;
								img{
									width: 72px;
									height: 97px;

								}
							}
							.trophy_right{
								.census_tit{
									font-family:'Roboto-Regular';
									color: #727272;
									font-size: 16px;
									margin-bottom: 6px;
								}
								.census_num{
									color: #FFFFFF;
									font-size: 25px;
									font-family:'Roboto-Medium';
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
