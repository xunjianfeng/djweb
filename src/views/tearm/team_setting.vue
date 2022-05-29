<template>
	<div class="index">
		<div class="container">
			<!-- 赛事报名-选择队员弹窗 -->
			<div class="team_user" v-if="member_status == true">
				<div class="mark_check"  @click.stop="member_status = false">
					<img src="@/assets/images/cancel.png" >
				</div>
				<div class="mark_bac"></div>
				<div class="mark_check_container">
					<div class="mark_my_content ">
						<div class="mark_text_one">Choose TeamMemeber</div>
						<div class="mark_product_container">
							<div class="mark_product">
								<div class="selected_area">
									<div class="selected_user_list">
										<div v-if="Sitem.userId != userId" :class="Sitem.check == true ? 'user_selected av' : 'user_selected'" @click="chooseMember(Sitem.userId)" v-for="(Sitem,index) in team_user" :key="index">
											<div class="img_area">
												<img :src="HOST + Sitem.avatar" v-if="Sitem.avatar"/>
												<img src="../../assets/images/default.png" v-else />
											</div>
											<div class="user_info">
												<div class="user_name">{{Sitem.fullName}}</div>
												<div class="game_role">{{Sitem.role}}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
					<div class="mark_my_foot">
						<div class="confirm_btn" @click="leader_Handover">Confirm</div>
						<div class="cancel_btn" @click="member_status = false">Cancel</div>
						<!-- <div class="cancel_btn"@click.stop="member_status = false ">Cancel</div> -->
					</div>
				</div>
			</div>
			<!-- 赛事报名-选择队员弹窗 end-->
			<LeftView :index="5"></LeftView>
			<div class="content_right">
				<!-- content_right_top -->
				<div class="content_right_form">
					<div class="other_block">
						<div class="block_title">Team Setting</div>
						<div class="block_cont">
							<div class="row_block" @click="jump_create_team_04">
								<div class="sett_row_text">Edit Team Setting</div>
								<div class="sett_row_text sett_row_color" >Last Updated:{{initDete(team_info.updateTime)}}>></div>
							</div>
						</div>
					</div>
					<div class="other_block">
						<div class="block_title">Announcement</div>
						<div class="block_cont">
							<div class="row_block2" @click="jump_announcement">
								<div class="sett_row_text">Edit Annoucement</div>
								<div class="block_right">
									<div class="sett_row_text sett_row_color" v-if="team_info.announcementTitle != null && team_info.announcementTitle != ''">Last Updated:{{initDete(team_info.announcementTime)}}</div>
									<div class="sett_row_color">>></div>
								</div>
								
							</div>
						</div>
					</div>
					<div class="other_block">
						<div class="block_title">Management Team</div>
						<div class="block_cont">
							<div class="row_block">
								<div class="sett_row_text"@click="member_status = true,get_teamUser()">Leader Handover</div>
							</div>
							<div class="row_block">
								<div class="sett_row_text" @click="jump_create">Invite Member</div>
							</div>
						</div>
					</div>
					<!-- <div class="other_foot_button">
						<div class="quit_bton">Quit Team</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {teamAchievement,teamUsers,teamTransfer} from '@/api/team';
	import LeftView from '@/components/team/left.vue'
	export default{
		name:"team_setting",
		components:{
			LeftView
		},
		data(){
			return{
				team_info:'',
				teamId:sessionStorage.getItem("teamId"),
				member_status:false,
				team_user:[],
				member_userId:'',//被交的用户ID
				userId:sessionStorage.getItem('userId')
			}
		},
		mounted() {
			this.get_team();
		},
		methods:{
			// 战队详细信息
			get_team(){
				let that = this;
				let params = {
					teamId:that.teamId
				}
				teamAchievement(params).then(res => {
					that.team_info = res.data
				})
			},
			//战队成员
			get_teamUser(){
				let teamId = this.teamId
				teamUsers({teamId}).then(res => {
					for(let i = 0; i < res.data.usrs.length; i++){
						res.data.usrs[i]['check'] = false;
					}
					this.team_user = res.data.usrs
				})
			},
			//选择队员
			chooseMember(userId){
				for(let s=0;s<this.team_user.length;s++){
					if(this.team_user[s]['check'] == false){
						if(userId == this.team_user[s].userId){
							this.team_user[s]['check'] = true
							this.member_userId = this.team_user[s].userId
							// console.log(this.team_user[s]['check'])
							// console.log(this.member_userId)
						}
					}else{
						this.team_user[s]['check'] = false
					}
				}
			},
			//队长转移
			leader_Handover(){
				if(this.member_userId == ''){
					this.$message({
						type:'warning',
						message:'You yet to pick a member to change.'//您还未选择要移交的成员
					})
				}else{
					let params = {
						toUser:this.member_userId,
						teamId:this.teamId
					}
					// console.log(params)
					teamTransfer(params).then(res => {
						this.$message({
							type:'success',
							message:res.message
						})
						this.member_status = false
					})
				}
				
			},
			jump_create_team_04(){
				this.$router.push({ path: '/tearm/create_team_04',query:{teamId:sessionStorage.getItem("teamId")}})
			},
			jump_announcement(){
				this.$router.push({ path: '/tearm/team_announcement',query:{type:'1'}})
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
	//战队成员
	.team_user{
		// Check out 01弹窗 start
		.mark_check{
			position: absolute;
			right: 80px;
			top: 50px;
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
			left: 320px;
			top: 100px;
			z-index: 999;
			// width: 753px;
			width: 800px;
			padding: 48px 20px 30px 28px;
			// background: #0E0F11;
			background-color: #1D2023;
			border-radius: 27px;
			overflow: hidden;
			display: flex;
			flex-flow: column;
			align-items: center;
			.mark_my_content{
				width: 100%;
				// margin-bottom: 55px;
				margin: 0 50px 30px;
				.mark_text_one{
					font-family:'Quicksand-Bold';
				}
				.mark_product_container{
					width: 100%;
					height: 496px;
					overflow-y: scroll;
					margin-bottom: 35px;
					.mark_product{
						margin-top: 20px;
						width: 95%;
						margin: 0 auto;
						// border: 1px solid #313538;
						border-radius: 22px;
						.selected_area{
							.block_text{
								color: #ffffff;
								font-size: 18px;
								font-family:'Roboto-Bold';
							}
							.show_text{
								color: #D3AA53;
								font-size: 28px;
								padding: 100px 0;
								font-family:'Roboto-Bold';
								// margin-top: 150px;
							}
							.selected_user_list{
								margin-top: 20px;
								display: flex;
								flex-wrap: wrap;
								justify-content: center;
								.av{
									border: 1px solid #D3AA53;
								}
								.user_selected{
									width: 180px;
									// width: 17%;
									height: 200px;
									background-color: #0E0F11;
									margin-left: 25px;
									border-radius: 20px;
									margin-bottom: 20px;
									// line-height: 230px;
									// text-align: center;
									.img_area{
										margin-top: 25px;
										img{
											width: 86px;
											height: 86px;
											border-radius: 20px;
											object-fit: cover;
										}
									}
									.user_info{
										display: block;
										margin-top: 20px;
										font-family:'Roboto-Regular';
										.user_name{
											color: #ffffff;
											font-size: 18px;
										}
										.game_role{
											color: #727272;
											font-size: 16px;
											margin-top: 10px;
										}
									}
								}
								.user_add{
									width: 17%;
									height: 200px;
									background-color: #0E0F11;
									// margin-left: 3px;
									margin-left: 25px;
									margin-bottom: 20px;
									border-radius: 20px;
									display: flex;
									align-items: center;
									justify-content: center;
									img{
										width: 48px;
										height: 48px;
									}
									
								}
							}
						}
						.line{
							background-color: #ffffff;
							width: 100%;
							height: 1px;
							margin-top: 20px;
						}
						.unselected_area{
							margin-top: 20px;
							.block_text{
								color: #ffffff;
								font-size: 18px;
								font-family:'Roboto-Bold';
							}
							.show_text{
								color: #D3AA53;
								font-size: 28px;
								padding: 100px 0;
								font-family:'Roboto-Bold';
							}
							.selected_user_list{
								margin-top: 20px;
								display: flex;
								flex-wrap: wrap;
								justify-content: center;
								.user_selected{
									// width: 200px;
									width: 17%;
									height: 200px;
									background-color: #0E0F11;
									margin-left: 25px;
									margin-bottom: 20px;
									border-radius: 20px;
									// line-height: 230px;
									// text-align: center;
									.img_area{
										margin-top: 25px;
										img{
											width: 86px;
											height: 86px;
											border-radius: 20px;
											object-fit: cover;
										}
									}
									.user_info{
										display: block;
										margin-top: 20px;
										font-family:'Roboto-Regular';
										.user_name{
											color: #ffffff;
											font-size: 18px;
										}
										.game_role{
											color: #727272;
											font-size: 16px;
											margin-top: 10px;
										}
									}
								}
								.user_add{
									width: 17%;
									height: 200px;
									background-color: #0E0F11;
									margin-left: 3px;
									border-radius: 20px;
									display: flex;
									align-items: center;
									justify-content: center;
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
		//Check out 01弹窗  end
	}
	//战队成员 end
	.content_right{
		width: calc(100% - 370px);
		.content_right_form{
			margin-top: 70px;
			width: 90%;
			.other_block{
				margin-bottom: 60px;
				.block_title{
					color: #fff;
					font-family:'Quicksand-Bold';
					font-size: 22px;
					margin: 0 50px 20px 50px;
				}
				.block_cont{
					background: #0E0F11;
					border-radius: 25px;
					.row_block{
						display: flex;
						justify-content: space-between;
						border-bottom: 2px solid #2D2D2D;
						margin: 0 30px 0px 30px;
						padding: 25px 20px ;
						.sett_row_text{
							color: #727272;
							font-family:'Roboto-Regular';
							font-size: 20px;
							cursor: pointer;
						}
						.sett_row_color{
							color: #a8a8a8;
							font-family:'Roboto-Regular';
							cursor: pointer;
						}
						span{
							color: #a8a8a8;
							font-family:'Roboto-Regular';
							cursor: pointer;
						}
					}
					.row_block2{
						display: flex;
						justify-content: space-between;
						border-bottom: 2px solid #2D2D2D;
						margin: 0 30px 0px 30px;
						padding: 25px 20px ;
						.sett_row_text{
							color: #727272;
							font-family:'Roboto-Regular';
							font-size: 20px;
						}
						.block_right{
							display: flex;
							align-items: center;
							.sett_row_color{
								color: #a8a8a8;
								font-family:'Roboto-Regular';
								cursor: pointer;
								font-size: 20px;
							}
						}
						
					}
					.row_block:last-child{
						border: none;
					}
					.row_block2:last-child{
						border: none;
					}
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
					font-family:'Roboto-Bold';
					background: #0E0F11;
					border-radius: 24px;
				}
			}
		}
	}
}
</style>
