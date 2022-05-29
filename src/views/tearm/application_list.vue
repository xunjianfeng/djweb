<template>
	<div class="index">
		<div class="container">
			<LeftView :index="2"></LeftView>
			<div class="content_right">
				<!-- content_right_top -->
				<div class="content_right_form">
					<div  class="team_nav_container">
						<div class="nav_left">
							<p :class="tarm_index == 1 ?'av':''" @click="up_index(1)">Member</p>
							<p :class="tarm_index == 2 ?'av':''" @click="up_index(2)" v-if="userId == leaderId">Application List</p>
						</div>
						<div class="nav_right" v-if="userId == leaderId">
							<div class="creat_btn" v-if="manges == false" @click="manges = true">Management</div>
						</div>
						<div class="other_foot_button" v-else>
							<div class="quit_bton" @click="removeTeam">Quit Team</div>
						</div>
					</div>
					<!-- Member有两种， 1. Team member - Member  2.Team - My team - Team member - Member - Management  -->
					<!-- Team member - Member -->
					<div class="member_list" v-if="tarm_index == 1 && manges == false ">
						<!-- 队长 -->
						<div class="member_block" v-for="(item,index) in member_list" :key="index" v-if="item.userId == item.leaderId">
							<div class="member_block_padding">
								<div class="member_left_con">
									<div class="member_left" @click="open_spen(item.userId,item)">
										<el-image :src="HOST + item.avatar" class="avatar_img">
											<div slot="error" class="image-slot"> 
												<img src="../../assets/images/default.png" class="default_img"/>
											</div>
										</el-image>
										<!-- <img :src="HOST  + item.avatar" alt="" v-if="item.avatar"> -->
										<!-- <img src="../../assets/images/default.png" v-else /> -->
									</div>
									<div class="member_right">
										<div class="member_right_head">
											<div class="member_tit">{{item.fullName}}</div>
											<div class="member_subtit">{{item.role}}</div>
										</div>
										<div class="member_btn_list">
											<div class="btn_txt" v-if="item.userId == item.leaderId">Leader</div>
											<div class="btn_txt" v-else>Member</div>
											<div class="news" >
												<img src="../../assets/images/chat.png" />
												<span>Chat</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- 信息悬浮窗 -->
							<div class="suspension_container" v-if="item.spen_status">
								<div class="spension_content">
									<div class="spension_head">
										<div class="spension_avater">
											<el-image :src="HOST + user_info.avatar" class="avater_img">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default.png" class="avater_img"/>
												</div>
											</el-image>
											<!-- <img class="avater_img" :src="HOST + user_info.avatar" alt="" v-if="user_info.avatar"> -->
											<!-- <img class="avater_img" src="../../assets/images/default.png" v-else /> -->
										</div>
										<div class="spension_info">
											<div class="spen_name">{{user_info.fullName}}</div>
											<div class="spen_type" v-if="user_info.userId == user_info.leaderId">leader</div>
											<div class="spen_type" v-else>Member</div>
										</div>
									</div>
									<div class="spension_in">
										<div class="spen_table">
											<div class="spen_td_left">Joined</div>
											<div class="spen_td_right">{{initDete(user_info.joinedTime)}}</div>
										</div>
										<div class="spen_table">
											<div class="spen_td_left">Team Tournament</div>
											<div class="spen_td_right">{{user_info.fullName}}</div>
										</div>
										<div class="spen_table">
											<div class="spen_td_left">In Game Name</div>
											<div class="spen_td_right">{{user_info.ign}}</div>
										</div>
										<div class="spen_table">
											<div class="spen_td_left">In Game ID</div>
											<div class="spen_td_right">{{user_info.igid}}</div>
										</div>
										<div class="spen_table">
											<div class="spen_td_left">Game Character</div>
											<div class="spen_td_right">{{user_info.role}}</div>
										</div>
									</div>
									<div class="spension_foot">
										<div class="spension_icon">
											<img src="../../assets/images/chat.png" alt="">
										</div>
										<!-- <div v-if="userId == leaderId" class="spension_move"  @click="remove(user_info.userId)">Move out of team</div> -->
									</div>
								</div>
							</div>
														
						</div>
						<!-- 队员 -->
						<div class="small_member_list" >
							<div class="small_member_block" v-for="(item2,index2) in member_list" :key="index2" v-if="item2.userId != item2.leaderId">
								<div class="member_block_padding">
									<div class="member_left_con">
										<div class="member_left"  @click="open_spen(item2.userId,item2)">
											<el-image :src="HOST + item2.avatar" class="avater_img">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default.png" class="default_img"/>
												</div>
											</el-image>
											<!-- <img :src="HOST  + item2.avatar" alt="" v-if="item2.avatar"> -->
											<!-- <img src="../../assets/images/default.png" v-else /> -->
										</div>
										<div class="small_member_right">
											<div class="member_right_head">
												<div class="member_tit">{{item2.fullName}}</div>
												<div class="member_subtit">{{item2.role}} </div>
											</div>
											<div class="member_btn_list">
												<div class="btn_txt" v-if="item2.userId == item2.leaderId">Leader</div>
												<div class="btn_txt" v-else>Member</div>
												<div class="news">
													<img src="../../assets/images/chat.png" />
													<span>Chat</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- 信息悬浮窗 -->
								<div class="suspension_container" v-if="item2.spen_status">
									<div class="spension_content">
										<div class="spension_head">
											<div class="spension_avater">
												<el-image :src="HOST + user_info.avatar" class="avater_img">
													<div slot="error" class="image-slot"> 
														<img src="../../assets/images/default.png" class="avater_img"/>
													</div>
												</el-image>
												<!-- <img class="avater_img" :src="HOST + user_info.avatar" alt="" v-if="user_info.avatar"> -->
												<!-- <img class="avater_img" src="../../assets/images/default.png" v-else /> -->
											</div>
											<div class="spension_info">
												<div class="spen_name">{{user_info.fullName}}</div>
												<div class="spen_type" v-if="user_info.userId == user_info.leaderId">leader</div>
												<div class="spen_type" v-else>Member</div>
											</div>
										</div>
										<div class="spension_in">
											<div class="spen_table">
												<div class="spen_td_left">Joined</div>
												<div class="spen_td_right">{{initDete(user_info.joinedTime)}}</div>
											</div>
											<div class="spen_table">
												<div class="spen_td_left">Team Tournament</div>
												<div class="spen_td_right">{{user_info.fullName}}</div>
											</div>
											<div class="spen_table">
												<div class="spen_td_left">In Game Name</div>
												<div class="spen_td_right">{{user_info.ign}}</div>
											</div>
											<div class="spen_table">
												<div class="spen_td_left">In Game ID</div>
												<div class="spen_td_right">{{user_info.igid}}</div>
											</div>
											<div class="spen_table">
												<div class="spen_td_left">Game Character</div>
												<div class="spen_td_right">{{user_info.role}}</div>
											</div>
										</div>
										<div class="spension_foot">
											<div class="spension_icon"  @click="open_spen(item2.userId)">
												<img src="../../assets/images/chat.png" alt="">
											</div>
											<div v-if="userId == leaderId" class="spension_move"  @click="remove(user_info.userId)">Move out of team</div>
										</div>
									</div>
								</div>
							
							</div>
							<!-- invite  Block -->
							<div class="small_member_block" v-if="userId == leaderId">
								<div class="member_block_padding">
									<div class="member_left_con">
										<div class="member_left_invite">
											<img src="../../assets/images/invite.png" alt="">
										</div>
										<div class="small_member_right">
											<div class="member_right_head">
												<div class="member_tit">-</div>
												<div class="member_subtit">-</div>
											</div>
											<div class="member_btn_list2">
												<div class="invite_bton" @click="jump_create">
													Invite
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--Team member - Member - Management  删除成员 -->
					<div class="manage_list" v-if="manges == true">
						<!-- 搜索框 -->
						<div class="search" >
							<div class="search_right">
								<div class="creat_btn" @click="all_del">Move out of team</div>
								<div class="cancel_btn" @click="manges = false">Cancel</div>
							</div>
						</div>
						<div class="manage_title">Selected ({{select_num}})</div>
						<!-- 没有数据 -->
						<div class="no_data_area"  v-if="member_list == ''" >
							<div class="no_data">
								<img src="../../assets/images/no_tournament.svg" />
								<div class="no_data_text">No Application</div>
							</div>
						</div>
						<div class="small_manage_list">
							<div class="small_manage_block" v-for="(dtem,index3) in member_list" :key='index3' v-if="dtem.userId != dtem.leaderId">
								<div class="manage_block_padding">
									<div class="manage_left_con">
										<div class="manage_left">
											<el-image :src="HOST + dtem.avatar" class="avater_img">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default.png" class="avater_img"/>
												</div>
											</el-image>
											<!-- <img :src="HOST  + dtem.avatar" alt="" v-if="dtem.avatar"> -->
										</div>
										<div class="small_manage_right">
											<div class="manage_right_head">
												<div class="manage_tit">{{dtem.fullName}}</div>
												<div class="manage_subtit">{{dtem.role}}</div>
											</div>
											<div class="manage_btn_list">
												<div class="btn_txt">Member</div>
												<div class="btn_right">
													<div class="select_none" v-if="dtem.del_status == false">
														<span>Select</span>
														<div class="select_square" @click.stop="manage_status(dtem.userId)"></div>
													</div>
													<div class="select_true" v-else>
														<span>Select</span>
														<div class="select_square" @click.stop="manage_status(dtem.userId)">
															<img src="../../assets/images/check.png" />
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
					<!-- 申请加入战队人员 -->
					<div class="team_list" v-if="tarm_index == 2">
						<!-- 没有数据 -->
						<div class="no_data_area"  v-if="applicat_list == ''" >
							<div class="no_data">
								<img src="../../assets/images/no_tournament.svg" />
								<div class="no_data_text">No Application</div>
							</div>
						</div>
						<div class="cation_block" v-for="(atem,adex) in applicat_list" :key='adex'>
							<div class="cation_block_padding">
								<div class="cation_left_con" @click="jump_info(atem)">
									<div class="cation_left">
										<el-image :src="HOST + atem.avatar" class="avater_img">
											<div slot="error" class="image-slot"> 
												<img src="../../assets/images/default.png" class="avater_img"/>
											</div>
										</el-image>
										<!-- <img :src="HOST + atem.avatar" alt="" v-if="atem.avatar"> -->
									</div>
									<div class="cation_right">
										<div class="cation_tit">{{atem.fullName}} <span>{{atem.role}} </span></div>
										<div class="cation_version">{{atem.introduce}}</div>
									</div>
								</div>
								<div class="cation_btn_list">
									<div class="true_false">
										<button class="true_btn" @click.stop="teamDecision(atem.userId,2,atem.type)">
											<img src="../../assets/images/right_green.png" />
											Accept
										</button>
										<button  class="false_btn" @click.stop="teamDecision(atem.userId,3,atem.type)">
											<img src="../../assets/images/false_red.png" />
											Reject
										</button>
									</div>
									<div class="news">
										<img src="../../assets/images/chat.png" />
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
	import {teamUsers,teamApplications,teamDecision,teamOut} from '@/api/team';
	import LeftView from '@/components/team/left.vue'
	export default{
		name:"application_list",
		components:{
			LeftView
		},
		data(){
			return{
				listQuery: {
					teamId:sessionStorage.getItem("teamId")
				},
				member_list:'',//战队成员列表
				tarm_index:1,
				manges:false,
				list:[
					{
						id:1,
						avater:require("../../assets/images/friend_01.png"),
						name:"Peter Tang",
						sub_name:"Tank",
						type:'Member',
						status:false,
					},
				],  //战队删除
				applicat_list:'', //申请加入人员
				user_info:'', //信息弹窗数据
				select_num:0, 
				del_id:[], //全选删除数组
				userId:sessionStorage.getItem("userId"),
				leaderId:sessionStorage.getItem("leaderId"),//队长id
			}
		},
		mounted() {
			this.teamUsers();
			// console.log(this.userId)
			// console.log(this.leaderId)
		},
		methods:{
			// 跳转 战队申请人员信息
			jump_info(atem){
				let {userId,teamId,type,avatar } = atem;
				this.$router.push({ path: '/tearm/application_userinfo',query:{
					userId,
					teamId,
					type,
					avatar
				}})
			},
			// 获取战队成员
			teamUsers() {
				let that = this;
				teamUsers(that.listQuery).then(res => {
					var usrs = res.data.usrs
					for (let i = 0; i < usrs.length; i++) {
						usrs[i].spen_status = false
						usrs[i].del_status = false
					}
					that.member_list = usrs
				})
			},
			// 战队人员信息弹窗打开
			open_spen(user_id,user_info){
				let that = this;
				that.user_info = user_info
				// console.log(user_id)
				// console.log(that.user_info)
				// console.log("信息弹窗")
				for (let i = 0; i < that.member_list.length; i++) {
					if( user_id ==  that.member_list[i].userId){
						// console.log("点的就是你"+that.member_list[i].userId)
						that.member_list[i].spen_status = ! that.member_list[i].spen_status
						// console.log(that.member_list[i].spen_status)
					}else{
						// console.log("没有点你")
						that.member_list[i].spen_status = false
						// console.log(that.member_list[i].spen_status)
					}
					
				}
			},
			// tab 切换
			up_index(index){
				this.tarm_index = index
				if(index == 1){
					this.teamUsers();
				}else{
					this.get_application();
				}
			},
			// 申请加入战队的人员列表
			get_application() {
				let that = this;
				let params = {
					teamId:sessionStorage.getItem("teamId"),
				}
				teamApplications(params).then(res => {
					that.applicat_list = res.data.list
				})
			},
			// 同意/拒绝 加入队伍
			teamDecision(userId,agree,type) {
				let that = this;
				let params = {
					teamId:sessionStorage.getItem("teamId"),
					type,  	//invite 邀请 apply 申请
					agree,  	// 2 同意 3拒绝
					userId
				}
				if(agree == 2){
					this.$confirm('Agree to join team?', 'Confirmation', {//是否同意加入战队
					  confirmButtonText: 'Confirm',
					  cancelButtonText: 'Cancel',
					  type: 'warning',
					  center: true
					}).then(() => {
						teamDecision(params).then(res => {
							this.$message({
								type: 'success',
								message: res.message
							});
							that.get_application();
						})
					})
				}else{
					this.$confirm('Reject to join team?', 'Confirmation', {//是否拒绝加入战队
					  confirmButtonText: 'Confirm',
					  cancelButtonText: 'Cancel',
					  type: 'warning',
					  center: true
					}).then(() => {
						teamDecision(params).then(res => {
							this.$message({
								type: 'success',
								message: res.message
							});
							that.get_application();
						})
					})
				}
			},
			// Select  勾选
			manage_status(userId){
				let that = this;
				for (let i = 0; i < that.member_list.length; i++) {
					if(that.member_list[i].userId == userId){
						that.member_list[i].del_status = ! that.member_list[i].del_status
						if(that.member_list[i].del_status == true){
							that.select_num ++
							that.del_id.push(that.member_list[i].userId)
						}else{
							that.select_num --
							that.del_id.splice(i,1)
						}
					}
				}
			},
			// 多选删除
			all_del(){
				let that = this;
				// that.del_id == ''
				if(that.del_id.length == 0){		
					this.$message({
					  message: 'Please select a member to move out of team.',
					  type: 'warning'
					});
					return false
				}else{
					let params = {
						teamId:sessionStorage.getItem("teamId"),
						userIds:that.del_id.join(',')
					}
					this.$confirm('Confirm to remove team?', 'Confirmation', {//确定把队员移出战队？
					  confirmButtonText: 'Confirm',
					  cancelButtonText: 'Cancel',
					  type: 'warning',
					  center: true
					}).then(() => {
						teamOut(params).then(res => {
							this.$message({
								type: 'success',
								message: res.message
							});
							that.select_num = 0;
							that.teamUsers();
						})
					})
				}
			},
			// 移除战队 单个
			remove(userIds){
				let that = this;
				let params = {
					teamId:sessionStorage.getItem("teamId"),
					userIds
				}
				this.$confirm('Confirm to remove team?', 'Confirmation', {//确定把该队员移出战队
				  confirmButtonText: 'Confirm',
				  cancelButtonText: 'Cancel',
				  type: 'warning',
				  center: true
				}).then(() => {
					teamOut(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						for (let i = 0; i < that.member_list.length; i++) {
							that.member_list[i].spen_status = false
							that.member_list[i].del_status = false
						}
						that.teamUsers();
					})
				})
			},
			//队员退出战队
			removeTeam(){
				let that = this;
				let params = {
					teamId:sessionStorage.getItem("teamId"),
					userIds:sessionStorage.getItem("userId")
				}
				// console.log(params)
				this.$confirm(' Confirm to leave team?', 'Confirmation', {//确定要退出该战队？
				  confirmButtonText: 'Confirm',
				  cancelButtonText: 'Cancel',
				  type: 'warning',
				  center: true
				}).then(() => {
					teamOut(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						that.$router.push({path: '/tearm/my_join_team'})
						// that.teamUsers();
					})
				})
			},
			jump_create(){ 
				this.$router.push({ path: '/tearm/create_team',query:{teamId:sessionStorage.getItem("teamId")}})
			}
		}
	}
