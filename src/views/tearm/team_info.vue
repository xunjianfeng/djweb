<template>
	<div class="index">
		<div class="container">
			<div class="mark_cancel" v-if="join_one == true" @click.stop="join_one = false">
				<img src="@/assets/images/cancel.png" >
			</div>
			<div class="mark_bac" v-if="join_one == true"></div>
			<div class="mark_Top_container" v-if="join_one == true">
				<div class="mark_my_content "> 
					<div class="mark_text_two">Apply to join <span>{{team_info.teamName}}</span>?</div>
				</div>
				<div class="mark_my_foot">
					<div class="mark_foot_confirm" @click="join_step(1)">Confirm</div>
					<div class="mark_foot_cancel" @click="join_step(3)">Cancel</div>
				</div>
			</div>
			<div class="mark_cancel" v-if="join_two == true" @click.stop="join_two = false">
				<img src="@/assets/images/cancel.png" >
			</div>
			<div class="mark_bac" v-if="join_two == true"></div>
			<div class="mark_two_container" v-if="join_two == true">
				<div class="mark_my_content ">
					<div class="mark_text_one">Application Sent</div>
					<div class="mark_text_two">After the team passes your application, you will receive a notification in the mailbox</div>
				</div>
				<div class="mark_my_foot">
					<div class="mark_foot_button" @click="join_step(2)">Close</div>
				</div>
			</div>
			<div class="content_right">
				<div class="content_right_form">
					<div  class="tinfo_team_container">
						<div class="tinfo_block">
							<div class="tinfo_block_padding">
								<div class="tinfo_left">
									<img :src="HOST + team_info.teamLogo" alt="">
								</div>
								<div class="tinfo_right">
									<div class="tinfo_tit">
										<div class="tit_name">{{team_info.teamName}}</div>
										<div class="tit_dota">{{team_info.gameName}}</div>
									</div>
									<div class="tinfo_version">
										<!-- Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril -->
										{{team_info.aboutTeam}}
									</div>
								</div>
							</div>
						</div>
						<div class="member_block">
							<div class="member_block_padding">
								<div class="member_left_con">
									<div class="member_left" >
										<img :src="HOST  + leader_info.avatar" alt="" v-if="leader_info.avatar">
										<img src="../../assets/images/default.png" v-else/>
									</div>
									<div class="member_right">
										<div class="member_right_head">
											<div class="member_tit">{{leader_info.fullName}}</div>
											<div class="member_subtit">(URD {{leader_info.userId}})</div>
											<!-- <div class="member_subtit">{{leader_info.role}}</div> -->
										</div>
										<div class="member_btn_list">
											<div class="btn_txt">Leader</div>
											<!-- <div class="btn_txt" v-else>Member</div> -->
											<div class="news" @click="add_friend(leader_info.userId)">
												<!-- <img src="../../assets/images/chat.png" /> -->
												<span>Add Friend</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						
						<div class="tinfo_sintuation">
							<div class="sintua_head">
								Tournament Situation
							</div>
							<div class="sintua_content">
								<div class="sintua_census">
									<div class="census_block">
										<div class="census_tit">Total Tournament</div>
										<div class="census_num">{{total_tournamet}}</div>
									</div>
									<div class="census_block">
										<div class="census_tit">Officially</div>
										<div class="census_num">{{team_info.officially}}</div>
									</div>
									<div class="census_block">
										<div class="census_tit">Privately</div>
										<div class="census_num">{{team_info.privately}}</div>
									</div>
								</div>
								<div class="sintue_trophy">
									<div class="trophy_block">
										<div class="trophy_img">
											<img src="../../assets/images/ran.png" alt="">
										</div>
										<div class="trophy_right">
											<div class="census_tit">CHAMPION</div>
											<div class="census_num">{{team_info.champion}}</div>
										</div>
									</div>
									<div class="trophy_block">
										<div class="trophy_img">
											<img src="../../assets/images/ran2.png" alt="">
										</div>
										<div class="trophy_right">
											<div class="census_tit">RUNNER UP</div>
											<div class="census_num">{{team_info.runnerUp}}</div>
										</div>
									</div>
									<div class="trophy_block">
										<div class="trophy_img">
											<img src="../../assets/images/ran3.png" alt="">
										</div>
										<div class="trophy_right">
											<div class="census_tit">THIRD PLACE</div>
											<div class="census_num">{{team_info.thirdPlace}}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="join_button" @click.stop="join_one = true" v-if="join_btn == true">Join</div>
						<div class="apply_button" v-if="apply_btn == true">Join</div>
					</div>
				</div><!-- content_right_form -->
			</div><!-- content_right -->
			<div class="tearm_chart">
				<img src="../../assets/images/chart.png" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	import {teamAchievement,teamJoin} from '@/api/team';
	import {addFriend} from '@/api/friend.js'
	import LeftView from '@/components/team/left.vue'
	export default{
		name:"team_info",
		components:{
			LeftView
		},
		data(){
			return{
				join_one:false,
				join_two:false,
				join_btn:true,
				apply_btn:false,
				team_info:'',
				teamId:'',
				leader_info:{},//队长信息
			}
		},
		mounted() {
			// console.log(this.$route.query)
			if(this.$route.query != '' && this.$route.query != null && this.$route.query != undefined){
				this.teamId = this.$route.query.teamId
				this.get_team(this.teamId);
			}
		},
		methods:{
			//提交好友申请
			add_friend(userId){
				this.$confirm('Confirm to accept this friend request?', 'Confirmation', {//是否确定申请添加该好友
					confirmButtonText: 'Confirm',
					cancelButtonText: 'Cancel',
					type: 'warning'
				  }).then(() => {
					  addFriend({userId}).then(res => {
					  	this.$message({
					  		type:'success',
					  		message:res.message
					  	})
					  })
				  })
				
			},
			// 战队详细信息
			get_team(teamId){
				let that = this;
				let params = {
					teamId
				}
				teamAchievement(params).then(res => {
					that.team_info = res.data		
					console.log(that.team_info,"team_info")
					for(let i=0;i<that.team_info.member.length;i++){
						if(that.team_info.leaderId == that.team_info.member[i].userId){
							that.leader_info = that.team_info.member[i]
						}
					}
				})
			},
			join_step(index){
			    let that = this;
			    if(index == 1){
					that.join_one = false
					that.join_two = true
					let params = {
						teamId:this.teamId,
						userId:sessionStorage.getItem('userId')
					}
					// console.log(params)
					teamJoin(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
					})
			    }else if(index == 2){
					// that.join_one = false
					that.join_two = false
					that.join_btn = false
					that.apply_btn = true
			    }else if(index == 3){
					that.join_one = false
				}
			}
		},
		computed:{
		   total_tournamet(){
		    let total = 0
		    return total = this.team_info.officially + this.team_info.privately
		   }
		}
	}
