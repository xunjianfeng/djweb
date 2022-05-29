<template>
	<div class="index">
		<!-- completed 弹窗 -->
		<div class="mark_completed">
			<div class="mark_cancel" v-if="update_up == true" @click.stop="update_up = false">
				<img src="@/assets/images/cancel.png" alt="">
			</div>
			<div class="mark_bac" v-if="update_up == true"></div>
			<div class="mark_popup_container" v-if="update_up == true">
				<div class="top_block">
					<div class="mark_top_head" >Game Name</div>
					<!-- <div class="mark_border"></div> -->
					<div class="mark_content">
						<div class="mark_content_head">
							<div class="mark_head_tit">Update Result</div>
							<div class="big_table_area" v-if="game_type == 1">
								<div class="table_list">
									<div :class="table_index == mndex ? 'tname acv' : 'tname'" v-for="(mtem,mndex) in game_result.matchResults" :key="mndex" @click="tabTable(mndex)">
										{{mndex+1 == 1 ? '1st' : mndex+1 == 2 ? '2nd' : mndex+1 == 3 ? '3rd': mndex+1 +'th'  }}
									</div>
									<!-- <div :class="table_index == 2 ? 'tname acv' : 'tname'" @click="tabTable(2)">1st</div>
									<div :class="table_index == 3 ? 'tname acv' : 'tname'" @click="tabTable(3)">final</div> -->
								</div>
								<div class="table_area">
									<div class="table_header">
										<div class="header_1">Team</div>
										<div class="header_1">Match</div>
										<div class="header_1">Kill Points</div>
										<div class="header_1">Place Points</div>
										<div class="header_1">Total Points</div>
										<div class="header_1">WWCD</div>
									</div>
									<div class="table_body">
										<div class="body_row" v-for="(rtem,rndex) in game_result.matchResults[table_index].teamStandings">
											<div class="row_col">{{rtem.teamNo}}</div>
											<div class="row_col">{{game_result.matchResults[table_index].matchNo}}</div>
											<div class="row_col">{{rtem.killPoints || 0}}</div>
											<div class="row_col">{{rtem.placePoints || 0}}</div>
											<div class="row_col">{{rtem.totalPoints || 0}}</div>
											<div class="row_col">{{rtem.isWinner == true ? '1' : '0'}}</div>
										</div>
									</div>
								</div>
							</div>
							
							
							<!-- 输入 -->
							<div class="big_table_area" v-if="game_type == 2">
								<div class="table_list">
									<div :class="table_index == mndex ? 'tname acv' : 'tname'" v-for="(mtem,mndex) in dataForm.matchResults" @click="tabTable(mndex)">
										{{mndex+1 == 1 ? '1st' : mndex+1 == 2 ? '2nd' : mndex+1 == 3 ? '3rd': mndex+1 +'th'  }}
									
									</div>
								</div>
								<div class="table_area">
									<div class="table_header">
										<div class="header_1">Team</div>
										<div class="header_1">Match</div>
										<div class="header_1">Kill Points</div>
										<div class="header_1">Place Points</div>
										<div class="header_1">Total Points</div>
										<div class="header_1">WWCD</div>
									</div>
									<div class="table_body">
										<div class="body_row" v-for="(dtem,dndex) in dataForm.matchResults[table_index].teamStandings" :key="dndex">
										<!--  v-for="(dtem,dndex) in game_result.matchResults[table_index].teamStandings" -->
											<!-- <div class="row_col">A</div>
											<div class="row_col">1</div>
											<div class="row_col">2</div>
											<div class="row_col">3</div>
											<div class="row_col">4</div>
											<div class="row_col">6</div> -->
											<div class="row_col">{{dtem.teamNo}}</div>
											<div class="row_col">{{dataForm.matchResults[table_index].matchNo}}</div>
											<div class="row_col">
												<!-- <input v-model.number="dataForm.matchResults[table_index].teamStandings[dndex].kills" type="number"/> -->
												<input v-model.number="dtem.kills" @input="inputValue" type="number"/>
											</div>
											<div class="row_col">
												<!-- <input v-model.number="dataForm.matchResults[table_index].teamStandings[dndex].place" type="number"/> -->
												<input v-model.number="dtem.place" @input="inputValue" type="number"/>
											</div>
											<div class="row_col">
												<!-- <input v-model.number="dataForm.matchResults[table_index].teamStandings[dndex].total" type="number"/> -->
												<input v-model.number="dtem.total" disabled type="number"/>
											</div>
											<div class="row_col">
												<!-- <input v-model.number="dataForm.matchResults[table_index].teamStandings[dndex].isWinner" type="number"/> -->
												<input v-model.number="dtem.isWinner" type="number"/>
											</div>
										</div>
										<!-- <div class="body_row">
											<div class="row_col">A</div>
											<div class="row_col">1</div>
											<div class="row_col">2</div>
											<div class="row_col">3</div>
											<div class="row_col">4</div>
											<div class="row_col">6</div>
										</div> -->
									</div>
								</div>
							</div>
							<!-- <div class="mark_head_input" v-if="game_type == 2"> -->
								<!-- <div class="mark_header">
									<div class="mark_header_1">Team</div>
									<div class="best_of_list">
										<div class="list_header">Best of 1</div>
										<div class="list_header">Best of 2</div>
										<div class="list_header">Best of 3</div>
									</div>
								</div>
								<div class="mark_body">
									<div class="mark_row">
										<div class="team_name">A</div>
										<div class="num_list">
											<div class="list_col">1</div>
											<div class="list_col">2</div>
											<div class="list_col">3</div>
										</div>
									</div>
									<div class="mark_row">
										<div class="team_name">B</div>
										<div class="num_list">
											<div class="list_col">11</div>
											<div class="list_col">22</div>
											<div class="list_col">33</div>
										</div>
									</div>
								</div> -->
								<!-- <div class="input_right">
									<input type="text" value="" v-model="dataForm.identification">
								</div> -->
							<!-- </div> -->
						
						</div>
						<div class="mark_content_update_block">
							<div class="mark_head_tit">Update Result Screenshot</div>
							<div class="mark_content_img" v-if="game_type == 1">
								<div class="img_block_center">
									<img :src="HOST + game_result.matchResults[table_index].standingSnapshot" />
								</div>
							</div>
							<div class="mark_content_update" v-if="game_type == 2 && dataForm.matchResults[table_index]" style="margin-top:40px;">
								<img class="active1_img" v-if="dataForm.matchResults[table_index].standingSnapshot" :src="HOST + dataForm.matchResults[table_index].standingSnapshot">
								<!-- https://wanghuiwen.com/game/api/img/upload -->
								<el-upload class="avatar-uploader" 	:action="HOST + '/img/upload'" :show-file-list="false"
								:on-success="res => {return handleAvatarSuccess(res,'standingSnapshot',);}" :before-upload="beforeAvatarUpload">
									<!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
									<img src="../../assets/images/update.png" alt="" v-if="dataForm.matchResults[table_index].standingSnapshot == ''">
								</el-upload>
							</div>
						</div>
						<div class="mark_foot">
							<div class="foot_right">
								<!-- <div class="foot_button" v-if="table_index == 1">Close</div> -->
								<div class="foot_button" v-if="table_index != last_one && game_type != 1" @click="changeNext(table_index)">Save</div>
								<div class="foot_button" v-if="table_index == last_one && game_type != 1" @click="confirm_up = true,update_up = false">Confirm</div>
							</div>
						</div>
					</div>
				</div>
			
			</div>
			
		</div>
		<!-- completed end -->
		<!-- Host a rapid challenge -->
		<div class="mark_host">
			<div class="mark_cancel" v-if="host_up == true" @click.stop="closeHost">
				<img src="@/assets/images/cancel.png" alt="">
			</div>
			<div class="mark_bac" v-if="host_up == true"></div>
			<div class="host_container" v-if="host_up == true">
				<div class="top_block">
					<div class="mark_top_head" >Host a rapid challenge</div>
					<div class="block_content">
						<div class="input_block">
							<div class="label">Game Type</div>
							<div class="input_right">
								<el-select v-model.number="roomData.gameId" placeholder="Please select" style="margin-right: 20px;"
								 :popper-append-to-body="false" @change="selectChanged">
									<el-option v-for="(item,index) in game_list" :label="item.gameName" :value="item.gameId"></el-option>
								</el-select>
							</div>
						</div>
						<div class="input_block1">
							<div class="label">Room Type</div>
							<div class="input_block_right">
								<div class="input_left">
									<el-select v-model="isPublic" placeholder="Please select" style="margin-right: 20px;"
									 :popper-append-to-body="false">
										<el-option label="Public" value="1"></el-option>
										<el-option label="Private" value="0"></el-option>
									</el-select>
								</div>
								<div class="block_right" v-if="isPublic == '0'">
									<div class="label">Password</div>
									<div class="input_right">
										<input v-model="roomData.password" type="text" placeholder="Key in your private room password"/>
									</div>
								</div>
							</div>
							
						</div>
						<div class="input_block">
							<div class="label">Room Name</div>
							<div class="input_room">
								<input type="text" v-model="roomData.roomName" placeholder="Your room Name"/>
							</div>
						</div>
						<div class="input_block">
							<div class="label">Date</div>
							<div class="input_date">
								<el-date-picker
									v-model="play_time"
									type="datetime"
									placeholder="Pick a time" :picker-options="pickerOptions0">
								</el-date-picker>
							</div>
						</div>
						<div class="input_block">
							<div class="label">Best of</div>
							<div class="input_right">
								<el-select v-model="bestOf" placeholder="Please select" style="margin-right: 20px;"
								 :popper-append-to-body="false">
									<el-option label="Best of 1" value="1"></el-option>
									<el-option label="Best of 3" value="3"></el-option>
									<el-option label="Best of 5" value="5"></el-option>
								</el-select>
							</div>
						</div>
						<div class="input_block">
							<div class="label">Mode</div>
							<!-- <div class="input_room">
								<input type="text" placeholder="Your room Name"/>
							</div> -->
							<div class="input_right">
								<el-select v-model="roomData.model" placeholder="Please select" style="margin-right: 20px;"
								 :popper-append-to-body="false">
									<el-option label="Solo free for all" value="Solo free for all"></el-option>
									<el-option label="Solo free for all (teams)" value="Solo free for all (teams)"></el-option>
									<el-option label="Teams free for all" value="Teams free for all"></el-option>
								</el-select>
							</div>
						</div>
						<div class="input_block">
							<div class="label">Participants</div>
							<div class="input_room">
								<input type="number" v-model.number="roomData.participants" placeholder="Participants"/>
							</div>
						</div>
						<div class="input_block">
							<div class="label">Fee</div>
							<div class="input_right">
								<el-select v-model="roomData.roomFee" placeholder="Please select" style="margin-right: 20px;"
								 :popper-append-to-body="false">
									<el-option :label="ftem.fee" :value="ftem.key" v-for="ftem in roomFee_list"></el-option>
									<!-- <el-option label="230 coins" value="230"></el-option>
									<el-option label="460 coins" value="460"></el-option>
									<el-option label="920 coins" value="920"></el-option> -->
								</el-select>
							</div>
						</div>
					</div>
					<div class="btn_area">
						<div class="host_btn" @click="createRoom">Host</div>
						<div class="cancel_btn" @click="closeHost">Cancel</div>
					</div>
				</div>		
			</div>
		</div>
		<!-- 确认游戏结果 -->
		<div class="mark_confirm">
			<div class="mark_cancel" v-if="confirm_up == true" @click.stop="confirm_up = false">
				<img src="@/assets/images/cancel.png" alt="">
			</div>
			<div class="mark_bac" v-if="confirm_up == true"></div>
			<div class="mark_popup_container" v-if="confirm_up == true">
				<div class="top_block">
					<div class="mark_top_head" >Game Name</div>
					<!-- <div class="mark_border"></div> -->
					<div class="mark_content">
						<div class="content_text">
							You are going to confirm this game's result. Once you click the confirm,it is irrecoverable,are you confirm?'
						</div>
						<div class="btn_area">
							<div class="host_btn" @click="updateResult">Confirm</div>
							<div class="cancel_btn" @click="confirm_up = false">No</div>
						</div>
					</div>
				</div>
			
			</div>
			
		</div>
		
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<div class="adiv" @click="jump_pagee(1)">
						<p >Profile</p>
					</div>
					<div class="adiv" @click="jump_pagee(2)">
						<p>Wallet</p>
					</div>
					<div class="adiv" @click="jump_pagee(3)">
						<p class="av">Host</p>
					</div>
					<div class="adiv" @click="jump_pagee(4)">
						<p >Companion</p>
					</div>
				</div><!-- content_right_nav -->
				<div class="content_right_form">
					<div class="right_form_top">
						<div class="level" @mouseenter="level_status = true" @mouseleave="level_status = false" >
							<div class="label" >My Level: {{host_detail.level || 0}}</div>
							<div class="level_content" v-if="level_status == true">
								<div class="about_host">
									<p class="host_title">About Host</p>
									<div class="host_form">
										<div class="form_row" v-for="(item,index) in level_rule" >
											<div class="level">
												<p>Level.</p>
												<p class="num">{{item.level}}</p>
											</div>
											<div class="host_form_content">
												<div class="host_form_content_row">
													<img src="../../assets/images/true.png" />
													<p v-if="item.level == 0">Watch Tutorial Video to unlock Host feature</p>
													<p v-if="item.level != 0">Hosted {{item.needToHostGames}} amount of games to become Level {{item.level}} Host.</p>
												</div>
												<div class="host_form_content_row" v-if="item.level != 0">
													<img src="../../assets/images/true.png" />
													<p>Maintain rating Minimum at {{item.minStar}} stars</p>
												</div>
											</div>
											<!-- <button class="form_btn">Chose</button> -->
										</div>
									</div>
								</div>
								<div class="notes">
									<p class="notes_title">Extra Notes:</p>
									<div class="notes_msg">
										<p class="tips">Host with high rankings (stars) will earn different % of coins</p>
										<div class="" v-for="(htem,index1) in level_rule" v-if="htem.level != 0">
											{{index1}})  {{htem.minStar}} stars host : {{htem.proportion}}% coins from total of the room hosted
										</div>
									</div>
								</div>
												
							</div>
						</div>
						<div class="data_area">
							<div class="">
								<p>Creation</p>
								<p>{{host_detail.createdGames || 0}}</p>
							</div>
							<!-- <div class="">
								<p>Win Rate</p>
								<p>21</p>
							</div> -->
							<div class="last_div">
								<p>Earnings</p>
								<p>MYR {{host_detail.earningCoins || 0}}</p>
							</div>
						</div>
					</div><!-- right_form_top -->
					<div class="content_right_center">
						<div class="center_choice">
							<div class="choice_left">
								<div class="status">
									<p class="status_text">Game Type</p>
									<div class="options">
										<el-select v-model="listQuery.gameId" placeholder="Please select" style="margin-right: 20px;"
										 :popper-append-to-body="false" @change="selectChanged">
											<el-option v-for="(item,index) in game_list" :label="item.gameName" :value="item.gameId"></el-option>
										</el-select>
									</div>
								</div>
								<div class="sort_by">
									<p class="sort_by_text">Status</p>
									<div class="options">
										<el-select v-model="listQuery.roomStatus" placeholder="Please select" style="margin-right: 20px;"
										 :popper-append-to-body="false" @change="selectChanged">
											<el-option label="All" value=""></el-option>
											<el-option label="Waiting To Start" value="WaitingToStart"></el-option>
											<el-option label="To Update" value="ToUpdate"></el-option>
											<el-option label="Complete" value="Complete"></el-option>
										</el-select>
									</div>
								</div>
							</div>
							<div class="search">
								<div class="host_btn" @click="open_host">Host a rapid challenge</div>
							</div>
						</div>
						<!-- 没有数据 -->
						<div class="no_data_area" v-if="hostchallenge_list == ''">
							<div class="no_data">
								<img src="../../assets/images/no_tournament.svg" />
								<div class="no_data_text">No any data</div>
							</div>
						</div>
						<!-- 表格  -->
						<div class="center_table" v-if="hostchallenge_list != ''">
							<div class="table_header">
								<div class="header_2">Game Type</div>
								<div class="header_1">Date</div>
								<div class="header_2">Room Name</div>
								<div class="header_1">Type</div>
								<div class="header_1">Best of</div>
								<div class="header_1">Mode</div>
								<div class="header_1">Joinned</div>
								<div class="header_1">Coins</div>
								<div class="header_1">Status</div>
							</div>
							<div class="table_body">
								<div class="body_row" v-for="(item,index) in hostchallenge_list">
									<div class="row_col_1">{{item.game.name}}</div>
									<div class="row_col">{{item.planningPlayTime}}</div>
									<div class="row_col_1">{{item.roomName}}</div>
									<div class="row_col">{{item.isPublic == true ? 'Public' : 'Private'}}</div>
									<div class="row_col">{{item.bestOf}}</div>
									<div class="row_col">{{item.gameMode}}</div>
									<div class="row_col">({{item.players || 0}}/{{item.capacity || 0}})</div>
									<div class="row_col">{{item.fee || 0}}</div>
									<div :class="item.roomStatus == 'WaitingToStart' ? 'row_col text_color1' : item.roomStatus == 'ToUpdate' ? 'row_col text_color3' : 'row_col text_color2' " @click="item.roomStatus == 'WaitingToStart' ? getStart(item.roomId) : item.roomStatus == 'Complete' ? getResult(1,item.roomId) : getResult(2,item.roomId)">
										{{item.roomStatus == 'WaitingToStart' ? 'Waiting To Start' : item.roomStatus == 'ToUpdate' ? 'To Update' : 'Complete'}}
									</div>
								</div>
								<!-- <div class="body_row">
									<div class="row_col_1">Dota2</div>
									<div class="row_col">2021-07-21 12:00:00</div>
									<div class="row_col_1">Calrity Inhouse Ladder</div>
									<div class="row_col">public</div>
									<div class="row_col"></div>
									<div class="row_col">Leader Mode</div>
									<div class="row_col">(5/10)</div>
									<div class="row_col">50</div>
									<div class="row_col text_color1">Waiting to start</div>
								</div> -->
							</div>
						</div>
						<div class="pagnationBox">
							<pagination v-if="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"
							 @pagination="handlePageChange" />
						</div>
					</div>
				
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/order/left.vue'
	import {gameList} from '@/api/order.js'
	import {hostChallengeList,createRoom,startGame,hostRoomFee,getHostOverview,getGameResult,completeGame,getLevelRules} from '@/api/league.js'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	// import Pagination from '@/components/Pagination/wallet.vue'; 
	export default {
		name: "host_level",
		mixins: [Listing],
		components: {
			LeftView,
			Pagination
		},
		data() {
			return {
				game_type:2,//输入成绩不同游戏类型的表格	1.查看成绩	2.上传成绩
				table_index:0,//切换不同表格
				confirm_up:false,//确认成绩已经上传的弹窗
				level_status:false,//鼠标滑过Mylevel,显示level内容
				update_up:false,//点击completed，弹窗出现,结束游戏并上传图片
				host_up:false, 	//点击Host a rapid challenge，弹窗出现,创建房间
				status: false,
				dialogImageUrl: '',
				dialogVisible: false,
				listQuery: {
					gameId:'',
					roomStatus:'',
					page: 1,
					size: 10
				},
				dataForm:{
					roomId:'',
					matchResults:[
						{
							matchNo:'1',
							standingSnapshot:'',
							teamStandings:[
								{
									teamNo:'1',
									kills:'',
									place:'',
									total:'',
									isWinner:''
								}
							]
						}
					]
				},
				roomData:{
					gameId:'',//游戏ID
					isPublic:'',//处理后的是否是公开房间，转成boolean类型
					password:'',
					roomName:'',//房间名称
					planningPlayTime:'',//处理之后的计划游戏时间
					model:'',//游戏模式
					roomFee:'',//房费标识
					bestOf:'',//处理之后的BO几
					participants:'',//玩家数量
				},
				pickerOptions0: {
					disabledDate: (time) => {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				bestOf:'',//BO几
				play_time:'',//计划游戏时间
				isPublic:'',//是否是公开房间
				total_count:0,
				hostchallenge_list: [],//分页查询主持过的比赛
				game_list:[],//游戏列表
				roomFee_list:[],//主持人可用房费列表
				host_detail:{},//主持人概况
				game_result:{},//比赛结果
				room_detail:{},//房间详情
				last_one:1,//上传成绩的最后一个表格
				room_Id:'',//上传成绩点击的房间号
				level_rule:[],//主持人等级规则
			};
		},
		mounted() {
			// console.log(sessionStorage.getItem("member_detail_list"))
			this.getList()
			this.getGameList()
			this.getHostOverview()
			this.getLevelRules()
			// this.init()
		},
		methods: {
			//关闭创建房间弹窗
			closeHost(){
				this.host_up = false
				this.roomData.gameId = ''
				this.isPublic = ''
				this.roomData.password = ''
				this.roomData.roomName = ''
				this.play_time =''
				this.roomData.model = ''
				this.roomData.roomFee = ''
				this.bestOf = ''
				this.roomData.participants = ''
			},
			//获取主持人等级规则
			getLevelRules(){
				getLevelRules().then(res => {
					for(let i = 0;i < res.data.length;i++){
						res.data[i]['proportion'] = ''
					}
					this.level_rule = res.data
					for(let j = 0; j < this.level_rule.length;j++){
						this.level_rule[j]['proportion'] = this.level_rule[j].earnCoinRatio * 100
						console.log(this.level_rule[j]['proportion'])
					}
				})
			},
			//获取主持人概况
			getHostOverview(){
				getHostOverview().then(res => {
					this.host_detail = res.data
				})
			},
			//打开创建房间的弹窗
			open_host(){
				if(this.host_detail.status == 'ENABLE'){
					//有权限
					this.host_up = true
					this.getHostRoomFee()
				}else if(this.host_detail.status == 'BLOCKED'){
					//没有权限
					this.$message({
						type: 'warning',
						// message: '当前用户没有权限',
						message:'You have been blocked. Contact customer support.'
					});
				}
				
			},
			//获取主持人可用的房费列表
			getHostRoomFee(){
				hostRoomFee().then(res =>{
					this.roomFee_list = res.data
				})
			},
			//分页查询主持过的比赛
			getList(){
				hostChallengeList(this.listQuery).then(res => {
					this.hostchallenge_list = res.data.list
					this.total_count = res.data.total
				})
			},
			//创建房间
			createRoom(){
				this.roomData.isPublic = Boolean(Number(this.isPublic))
				this.roomData.planningPlayTime = this.initDete(this.play_time)
				this.roomData.bestOf = Number(this.bestOf)
				createRoom(this.roomData).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.closeHost()
					this.getList()
				})
			},
			//开始游戏
			getStart(roomId){
				//是否确定开始游戏?
				this.$confirm('Confirm to start this game?', 'Confirmation', {
				  confirmButtonText: 'Confirm',
				  cancelButtonText: 'Cancel',
				  type: 'warning',
				  center: true
				}).then(() => {
					startGame({roomId}).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.getList()
					})
				})
			},
			// 列表status弹窗	1.查看成绩game_type == 1 	2.上传成绩的弹窗game_type == 2
			getResult(index,roomId){
				this.game_type = index
				this.update_up = true
				if(this.game_type == 1){
					//查看比赛成绩
					getGameResult({roomId}).then(res => {
						// for(let a = 0; a< res.data.matchResults.length;a++){
						// 	res.data.matchResults[a]['standingSnapshot'] = ''
						// 	for(let b = 0; b < res.data.matchResults[a].teamStandings.length; b++){
						// 		res.data.matchResults[a].teamStandings[b]['kills'] = ''
						// 		res.data.matchResults[a].teamStandings[b]['place'] = ''
						// 		res.data.matchResults[a].teamStandings[b]['total'] = ''
						// 		res.data.matchResults[a].teamStandings[b]['isWinner'] = ''
						// 	}
						// }
						this.game_result = res.data
						console.log(this.game_result)
					})
				}else if(this.game_type == 2){
					//打开上传成绩
					this.room_Id = roomId
					let arr = []
					let arr1 = []
					for(let c = 0; c < this.hostchallenge_list.length; c++){
						if(this.hostchallenge_list[c].roomId == roomId){
							this.room_detail = this.hostchallenge_list[c]
						}
					}
					if(this.dataForm.matchResults.length <= this.room_detail.bestOf){
						console.log(this.room_detail.teamsCount)
						for(let e in this.dataForm.matchResults){
							for(let f = 0; f< this.room_detail.teamsCount; f++){
								let obj = {
									teamNo:f+1,
									kills:'',
									place:'',
									total:'',
									isWinner:''
								}
								arr1.push(obj)
							}
							this.dataForm.matchResults[e].teamStandings = arr1
						}
						for(let d = 0; d < this.room_detail.bestOf;d++){
							// console.log("aaa")
							arr.push({
								matchNo:d+1,
								standingSnapshot:'',
								teamStandings:arr1
							})
						}// teamsCount
						this.dataForm.matchResults = arr
						// console.log(this.dataForm.matchResults)
						this.last_one = this.dataForm.matchResults.length-1
						
					}else{
						this.last_one = this.dataForm.matchResults.length-1
					}
				}
			},
			inputValue(){
				//计算total的值
				for(let q = 0; q < this.dataForm.matchResults.length;q++){
					for(let w = 0; w < this.dataForm.matchResults[q].teamStandings.length; w++){
						this.dataForm.matchResults[q].teamStandings[w].total = (this.dataForm.matchResults[q].teamStandings[w].kills) + (this.dataForm.matchResults[q].teamStandings[w].place)
					}
				}
			},
			//结束游戏并上传成绩
			updateResult(){
				this.dataForm.roomId = this.room_Id
				console.log(this.dataForm)
				completeGame(this.dataForm).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.confirm_up = false
					this.dataForm = {}
					this.game_list()
				})
			},
			//游戏列表
			getGameList(){
				gameList({size:0}).then(res => {
					let arr = []
					for(let g = 0; g < res.data.list.length; g++){
						if(res.data.list[g].gameName == 'Dota 2' || res.data.list[g].gameName == 'PUBG' || res.data.list[g].gameName == 'CS Go'){
							arr.push(res.data.list[g])
						}
					}
					this.game_list = arr
					// console.log(this.game_list)
				})
			},
			//切换表格
			tabTable(mndex){
				this.table_index = mndex
				// console.log(mndex)
			},
			//切换下一个表格
			changeNext(table_index){
				// console.log(this.dataForm)
				this.table_index = table_index + 1
				// console.log(this.table_index)
			},
			 handleRemove(file, fileList) {
				// console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			selectChanged(value) {
				this.handleFilter();
			},
			handleFilter() {
				this.listQuery.page = 1;
				this.getList()
			},
			// 跳转页面
			jump_pagee(index){
				if(index == 1){
					this.$router.push({path: '/center/profile'})
				}else if(index == 2){
					this.$router.push({path: '/order/wallet'})
				}else if(index == 3){
					this.$router.push({path: '/order/host'})
				}else if(index == 4){
					this.$router.push({path: '/center/companion'})
				}
			},
			handleAvatarSuccess(res,attr) {
				this.$loading({
				customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						message: res.message,
						type: 'success'
					});
					if(attr === 'standingSnapshot'){
						this.dataForm.matchResults[this.table_index].standingSnapshot = res.data
					}
				}else{
					this.$message({
						message: res.message,
						type: 'error'
					});
				}
				
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type;
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.$loading({
				background: "rgba(255, 255, 255, 0.7)",
				customClass: "animated fadeIn",
				text: "Uploading"
				});
				return isJPG && isLt2M;
			},
			
		},
		computed: {
			indexs: function() {
				// this.total_page = Math.ceil(this.total_num / this.num_size)
			}
		}

	}
