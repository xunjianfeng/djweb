<template>
	<div class="index">
		<div class="container">
			<LeftView :index="3"></LeftView>
			<div class="content_right">
				<!-- content_right_top -->
				<div class="upcoming_right_form">
					<div class="content_right_nav">						
						<div class="right_nav_right">
							<p :class="state_index == 2?'av':''" @click="switch_state(2)">In Progress</p>
							<p :class="state_index == 1?'av':''" @click="switch_state(1)">Upcoming</p>
							<p :class="state_index == 3?'av':''" @click="switch_state(3)">History</p>
						</div>
					</div><!-- content_right_nav -->
					<!-- 赛事card -->
					<div class="upcom_container">
						<!-- 没有数据 -->
						<div class="no_data_area"  v-if="(state_index==2 && card_info == '') || (state_index==1 && card_info == '') || (state_index==3 && card_info == '')" >
							<div class="no_data">
								<img src="../../assets/images/no_tournament.svg" />
								<div class="no_data_text">No data</div>
							</div>
						</div>
						<!-- 有数据 -->
						<div class="upcom_card"  v-for="(item,index) in card_info" :key='index'>
							<div class="upcom_left">
								<img class="upcom_left_img" :src="HOST + item.tournamentCover" >
								<!-- <div class="upcom_position" v-if="item.state != '' || item.state != null ">
									<img class="upcom_position_img" src="../../assets/images/position.png" >
								</div> -->
								<div class="myam_botm" v-if="item.users != '' ">
									<div class="myam_btom_left">
										<div class="myam_img" v-for="(utem,udex) in item.users" :key='udex'>
											<el-image :src="HOST +  utem.avatar" class="avatar_img">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default.png" class="avatar_img"/>
												</div>
											</el-image>
											<!-- <img  :src="HOST + utem.avatar" v-if="utem.avatar"> -->
											<!-- <img src="../../assets/images/default.png" v-else /> -->
										</div>
									</div>
								</div>
							</div>
							<div class="upcom_right">
								<div class="upcom_tit">{{item.tournamentName}}</div>
								<div class="upcom_time">{{initDete(item.tournamentTime)}}</div>
								<div class="upcom_flex">
									<div class="upcom_flex_left">
										<div class="flex_left_img">
											<img src="../../assets/images/icon1.png" >
										</div>
										<div class="flex_left_img">
											<img src="../../assets/images/icon2.png" >
										</div>
									</div>
									<div class="upcom_flex_right">
										<div class="flex_right_img">
											<el-image :src="HOST +  item.gameLogo" class="game_img">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default_game.png" class="game_img"/>
												</div>
											</el-image>
											<!-- <img :src="HOST + item.gameLogo" v-if="item.gameLogo"> -->
											<!-- <img src="../../assets/images/default_game.png" v-else/> -->
										</div>
									</div>
								</div>
								<!-- <div class="upcom_flex_text">
									<div class="text_left">Format</div>
									<div class="text_right">Single Elimination</div>
								</div>
								<div class="upcom_flex_text">
									<div class="text_left">Best Of</div>
									<div class="text_right">4</div>
								</div>
								<div class="upcom_flex_text">
									<div class="text_left">Progressed To</div>
									<div class="text_right">Round 1</div>
								</div> -->
								<div class="upcom_flex_text2" style="border-top: 1px solid #BF9D62;">
									<div class="text_left">Total Value</div>
									<div class="text_right">{{item.bonus || 0}} MYR</div>
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
	import {teamTournament} from '@/api/team';
	import LeftView from '@/components/team/left.vue'
	export default{
		name:"tour_upcoming",
		components:{
			LeftView
		},
		data(){
			return{
				listQuery: {
					teamId:sessionStorage.getItem("teamId"),
					state:2, //1 未开始 2 已经开始 3 已经结束
				},
				state_index:2,
				card_info:[], //赛事记录
			}
		},
		mounted() {
			console.log(this.listQuery.teamId)
			this.get_tournament();
		},
		methods:{
			switch_state(index){
				let that = this;
				that.state_index = index
				that.listQuery.state = index
				that.get_tournament();
			},
			// 获取战队参与的赛事记录
			get_tournament(teamId){
				let that = this;
				teamTournament(that.listQuery).then(res => {
					console.log(res.data)
					that.card_info = res.data
				})
			},
		}
	}
