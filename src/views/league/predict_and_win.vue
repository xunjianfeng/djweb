<template>
	<div class="index">
		<div class="container">
			<!--  Web 1920 – 16 -->
			<!-- 规则信息 -->
			<div class="mark_container">
				<div class="mark_check" v-if="check_status == true" @click.stop="check_status = false">
					<img src="@/assets/images/cancel.png" >
				</div>
				<div class="mark_bac" v-if="check_status == true"></div>
				<div class="mark_check_container" v-if="check_status == true">
					<div class="mark_my_content ">
						<div class="mark_product_container">
							<div class="text_title">Terms and Conditions</div>
							<!-- <div class="text_label">The usual model for getting groups together to play is as follows:</div> -->
							<div class="text_content">
								<div class="text" v-html="pupup_info.termsAndCondition"></div>
							</div>
						</div>
						<div class="agree_condition">
							<div class="check_box">
								<img src="../../assets/images/xz.png"  v-if="agree_status == false" @click.stop="agree_status = true"/>
								<img src="../../assets/images/xzs.png" v-if="agree_status == true" @click.stop="agree_status = false"/>
							</div>
							<div class="contdition_text">
								I have read and agree to the above <span>terms and conditions</span>
							</div>
						</div>
					</div>
					
					<div class="mark_my_foot">
						<div class="mark_foot_button" @click="popUp(1)">Confirm</div>
					</div>
				</div>
			</div>
			<!-- Web 1920 – 11 -->
			<!-- 选择队伍 -->
			<div class="mark_container2">
				<div class="mark_check" v-if="check_status2 == true" @click.stop="check_status2 = false">
					<img src="@/assets/images/cancel.png" >
				</div>
				<div class="mark_bac" v-if="check_status2 == true"></div>
				<div class="mark_check_container" v-if="check_status2 == true">
					<div class="mark_my_content ">
						<div class="mark_text_one">Predict the Winner!</div>
						<div class="content_top" v-if="victorious_team == ''">
							<div :class="block_Count <= 3 && victorious_team.length <= 3?'selected_user_list flex_center' : 'selected_user_list'">
								<div class="user_empty" >
									<div class="block_empty" v-for="(item,index) in team_Count"></div>
								</div>
							</div>
						</div>
						<div class="content_top"  v-if="victorious_team != ''">
							<div v-if="block_Count < 3 && victorious_team.length <= 3"  :class="block_Count < 3 && victorious_team.length <= 3 ?'selected_user_list flex_center' : 'selected_user_list'">
								<div  :class="team_num == item.id? 'user_selected_av' : 'user_selected'" v-for="(item,tndex) in victorious_team" :key='tndex' @click="swithc_choose(item.id)">
									<div :class="tndex+1 == 1?'text_rank': (tndex) == 2?'text_rank2': tndex+1 == 3 ? 'text_rank3':'text_rank4'">
										 {{tndex+1 == 1 ? '1st' : tndex+1 == 2 ? '2nd' : tndex+1 == 3 ? '3rd': tndex+1 +'rd'  }}
									</div>
									<div class="img_area">
										<img :src="HOST + item.teamLogo" />
									</div>
									<div class="user_info">
										<div class="user_name">{{item.teamName}}</div>
									</div>
									<img v-if="team_num == item.id" @click="qr_team(item.id)" src="../../assets/images/del.png"  class="close_item"/>
								</div>
								<div class="user_empty" >
									<div class="block_empty" v-for="(ctem,cndex) in team_Count"></div>
								</div>
							</div>
							<div v-else :class="block_Count < 3 && victorious_team.length <= 3 ?'selected_user_list flex_center' : 'selected_user_list'">
								<div  :class="team_num == ttem.id? 'user_selected_padding_av' : 'user_selected_padding'" v-for="(ttem,tndex) in victorious_team" :key='tndex' @click="swithc_choose(ttem.id)">
									<div :class="tndex+1 == 1?'text_rank': (tndex) == 2?'text_rank2': tndex+1 == 3 ? 'text_rank3':'text_rank4'">
										 {{tndex+1 == 1 ? '1st' : tndex+1 == 2 ? '2nd' : tndex+1 == 3 ? '3rd': tndex+1 +'rd'  }}
									</div>
									<div class="img_area">
										<img :src="HOST + ttem.teamLogo" />
									</div>
									<div class="user_info">
										<div class="user_name">{{ttem.teamName}}</div>
									</div>
									<img v-if="team_num == ttem.id" @click="qr_team(ttem.id)" src="../../assets/images/del.png"  class="close_item"/>
								</div>
								<div class="user_empty" >
									<div class="block_empty" v-for="(ctem,cndex) in team_Count"></div>
								</div>
							</div>
							<div class="mark_my_foot">
								<div class="confirm_btn" @click="popUp(2)">Next</div>
								<div class="cancel_btn" @click="popUp(6)">Cancel</div>
							</div>
						</div>
						<div class="line"></div>
						<!-- 选择哪些队伍获胜 -->
						<div class="block_text">Choose Team</div>
						<div class="mark_product_container">
							<div class="content_area">
								<div class="team_list" v-for="(item,index) in predict_team" :key="index">
									<div class="list_left">
										<div class="team_logo">
											<img :src="HOST + item.teamLogo" />
										</div>
										<div class="team_info">
											<div class="team_name">{{item.teamName}}</div>
											<!-- <div class="game_type">{{item.aboutTeam}}</div> -->
										</div>
										<div class="team_intro">
											{{item.teamDescription}}
											<!-- {{item.team.teamSlogan}} -->
										</div>
									</div>
									<div class="list_right">
										<div class="choose_btn" @click="get_Choose(item)" v-if="item.choose_status == false">Choose</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Web 1920 – 12 -->
			<!-- 确认选择的队伍 -->
			<div class="mark_container3">
				<div class="mark_check" v-if="check_status3 == true" @click.stop="check_status3 = false">
					<img src="@/assets/images/cancel.png" >
				</div>
				<div class="mark_bac" v-if="check_status3 == true"></div>
				<div class="mark_check_container" v-if="check_status3 == true">
					<div class="mark_my_content ">
						<div class="mark_text_one">Confirm predict this team?</div>
						<div class="mark_text_two">Confirm to spend <span>{{pupup_info.registrationFee}} Coin</span> to predict this team</div>
						<div class="content_top">
							<!-- <div class="selected_user_list">
								<div class="user_selected" v-for="(item,tndex) in victorious_team" :key='tndex' >
									<div :class="tndex+1 == 1?'text_rank': (tndex) == 2?'text_rank2': tndex+1 == 3 ? 'text_rank3':'text_rank4'">
										{{tndex+1 == 1 ? '1st' : tndex+1 == 2 ? '2nd' : tndex+1 == 3 ? '3rd': tndex+1 +'rd'  }}
									</div>
									<div class="img_area">
										<img :src="HOST + item.teamLogo" />
									</div>
									<div class="user_info">
										<div class="user_name">{{item.teamName}}</div>
									</div>
								</div>
							</div> -->
							<div v-if="victorious_team.length <= 3"  :class="victorious_team.length <= 3 ?'selected_user_list flex_center' : 'selected_user_list'">
								<div  :class="team_num == item.teamId? 'user_selected_av' : 'user_selected'" v-for="(item,tndex) in victorious_team" :key='tndex'>
									<div :class="tndex+1 == 1?'text_rank': (tndex) == 2?'text_rank2': tndex+1 == 3 ? 'text_rank3':'text_rank4'">
										 {{tndex+1 == 1 ? '1st' : tndex+1 == 2 ? '2nd' : tndex+1 == 3 ? '3rd': tndex+1 +'rd'  }}
									</div>
									<div class="img_area">
										<img :src="HOST + item.teamLogo" />
									</div>
									<div class="user_info">
										<div class="user_name">{{item.teamName}}</div>
									</div>
									<!-- <img v-if="team_num == item.teamId" @click="qr_team(item.teamId)" src="../../assets/images/del.png"  class="close_item"/> -->
								</div>
							</div>
							<div v-else :class="victorious_team.length <= 3 ?'selected_user_list flex_center' : 'selected_user_list'">
								<div  :class="team_num == item.teamId? 'user_selected_padding_av' : 'user_selected_padding'" v-for="(item,tndex) in victorious_team" :key='tndex'>
									<div :class="tndex+1 == 1?'text_rank': (tndex) == 2?'text_rank2': tndex+1 == 3 ? 'text_rank3':'text_rank4'">
										 {{tndex+1 == 1 ? '1st' : tndex+1 == 2 ? '2nd' : tndex+1 == 3 ? '3rd': tndex+1 +'rd'  }}
									</div>
									<div class="img_area">
										<img :src="HOST + item.teamLogo" />
									</div>
									<div class="user_info">
										<div class="user_name">{{item.teamName}}</div>
									</div>
									<!-- <img v-if="team_num == item.teamId" @click="qr_team(item.teamId)" src="../../assets/images/del.png"  class="close_item"/> -->
								</div>
							</div>
							<div class="mark_my_foot">
								<div class="confirm_btn" @click="popUp(3)">Confirm (-{{pupup_info.registrationFee}} Coins)</div>
								<div class="cancel_btn" @click="popUp(5)">Back</div>
							</div>
							<div class="coins_text">
								My Current : {{user_Info.coin}}Coins
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Web 1920 – 13 -->
			<!-- 竞猜成功 -->
			<div class="mark_container4">
				<div class="mark_check" v-if="check_status4 == true" @click.stop="check_status4 = false">
					<img src="@/assets/images/cancel.png" >
				</div>
				<div class="mark_bac" v-if="check_status4 == true"></div>
				<div class="mark_check_container" v-if="check_status4 == true">
					<div class="mark_my_content ">
						<div class="mark_text_one">You have participated in the predict</div>
						<div class="mark_text_two">You can view the details of your predict from the <span>Play Games</span></div>
						<div class="mark_text_three">After the results are announced,we will notify you as soon as possible.</div>
						<div class="content_top">
							<div class="mark_my_foot">
								<div class="confirm_btn" @click="popUp(4)">Go to Play Games>></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 竞猜结束后的结果 -->
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
							<!-- 没有数据 -->
							<div class="no_data_area" v-if="predict_list == ''">
								<div class="no_data">
									<img src="../../assets/images/no_tournament.svg" />
									<div class="no_data_text">No any data</div>
								</div>
							</div>
							<div  v-for="(ltem,ldex) in predict_list" v-if="predict_list != ''" :key="ldex" :class="ltem.winCoin != null ?'list_row_av':'list_row' ">
								<!-- <div class="row_col_4" v-if="ltem.winCoin != null">Winner</div> -->
								<div class="row_col_1">
									<el-image :src="HOST + ltem.userInfo.avatar" class="avatar_img">
										<div slot="error" class="image-slot"> 
											<img src="../../assets/images/default.png" class="avatar_img"/>
										</div>
									</el-image>
									<!-- <img :src="HOST + ltem.userInfo.avatar" class="avatar_img" v-if="ltem.userInfo.avatar"/> -->
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
			
			<!-- 内容区域 -->
			<div class="container_bacolor">
				<div class="content_right">
					<!-- 轮播图 -->
					<div class="home_carousel" @click="swith_league(1)">
						<el-carousel class="carousel_block" height="457px" :interval="5000" :autoplay="false">
							<el-carousel-item v-for="(item,index) in advertisementList" :key="index">
								<img :src="HOST+item" class="carousel_img" />
								<!-- <div class="carousel-con">
									<div class="carousel-con-tit">{{item.advertisementTitle}}</div>
									<div class="carousel-con-botton">
										<div class="carousel-botton-left" @click="jump(item.joinLink)">Join</div>
										<div class="carousel-botton-right" @click="jump(item.seeMore)">See more</div>
									</div>
								</div> -->
							</el-carousel-item>
						</el-carousel>
					</div>
					<div class="content_block">
						<div :class="nav_index == 1 ? 'content_title text_color' : 'content_title'" @click="tanNav(1)">Processing</div>
						<div :class="nav_index == 2 ? 'content_title text_color' : 'content_title'" @click="tanNav(2)">History</div>
					</div>
					<div class="center_choice">
						<div class="sort_by">
							<p class="sort_by_text">Game Format</p>
							<div class="options">
								<el-select v-model="listQuery.order" @change="handleFilter" placeholder="请选择" style="margin-right: 20px;" :popper-append-to-body="false">
									<el-option label="new to old" value="NEW_TO_OLD"></el-option>
									<el-option label="old to new" value="OLD_TO_NEW"></el-option>
								</el-select>
							</div>
						</div>
						<div class="search">
							<input placeholder="Seacrh Team Name" v-model="listQuery.keyword"/>
							<button class="btn" @click="handleFilter">
								<img src="@/assets/images/search.png" />
							</button>
							<!-- <img src="@/assets/images/search.png" /> -->
						</div>
					</div>
					<div class="content_list_block">
						<!-- 没有数据 -->
						<div class="no_data_area" v-if="list == ''">
							<div class="no_data">
								<img src="../../assets/images/no_tournament.svg" />
								<div class="no_data_text">No any data</div>
							</div>
						</div>
						<div class="list_block" v-for="(item,index) in list" :key="index" @click="item.completed == false ? open_regisy(item) : showResult(item.id) ">
							<div class="list_img">
								<img :src="HOST + item.poster" />
							</div>
							<div class="text_block">
								<!-- <div class="text_time">End at {{item.endTime}}</div> -->
								<div class="text_time">Predict Time: {{item.startTime}} ~ {{item.endTime}}</div>
								<div class="text">{{item.title}}</div>
							</div>
							<div class="block_bottom">
								<div class="bottom_left">
									<div class="label">Prize</div>
									<div class="text_value">{{item.totalPrize || 0}} Coins</div>
								</div>
								<div class="bottom_center" v-if="item.videoLink != null && item.videoLink != ''">
									<div class="label">Tournamemt Link</div>
									<div class="text_link" @click.stop="open_link(item.videoLink)">{{item.videoLink}}</div>
								</div>
								<!-- 设计师要求不需要展示 -->
								<!-- <div class="bottom_right">
									<div class="label">Join Predict</div>
									<div class="text_num">{{item.registeredPersons}} Person</div>
								</div> -->
							</div>
						</div>
					</div>
					<div class="order_pagination">
						<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
						 @pagination="handlePageChange" />
						<!-- <pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"  @pagination="handlePageChange"/> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		predictListPage,
		predictTeams,
		predictRegistrations,
		predictRegistry
	} from '@/api/predict';
	import {
		userInfo
	} from '@/api/user_info'
	import Listing from '@/mixin/Listing';
	import {getAdvertisement} from '@/api/home';
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	export default{
		name:"predict_and_win",
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
			return{
				advertisementList:[], //广告列表
				value:'',
				team_name:'',
				check_status:false,//规则信息
				agree_status:false, //是否同意条款
				check_status2:false,//选择队伍
				check_status3:false,//确认选择的队伍
				check_status4:false,//竞猜成功
				team_num:'',
				team_list:[],
				predict_team:'', //竞猜战队列表
				list:[],//竞赛列表
				listQuery: {
					order: 'NEW_TO_OLD',   // NEW_TO_OLD表示从新到旧，OLD_TO_NEW表示从旧到新
					keyword: '', // 搜索关键字
					top: '',   // 是否置顶，true表示置顶，false表示不置顶					
					currentUserOnly:'',//是否只查询当前用户参与过的竞猜, 默认为false
					completed:false ,//是否已完成，true表示已完成  false表示进行中
					page: 1,
					size: 10
				},
				total_count: 0,
				pupup_info:'' ,  //弹窗信息
				victorious_team:[], //预测获胜队伍
				team_Count:'', //没选择队伍前，几个格子就代表可以选择几个队伍
				block_Count:0,//竞猜可选择的队伍数量
				predictId:'', //竞猜id
				user_Info:{}, //用户信息
				completed:false,
				nav_index:1,
				result_status:false,//结果的弹窗
				predict_list:[],//竞猜结果的数据
			}
		},
		mounted() {
			this.get_user_info();
			this.getList()
			this.advertisement()
		},
		
		methods:{
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
				let arr = []
				predictListPage(that.listQuery).then(res => {
					const {
						list,total
					} = res.data
					// that.total_count = res.data.total
					that.total_count = total
					that.list = list;
					for(let a = 0; a < that.list.length;a++){
						arr.push(that.list[a].carousel) 
					}
					that.advertisementList = arr
				})
			},
			open_link(link){
				window.open(link) 
			},
			// 打开弹窗
			open_regisy(item){
				let that = this;
				that.completed = item.completed
				let endTime = item.endTime
				if(that.completed == true){
					that.$message({
						message: 'Please choose other predict and win as this is ended.',//该竞猜已结束，请选择其他竞猜
						type: 'warning'
					})
				}else if(endTime < this.initDete(Date.now())){
					that.$message({
						message: 'Please choose other predict and win as this is ended.',//该竞猜已结束，请选择其他竞猜
						type: 'warning'
					})
				}else{
					that.pupup_info = item;
					that.team_Count = item.predictTeamCount;
					that.block_Count = item.predictTeamCount
					that.predictId = item.id;
					that.victorious_team = [];
					that.agree_status = false;
					that.check_status = true
					// if(index == 1){
					// 	this.check_status = true
					// }
				}
				
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
			// 获取竞猜战队列表
			getTeams(predictId) {
				let that = this;
				let predictam = []
				let params = {
					predictId
				}
				
				predictTeams(params).then(res => {
					predictam = res.data
					for (let i = 0; i < predictam.length; i++) {
						predictam[i].choose_status = false
					}
					that.predict_team = predictam
				})
			},
			// 选择预测获胜队伍
			get_Choose(item){
				let that = this;
				let { id } = item;
				for (let i in that.predict_team) {
				 	if(that.predict_team[i].id == id){
						that.predict_team[i].choose_status = true
						if(that.predict_team[i].choose_status == true){
							if(that.victorious_team.length > that.team_Count+1){
								that.$message({
									message: "The predicted winning team cannot exceed the number of participating teams.",//预测获胜队伍不能超过参与竞猜队伍数量
									type: 'warning'
								})
								that.predict_team[i].choose_status = false
							}else{
								that.victorious_team.push(that.predict_team[i])
								that.team_Count--
								
							}
						}
					}
				}
				
			},
			swithc_choose(id){
				let  that = this;
				that.team_num = id
			},
			//取消预测获胜队伍
			qr_team(id){
				let  that = this;
				for (let i in that.predict_team) {
				 	if(that.predict_team[i].id == id){
						let is_index = that.victorious_team.findIndex((value)=>value["id"] == id ) //获取是否有被选中返回值来进行判断
						that.victorious_team.splice(is_index,1)
						that.predict_team[i].choose_status = false
						// that.victorious_team.splice(i,1)
						// that.predict_team[i].team.choose_status = false
						that.team_Count++
					}
				}
			},
			// 弹窗步骤开启
			popUp(index){
				let that = this;
				if(index == 1){
					// Web 1920–16  ->  Web 1920–11
					if(that.agree_status == false){
						that.$message({
							message: 'Please agree to our term and conditions',//请勾选同意条款和条件
							type: 'warning'
						})
						return false
					}
					that.getTeams(that.predictId);
					//打开选择队伍弹窗
					that.check_status2 = true
					//关闭规则信息弹窗
					that.check_status = false
				}else if(index == 2){
					//打开确认队伍弹窗
					that.check_status3 = true
					//关闭选择队伍弹窗
					that.check_status2 = false
				}else if(index == 3){
					//参加竞猜
					that.save_registry();
					// that.check_status4 = true
				}else if(index == 4){
					//打开竞猜成功弹窗
					that.check_status4 = false
					this.$router.push({path: '/played/predict_win'})
				}else if(index == 5){
					//选择队伍弹窗
					that.check_status2 = true
					//关闭确认队伍弹窗
					that.check_status3 = false
				}else if(index == 6){
					//关闭选择队伍弹窗
					that.check_status2 = false
					that.victorious_team = []
				}
			},
			// 竞猜下注
			save_registry() {
				let that = this;
				let  predictTeamIds = []
				for (let i in that.victorious_team) {
					predictTeamIds.push(that.victorious_team[i].id)
				}
				let params = {
					predictId:that.predictId,
					predictTeamIds:predictTeamIds.toString()
				}
				predictRegistry(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					that.check_status4 = true
					that.check_status3 = false
					this.$emit("topRefresh")	//向父组件发送一个事件
				})
			},
			// 获取用户信息
			get_user_info() {
				let that  = this;
				let user_Id = new URLSearchParams();
				user_Id.append('userId', sessionStorage.getItem("userId"));
				userInfo(user_Id).then(res => {
					that.user_Info = res.data.userInfo;
				})
			},
			// 轮播
			advertisement() {
				let that = this;
				let arr = []
				let arr1 = []
				let params = {
					order: 'NEW_TO_OLD',   // NEW_TO_OLD表示从新到旧，OLD_TO_NEW表示从旧到新
					keyword: '', // 搜索关键字
					top: true,   // 是否置顶，true表示置顶，false表示不置顶					
					currentUserOnly:'',//是否只查询当前用户参与过的竞猜, 默认为false
					completed:false ,//是否已完成，true表示已完成  false表示进行中
					page: 1,
					size: 0
				}
				let params1 = {
					order: 'NEW_TO_OLD',   // NEW_TO_OLD表示从新到旧，OLD_TO_NEW表示从旧到新
					keyword: '', // 搜索关键字
					top: true,   // 是否置顶，true表示置顶，false表示不置顶					
					currentUserOnly:'',//是否只查询当前用户参与过的竞猜, 默认为false
					completed:true ,//是否已完成，true表示已完成  false表示进行中
					page: 1,
					size: 0
				}
				// that.listQuery.top = true
				// that.listQuery.size = 0
				predictListPage(params).then(res => {
					for(let a = 0; a < res.data.list.length;a++){
						arr.push(res.data.list[a].carousel) 
					}
				})
				predictListPage(params1).then(res1 => {
					for(let b = 0; b < res1.data.list.length;b++){
						arr1.push(res1.data.list[b].carousel) 
					}
					
				})
				arr = arr.concat(arr1)
				that.advertisementList = arr
			},
			handleFilter() {
				this.listQuery.page_index = 1;
				this.getList()
			},
		}
		
	}
