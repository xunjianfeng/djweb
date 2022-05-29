<template>
	<div class="index">
		<div class="container">
			<div class="container_bacolor">
				<div class="content_right">
					<div class="content_right_nav">
						<div class="right_nav_left">
							Tournament
						</div>
						<div class="right_nav_right">
							<p :class="listQuery.state==2?'av':''" @click="tab_nav(2)">Incoming</p>
							<p :class="listQuery.state==3?'av':''" @click="tab_nav(3)">Ongoing</p>
							<p :class="listQuery.state==4?'av':''" @click="tab_nav(4)">Completed</p>
						</div>
					</div>
					<div class="content_right_form">
						<div class="contetn_title_num">
							<div class="title_num_text">Game</div>
							<div class="title_num_text">Category</div>
						</div>
						<div class="content_right_center">
							<div class="center_choice">
								<div class="choice_left">
									<div class="choice_date" @click="jump_dota">
										<div class="date_date">{{gameName}}</div>
										<div class="date_img">
											<img src="../../assets/images/more2.png" alt="">
										</div>
									</div>
									<div class="choice_icon">
										<el-tooltip class="item" effect="dark" content="Private" placement="bottom">
											  <div class="icon_block" @click="tabCategory('privately')">
												<img src="../../assets/images/icon1.png" alt="" v-show="listQuery.tournamentCategory=='privately'">
												<img src="../../assets/images/icons1.png" alt="" v-show="listQuery.tournamentCategory!='privately'">
											  </div>
										</el-tooltip>
										<el-tooltip class="item" effect="dark" content="Bountee" placement="bottom">
											 <div class="icon_block" @click="tabCategory('officially')">
												<img src="../../assets/images/icon0.png" alt="" v-show="listQuery.tournamentCategory=='officially'">
												<img src="../../assets/images/icons0.png" alt="" v-show="listQuery.tournamentCategory!='officially'">
											 </div>
										</el-tooltip>
										<el-tooltip class="item" effect="dark" content="Solo" placement="bottom">
											<div class="icon_block" @click="tabTournamentType('0')">
												<img src="../../assets/images/icon2.png" alt="" v-show="listQuery.tournamentType==='0'">
												<img src="../../assets/images/icons2.png" alt="" v-show="listQuery.tournamentType!=='0'">
											</div>
										</el-tooltip>
										<el-tooltip class="item" effect="dark" content="Team" placement="bottom">
											<div class="icon_block" @click="tabTournamentType('1')">
												<img src="../../assets/images/icon3.png" alt="" v-show="listQuery.tournamentType==='1'">
												<img src="../../assets/images/icons3.png" alt="" v-show="listQuery.tournamentType!=='1'">
											</div>
										</el-tooltip>
										<!-- <div class="icon_block" @click="tabCategory('privately')">
											<img src="../../assets/images/icon1.png" alt="" v-show="listQuery.tournamentCategory=='privately'">
											<img src="../../assets/images/icons1.png" alt="" v-show="listQuery.tournamentCategory!='privately'">
										</div> -->
										<!-- <div class="icon_block" @click="tabCategory('officially')">
											<img src="../../assets/images/icon0.png" alt="" v-show="listQuery.tournamentCategory=='officially'">
											<img src="../../assets/images/icons0.png" alt="" v-show="listQuery.tournamentCategory!='officially'">
										</div> -->
										<!-- <div class="icon_block" @click="tabTournamentType('0')">
											<img src="../../assets/images/icon2.png" alt="" v-show="listQuery.tournamentType==='0'">
											<img src="../../assets/images/icons2.png" alt="" v-show="listQuery.tournamentType!=='0'">
										</div> -->
										<!-- <div class="icon_block" @click="tabTournamentType('')">
											<img src="../../assets/images/icon3.png" alt="" v-show="listQuery.tournamentType===''">
											<img src="../../assets/images/icons3.png" alt="" v-show="listQuery.tournamentType!==''">
										</div> -->
									</div>
								</div>
								<div class="search">
									<input placeholder="Enter Your Search" v-model="listQuery.tournamentName" />
									<button class="btn" @click="handleFilter">
										<img src="../../assets/images/search.png" />
									</button>
								</div>
							</div>
						</div>
					</div>
					<!-- 没有数据 -->
					<div class="no_data_area"  v-if="(listQuery.state==2 && list == '') || (listQuery.state==3 && list == '') || (listQuery.state==4 && list == '')" >
						<div class="no_data">
							<img src="../../assets/images/no_tournament.svg" />
							<div class="no_data_text">No tournament</div>
						</div>
					</div>
					<!-- 赛事card -->
					<div class="match_container">
						<div class="match_card" v-for="(item, index) in list" :key="index" @click="jump_reg_info(item.id,item.status)">
							<div class="match_left">
								<img :src="HOST + item.tournamentCover" alt="">
							</div>
							<div class="match_right">
								<el-tooltip class="item" effect="dark" :content="item.tournamentName" placement="bottom">
									<div class="match_tit">{{ item.tournamentName }}</div>
								</el-tooltip>
								<!-- <div class="match_tit">{{ item.tournamentName }}</div> -->
								<div class="match_time">Tournament start at</div>
								<div class="match_hour_text">{{initDete(item.tournamentTime)}}</div>
								<div class="match_flex">
									<div class="match_flex_left">
										<div class="flex_left_img">
											<img src="../../assets/images/icon1.png" alt="" v-show="item.tournamentCategory=='privately'">
											<img src="../../assets/images/icon0.png" alt="" v-show="item.tournamentCategory=='officially'">
										</div>
										<div class="flex_left_img">
											<img src="../../assets/images/icon2.png" alt="" v-show="item.tournamentType==0">
											<img src="../../assets/images/icon3.png" alt="" v-show="item.tournamentType!='0'">
										</div>
									</div>
									<div class="match_flex_right">
										<div class="flex_right_img">
											<el-image :src="HOST + item.gameLogo" class="game_img">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default_game.png" class="default_img"/>
												</div>
											</el-image>
											<!-- <img :src="HOST + item.gameLogo" alt="" v-if="item.gameLogo"> -->
											<!-- <img src="../../assets/images/default_game.png" v-else /> -->
										</div>
									</div>
								</div>
								<div class="match_flex_text">
									<div class="text_left"></div>
									<div class="text_right"></div>
								</div>
								<div class="match_flex_text">
									<div class="text_left"></div>
									<div class="text_right"></div>
								</div>
								<div class="match_flex_text">
									<div class="text_left">Format</div>
									<div class="text_right">
										<!-- {{item.stages_format}} -->
										{{item.stages_format==1?'Single Elimination':item.stages_format==2?'Double Elimination':item.stages_format==3?'Round Robin':'Free For All'}}
										<span v-if="item.stages_format == 3">({{item.groupSize || 0}} > {{item.promotionSize || 0}})</span>
									</div> 
								</div>
								<div class="match_flex_text">
									<div class="text_left">Mode</div>
									<div class="text_right">{{item.mode||0}} vs {{item.mode||0}}</div>
								</div>
								<div class="match_flex_text">
									<div class="text_left">Participants</div>
									<div class="text_right">{{item.joinned||0}}/{{item.participantsSize||0}}</div>
								</div>
								<div class="match_flex_text" v-if="listQuery.state==2">
									<el-progress style="width:100%;margin-top:5px;" :percentage="item.num" :show-text="false" color="#d3aa53" :stroke-width="10"></el-progress>
								</div>
								<div class="match_flex_text2" :style="listQuery.state!=2?'border-top: 1px solid #BF9D62;':''">
									<div class="text_left">Prize</div>
									<div class="text_right">{{item.bonus}}</div>
								</div>
								<!-- <div class="match_flex_text3" v-if="item.stages_format == 3">Round Robin ({{item.groupSize || 0}} > {{item.promotionSize || 0}})</div> -->
							</div>
							<el-tooltip class="item" effect="dark" content="Prize Guaranteed" placement="bottom">
								<div class="match_position" v-if="item.authentication"  >
									<img src="../../assets/images/badge.png" alt="">
								</div>
							</el-tooltip>
						</div>
					</div>
					<div class="order_pagination">
						<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"  @pagination="handlePageChange" @page_change="PageChange"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {tournamentList} from '@/api/tournament.js'
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	import Listing from '@/mixin/Listing';
	export default{
		name:"history",
		mixins: [Listing],
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'info',
					deleted: 'danger'
				};
				return statusMap[status];
			}
		},
		components:{
			Pagination
		},
		data(){
			return {
				listQuery: {
					tournamentName: "",
					//tournamentCategory: '',//officially
					// tournamentType: "",
					state: sessionStorage.getItem("tourn_status"),
					hot: "",
					gameId: "",
					page: 1,
					size: 10
				},
				total_count: 1,
				gameName:'Please select',
				list: [],
				
			}
		},
		mounted(){
			setTimeout(()=>{
				// console.log(this.PageNumber.page_number)
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
			},180)	//当组件跳转时获取全局变量页数进行跳转
		},
		methods:{
			PageChange(value){
				this.PageNumber.page_number = value.page
			},

			getList() {
				if(this.$route.query.gameId != undefined && this.$route.query.gameId != '' && this.$route.query.gameId != null){
					this.listQuery.gameId = this.$route.query.gameId
					this.gameName = this.$route.query.gameName
				}
				this.list = []
				tournamentList(this.listQuery).then(res => {
					const {
						list,
						total
					} = res.data
					for ( let i in list ) {
						list[i]['num'] = this.GetPercent(list[i]['joinned']||0,list[i]['participantsSize']||0)
						// 处理 列表 format 显示
						for(let j in  list[i].stages){
							list[i]['stages_format'] = list[i].stages[0].format
							if(list[i].stages[j].format == 3){
								list[i]['groupSize'] = list[i].stages[j].groupSize
								list[i]['promotionSize'] = list[i].stages[j].promotionSize
								// console.log(list[i]['groupSize'])
								// console.log(list[i]['promotionSize'])
							}
						}
					}
					this.list = list;
					this.total_count = total;
				})
			},
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
			// 计算百分比
			GetPercent(num, total) {
				num = parseFloat(num);
				total = parseFloat(total);
				if ( total < num ) {
					return total = 100
				}
				return total <= 0 ? "0%" : (Math.round(num / total * 100));
			},
			// 状态切换
			tab_nav(state) {
				this.PageNumber.page_number = 1; //当跳转其他页面时重置页数
				this.listQuery.page = this.PageNumber.page_number //重置页数
				this.listQuery['state'] = state
				sessionStorage.setItem("tourn_status", state)
				this.getList()
				
				
			},
			// 赛事分类 切换
			tabCategory(tournamentCategory) {
				this.listQuery['tournamentCategory'] = tournamentCategory
				this.getList()
			},
			// 赛事类型  切换
			tabTournamentType(tournamentType) {
				this.listQuery['tournamentType'] = tournamentType
				this.getList()
			},
			jump_reg_info(id,status){
				if(status >= 3){
					this.$router.push({path:'/tournament/bracketm',query:{id}})
				}else{
					this.$router.push({path:'/tournament/regis_Information',query:{id}})
				}	
			},
			jump_dota(){
				this.$router.push({path:'/tournament/filter_game',query:{type:1}})
			},
		}
		
	}