</script>

<style lang="less" scoped>
.container{
	width: calc(100% - 150px);
	margin-left: 61px;
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	.content_right{
		width: calc(100% - 370px);
		.content_right_form{
			margin-top: 80px;
			.team_nav_container{
				display: flex;
				margin-bottom: 20px;
				justify-content: space-between;
				.nav_left{
					padding-left: 25px;
					p{
						display: inline-block;
						color: #727272;
						padding: 0 40px 0 0;
						font-size: 22px;
						cursor: pointer;
						border: none;
						font-family:'Roboto-Regular';
						
					}
					p{
						&:nth-child(2){
							border-left: 1px solid #7F7F7F;
							padding-left: 40px;
						}
					}
					.av{
					  color: #D3AA53;
					  font-family:'Roboto-Bold';
					}
				}
				.nav_right{
					.creat_btn{
						width: 174px;
						height: 59px;
						color: #D3AA53;
						font-size: 20px;
						cursor: pointer;
						font-family:'Roboto-Regular';
						line-height: 59px;
						text-align: center;
						background: #0E0F11;
						border-radius: 20px;
					}
				}
				.other_foot_button{
					display: flex;
					justify-content: flex-end;
					.quit_bton{
						width: 208px;
						height: 59px;
						line-height: 59px;
						text-align: center;
						color: #FF1212;
						font-family:'Roboto-Regular';
						background: #0E0F11;
						border-radius: 20px;
						font-size: 20px;
						cursor: pointer;
					}
				}
			}
			.member_list{
				.member_block{
					width: 100%;
					background-color: #0E0F11;
					border-radius: 28px;
					margin-bottom: 20px;
					position: relative;
					.member_block_padding{
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 18px 31px 24px 24px;
						// position: relative;
						.member_left_con{
							width: 100%;
							display: flex;
							align-items: center;
							.member_left{
								width: 158px;
								height: 158px;
								border-radius:50px;
								overflow: hidden;
								margin-right: 35px;
								.avatar_img{
									width: 158px;
									height: 158px;
									object-fit: cover;
									.default_img{
										width: 158px;
										height: 158px;
									}
								}
							}
							.member_right{
								width: 83%;
								.member_right_head{
									padding-bottom:15px;
									margin-top: 20px;
									border-bottom:2px solid #1D2023;
									.member_tit{
										color: #FFFFFF;
										font-size: 22px;
										font-family:'Roboto-Medium';
										margin: 0px 0px 11px 0px;
									}
									.member_subtit{
										color: #727272;
										font-size: 20px;
										font-family:'Roboto-Regular';
									}
								}
								.member_btn_list{
									display: flex;
									align-items: center;
									margin-top: 10px;
									justify-content: space-between;
									.btn_txt{
										font-size: 20px;
										color: #D3AA53;
										font-family:'Roboto-Regular';
									}
									.news{
										width: 163px;
										height: 58px;
										display: flex;
										justify-content: center;
										align-items: center;
										border-radius: 21px;
										background: #1D2023;
										img{
											width: 30px;
											height: 30px;
										}
										span{
											color: #D3AA53;
											font-family:'Roboto-Regular';
											font-size: 20px;
											margin-left: 7px;
										}
									}
								}
							}
						}
					}
					// 信息悬浮窗
					.suspension_container{
						position: absolute;
						left: 300px;
						// left: 100px;
						top: 25px;
						width: 469px;
						z-index: 9;
						background: #0E0F11;
						.spension_content{
							padding: 17px 66px 22px 44px;
							.spension_head{
								.spension_avater{
									width: 84px;
									height: 84px;
									margin-bottom: 34px;
									.avater_img{
										width: 84px;
										height: 84px;
										border-radius: 20px;
										object-fit: cover;
									}
								}
								.spension_info{
									display: flex;
									align-items: center;
									justify-content: space-between;
									padding: 0 15px;
									margin-bottom: 26px;
									.spen_name{
										color: #FFFFFF;
										font-size: 22px;
									}
									.spen_type{
										color: #D3AA53;
										font-size: 20px;
									}
								}
							}
							.spension_in{
								padding: 28px 0;
								margin: 0 0 25px 0;
								border-top: 1px solid #545454;
								border-bottom: 1px solid #545454;
								.spen_table{
									display: flex;
									color: #8C8C8C;
									font-size: 20px;
									margin-bottom: 28px;
									padding: 0 15px;
									justify-content: space-between;
									.spen_td_left{}
									.spen_td_right{}
								}
								.spen_table:last-child{
									margin-bottom: 0;
								}
							}
							.spension_foot{
								display: flex;
								align-items: center;
								justify-content: space-between;
								.spension_icon{
									width: 58px;
									height: 58px;
									color: #FF1212;
									font-size: 20px;
									display: flex;
									align-items: center;
									cursor: pointer;
									justify-content: center;
									background: #1D2023;
									border-radius: 21px;
									img{
										width: 34px;
										height: 34px;
									}
								}
								.spension_move{
									width: 194px;
									height: 58px;
									color: #FF1212;
									font-size: 20px;
									text-align: center;
									cursor: pointer;
									line-height: 58px;
									background: #1D2023;
									border-radius: 21px;
								}
							}
						}
					}
										
				}
				.small_member_list{
					display: flex;
					flex-wrap: wrap;
					.small_member_block{
						width: 47.5%;
						background-color: #0E0F11;
						border-radius: 28px;
						margin-bottom: 31px;
						margin-right:59px;
						position: relative;
						.member_block_padding{
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 18px 31px 24px 24px;
							.member_left_con{
								width: 100%;
								display: flex;
								align-items: center;
								.member_left{
									width: 158px;
									height: 158px;
									border-radius:50px;
									overflow: hidden;
									margin-right: 35px;
									.avatar_img{
										width: 158px;
										height: 158px;
										object-fit: cover;
									}
									.default_img{
										width: 160px;
										height: 160px;
									}
								}
								.member_left_invite{
									width: 158px;
									height: 158px;
									border-radius:50px;
									overflow: hidden;
									margin-right: 35px;
									display: flex;
									align-items: center;
									justify-content: center;
									img{
										width: 71px;
										height: 71px;
									}
								}
								.small_member_right{
									width: 60%;
									.member_right_head{
										padding-bottom:15px;
										margin-top: 20px;
										border-bottom:2px solid #1D2023;
										.member_tit{
											color: #FFFFFF;
											font-size: 22px;
											font-family:'Roboto-Medium';
											margin: 0px 0px 11px 0px;
										}
										.member_subtit{
											color: #727272;
											font-size: 20px;
										}
									}
									.member_btn_list{
										display: flex;
										align-items: center;
										margin-top: 10px;
										justify-content: space-between;
										.btn_txt{
											font-size: 20px;
											color: #D3AA53;
											font-family:'Roboto-Regular';
										}
										.news{
											width: 163px;
											height: 58px;
											display: flex;
											justify-content: center;
											align-items: center;
											border-radius: 21px;
											background: #1D2023;
											cursor: pointer;
											img{
												width: 30px;
												height: 30px;
											}
											span{
												color: #D3AA53;
												font-family:'Roboto-Regular';
												font-size: 20px;
												margin-left: 7px;
											}
										}
									}
									.member_btn_list2{
										display: flex;
										margin-top: 10px;
										justify-content: flex-end;
										.invite_bton{
											width: 163px;
											height: 58px;
											color: #0E0F11;
											font-size: 20px;
											cursor: pointer;
											line-height: 58px;
											text-align: center;
											background: #D3AA53;
											font-family:'Roboto-Regular';
											border-radius: 25px;
										}
									}
								}
							}
						}
						// 信息悬浮窗
						.suspension_container{
							position: absolute;
							right: -100px;
							top: 5px;
							width: 469px;
							z-index: 9;
							background: #0E0F11;
							.spension_content{
								padding: 17px 66px 22px 44px;
								.spension_head{
									.spension_avater{
										width: 84px;
										height: 84px;
										margin-bottom: 34px;
										.avater_img{
											width: 84px;
											height: 84px;
											border-radius: 20px;
											object-fit: cover;
										}
									}
									.spension_info{
										display: flex;
										align-items: center;
										justify-content: space-between;
										padding: 0 15px;
										margin-bottom: 26px;
										.spen_name{
											color: #FFFFFF;
											font-size: 22px;
										}
										.spen_type{
											color: #D3AA53;
											font-size: 20px;
										}
									}
								}
								.spension_in{
									padding: 28px 0;
									margin: 0 0 25px 0;
									border-top: 1px solid #545454;
									border-bottom: 1px solid #545454;
									.spen_table{
										display: flex;
										color: #8C8C8C;
										font-size: 20px;
										margin-bottom: 28px;
										padding: 0 15px;
										justify-content: space-between;
										.spen_td_left{}
										.spen_td_right{}
									}
									.spen_table:last-child{
										margin-bottom: 0;
									}
								}
								.spension_foot{
									display: flex;
									align-items: center;
									justify-content: space-between;
									.spension_icon{
										width: 58px;
										height: 58px;
										color: #FF1212;
										font-size: 20px;
										display: flex;
										align-items: center;
										cursor: pointer;
										justify-content: center;
										background: #1D2023;
										border-radius: 21px;
										img{
											width: 34px;
											height: 34px;
										}
									}
									.spension_move{
										width: 194px;
										height: 58px;
										color: #FF1212;
										font-size: 20px;
										text-align: center;
										cursor: pointer;
										line-height: 58px;
										background: #1D2023;
										border-radius: 21px;
									}
								}
							}
						}
					}
					.small_member_block:nth-child(2n){
						margin-right: 0;
					}
				}
			}
			// Member - Management
			.manage_list{
				.search{
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.search_right{
						display: flex;
						align-items: center;
						.creat_btn{
							width: 236px;
							height: 59px;
							color: #FF1212;
							font-family:'Roboto-Regular';
							cursor: pointer;
							font-size: 20px;
							line-height: 59px;
							text-align: center;
							background: #0E0F11;
							border-radius: 24px;
							margin-right: 34px;
						}
						.cancel_btn{
							width: 163px;
							height: 58px;
							cursor: pointer;
							border-radius: 25px;
							color: #FFFFFF;
							font-family:'Roboto-Regular';
							font-size: 20px;
							line-height: 59px;
							text-align: center;
							border: 1px solid #777777;
						}
					}
					
				}
				.manage_title{
					color: #FFFFFF;
					font-family:'Roboto-Regular';
					font-size: 20px;
					margin: 27px 0 18px 0;
				}
				.no_data_area{
					width: 100%;
					height:500px;
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
				.small_manage_list{
					display: flex;
					flex-wrap: wrap;
					.small_manage_block{
						width: 47.5%;
						background-color: #0E0F11;
						border-radius: 28px;
						margin-bottom: 31px;
						margin-right:59px;
						position: relative;
						.manage_block_padding{
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 18px 31px 24px 24px;
							.manage_left_con{
								width: 100%;
								display: flex;
								align-items: center;
								.manage_left{
									width: 158px;
									height: 158px;
									border-radius:50px;
									overflow: hidden;
									margin-right: 35px;
									.avater_img{
										width: 158px;
										height: 158px;
										object-fit: cover;
									}
								}
								.small_manage_right{
									width: 60%;
									.manage_right_head{
										padding-bottom:15px;
										margin-top: 20px;
										border-bottom:2px solid #1D2023;
										.manage_tit{
											color: #FFFFFF;
											font-size: 22px;
											font-family:'Roboto-Medium';
											margin: 0px 0px 11px 0px;
										}
										.manage_subtit{
											color: #727272;
											font-size: 20px;
											font-family:'Roboto-Regular';
										}
									}
									.manage_btn_list{
										display: flex;
										align-items: center;
										margin-top: 10px;
										justify-content: space-between;
										.btn_txt{
											font-size: 20px;
											color: #D3AA53;
											font-family:'Roboto-Regular';
										}
										.btn_right{
											display: flex;
											align-items: center;
											justify-content: space-between;
											.select_none{
												display: flex;
												align-items: center;
												span{
													color: #D3D3D3;
													font-family:'Roboto-Regular';
													font-size: 20px;
													margin-right: 18px;
												}
												.select_square{
													width: 33px;
													height: 33px;
													border: 1px solid #777777;
												}
											}
											.select_true{
												display: flex;
												align-items: center;
												span{
													color: #D3D3D3;
													font-size: 20px;
													font-family:'Roboto-Regular';
													margin-right: 18px;
												}
												.select_square{
													width: 33px;
													height: 33px;
													display: flex;
													align-items: center;
													justify-content: center;
													border: 1px solid #777777;
													img{
														width: 26px;
													}
												}
											}
										}
										.news{
											width: 163px;
											height: 58px;
											display: flex;
											justify-content: center;
											align-items: center;
											border-radius: 21px;
											background: #1D2023;
											cursor: pointer;
											img{
												width: 30px;
												height: 30px;
											}
											span{
												color: #D3AA53;
												font-size: 20px;
												margin-left: 7px;
											}
										}
									}
									.member_btn_list2{
										display: flex;
										margin-top: 10px;
										justify-content: flex-end;
										.invite_bton{
											width: 163px;
											height: 58px;
											color: #0E0F11;
											font-size: 20px;
											cursor: pointer;
											line-height: 58px;
											text-align: center;
											background: #D3AA53;
											border-radius: 25px;
										}
									}
								}
							}
						}
					}
					.small_manage_block:nth-child(2n){
						margin-right: 0;
					}
				}
			}
			.team_list{
				.no_data_area{
					width: 100%;
					height:500px;
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
				.cation_block{
					width: 100%;
					background-color: #0E0F11;
					border-radius: 28px;
					margin-bottom: 20px;
					.cation_block_padding{
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 20px 46px 20px 26px;
						.cation_left_con{
							width: 61%;
							display: flex;
							align-items: center;
							.cation_left{
								width: 101px;
								height: 101px;
								border-radius:30px;
								overflow: hidden;
								margin-right: 67px;
								.avater_img{
									width: 101px;
									height: 101px;
									object-fit: cover;
								}
							}
							.cation_right{
								width: 70%;
								.cation_tit{
									color: #FFFFFF;
									font-size: 22px;
									font-family:'Roboto-Medium';
									margin: 0px 0px 11px 0px;
									span{
										color: #727272;
										font-family:'Roboto-Regular';
										font-size: 20px;
										margin-left: 18px;
									}
								}
								.cation_version{
									color: #727272;
									font-family:'Roboto-Regular';
									font-size: 19px;
									line-height: 25px;
									overflow:hidden;
									text-overflow:ellipsis;
									display:-webkit-box;
									-webkit-box-orient:vertical;
									-webkit-line-clamp:2; 
								}
								
							}
						}
						
						.cation_btn_list{
							display: flex;
							align-items: center;
							justify-content: space-between;
							.true_false{
								display: flex;
								.true_btn{
									width: 155px;
									height: 58px;
									border-radius: 25px;
									background: #1D2023;
									border: 1px solid #1D2023;
									color: #59AC00;
									font-family:'Roboto-Regular';
									font-size: 18px;
									margin-right: 25px;
									display: flex;
									align-items: center;
									justify-content: center;
									img{
										width: 20px;
										height: 20px;
										margin-right: 5px;
									}
								}
								.false_btn{
									width: 155px;
									height: 58px;
									border-radius: 25px;
									background: #1D2023;
									border: 1px solid #1D2023;
									color: #ff0000;
									font-family:'Roboto-Regular';
									font-size: 18px;
									margin-right: 25px;
									display: flex;
									align-items: center;
									justify-content: center;
									img{
										width: 30px;
										height: 30px;
										margin-right: 5px;
									}
								}
							}
							.news{
								width: 61px;
								height: 58px;
								display: flex;
								justify-content: center;
								align-items: center;
								border-radius: 21px;
								background: #1D2023;
								img{
									width: 30px;
									height: 30px;
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