</script>

<style lang="less" scoped>
	.mark_completed{
		.mark_cancel{
			position: absolute;
			right: 80px;
			top: 10px;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
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
		.mark_popup_container{
			position: absolute;
			left: 26%;
			top: 100px;
			z-index: 99;
			.top_block{
				padding: 50px 30px 50px 30px;
				// background: #0E0F11;
				background-color: #1D2023;
				border-radius: 32px;
				overflow: hidden;
				.mark_top_head{
					font-size: 24px;
					color:#DBA83F ;
					font-family:'Quicksand-Bold';
					text-align: center;
					margin-bottom: 15px;
				}
				.mark_top_tit{
					color: #727272;
					font-family:'Roboto-Regular';
					font-size: 18px;
					text-align: center;
					margin-bottom: 20px;
				}
				.mark_border{
					width: 90%;
					height: 2px;
					background-color:#2D2D2D;
					margin: 0 auto;
				}
				.mark_content{
					.mark_content_head{
						.mark_head_tit{
							color: #727272;
							font-size: 20px;
							font-family:'Roboto-Regular';
							margin: 49px 0 12px 0;
						}
						.big_table_area{
							width: 627px;
							
							.table_list{
								display: flex;
								align-items: center;
								margin-bottom: 20px;
								.tname{
									color: #727272;
									font-size: 18px;
									font-family:'Roboto-Regular';
									margin-right: 15px;
									cursor: pointer;
								}
								.acv{
									color:#DBA83F;
								}
							}
							.table_area{
								width: 100%;
								border-radius: 19px;
								font-size: 18px;
								border: 1px solid #727272;
								.table_header{
									
									display: flex;
									align-items: center;
									text-align: center;
									color: #727272;
									border-bottom: 1px solid #7f7f7f;
									.header_1{
										width: 16.5%;
										height: 40px;
										line-height: 40px;
										border-right: 1px solid #7f7f7f;
										&:last-child{
											border: none;
										}
									}
								}
								.table_body{
									.body_row{
										display: flex;
										align-items: center;
										text-align: center;
										color: #727272;
										border-bottom: 1px solid #7f7f7f;
										&:last-child{
											border: none;
										}
										.row_col{
											width: 16.5%;
											height: 40px;
											line-height: 40px;
											border-right: 1px solid #7f7f7f;
											input{
												width: 90%;
												background-color:#1D2023;
												// background-color:#FFF000;
												height: 30px;
												border: none;
												border-radius: 19px;
												color: #FFFFFF;
												// padding-left: 15px;
												text-align: center;
												font-size: 16px;
											}
											&:last-child{
												border: none;
											}
										}
									}
								}
							}
						}
						.mark_head_input{
							width: 627px;
							// height: 59px;
							// line-height: 59px;
							border: 1px solid #727272;
							border-radius: 19px;
							font-size: 18px;
							.mark_header{
								width: 100%;
								display: flex;
								align-items: center;
								color: #727272;
								border-bottom: 1px solid #7f7f7f;
								text-align: center;
								.mark_header_1{
									width: 20%;
									height: 40px;
									line-height: 40px;
									border-right: 1px solid #7f7f7f;
								}
								.best_of_list{
									width: 80%;
									display: flex;
									align-items: center;
									// justify-content: space-evenly;
									.list_header{
										width: 33%;
										height: 40px;
										line-height: 40px;
										border-right: 1px solid #7f7f7f;
										&:last-child{
											border: none;
										}
									}
								}
							}
							.mark_body{
								.mark_row{
									width: 100%;
									display: flex;
									align-items: center;
									color: #727272;
									border-bottom: 1px solid #7f7f7f;
									text-align: center;
									&:last-child{
										border: none;
									}
									.team_name{
										width: 20%;
										height: 40px;
										line-height: 40px;
										border-right: 1px solid #7f7f7f;
									}
									.num_list{
										width: 80%;
										display: flex;
										align-items: center;
										.list_col{
											width: 33%;
											height: 40px;
											line-height: 40px;
											border-right: 1px solid #7f7f7f;
											&:last-child{
												border: none;
											}
										}
									}
								}
							}
							// display: flex;
							// align-items: center;
							// .input_right{
							// 	height: 59px;
							// 	display: flex;
							// 	align-items: center;
							// 	padding-left: 20px;
							// 	width: 80%;
							// 	input{
							// 		width: 100%;
							// 		height: 54px;
							// 		color: #fff;
							// 		font-family:'Roboto-Regular';
							// 		font-size: 18px;
							// 		// background-color: #0E0F11;
							// 		background-color: #1D2023;
							// 		outline: none;
							// 		border: none;
							// 	}
							// }
						}
					}
					.update_title{
						width: 90%;
						margin: 0 auto;
						color: #fff;
						font-size: 18px;
						font-family:'Roboto-Bold';
						margin-top: 40px;
						margin-bottom: 20px;
					}
					.mark_content_update_block{
						.mark_head_tit{
							color: #727272;
							font-size: 20px;
							font-family:'Roboto-Regular';
							margin: 49px 0 12px 0;
						}
						.mark_content_img{
							display: flex;
							justify-content: center;
							margin-top: 40px;
							.img_block_center{
								// width: 375px;
								// height: 280px;
								background-color: #00FF00;
								img{
									width: 375px;
									height: 280px;
									// width: 100px;
									// height: 100px;
									object-fit: cover;
								}
							}
							
						}
						.mark_content_update{
							width: 90%;
							margin: 0 auto;
							// margin-top:80px;
							display: flex;
							justify-content: center;
							// overflow: scroll;
							.active1_img{
								// width: 60%;
								// height: 200px;
								width: 375px;
								height: auto;
								object-fit: cover;
							}
							.mark_head_tit{
								color: #727272;
								font-size: 20px;
								font-family:'Roboto-Regular';
								margin: 49px 0 12px 0;
							}
							
							.update_block{
								width: 48%;
								.update_block_tit{
									color: #fff;
									font-family:'Roboto-Bold';
									font-size: 18px;
									margin-bottom: 20px;
								}
								.udpate_btom_no{
									width: 100%;
									padding: 35px 0;
									text-align: center;
									background-color: #000;
									border-radius: 12px;
									img{
										width: 40px;
									}
									p{
										color: #fff;
										width: 90%;
										margin-left: 5%;
										word-break: break-all;
									}
								}
								.udpate_btom{
									width: 100%;
									height: 180px;
									text-align: center;
									background-color: #000;
									border-radius: 12px;
									.active1_img{
										width: 100%;
										height: 180px;
										object-fit: cover;
										border-radius: 12px;
									}
									img{
										width: 40px;
									}
								}
							}
						}
						
					}
					.mark_foot{
						margin-top: 80px;
						margin-bottom: 20px;
						.foot_right{
							.foot_button{
								margin: 0 auto;
								width: 163px;
								height: 58px;
								color: #0E0F11;
								line-height: 58px;
								font-size: 20px;
								cursor: pointer;
								text-align: center;
								background: #DBA83F;
								border-radius: 25px;
							}
							
						}
					}
				}
			}
		}
		
	}
	.mark_confirm{
		.mark_cancel{
			position: absolute;
			right: 80px;
			top: 10px;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
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
		.mark_popup_container{
			position: absolute;
			left: 28%;
			top: 150px;
			z-index: 99;
			.top_block{
				padding: 50px 30px;
				// background: #0E0F11;
				background-color: #1D2023;
				border-radius: 32px;
				// overflow: hidden;
				.mark_top_head{
					font-size: 24px;
					color:#DBA83F ;
					font-family:'Quicksand-Bold';
					text-align: center;
					margin-bottom: 15px;
				}
				.mark_content{
					width: 550px;
					.content_text{
						color: #727272;
						font-family:'Roboto-Regular';
						font-size: 18px;
						text-align: center;
						// margin-bottom: 20px;
						margin: 40px  20px;
					}
					.btn_area{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-top: 50px;
						.host_btn {
							width: 120px;
							height: 50px;
							line-height: 50px;
							background-color: #D3AA53;
							border-radius: 25px;
							text-align: center;
							color: #000;
							font-size: 18px;
							font-family:'Roboto-Regular';
							cursor: pointer;
						}
						.cancel_btn {
							width: 120px;
							height: 50px;
							line-height: 50px;
							border: 1px solid #777777;
							border-radius: 25px;
							text-align: center;
							color: #fff;
							font-size: 18px;
							margin-left: 20px;
							font-family:'Roboto-Regular';
							cursor: pointer;
						}
					}
				}
			}
		}
		
	}
	.mark_host{
		.mark_cancel{
			position: absolute;
			right: 80px;
			top: 10px;
			img{
				width: 46px;
				height: 46px;
				cursor: pointer;
			}
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
		.host_container{
			position: absolute;
			left: 20%;
			top: 85px;
			z-index: 99;
			width: 1000px;
			.top_block{
				padding: 50px 30px 50px 30px;
				// background: #0E0F11;
				background-color: #1D2023;
				border-radius: 32px;
				overflow: hidden;
				.mark_top_head{
					font-size: 24px;
					color:#DBA83F ;
					font-family:'Quicksand-Bold';
					text-align: center;
					margin-bottom: 50px;
				}
				.block_content{
					width: 100%;
					// background-color: #FF4D51;
					.input_block{
						width: 100%;
						display: flex;
						align-items: center;
						margin-bottom: 20px;
						.label{
							width: 15%;
							color: #727272;
							margin-right: 20px;
							text-align: right;
							font-size: 18px;
						}
						.input_right{
							width: 75%;
							// background-color: #FF4D51;
							position: relative;
							/deep/ .el-select{
								width: 100%;
							}
							/deep/ .el-select .el-input .el-input__inner {
								border: 0px;
								width: 100%;
								// width: 555px;
								// width: 100%;
								height: 50px;
								color: #fff;
								font-family:'Roboto-Regular';
								border-radius: 10px;
								background-color: #0E0F11;
								// background-color: #FF4D51;
								border: 1px solid #0E0F11;
							}
							/deep/ .el-select-dropdown {
								background-color: #0E0F11;
								border: 1px solid rgba(255,255,255,0.2);
							}
							/deep/ .el-icon-arrow-up:before {
								content: "\e78f";
							}
							/deep/ .el-icon-arrow-down:before {
								content: "\e790";
							}
							//修改单个的选项的样式
							/deep/ .el-select-dropdown__item {
								background-color: transparent;
								color: #fff;
								font-family:'Roboto-Regular';
								text-align: center;
							}
							/deep/ .el-select-dropdown__item.hover{
								background-color: #1D2023;
							}
							/deep/ .el-select-dropdown__item.selected{
								background-color: #1D2023;
							}
						}
						.input_room{
							width: 73%;
							// background-color: #FF4D51;
							input{
								width: 100%;
								// width: 502px;
								height: 50px;
								color: #fff;
								font-family:'Roboto-Regular';
								border-radius: 10px;
								background-color: #0E0F11;
								border: 1px solid #0E0F11;
								padding-left: 15px;
								font-size: 16px;
							}
						}
						.input_date{
							width: 75%;
							height: 50px;
							// background-color: #FF9DA4;
							// background-color: #FF4D51;
							/deep/ .el-date-editor {
								width: 100%;
								height: 50px;
								border-radius: 10px;
								background-color: #0E0F11;
								border: 1px solid #0E0F11;
							}
							/deep/ .el-input__inner {
								background-color: #0E0F11;
								color: #ffffff;
								height: 50px;
								border-radius: 10px;
								border: 1px solid #0E0F11;
							}
						}
					}
					.input_block1{
						width: 100%;
						display: flex;
						align-items: center;
						margin-bottom: 20px;
						.label{
							width: 15%;
							color: #727272;
							margin-right: 20px;
							text-align: right;
							font-size: 18px;
						}
						.input_block_right{
							width: 75%;
							height: 50px;
							display: flex;
							align-items: center;
							justify-content: space-between;
							// background-color: #FF9DA4;
							.input_left{
								/deep/ .el-select .el-input .el-input__inner {
									border: 0px;
									width: 180px;
									// width: 100%;
									height: 50px;
									color: #fff;
									font-family:'Roboto-Regular';
									border-radius: 10px;
									background-color: #0E0F11;
									// background-color: #FF4D51;
									border: 1px solid #0E0F11;
								}
								/deep/ .el-select-dropdown {
									background-color: #0E0F11;
									border: 1px solid rgba(255,255,255,0.2);
								}
								/deep/ .el-icon-arrow-up:before {
									content: "\e78f";
								}
								/deep/ .el-icon-arrow-down:before {
									content: "\e790";
								}
								//修改单个的选项的样式
								/deep/ .el-select-dropdown__item {
									background-color: transparent;
									color: #fff;
									font-family:'Roboto-Regular';
									text-align: center;
								}
								/deep/ .el-select-dropdown__item.hover{
									background-color: #1D2023;
								}
								/deep/ .el-select-dropdown__item.selected{
									background-color: #1D2023;
								}
							}
							.block_right{
								display: flex;
								align-items: center;
								.label{
									width: 20%;
									color: #727272;
									// margin-right: 20px;
								}
								.input_right{
									input{
										// width: 100%;
										width: 250px;
										// margin-left: 15px;
										height: 50px;
										color: #fff;
										font-family:'Roboto-Regular';
										border-radius: 10px;
										background-color: #0E0F11;
										border: none;
										padding-left: 15px;
										font-size: 14px;
									}
								}
							}
						}
					}
				}
				.btn_area{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 50px;
					.host_btn {
						width: 120px;
						height: 50px;
						line-height: 50px;
						background-color: #D3AA53;
						border-radius: 25px;
						text-align: center;
						color: #000;
						font-size: 18px;
						font-family:'Roboto-Regular';
						cursor: pointer;
					}
					.cancel_btn {
						width: 120px;
						height: 50px;
						line-height: 50px;
						border: 1px solid #777777;
						border-radius: 25px;
						text-align: center;
						color: #fff;
						font-size: 18px;
						margin-left: 20px;
						font-family:'Roboto-Regular';
						cursor: pointer;
					}
				}
			}
		}
		
	}
	
	.container {
		width: 90%;
		margin-left: 61px;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;
		/* 换行 */
		padding-bottom: 30px;
		// padding-left: 0;
		.content_right {
			width: calc(100% - 370px);

			.mark_cancel {
				position: absolute;
				right: 80px;
				top: 10px;

				img {
					width: 46px;
					height: 46px;
					cursor: pointer;
				}
			}

			.mark_Top_container {
				position: absolute;
				left: 387px;
				top: 66px;
				z-index: 99;

				.top_block {
					width: 831px;
					padding: 70px 0 50px 0;
					background: #0E0F11;
					border-radius: 32px;
					overflow: hidden;

					.mark_top_head {
						font-size: 24px;
						color: #E5A518;
						text-align: center;
					}

					.mark_content {
						.mark_content_head {
							margin-left: 102px;

							.mark_head_tit {
								color: #727272;
								font-size: 20px;
								margin: 49px 0 12px 0;
							}

							.mark_head_input {
								width: 627px;
								height: 59px;
								line-height: 59px;
								border: 2px solid #2D2D2D;
								border-radius: 19px;
								font-size: 20px;
								display: flex;
								align-items: center;

								.input_myr {
									color: #fff;
									padding: 0 24px 0 33px;
								}

								.input_border {
									width: 1px;
									height: 30px;
									background-color: #2D2D2D;
									margin-right: 26px;
								}

								.input_right {
									height: 59px;
									display: flex;
									align-items: center;

									input {
										height: 54px;
										color: #fff;
										font-size: 18px;
										background-color: #0E0F11;
										outline: none;
										border: none;
									}
								}
							}
						}

						.mark_content_options {
							.mark_head_tit {
								margin-left: ;
								color: #727272;
								font-size: 20px;
								margin: 50px 0 22px 102px;
							}

							.options_block {
								padding: 16px 39px 29px 39px;
								margin-left: 55px;
								margin-right: 104px;
								display: flex;
								justify-content: space-between;

								.options_left {
									display: flex;
									align-items: center;

									.options_img {
										width: 62px;
										height: 63px;
										text-align: center;
										margin-right: 35px;

										img {
											width: 51px;
											height: 63px;
										}
									}

									.options_img2 {
										width: 62px;
										height: 63px;
										margin-right: 35px;

										img {
											width: 62px;
											height: 63px;
										}
									}

									.options_text {
										color: #fff;
										font-size: 24px;
										margin-right: 35px;
									}

									.options_text2 {
										color: #D3AA53;
										font-size: 20px;
									}
								}

								.options_right {
									color: #fff;
									font-size: 20px;
									display: flex;
									align-items: center;
								}
							}

							.bac_color {
								background: #232323 0% 0% no-repeat padding-box;
							}
						}

						.mark_foot {
							display: flex;
							justify-content: space-between;
							margin: 100px 104px 0 104px;

							.foot_left {
								display: flex;
								align-items: center;

								.foot_text {
									color: #727272;
									font-size: 20px;
									margin-right: 27px;
								}

								.foot_text2 {
									color: #fff;
									font-size: 22px;
								}
							}

							.foot_right {
								width: 163px;
								height: 58px;
								color: #0E0F11;
								line-height: 58px;
								font-size: 20px;
								cursor: pointer;
								text-align: center;
								background: #E5A518;
								border-radius: 25px;
							}
						}
					}
				}
			}

			.content_right_nav{
			  margin-top: 50px;
			  margin-bottom: 20px;
			  p{
			    display: inline-block;
			    color: #898989;
				font-family:'Roboto-Regular';
			    padding: 0 30px;
			    font-size: 16px;
				margin: 0;
			  }
			  .adiv{
				display: inline-block;
				cursor: pointer;
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

			.content_right_form {
				width: calc(100%-60px);
				border-radius: 50px;
				margin-top: 30px;
				color: #ffffff;

				.right_form_top {
					width: 100%;
					// height: 226px;
					background: #0E0F11;
					border-radius: 38px;
					.level{
						border-bottom: 2px solid #2D2D2D;
						padding: 30px 0;
						position: relative;
						.label{
							color: #D3AA53;
							font-family:'Quicksand-Bold';
							font-size: 24px;
							margin-left: 70px;
							margin-right: 50px;
						}
						.level_content{
							position: absolute;
							top: 70px;
							left: 0;
							z-index: 999;
							// background-color: #0E0F11;
							background-color: #000000;
							border-radius: 55px;
							padding-bottom: 30px;
							.about_host {
								width: 100%;
								margin-top: 62px;
							
								.host_title {
									text-align: left;
									color: #FFFFFF;
									font-family: 'Quicksand-Bold';
									font-size: 22px;
									margin-left: 40px;
								}
							
								.host_form {
									width: 100%;
									// height: 568px;
									background: #000000;
									// background-color: #313538;
									border-radius: 55px;
									color: #FFFFFF;
							
									.form_row {
										display: flex;
										align-items: center;
										justify-content: space-between;
										border-bottom: 1px solid #515151;
										margin: 0px 48px 12px 38px;
							
										&:first-child {
											padding-top: 10px;
											// padding-bottom: 5px;
										}
							
										&:last-child {
											// border: none;
										}
							
										.level {
											text-align: center;
											letter-spacing: 0px;
											color: #FFFFFF;
											font-family: 'Quicksand-Bold';
											font-size: 20px;
											margin-left: 77px;
							
											p {
												margin: 0;
											}
							
											.num {
												text-align: center;
												letter-spacing: 0px;
												color: #DBA83F;
												font-family: 'Quicksand-Bold';
												font-size: 58px;
												border: none;
											}
										}
							
										.host_form_content {
											.host_form_content_row {
												width: 550px;
												display: flex;
												align-items: center;
												margin-left: 50px;
												// margin-right: 50px;
												img {
													width: 18px;
													height: 13px;
												}
												p {
													margin-left: 15px;
													text-align: left;
													color: #989898;
													font-family: 'Roboto-Regular';
													font-size: 20px;
												}
											}
										}
										.form_btn {
											width: 163px;
											height: 58px;
											background: #0E0F11 0% 0% no-repeat padding-box;
											border: 1px solid #D3AA53;
											border-radius: 25px;
											font-size: 20px;
											font-family: 'Roboto-Regular';
											color: #D3AA53;
							
										}
									}
							
								}
							}
							
							.notes {
								margin-left: 40px;
								margin-top: 52px;
							
								.notes_title {
									text-align: left;
									letter-spacing: 0px;
									color: #FFFFFF;
									font-size: 22px;
									margin-bottom: 0;
								}
							
								//notes_title
								.notes_msg {
									color: #989898;
									font-size: 20px;
									margin: 0;
							
									.tips {
										margin-top: 0;
									}
								}
							}
							
						}
					}
					.data_area {
						display: flex;
						margin-left: 40px;
						div {
							margin-left: 70px;
							margin-right: 50px;
						}
						div p:first-child {
							text-align: center;
							letter-spacing: 0px;
							color: #727272;
							font-family:'Roboto-Bold';
							font-size: 18px;
						}
						div p:nth-child(2) {
							text-align: center;
							letter-spacing: 0px;
							color: #FFFFFF;
							font-family:'Roboto-Regular';
							font-size: 23px;
						}
						// .last_div p:nth-child(2) {
						// 	text-align: center;
						// 	letter-spacing: 0px;
						// 	color: #84F71E;
						// 	font-family:'Roboto-Regular';
						// 	opacity: 1;
						// }
					}
				}

				.content_right_center {
					width: 100%;
					margin-left: 30px;
					.center_title {
						display: flex;
						margin-top: 48px;

						p {
							text-align: left;
							letter-spacing: 0px;
							color: #878787;
							font-family:'Quicksand-Bold';
							opacity: 1;
							font-size: 22px;
							margin-right: 88px;
						}

						.msg {
							text-align: left;
							letter-spacing: 0px;
							color: #878787;
							font-family:'Quicksand-Bold';
							opacity: 1;
							font-size: 22px;
							margin-right: 88px;
							cursor: pointer;
						}

						.title_active {
							text-align: left;
							letter-spacing: 0px;
							color: #FFFFFF;
							font-family:'Quicksand-Bold';
							opacity: 1;
							font-size: 22px;
							margin-right: 88px;
							cursor: pointer;
						}
					}

					.center_choice {
						width: 100%;
						// background-color: #FFF000;
						display: flex;
						align-items: flex-end;
						justify-content: space-between;
						margin-top: 50px;
						.choice_left {
							display: flex;
							div {
								margin-right: 20px;
								.options {
									position: relative;
									.dropdown {
										width: 10px;
										height: 8px;
										position: absolute;
										right: 30px;
										top: 45%;
									}
									select {
										/*取消默认箭头开始*/
										appearance: none;
										-moz-appearance: none;
										-webkit-appearance: none;
										/*取消默认箭头结束*/
										width: 225px;
										height: 59px;
										background-color: #0E0F11;
										color: #ffffff;
										border-radius: 20px;
										opacity: 1;
										border: none;
										font-family:'Roboto-Regular';
										font-size: 18px;
										padding-left: 20px;
										padding-right: 20px;
									}

									/deep/ .el-select .el-input .el-input__inner {
										border: 0px;
										width: 230px;
										height: 59px;
										color: #fff;
										font-family:'Roboto-Regular';
										border-radius: 20px;
										background-color: #0E0F11;
										border: 1px solid #0E0F11;
									}

									/deep/ .el-select-dropdown {
										background-color: #0E0F11;
										border: 1px solid rgba(255,255,255,0.2);
									}

									/deep/ .el-icon-arrow-up:before {
										content: "\e78f";
									}

									/deep/ .el-icon-arrow-down:before {
										content: "\e790";
									}

									//修改单个的选项的样式
									/deep/ .el-select-dropdown__item {
										background-color: transparent;
										color: #fff;
										font-family:'Roboto-Regular';
										text-align: center;
									}
									/deep/ .el-select-dropdown__item.hover{
										background-color: #1D2023;
									}
									/deep/ .el-select-dropdown__item.selected{
										background-color: #1D2023;
									}
								}
							}

							.status {
								.status_text {
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									opacity: 1;
									font-family:'Roboto-Regular';
									font-size: 18px;
								}
							}

							.sort_by {
								.sort_by_text {
									text-align: left;
									letter-spacing: 0px;
									color: #727272;
									font-family:'Roboto-Regular';
									font-size: 18px;
								}
							}
						}

						.search {
							position: relative;
							// top: 50px;
							right: 60px;
							.host_btn{
								// width: 100px;
								height: 40px;
								padding: 10px 30px;
								border-radius: 20px;
								line-height: 40px;
								text-align: center;
								border: 1px solid #D3AA53;
								color: #D3AA53;
								font-size: 18px;
								cursor: pointer;
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
					.center_table {
						width: 100%;
						margin-top: 52px;
						position: relative;
						right: 30px;
						.table_header {
							display: flex;
							height: 75px;
							background: #000000;
							border-radius: 31px 31px 0px 0px;
							opacity: 1;
							align-items: center;
							.header_1{
								width: 10%;
								font-family:'Roboto-Bold';
								// font-family:'Roboto-Regular';
								font-size: 18px;
								text-align: center;
								// background-color: #FF0000;
							}
							.header_2{
								width: 15%;
								font-family:'Roboto-Bold';
								// font-family:'Roboto-Regular';
								font-size: 18px;
								text-align: center;
							}
						}

						.table_body {
							.body_row {
								display: flex;
								align-items: center;
								text-align: center;
								.row_col{
									width: 10%;
									font-size: 18px;
									height: 75px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.row_col_1{
									width: 15%;
									font-size: 18px;
									height: 75px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.text_color1{
									color: #FF971A;
									cursor: pointer;
								}
								.text_color2{
									color: #23B709;
									cursor: pointer;
								}
								.text_color3{
									color:#00AAFF;
									cursor: pointer;
								}
								.text_color4{
									color:#FF3636;
									cursor: pointer;
								}
							}
							.body_row:nth-child(2n) {
								background: #313538 0% 0% no-repeat padding-box;
								opacity: 1;
							}

							.body_row:last-child {
								border-radius: 0px 0px 26px 26px;
							}
						}

						//table_body
					}

					.pagnationBox {
						display: flex;
						justify-content: flex-end;
						margin-top: 50px;
					}
				}
			}
		}
	}
</style>