</script>

<style lang="less" scoped>
.container{
	width: 94%;
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	padding-left: 4%;
	background-repeat: no-repeat;
	background-attachment:fixed;
	background-position: 99% 2%;
	background-size: 50%;
	.container_bacolor{
		width: 100%;
		background: rgba(29, 32, 35, 0.8);
		.content_right{
			width: 100%;
			.content_right_nav{
				margin-top: 50px;
				display: flex;
				align-items: center;
				.right_nav_left{
					color: #fff;
					font-size: 24px;
					font-family:'Quicksand-Bold';
					margin-right: 86px;
				}
				.right_nav_right{
					p{
						display: inline-block;
						color: #898989;
						padding: 0 30px;
						font-size: 16px;
						font-family:'Roboto-Regular';
						cursor: pointer;
					}
					a{
						border-right: 1px solid #7F7F7F;
						&:last-child{
							border: none;
						}
					}
					.av{
					  color: #BF9D62;
					  font-family:'Roboto-Bold';
					}
				}
				
			}
			.content_right_form{
				width: 100%;
				border-radius: 50px;
				margin-top: 30px;
				color: #ffffff;
				.contetn_title_num{
					display: flex;
					margin-bottom: 10px;
					.title_num_text{
						color: #727272;
						font-size: 20px;
						margin-right: 260px;
						font-family:'Roboto-Regular';
					}
				}
				.content_right_center{
					width: 100%;
					.center_choice{
						display: flex;
						justify-content: space-between;
						.choice_left{
							display: flex;
							align-items: center;
							.choice_date{
								width: 230px;
								height: 59px;
								background: #0E0F11;
								border-radius: 20px;
								padding: 0 24px 0 16px;
								margin-right: 44px;
								display: flex;
								align-items: center;
								justify-content: space-between;
								cursor: pointer;
								.date_date{
									color: #FFFFFF;
									font-size: 20px;
									font-family:'Roboto-Regular';
								}
								.date_img{
									width: 32px;
									img{
										width: 32px;
										height: 21px;
										object-fit: fill;
									}
								}
							}
							.choice_icon{
								display: flex;
								.icon_block{
									width: 55px;
									height: 55px;
									background: #0E0F11;
									border-radius: 15px;
									display: flex;
									align-items: center;
									justify-content: center;
									margin-right: 15px;
									cursor: pointer;
									img{
										width: 100%;
									}
								}
							}
						}
						.search{
							input{
								width: 315px;
								height: 60px;
								background: #0E0F11 0% 0% no-repeat padding-box;
								border-radius: 23px;
								font-size: 18px;
								border: none;
								padding-left: 35px;
								color: #565656;
								font-family:'Roboto-Regular';
							}
							.btn{
								width: 60px;
								height: 60px;
								background: #D3AA53 0% 0% no-repeat padding-box;
								border: none;
								border-radius: 23px;
								opacity: 1;
								position: relative;
								right: 60px;
								cursor: pointer;
								img{
									width: 22px;
									height: 22px;
								}
							}
						}
					}
				}
			}
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
						font-size: 20px;
						margin-top: 20px;
					}
				}
			}
			.match_container{
				display: flex;
				flex-wrap: wrap;
				margin-top: 50px;
				.match_card{
					// width: 751px;
					// height: 371px;
					// background: #000000;
					// border: 2px solid #232323;
					// border-radius: 16px;
					// display: flex;
					// margin-right: 42px;
					// margin-bottom: 42px;
					// overflow: hidden;
					// position: relative;
					// cursor: pointer;
					
					width: 751px;
					height: 371px;
					background: #1c2023;
					border-radius: 16px;
					display: flex;
					margin-right: 42px;
					margin-bottom: 42px;
					overflow: hidden;
					box-shadow: 0 0.0625px 16px 0 rgb(0 0 0 / 10%);
					position: relative;
					cursor: pointer;
					.match_left{
						width: 369px;
						height: 100%;
						height: 395px;
						img{
							width: 369px;
							height: 371px;
							object-fit: cover;
						}
					}
					.match_right{
						flex: 1;
						padding: 20px 30px 20px  30px ;
						.match_tit{
							width: 220px;
							font-size: 21px;
							color: #fff;
							line-height: 27px;
							font-family:'Roboto-Bold';
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.match_time{
							color: #D3AA53;
							font-size: 18px;
							font-family:'Roboto-Regular';
							margin-top: 15px;
							margin-bottom: 5px;
						}
						.match_hour_text{
							color: #fff;
							margin-bottom: 15px;
							font-family:'Roboto-Regular';
							font-size: 18px;
						}
						.match_flex{
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-bottom: 5px;
							.match_flex_left{
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
							.match_flex_right{
								.flex_right_img{
									width: 55px;
									height: 57px;
									.game_img{
										width: 55px;
										height: 57px;
										.default_img{
											width: 55px;
											height: 57px;
										}
									}
								}
							}
						}
						.match_flex_text{
							display: flex;
							align-items: center;
							line-height: 32px;
							justify-content: space-between;
							.text_left{
								color: #BF9D62;
								font-size: 18px;
								font-family:'Roboto-Regular';
							}
							.text_right{
								color: #ffffff;
								font-family:'Roboto-Regular';
								font-size: 18px;
							}
						}
						.match_flex_text2{
							display: flex;
							align-items: center;
							line-height: 35px;
							margin-top: 10px;
							justify-content: space-between;
							.text_left{
								color: #BF9D62;
								font-size: 18px;
								font-family:'Roboto-Regular';
							}
							.text_right{
								color: #ffffff;
								font-size: 18px;
								font-family:'Roboto-Bold';
							}
						}
						.match_flex_text3{
							color:#ff0000;
							display: flex;
							// align-items: center;
							justify-content: flex-end;
							margin-top: 5px;
						}
					}
					.match_position {
						position: absolute;
						right: 0;
						top: 0;
						img {
							width: 40px;
						}
					}
				}
				.match_card:nth-child(2n){
					margin-right: 0;
				}
			}
			.order_pagination {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				padding-right: 100px;
			}
		}
	}
}
</style>
