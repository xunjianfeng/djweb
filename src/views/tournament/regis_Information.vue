<template>
	<div class="index index_background">
		<div class="container">
			<!-- 赛事报名 -->
			<div class="add_count_container">
				<!-- 赛事报名-选择团队弹窗 -->
				<div class="team_game" v-if="team_game_status == true">
					<div class="mark_check" @click.stop="team_game_status = false,member_num = ''">
						<img src="@/assets/images/cancel.png" >
					</div>
					<div class="mark_bac"></div>
					<div class="mark_check_container">
						<div class="mark_my_content ">
							<div class="mark_text_one">Choose your team</div>
							<div class="mark_product_container">
								<div class="search">
									<div class="search_left">
										<input placeholder="Enter your team name"/>
										<button class="btn">
											<img src="@/assets/images/search.png" />
										</button>
									</div>
									<div class="search_right" >
										<div class="creat_btn" @click="jump_create">Create Team</div>
										<div class="what">
											<img src="../../assets/images/why.png" />
										</div>
									</div>
									
								</div>
								<div class="mark_product">
									<div  class="my_team_container">
										<div :class="member_num == item.teamId?'myam_block av':'myam_block'" v-for="(item,index) in team_list" :key='index' @click="tab_team(item.teamId)">
											<div class="myam_block_padding">
												<div class="myam_left">
													<div class="myan_left_in">
														<img :src="HOST + item.teamLogo" alt="">
													</div>
												</div>
												<div class="myam_right">
													<div class="myam_tit">{{item.teamName}}</div>
													<div class="myam_version">{{item.aboutTeam}}</div>
													<div class="myam_botm">
														<div class="myam_btom_left">
															<div class="myam_img" v-for="(utem,tdex) in item.teamUserVos" :key='tdex' v-if="tdex <= 2 ">
																<img :src="HOST + utem.avatar" alt="" v-if="utem.avatar">
																<img src="../../assets/images/default.png" v-else />
															</div>
															<div class="myam_num">+{{item.teamUserVos.length}}</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="join_team_container">
										<div class="join_block" v-for="(item2,index2) in join_list" :key='index2' >
											<div class="join_block_padding">
												<div class="join_left" >
													<img :src="HOST + item2.teamLogo" alt="">
												</div>
												<div class="join_right">
													<div class="join_tit" @click="jump_teamInfo">{{item2.teamName}}</div>
													<div class="join_version">{{item2.aboutTeam}}</div>
													<div class="join_botm">
														<div class="join_btom_left">
															<div class="join_img" v-for="(utem,tdex) in item2.teamUserVos" :key='tdex' v-if="tdex <= 2 ">
																<img :src="HOST + utem.avatar" v-if="utem.avatar">
																<img src="../../assets/images/default.png" v-else />
															</div>
															<div class="join_num">+{{item2.teamUserVos.length}}</div>
														</div>
														<div class="join_button" @click="Join(item2.teamId)">Join</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="mark_my_foot">
							<div class="confirm_btn" @click="change_team_users(member_num)">Next</div>
							<div class="cancel_btn" @click.stop="team_game_status = false,member_num = ''">Cancel</div>
						</div>
					</div>
				</div>
				<!-- 赛事报名-选择团队弹窗 end-->
				<!-- 赛事报名-选择队员弹窗 -->
				<div class="team_user" v-if="member_status == true">
					<div class="mark_check"  @click.stop="close_teammember">
						<img src="@/assets/images/cancel.png" >
					</div>
					<div class="mark_bac"></div>
					<div class="mark_check_container">
						<div class="mark_my_content ">
							<div class="mark_text_one">Choose LineUp</div>
							<!-- <div class="search">
								<div class="search_left">
									<input placeholder="search Member Name"/>
									<button class="btn">
										<img src="@/assets/images/search.png" />
									</button>
								</div>
							</div> -->
							<div class="mark_product_container">
								<!-- <div class="search">
								</div> -->
								<div class="mark_product">
									<div class="selected_area">
										<div class="block_text">Selected</div>
										<div class="show_text" v-if="showText == true">Please Choose Your Team</div>
										<div class="selected_user_list" v-else>
											<div class="user_selected" v-for="(sitem,sindex) in selected_users_list" v-if="sitem.check==true"  :key="sindex" @click="cancelUserMember(sitem.userId,sindex)">
												<div class="img_area">
													<img :src="HOST + sitem.avatar" v-if="sitem.avatar" />
													<img src="../../assets/images/default.png" v-else />
												</div>
												<div class="user_info">
													<div class="user_name">{{sitem.fullName}}</div>
													<div class="game_role">{{sitem.role}}</div>
												</div>
											</div>
											<div class="user_add" v-for="mmtem in player_block">
												<div class="add_img" >
													<!-- <img src="../../assets/images/add.png" /> -->
												</div>
											</div>
										</div>
									</div>
									<div class="line"></div>
									<div class="unselected_area">
										<div class="block_text">Unselected</div>
										<div class="show_text" v-if="showText == true">Please Choose Your Team</div>
										<div class="selected_user_list" v-else>
											<div class="user_selected" v-for="(Uitem,index) in team_user" v-if="!Uitem.check" :key="index" @click="get_selected_user(member_num,Uitem.userId)">
												<div class="img_area">
													<img :src="HOST + Uitem.avatar" v-if="Uitem.avatar"/>
													<img src="../../assets/images/default.png" v-else />
												</div>
												<div class="user_info">
													<div class="user_name">{{Uitem.fullName}}</div>
													<div class="game_role">{{Uitem.role}}</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
						</div>
						<div class="mark_my_foot">
							<div class="confirm_btn" @click="open_info_status(member_num)">Next</div>
							<div class="cancel_btn"@click.stop="close_teammember">Cancel</div>
							<!-- <div class="cancel_btn"@click.stop="member_status = false ">Cancel</div> -->
						</div>
					</div>
				</div>
				<!-- 赛事报名-选择队员弹窗 end-->
				<!-- 赛事报名-报名信息 -->
				<div class="game_info" v-if="info_status == true">
					<div class="mark_check" v-if="detail_list.tournamentType > 0" @click.stop="close_teammember">
						<img src="@/assets/images/cancel.png" >
					</div>
					<div class="mark_bac"></div>
					<div class="mark_check_container">
						<div class="mark_my_content ">
							<div class="mark_check_inset" v-if="detail_list.tournamentType == 0"  @click.stop="info_status = false">
								<img src="@/assets/images/cancel.png" >
							</div>
							<!-- <div class="mark_text_one">Does it cost {{detail_list.registeryFee || 0 }} {{detail_list.registeryFeeType}} to register for the competition?</div> -->
							<div class="mark_text_one">Join the tournament now!</div>
							<div class="mark_product_container">
								<div class="mark_product">
									<div class="info_area">
										<div class="block_left">
											<div class="game_title">{{detail_list.tournamentName}}</div>
											<div class="game_content">
												<!-- Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam -->
												{{detail_list.subtitle}}
											</div>
											<div class="type_area">
												<div class="type_label">Game Type:</div>
												<div class="type_text">{{detail_list.gameName}}</div>
											</div>
										</div>
										<div class="block_right">
											<img :src="HOST + detail_list.tournamentCover" />
										</div>
									</div>
									<div class="team_area"  v-if="detail_list.tournamentType > 0">
										<div class="label">Team</div>
										<div class="team_info">
											<div class="team_logo">
												<img :src="HOST + team_info.teamLogo" />
											</div>
											<div class="team_name">{{team_info.teamName}}</div>
										</div>
									</div>
									<div class="agree_condition">
										<div class="check_box">
											<img src="../../assets/images/xz.png"  v-if="agree_status == false" @click.stop="agree_status = true"/>
											<img src="../../assets/images/xzs.png" v-if="agree_status == true" @click.stop="agree_status = false"/>
										</div>
										<div class="contdition_text">
											I have read and agree to the <span style="cursor: pointer;" @click="terms_status = true">terms and conditions</span>
										</div>
									</div>
								</div>
							</div>
							
						</div>
						<div class="mark_my_foot">
							<div class="confirm_btn" v-if="detail_list.tournamentType == 0" @click="jump_next">Next</div>
							<div class="confirm_btn" v-if="detail_list.tournamentType != 0" @click="join_match">Confirm</div>
							<div class="cancel_btn"@click.stop="close_teammember">Cancel</div>
						</div>
					</div>
				</div>
				<!-- 赛事报名-报名信息 end-->
				<!-- 个人赛报名 弹窗 -->
				<div class="personal_play" v-if="person_status == true">
					<!-- <div class="mark_check" @click.stop="cancelClick">
						<img src="@/assets/images/cancel.png" >
					</div> -->
					<div class="mark_bac"></div>
					<div class="mark_check_container">
						<div class="mark_check_inset"  @click.stop="cancelClick">
							<img src="@/assets/images/cancel.png" >
						</div>
						<div class="mark_content">
							<div class="mark_title">Confirm to Join ?</div>
							<div class="content_text">
								<!-- <div class="label">参赛成员:</div>
								<div class="player">{{user_info.fullName}}</div> -->
								<!-- Please be mind that you will be deducted of 0 coins for this tournament. -->
								Please be mind that you will be deducted of <span>{{detail_list.registeryFee || 0}} coin</span>for this tournament、
							</div>
							<div class="btn_area">
								<div class="confirm_btn" @click="join_match">Confirm(-{{detail_list.registeryFee || 0}} coin)</div>
								<div class="cancel_btn" @click.stop="cancelClick">Cancel</div>
							</div>
						</div>
					</div>
					
				</div>
				<!-- 个人赛报名end -->
				<!-- 个人赛报名成功 弹窗 -->
				<div class="personal_play" v-if="success_status == true">
					<div class="mark_check" @click.stop="success_status = false">
						<img src="@/assets/images/cancel.png" >
					</div>
					<div class="mark_bac"></div>
					<div class="mark_check_container">
						<div class="mark_content">
							<div class="mark_title">Successfully</div>
							<div class="content_text" v-if="detail_list.registeryFee != 0">
								Please pay attention to your mailbox,we will use it to notify the tournament.
							</div>
							<div class="content_text" v-if="detail_list.registeryFee == 0">
								You have signed up successfully
							</div>
							<div class="btn_area">
								<div class="confirm_btn" @click.stop="success_status = false">Close</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 个人赛报名成功 end -->
				<!-- 添加战队 弹窗 -->
				<div class="create_team_play" v-if="create_status == true">
					<div class="mark_check" @click.stop="cancelAddTeam">
						<img src="@/assets/images/cancel.png" >
					</div>
					<div class="mark_bac"></div>
					<div class="mark_check_container">
						<div class="mark_my_content ">
							<div class="mark_text_one">Create team</div>
							<div class="mark_product_container">
								<div class="mark_product">
									<div class="create_right_form">
										<div class="create_form_logo">
											<div class="logo_upadte">
												<!-- <el-upload
													class="avatar-uploader"
													:action="HOST+'img/upload'"
													:show-file-list="false"
													:on-success="res => {return handleAvatarSuccess(res,'game_logo', 0);}"
													:before-upload="beforeAvatarUpload">
													<img class="avatar_w" src="../../assets/images/update2.png" alt="" v-if="game_form.teamLogo == ''">
													<img v-else :src="HOST + game_form.teamLogo"  class="avatar_y">
												</el-upload> -->
												<img v-else :src="HOST + game_form.teamLogo"  class="avatar_y" v-if="game_form.teamLogo">
												<img class="avatar_w" src="../../assets/images/update2.png" alt=""v-else @click="uploadPicture('flagImg')">
												<div class="cropper_img" v-if="cropper_status == true">
													<div class="mark_check" @click.stop="cropper_status = false">
														<img src="@/assets/images/cancel.png">
													</div>
													<div class="mark_bac"></div>
													<div class="cropper_img_content">
														<CropperImg :Name="cropperName" @uploadImgSuccess="handleUploadSuccess" ref="child">
														</CropperImg>
													</div>
												</div>
											</div>
											<div class="logo_info">Upload team logo ( 1:1 )</div>
										</div>
										<div class="form_user">
											<p class="form_username">Game</p>
											<div class="form_input_block">
												<img class="user_logo" :src="HOST + game_avatar" v-if="game_avatar">
												<img class="user_logo" src="../../assets/images/default_game.png" v-else />
												<el-select class="user_name" :popper-append-to-body="false" v-model="game_form.gameId"  @change="selectChanged" placeholder="Please select a game">
													<el-option v-for="item in game_list" :key="item.gameId" :label="item.gameName" :value="item.gameId">
													</el-option>
												</el-select>
											</div>
										</div>
										<div class="form_team">
											<p class="form_teamname">Team Name</p>
											<div class="form_input_block"><input type="text" class="input-left" v-model="game_form.teamName" /></div>
										</div>
										<div class="form_team">
											<p class="form_teamname">Team Slogan</p>
											<div class="team_input_block">
												<input type="text" class="input-left" v-model="game_form.teamSlogan" @input="team_slogan" maxlength="300" />
												<div class="limit_num">({{num}}/300)</div>
											</div>
										</div>
										<div class="form_team">
											<p class="form_teamname">About Team</p>
											<div class="area_input_block">
												<textarea rows="12" class="input-left" v-on:keyup="team_content" v-model="game_form.aboutTeam" maxlength="1000"></textarea>
												<div class="limit_num">({{text_num}}/1000)</div>
											</div>
										</div>
									</div>
												
								</div>
							</div>
						</div>
						<div class="mark_my_foot">
							<div class="confirm_btn" @click="add_team">Create</div>
							<div class="cancel_btn"@click.stop="cancelAddTeam">Cancel</div>
						</div>
					</div>
				</div>
				<!-- 添加战队 end -->
				<!-- Terms and conditions -->
				<div class="game_info" v-if="terms_status == true">
					<div class="mark_check"@click.stop="terms_status = false">
						<img src="@/assets/images/cancel.png" >
					</div>
					<div class="mark_bac"></div>
					<div class="mark_bac1" v-if="terms_status == true"></div>	<!-- 设置同级盒子 -->
					<div class="mark_check_container">
						<div class="mark_my_content ">
							<!-- <div class="mark_check_inset" v-if="detail_list.tournamentType == 0"  @click.stop="info_status = false">
								<img src="@/assets/images/cancel.png" >
							</div> -->
							<!-- <div class="mark_text_one">Does it cost {{detail_list.registeryFee || 0 }} {{detail_list.registeryFeeType}} to register for the competition?</div> -->
							<div class="mark_text_one">Terms and conditions</div>
							<div class="mark_product_container">
								<div class="mark_product">
									<div class="terms_content" v-html="analysisTermsUrl"></div>
								</div>
							</div>
							
						</div>
						<div class="mark_my_foot">
							<!-- <div class="confirm_btn" v-if="detail_list.tournamentType == 0" @click="jump_next">Next</div> -->
							<div class="confirm_btn" @click="terms_status = false">Close</div>
							<!-- <div class="cancel_btn"@click.stop="terms_status = false">Cancel</div> -->
						</div>
					</div>
				</div>
				<!-- Terms and conditions end-->
			</div>
			<!-- end -->
			<div class="container_bacolor">
				<div class="match_container">
					<div class="match_content">
						<div class="share_block" @click="copyLink">
							<img src="../../assets/images/share.svg" >
							<div class="share_text">分享</div>
						</div>
						<div class="desc_top">
							<div class="title_text">
								{{detail_list.tournamentName}}
							</div>
							<div class="regis_time">
								<div class="reg_time_left">Registration Deadline</div>
								<!-- <div class="reg_time_right">
									<img src="../../assets/images/time.png" alt="">
								</div> -->
								<div class="reg_time_down">
									<div class="down_block">
										<div class="down_text">DAYS</div>
										<div class="count_text">{{date}}</div>
									</div>
									<div class="down_spot">
										<div class="spot_in"></div>
										<div class="spot_in"></div>
									</div>
									<div class="down_block">
										<div class="down_text">HOURS</div>
										<div class="count_text">{{date1}}</div>
									</div>
									<div class="down_spot">
										<div class="spot_in"></div>
										<div class="spot_in"></div>
									</div>
									<div class="down_block">
										<div class="down_text">MINUTES</div>
										<div class="count_text">{{date2}}</div>
									</div>
									<!-- <div class="down_spot">
										<div class="spot_in"></div>
										<div class="spot_in"></div>
									</div>
									<div class="down_block">
										<div class="down_text">Seconds</div>
										<div class="count_text">{{date3}}</div>
									</div> -->
								</div>
							</div>
						</div>
						<!-- 版块head -->
						<div class="match_card_container">
							<div class="match_card">
								<div class="match_left"><img :src="HOST+detail_list.tournamentCover" /></div>
								<div class="match_right">
									<div class="match_flex_text" v-show="detail_list.registeryFee">
										<div class="text_left">Cost</div>
										<div class="text_right"></div>
									</div>
									<div class="match_flex">
										<div class="match_flex_left" v-show="detail_list.registeryFee">
											{{detail_list.registeryFee}} {{detail_list.registeryFeeType}}
										</div>
										<!-- <div class="match_flex_left">
											{{detail_list.registeryFee}} {{detail_list.registeryFeeType}}
										</div> -->
										<div class="match_flex_right">
											<div class="flex_right_img">
												<img src="../../assets/images/icon1.png" v-show="detail_list.tournamentCategory=='privately'"/>
												<img src="../../assets/images/icon0.png" v-show="detail_list.tournamentCategory=='officially'"/>
											</div>
											<div class="flex_right_img">
												<img src="../../assets/images/icon2.png" v-show="detail_list.tournamentType==0"/>
												<img src="../../assets/images/icon3.png" v-show="detail_list.tournamentType!='0'"/>
											</div>
										</div>
									</div>
									<div class="match_flex_text">
										<div class="text_left">Game Type</div>
										<div class="text_right">{{detail_list.gameName}}</div>
									</div>
									<div class="match_border"></div>
									<div class="match_flex_text" >
										<div class="text_left">Format</div>
										<div class="text_right">
											<!-- {{stage.format}} -->
										{{stage.format==1?'Single Elimination':stage.format==2?'Double Elimination':stage.format==3?'Round Robin':'Free For All'}}
										<span v-if="stage.format == 3">({{stage.groupSize || 0}} > {{stage.promotionSize || 0}})</span>
										</div>
									</div>
									<!-- <div class="match_flex_text">
										<div class="text_left">Best Of</div>
										<div class="text_right">1</div>
									</div> -->
									
									<div class="match_flex_text">
										<div class="text_left">Mode</div>
										<div class="text_right">{{detail_list.mode||0}} vs {{detail_list.mode||0}}</div>
									</div>
									<!-- <div class="match_flex_text">
										<div class="text_left">Maximum Number</div>
										<div class="text_right">{{detail_list.participantsSize}}</div>
									</div> -->
									<div class="match_border"></div>
									<div class="match_flex_text">
										<div class="text_left">Participants</div>
										<div class="text_right">( {{player_list_len || 0}} / {{detail_list.participantsSize||0}} )</div>
									</div>
									<div class="match_button" v-if="detail_list.status == 2 && player_list_len < detail_list.participantsSize && registered == false" @click="join_step(detail_list.tournamentType)">
										Join
									</div>
									<div class="match_button_gray" v-if="detail_list.status != 2 || player_list_len >= detail_list.participantsSize || registered == true">
										Join
									</div>
									<div class="match_content_text">
										Please read the terms and conditions first before you click the
										<span>JOIN</span> button, and we will treat you as agreed to our <span style="text-decoration: underline;cursor: pointer;" @click="terms_status = true">terms and
										conditions</span> once you <span>JOIN</span> our tournament.
									</div>
									<div class="match_flex_link" >
										<div class="text_left">
											<div class="link_icon" v-if="detail_list.faceBook" @click="jump_blank(detail_list.faceBook)"><img src="../../assets/images/icon4.png" /></div>
											<div class="link_icon" v-if="detail_list.instagram" @click="jump_blank(detail_list.instagram)"><img src="../../assets/images/icon5.png" /></div>
											<div class="link_icon_discord" v-if="detail_list.discord" @click="jump_blank(detail_list.discord)"><img src="../../assets/images/icon66.png"></div>
										</div>
										<div class="text_right" v-if="detail_list.liveUrl">
											<div class="text_over">{{detail_list.liveUrl}}</div>
											<div class="text_copy" :data-clipboard-text="detail_list.liveUrl" @click="copy">COPY</div>
										</div>
									</div>
								</div>
								
							</div>
							<!-- <div class="match_position" v-show="detail_list.state != '' || detail_list.state != null"> -->
							<div class="match_position" >
								<img src="../../assets/images/position.png" alt="" v-if="detail_list.state != ''">
							</div>
						</div>
						<div class="gameplayer_block">
							<div class="player_block_left">
								<div class="left_img_block">
									<img :src="HOST+mtem.teamLogo" v-for="(mtem,mndex) in contestant" :key="mndex" v-if="mndex < 4">
									<div class="circle_block">+{{additional}}</div>
								</div>
								<div class="left_text"><span>{{contestant.length}}</span> user have joined</div>
							</div>
							<div class="player_block_right" @click="jump_participants">View >></div>
						</div>
						<!-- 版块Step -->
						<div class="match_step">
							  <el-tabs :tab-position="tabPosition">
							    <el-tab-pane label="Description">
									<div class="description_container">
										<div class="desc_tit">{{detail_list.tournamentName}}</div>
										<div class="desc_time">Tournament will start at <span> {{initDete(detail_list.tournamentTime)}}</span></div>
										<div class="desc_border"></div>
										<div class="desc_content" v-html="analysisUrl"></div>
										<!-- <div class="desc_seat"></div> -->
									</div>
								</el-tab-pane>
							    <el-tab-pane label="Prize">
									<div class="Price_container">
										<div class="price_head">
											<div class="price_head_left">
												<div class="head_left_text">Total Value</div>
												<!-- <div class="head_left_money">500,000,000 USD</div> -->
												<div class="head_left_money">{{totalPrice}} MYR</div>
											</div>
											<div class="price_head_right">
												<div class="head_right_text">Prize Type</div>
												<div class="head_right_money">{{detail_list.rewards[0].rewardType==1?'Good':'Cash'}}</div>
											</div>
										</div>
										{{detail_list.reward}}
										<div class="price_list">
											<div class="price_list_block" v-for="(item,index) in detail_list.rewards" :key="index">
												<div class="price_block_left">
													<div class="price_position">
														<img v-show="item.ranking==1" src="../../assets/images/rank7.png" alt="">
														<img v-show="item.ranking==2" src="../../assets/images/rank8.png" alt="">
														<img v-show="item.ranking==3" src="../../assets/images/rank9.png" alt="">
													</div>
													<div class="prick_img">
														<img class="default_pic" v-if="item.rewardPicture == '' || item.rewardPicture == null" src="../../assets/images/default_pic.png" />
														<img v-else :src="HOST+item.rewardPicture" alt="" class="rel_img">
													</div>
													<div class="prick_text_block">
														<div class="prick_name">{{item.rewardName}}</div>
														<div class="prick_text">{{item.rewardPrice}}</div>
													</div>
													<div class="prick_text2">x {{item.quantity||0}}</div>
												</div>
												<div class="price_block_right">
													<div class="price_top">TOP {{item.ranking}}</div>
												</div>
											</div>
										</div>
									</div>
								</el-tab-pane>
							    <el-tab-pane label="Organizer">
									<div class="Organizer_container">
										
										<div class="organize_tit">Our Organizer</div>
										<div class="organize_content">
											<div class="organ_right_text" v-if="detail_list.tournamentCategory=='officially'" style="color: #999999;">
												This tournament is organized by platform itself. Click here for more information.
											</div>
											<div class="organize_block" v-if="detail_list.tournamentCategory!='officially'&&detail_list.organizer">
												<div class="organ_left">
													<el-image :src="HOST + detail_list.organizer.avatar" class="avatar_img">
														<div slot="error" class="image-slot"> 
															<img src="../../assets/images/default.png" class="avatar_img"/>
														</div>
													</el-image>
													<!-- <img :src="HOST+detail_list.organizer.avatar" alt=""> -->
												</div>
												<div class="organ_right">
													<div class="organ_right_tit">{{detail_list.organizer.fullName}}</div>
													<div class="organ_right_text" v-html="detail_list.organizer.aboutOrganizer"></div>
													<!-- <div class="organ_right_text">
														Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex
														ea commodo consequat.
													</div> -->
												</div>
											</div>
										</div>
									</div>
								</el-tab-pane>
							    <el-tab-pane label="Our Sponsor">
									<div class="Sponsor_container">
										
										<div class="sponsor_tit">Our Sponsor</div>
										<div class="sponsor_content">
											<div class="spon_block" v-for="(stem,spondex) in detail_list.sponsors" :key="spondex">
												<div class="spon_positon">
													<img src="../../assets/images/toum.png" alt="" v-if="stem.sponsorType=='Organise'">
													<img src="../../assets/images/toum2.png" alt="" v-if="stem.sponsorType=='Co-organise'">
												</div>
												<div class="span_img">
													<img :src="HOST + stem.sponsorLogo" alt="">
												</div>
												<div class="spon_foot">
													<div class="spon_text">{{stem.sponsorName}}</div>
												</div>
											</div>
										</div>
									</div>
								</el-tab-pane>
								<el-tab-pane label="Terms & Condition">
									<div class="Terms_container">
										<div class="terms_tit">Terms & Condition</div>
										<div class="terms_content" v-html="analysisTermsUrl"></div>
									</div>
								</el-tab-pane>
							  </el-tabs>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {tournamentSignup, tournamentDetail} from '@/api/tournament.js'
	import {userInfo} from '@/api/user_info.js'
	import {userList,teamUsers,addTeam,gameList} from '@/api/team';
	import {infoDetail} from '@/api/security.js'
	import CropperImg from '@/components/CropperImg/index.vue'
	export default {
		name: 'tournament',
		inject:['reload'],
		components:{
			CropperImg
		},
		data() {
			return {
				team_game_status:false,//团队赛报名
				person_status:false,//个人赛报名
				success_status:false,//恶人赛报名成功
				member_status:false,//战队成员弹窗
				info_status:false,//报名信息
				create_status:false,//添加团队
				agree_status:false,
				terms_status:false,//terms and conditions
				member_num:'',//选中的队伍id
				// swiper_list: [require('@/assets/images/bac6.png'), require('@/assets/images/bac6.png'), require('@/assets/images/bac6.png')],
				 tabPosition: 'left',
				 dialogFormVisible:false,
				 form:{
					 name:'',
					 team_Id:'',
					 user_Id:''
				 },
				 user_info:{},//用户信息
				 team_list:[],//我加入的战队
				 join_list:[],//未加入的战队
				 team_user:[],//战队成员
				 selected_userId_list:[],//选择的队员Id
				 unselected_userId_list:[],//未选择的队员ID
				 selected_user_list:[],//一个战队队员
				 selected_users_list:[],//选择的所有战队成员
				 team_info:{},
				 userIds:[],
				 detail_list: {},//赛事详情
				 player_list_len:'',//参赛的人数
				 date:'',
				 date1:'',
				 date2:'',
				 date3:'',
				 reward:[],
				 team_index:1,
				 listQuery: {
					type:1,  //1 我加入的 2 未加入的
					title:'',
					gameId:''
				 },
				 showText:false,
				 stage:'',
				 //添加战队弹窗
				 slogan: '',
				 starea: '',
				 num: 0, //简介数
				 text_num: 0, //公告数
				 game_form:{
				 	teamId:'',
				 	teamName:'',
				 	teamLogo:'',
				 	teamSlogan:'',
				 	aboutTeam:'',
				 	gameId:'',
				 	announcement:'',
				 },
				 game_list:'',//游戏列表
				 game_avatar:'',
				 params:'',
				 params1:'',
				 registered:false,
				 user_id:'',
				 player_block:0,
				 // total_rewardPrice:''
				 cropper_status: false,//剪裁上传的图片弹窗
				 formValidate: {
				 	mainImage: '',
				 },
				 ruleValidate: {
				 	mainImage: [{
				 		required: true,
				 		message: 'Please upload cover image',//请上传封面
				 		trigger: 'blur'
				 	}],
				 },
				 //裁切图片参数
				 cropperName: '',
				 imgName: '',
				 contestant:[],//参赛人员
				 additional:0,//额外的参赛人员
			}
		},
		mounted(){
			// console.log(sessionStorage.getItem('token'),"这里是token")
			// console.log(this.user_id)
			// 赛事详情
			this.getTournamentDetail()
			//判断是否有登录,有登陆再获取队伍信息
			if(sessionStorage.getItem("token")!='' && sessionStorage.getItem("token")!=null ){
				this.user_id = sessionStorage.getItem("userId")
				setTimeout(()=>{
					this.get_team()
				},1000)	
			}
			// this.get_user()
			
			// this.haveRegistered()
			// this.get_team_users()
			// this.TimeDown()
		},
		computed:{
			//解析Description中的http或https链接
			analysisUrl(){
				let introduction = this.detail_list.introduction
				// console.log(introduction,"introduction")
			    if(!introduction){
			        // console.log("test---analysisUrl-str is null");
			        return;
			    }
			    //先计算里面有多少个需要替换的链接
			    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
			    var htmlStr = introduction.replace(reg , `<a target=_blank style="color:#999999;text-decoration: underline;" href="$1$2"> $1$2 </a>` );
				// console.log(htmlStr,"html点击")
			    return htmlStr;
			},
			//解析Terms & Condition中的http或https链接
			analysisTermsUrl(){
				let terms = this.detail_list.terms
				// console.log(terms,"terms")
			    if(!terms){
			        // console.log("test---analysisUrl-str is null");
			        return;
			    }
			    //先计算里面有多少个需要替换的链接
			    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
			    var htmlTermsStr = terms.replace(reg , `<a target=_blank style="color:#999999;text-decoration: underline;" href="$1$2"> $1$2 </a>` );
				// console.log(htmlTermsStr,"html点击")
			    return htmlTermsStr;
			},
			//奖品总价
			totalPrice(){
				let total = 0
				for(let i=0; i<(this.detail_list.rewards).length;i++){
					total += (this.detail_list.rewards[i].rewardPrice * this.detail_list.rewards[i].quantity)
				}
				return total
			}
		},
		methods:{
			
			//faceBook、instagram、discord跳转
			jump_blank(url){
				window.open(url)
			},
			//报名状态点击跳转查看报名人员
			jump_participants(){
				//点击join,分享页未登录跳转到注册页不可参赛
				if(sessionStorage.getItem("token")!='' && sessionStorage.getItem("token")!=null ){
					let tournamentId = this.$route.query.id
					this.$router.push({path: '/tournament/participantm',query:{id:tournamentId,state:2}})
				}else{
					this.$router.push({ path: '/login/index?nav=2'})
				}
				
			},
			//复制链接
			copyLink(){
				let tournamentId = this.$route.query.id
				// 创建临时的input输入框
				var input = document.createElement("input");
				// 创建需要复制的链接文本
				//测试服
				// const url = "http://gamesclient.web.gdtuode.com/#/tournament/regis_Information?id="+tournamentId;
				//正式服
				const url = "https://user.bountee.com.my/#/tournament/regis_Information?id="+tournamentId;
				// 将需要复制的文本赋值到创建的input输入框中
				input.value = url; 
				// 将输入框暂时创建到实例里面
				document.body.appendChild(input); 
				// 选中输入框中的内容
				input.select(); 
				// 执行复制操作
				document.execCommand("Copy"); 
				// 最后删除实例中临时创建的input输入框，完成复制操作
				document.body.removeChild(input); 
				this.$message({
					type: 'success',
					message: 'Copied！'
				});
			},
			//封面设置
			uploadPicture(name) {
				this.cropperName = name;
				this.cropper_status = true;
			},
			//图片上传成功后
			handleUploadSuccess(data) {
				console.log(data)
				switch (data.name) {
					case 'flagImg':
						this.game_form.teamLogo = data.url
						break;
				}
				this.cropper_status = false;
			},
			TimeDown(statrDateStr, endDateStr) {
				let self = this;
				//结束时间
				var endDate = new Date(endDateStr);
				//当前时间
				var nowDate = new Date();
				//相差的总秒数
				var totalSeconds = parseInt((endDate - nowDate) / 1000);
				//天数
				var days = Math.floor(totalSeconds / (60 * 60 * 24));
				//取模（余数）
				var modulo = totalSeconds % (60 * 60 * 24);
				//小时数
				var hours = Math.floor(modulo / (60 * 60));
				modulo = modulo % (60 * 60);
				//分钟
				var minutes = Math.floor(modulo / 60);
				//秒
				var seconds = modulo % 60;
				//输出到页面
				self.date = days 
				self.date1 = hours 
				self.date2 =  minutes 
				self.date3 =  seconds
				if(days+hours+minutes+seconds <= 0){
					self.date = "00" 
					self.date1 = "00"
					self.date2 =  "00" 
					self.date3 =  "00"
				}else{
					// 延迟一秒执行自己
					setTimeout(function () {
						self.TimeDown(self.detail_list.registrationTimeStart, self.detail_list.registrationTimeEnd);
					}, 1000)
				}
			},
			//赛事详情
			getTournamentDetail(){
				let self = this;
				let params = {
					tournamentId : self.$route.query.id
				}
				tournamentDetail(params).then(function(res){
					res.data.registrationTimeEnd = self.initDete(res.data.registrationTimeEnd)
					res.data.registrationTimeStart = self.initDete(res.data.registrationTimeStart)
					self.TimeDown(res.data.registrationTimeStart,res.data.registrationTimeEnd)
					self.detail_list = res.data;
					self.player_list_len = (res.data.contestant).length;
					let stages_list = res.data.stages
					self.stage = stages_list[0]
					// console.log(res.data.registrationTimeStart)
					// console.log(res.data.registrationTimeEnd)
					//判断该用户是否已报名
					for(let r = 0; r < res.data.contestant.length; r++){
						if(res.data.contestant[r].teamId == sessionStorage.getItem("userId")){
							self.registered = true
							// console.log(self.registered)
						}else{
							// console.log(self.registered)
						}
					}
					if(self.detail_list.compulsory == true){
						// console.log("要替补")
						self.player_block = self.detail_list.mode + self.detail_list.substitute
					}else{
						// console.log("不要替补")
						self.player_block = self.detail_list.mode
					}
					self.contestant = res.data.contestant
					let addnum = self.contestant.length - 4
					if(addnum >= 0){
						self.additional = addnum
					}else{
						self.additional = 0
					}
					// console.log(self.contestant,"参赛人员")
				})
			},
			jump_free(index){
				let that = this;
				if(index == 1){
					that.$router.push({ path: '/tournament/bracket'})
				}else if(index == 2){
					that.$router.push({ path: '/tournament/participants'})
				}else if(index == 3){
					that.$router.push({ path: '/tournament/Information'})
				}else if(index == 4){
					that.$router.push({ path: '/tournament/standings'})
				}
			},
			// 用户端-用户详细信息-个人赛的用户信息
			get_user(){
				let params ={
					userId : sessionStorage.getItem("userId")
				}
				userInfo(params).then(res => {
					if(res.data.userInfo.userId == sessionStorage.getItem("userId")){
						this.user_info = res.data.userInfo
					}else{
						this.$message({
							type: 'waring',
							message: 'Failed to obtain！'//获取失败 
						});
					}
					
				})
			},
			//战队列表
			get_team() {
				this.listQuery.gameId = this.detail_list.gameId
				userList(this.listQuery).then(res => {
					this.team_list = res.data;
					console.log()
					// if(this.team_index == 1){
					// 	this.team_list = res.data;
					// }else{
					// 	this.join_list = res.data;
					// }
				})
			},
			///个人赛报名下一步
			jump_next(){
				if(this.detail_list.tournamentType == 0){
					if(this.agree_status == false){
						this.$message({
							type: 'warning',
							message: "Please accept the terms and conditions."
						});
					}else{
						this.info_status = false
						this.person_status = true
					}
				}else{
					if(this.agree_status == false){
						this.$message({
							type: 'warning',
							message: "Please accept the terms and conditions."
						});
					}else{
						this.info_status = false
						this.team_game_status = true
						this.agree_status = false
					}
				}
			},
			join_step(tournamentType){
				//点击join,分享页未登录跳转到注册页不可参赛
				if(sessionStorage.getItem("token")!='' && sessionStorage.getItem("token")!=null ){
					if(tournamentType == 0){
						this.info_status = true;
					}else{
						this.team_game_status = true
					}
				}else{
					this.$router.push({ path: '/login/index?nav=2'})
				}
				
			},
			//选择团队
			tab_team(teamId){
				this.member_num = teamId
			},
			//选择战队成员弹窗
			change_team_users(member_num){
				// console.log(member_num)
				if(member_num != '' && member_num != null){
					this.member_status = true
					this.team_game_status = false
					this.get_team_users(member_num)
				}else{
					this.$message({
						type:'warning',
						message:'Please pick a team！'
					})
				}
				// this.$router.push({ path: '/tournament/bracket'})
			},
			// 用户端-战队成员
			get_team_users(member_num){
				console.log(member_num)
				let team_Id = {
					teamId :member_num
				}
				// let team_Id = this.form.team_Id
				// console.log(team_Id)
				if(member_num == ''){
					this.showText = true
				}else{
					this.showText = false
					teamUsers(team_Id).then(res => {
						for(let i = 0; i < res.data.usrs.length; i++){
							res.data.usrs[i]['check'] = false;
						}
						this.team_user = res.data.usrs
						// console.log(this.team_user)
					})
				}
			},
			//点击选中的队员，消失，在原来的位置显示
			cancelUserMember(userId,sindex){
				// console.log(userId)
				// console.log(sindex)
				this.selected_users_list.splice(sindex,1)
				let arrIds = []
				arrIds = this.selected_userId_list
				for(let d=0; d < arrIds.length;d++){
					let undex = (arrIds).findIndex((arrIds) => arrIds[d] == userId)
					arrIds.splice(undex,1)
				}
				this.selected_userId_list = arrIds
				for(let s=0;s < this.team_user.length;s++){
					if(userId == this.team_user[s].userId){
						this.team_user[s]['check'] = false
						if(this.detail_list.compulsory == true){
							// console.log("要替补")
							this.player_block = (this.detail_list.mode + this.detail_list.substitute) - this.selected_users_list.length
						}else{
							// console.log("不要替补")
							this.player_block = this.detail_list.mode - this.selected_users_list.length
						}
						// console.log(this.team_user)
						
					}else{
					}
				}
			},
			//选择战队成员
			get_selected_user(member_num,userId){
				// console.log(userId)
				if((this.selected_userId_list).includes(userId)){
					this.selected_userId_list = (this.selected_userId_list).filter(function(ele){return ele != userId;})
				}else{
					this.selected_userId_list.push(userId)
					let team_Id = {
						teamId :member_num
					}
					teamUsers(team_Id).then(res => {
						this.team_user = res.data.usrs
						for(let i=0; i < this.team_user.length;i++){
							for(let j=0; j < this.selected_userId_list.length;j++){
								if(this.selected_userId_list[j] == this.team_user[i].userId){
									this.team_user[i]['check'] = true;
								}
							}
						}
						let arr = []
						for(let i = 0; i <  this.team_user.length; i++){
							if(this.team_user[i]['check']){
								arr.push(this.team_user[i])
							}
						}
						this.selected_users_list = arr
						if(this.detail_list.compulsory == true){
							// console.log("要替补")
							this.player_block = (this.detail_list.mode + this.detail_list.substitute) - this.selected_users_list.length
						}else{
							// console.log("不要替补")
							this.player_block = this.detail_list.mode - this.selected_users_list.length
						}
						// this.player_block = this.detail_list.mode - this.selected_users_list.length
					})
				}
				
			},
		
			//关闭选择战队成员弹窗
			close_teammember(){
				this.member_status = false
				this.info_status = false
				this.agree_status = false
				this.selected_userId_list = []
				this.selected_users_list = []
				if(this.detail_list.compulsory == true){
					// console.log("要替补")
					this.player_block = (this.detail_list.mode + this.detail_list.substitute)
				}else{
					// console.log("不要替补")
					this.player_block = this.detail_list.mode 
				}
				// this.player_block = this.detail_list.mode
			},
			//报名信息弹窗
			open_info_status(member_num){
				if(this.selected_users_list != '' && this.selected_users_list != null && this.selected_users_list != undefined){
					this.member_status = false
					this.info_status = true
					// let team_Id = member_num
					// console.log(team_Id)
					for(let i = 0; i< this.team_list.length;i++){
						if(this.team_list[i].teamId == member_num){
							this.team_info = this.team_list[i]
							// console.log(this.team_info)
						}
					}
				}else{
					this.$message({
						type:'warning',
						message:'Please select participants.'//请选择参赛成员
					})
				}
				
			},
			//赛事报名
			join_match(){
				let userIds = ''
				if(Array.prototype.isPrototypeOf(this.selected_userId_list)){
					userIds = this.selected_userId_list.join(',');
				}
				let params = {
					// teamId:this.form.team_Id,
					teamId:this.member_num,
					tournamentId:this.$route.query.id,
					userIds,
					registeryFee: this.detail_list.registeryFee
				}
				let params1 = {
					tournamentId:this.$route.query.id,
					userIds:sessionStorage.getItem('userId'),
					registeryFee: this.detail_list.registeryFee
				}
				if(this.detail_list.tournamentType==0){
					//个人赛报名
					tournamentSignup(params1).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: res.message
						});
						this.person_status = false
						this.success_status = true
						this.agree_status = false
						this.reload()
					})
				}else{
					//团队赛报名
					if(this.agree_status == false){
						this.$message({
							type: 'warning',
							message: "Please accept the terms and conditions."
						});
					}else{
						tournamentSignup(params).then(res => {
							// console.log(res)
							this.$message({
								type: 'success',
								message: res.message
							});
							this.team_game_status = false
							this.member_status = false
							this.info_status = false
							this.reload()
						})
						
					}
				}
			},
			//添加战队area
			jump_create(){
				this.create_status = true
				this.get_game();
			},
			// 游戏列表
			get_game() {
				gameList({size:0}).then(res => {
					const {
						list,total
					} = res.data
					this.game_list = list;
				})
			},
			selectChanged(value) {
				for (let i = 0; i < this.game_list.length; i++) {
					if(this.game_list[i].gameId == value){
						this.game_avatar = this.game_list[i].gameLogo
					}
				}
			},
			// 添加战队
			add_team(){
				let that  = this;
				let { teamName ,teamLogo ,teamSlogan ,aboutTeam , announcement, gameId} = that.game_form;
				if(teamName == '' || teamLogo == '' || teamSlogan == '' ||aboutTeam == '' || gameId == '' ){
					that.$message({
						message: 'Please complete all information!',
						type: 'warning'
					})
					return false
				} else {
					addTeam(that.game_form).then(res => {
						that.$message({
							message: res.message,
							type: 'success'
						})
						this.team_game_status = false
						this.create_status = false
						this.game_form.teamId = ''
						this.game_form.teamName = ''
						this.game_form.teamLogo = ''
						this.game_form.teamSlogan = ''
						this.game_form.aboutTeam = ''
						this.game_form.gameId = ''
						this.game_form.announcement = ''
						this.game_avatar = ''
						this.reload()
					})
				}
			},
			//取消添加战队
			cancelAddTeam(){
				this.create_status = false
				this.game_form.teamId = ''
				this.game_form.teamName = ''
				this.game_form.teamLogo = ''
				this.game_form.teamSlogan = ''
				this.game_form.aboutTeam = ''
				this.game_form.gameId = ''
				this.game_form.announcement = ''
				this.game_avatar = ''
				
			},
			// 上传成功
			handleAvatarSuccess(res,attr,index) {
				this.$loading({
				customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						message: res.message,
						type: 'success'
					});
					if(attr === 'game_logo'){
						this.game_form.teamLogo = res.data
					}
				}else{
					this.$message({
						message: res.message,
						type: 'error'
					});
				}
				
			},
			// 上传前
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
			team_content() {
				let self = this;
				this.text_num = this.game_form.aboutTeam.length
			},
			team_slogan() {
				this.num = this.game_form.teamSlogan.length
			},
			jump_create_team() {
				this.$router.push({path: '/tearm/create_team'})
			},
			jump_team() {
				this.$router.push({path: '/tearm/my_join_team'})
			},	
			//添加战队area  end
			//判断是否有参加该赛事
			// haveRegistered(){
				
			// },
			//关闭
			cancelClick(){
				// let that = this
				let arr = [];
				// that.selected_users_list = arr
				this.selected_users_list = arr;
				// console.log(this.selected_users_list);
				this.person_status = false;
				this.agree_status = false
			},
			// 复制
			copy() {  
				// console.log(111)
				let that = this
				var clipboard = new this.Clipboard('.text_copy');  
				clipboard.on('success', e => {
					that.$message({
						type: 'success',
						message:'Copied!'
					});
						// 释放内存  
						clipboard.destroy()  
				})  
				clipboard.on('error', e => {  
					// 不支持复制  
					// console.log('该浏览器不支持自动复制')  
					// 释放内存  
					clipboard.destroy()  
				})  
			},
		}
	};
