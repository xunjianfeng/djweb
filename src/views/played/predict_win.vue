<template>
	<div class="index">
		<div class="container">
			<!-- 我的竞猜 -->
			<div class="my_predict" v-if="check_status == true">
				<div class="mark_check"  @click.stop="check_status = false">
					<img src="@/assets/images/cancel.png" >
				</div>
				<div class="mark_bac"></div>
				<div class="mark_check_container" v-if="check_status == true">
					<div class="text_title">My Predict</div>
					<!-- <div class="text_title" v-if="nav_index == 2">Result Predict</div> -->
					<div class="mark_my_content">
						<div class="content_top">
							<div class="selected_user_list" v-for="(item,index) in predict_info.registrationResults">
								<div  :class="item.registrationTeams.length <=3 ?'user_selected':'user_selected_padding'" v-for="(ttem,tndex) in item.registrationTeams" :key="tndex">
									<div :class="tndex+1 == 1?'text_rank': (tndex+1) == 2?'text_rank2': tndex+1 == 3 ? 'text_rank3':'text_rank4'">
										 {{tndex+1 == 1 ? '1st' : tndex+1 == 2 ? '2nd' : tndex+1 == 3 ? '3rd': tndex+1 +'rd'  }}
									</div>
									<div class="img_area">
										<img :src="HOST + ttem.teamLogo" />
									</div>
									<div class="user_info">
										<div class="user_name">{{ttem.teamName}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 竞猜的最终结果 -->
			<div class="result_predict" v-if="result_status == true">
				<div class="mark_check"  @click.stop="result_status = false">
					<img src="@/assets/images/cancel.png" >
				</div>
				<div class="mark_bac"></div>
				<div class="container_content_2" v-if="result_status == true">
					<div class="text_title">Result Predict</div>
					<div class="list_table">
						<div class="header">
							<div class="label_left">
								<div class="label">Winner</div>
								<!-- <div class="join_num">{{predict_info.registeredPersons}}Person</div> -->
							</div>
							<div class="label_right">Prize</div>
						</div>
						<div class="list_body">
							<div  v-for="(ltem,ldex) in predict_list" :key="ldex" :class="ltem.winCoin != null ?'list_row_av':'list_row' ">
								<!-- <div class="row_col_4" v-if="ltem.winCoin != null">Winner</div> -->
								<div class="row_col_1">
									<img :src="HOST + ltem.userInfo.avatar" class="avatar_img" v-if="ltem.userInfo.avatar"/>
									<img src="../../assets/images/default.png" class="avatar_img" v-else/>
									<div class="col_right">
										<div class="join_name">{{ltem.userInfo.fullName}}</div>
										<div class="join_time">{{ltem.createTime}}</div>
									</div>
								</div>
								<div class="row_col_2">{{ltem.fee}} Coins</div>
								<div class="row_col_3" >
									<div style="display: flex;">
										<div class="col_scroll" v-for="(teaem,tidex) in ltem.predictTeams" :key="tidex">
											<div v-if="tidex+1 === 1" class="rank_1">1st</div>
											<div v-if="tidex+1 === 2" class="rank_2">2nd</div>
											<div v-if="tidex+1 === 3" class="rank_3">3rd</div>
											<div v-if="tidex+1 > 3" class="rank_4">{{tidex+1}}th</div>
											<div class="city_name">{{teaem.teamName}}</div>
										</div>
									</div>
								</div>
								<div class="row_col_4">{{ltem.winCoin}} Coins</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			<LeftView :index="3"></LeftView>
			<div class="content_right">
				<div class="upcoming_right_form">
					<div class="content_right_nav">						
						<div class="right_nav_right">
							<p @click="jump_playd(1)">Tounament</p>
							<p @click="jump_playd(2)">Rapid Challenge</p>
							<p @click="jump_playd(3)">League</p>
							<p class="av" @click="jump_playd(4)">Predict and Win</p>
						</div>
					</div><!-- content_right_nav -->
					<div class="my_contaniner">
						<div class="my_order_table">
							<div class="order_table_head">
								<div :class="nav_index == 1 ? 'table_head_title text_color' : 'table_head_title'" @click="tanNav(1)">Processing</div>
								<div :class="nav_index == 2 ? 'table_head_title text_color' : 'table_head_title'" @click="tanNav(2)">History</div>
							</div>
							<div class="order_table_btom">
								<div class="choice-contani">
									<p class="choice_text">Game Type</p>
									<div class="choice_date" @click="jump_dota">
										<div class="date_date">{{gameName}}</div>
										<div class="date_img">
											<img src="../../assets/images/more2.png" alt="">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 没有数据 -->
					<div class="no_data_area" v-if="list == ''">
						<div class="no_data">
							<img src="../../assets/images/no_tournament.svg" />
							<div class="no_data_text">No any data</div>
						</div>
					</div>
					<!-- 竞猜card -->
					<div class="upcom_container" v-if="list != ''">
						<div class="predict_card" v-for="(item,index) in list" :key="index">
							<div class="card_left">
								<img class="card_left_img" :src="HOST + item.poster" />
							</div>
							<div class="card_right">
								<div class="right_top">
									<div class="label">End at {{item.endTime}}</div>
									<div class="text">{{item.title}}</div>
								</div>
								<div class="right_center">
									<div class="bottom_left">
										<div class="label">Prize</div>
										<div class="text_value">{{item.totalPrize}} Coins</div>
									</div>
									<div class="bottom_center"  v-if="item.videoLink != null && item.videoLink != ''">
										<div class="label">Tournamemt Link</div>
										<div class="text_link" @click.stop="open_link(item.videoLink)">{{item.videoLink}}</div>
									</div>
									<!-- 设计师要求不需要展示 -->
									<!-- <div class="bottom_right">
										<div class="label">Join Predict</div>
										<div class="text_num">19092 Person</div>
									</div> -->
								</div>
								<div class="right_bottom" @click="showPrrdict(item.id)"  v-if="nav_index == 1">
									<img src="../../assets/images/eye_another.png" class="eye_icon" />
									<div class="show_text">View my predict</div>
								</div>
								<div class="right_bottom" @click="showResult(item.id)"  v-if="nav_index == 2">
									<img src="../../assets/images/eye_another.png" class="eye_icon" />
									<div class="show_text">View results</div>
								</div>
							</div>
						</div>
						<!-- <div class="upcom_card" >
							<div class="win_in_content">
								<div class="win_in_top">
									<div class="win_top_left">
										<div class="win_img">
											<img src="../../assets/images/img.png" alt="">
										</div>
										<div class="win_top_border">
											<img src="../../assets/images/radiu1.png" alt="">
											<span>Manchester City</span>
										</div>
									</div>
									<div class="win_in_img">
										<img src="../../assets/images/bs.png" alt="">
									</div>
									<div class="win_top_right">
										<div class="win_top_border">
											<img src="../../assets/images/radiu1.png" alt="">
											<span>CHELESEA</span>
										</div>
										<div class="win_right_text">
											2th September 2020 20:00(UTC+8)
										</div>
									</div>
								</div>
								<div class="win_in_btom">
									<div class="win_btom_text">My Predict Winner</div>
									<div class="win_btom_text2">Manchester City</div>
								</div>
							</div>
							
						</div>
						 -->
					</div>
					
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/order/left.vue'
	import {predictListPage,predictResult,predictRegistrations} from '@/api/predict';
	export default {
		name: "predict_win",
		components: {
			LeftView
		},
		data() {
			return {
				list:[],
				listQuery: {
					order: '',   // NEW_TO_OLD表示从新到旧，OLD_TO_NEW表示从旧到新
					keyword: '', // 搜索关键字
					top: '',   // 是否置顶，true表示置顶，false表示不置顶
					currentUserOnly:true,//是否只查询当前用户参与过的竞猜, true表示参加过  false表示未参加
					gameId:'',
					page: 1,
					size:10,
					completed:false //是否已完成，true表示已完成  false表示进行中
				},
				result_status:false,//查看结果弹窗
				check_status:false,//查看我投注的队伍弹窗
				predict_info:'',//查看竞猜结果
				nav_index:1,
				predict_list:[],//竞猜队伍
				gameName:'Please select'
			};
		},
		mounted() {
			console.log('compainon.....')
			this.getList()
		},
		methods: {
			//gameType筛选
			jump_dota(){
				this.$router.push({path:'/tournament/filter_game',query:{type:4}})
			},
			tanNav(index){
				this.nav_index = index
				if(this.nav_index == 1){
					this.listQuery.completed = false
					this.getList()
				}else if(this.nav_index == 2){
					this.listQuery.completed = true
					this.getList()
				}
			},
			// 列表
			getList() {
				let that = this;
				if(this.$route.query.gameId != undefined && this.$route.query.gameId != '' && this.$route.query.gameId != null){
					this.listQuery.gameId = this.$route.query.gameId
					this.gameName = this.$route.query.gameName
				}
				predictListPage(that.listQuery).then(res => {
					const {
						list,total
					} = res.data
					that.total_count = total
					that.list = list;
					// console.log('竞赛列表')
					// console.log(that.list)
				})
			},
			//打开链接
			open_link(link){
				window.open(link) 
			},
			//查看我竞猜的队伍
			showPrrdict(id){
				this.check_status = true
				// console.log(id)
				let params = {
					predictId:id
				}
				predictResult(params).then(res => {
					this.predict_info = res.data
					// console.log(this.predict_info)
					// console.log(res.data.registrationResults.registrationTeams)
				})
			},
			//查看竞猜结果
			showResult(id){
				this.result_status = true
				let params = {
					predictId:id
				}
				predictRegistrations(params).then(res => {
					this.predict_list = res.data
				})
			},
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
			},
			
		}
	};