</script>

<style lang="less" scoped>
.container{
	width: calc(100% - 150px);
	margin-left: 180px;
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	//Join 01 弹窗 start
	.mark_cancel{
		position: absolute;
		right: 80px;
		top: 10px;
		img{
			width: 46px;
			height: 46px;
			cursor: pointer;
		}
		z-index: 999;
	}
	.mark_bac{
		width: 100%;
		height: 100%;
		background:#000000b3;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 88;
	}
	.mark_Top_container{
		position: absolute;
		left: 357px;
		top: 185px;
		z-index: 999;
		width: 611px;
		padding: 145px 150px 125px 150px;
		background: #0E0F11;
		border-radius: 27px;
		overflow: hidden;
		display: flex;
		flex-flow: column;
		align-items: center;
		.mark_my_content{
			width: 100%;
			text-align: center;
			margin-bottom: 80px;
			.mark_text_two{
				color: #DBA83F;
				font-size: 24px;
				font-family:'Roboto-Regular';
				span{
					color: #EDEDED;
					font-size: 30px;
					font-family:'Quicksand-Bold';
				}
			}
		}
		.mark_my_foot{
			display: flex;
			align-items: center;
			.mark_foot_confirm{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 163px;
				height: 58px;
				color: #0E0F11;
				cursor: pointer;
				font-size: 20px;
				background: #DBA83F;
				border-radius: 25px;
				font-family:'Roboto-Regular';
				margin-right: 20px;
			}
			.mark_foot_cancel{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 163px;
				height: 56px;
				color: #FFFFFF;
				font-family:'Roboto-Regular';
				cursor: pointer;
				font-size: 20px;
				background: #0E0F11;
				border: 1px solid #777777;
				border-radius: 25px;
			}
		}
	}
	//Join 01 弹窗  end
	//Join 02 弹窗 start
	.mark_cancel{
		position: absolute;
		right: 80px;
		top: 10px;
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
	.mark_two_container{
		position: absolute;
		left: 357px;
		top: 185px;
		z-index: 999;
		width: 611px;
		padding: 111px 150px 103px 150px;
		background: #0E0F11;
		border-radius: 27px;
		overflow: hidden;
		display: flex;
		flex-flow: column;
		align-items: center;
		.mark_my_content{
			width: 100%;
			text-align: center;
			margin-bottom: 80px;
			.mark_text_one{
				color: #DBA83F;
				font-size: 24px;
				font-family:'Quicksand-Bold';
				margin-bottom: 20px;
			}
			.mark_text_two{
				color: #989898;
				font-family:'Roboto-Regular';
				font-size: 20px;
			}
		}
		.mark_my_foot{
			.mark_foot_button{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 163px;
				height: 58px;;
				color: #0E0F11;
				cursor: pointer;
				font-size: 18px;
				background: #DBA83F;
				font-family:'Roboto-Regular';
				border-radius: 25px;
			}
		}
	}
	//Join 02 弹窗  end
	.content_right{
		width: calc(100% - 370px);
		.content_right_form{
			margin-top: 80px;
			.tinfo_team_container{
				display: flex;
				flex-wrap: wrap;
				.tinfo_block{
					width: 100%;
					background-color: #0E0F11;
					border-radius: 17px;
					margin: 0 0px 30px 0px;
					.tinfo_block_padding{
						display: flex;
						padding: 48px 60px 0px 77px;
						.tinfo_left{
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
						.tinfo_right{
							width: 75%;
							.tinfo_tit{
								margin: 0px 0px 0px 0px;
								display: flex;
								align-items: center;
								justify-content: space-between;
								padding-bottom: 16px;
								// border-bottom: 2px solid #3C3E3F;
								.tit_name{
									color: #FFFFFF;
									font-size: 30px;
									font-weight: 500;
									font-family:'Quicksand-Bold';
								}
								.tit_dota{
									color: #D3AA53;
									font-size: 20px;
									font-family:'Roboto-Regular';
								}
							}
							.tinfo_version{
								color: #8E8E8E;
								font-family:'Roboto-Regular';
								font-size: 20px;
								line-height: 30px;
								height: 210px;
								word-break: break-all;
								margin:19px  0px 0px  0px;
							}
							
						}
					}
				}
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
								img{
									width: 158px;
									height: 158px;
									object-fit: cover;
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
							}
						}
					}
				}
				.tinfo_sintuation{
					width: 100%;
					padding-bottom: 20px;
					background: #0E0F11;
					border-radius: 17px;
					.sintua_head{
						height: 66px;
						line-height: 66px;
						font-size: 18px;
						color: #D3AA53;
						font-family:'Roboto-Regular';
						padding: 0 20px;
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
									font-family:'Quicksand-Bold';
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
										color: #727272;
										font-size: 16px;
										font-family:'Roboto-Regular';
										margin-bottom: 6px;
									}
									.census_num{
										color: #FFFFFF;
										font-family:'Quicksand-Bold';
										font-size: 25px;
									}
								}
							}
							
						}
					}
				}
				.join_button{
					width: 100%;
					height: 60px;
					color: #2B2B2B;
					margin: 30px 0 100px 0;
					cursor: pointer;
					font-size: 20px;
					line-height: 60px;
					text-align: center;
					font-family:'Roboto-Regular';
					background: #D3AA53;
					border-radius: 25px;
				}
				.apply_button{
					width: 100%;
					height: 60px;
					color: #2B2B2B;
					margin: 30px 0 100px 0;
					cursor: pointer;
					font-size: 20px;
					line-height: 60px;
					font-family:'Roboto-Regular';
					text-align: center;
					background: #A3A2A2;
					border-radius: 25px;
				}
			}
		}
		
	}
	.tearm_chart{
		position: fixed;
		right: 79px;
		bottom: 45px;
		background: #0E0F11;
		border-radius: 50%;
		border: 2px solid #2D2D2D;
		img{
			width: 107px;
			height: 107px;
			object-fit: cover;
		}
	}
}
</style>