</script>

<style scoped>
/deep/.el-carousel__button {
	display: block;
	opacity: 0.48;
	width: 10px;
	height: 10px;
	background: #6D6D6D;
	border-radius: 50%;
	border: none;
	outline: 0;
	padding: 0;
	margin: 0;
	cursor: pointer;
	-webkit-transition: 0.3s;
	transition: 0.3s;
	border-radius: 50%;
}
/deep/.el-carousel__indicator.is-active button {
	display: block;
	opacity: 0.48;
	width: 10px;
	height: 10px;
	background: #d3aa53;
	border-radius: 50%;
	border: none;
	outline: 0;
	padding: 0;
	margin: 0;
	cursor: pointer;
	-webkit-transition: 0.3s;
	transition: 0.3s;
	border-radius: 50%;
}
</style>
<style lang="less" scoped>
	.container {
		width: calc(100% - 140px);
		display: flex;
		justify-content: space-between; /* 横向中间自动空间 */
		flex-wrap: wrap; /* 换行 */
		padding-bottom: 30px;
		margin-left: 69px;
		position: relative;
		//Web 1920 – 16
		.mark_container{
			position: fixed;
			z-index: 99;
			top: 5px;
			// top: calc(100% - 100px);
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
				left: 280px;
				top: 140px;
				// left: 357px;
				// top: calc(100% - 700px);
				z-index: 999;
				width: 780px;
				padding: 48px 45px 50px;
				background: #0E0F11;
				border-radius: 27px;
				overflow: hidden;
				display: flex;
				flex-flow: column;
				align-items: center;
				text-align: left;
				.mark_my_content{
					width: 100%;
					margin-bottom: 10px;
					text-align: left;
					.mark_product_container{
						width: 100%;
						height: 400px;
						overflow-y: scroll;
						margin-bottom: 28px;
						padding-right: 20px;
						padding-bottom: 20px;
						// border-bottom: 2px solid #2D2D2D;
						.text_title{
							color: #DBA83F;
							font-size: 24px;
							margin-bottom: 25px;
							font-family:'Quicksand-Bold';
						}
						.text_label{
							color: #9E9E9E;
							font-size: 20px;
							margin-bottom: 20px;
							font-family:'Roboto-Bold';
						}
						.text_content{
							color: #7F7F7F;
							font-size: 20px;
							font-family:'Roboto-Regular';
							.text{
								margin-bottom: 30px;
								line-height: 28px;
								word-wrap: break-word;
								white-space: pre-wrap;
							}
							::v-deep{
								img{
									max-width: 100%;
									height: auto;
								}
							}
						}
						&::-webkit-scrollbar {
							/*滚动条整体样式*/
							width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
							height: 1px;
						}
						&::-webkit-scrollbar-thumb {
						/*滚动条里面小方块*/
						border-radius: 10px;
						box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
						background   : #2B2B2B;
						}
						&::-webkit-scrollbar-track {
						/*滚动条里面轨道*/
						box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
						border-radius: 10px;
						background   : #000000;
						}
					}
					.agree_condition{
						height: 80px;
						display: flex;
						align-items: center;
						text-align: left;
						border-top: 2px solid #2D2D2D;
						// margin-top: 20px ;
						margin: 20px 0 30px;
						.check_box{
							cursor: pointer;
							img{
								width: 30px;
								height: 30px;
							}
						}
						.contdition_text{
							color: #D3AA53;
							font-size: 18px;
							margin-left: 20px;
							font-family:'Roboto-Regular';
							span{
								color: #D3AA53;
								text-decoration: underline;
								font-weight: bold;
								font-family:'Roboto-Bold';
							}
						}
					}
				}
				.mark_my_foot{
					width: 100%;
					.mark_foot_button{
						width: 100%;
						height: 69px;
						color: #0E0F11;
						font-size: 18px;
						display: flex;
						background: #D3AA53;
						border-radius: 12px;
						align-items: center;
						cursor: pointer;
						justify-content: center;
						font-family:'Roboto-Medium';
					}
				}
			}
		}
		//Web 1920 – 11
		.mark_container2{
			position: fixed;
			// position: relative;
			z-index: 99;
			top: 3px;
			// position: inherit;
			// z-index: 99;
			// top: calc(100% - 70px);
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
				left: 280px;
				top: 140px;
				// left: 357px;
				// top: calc(100% - 1150px);
				z-index: 999;
				width: 850px;
				padding: 48px 45px 50px;
				background: #0E0F11;
				border-radius: 27px;
				overflow: hidden;
				display: flex;
				flex-flow: column;
				align-items: center;
				text-align: left;
				.mark_my_content{
					width: 100%;
					margin-bottom: 10px;
					text-align: center;
					.mark_text_one{
						color: #DBA83F;
						font-size: 24px;
						// text-align: center;
						margin-bottom: 30px;
						font-family:'Quicksand-Bold';
					}
					.content_top{
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
							.user_empty{
								display: flex;
								align-items: center;
								justify-content: flex-end;
								margin: 0 0 20px 25px;
								.block_empty{
									width: 170px;
									height: 220px;
									border: 1px solid #DBA83F;
									margin-right: 25px;
									border-radius: 20px;
									color: #FFF000;
								}
							}
							.user_selected{
								// width: 200px;
								// width: 22%;
								width: 180px;
								height: 200px;
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
										font-family:'Roboto-Regular';
									}
								}
							}
							
							.user_selected_av{
								// width: 22%;
								width: 180px;
								height: 200px;
								background-color: #000000;
								// padding: 25px 10px;
								padding: 20px 10px;
								margin: 0 0 20px 25px;
								border-radius: 20px;
								border: 1px solid #DBA83F;
								position: relative;
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
										color: #ffffff;
										font-size: 18px;
										font-family:'Roboto-Regular';
									}
								}
								
								.close_item{
									position: absolute;
									top: -20px;
									right: -20px;
									width: 45px;
									height: 45px;
								}
							}
							.user_selected_padding{
								width: 22%;
								padding: 25px 50px;
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
										color: #ffffff;
										font-size: 18px;
										// background-color: #00FF00;
									}
								}
							}
							
							.user_selected_padding_av{
								width: 22%;
								padding:25px 50px;
								background-color: #000000;
								// background-color: #ff0;
								border-radius: 20px;
								margin: 0 0 20px 25px;
								font-family:'Roboto-Regular';
								border: 1px solid #DBA83F;
								position: relative;
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
									// width: 100%;
									// width: 200px;
									// width: 10%;
									display: block;
									margin-top: 20px;
									.user_name{
										// width: 100%;
										// width: 10%;
										// height: 10px;
										color: #ffffff;
										font-size: 18px;
										font-family:'Roboto-Regular';
										text-align: center;
										// background-color: #ff0;
										// display: -webkit-box;
										// -webkit-box-orient: vertical;
										// -webkit-line-clamp: 1;
										// overflow: hidden;
										
									}
								}
								
								.close_item{
									position: absolute;
									top: -20px;
									right: -20px;
									width: 45px;
									height: 45px;
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
							background   : #2B2B2B;
							}
							&::-webkit-scrollbar-track {
							/*滚动条里面轨道*/
							box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
							border-radius: 10px;
							background   : #000000;
							}
							
						}
						.mark_my_foot{
							margin: 20px 0;
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							.confirm_btn{
								cursor: pointer;
								background-color: #D3AA53;
								color: #000;
								border-radius: 25px;
								width: 100px;
								height: 40px;
								text-align: center;
								line-height: 40px;
								font-size: 16px;
								margin-right: 30px;
								font-family:'Roboto-Regular';
							}
							.cancel_btn{
								cursor: pointer;
								// background-color: #D3AA53;
								border: 1px solid #666666;
								border-radius: 25px;
								width: 100px;
								height: 40px;
								text-align: center;
								line-height: 40px;
								font-size: 16px;
								color: #fff;
								font-family:'Roboto-Regular';
							}
						}								
					}
					.line{
						background-color: #ffffff;
						width: 100%;
						height: 1px;
						margin-bottom: 20px;
						// margin-top: 20px;
					}
					.block_text{
						color: #ffffff;
						font-size: 22px;
						font-family:'Roboto-Medium';
					}
					.mark_product_container{
						width: 100%;
						height: 296px;
						overflow-y: scroll;
						margin-top: 30px;
						// margin-bottom: 28px;
						padding-right: 20px;
						padding-bottom: 20px;
						// border-bottom: 2px solid #2D2D2D;
						.content_area{
							background-color: #03060D;
							border-radius: 22px 22px 0px 0px;
							padding: 20px 30px;
							.team_list{
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: space-between;
								border-bottom: 2px solid #2D2D2D;
								padding: 20px 0;
								.list_left{
									width: 85%;
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
										width: 30%;
										margin: 0 30px;
										text-align: left;
										.team_name{
											color: #FFFFFF;
											font-size: 20px;
											font-family:'Roboto-Bold';
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
									.team_intro{
										width: 50%;
										text-align: left;
										color: #727272;
										font-size: 18px;
										font-family:'Roboto-Regular';
									}
								}
								.list_right{
									width: 10%;
									.choose_btn{
										color: #DBA83F;
										font-size: 18px;
										cursor: pointer;
										font-family:'Roboto-Bold';
									}
								}
							}
						}
						&::-webkit-scrollbar {
							/*滚动条整体样式*/
							width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
							height: 1px;
						}
						&::-webkit-scrollbar-thumb {
						/*滚动条里面小方块*/
						border-radius: 10px;
						box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
						background   : #2B2B2B;
						}
						&::-webkit-scrollbar-track {
						/*滚动条里面轨道*/
						box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
						border-radius: 10px;
						background   : #000000;
						}
					}
				}
				.mark_my_foot{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					.confirm_btn{
						cursor: pointer;
						background-color: #D3AA53;
						color: #000;
						border-radius: 25px;
						width: 100px;
						height: 40px;
						text-align: center;
						line-height: 40px;
						font-size: 16px;
						margin-right: 30px;
						font-family:'Roboto-Regular';
					}
					.cancel_btn{
						cursor: pointer;
						// background-color: #D3AA53;
						border: 1px solid #666666;
						border-radius: 25px;
						width: 100px;
						height: 40px;
						text-align: center;
						line-height: 40px;
						font-size: 16px;
						color: #fff;
						font-family:'Roboto-Regular';
					}
				}
			}
		}
		//Web 1920 – 12
		.mark_container3{
			position: fixed;
			z-index: 99;
			top: 5px;
			// top: calc(100% - 70px);
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
				left: 280px;
				top: 140px;
				// left: 357px;
				// top: calc(100% - 700px);
				z-index: 999;
				width: 850px;
				padding: 48px 45px 30px;
				background: #0E0F11;
				border-radius: 27px;
				overflow: hidden;
				display: flex;
				flex-flow: column;
				align-items: center;
				text-align: left;
				.mark_my_content{
					width: 100%;
					margin-bottom: 10px;
					text-align: center;
					.mark_text_one{
						color: #DBA83F;
						font-size: 24px;
						// text-align: center;
						margin-bottom: 20px;
						font-family:'Quicksand-Bold';
					}
					.mark_text_two{
						color: #989898;
						font-size: 20px;
						margin-bottom: 80px;
						font-family:'Roboto-Regular';
						span{
							color: #FFFFFF;
							font-family:'Roboto-Bold';
						}
					}
					.content_top{
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
								height: 200px;
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
							
							.user_selected_av{
								// width: 22%;
								width: 180px;
								height: 200px;
								background-color: #000000;
								// padding: 25px 10px;
								padding: 20px 10px;
								margin: 0 0 20px 25px;
								border-radius: 20px;
								// border: 1px solid #DBA83F;
								border: 1px solid #000000;
								position: relative;
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
										color: #ffffff;
										font-size: 18px;
										font-family:'Roboto-Regular';
									}
								}
								
								.close_item{
									position: absolute;
									top: -20px;
									right: -20px;
									width: 45px;
									height: 45px;
								}
							}
							.user_selected_padding{
								width: 22%;
								padding: 25px 50px;
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
										color: #ffffff;
										font-size: 18px;
										background-color: #FF00FF;
									}
								}
							}
							
							.user_selected_padding_av{
								width: 22%;
								padding:25px 50px;
								background-color: #000000;
								border-radius: 20px;
								margin: 0 0 20px 25px;
								font-family:'Roboto-Regular';
								border: 1px solid #DBA83F;
								position: relative;
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
									width: 100%;
									// width: 10%;
									display: block;
									margin-top: 20px;
									.user_name{
										// width: 10%;
										height: 10px;
										color: #ffffff;
										font-size: 18px;
										font-family:'Roboto-Regular';
										// display: -webkit-box;
										// -webkit-box-orient: vertical;
										// -webkit-line-clamp: 1;
										// overflow: hidden;
									}
								}
								
								.close_item{
									position: absolute;
									top: -20px;
									right: -20px;
									width: 45px;
									height: 45px;
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
								background   : #2B2B2B;
							}
							&::-webkit-scrollbar-track {
								/*滚动条里面轨道*/
								box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
								border-radius: 10px;
								background   : #000000;
							}
							
						}
						.mark_my_foot{
							margin: 80px 0 30px;
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							.confirm_btn{
								cursor: pointer;
								background-color: #D3AA53;
								color: #000;
								border-radius: 25px;
								width: 219px;
								height: 58px;
								text-align: center;
								line-height: 58px;
								font-size: 20px;
								margin-right: 30px;
								font-family:'Roboto-Regular';
							}
							.cancel_btn{
								cursor: pointer;
								// background-color: #D3AA53;
								border: 1px solid #666666;
								border-radius: 25px;
								width: 163px;
								height: 58px;
								text-align: center;
								line-height: 58px;
								font-size: 20px;
								color: #fff;
								font-family:'Roboto-Regular';
							}
						}
						.coins_text{
							color: #BF9D62;
							font-size: 20px;
							font-family:'Roboto-Regular';
						}
					}
					
				}
				
				.mark_my_foot{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					.confirm_btn{
						cursor: pointer;
						background-color: #D3AA53;
						color: #000;
						border-radius: 25px;
						width: 100px;
						height: 40px;
						text-align: center;
						line-height: 40px;
						font-size: 16px;
						margin-right: 30px;
						font-family:'Roboto-Regular';
					}
					.cancel_btn{
						cursor: pointer;
						// background-color: #D3AA53;
						border: 1px solid #666666;
						border-radius: 25px;
						width: 100px;
						height: 40px;
						text-align: center;
						line-height: 40px;
						font-size: 16px;
						color: #fff;
						font-family:'Roboto-Regular';
					}
				}
			}
		}
		//Web 1920 – 13
		.mark_container4{
			position: fixed;
			z-index: 99;
			top: 5px;
			// top: calc(100% - 70px);
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
				// left: 357px;
				left: 280px;
				top: 140px;
				// top: calc(100% - 700px);
				z-index: 999;
				width: 850px;
				padding: 80px 45px 30px;
				background: #0E0F11;
				border-radius: 27px;
				overflow: hidden;
				display: flex;
				flex-flow: column;
				align-items: center;
				text-align: left;
				.mark_my_content{
					width: 100%;
					margin-bottom: 10px;
					text-align: center;
					.mark_text_one{
						color: #DBA83F;
						font-size: 24px;
						// text-align: center;
						margin-bottom: 20px;
						font-family:'Quicksand-Bold';
					}
					.mark_text_two{
						color: #989898;
						font-size: 20px;
						margin-bottom: 20px;
						font-family:'Roboto-Regular';
						span{
							color: #FFFFFF;
							font-family:'Roboto-Bold';
						}
					}
					.mark_text_three{
						color: #989898;
						font-size: 20px;
						margin-bottom: 80px;
						font-family:'Roboto-Regular';
					}
					.content_top{
						.mark_my_foot{
							margin: 80px 0 30px;
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							.confirm_btn{
								cursor: pointer;
								background-color: #D3AA53;
								color: #000;
								border-radius: 25px;
								width: 219px;
								height: 58px;
								text-align: center;
								line-height: 58px;
								font-size: 20px;
								margin-right: 30px;
								font-family:'Roboto-Regular';
							}
						}
						
					}
					
				}
				
				.mark_my_foot{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					.confirm_btn{
						cursor: pointer;
						background-color: #D3AA53;
						color: #000;
						border-radius: 25px;
						width: 100px;
						height: 40px;
						text-align: center;
						line-height: 40px;
						font-size: 16px;
						margin-right: 30px;
						font-family:'Roboto-Regular';
					}
					.cancel_btn{
						cursor: pointer;
						// background-color: #D3AA53;
						border: 1px solid #666666;
						border-radius: 25px;
						width: 100px;
						height: 40px;
						text-align: center;
						line-height: 40px;
						font-size: 16px;
						color: #fff;
						font-family:'Roboto-Regular';
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
		.container_bacolor {
			width: 100%;
			.content_right {
				// 轮播
				.home_carousel {
					// width: 1505px;
					width: 100%;
					// height: 412px;
					border-radius: 15px;
					overflow: hidden;
					margin-top: 28px;
					background-color: #2c3e50;
					position: relative;
					.carousel_img {
						width: 100%;
						height: 100%;
						// object-fit: cover;
					}
					.carousel-con {
						width: 450px;
						position: absolute;
						left: 150px;
						bottom: 150px;
						color: #f1f1ff;
					}
					.carousel-con-tit {
						font-size: 23px;
					}
					.carousel-con-botton {
						display: flex;
						align-items: center;
						padding-top: 30px;
					}
					.carousel-botton-left {
						width: 130px;
						height: 45px;
						line-height: 45px;
						text-align: center;
						background-color: #D3AA53;
						color: #232323;
						border: 1px solid #D3AA53;
						border-radius: 20px;
						margin-right: 20px;
					}
					.carousel-botton-right {
						width: 130px;
						height: 45px;
						line-height: 45px;
						text-align: center;
						color: #232323;
						border: 1px solid #f1f1f1;
						border-radius: 20px;
						color: #fff;
					}
					// }
				}
				.content_block{
					display: flex;
					align-items: center;
					margin-top: 30px;
					.content_title{
						// width: 120px;
						color: #FFFFFF;
						font-size: 24px;
						line-height: 60px;
						// border-bottom: 2px solid #FFFFFF;
						font-family:'Quicksand-Regular';
						margin-right: 60px;
						cursor: pointer;
					}
					.text_color{
						color: #DBA83F;
						border-bottom: 2px solid #DBA83F;
					}
				}
				.center_choice{
					margin-top: 45px;
					display: flex;
					// align-items: center;
					justify-content: space-between;
					.sort_by{
						.sort_by_text{
							text-align: left;
							letter-spacing: 0px;
							color: #727272;
							opacity: 1;
							font-size: 18px;
							font-family:'Roboto-Regular';
						}
						.options{
							position: relative;
							.dropdown{
								width: 10px;
								height: 8px;
								position: absolute;
								right: 30px;
								top: 45%;
							}
							select{
								/*取消默认箭头开始*/
								appearance:none;
								-moz-appearance:none;
								-webkit-appearance:none;
								/*取消默认箭头结束*/
								width: 225px;
								height: 59px;
								background-color: #0E0F11;
								color: #ffffff;
								border-radius: 20px;
								opacity: 1;
								border: none;
								font-size: 18px;
								padding-left: 20px;
								padding-right: 20px;
								font-family:'Roboto-Regular';
							}
							/deep/ .el-select .el-input .el-input__inner {
								border: 0px;
								width: 230px;
								height: 59px;
								color: #fff;
								border-radius: 20px;
								background-color: #0E0F11;
								border: 1px solid #0E0F11;
							}
							
							/deep/ .el-select-dropdown {
								background-color: #0E0F11; 
								border: 1px solid rgba(255,255,255,0.2);
							}
							/deep/ .el-icon-arrow-up:before { content: "\e78f"; }
							/deep/ .el-icon-arrow-down:before { content: "\e790"; }
							//修改单个的选项的样式
							/deep/ .el-select-dropdown__item {
								background-color: transparent;
								color: #fff;
								text-align: center;
							}
							/deep/ .el-select-dropdown__item.hover{
								background-color: #1D2023;
							}
							/deep/ .el-select-dropdown__item.selected{
								background-color: #1D2023;
							}
						}//options
					}
					.search{
						position: relative;
						top: 50px;
						left: 30px;
						input{
							width: 315px;
							height: 60px;
							background: #0E0F11 0% 0% no-repeat padding-box;
							border-radius: 23px;
							font-size: 18px;
							border: none;
							padding-left: 35px;
							// color: #565656;
							color: #ffffff;
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
				.content_list_block{
					width: 100%;
					margin-top: 30px;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					font-family:'Roboto-Regular';
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
					.list_block{
						background-color: #03060D;
						width: 28%;
						padding: 20px;
						border-radius: 24px;
						margin-right: 40px;
						margin-bottom: 30px;
						cursor: pointer;
						.list_img{
							margin: 0 auto;
							img{
								width: 100%;
								height: 210px;
							}
						}
						.text_block{
							width: 100%;
							margin-top: 10px;
							.text_time{
								color: #757575;
								font-size: 16px;
							}
							.text{
								width: 80%;
								color: #FFFFFF;
								font-size: 24px;
								font-family:'Roboto-Bold';
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
						.block_bottom{
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
					}
				}
			}
		}
	}
</style>
