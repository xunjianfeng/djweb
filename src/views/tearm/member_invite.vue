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
							<input placeholder="Enter Your Search" />
							<button class="btn" @click="update_state(1)">
								<img src="@/assets/images/search.png" />
							</button>
						</div>
					</div>
				</div><!-- content_right_top -->
				<div class="content_right_form">
					<div class="create_state2" v-if="state == 1">
						<div class="state_two_content">
							<div class="state_in">
								<img src="../../assets/images/invite.png" alt="">
								<div class="state_two_text">Join Member</div>
							</div>
						</div>
						<div class="state_two_foot">
							<div class="invite_button">Invite</div>
							<div class="skip_button">Skip</div>
						</div>
					</div>
					<div class="create_state3" v-if="state == 2">
						<div class="state_three_content">
							<div class="join_block">
								<div class="join_block_padding">
									<div class="join_left_bing">
										<div class="join_left">
											<img src="../../assets/images/friend_08.png" alt="">
										</div>
										<div class="join_right">
											<div class="join_tit">Peter Tang</div>
											<div class="join_version">UID 542635</div>
										</div>
									</div>
									
									<div class="join_botm">
										<div class="join_button" @click="update_state(2)">Choose</div>
									</div>
								</div>
							</div>
						</div>
						<div class="state_two_foot">
							<div class="invite_button">Invite</div>
							<div class="skip_button">Skip</div>
						</div>
					</div>
					<div  v-if="state == 3" class="my_team_container">
						<div class="my_team_head">
							<div class="myam_block">
								<div class="myam_block_padding">
									<div class="myam_left">
										<div class="myan_left_in">
											<img src="../../assets/images/friend_06.png" alt="">
										</div>
									</div>
									<div class="myam_right">
										<div class="myam_tit">Jack Lim</div>
										<div class="myam_version">UID722827</div>
									</div>
									<div class="myam_qr">
										<img src="../../assets/images/invite2.png" alt="">
									</div>
								</div>
							</div>
							<div class="myam_block">
								<div class="myam_block_padding">
									<div class="myam_left">
										<div class="myan_left_in">
											<img src="../../assets/images/friend_06.png" alt="">
										</div>
									</div>
									<div class="myam_right">
										<div class="myam_tit">Jack Lim</div>
										<div class="myam_version">UID722827</div>
									</div>
									<div class="myam_qr">
										<img src="../../assets/images/invite2.png" alt="">
									</div>
								</div>
							</div>
							<div class="myam_block">
								<div class="myam_block_padding">
									<div class="myam_left">
										<div class="myan_left_in">
											<img src="../../assets/images/friend_06.png" alt="">
										</div>
									</div>
									<div class="myam_right">
										<div class="myam_tit">Jack Lim</div>
										<div class="myam_version">UID722827</div>
									</div>
									<div class="myam_qr">
										<img src="../../assets/images/invite2.png" alt="">
									</div>
								</div>
							</div>
							<div class="myam_block">
								<div class="myam_block_padding">
									<div class="myam_left">
										<div class="myan_left_in">
											<img src="../../assets/images/friend_06.png" alt="">
										</div>
									</div>
									<div class="myam_right">
										<div class="myam_tit">Jack Lim</div>
										<div class="myam_version">UID722827</div>
									</div>
									<div class="myam_qr">
										<img src="../../assets/images/invite2.png" alt="">
									</div>
								</div>
							</div>
							<div class="myam_block">
								<div class="myam_block_padding">
									<div class="myam_left">
										<div class="myan_left_in">
											<img src="../../assets/images/friend_06.png" alt="">
										</div>
									</div>
									<div class="myam_right">
										<div class="myam_tit">Jack Lim</div>
										<div class="myam_version">UID722827</div>
									</div>
									<div class="myam_qr">
										<img src="../../assets/images/invite2.png" alt="">
									</div>
								</div>
							</div>
						</div>
						<div class="my_team_btom">
							<div class="invite_button">Invite</div>
							<div class="skip_button">Skip</div>
						</div>
						
					</div>
				</div><!-- content_right_form -->
			</div><!-- content_right -->
		</div>
	</div>
</template>

<script>
	export default{
		name:"my_join_team",
		components:{
		},
		data(){
			return{
				team_index:1,
				state:1,
			}
		},
		methods:{
			update_state(index){
				if(index == 1){
					this.state =  2
				}else if(index == 2){
					this.state =  3
				}else if(index == 3){
					
				}else if(index == 4){
					
				}
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
						color: #565656;
						
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
			}//search
		}//content_right_top
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
							font-size: 20px;
						}
					}
				}
				.state_two_foot{
					margin-top: 185px;
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
						border-radius: 25px;
					}
					.skip_button{
						width: 163px;
						height: 58px;
						color: #FFFFFF;
						font-size: 20px;
						cursor: pointer;
						line-height: 58px;
						text-align: center;
						border-radius: 25px;
						border: 1px solid #777777;		
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
						margin: 0 0px 0px 0;
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
									img{
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
				.state_two_foot{
					margin-top: 185px;
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
						border-radius: 25px;
					}
					.skip_button{
						width: 163px;
						height: 58px;
						color: #FFFFFF;
						font-size: 20px;
						cursor: pointer;
						line-height: 58px;
						text-align: center;
						border-radius: 25px;
						border: 1px solid #777777;		
					}
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
									img{
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
				.my_team_btom{
					margin-top: 179px;
					margin: 179px 0 169px 0;
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
						background: #D3AA53;
						border-radius: 25px;
					}
					.skip_button{
						width: 163px;
						height: 58px;
						color: #FFFFFF;
						font-size: 20px;
						cursor: pointer;
						line-height: 58px;
						text-align: center;
						border-radius: 25px;
						border: 1px solid #777777;		
					}
				}
				
			}
			
		}//content_right_form
	}//content_right
}
</style>
