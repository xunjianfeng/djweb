<template>
	<div class="index">
		<div class="container">
			<div class="content_right">
				<div class="content_right_top">
					<div class="content_right_title">
						<div class="create_title">Invite Member to Join Your Team?</div>
					</div>
					<!-- 搜索框 -->
					<div class="search">
						<div class="search_left">
							<input placeholder="Enter Your Search"  v-model="listQuery.name" />
							<button class="btn" @click="getList()">
								<img src="@/assets/images/search.png" />
							</button>
						</div>
					</div>
				</div><!-- content_right_top -->
				<div class="content_right_form">
					<!-- 暂无数据 样式 -->
					<div class="create_state2" v-if="search_list == ''">
						<div class="state_two_content">
							<div class="state_in">
								<img src="../../assets/images/invite.png" alt="">
								<div class="state_two_text">Join Member</div>
							</div>
						</div>
						
					</div>
					<!-- 搜索后 -->
					<div class="create_state3" v-if="state == 2">
						<div class="state_three_content">
							<div class="join_block" v-for="(item,index) in search_list" :key='index'>
								<div class="join_block_padding">
									<div class="join_left_bing">
										<div class="join_left">
											<el-image :src="HOST + item.avatar" class="avatar_img">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default.png" class="avatar_img"/>
												</div>
											</el-image>
											<!-- <img :src="HOST + item.avatar" alt="" v-if="item.avatar"> -->
										</div>
										<div class="join_right">
											<div class="join_tit">{{item.fullName}}</div>
											<div class="join_version">UID {{item.userId}}</div>
										</div>
									</div>
									<div class="join_botm" >
										<div class="join_button" v-if="item.spen_status == false"  @click="get_invter(item)">Choose</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 分页组件 -->
						<div class="pagnationBox" v-if="state == 2">
							<pagination v-show="total_count>10" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="handlePageChange" />
						</div>
					</div>
					<!-- 可删除的列表 选择后的样式 -->
					<div  v-if="state == 3" class="my_team_container">
						<div class="my_team_head">
							<div class="myam_block" v-for="(ytem,index2) in search_list" :key='index2' v-if="ytem.spen_status == true">
								<div class="myam_block_padding">
									<div class="myam_left">
										<div class="myan_left_in">
											<el-image :src="HOST + ytem.avatar" class="avatar_img">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default.png" class="avatar_img"/>
												</div>
											</el-image>
											<!-- <img :src="HOST + ytem.avatar" alt="" v-if="ytem.avatar"> -->
											<!-- <img src="../../assets/images/default.png" v-else/> -->
										</div>
									</div>
									<div class="myam_right">
										<div class="myam_tit">{{ytem.fullName}}</div>
										<div class="myam_version">UID{{ytem.userId}}</div>
									</div>
									<div class="myam_qr" @click="get_invter(ytem)">
										<img src="../../assets/images/invite2.png" alt="">
									</div>
								</div>
							</div>
						</div>
						<!-- 选择邀请用户后，切换页面布局 -->
						<div class="state_two_foot" v-if="state != 2">
							<div class="invite_button2" @click="get_team(3)">Invite</div>
							<div class="skip_button" @click="jump_teamAbout">Skip</div>
						</div>
						
					</div>
					<!-- 选择邀请用户后，切换页面布局 -->
					<div class="state_two_foot" v-if="state == 2 ||  search_list == ''">
						<div :class="invter =='' ? 'invite_button':'invite_button2'" @click="get_team(2)">Invite</div>
						<div class="skip_button" @click="jump_teamAbout">Skip</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {teamInvite,userSearch} from '@/api/team';
	import {friendList} from '@/api/center';
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination/wallet.vue';
	export default{
		name:"my_join_team",
		mixins: [Listing],
		components:{
			Pagination
		},
		data(){
			return{
				team_index:2,
				state:'',
				listQuery: {
					teamId:'',
					name:'',
					page:1,
					size:10
				},
				name:'',
				search_list:'',//搜索用户列表
				invter:[],
				total_count:0,
			}
		},
		mounted() {
			// this.listQuery.teamId = this.$route.query.teamId
			// this.getList()
			// this.teamUsers()
		},
		methods:{
			// 邀请用户加入战队   2邀请用户布局 3删除邀请用户布局
			get_team(index){
				let that = this;
				that.state = index
				if(index == 2){
					if(that.invter == ''){
						that.$message({
							message: 'Please choose a user you would like to invite.',//请选择您要邀请的用户
							type: 'warning'
						})
						return false
					}
					that.state = 3
				}else{
					
					let userIds = that.invter.join(',')
					let params = {
						teamId: this.$route.query.teamId,
						userIds	: userIds
					}
					// console.log(params,"Invite")
					teamInvite(params).then(res => {
						that.$message({
							message: res.message,
							type: 'success'
						})
						sessionStorage.setItem("teamId", that.listQuery.teamId)
						that.$router.push({ path: '/tearm/team_about' })
					})
				}
			},
			//搜索前显示朋友列表
			getList(){
				let that = this
				that.listQuery.teamId = that.$route.query.teamId
				console.log(that.listQuery,"listQuery")
				userSearch(that.listQuery).then(res => {
					var usrs = res.data
					for (let i = 0; i < usrs.length; i++) {
						usrs[i].spen_status = false
					}
					that.search_list = usrs
					that.state =  2
				})
			},
			// 搜索
			// search_uid(){
			// 	let that = this;
			// 	let params = {
			// 		teamId:this.$route.query.teamId,
			// 		name:that.name
			// 	}
			// 	userSearch(params).then(res => {
			// 		var usrs = res.data
			// 		for (let i = 0; i < usrs.length; i++) {
			// 			usrs[i].spen_status = false
			// 		}
			// 		that.search_list = usrs
			// 		that.state =  2
			// 	})
			// },
			// 点击邀请，获取id
			get_invter(item){
				let that = this;
				 for (let i = 0; i < that.search_list.length; i++) {
					 if(that.search_list[i].userId == item.userId){
						 that.search_list[i].spen_status = !  that.search_list[i].spen_status
						 if(that.search_list[i].spen_status == true){
						 	that.invter.push(item.userId)
						 }else{
							 that.invter.splice(i, 1); 
							 if(that.invter == ''){
								 that.state = 2
							 }
						 }
					 }
				 }
			},
			update_state(index){
				let that = this;
				// 1 是查询后 2是有删除的
				if(index == 1){
					that.state =  2
				}else if(index == 2){
					that.state =  3
				}
			},
			jump_application(){
				this.$router.push({ path: '/tearm/application_list'})
			},
			// 跳过
			jump_teamAbout(){
				let that = this;
				sessionStorage.setItem("teamId", that.listQuery.teamId)
				that.$router.push({ path: '/tearm/team_about' })
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
		width: 100%;
		.content_right_top{
			margin-top: 81px;
			.content_right_title{
				width: 1200px;
				padding-bottom:52px;
				margin-bottom: 79px;
				border-bottom: 1px solid #2D2D2D;
				.create_title{
					color: #FFFFFF;
					font-size: 24px;
					font-weight: 500;
					font-family:'Quicksand-Bold';
					margin-left: 60px;
				}
			}
			.search{
				padding-left: 60px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.search_left{
					input{
						width: 315px;
						height: 60px;
						background: #0E0F11;
						border-radius: 23px;
						font-size: 18px;
						border: none;
						padding-left: 35px;
						color: #fff;
						font-family:'Roboto-Regular';
					}
					.btn{
						width: 60px;
						height: 60px;
						background: #D3AA53;
						border: none;
						border-radius: 17px;
						opacity: 1;
						position: relative;
						right: 50px;top: 4px;
						img{
							width: 22px;
							height: 22px;
						}
					}
				}
			}
		}
		.content_right_form{
			width: 1300px;
			padding-left: 60px;
			margin-top: 80px;
			// Create Team 02
			.create_state2{
				width: 100%;
				.state_two_content{
					.state_in{
						width: 118px;
						margin: 0 auto;
						margin-top: 150px;
						display: flex;
						flex-direction: column;
						align-items: center;
						img{
							width: 83px;
							height: 83px;
						}
						.state_two_text{
							color: #565656;
							font-family:'Roboto-Regular';
							font-size: 20px;
							margin-top: 15px;
						}
					}
				}
			}
			// Create Team 03
			.create_state3{
				width: 100%;
				.state_three_content{
					.join_block{
						width: 748px;
						background-color: #0E0F11;
						border-radius: 61px;
						margin: 0 0px 40px 0;
						box-shadow: black 0 0 10px;
						.join_block_padding{
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 63px 65px 56px 71px;
							.join_left_bing{
								display: flex;
								align-items: center;
								.join_left{
									width: 113px;
									height: 113px;
									border-radius: 30px;
									overflow: hidden;
									margin-right: 40px;
									.avatar_img{
										width: 113px;
										height: 113px;
										object-fit: cover;
									}
								}
								.join_right{
									.join_tit{
										color: #FFFFFF;
										font-size: 22px;
										font-weight: 500;
										margin: 0px 0px 11px 0px;
									}
									.join_version{
										color: #727272;
										font-size: 20px;
									}
									
								}
							}
							.join_botm{
								.join_button{
									width: 163px;
									height: 58px;
									color: #2B2B2B;
									cursor: pointer;
									font-size: 18px;
									line-height: 58px;
									text-align: center;
									background: #D3AA53;
									border-radius: 25px;
								}
							}
						}
						
					}
				}
				.pagnationBox{
					margin-top: 50px;
				}
			}
			.state_two_foot{
				margin: 85px 0;
				display: flex;
				align-items: center;
				.invite_button{
					width: 163px;
					height: 58px;
					color: #0E0F11;
					font-size: 20px;
					cursor: pointer;
					line-height: 58px;
					text-align: center;
					margin-right: 20px;
					background: #939393;
					font-family:'Roboto-Regular';
					border-radius: 25px;
				}
				.invite_button2{
					width: 163px;
					height: 58px;
					color: #0E0F11;
					font-size: 20px;
					cursor: pointer;
					line-height: 58px;
					text-align: center;
					margin-right: 20px;
					background: #D3AA53;
					font-family:'Roboto-Regular';
					border-radius: 25px;
				}
				.skip_button{
					width: 163px;
					height: 58px;
					color: #FFFFFF;
					font-size: 20px;
					cursor: pointer;
					line-height: 58px;
					font-family:'Roboto-Regular';
					text-align: center;
					border-radius: 25px;
					border: 1px solid #777777;		
				}
			}
			.my_team_container{
				.my_team_head{
					display: flex;
					flex-wrap: wrap;
					.myam_block{
						width: 23%;
						background-color: #0E0F11;
						border-radius: 37px;
						margin: 0 33px 33px 0;
						.myam_block_padding{
							position: relative;
							padding: 27px 39px 43px 39px;
							.myam_left{
								margin: 0 auto;
								display: flex;
								justify-content: center;
								align-items: center;
								margin: 0px 0 39px 0;
								.myan_left_in{
									width: 113px;
									height: 113px;
									border-radius: 30px;
									overflow: hidden;
									.avatar_img{
										width: 113px;
										height: 113px;
										object-fit: cover;
									}
								}
							}
							.myam_right{
								display: flex;
								flex-direction: column;
								.myam_tit{
									color: #FFFFFF;
									font-size: 22px;
									font-weight: 500;
									text-align: center;
									margin: 0px 0px 10px 0px;
								}
								.myam_version{
									color: #727272;
									font-size: 20px;
									text-align: center;
								}
								
							}
							.myam_qr{
								position: absolute;
								right: 0;
								top: 0;
								img{
									width: 47px;
									height: 47px;
								}
							}
						}
					}
					.myam_block:nth-child(4n){
						margin-right: 0;
					}
				}
				
			}
		}
	}
}
</style>