</script>
<style lang="less" scoped>
	.container {
		width: 90%;
		margin-left: 61px;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;
		/* 换行 */
		padding-bottom: 30px;
		.my_predict{
			position: fixed;
			z-index: 99;
			top: 100px;
			.mark_check{
				position: fixed;
				right: 80px;
				top: 140px;
				z-index: 99;
				img{
					width: 46px;
					height: 46px;
					cursor: pointer;
				}
				z-index: 999;
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
			.mark_check_container{
				position: absolute;
				left: 390px;
				top: 120px;
				// left: 357px;
				// top: calc(100% - 1150px);
				z-index: 999;
				width: 650px;
				padding: 48px 45px 50px;
				background: #0E0F11;
				border-radius: 27px;
				overflow: hidden;
				display: flex;
				flex-flow: column;
				align-items: center;
				text-align: left;
				.text_title{
					color: #DBA83F;
					font-size: 24px;
					// text-align: center;
					margin-bottom: 30px;
					font-family:'Quicksand-Bold';
				}
				.mark_my_content{
					width: 100%;
					.content_top{
						padding: 0 30px 0 0;
						height: 410px;
						// display: flex;
						// justify-content: center;
						overflow-y: scroll;
						.flex_center{
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.selected_user_list{
							// width: 100%;
							margin-top: 20px;
							display: flex;
							// flex-wrap: wrap;
							// justify-content: center;
							overflow-x: scroll;
							.user_selected{
								// width: 200px;
								// width: 22%;
								width: 180px;
								// height: 200px;
								background-color: #000000;
								padding: 25px 10px;
								// padding: 10px 0;
								margin: 0 0 20px 25px;
								// margin-right: 25px;
								border-radius: 20px;
								font-family:'Roboto-Regular';
								// margin-bottom: 20px;
								// line-height: 230px;
								// text-align: center;
								.text_rank{
									color: #D3AA53;
									font-size: 20px;
								}
								.text_rank2{
									color: #8C8C8C;
									font-size: 20px;
								}
								.text_rank3{
									color: #A8684C;
									font-size: 20px;
								}
								.text_rank4{
									color: #ffffff;
									font-size: 20px;
								}
								.img_area{
									margin-top: 20px;
									img{
										width: 86px;
										height: 86px;
										border-radius: 43px;
										object-fit: cover;
									}
								}
								.user_info{
									display: block;
									margin-top: 20px;
									.user_name{
										color: #ffffff;
										font-size: 18px;
									}
								}
							}
							.user_selected_padding{
								width: 22%;
								padding: 25px 37px;
								margin: 0 0 20px 25px;
								background-color: #000000;
								border-radius: 20px;
								font-family:'Roboto-Regular';
								.text_rank{
									color: #D3AA53;
									font-size: 20px;
								}
								.text_rank2{
									color: #8C8C8C;
									font-size: 20px;
								}
								.text_rank3{
									color: #A8684C;
									font-size: 20px;
								}
								.text_rank4{
									color: #ffffff;
									font-size: 20px;
								}
								.img_area{
									margin-top: 20px;
									img{
										width: 86px;
										height: 86px;
										border-radius: 43px;
										object-fit: cover;
									}
								}
								.user_info{
									display: block;
									margin-top: 20px;
									.user_name{
										// text-align: left;
										width: 130px;
										color: #ffffff;
										font-size: 18px;
										// background-color: #FFF000;
									}
								}
							}
							&::-webkit-scrollbar {
								/*滚动条整体样式*/
								width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
								height: 5px;
							}
							&::-webkit-scrollbar-thumb {
							/*滚动条里面小方块*/
							border-radius: 10px;
							box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
							// background   : #2B2B2B;
							background   : #000000;
							}
							&::-webkit-scrollbar-track {
							/*滚动条里面轨道*/
							box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
							border-radius: 10px;
							// background   : #000000;
							background   : #0E0F11;
							}
							
						}
						&::-webkit-scrollbar {
							/*滚动条整体样式*/
							width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
							height: 5px;
						}
						&::-webkit-scrollbar-thumb {
						/*滚动条里面小方块*/
						border-radius: 10px;
						box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
						// background   : #2B2B2B;
						background   : #000000;
						}
						&::-webkit-scrollbar-track {
						/*滚动条里面轨道*/
						box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
						border-radius: 10px;
						// background   : #000000;
						background   : #0E0F11;
						}
					}
					
				}
				
			}
		}
		.result_predict{
			position: fixed;
			z-index: 99;
			top: 100px;
			.mark_check{
				position: fixed;
				right: 80px;
				top: 140px;
				z-index: 99;
				img{
					width: 46px;
					height: 46px;
					cursor: pointer;
				}
				z-index: 999;
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
			.container_content_2{
				position: absolute;
				left:250px;
				top: 120px;
				// left: 357px;
				// top: calc(100% - 1150px);
				z-index: 999;
				width: 900px;
				padding: 48px 45px 50px;
				background: #0E0F11;
				border-radius: 27px;
				overflow: hidden;
				display: flex;
				flex-flow: column;
				align-items: center;
				text-align: left;
				.text_title{
					color: #DBA83F;
					font-size: 24px;
					// text-align: center;
					margin-bottom: 30px;
					font-family:'Quicksand-Bold';
				}
				.list_table{
					width: 100%;
					.header{
						// background-color: #2a2e3f;
						background-color: #1D2023;
						padding: 20px 0 20px 40px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.label_left{
							display: flex;
							align-items: center;
							font-family:'Roboto-Regular';
							.label{
								color: #727272;
								font-size: 17px;
								margin-right: 30px;
							}
							.join_num{
								color: #FFFFFF;
								font-size: 18px;
							}
						}
						
						.label_right{
							width: 10%;
							color: #dba83f;
							font-weight: bold;
							font-family:'Roboto-Regular';
							font-size: 18px;
						}
					}
					.list_body{
						.list_row{
							padding: 20px 20px 20px 40px;
							display: flex;
							align-items: center;
							border-bottom: 1px solid #727272;
							color: #FFFFFF;
							font-size: 18px;
							font-family:'Roboto-Regular';
							.row_col_1{
								width: 25%;
								display: flex;
								align-items: center;
								.avatar_img{
									width: 36px;
									height: 36px;
									border-radius: 8px;
									object-fit: cover;
									margin-right: 10px;
								}
								.col_right{
									.join_name{
										color: #FFFFFF;
										font-size: 18px;
										text-decoration: underline;
										margin-bottom: 5px;
									}
									.join_time{
										color: #727272;
										font-size: 16px;
									}
								}
							}
							.row_col_2{
								width: 15%;
							}
							.row_col_3{
								width: 60%;
								display: flex;
								overflow-x: scroll;
								// overflow-x: hidden;
								.col_scroll{
									width: 100px;
									margin-right: 20px;
									.rank_1{
										color: #D3AA53;
									}
									.rank_2{
										color: #8C8C8C;
									}
									.rank_3{
										color: #A8684C;
									}
									.rank_4{
										color: rgba(255,255,255,0.9);
									}
								}
								&::-webkit-scrollbar {
									/*滚动条整体样式*/
									width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
									height: 5px;
								}
								&::-webkit-scrollbar-thumb {
									/*滚动条里面小方块*/
									border-radius: 10px;
									box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
									// background   : #2A2D41;
									// background-color: #0E0F11;
									background   : #595959;
								}
								&::-webkit-scrollbar-track {
								/*滚动条里面轨道*/
									box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
									border-radius: 10px;
									// background   : #595959;
									background-color: #0E0F11;
								}
							}
							
						}
						.list_row_av{
							padding: 20px 20px 20px 40px;
							display: flex;
							align-items: center;
							border-bottom: 1px solid #727272;
							color: #FFFFFF;
							font-size: 18px;
							font-family:'Roboto-Regular';
							.row_col_1{
								width: 20%;
								display: flex;
								align-items: center;
								.avatar_img{
									width: 36px;
									height: 36px;
									border-radius: 8px;
									object-fit: cover;
									margin-right: 10px;
								}
								.col_right{
									.join_name{
										color: #FFFFFF;
										font-size: 18px;
										text-decoration: underline;
										margin-bottom: 5px;
									}
									.join_time{
										color: #727272;
										font-size: 16px;
									}
								}
							}
							.row_col_2{
								width: 10%;
							}
							.row_col_3{
								width: 58%;
								display: flex;
								overflow-x: scroll;
								// background-color: #FFF000;
								// margin-right: 10px;
								margin: 0 15px;
								.col_scroll{
									width: 100px;
									margin-right: 20px;
									.rank_1{
										color: #D3AA53;
									}
									.rank_2{
										color: #8C8C8C;
									}
									.rank_3{
										color: #A8684C;
									}
								}
								&::-webkit-scrollbar {
									/*滚动条整体样式*/
									width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
									height: 5px;
								}
								&::-webkit-scrollbar-thumb {
									/*滚动条里面小方块*/
									border-radius: 10px;
									box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
									// background   : #2A2D41;
									// background-color: #0E0F11;
									background   : #595959;
								}
								&::-webkit-scrollbar-track {
								/*滚动条里面轨道*/
									box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
									border-radius: 10px;
									// background   : #595959;
									background-color: #0E0F11;
								}
							}
							.row_col_4{
								width: 10%;
								text-align: center;
								// background-color: #FFFFB6;
							}
						}
					}
				}
			}
		}
		
		
		.content_right {
			width: calc(100% - 370px);
			.upcoming_right_form{
				margin-top: 50px;
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
				.my_contaniner{
					// width: 1000px;
					background: #0E0F11;
					border-radius: 29px;
					// margin: 40px 0 25px 0;
					margin: 20px 0 25px 0;
					.my_order_table{
						.order_table_head{
							padding: 20px 53px 0px 53px;
							height: 55px;
							font-size: 18px;
							display: flex;
							align-items: center;
							border-bottom:2px solid #2D2D2D;
							.table_head_title{
								width: 20%;
								color: #727272;
								font-family:'Roboto-Bold';
								cursor: pointer;
							}
							.text_color{
								color: #FFFFFF;
							}
						}
						.order_table_btom{
							padding: 25px 53px;
							font-size: 25px;
							display: flex;
							align-items: center;
							.choice-contani{
								.choice_text {
									font-size: 18px;
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									font-family:'Roboto-Regular';
								}
								.choice_date{
									width: 200px;
									height: 59px;
									background: #1d2023;
									border-radius: 20px;
									padding: 0 24px 0 16px;
									display: flex;
									align-items: center;
									justify-content: space-between;
									cursor: pointer;
									.date_date{
										color: #FFFFFF;
										font-size: 20px;
										font-family:'Roboto-Regular';
										font-weight: 400;
									}
									.date_img{
										width: 32px;
										// height: 21px;
										img{
											width: 32px;
											height: 21px;
											object-fit: fill;
										}
									}
								}
							}
							
							.status {
								.status_text {
									font-size: 18px;
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									font-family:'Roboto-Regular';
								}
							}
							.sort_by {
								.sort_by_text {
									font-size: 18px;
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									font-family:'Roboto-Regular';
								}
							}
							
							div {
								margin-right: 20px;
								.options {
									.dropdown {
										width: 10px;
										height: 8px;
										position: relative;
										right: 30px;
									}
									select {
										/*取消默认箭头开始*/
										appearance: none;
										-moz-appearance: none;
										-webkit-appearance: none;
										/*取消默认箭头结束*/
										width: 230px;
										height: 59px;
										background-color: #1d2023;
										color: #ffffff;
										font-family:'Roboto-Regular';
										border-radius: 20px;
										opacity: 1;
										border: none;
										font-size: 18px;
										padding-left: 20px;
										padding-right: 20px;
										width: 230px;
										height: 59px;
							
									}
								}
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
				.upcom_container{
					display: flex;
					flex-wrap: wrap;
					.predict_card{
						margin-bottom: 28px;
						width: 100%;
						// width: 1000px;
						// height: 320px;
						background: #000000;
						padding: 20px;
						border-radius: 25px;
						display: flex;
						align-items: flex-start;
						
						.card_left{
							width: 40%;
							.card_left_img{
								width: 100%;
								height: 210px;
								object-fit: cover;
							}
						}
						.card_right{
							margin-left: 50px;
							width: 50%;
							.right_top{
								.label{
									color: #757575;
									font-size: 16px;
								}
								.text{
									width: 80%;
									color: #FFFFFF;
									font-size: 24px;
									font-family:'Roboto-Regular';
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}
							.right_center{
								display: flex;
								align-items: center;
								justify-content: space-between;
								margin-top: 20px;
								.bottom_left{
									.label{
										color: #757575;
										font-size: 16px;
									}
									.text_value{
										width: 172px;
										height: 31px;
										background-color: #D3AA53;
										font-size: 24px;
										border-radius: 3px;
										line-height: 31px;
										font-family:'Quicksand-Regular';
									}
								}
								.bottom_center{
									.label{
										color: #757575;
										font-size: 16px;
									}
									.text_link{
										width: 130px;
										height: 31px;
										color: #D3AA53;
										font-size: 16px;
										line-height: 31px;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
										cursor: pointer;
									}
								}
								.bottom_right{
									.label{
										color: #757575;
										font-size: 16px;
									}
									.text_num{
										height: 31px;
										color: #FFFFFF;
										font-size: 16px;
										line-height: 31px;
									}
								}
							}
							.right_bottom{
								display: flex;
								align-items: center;
								margin-top: 60px;
								.eye_icon{
									width: 30px;
									height: 25px;
									cursor: pointer;
								}
								.show_text{
									font-family:'Roboto-Regular';
									color: #D3AA53;
									font-size: 18px;
									margin-left: 25px;
									cursor: pointer;
								}
							}
						}
					}
					
					.upcom_card{
						// width: 1000px;
						background: #0e0f11;
						border-radius: 29px;
						display: flex;
						margin-bottom: 28px;
						overflow: hidden;
						cursor:pointer;
						.win_in_content{
							width: 100%;
							.win_in_top{
								padding: 0px 20px 10px 20px;
								border-bottom:2px solid #2D2D2D;
								display: flex;
								justify-content: space-between;
								.win_top_left{
									width: 45%;
									display: flex;
									align-items: center;
									justify-content: space-between;
									.win_img{
										width: 50px;
										margin-right: 25px;
										img{
											width: 50px;
										}
									}
									.win_top_border{
										display: flex;
										align-items: center;
										width: 300px;
										height: 70px;
										padding: 0 15px;
										border-radius: 31px;
										border:2px solid #2D2D2D;
										img{
											width: 50px;
											height: 50px;
											border-radius: 50%;
											margin-right: 15px;
										}
										span{
											color: #fff;
											font-family:'Roboto-Regular';
											font-size: 20px;
										}
									}
								}
								.win_in_img{
									width: 50px;
									margin: 0 15px;
									img{
										width: 50px;
										height: 120px;
									}
								}
								.win_top_right{
									width: 45%;
									display: flex;
									align-items: center;
									justify-content: space-between;
									.win_top_border{
										display: flex;
										align-items: center;
										width: 300px;
										height: 70px;
										padding: 0 15px;
										border-radius: 31px;
										border:2px solid #2D2D2D;
										img{
											width: 50px;
											height: 50px;
											border-radius: 50%;
											margin-right: 15px;
										}
										span{
											color: #fff;
											font-size: 20px;
											font-family:'Roboto-Regular';
										}
									}
									.win_right_text{
										color: #727272;
										margin-left: 20px;
										font-family:'Roboto-Regular';
									}
								}
							}
							.win_in_btom{
								height: 60px;
								display: flex;
								align-items: center;
								padding: 0px 20px 0px 20px;
								.win_btom_text{
									color: #727272;
									font-size: 18px;
									margin-right: 20px;
									font-family:'Roboto-Regular';
								}
								.win_btom_text2{
									color: #fff;
									font-family:'Roboto-Regular';
									font-size: 18px;
								}
							}
						}
					}
				}
			}//upcoming_right_form
		}
	}
</style>