</script>
<style scoped>
	/deep/.el-tabs__item {
	    padding: 0 20px;
	    height: 60px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    line-height: 60px;
	    display: inline-block;
	    list-style: none;
	    font-size: 14px;
	    font-weight: 500;
	    color: #999;
	    position: relative;
		border-right: 2px solid #333333;
	}
	/deep/.el-tabs--left .el-tabs__item.is-left {
	    text-align: left;
		font-family:'Roboto-Regular';
	}
	/deep/.el-tabs__item:hover {
	    color: #BF9D62;
	    cursor: pointer;
	}
	/deep/.el-tabs__item.is-active {
	    color: #BF9D62;
	}
	
	/deep/.el-tabs__active-bar {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 2px;
		background-color: #BF9D62;
		z-index: 1;
		-webkit-transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
		transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
		transition: transform .3s cubic-bezier(.645,.045,.355,1);
		transition: transform .3s cubic-bezier(.645,.045,.355,1), -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
		transition: transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);
		list-style: none;
	}
</style>
<style lang="less" scoped>
	.route{
		height: 100vh;
		position: absolute !important;;
		top: 0 !important;
		
	}
.index_background{
	// background-image: url(../../assets/images/bac8.png);
	background-size: 100%;
	background-color: #000;
	.container {
		.add_count_container{
			/deep/.el-dialog{
				width: 460px;
			}
			/deep/.el-dialog__title{
				font-size: 16px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
			}
			/deep/.el-form-item__label{
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}
			/deep/.el-form-item{
				/deep/ .fullname{
					.el-input__inner{
						border: 1px solid #ffffff;
					}
				}
			}
			
			/deep/.el-input__inner{
				width: 258px;
				height: 32px;
				border-radius: 2px;
				border: 1px solid #595959;
			}
			/deep/.el-dialog__body{
				padding: 24px 24px;
			}
			//战队
			.team_game{
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
					left: 130px;
					top: 150px;
					z-index: 999;
					// width: 753px;
					width: 1200px;
					padding: 48px 20px 31px 28px;
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
						margin: 0 50px 55px;
						.mark_text_one{
							font-family:'Quicksand-Bold';
						}
						.mark_product_container{
							width: 100%;
							height: 496px;
							overflow-y: scroll;
							margin-bottom: 28px;
							.search{
								padding: 0 20px;
								display: flex;
								align-items: center;
								justify-content: flex-end;
								// justify-content: space-between;
								.search_left{
									margin-right: 50px;
									input{
										width: 315px;
										height: 60px;
										background: #0E0F11;
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
										background: #D3AA53;
										border: none;
										border-radius: 22px;
										opacity: 1;
										position: relative;
										right: 50px;top: 4px;
										img{
											width: 22px;
											height: 22px;
										}
									}
								}
								.search_right{
									display: flex;
									align-items: center;
									margin-right: 20px;
									.creat_btn{
										width: 180px;
										height: 59px;
										color: #D3AA53;
										border: 1px solid #D3AA53;
										font-size: 20px;
										cursor: pointer;
										line-height: 59px;
										text-align: center;
										// background: #0E0F11;
										background-color: #1d2023;
										border-radius: 20px;
										font-family:'Roboto-Regular';
									}
									.what{
										width: 59px;
										height: 59px;
										border-radius: 20px;
										// background-color: #1d2023;
										background-color: rgba(112,112,112,0.3);
										margin-left: 20px;
										img{
											width: 59px;
											height: 59px;
										}
									}
								}
								
							}//search
							.mark_product{
								margin-top: 80px;
								width: 98%;
								// border: 1px solid #313538;
								border-radius: 22px;
								.my_team_container{
									display: flex;
									flex-wrap: wrap;
									justify-content: center;
									margin-left: 10px;
									.av{
										border: 1px solid #D3AA53;
									}
									.myam_block{
										width: 28%;
										cursor: pointer;
										background-color: #0E0F11;
										border-radius: 61px;
										margin: 0 25px 93px 25px;
										.myam_block_padding{
											position: relative;
											padding: 0px 39px 23px 39px;
											.myam_left{
												position: absolute;
												top: -50px;
												left: 0;
												right: 0;
												width: 163px;
												height: 163px;
												border-radius: 50%;
												background-color: #0E0F11;
												overflow: hidden;
												margin: 0 auto;
												display: flex;
												justify-content: center;
												align-items: center;
												.myan_left_in{
													width: 143px;
													height: 143px;
													border-radius: 50%;
													overflow: hidden;
													img{
														width: 100%;
														height: 100%;
														object-fit: cover;
													}
												}
												
											}
											.myam_right{
												padding-top: 137px;
												display: flex;
												flex-direction: column;
												.myam_tit{
													color: #FFFFFF;
													font-size: 22px;
													font-weight: 500;
													text-align: center;
													margin: 13px 0px 11px 0px;
													font-family:'Roboto-Regular';
												}
												.myam_version{
													color: #727272;
													font-size: 18px;
													line-height: 25px;
													overflow:hidden;
													text-overflow:ellipsis;
													display:-webkit-box;
													-webkit-box-orient:vertical;
													-webkit-line-clamp:3; 
													text-align: center;
													font-family:'Roboto-Regular';
												}
												.myam_botm{
													margin-top: 40px;
													display: flex;
													align-items: center;
													justify-content: space-between;
													.myam_btom_left{
														display: flex;
														.myam_img{
															width: 49px;
															height: 49px;
															border-radius: 18px;
															overflow: hidden;
															margin-right: 11px;
															img{
																width: 49px;
																height: 49px;
																object-fit: cover;
															}
														}
														.myam_num{
															width: 49px;
															height: 49px;
															line-height: 49px;
															color: #7C7C7C;
															font-size: 18px;
															overflow: hidden;
															border-radius: 18px;
															text-align: center;
															background-color: #303030;
														}
													}
												}
											}
										}
										
									}
									.myam_block:nth-child(4n){
										margin-right: 0;
									}
								}
								.join_team_container{
									display: flex;
									flex-wrap: wrap;
									margin-bottom: 60px;
									.join_block{
										width: 48.7%;
										cursor: pointer;
										background-color: #0E0F11;
										border-radius: 61px;
										margin: 0 40px 40px 0;
										.join_block_padding{
											display: flex;
											align-items: center;
											padding: 44px 28px 23px 47px;
											.join_left{
												width: 146px;
												height: 146px;
												border-radius: 50%;
												overflow: hidden;
												margin-right: 47px;
												img{
													width: 100%;
													height: 100%;
													object-fit: cover;
												}
											}
											.join_right{
												width: 70%;
												.join_tit{
													color: #FFFFFF;
													font-size: 22px;
													font-weight: 500;
													margin: 0px 0px 11px 0px;
												}
												.join_version{
													color: #727272;
													font-size: 19px;
													line-height: 25px;
													overflow:hidden;
													text-overflow:ellipsis;
													display:-webkit-box;
													-webkit-box-orient:vertical;
													-webkit-line-clamp:2; 
												}
												.join_botm{
													margin-top: 40px;
													display: flex;
													align-items: center;
													justify-content: space-between;
													.join_btom_left{
														display: flex;
														.join_img{
															width: 49px;
															height: 49px;
															border-radius: 18px;
															overflow: hidden;
															margin-right: 11px;
															img{
																width: 49px;
																height: 49px;
																object-fit: cover;
															}
														}
														.join_num{
															width: 49px;
															height: 49px;
															line-height: 49px;
															color: #7C7C7C;
															font-size: 18px;
															overflow: hidden;
															border-radius: 18px;
															text-align: center;
															background-color: #303030;
														}
													}
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
														font-family:'Roboto-Regular';
													}
												}
											}
										}
										
									}
									.join_block:nth-child(2n){
										margin-right: 0;
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
			//战队 end
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
					left: 130px;
					top: 150px;
					z-index: 999;
					// width: 753px;
					width: 1200px;
					padding: 48px 20px 51px 28px;
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
						margin: 0 50px 55px;
						.search{
							padding: 0 20px;
							position: absolute;
							right: -50px;
							top:35px;
							
							// justify-content: space-between;
							.search_left{
								margin-right: 50px;
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
									border-radius: 22px;
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
										.user_selected{
											// width: 200px;
											width: 17%;
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
			//报名信息\terms
			.game_info{
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
					// background:#F3D19E;
					// position: absolute;
					position: fixed;
					left: 0;
					top: 0;
					z-index: 88;
					
				}
				.mark_bac1{	//设置同级盒子使得页面可以滚动
					// width: 1800px;
					// height: 1900px;
					width: 100%;
					// height: 100%;
					min-height: 280vh;
					// background-color: #F20D0D;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 89;
				}
				.mark_check_container{
					position: absolute;
					left: 130px;
					top: 135px;
					z-index: 999;
					// width: 753px;
					width: 1200px;
					padding: 48px 20px 51px 28px;
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
						margin: 0 50px 55px;
						.mark_check_inset{
							position: absolute;
							right: 50px;
							top: 40px;
							img{
								width: 35px;
								height: 35px;
								cursor: pointer;
							}
							z-index: 999;
						}
						.mark_text_one{
							font-family:'Quicksand-Bold';
						}
						.mark_product_container{
							width: 100%;
							height: 516px;
							overflow-y: scroll;
							margin-bottom: 35px;
							.mark_product{
								margin-top: 20px;
								width: 95%;
								margin: 0 auto;
								// border: 1px solid #313538;
								border-radius: 22px;
								.terms_content{
									color: #999999;
									font-size: 17px;
									font-family:'Roboto-Regular';
									margin-bottom: 10px;
									// width: 95%;
									word-wrap: break-word;
									white-space: pre-wrap;
									text-align: left;
								}
								::v-deep{
									img{
										width: 100%;
										height: 100%;
									} 
								}
								.info_area{
									margin-top: 30px;
									width: 90%;
									display: flex;
									align-items: center;
									border: 1px solid #727272;
									border-radius: 40px;
									padding: 60px 10px 60px 80px;
									.block_left{
										width: 60%;
										// background-color: #00FF00;
										.game_title{
											color: #ffffff;
											font-size: 22px;
											text-align: left;
											font-family:'Roboto-Bold';
										}
										.game_content{
											color: #707070;
											font-size: 20px;
											text-align: left;
											margin: 40px 0;
											font-family:'Roboto-Regular';
										}
										.type_area{
											text-align: left;
											display: flex;
											align-items: center;
											font-family:'Roboto-Regular';
											.type_label{
												color: #D3AA53;
												font-size: 18px;
											}
											.type_text{
												color: #D3AA53;
												font-size: 20px;
												margin-left: 30px;
											}
										}
									}
									.block_right{
										width: 40%;
										text-align: center;
										// background-color: #ff0000;
										img{
											width: 200px;
											height: 300px;
											border-radius: 50px;
											object-fit: cover;
											object-fit: cover;
										}
									}
								}
								.team_area{
									width: 98%;
									margin-top: 40px;
									.label{
										text-align: left;
										color: #727272;
										font-size: 20px;
										font-family:'Roboto-Regular';
									}
									.team_info{
										display: flex;
										align-items: center;
										border: 1px solid #727272;
										margin-top: 10px;
										padding: 20px 0 20px 40px;
										border-radius: 20px;
										// padding: 20px 0;
										.team_logo{
											img{
												width: 60px;
												height: 60px;
												border-radius: 30px;
												object-fit: cover;
											}
										}
										.team_name{
											color: #ffffff;
											font-size: 20px;
											margin-left: 30px;
											font-family:'Roboto-Bold';
										}
									}
								}
								.agree_condition{
									display: flex;
									align-items: center;
									// margin-top: 20px ;
									margin: 20px 0 50px;
									font-family:'Roboto-Regular';
									.check_box{
										img{
											width: 30px;
											height: 30px;
										}
									}
									.contdition_text{
										color: #D3AA53;
										font-size: 18px;
										margin-left: 20px;
										span{
											color: #D3AA53;
											text-decoration: underline;
											font-weight: bold;
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
				//Check out 01弹窗  end
			}
			//报名信息 end
			//personal_play
			.personal_play{
				.mark_check{
					position: absolute;
					right: 80px;
					top: 80px;
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
					left: 357px;
					top: 270px;
					z-index: 999;
					width: 753px;
					padding: 50px 20px 70px 28px;
					background: #0E0F11;
					border-radius: 27px;
					overflow: hidden;
					display: flex;
					flex-flow: column;
					align-items: center;
					.mark_check_inset{
						position: absolute;
						right: 40px;
						top: 40px;
						img{
							width: 25px;
							height: 25px;
							cursor: pointer;
						}
						z-index: 999;
					}
					.mark_content{
						color: #ffffff;
						text-align: center;
						.mark_title{
							color: #D3AA53;	
							font-size: 20px;
							margin-bottom: 30px;
							font-family:'Quicksand-Bold';
						}
						.content_text{
							text-align: center;
							font-size: 18px;
							color: #666666;
							margin-bottom: 70px;
							display: flex;
							align-items: center;
							font-family:'Roboto-Regular';
							.label{
								margin-right:50px;
							}
							.player{
								color: #fff;
								font-size: 20px;
							}
							span{
								color: #ffffff;
								font-size: 20px;
								margin: 0 5px;
							}
						}
						.btn_area{
							display: flex;
							align-items: center;
							justify-content: center;
							.confirm_btn{
								cursor: pointer;
								background-color: #D3AA53;
								color: #000;
								border-radius: 25px;
								width: 160px;
								height: 50px;
								text-align: center;
								line-height: 50px;
								font-size: 16px;
								margin-right: 30px;
								font-family:'Roboto-Regular';
							}
							.cancel_btn{
								cursor: pointer;
								// background-color: #D3AA53;
								border: 1px solid #666666;
								border-radius: 25px;
								width: 160px;
								height: 50px;
								text-align: center;
								line-height: 50px;
								font-size: 16px;
								font-family:'Roboto-Regular';
							}
						}
					}
				}
				//Check out 01弹窗  end
			}
			//personal_play  end
			//添加战队
			.create_team_play{
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
					left: 130px;
					top: 150px;
					z-index: 999;
					// width: 753px;
					width: 1200px;
					padding: 48px 20px 31px 28px;
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
						margin: 0 50px 55px;
						.mark_text_one{
							font-family:'Quicksand-Bold';
						}
						.mark_product_container{
							width: 100%;
							// height: 496px;
							height: 550px;
							overflow-y: scroll;
							margin-bottom: 28px;
							.mark_product{
								margin-top: 80px;
								width: 98%;
								// border: 1px solid #313538;
								.create_right_form {
									width: 1140px;
									margin-left: 60px;
									margin-top: 43px;
								
									.create_form_logo {
										display: flex;
										align-items: center;
										margin-bottom: 31px;
								
										.logo_upadte {
											width: 146px;
											height: 146px;
											border-radius: 50%;
											background-color: #0E0F11;
											display: flex;
											align-items: center;
											justify-content: center;
											margin-right: 18px;
											font-family:'Roboto-Regular';
											.avatar_w{
												width: 31px;
												height: auto;
											}
											.avatar_y{
												width: 146px;
												height: 146px;
												border-radius: 50%;
											}
											.cropper_img {
												// width: 500px;
												// height: 500px;
												position: absolute;
												z-index: 99;
												top: 20px;
												left: 20%;
												.mark_check {
													position: fixed;
													right: 80px;
													top: 140px;
													img {
														width: 46px;
														height: 46px;
														cursor: pointer;
													}
													z-index: 999;
												}
												.mark_bac {
													width: 100%;
													height: 100vh;
													background: #000000b3;
													position: fixed;
													left: 0;
													top: 0;
													z-index: 88;
												}
												.cropper_img_content {
													padding: 80px;
													border-radius: 20px;
													// background-color: #0E0F11;
													background-color: #1D2023;
													position: absolute;
													z-index: 9999;
												}
											}
										}
								
										.logo_info {
											color: #727272;
											font-size: 20px;
											font-family:'Roboto-Regular';
										}
									}
								
									.form_user {
										width: 90%;
										margin-bottom: 39px;
										font-family:'Roboto-Regular';
										.form_username {
											color: #727272;
											font-size: 20px;
											margin: 10px 0 10px 0;
											text-align: left;
										}
								
										.form_input_block {
											width: 98%;
											height: 59px;
											display: flex;
											padding: 0 30px;
											background-color: #0E0F11;
											align-items: center;
											border-radius: 19px;
											color: #fff;
								
											.user_logo {
												width: 44px;
												height: 45px;
												object-fit: cover;
												margin-right: 33px;
											}
								
											.user_name {
												width: 100%;
												/deep/ .el-input .el-input__inner {
													width: 100%;
													border: 0px;
													height: 50px;
													color: #fff;
													font-family:'Roboto-Regular';
													background-color: #0E0F11;
													border: 1px solid #0E0F11;
												}
												
												/deep/ .el-select-dropdown {
													background-color: #0E0F11;
													border: 1px solid rgba(255,255,255,0.2);
												}
												
												/deep/ .el-icon-arrow-up:before {
													content: "";
												}
												
												/deep/ .el-icon-arrow-down:before {
													content: "";
												}
												//修改单个的选项的样式
												/deep/ .el-select-dropdown__item {
													background-color: transparent;
													color: #fff;
													font-family:'Roboto-Regular';
													text-align: left;
												}
												/deep/ .el-select-dropdown__item.hover{
													background-color: #1D2023;
												}
												/deep/ .el-select-dropdown__item.selected{
													background-color: #1D2023;
												}
											}
										}
									}
								
									.form_team {
										width: 90%;
										margin-bottom: 39px;
										font-family:'Roboto-Regular';
										.form_teamname {
											color: #727272;
											font-size: 20px;
											margin: 10px 0 10px 0;
											text-align: left;
										}
								
										.form_input_block {
											width: 98%;
											height: 59px;
											display: flex;
											padding: 0 30px;
											background-color: #0E0F11;
											align-items: center;
											border-radius: 19px;
											color: #fff;
								
											.input-left {
												width: 90%;
												height: 56px;
												color: #fff;
												border: none;
												background-color: #0e0f11;
												background: inherit;
												font-size: 20px;
												font-family:'Roboto-Regular';
											}
										}
								
										.team_input_block {
											width: 98%;
											height: 59px;
											display: flex;
											padding: 0 30px;
											background-color: #0E0F11;
											align-items: center;
											border-radius: 19px;
											position: relative;
											color: #fff;
											font-family:'Roboto-Regular';
											.input-left {
												width: 90%;
												height: 56px;
												color: #fff;
												border: none;
												background-color: #0e0f11;
												background: inherit;
												font-size: 20px;
												font-family:'Roboto-Regular';
											}
								
											.limit_num {
												position: absolute;
												right: 30px;
												color: #606060;
												font-size: 20px;
												font-family:'Roboto-Regular';
											}
										}
								
										.area_input_block {
											width: 98%;
											display: flex;
											padding: 20px 30px;
											background-color: #0E0F11;
											align-items: center;
											border-radius: 19px;
											position: relative;
											color: #fff;
											font-family:'Roboto-Regular';
											.input-left {
												width: 90%;
												color: #fff;
												height: 207px;
												border: none;
												background-color: #0e0f11;
												background: inherit;
												font-size: 20px;
												resize: none;
												font-family:'Roboto-Regular';
											}
								
											.limit_num {
												position: absolute;
												right: 30px;
												bottom: 20px;
												color: #606060;
												font-size: 20px;
												font-family:'Roboto-Regular';
											}
										}
								
									}
								
									.creat_team_btom {
										margin-top: 179px;
										margin: 90px 0 97px 0;
										display: flex;
										align-items: center;
								
										.invite_button {
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
											font-family:'Roboto-Regular';
										}
								
										.skip_button {
											width: 163px;
											height: 56px;
											color: #FFFFFF;
											font-size: 20px;
											cursor: pointer;
											line-height: 58px;
											text-align: center;
											border-radius: 25px;
											border: 1px solid #777777;
											font-family:'Roboto-Regular';
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
			//添加战队  end
		}
		.container_bacolor {
			width: calc(100% - 150px);
			display: flex;
			justify-content: space-between; /* 横向中间自动空间 */
			flex-wrap: wrap; /* 换行 */
			// width: 1293px;
			.match_container {
				margin-top: 160px;
				margin-left: 120px;
				.match_content {
					display: flex;
					flex-wrap: wrap;
					.share_block{
						display: flex;
						align-items: center;
						position: absolute;
						right: 130px;
						top: 180px;
						cursor: pointer;
						img{
							width: 20px;
							height: 20px;
						}
						.share_text{
							color:#D3AA53;
							font-size: 20px;
							margin-left: 10px;
						}
					}
					.desc_top{
						width: 100%;
						text-align: center;
						.title_text{
							// width: 330px;
							font-size: 30px;
							color: #fff;
							font-weight: 500;
							font-family:'Roboto-Bold';
							text-align: center;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.regis_time{
							display: flex;
							margin: 30px 0 30px 0;
							align-items: center;
							justify-content: center;
							.reg_time_left{
								color: #999999;
								font-size: 20px;
								margin-right: 17px;
								font-family:'Roboto-Regular';
								margin-top: 30px;
							}
							.reg_time_right{
								img{
									width: 282px;
									height: 93px;
								}
							}
							.reg_time_down{
								display: flex;
								align-items: center;
								.down_block{
									.down_text{
										color: rgb(255,178,103);
										font-size: 17px;
										margin-bottom: 15px;
										font-family:'Roboto-Regular';
									}
									.count_text{
										width: 82px;
										height: 75px;
										font-size: 40px;
										line-height: 75px;
										color: #fff;
										text-align: center;
										background: transparent radial-gradient(closest-side at 48% 17%, #333333 0%, #191919 100%) 0% 0% no-repeat padding-box;
										border-radius: 4px;
										font-family:'Roboto-Regular';
									}
								}
								.down_spot{
									margin: 45px 6px 0px 6px;
									.spot_in{
										width: 4px;
										height: 4px;
										margin-bottom: 10px;
										background: #E5E5E5;
										font-family:'Roboto-Regular';
									}
								}
							}
						}
					}
					.match_card_container{
						position: relative;
						.match_card {
							width: 100%;
							height: 617px;
							// background-color: #000000;
							background: #1c2023 0% 0% no-repeat padding-box;
							border: 2px solid #232323;
							border-radius: 16px;
							display: flex;
							overflow: hidden;
							.match_left {
								width: 50%;
								height: 617px;
								img {
									width: 100%;
									height: 617px;
									object-fit: fill;
								}
							}
							.match_right {
								width: 45%;
								// border: 1px solid #2D2D2D;
								padding: 21px 50px 0px 50px;
								.match_flex {
									display: flex;
									align-items: center;
									.match_flex_left {
										width: 170px;
										color: #fff;
										font-size: 32px;
										font-weight: bold;
									}
									.match_flex_right {
										display: flex;
										.flex_right_img {
											width: 55px;
											height: 57px;
											margin-right: 10px;
											img {
												width: 55px;
												height: 57px;
											}
										}
									}
								}
								.match_border{
									margin: 10px 0px;
									border-top: 1px solid #7F7F7F;
								}
								.match_flex_text {
									display: flex;
									align-items: center;
									line-height: 40px;
									.text_left {
										width: 170px;
										color: #bf9d62;
										font-size: 18px;
										font-family:'Roboto-Regular';
									}
									.text_right {
										color: #ffffff;
										font-size: 18px;
										font-family:'Roboto-Regular';
									}
								}
								.match_button{
									width: 100%;
									height: 60px;
									color: #1E1E1E;
									font-size: 21px;
									font-weight: 500;
									text-align: center;
									line-height: 60px;
									border-radius: 15px;
									background-color: #D3AA53;
									margin: 10px 0 20px 0;
									cursor: pointer;
									font-family:'Roboto-Medium';
								}
								.match_button_gray{
									width: 100%;
									height: 60px;
									color: #1E1E1E;
									font-size: 21px;
									font-weight: 500;
									text-align: center;
									line-height: 60px;
									border-radius: 15px;
									background-color: #727272;
									margin: 10px 0 20px 0;
									cursor: pointer;
									font-family:'Roboto-Medium';
								}
								.match_content_text{
									color: #999999;
									font-size: 18px;
									font-family:'Roboto-Regular';
									span{
										color: #fff;
										font-family:'Roboto-Bold';
									}
								}
								.match_flex_link {
									margin: 20px 0;
									display: flex;
									justify-content: space-between;
									.text_left {
										width: 210px;
										display: flex;
										align-items: center;
										.link_icon{
											width: 61px;
											height: 61px;
											margin-right: 10px;
											img {
												width: 100%;
												height: 100%;
												cursor: pointer;
											}
										}
										.link_icon_discord{
											// background-color: #FFFF00;
											width: 50px;
											height: 50px;
											margin-right: 10px;
											margin-bottom: 10px;
											img {
												width: 100%;
												height: 100%;
												cursor: pointer;
											}
										}
									}
									.text_right {
										width: 100%;
										height: 50px;
										line-height: 50px;
										border: 1px solid #333;
										border-radius: 15px;
										color: #D3AA53;
										background: inherit;
										padding: 0 20px;
										font-size: 17px;
										display: flex;
										align-items: center;
										justify-content: space-between;
										overflow: hidden;
										.text_over{
											// width: 80%;
											width: 320px;
											overflow: hidden;
											text-overflow:ellipsis;
											white-space: nowrap;
											letter-spacing: 1px;
										}
										.text_copy{
											// width: 200px;
											font-size: 19px;
											font-weight: bold;
											cursor: pointer;
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
										}
									}
								}
							}
						}
						//定位
						.match_position{
							position: absolute;
							right: -13px;
							top: -11px;
							img{
								width: 220px;
							}
						}
					}
					.gameplayer_block{
						width: 100%;
						height: 70px;
						// background-color: #000000;
						// background: #1c2023 0% 0% no-repeat padding-box;
						background-color: #000000;
						border: 2px solid #232323;
						border-radius: 16px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 30px 0;
						margin-top: 30px;
						.player_block_left{
							display: flex;
							align-items: center;
							
							.left_img_block{
								display: flex;
								align-items: center;
								img{
									width: 40px;
									height: 40px;
									border-radius: 50%;
									border: 1px solid #D3AA53;
								}
								.circle_block{
									width: 35px;
									height: 35px;
									border-radius: 50%;
									background-color: #D3AA53;
									color: #000000;
									font-size: 14px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
							}
							.left_text{
								font-size: 16px;
								color: #D3AA53;
								margin-left: 20px;
								span{
									font-weight: bold;
								}
							}
						}
						.player_block_right{
							// margin-right: 30px;
							color: #D3AA53;
							font-size: 18px;
							cursor: pointer;
						}
					}
					// 版块Step
					.match_step{
						width: 100%;
						// height: 1000px;
						margin: 100px 0px  150px  60px;
						// background-color: #FFFFFF;
						/deep/ .el-tabs--left{
							width: 1350px;
							/deep/ .el-tabs__content{
								width: 81%;
							}
						}
						
						.description_container{
							// background-color: #fff;
							// width: 100%;
							margin-left: 40px;
							.desc_tit{
								font-size: 21px;
								color: #fff;
								font-family:'Roboto-Bold';
								line-height: 27px;
								font-weight: bold;
							}
							.desc_time{
								color: #D3AA53;
								font-size: 18px;
								font-weight: 500;
								margin: 10px 0;
								span{
									font-family:'Roboto-Bold';
								}
							}
							.desc_border{
								margin: 10px 0px;
								border-top: 1px solid #7F7F7F;
							}
							.desc_content{
								// width: 95%;
								// width: 900px;
								color: #999999;
								font-family:'Roboto-Regular';
								font-size: 17px;
								word-wrap: break-word;
								white-space: pre-wrap;
								// height: 200px;
								// overflow-x: scroll;
								// overflow-y: 0;
							}
							::v-deep{
								img{
									max-width: 100%;
									height: 100%;
								} 
							}
						}
						.Price_container{
							margin-left: 40px;
							// margin-top: 100px;
							margin-bottom: 100px;
							.text{
								font-size: 16px;
								color: #999999;
								background-color:#000000;
								filter:Alpha(Opacity=15);opacity:0.15;
								padding: 30px 0;
							}
							.price_head{
								display: flex;
								margin-top: 40px;
								.price_head_left{
									margin-right: 150px;
									.head_left_text{
										color: #BF9D62;
										font-size: 17px;
										margin-bottom: 15px;
										font-family:'Roboto-Regular';
									}
									.head_left_money{
										color: #fff;
										font-size: 21px;
										font-family:'Roboto-Bold';
									}
								}
								.price_head_right{
									.head_right_text{
										color: #BF9D62;
										font-size: 17px;
										margin-bottom: 15px;
										font-family:'Roboto-Regular';
									}
									.head_right_money{
										color: #fff;
										font-size: 21px;
										font-family:'Roboto-Bold';
									}
								}
							}
							.price_list{
								margin-top: 25px;
								.price_list_block{
									background-color: #0E0F11;
									display: flex;
									justify-content: space-between;
									padding: 20px 0px 20px 20px;
									margin-bottom: 20px;
									.price_block_left{
										display: flex;
										align-items: center;
										position: relative;
										.price_position{
											position: absolute;
											left: -32px;
											top: -15px;
											img{
												width: 150px;												
											}
										}
										.prick_img{
											width: 255px;
											height: 169px;
											margin-right: 30px;
											.rel_img{
												width: 255px;
												height: 169px;
												object-fit:cover;	
											}
											.default_pic{
												width: 255px;
												height: 169px;
												object-fit:contain;
											}
										}
										.prick_text_block{
											.prick_name{
												color: #fff;
												font-size: 20px;
												font-weight: bold;
												margin-bottom: 10px;
												font-family:'Roboto-Bold';
											}
											.prick_text{
												color: #fff;
												font-size: 17px;
												font-family:'Roboto-Regular';
											}
										}
										.prick_text2{
											color: #BF9D62;
											font-size: 17px;
											padding-bottom: 26px;
											margin-left: 20px;
											font-family:'Roboto-Regular';
										}
									}
									.price_block_right{
										display: flex;
										align-items: center;
										.price_top{
											width: 100px;
											height: 50px;
											line-height: 50px;
											padding-left: 20px;
											color: #000;
											font-weight: bold;
											font-family:'Roboto-Bold';
											background-color: #BF9D62;
											font-size: 22px;
										}
									}
								}
							}
						}
						.Organizer_container{
							margin-left: 40px;
							// margin-top: 100px;
							.text{
								font-size: 16px;
								color: #999999;
								background-color:#000000;
								filter:Alpha(Opacity=15);opacity:0.15;
								padding: 30px 0 30px 40px;
								border-bottom: 1px solid #999999;
							}
							.organize_tit{
								font-size: 21px;
								color: #fff;
								line-height: 27px;
								margin-top: 40px;
								font-family:'Roboto-Bold';
							}
							.organize_content{
								margin-top: 30px;
								.organize_block{
									display: flex;
									.organ_left{
										width: 155px;
										height: 155px;
										border-radius: 25px;
										margin-right: 40px;
										.avatar_img{
											width: 155px;
											height: 155px;
										}
									}
									.organ_right{
										.organ_right_tit{
											color: #BF9D62;
											font-size: 20px;
											font-weight: bold;
											padding-bottom: 25px;
											border-bottom: 1px solid #2D2D2D;
											margin-bottom: 15px;
											font-family:'Roboto-Bold';
										}
										.organ_right_text{
											color: #999999;
											font-size: 17px;
											margin-bottom: 20px;
											font-family:'Roboto-Regular';
										}
									}
								}
							}
							.desc_time{
								color: #D3AA53;
								font-size: 18px;
								font-weight: 500;
								margin: 10px 0;
								span{
									font-family:'Roboto-Bold';
								}
							}
							.desc_border{
								margin: 10px 0px;
								border-top: 1px solid #7F7F7F;
							}
							.desc_content{
								color: #999999;
								font-family:'Roboto-Regular';
								font-size: 17px;
							}
							.desc_seat{
								width: 70%;
								height: 300px;
								background-color: #999;
								margin: 40px 0;
							}
						}
						.Sponsor_container{
							margin-left: 40px;
							.sponsor_tit{
								margin-top: 40px;
								font-size: 21px;
								color: #fff;
								line-height: 27px;
								font-family:'Roboto-Bold';
							}
							.sponsor_content{
								display: flex;
								flex-wrap: wrap;
								margin: 20px 0 150px 0;
								.spon_block{
									width: 22%;
									padding: 20px 1% 40px 1%;
									border-radius: 15px;
									overflow: hidden;
									background-color: #0E0F11;
									position: relative;
									margin-right: 1%;
									margin-bottom: 1%;
									.spon_positon{
										position: absolute;
										left: -12px;
										top:8px;
										img{
											width: 130px;
										}
									}
									.span_img{
										width: 100%;
										height: 200px;
										margin-top: 60px;
										display: flex;
										align-items: center;
										justify-content: center;
										img{
											width: 159px;
											height: 152px;
										}
									}
									.spon_foot{
										width: 80%;
										margin: 0 auto;
										padding: 20px 0 10px 0;
										text-align: center;
										border-bottom: 1px solid #2c2c2c;
										.spon_text{
											color: #757575;
											font-size: 18px;
											font-family:'Roboto-Regular';
										}
									}
								}
								.spon_block:nth-child(4n){
									margin-right: 0;
								}
							}
							
						}
						.Terms_container{
							margin-left: 40px;
							.terms_tit{
								margin-top: 40px;
								font-size: 21px;
								color: #fff;
								line-height: 27px;
								font-family:'Roboto-Bold';
								margin-bottom: 15px;
							}
							
							.terms_border{
								margin: 10px 0px;
								border-top: 1px solid #7F7F7F;
							}
							.terms_content{
								color: #999999;
								font-size: 17px;
								font-family:'Roboto-Regular';
								margin-bottom: 10px;
								// width: 95%;
								word-wrap: break-word;
								white-space: pre-wrap;
							}
							::v-deep{
								img{
									// width: 100%;
									// height: 100%;
								} 
							}
							.desc_seat{
								width: 70%;
								height: 300px;
								background-color: #999;
								margin: 40px 0;
							}
						}
					}
				}
			}
		}
	} //container
}
</style>