</script>

<style lang="less" scoped>
.container{
	width: calc(100% - 150px);
	margin-left: 61px;
	display: flex;
	// justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	.content_right{
		margin-left: 133px;
		width: calc(100% - 435px);
		.upcoming_right_form{
			margin-top: 80px;
			.content_right_nav{
				display: flex;
				align-items: center;
				.right_nav_right{
					p{
						display: inline-block;
						color: #898989;
						padding: 0 30px;
						font-size: 18px;
						cursor: pointer;
						font-family:'Quicksand-Bold';
						border-right: 1px solid #7F7F7F;
					}
					p{
						
						&:last-child{
							border: none;
						}
					}
					.av{
					  color: #BF9D62;
					  font-family:'Quicksand-Bold';
					}
				}
			}
			.upcom_container{
				display: flex;
				flex-wrap: wrap;
				margin-top: 50px;
				.no_data_area{
					width: 100%;
					height:550px;
					display: flex;
					align-items: center;
					justify-content: center;
					.no_data{
						text-align: center;
						img{
							
						}
						.no_data_text{
							color: #565656;
							font-size: 22px;
							margin-top: 20px;
						}
					}
				}
				.upcom_card{
					width: 985px;
					height: 371px;
					background: #000000;
					border: 2px solid #232323;
					border-radius: 16px;
					display: flex;
					justify-content: space-between;
					margin-bottom: 28px;
					overflow: hidden;
					cursor:pointer;
					.upcom_left{
						width: 369px;
						height: 371px;
						position: relative;
						.upcom_left_img{
							width: 369px;
							height: 371px;
						}
						//定位
						.upcom_position{
							position: absolute;
							right: -13px;
							top: -11px;
							.upcom_position_img{
								width: 220px;
							}
						}
						.myam_botm{
							position: absolute;
							bottom: 0;
							display: flex;
							align-items: center;
							width: 100%;
							background: rgba(0, 0, 0, 0.6);
							.myam_btom_left{
								display: flex;
								padding: 10px 20px;
								.myam_img{
									width: 43px;
									height: 43px;
									border-radius: 18px;
									overflow: hidden;
									margin-right: 7px;
									.avatar_img{
										width: 43px;
										height: 43px;
										object-fit: cover;
									}
								}
							}
						}
					}
					.upcom_right{
						width: 55%;
						padding: 41px 30px 0px  30px ;
						.upcom_tit{
							font-size: 21px;
							color: #fff;
							line-height: 27px;
							font-family:'Quicksand-Bold';
							margin-bottom: 30px;
						}
						.upcom_time{
							color: #D3AA53;
							font-size: 18px;
							font-family:'Roboto-Regular';
							margin: 10px 0;
						}
						.upcom_flex{
							display: flex;
							align-items: center;
							justify-content: space-between;
							.upcom_flex_left{
								display: flex;
								align-items: center;
								.flex_left_img{
									width: 45px;
									height: 45px;
									background: #0E0F11;
									border-radius: 12px;
									display: flex;
									align-items: center;
									justify-content: center;
									margin-right: 12px;
									img{
										width: 45px;
										height: 45px;
									}
								}
							}
							.upcom_flex_right{
								.flex_right_img{
									width: 55px;
									height: 57px;
									.game_img{
										width: 55px;
										height: 57px;
									}
								}
							}
						}
						.upcom_flex_text{
							display: flex;
							align-items: center;
							line-height: 35px;
							justify-content: space-between;
							.text_left{
								color: #BF9D62;
								font-family:'Roboto-Regular';
								font-size: 18px;
							}
							.text_right{
								color: #ffffff;
								font-family:'Roboto-Regular';
								font-size: 18px;
							}
						}
						.upcom_flex_text2{
							display: flex;
							align-items: center;
							line-height: 35px;
							padding-top: 12px;
							margin-top: 10px;
							justify-content: space-between;
							.text_left{
								color: #BF9D62;
								font-family:'Roboto-Regular';
								font-size: 18px;
								font-weight: 500;
							}
							.text_right{
								color: #ffffff;
								font-size: 22px;
								font-family:'Roboto-Bold';
							}
						}
					}
				}
			}
		}
	}
}
</style>
