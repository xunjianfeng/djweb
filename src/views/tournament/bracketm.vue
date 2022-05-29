<template>
	<div class="index index_background">
		<div class="container">
			<div class="container_bacolor">
				<div class="match_container">
					<div class="match_fix">
						<div class="match_content">
							<div class="desc_top">
								<div class="title_text">
									{{detail_list.tournamentName}}
								</div>
								<div class="title_nav">
									<div class="av" @click="jump_free(1)">Bracket</div>
									<div @click="jump_free(2)">Participants</div>
									<div @click="jump_free(3)">Information</div>
									<div @click="jump_free(4)" v-if="format > 2">Standings</div>
								</div>
							</div>
						</div>


					</div>

					<!-- 赛事行程 -->
					<!-- 版块head -->
					<div class="round_loop" v-if="format == 3">
						<div class="rounb_margin">
							<div :class="navs == 1 ? 'round_block av': 'round_block'" @click="tab_tabs(1)">Group Stage</div>
							<div :class="navs == 2 ? 'round_block av': 'round_block'" @click="tab_tabs(2)">Final Stage</div>
						</div>
					</div>
					<!-- <div class="round_tab" >
						<div class="rounb_margin">
							<div class="round_block" v-for="(item,index) in list.rounds" :key="index">{{item.roundName}}</div>
						</div>
					</div> -->
					<div class="round_tab"  v-if="format ==1  || format == 4 || (navs == 2 && format1 == 1)" ><!-- v-if="format != 3 " -->
						<div class="win_tabs_list" id="rounds_bo" ref="leftBoCont" @scroll="leftBoScroll()" @mouseover="changeFlag(false)">
							<div class="win_block"  v-for="(item,index) in list.rounds" :key="item.roundId" >
								<div class="win_block_top">{{item.roundName}}</div>
								<div class="win_block_btom">Bo {{item.best}}</div>
							</div>
						</div>
					</div>

					<!-- 双败 -->
					<div class="selection_step" v-if="format == 2">
						<!-- 胜利组 -->
						<div class="setp_round_two" >
							<div class="step_round_tit">
								Upper
								<div class="step_tit_border"></div>
							</div>
							<div class="round_tab2">
								<!-- <div class="rounb_margin2">
									<div class="round_block2" v-for="(item,index) in list.loserRounds" :key="index">{{item.roundName}}</div>
								</div> -->
								<div class="win_tabs_list" id="rounds_bo" ref="leftDoubleBoCont" @scroll="leftBoCont()" @mouseover="changeFlag(false)">
									<div class="win_block"  v-for="(item,index) in list.rounds" :key="item.roundId" >
										<div class="win_block_top">{{item.roundName}}</div>
										<div class="win_block_btom">Bo {{item.best}}</div>
									</div>
								</div>
							</div>
							<!-- 多线 -->
							<div class="selection_step_head" id="down_bo" ref="rightBoCont" @scroll="rightBoScroll()" @mouseover="changeFlag(true)">
								<div class="step_list_one" v-for="(item,index) in list.rounds" :key="index">
									<div class="step_list_block" v-for="(item1,index1) in item.roundLogVos" :ref="index + 'refs' + index1" :key="index1" :style="'padding-top:calc('+item1.padding_top+'vw);'">
										<div class="heightX" v-if="item1.roundLogId == undefined"></div>
										<div class="selection_block" v-else>
											<div class="select_top">
												<div class="select_top_left">
													<el-image :src="HOST + item1.teamLogoA" class="select_img">
														<div slot="error" class="image-slot">
															<img src="../../assets/images/default.png" class="default_img"/>
														</div>
													</el-image>
													<!-- <img class="select_img" :src="HOST + item1.teamLogoA"  v-if="item1.teamLogoA"> -->
													<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
													<el-tooltip class="item" effect="dark" :content="item1.teamNameA" placement="bottom">
														<div class="select_text">{{item1.teamNameA}}</div>
													</el-tooltip>
													<!-- <div class="select_text">{{item1.teamNameA}}</div> -->
												</div>
												<div class="select_top_right" :class="item1.aScore > item1.bScore?'select_color':''">
													{{item1.aScore}}
												</div>
											</div>
											<div class="select_bottom">
												<div class="select_top_left">
													<el-image :src="HOST + item1.teamLogoB" class="select_img">
														<div slot="error" class="image-slot">
															<img src="../../assets/images/default.png" class="default_img"/>
														</div>
													</el-image>
													<!-- <img class="select_img" :src="HOST + item1.teamLogoB"  v-if="item1.teamLogoB"> -->
													<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
													<el-tooltip class="item" effect="dark" :content="item1.teamNameB" placement="bottom">
														<div class="select_text">{{item1.teamNameB}}</div>
													</el-tooltip>
													<!-- <div class="select_text">{{item1.teamNameB}}</div> -->
												</div>
												<div class="select_top_right " :class="item1.aScore < item1.bScore?'select_color':''">
													{{item1.bScore}}
												</div>
											</div>
										</div>
										<div class="team_border" v-if="index!=0&&(item1['luckyAId']!=null&&item1['luckyBId']==null)||(index+1)==list.rounds.length" :style="'top:calc('+((item1.padding_top > 0 ? item1.padding_top:0) +2.083)+'vw);'"></div>
										<div class="round_multiline" v-if="index!=0&&(item1['luckyAId']==null&&item1['luckyBId']==null)&&(index+1)!=list.rounds.length"  :style="'top:calc('+item1.top+'vw);height:calc('+item1.height+'vw);'">
											<div class="multiline_border" :style="'top:calc(50% )'"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 失败组 -->
						<div class="setp_round_two" >
							<div class="step_round_tit">
								Loser
								<div class="step_tit_border"></div>
							</div>
							<!-- 版块head -->
							<div class="round_tab2">
								<div class="rounb_margin2" id="loserounds_bo" ref="leftLoserBoCont" @scroll="leftLoserBoCont()" @mouseover="changeFlag(false)">
									<div class="round_block2" v-for="(item,index) in list.loserRounds" :key="index">{{item.roundName}}</div>
								</div>
								<!-- <div class="win_tabs_list" id="loserounds_bo" ref="leftLoserBoCont" @scroll="leftLoserBoCont()" @mouseover="changeFlag(false)">
									<div class="win_block"  v-for="(item,index) in list.loserRounds" :key="item.roundId" >
										<div class="win_block_top">{{item.roundName}}</div>
										<div class="win_block_btom">Bo {{item.best}}</div>
									</div>
								</div> -->
							</div>
							<div class="selection_step_head" id="loserdown_bo" ref="rightLoserBoCont" @scroll="rightLoserBoCont()" @mouseover="changeFlag(true)">
								<div class="step_list_one" v-for="(item,index) in list.loserRounds" :key="index">
									<div class="step_list_block" v-for="(item1,index1) in item.roundLogVos" :ref="index + 'refs' + index1" :key="index1" :style="'padding-top:calc('+item1.padding_top+'vw);'">
										<div class="heightX" v-if="item1.roundLogId == undefined"></div>
										<div class="selection_block" v-else>
											<div class="select_top">
												<div class="select_top_left">
													<el-image :src="HOST + item1.teamLogoA" class="select_img">
														<div slot="error" class="image-slot">
															<img src="../../assets/images/default.png" class="default_img"/>
														</div>
													</el-image>
													<!-- <img class="select_img" :src="HOST + item1.teamLogoA" v-if="item1.teamLogoA"> -->
													<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
													<el-tooltip class="item" effect="dark" :content="item1.teamNameA" placement="bottom">
														<div class="select_text">{{item1.teamNameA}}</div>
													</el-tooltip>
													<!-- <div class="select_text">{{item1.teamNameA}}</div> -->
												</div>
												<div class="select_top_right" :class="item1.aScore > item1.bScore?'select_color':''">
													{{item1.aScore}}
												</div>
											</div>
											<div class="select_bottom">
												<div class="select_top_left">
													<el-image :src="HOST + item1.teamLogoB" class="select_img">
														<div slot="error" class="image-slot">
															<img src="../../assets/images/default.png" class="default_img"/>
														</div>
													</el-image>
													<!-- <img class="select_img" :src="HOST + item1.teamLogoB" v-if="item1.teamLogoB"> -->
													<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
													<el-tooltip class="item" effect="dark" :content="item1.teamNameB" placement="bottom">
														<div class="select_text">{{item1.teamNameB}}</div>
													</el-tooltip>
													<!-- <div class="select_text">{{item1.teamNameB}}</div> -->
												</div>
												<div class="select_top_right " :class="item1.aScore < item1.bScore?'select_color':''">
													{{item1.bScore}}
												</div>
											</div>
										</div>
										<div class="team_border" v-if="index!=0&&(item1['luckyAId']!=null&&item1['luckyBId']==null)||(index+1)==list.loserRounds.length" :style="'top:calc('+((item1.padding_top > 0 ? item1.padding_top:0) +2.083)+'vw);'"></div>
										<div class="round_multiline" v-if="index!=0&&(item1['luckyAId']!=null&&item1['luckyBId']!=null)&&(index+1)!=list.loserRounds.length"  :style="'top:calc('+item1.top+'vw);height:calc('+item1.height+'vw);'">
											<div class="multiline_border" :style="'top:calc(50% )'"></div>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
					<!-- 单败 -->
					<div class="selection_step" v-if="format == 1">
						<div class="setp_round_two" >
							<div class="selection_step_head" id="down_bo" ref="rightBoCont" @scroll="rightBoScroll()" @mouseover="changeFlag(true)">
								<!-- 多线 -->
								<div class="step_list_one" v-for="(item,index) in list.rounds" :key="index">
									<div class="step_list_block" v-for="(item1,index1) in item.roundLogVos" :ref="index + 'refs' + index1" :key="index1" :style="'padding-top:calc('+item1.padding_top+'vw);'">
										<div class="heightX" v-if="item1.roundLogId == undefined"></div>
										<div class="selection_block" v-else>
											<div class="select_top">
												<div class="select_top_left">
													<el-image :src="HOST + item1.teamLogoA" class="select_img">
														<div slot="error" class="image-slot">
															<img src="../../assets/images/default.png" class="default_img"/>
														</div>
													</el-image>
													<!-- <img class="select_img" :src="HOST + item1.teamLogoA"  v-if="item1.teamLogoA"> -->
													<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
													<el-tooltip class="item" effect="dark" :content="item1.teamNameA" placement="bottom">
														<div class="select_text">{{item1.teamNameA}}</div>
													</el-tooltip>
													<!-- <div class="select_text">{{item1.teamNameA}}</div> -->
												</div>
												<div class="select_top_right" :class="item1.aScore > item1.bScore?'select_color':''">
													{{item1.aScore}}
												</div>
											</div>
											<div class="select_bottom">
												<div class="select_top_left">
													<el-image :src="HOST + item1.teamLogoB" class="select_img">
														<div slot="error" class="image-slot">
															<img src="../../assets/images/default.png" class="default_img"/>
														</div>
													</el-image>
													<!-- <img class="select_img" :src="HOST + item1.teamLogoB"  v-if="item1.teamLogoB"> -->
													<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
													<el-tooltip class="item" effect="dark" :content="item1.teamNameB" placement="bottom">
														<div class="select_text">{{item1.teamNameB}}</div>
													</el-tooltip>
													<!-- <div class="select_text">{{item1.teamNameB}}</div> -->
												</div>
												<div class="select_top_right " :class="item1.aScore < item1.bScore?'select_color':''">
													{{item1.bScore}}
												</div>
											</div>
										</div>
										<div class="team_border" v-if="index!=0&&(item1['luckyAId']!=null&&item1['luckyBId']==null)" :style="'top:calc('+((item1.padding_top > 0 ? item1.padding_top:0) +2.083)+'vw);'"></div>
										<div class="round_multiline" v-if="index!=0&&(item1['luckyAId']==null&&item1['luckyBId']==null)"  :style="'top:calc('+item1.top+'vw);height:calc('+item1.height+'vw);'">
											<div class="multiline_border" :style="'top:calc(50% )'"></div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
					<!-- 自由模式 -->
					<div class="selection_step1" v-if="format == 4">
						<div class="step_list_one">
							<div class="step_list_block">
								<div class="selection_block">
									<div class="select_top" v-for="(item,index) in list" :key="index">
										<div class="select_top_left">
											<el-image :src="HOST + item.teamLogo" class="select_img">
												<div slot="error" class="image-slot">
													<img src="../../assets/images/default.png" class="default_img"/>
												</div>
											</el-image>
											<!-- <img class="select_img" :src="HOST + item.teamLogo" alt="" v-if="item.teamLogo"> -->
											<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
											<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
												<div class="select_text">{{item.teamName}}</div>
											</el-tooltip>
											<!-- <div class="select_text">{{item.teamName}}</div> -->
										</div>
										<div class="select_top_right" :class="index==0?'select_color':''">
											{{item.rank}}
										</div>
									</div>
									<div class="selection_border" :style="'height:'+25 * list.length+'px'">
										<div class="border_one"  :style="'height:'+25 * list.length+'px'">
											<div class="border_in"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="step_list_two" :style="'margin-top:'+9 * list.length+'px'">
							<div class="step_list_block">
								<div class="selection_block">
									<div class="select_top" v-for="(item,index) in list" :key="index" v-if="index < 3">
										<div class="select_top_left">
											<el-image :src="HOST + item.teamLogo" class="select_img">
												<div slot="error" class="image-slot">
													<img src="../../assets/images/default.png" class="default_img"/>
												</div>
											</el-image>
											<!-- <img class="select_img" :src="HOST + item.teamLogo" alt="" v-if="item.teamLogo"> -->
											<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
											<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
												<div class="select_text">{{item.teamName}}</div>
											</el-tooltip>
											<!-- <div class="select_text">{{item.teamName}}</div> -->
										</div>
										<div class="select_top_right" :class="index==0?'select_color':''">
											{{item.rank}}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 循环模式 -->
					<div class="selection_step2" v-if="format == 3">
						<!-- Group Stage -->
						<div class="event_group_tabs" v-if="navs == 1">
							<div class="group_table_block" v-if="group_tit_index == 1" v-for="(item,index) in detail_list.stages[0]['group']" :key="index">
								<div class="group_tabs_title">
									<div class="group_text">{{index}} Group</div>
									<div :class="group_tit_index == 1 ?'group_btn group_btn2':'group_btn' " @click="groupIndex(1)">Ranking</div>
									<div :class="group_tit_index == 2 ?'group_btn group_btn2':'group_btn' " @click="groupIndex(2)">Bracket</div>
								</div>
								<div class="group_tabs_table">
									<div class="group_table_top">
										<div class="group_top_block">Ranking</div>
										<div class="group_top_block2">Participants</div>
										<div class="group_top_block3">Tournament ( Win Draw Lose)</div>
										<div class="group_top_block3">Number of Win</div>
										<div class="group_top_block3">Number of draw</div>
										<div class="group_top_block3">Scoring</div>
										<div class="group_top_block2">History</div>
									</div>
									<div class="group_table_content">
										<div class="group_list" v-for="(gtem,gdex) in item" :key="gdex">
											<div class="group_btom_block">{{gtem.rank}}</div>
											<div class="group_btom_block2">
												<div class="group_radius">
													<el-image :src="HOST + gtem.logo" style="width:100%;max-height: 100%;object-fit: cover;">
														<div slot="error" class="image-slot">
															<img src="../../assets/images/default.png" style="width:100%;max-height: 100%;"/>
														</div>
													</el-image>
													<!-- <img style="width:100%;max-height: 100%;object-fit: cover;" :src="HOST + gtem.logo"/> -->
												</div>
												<el-tooltip class="item" effect="dark" :content="gtem.name" placement="bottom">
													<div class="group_radius_name">{{gtem.name}}</div>
												</el-tooltip>
												<!-- <div class="group_radius_name">{{gtem.name}}</div> -->
												<!-- {{gtem.name}} -->
											</div>
											<div class="group_btom_block3">{{gtem.win}}  - {{gtem.draw}} - {{gtem.lose}}</div>
											<div class="group_btom_block3">{{gtem.win}}</div>
											<div class="group_btom_block3">{{gtem.draw}}</div>
											<div class="group_btom_block3">{{gtem.score}}</div>
											<div class="group_btom_block2">
												<div class="group_status" v-if="gtem.history!=null" @mouseenter="showHistory(gtem.stageRankId)" @mouseleave="closeHistory(gtem.stageRankId)">
													<!-- <div :class="index1==0?'group_color':index1==1?'group_color2':'group_color3'" v-for="(item,index1) in gtem.history" :key="index1" >{{item}}</div> -->
													<!-- <div :class="gtem.history=='D'?'group_color':gtem.history == 'W'?'group_color2':'group_color3'" v-for="(item,index1) in gtem.history" :key="index1" >{{item}}</div> -->
													<!-- <div :class="gtem.history[index1]=='D'?'group_color':gtem.history[index1] == 'W'?'group_color2':'group_color3'" v-for="(item,index1) in gtem.history" :key="index1" >{{item}}</div> -->
													<div :class="gtem.history[0]=='D'?'group_color2':gtem.history[0] == 'W'?'group_color':'group_color3'" >{{gtem.history[0]}}</div>
													<div :class="gtem.history[1]=='D'?'group_color2':gtem.history[1] == 'W'?'group_color':'group_color3'" v-if="gtem.history.length>=2">{{gtem.history[1]}}</div>
													<div :class="gtem.history[2]=='D'?'group_color2':gtem.history[2] == 'W'?'group_color':'group_color3'" v-if="gtem.history.length>=3">{{gtem.history[2]}}</div>
													<div v-if="gtem.history.length>=4">……</div>
													<div class="group_status_area" v-if="gtem.group_status == true">
														<div :class="gtem.history[index1]=='D'?'group_color2':gtem.history[index1] == 'W'?'group_color':'group_color3'" v-for="(item,index1) in gtem.history" :key="index1" >{{item}}</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="grou_tabs_information" v-if="group_tit_index == 2" v-for="(item,index) in list.rounds" :key="index">
								<div class="group_tabs_title">
									<div class="group_text">{{index}} Group</div>
									<div :class="group_tit_index == 1 ?'group_btn group_btn2':'group_btn' " @click="groupIndex(1)">Ranking</div>
									<div :class="group_tit_index == 2 ?'group_btn group_btn2':'group_btn' " @click="groupIndex(2)">Bracket</div>
								</div>
								<div class="group_details">
									<div class="grounp_tabs_container" :id="appoint(index)" ref="leftCont" @scroll="leftScroll(index)" @mouseover="changeFlag(false)">
										<div class="group_tabs_list" >
											<!-- <div :class="activegroup == index1 ? 'group_block group_av' :'group_block'" v-for="(item1,index1) in item" :key="item1.roundId">{{item1.roundName}}</div> -->
											<div :class="activegroup == item1.roundId ? 'group_block group_av' :'group_block'" :id="'group_block'+index1" @click="tab_group(item1.roundId,index,index1)" v-for="(item1,index1) in item" :key="item1.roundId">{{item1.roundName}}</div>
										</div>
									</div>
									<div class="group_round_container" :id="appoint2(index)" ref="rightCont" @scroll="rightScroll(index)" @mouseover="changeFlag(true)">
										<div class="arrange_top">
											<div class="arrange_list_one" style="display: flex;align-items: center;flex-wrap: nowrap;"><!-- overflow-y: hidden; -->
												<div class="arrage_round_two" style="margin-right:20px" v-for="(item1,index1) in item" :key="index1" v-if="item1.log_status == false">
													<div class="round_block_two" v-for="(item2,index2) in item1.roundLogVos" :key="index2">
														<div class="team_top">
															<div class="team_left">
																<el-image :src="HOST + item2.teamLogoA" class="team_radius">
																	<div slot="error" class="image-slot">
																		<img src="../../assets/images/default.png" class="default_img"/>
																	</div>
																</el-image>
																<!-- <img class="team_radius" :src="HOST + item2.teamLogoA"  v-if="item2.teamLogoA"> -->
																<!-- <img class="team_radius" src="../../assets/images/default.png" v-else/> -->
																<el-tooltip class="item" effect="dark" :content="item2.teamNameA" placement="bottom">
																	<div class="team_name">{{item2.teamNameA}}</div>
																</el-tooltip>
																<!-- <div class="team_name">{{item2.teamNameA}}</div> -->
															</div>
															<div class="team_right">
																<div class="team_num">{{item2.aScore}}</div>
															</div>
														</div>
														<div class="team_btom">
															<div class="team_left">
																<el-image :src="HOST + item2.teamLogoB" class="team_radius">
																	<div slot="error" class="image-slot">
																		<img src="../../assets/images/default.png" class="default_img"/>
																	</div>
																</el-image>
																<!-- <img class="team_radius" :src="HOST + item2.teamLogoB"  v-if="item2.teamLogoB"> -->
																<!-- <img class="team_radius" src="../../assets/images/default.png" v-else/> -->
																<el-tooltip class="item" effect="dark" :content="item2.teamNameB" placement="bottom">
																	<div class="team_name">{{item2.teamNameB}}</div>
																</el-tooltip>
																<!-- <div class="team_name">{{item2.teamNameB}}</div> -->
															</div>
															<div class="team_right">
																<div class="team_num">{{item2.bScore}}</div>
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
						<!-- Final Stage -->
						<div class="event_final_tabs" v-if="navs == 2">
							<!-- {{format}} -->
							<!-- 双败 -->
							<div class="selection_step" v-if="format1 == 2">
								<!-- 胜利组 -->
								<div class="setp_round_two" >
									<div class="step_round_tit">
										Upper
										<div class="step_tit_border"></div>
									</div>
									<!-- <div class="rounb_margin2">
										<div class="round_block2" v-for="(item,index) in list.rounds" :key="index">{{item.roundName}}</div>
									</div> -->
									<div class="round_tab2">
										<div class="win_tabs_list" id="rounds_bo" ref="leftBoCont" @scroll="leftBoCont()" @mouseover="changeFlag(false)">
											<div class="win_block"  v-for="(item,index) in list.rounds" :key="item.roundId" >
												<div class="win_block_top">{{item.roundName}}</div>
												<div class="win_block_btom">Bo {{item.best}}</div>
											</div>
										</div>
									</div>
									<!-- 多线 -->
									<div class="selection_step_head" id="down_bo" ref="rightBoCont" @scroll="rightBoScroll()" @mouseover="changeFlag(true)">
										<div class="step_list_one" v-for="(item,index) in list.rounds" :key="index">
											<div class="step_list_block" v-for="(item1,index1) in item.roundLogVos" :ref="index + 'refs' + index1" :key="index1" :style="'padding-top:calc('+item1.padding_top+'vw);'">
												<div class="heightX" v-if="item1.roundLogId == undefined"></div>
												<div class="selection_block" v-else>
													<div class="select_top">
														<div class="select_top_left">
															<el-image :src="HOST + item1.teamLogoA" class="select_img">
																<div slot="error" class="image-slot">
																	<img src="../../assets/images/default.png" class="default_img"/>
																</div>
															</el-image>
															<!-- <img class="select_img" :src="HOST + item1.teamLogoA"  v-if="item1.teamLogoA"> -->
															<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
															<el-tooltip class="item" effect="dark" :content="item1.teamNameA" placement="bottom">
																<div class="select_text">{{item1.teamNameA}}</div>
															</el-tooltip>
															<!-- <div class="select_text">{{item1.teamNameA}}</div> -->
														</div>
														<div class="select_top_right" :class="item1.aScore > item1.bScore?'select_color':''">
															{{item1.aScore}}
														</div>
													</div>
													<div class="select_bottom">
														<div class="select_top_left">
															<el-image :src="HOST + item1.teamLogoB" class="select_img">
																<div slot="error" class="image-slot">
																	<img src="../../assets/images/default.png" class="default_img"/>
																</div>
															</el-image>
															<!-- <img class="select_img" :src="HOST + item1.teamLogoB"  v-if="item1.teamLogoB"> -->
															<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
															<el-tooltip class="item" effect="dark" :content="item1.teamNameB" placement="bottom">
																<div class="select_text">{{item1.teamNameB}}</div>
															</el-tooltip>
															<!-- <div class="select_text">{{item1.teamNameB}}</div> -->
														</div>
														<div class="select_top_right " :class="item1.aScore < item1.bScore?'select_color':''">
															{{item1.bScore}}
														</div>
													</div>
												</div>
												<div class="team_border" v-if="index!=0&&(item1['luckyAId']!=null&&item1['luckyBId']==null)||(index+1)==list.rounds.length" :style="'top:calc('+((item1.padding_top > 0 ? item1.padding_top:0) +2.083)+'vw);'"></div>
												<div class="round_multiline" v-if="index!=0&&(item1['luckyAId']==null&&item1['luckyBId']==null)&&(index+1)!=list.rounds.length"  :style="'top:calc('+item1.top+'vw);height:calc('+item1.height+'vw);'">
													<div class="multiline_border" :style="'top:calc(50% )'"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- 失败组 -->
								<div class="setp_round_two" >
									<div class="step_round_tit">
										Loser
										<div class="step_tit_border"></div>
									</div>
									<!-- 版块head -->
									<div class="round_tab2">
										<!-- <div class="rounb_margin2">
											<div class="round_block2" v-for="(item,index) in list.loserRounds" :key="index">{{item.roundName}}</div>
										</div> -->
										<div class="win_tabs_list" id="loserounds_bo" ref="leftLoserBoCont" @scroll="leftLoserBoCont()" @mouseover="changeFlag(false)">
											<div class="win_block"  v-for="(item,index) in list.loserRounds" :key="item.roundId" >
												<div class="win_block_top">{{item.roundName}}</div>
												<div class="win_block_btom">Bo {{item.best}}</div>
											</div>
										</div>
									</div>
									<div class="selection_step_head"  id="loserdown_bo" ref="rightLoserBoCont" @scroll="rightLoserBoCont()" @mouseover="changeFlag(true)">
										<div class="step_list_one" v-for="(item,index) in list.loserRounds" :key="index">
											<div class="step_list_block" v-for="(item1,index1) in item.roundLogVos" :ref="index + 'refs' + index1" :key="index1" :style="'padding-top:calc('+item1.padding_top+'vw);'">
												<div class="heightX" v-if="item1.roundLogId == undefined"></div>
												<div class="selection_block" v-else>
													<div class="select_top">
														<div class="select_top_left">
															<el-image :src="HOST + item1.teamLogoA" class="select_img">
																<div slot="error" class="image-slot">
																	<img src="../../assets/images/default.png" class="default_img"/>
																</div>
															</el-image>
															<!-- <img class="select_img" :src="HOST + item1.teamLogoA"  v-if="item1.teamLogoA"> -->
															<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
															<el-tooltip class="item" effect="dark" :content="item1.teamNameA" placement="bottom">
																<div class="select_text">{{item1.teamNameA}}</div>
															</el-tooltip>
															<!-- <div class="select_text">{{item1.teamNameA}}</div> -->
														</div>
														<div class="select_top_right" :class="item1.aScore > item1.bScore?'select_color':''">
															{{item1.aScore}}
														</div>
													</div>
													<div class="select_bottom">
														<div class="select_top_left">
															<el-image :src="HOST + item1.teamLogoB" class="select_img">
																<div slot="error" class="image-slot">
																	<img src="../../assets/images/default.png" class="default_img"/>
																</div>
															</el-image>
															<!-- <img class="select_img" :src="HOST + item1.teamLogoB"  v-if="item1.teamLogoB"> -->
															<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
															<el-tooltip class="item" effect="dark" :content="item1.teamNameB" placement="bottom">
																<div class="select_text">{{item1.teamNameB}}</div>
															</el-tooltip>
															<!-- <div class="select_text">{{item1.teamNameB}}</div> -->
														</div>
														<div class="select_top_right " :class="item1.aScore < item1.bScore?'select_color':''">
															{{item1.bScore}}
														</div>
													</div>
												</div>
												<div class="team_border" v-if="index!=0&&(item1['luckyAId']!=null&&item1['luckyBId']==null)||(index+1)==list.loserRounds.length" :style="'top:calc('+((item1.padding_top > 0 ? item1.padding_top:0) +2.083)+'vw);'"></div>
												<div class="round_multiline" v-if="index!=0&&(item1['luckyAId']!=null&&item1['luckyBId']!=null)&&(index+1)!=list.loserRounds.length"  :style="'top:calc('+item1.top+'vw);height:calc('+item1.height+'vw);'">
													<div class="multiline_border" :style="'top:calc(50% )'"></div>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>
							<!-- 单败 -->
							<div class="selection_step" v-if="format1 == 1">
								<div class="setp_round_two" >
									<div class="selection_step_head" id="down_bo" ref="rightBoCont" @scroll="rightBoScroll()" @mouseover="changeFlag(true)">
										<!-- 多线 -->
										<div class="step_list_one" v-for="(item,index) in list.rounds" :key="index">
											<div class="step_list_block" v-for="(item1,index1) in item.roundLogVos" :ref="index + 'refs' + index1" :key="index1" :style="'padding-top:calc('+item1.padding_top+'vw);'">
												<div class="heightX" v-if="item1.roundLogId == undefined"></div>
												<div class="selection_block" v-else>
													<div class="select_top">
														<div class="select_top_left">
															<el-image :src="HOST + item1.teamLogoA" class="select_img">
																<div slot="error" class="image-slot">
																	<img src="../../assets/images/default.png" class="default_img"/>
																</div>
															</el-image>
															<!-- <img class="select_img" :src="HOST + item1.teamLogoA"  v-if="item1.teamLogoA"> -->
															<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
															<el-tooltip class="item" effect="dark" :content="item1.teamNameA" placement="bottom">
																<div class="select_text">{{item1.teamNameA}}</div>
															</el-tooltip>
															<!-- <div class="select_text">{{item1.teamNameA}}</div> -->
														</div>
														<div class="select_top_right" :class="item1.aScore > item1.bScore?'select_color':''">
															{{item1.aScore}}
														</div>
													</div>
													<div class="select_bottom">
														<div class="select_top_left">
															<el-image :src="HOST + item1.teamLogoB" class="select_img">
																<div slot="error" class="image-slot">
																	<img src="../../assets/images/default.png" class="default_img"/>
																</div>
															</el-image>
															<!-- <img class="select_img" :src="HOST + item1.teamLogoB"  v-if="item1.teamLogoB"> -->
															<!-- <img class="select_img" src="../../assets/images/default.png" v-else/> -->
															<el-tooltip class="item" effect="dark" :content="item1.teamNameB" placement="bottom">
																<div class="select_text">{{item1.teamNameB}}</div>
															</el-tooltip>
															<!-- <div class="select_text">{{item1.teamNameB}}</div> -->
														</div>
														<div class="select_top_right " :class="item1.aScore < item1.bScore?'select_color':''">
															{{item1.bScore}}
														</div>
													</div>
												</div>
												<div class="team_border" v-if="index!=0&&(item1['luckyAId']!=null&&item1['luckyBId']==null)" :style="'top:calc('+((item1.padding_top > 0 ? item1.padding_top:0) +2.083)+'vw);'"></div>
												<div class="round_multiline" v-if="index!=0&&(item1['luckyAId']==null&&item1['luckyBId']==null)"  :style="'top:calc('+item1.top+'vw);height:calc('+item1.height+'vw);'">
													<div class="multiline_border" :style="'top:calc(50% )'"></div>
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
		</div>
	</div>
</template>
<script>
import {
	roundLog,
	tournamentDetail
} from '@/api/tournament'
export default {
	name: 'round_bracket',
	data() {
		return {
			list:[],
			format:3,
			round_index:1,
			detail_list:[],
			num: 0,
			heightx: [],
			group_tit_index:1,
			activegroup:0,
			navs:1,
			format1:1,
			flag: false, // 滚动标识，防止改变scrollLeft时重复触发scroll事件
		};
	},
	mounted(){
		// this.roundLog();
		this.getTournamentDetail();
	},
	methods:{
		changeFlag(flag) {
			this.flag = flag
		},
		//定义Id
		appoint(index){
			return "appoint"+index;
		},
		//定义Id
		appoint2(index){
			return "appoint2"+index;
		},
		//双败模式上下同步滚动-轮数滚动控制内容区滚动
		leftLoserBoCont(){
			if (!this.flag) {
				// 滚动到指定位置
				this.$nextTick(() => {
					//轮数滚动条
					let loserounds_bo = document.querySelector('#loserounds_bo')
					//对阵内容区滚动条
					let loserdown_bo = document.querySelector('#loserdown_bo')
					//获取轮数滚动条滚动的距离
					let sLeft = loserounds_bo.scrollLeft
					//实现同步滚动，将轮数滚动条的滚动距离赋值给对阵内容区
					loserdown_bo.scrollLeft = sLeft
				 })
			}
		},
		//双败模式上下同步滚动-内容滚动控制轮数滚动
		rightLoserBoCont(){
			if (this.flag) {
				this.$nextTick(() => {
					let loserounds_bo = document.querySelector('#loserounds_bo')
					let loserdown_bo = document.querySelector('#loserdown_bo')
					let sLeft = loserdown_bo.scrollLeft
					loserounds_bo.scrollLeft = sLeft
				 })
			}
		},
		//单败模式上下同步滚动-轮数滚动控制内容区滚动
		leftBoScroll(){
			if (!this.flag) {
				// 滚动到指定位置
				this.$nextTick(() => {
					//轮数滚动条
					let rounds_bo = document.querySelector('#rounds_bo')
					//对阵内容区滚动条
					let down_bo = document.querySelector('#down_bo')
					//获取轮数滚动条滚动的距离
					let sLeft = rounds_bo.scrollLeft
					//实现同步滚动，将轮数滚动条的滚动距离赋值给对阵内容区
					down_bo.scrollLeft = sLeft
				 })
			}
		},
		// 单败模式上下同步滚动-内容区滚动控制轮数滚动
		rightBoScroll(){
			if (this.flag) {
				this.$nextTick(() => {
					let rounds_bo = document.querySelector('#rounds_bo')
					let down_bo = document.querySelector('#down_bo')
					let sLeft = down_bo.scrollLeft
					rounds_bo.scrollLeft = sLeft
				 })
			}
		},
		// 循环莫事对阵详情上下滚动条滚动同步
		leftScroll(index) {
			if (!this.flag) {
				// 滚动到指定位置
				this.$nextTick(() => {
					//轮数滚动条
					let appoint = document.querySelector('#appoint'+index)
					//对阵内容区滚动条
					let appoint2 = document.querySelector('#appoint2'+index)
					//获取轮数滚动条滚动的距离
					let sLeft = appoint.scrollLeft
					//实现同步滚动，将轮数滚动条的滚动距离赋值给对阵内容区
					appoint2.scrollLeft = sLeft

				 })
		    }
		},
		// 循环莫事对阵详情上下滚动条滚动同步
		rightScroll (index) {
		    if (this.flag) {
				this.$nextTick(() => {
					let appoint = document.querySelector('#appoint'+index)
					let appoint2 = document.querySelector('#appoint2'+index)
					let sLeft = appoint2.scrollLeft
					appoint.scrollLeft = sLeft
				 })
			}
		},

		showHistory(stageRankId){
			// console.log("有反应")
			// console.log(stageRankId)
			let that = this
			for(let b in that.detail_list.stages[0]['group']){
				for(let c = 0; c < that.detail_list.stages[0]['group'][b].length;c++){
					if(that.detail_list.stages[0]['group'][b][c].stageRankId == stageRankId){
						that.detail_list.stages[0]['group'][b][c]['group_status'] = ! that.detail_list.stages[0]['group'][b][c]['group_status']
					}else{
						// console.log("有问题")
					}
				}
			}
		},
		tab_tabs(index) {
			this.navs = index
			if(index == 2){
				let {id,format,group} = this.detail_list.stages[1]
				this.roundLog(id,format,group)
			}else if(index == 1){
				let {id,format,group} = this.detail_list.stages[0]
				this.roundLog(id,format,group)
			}
			for(let h in this.list.rounds){
				for(let g=0; g < this.list.rounds[h].length;g++){
					this.list.rounds[h][g]['log_status'] = false
				}
			}
		},
		//循环模式/对阵情况
		tab_group(roundId,index,index1){
			this.activegroup = roundId
			this.$nextTick(() => {
				// 轮数
				let block = document.querySelector('#group_block'+index1)
				let appoint = document.querySelector('#appoint'+index)
				//对阵内容区
				let appoint2 = document.querySelector('#appoint2'+index)
				//获取第几轮的块离最左边的距离，第一块轮数距离最左边107
				let blockLeft = block.offsetLeft
				appoint.scrollLeft = blockLeft - 250
				// 点击第几轮对阵内容区就定位到哪里
				appoint2.scrollLeft = blockLeft	- 200
			 })

		},
		//循环模式切换排行榜/对阵详情
		groupIndex(index){
			this.group_tit_index = index
		},
		roundLog(stageId,format,group){
			let that = this;
			// 8双败
			// 9循环
			// 10单败
			// 34自由
			roundLog({stageId}).then(res => {
				if(format == 3){
					for(var item in group){
						for(let i = 0 ; i < group[item].length; i++){
							if(item.history!=null){
								let arr = []
								arr.push(group[item][i].history.charAt(0),group[item][i].history.charAt(1),group[item][i].history.charAt(2))
								group[item][i].history = arr
							}
						}
					}
				}
				if(format == 1 || format == 2){
					let { rounds,loserRounds } = res.data;
					// 判断luckyAB都有值得情况下上一个不连线
					for(let i = rounds.length-1 ; i >= 0; i--){
						let he = 0;
						for(let j = 0 ; j < rounds[i]['roundLogVos'].length; j++){
							if(i == 0){
								he += 1;
								rounds[i]['roundLogVos'][j]['max_he'] = he
							}else if(rounds[i]['roundLogVos'][j]['luckyAId'] != null && rounds[i]['roundLogVos'][j]['luckyBId'] != null){
								rounds[i-1]['roundLogVos'].splice(he,0, {});
								he += 1;
							}else if(rounds[i]['roundLogVos'][j]['luckyAId'] != null || rounds[i]['roundLogVos'][j]['luckyBId'] != null){
								he += 1;
							}else if(i == rounds.length-1){
								if(format == 1){
									he += 2;
								}else if(format == 2){
									he += 1;
								}
							}else{
								he += 2;
							}
							rounds[i]['roundLogVos'][j]['he'] = he
						}
					}
					for(let i = 1 ; i < rounds.length; i++){
						for(let j = 0 ; j < rounds[i]['roundLogVos'].length; j++){
							let he = rounds[i]['roundLogVos'][j]['he'];
							let top = 0;
							let max_he = 0;
							let height = 5.729;

							if(rounds[i]['roundLogVos'][j]['luckyAId'] != null && rounds[i]['roundLogVos'][j]['luckyBId'] != null){
								max_he = rounds[i-1]['roundLogVos'][he-1]['max_he']
							}
							else if(rounds[i]['roundLogVos'][j]['luckyAId'] != null || rounds[i]['roundLogVos'][j]['luckyBId'] != null){
								max_he = rounds[i-1]['roundLogVos'][he-1]['max_he']
							}else if(i == rounds.length-1){
								if(format == 1){
									if(rounds[i-1]['roundLogVos'].length == 1){
										max_he = 0
									}else{
										max_he = ((rounds[i-1]['roundLogVos'][he-1]['max_he'] + rounds[i-1]['roundLogVos'][he-2]['max_he']) / 2)
									}
								}else if(format == 2){
									max_he = rounds[i-1]['roundLogVos'][he-1]['max_he']
								}
							}else{
								max_he = ((rounds[i-1]['roundLogVos'][he-1]['max_he'] + rounds[i-1]['roundLogVos'][he-2]['max_he']) / 2)
							}
							let zz_he = max_he;
							if(j == 0 && max_he == 1){
								zz_he -= 1;
							}else if(j!=0){
								zz_he -= rounds[i]['roundLogVos'][j-1]['max_he']
								if(zz_he<=1)
									zz_he = 0;
							}
							let padding_top = zz_he * 5.729 - 5.729;
							if(rounds[i]['roundLogVos'][j]['luckyAId'] != null && rounds[i]['roundLogVos'][j]['luckyBId'] != null){

							}else if(rounds[i]['roundLogVos'][j]['luckyAId'] != null || rounds[i]['roundLogVos'][j]['luckyBId'] != null){

							}else if(i == rounds.length-1){
								if(format == 1){
									if(rounds[i-1]['roundLogVos'].length == 1){
										top = 5.729;
										height = 5.729;
									}else{
										top = padding_top - ((max_he - rounds[i-1]['roundLogVos'][he-2]['max_he']) * 5.729) + 2.083;
										height = rounds[i-1]['roundLogVos'][he-1]['zz_he'] == 0 ? 5.729 : rounds[i-1]['roundLogVos'][he-1]['zz_he'] * 5.729;
									}
								}
							}else{
								top = padding_top - ((max_he - rounds[i-1]['roundLogVos'][he-2]['max_he']) * 5.729) + 2.083;
								height = rounds[i-1]['roundLogVos'][he-1]['zz_he'] == 0 ? 5.729 : rounds[i-1]['roundLogVos'][he-1]['zz_he'] * 5.729;
							}
							rounds[i]['roundLogVos'][j]['top'] = top
							rounds[i]['roundLogVos'][j]['padding_top'] = padding_top
							rounds[i]['roundLogVos'][j]['zz_he'] = zz_he
							rounds[i]['roundLogVos'][j]['max_he'] = max_he
							rounds[i]['roundLogVos'][j]['height'] = height
						}
					}
					res.data.rounds = rounds;
					if(this.format == 2){
						for(let i = loserRounds.length-1 ; i >= 0; i--){
							let he = 0;
							for(let j = 0 ; j < loserRounds[i]['roundLogVos'].length; j++){
								if(i == 0){
									he += 1;
									loserRounds[i]['roundLogVos'][j]['max_he'] = he
								}else if(loserRounds[i]['roundLogVos'][j]['luckyAId'] == null && loserRounds[i]['roundLogVos'][j]['luckyBId'] == null){
									loserRounds[i-1]['roundLogVos'].splice(he,0, {});
									he += 1;
								}else if(loserRounds[i]['roundLogVos'][j]['luckyAId'] == null || loserRounds[i]['roundLogVos'][j]['luckyBId'] == null){
									he += 1;
								}else if(i == loserRounds.length-1){
									he += 1;
								}else{
									he += 2;
								}
								loserRounds[i]['roundLogVos'][j]['he'] = he
							}
						}
						for(let i = 1 ; i < loserRounds.length; i++){
							for(let j = 0 ; j < loserRounds[i]['roundLogVos'].length; j++){
								let he = loserRounds[i]['roundLogVos'][j]['he'];
								let top = 0;
								let max_he = 0;
								let height = 5.729;

								if(loserRounds[i]['roundLogVos'][j]['luckyAId'] == null && loserRounds[i]['roundLogVos'][j]['luckyBId'] == null){
									max_he = loserRounds[i-1]['roundLogVos'][he-1]['max_he']
								}
								else if(loserRounds[i]['roundLogVos'][j]['luckyAId'] == null || loserRounds[i]['roundLogVos'][j]['luckyBId'] == null){
									max_he = loserRounds[i-1]['roundLogVos'][he-1]['max_he']
								}else if(i == loserRounds.length-1){
									if(format == 1){
										if(loserRounds[i-1]['roundLogVos'].length == 1){
											max_he = 0
										}else{
											max_he = ((loserRounds[i-1]['roundLogVos'][he-1]['max_he'] + loserRounds[i-1]['roundLogVos'][he-2]['max_he']) / 2)
										}
									}else if(format == 2){
										max_he = loserRounds[i-1]['roundLogVos'][he-1]['max_he']
									}
								}else{
									max_he = ((loserRounds[i-1]['roundLogVos'][he-1]['max_he'] + loserRounds[i-1]['roundLogVos'][he-2]['max_he']) / 2)
								}
								let zz_he = max_he;
								if(j == 0 && max_he == 1){
									zz_he -= 1;
								}else if(j!=0){
									zz_he -= loserRounds[i]['roundLogVos'][j-1]['max_he']
									if(zz_he<=1)
										zz_he = 0;
								}
								let padding_top = zz_he * 5.729 - 5.729;
								if(loserRounds[i]['roundLogVos'][j]['luckyAId'] == null && loserRounds[i]['roundLogVos'][j]['luckyBId'] == null){

								}else if(loserRounds[i]['roundLogVos'][j]['luckyAId'] == null || loserRounds[i]['roundLogVos'][j]['luckyBId'] == null){

								}else if(i == loserRounds.length-1){
									if(format == 1){
										if(loserRounds[i-1]['roundLogVos'].length == 1){
											top = 5.729;
											height = 5.729;
										}else{
											top = padding_top - ((max_he - loserRounds[i-1]['roundLogVos'][he-2]['max_he']) * 5.729) + 2.083;
											height = loserRounds[i-1]['roundLogVos'][he-1]['zz_he'] == 0 ? 5.729 : loserRounds[i-1]['roundLogVos'][he-1]['zz_he'] * 5.729;
										}
									}
								}else{
									top = padding_top - ((max_he - loserRounds[i-1]['roundLogVos'][he-2]['max_he']) * 5.729) + 2.083;
									height = loserRounds[i-1]['roundLogVos'][he-1]['zz_he'] == 0 ? 5.729 : loserRounds[i-1]['roundLogVos'][he-1]['zz_he'] * 5.729;
									console.log(loserRounds[i-1]['roundLogVos'][he-1]['zz_he'])
								}
								loserRounds[i]['roundLogVos'][j]['top'] = top
								loserRounds[i]['roundLogVos'][j]['padding_top'] = padding_top
								loserRounds[i]['roundLogVos'][j]['zz_he'] = zz_he
								loserRounds[i]['roundLogVos'][j]['max_he'] = max_he
								loserRounds[i]['roundLogVos'][j]['height'] = height
							}
						}
						res.data.loserRounds = loserRounds;
					}

				}
				for(let h in res.data.rounds){
					for(let g=0; g < res.data.rounds[h].length;g++){
						res.data.rounds[h][g]['log_status'] = false
					}
				}
				this.list = res.data;
			})
		},
		getTournamentDetail(){
			let self = this;
			let params = {
				tournamentId : self.$route.query.id
			}
			tournamentDetail(params).then(function(res){
				for(let k in res.data.stages[0]['group']){
					for(let m = 0; m < res.data.stages[0]['group'][k].length;m++){
						res.data.stages[0]['group'][k][m]['group_status'] = false
					}
				}
				self.detail_list = res.data;
				self.format = res.data.stages[0].format

				let {id,format,group} = res.data.stages[0]
				if(format == 3){
					self.format1 = res.data.stages[1].format
				}
				self.roundLog(id,format,group)

			})
		},
		jump_free(index){
			let that = this;
			if(index == 1){
				// that.$router.push({ path: '/tournament/bracketm?id' + self.$route.query.id})
			}else if(index == 2){
				that.$router.push({ path: '/tournament/participantm?id=' + that.$route.query.id})
			}else if(index == 3){
				that.$router.push({ path: '/tournament/Informationsm?id=' + that.$route.query.id})
			}else if(index == 4){
				that.$router.push({ path: '/tournament/standingsm?id=' + that.$route.query.id})
			}
		}
	}
};
</script>

<style lang="less" scoped>
//参与round_tab
.round_tab{
	// margin-left: 60px;
	// width: calc(100% - 50px);
	// width: 120%;
	// margin-left: 60px;
	// overflow-x: scroll;
	.rounb_margin{
		width: 109%;
		// width: calc(100% - 150px);
		display: flex;
		// margin-right: 40px;
		font-family:'Roboto-Regular';
		// background-color: #FFEEAA;
		overflow: hidden;
		margin-right: 40px;
		.round_block{
			width: 200px;
			height: 60px;
			color: #999999;
			line-height: 60px;
			border-radius: 15px;
			text-align: center;
			background-color: #000000;
			margin: 0 40px 0 0;
			font-size: 17px;
			cursor: pointer;
		}
		.round_block:last-child{
			margin-right: 0;
		}
	}
	.win_tabs_list{
		// width: 110%;
		display: flex;
		font-family:'Roboto-Regular';
		overflow: hidden;
		margin-right: 40px;
		margin-left: 60px;
		overflow-x: scroll;
		padding-bottom: 20px;
		// background-color: #FFEEAA;
		// justify-content: space-between;
		.win_block{
			font-size: 16px;
			font-weight: 500;
			color: #B7B7B7;
			border-radius: 12px;
			border: 1px solid #67717A;
			margin-right: 40px;
			font-family: PingFangSC-Medium, PingFang SC;
			.win_block_top{
				width: 200px;
				height: 48px;
				font-size: 18px;
				// padding: 0 15px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-bottom: 1px solid #67717A;
			}
			.win_block_btom{
				width: 200px;
				// padding: 0 15px;
				height: 48px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.win_block:last-child{
			margin-right: 0;
		}
		.win_av{
			color: #fff;
			border: 1px solid #1F75DB;
			background-color: #1F75DB;
			position: relative;
			.win_block_top{
				border-bottom: 1px solid #003866;
				font-size: 18px;
			}
		}
		&::-webkit-scrollbar {
			/*滚动条整体样式*/
			width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
			height: 8px;
		}
		&::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
			border-radius: 10px;
			box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
			background   : #BF9D62;
		}
		&::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
			box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			// background   : #000000;
			// background: rgba(0,0,0,.7);
		}
	}

}

.round_loop{
	.rounb_margin{
		display: flex;
		justify-content: center;
		margin-left: 60px;
		font-family:'Roboto-Regular';
		.round_block{
			width: 200px;
			height: 60px;
			color: #999999;
			line-height: 60px;
			border-radius: 15px;
			text-align: center;
			background-color: #000000;
			margin: 0 40px 0 0;
			font-size: 17px;
			cursor: pointer;
		}
		.av{
			color: #BF9D62;
		}
	}

}
.round_tab2{
	// overflow-x: scroll;
	display: flex;
	margin-bottom: 40px;
	.rounb_margin2{
		// width: 100%;
		display: flex;
		overflow-x: scroll;
		.round_block2{
			width: 200px;
			height: 60px;
			color: #999999;
			line-height: 60px;
			border-radius: 15px;
			text-align: center;
			background-color: #000000;
			margin: 0 40px 0 0;
			font-size: 17px;
			cursor: pointer;
		}
		&::-webkit-scrollbar {
			/*滚动条整体样式*/
			width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
			height: 8px;
		}
		&::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
			border-radius: 10px;
			box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
			background   : #BF9D62;
		}
		&::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
			box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			// background   : #000000;
			// background: rgba(0,0,0,.7);
		}
	}
	.win_tabs_list{
		// width: 110%;
		display: flex;
		font-family:'Roboto-Regular';
		overflow: hidden;
		margin-right: 40px;
		// margin-left: 60px;
		overflow-x: scroll;
		// background-color: #FFEEAA;
		// justify-content: space-between;
		.win_block{
			font-size: 16px;
			font-weight: 500;
			color: #B7B7B7;
			border-radius: 12px;
			border: 1px solid #67717A;
			margin-right: 40px;
			font-family: PingFangSC-Medium, PingFang SC;
			.win_block_top{
				width: 200px;
				height: 48px;
				// padding: 0 15px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-bottom: 1px solid #67717A;
				font-size: 18px;
			}
			.win_block_btom{
				width: 200px;
				// padding: 0 15px;
				height: 48px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.win_block:last-child{
			margin-right: 0;
		}
		.win_av{
			color: #fff;
			border: 1px solid #1F75DB;
			background-color: #1F75DB;
			position: relative;
			.win_block_top{
				border-bottom: 1px solid #003866;
				font-size: 18px;
			}
		}
		&::-webkit-scrollbar {
			/*滚动条整体样式*/
			width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
			height: 8px;
		}
		&::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
			border-radius: 10px;
			box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
			background   : #BF9D62;
		}
		&::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
			box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			// background   : #000000;
			// background: rgba(0,0,0,.7);
		}
	}
}
.heightX{
	height:5.729vw
}
.route{
	height: 100vh;
	position: absolute !important;;
	top: 0 !important;

}
.index_background{
	// #1c1d21
	background: rgba(0, 0, 0, 0.7);
	.container {
		// background-image: url(../../assets/images/bac13.png);
		background-repeat: no-repeat;
		background-size: 100% ;
		padding-bottom: 50px;
		.container_bacolor {
			width: calc(100% - 150px);
			display: flex;
			justify-content: space-between; /* 横向中间自动空间 */
			flex-wrap: wrap; /* 换行 */
			// width: 1293px;
			.match_container {
				margin-top: 160px;
				width: 100%;
				margin-left: 120px;
				.match_fix{
					// position: fixed;
					// z-index: 9999;
					// background-color: #000000;
					// top: 120px;
					.match_content {
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
						.desc_top{
							width: 100%;
							.title_text{
								font-size: 30px;
								color: #fff;
								font-family:'Roboto-Bold';
								text-align: center;
							}
							.title_nav{
								width: 100%;
								height: 60px;
								color: #9B9B9B;
								background: #000000 0% 0% no-repeat padding-box;
								display: flex;
								align-items: center;
								font-size: 20px;
								border-radius: 25px;
								margin: 30px auto;
								font-family:'Roboto-Bold';
								div{
									cursor: pointer;
									border-right: 1px solid #727272;
									width: 25%;
									padding-right: 20px;
									text-align: center;
								}
								div:last-child{
									border-right: 0px;
								}
								div:nth-child(4){
										border-right: 0px;
								}
								.av{
								  color: #BF9D62;
								}
							}
						}

					}
				}

				.selection_step{
					margin-top: 40px;
					font-family:'Roboto-Regular';
					// background-color: #F20D0D;
					.setp_round_two{
						margin-left: 60px;
						// background-color: #F0C78A;
						.step_round_tit{
							color:#999999;
							font-size: 20px;
							margin-bottom: 15px;
							.step_tit_border{
								width: 120px;
								height: 1px;
								background-color: #999999;
								position: absolute;
								right: 9px;
								top: 9px;
							}
						}
						.selection_step_head{
							overflow-x: scroll;
							display: flex;
							margin-top: 0;
							margin-bottom: 30px;
							.step_list_one{
								margin-right: 40px;
								.step_list_block{
									position: relative;
									.selection_block{
										width: 200px;
										border-radius: 16px;
										margin-bottom: 30px;
										overflow: hidden;
										.select_top{
											height: 40px;
											display: flex;
											align-items: center;
											background-color: #1D2023;
											border-bottom: 1px solid #161616;
											.select_top_left{
												width: 80%;
												display: flex;
												align-items: center;
												// background-color: rgb(29,32,35);
												.select_img{
													width: 30px;
													height: 30px;
													border-radius: 50%;
													margin: 0 10px;
													.default_img{
														width: 30px;
														height: 30px;
													}
												}
												.select_text{
													color: #999999;
													font-size: 16px;
													width: 100px;
													overflow: hidden;
													text-overflow: ellipsis;
													white-space: nowrap;
												}
											}
											.select_top_right{
												width: 20%;
												height: 40px;
												line-height: 40px;
												text-align: center;
												background-color: rgb(49,53,56);
												color: #999999;
												font-size: 16px;
											}
											.select_color{
												color: #D3AA53;
											}
										}
										.select_bottom{
											height: 40px;
											display: flex;
											align-items: center;
											background-color: #1D2023;
											border-bottom: 1px solid #161616;
											.select_top_left{
												width: 80%;
												display: flex;
												align-items: center;
												// background-color: rgb(29,32,35);
												.select_img{
													width: 30px;
													height: 30px;
													border-radius: 50%;
													margin: 0 10px;
													.default_img{
														width: 30px;
														height: 30px;
													}
												}
												.select_text{
													color: #999999;
													font-size: 16px;
													width: 100px;
													overflow: hidden;
													text-overflow: ellipsis;
													white-space: nowrap;
												}
											}
											.select_top_right{
												width: 20%;
												height: 40px;
												line-height: 40px;
												text-align: center;
												background-color: rgb(49,53,56);
												color: #999999;
												font-size: 16px;
											}
											.select_color{
												color: #D3AA53;
											}
										}
									}
									.round_multiline{
										width: 15px;
										height: 112px;
										position: absolute;
										left: -38px;
										top: 2.083vw;
										/*top: 50px;								*/
										border-right: 1px solid #555F6C;
										border-top: 1px solid #555F6C;
										border-bottom: 1px solid #555F6C;
										border-left: 0;
										.multiline_border{
											position: absolute;
											right: -19px;
											top: 50px;
											width: 18px;
											height: 1px;
											background-color:#555F6C;
										}
									}
									.team_border{
										width: 35px;
										height: 1px;
										position: absolute;
										left: -38px;
										top: 50%;
										background-color: #555F6C;
									}

								}

							}
							&::-webkit-scrollbar {
								/*滚动条整体样式*/
								width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
								height: 8px;
							}
							&::-webkit-scrollbar-thumb {
								/*滚动条里面小方块*/
								border-radius: 10px;
								box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
								background   : #BF9D62;
							}
							&::-webkit-scrollbar-track {
								/*滚动条里面轨道*/
								box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
								border-radius: 10px;
								// background   : #000000;
							    // background: rgba(0,0,0,.7)
								// background: #1D2023;
							}
						}

					}
				}
				.selection_step1{
					margin-top: 40px;
					display: flex;
					justify-content: center;
					font-family:'Roboto-Regular';
					// list_one
					.step_list_one{
						.step_list_block{
							position: relative;
							.selection_block{
								width: 200px;
								border-radius: 16px;
								margin-bottom: 15px;
								overflow: hidden;
								.select_top{
									height: 40px;
									display: flex;
									align-items: center;
									background-color: #1D2023;
									border-bottom: 1px solid #161616;
									.select_top_left{
										width: 80%;
										display: flex;
										align-items: center;
										// background-color: rgb(29,32,35);
										.select_img{
											width: 30px;
											height: 30px;
											border-radius: 50%;
											margin: 0 10px;
											.default_img{
												width: 30px;
												height: 30px;
											}
										}
										.select_text{
											color: #999999;
											font-size: 16px;
											width: 100px;
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
										}
									}
									.select_top_right{
										width: 20%;
										height: 40px;
										line-height: 40px;
										text-align: center;
										background-color: rgb(49,53,56);
										color: #999999;
										font-size: 16px;
									}
									.select_color{
										color: #D3AA53;
									}
								}
								.select_bottom{
									height: 40px;
									display: flex;
									align-items: center;
									background-color: #1D2023;
									border-bottom: 1px solid #161616;
									.select_top_left{
										width: 80%;
										display: flex;
										align-items: center;
										// background-color: rgb(29,32,35);
										.select_img{
											width: 30px;
											height: 30px;
											border-radius: 50%;
											margin: 0 10px;
											.default_img{
												width: 30px;
												height: 30px;
											}
										}
										.select_text{
											color: #999999;
											font-size: 16px;
											width: 100px;
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
										}
									}
									.select_top_right{
										width: 20%;
										height: 40px;
										line-height: 40px;
										text-align: center;
										background-color: rgb(49,53,56);
										color: #999999;
										font-size: 16px;
									}
									.select_color{
										color: #D3AA53;
									}
								}
							}
							.selection_border{
								position: absolute;
								width: 15px;
								// height: 574px;
								position:absolute;
								right: -18px;
								    top: 39px;
								// background-color: #FFF1F0;
								.border_one{
									width: 15px;
									// height: 595px;
									border-top: 1px solid #3D3D3D;
									border-right: 1px solid #3D3D3D;
									border-bottom: 1px solid #3D3D3D;
									position: relative;
									.border_in{
										width: 18px;
										height: 1px;
										position: absolute;
										right: -18px;
										top: 48%;
										background-color: #3D3D3D;
									}
								}

							}
						}

					}
					// list_one end
					// list_two
					.step_list_two{
						margin-left: 40px;
						.step_list_block{
							position: relative;
							// margin-top: 267px;
							.selection_block{
								width: 200px;
								border-radius: 16px;
								margin-bottom: 106px;
								overflow: hidden;
								.select_top{
									height: 40px;
									display: flex;
									align-items: center;
									background-color: #1D2023;
									border-bottom: 1px solid #161616;
									.select_top_left{
										width: 80%;
										display: flex;
										align-items: center;
										// background-color: rgb(29,32,35);
										.select_img{
											width: 30px;
											height: 30px;
											border-radius: 50%;
											margin: 0 10px;
											.default_img{
												width: 30px;
												height: 30px;
											}
										}
										.select_text{
											color: #999999;
											font-size: 16px;
											width: 100px;
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
										}
									}
									.select_top_right{
										width: 20%;
										height: 40px;
										line-height: 40px;
										text-align: center;
										background-color: rgb(49,53,56);
										color: #999999;
										font-size: 16px;
									}
									.select_color{
										color: #D3AA53;
									}
								}
								.select_bottom{
									height: 40px;
									display: flex;
									align-items: center;
									background-color: #1D2023;
									border-bottom: 1px solid #161616;
									.select_top_left{
										width: 80%;
										display: flex;
										align-items: center;
										// background-color: rgb(29,32,35);
										.select_img{
											width: 30px;
											height: 30px;
											border-radius: 50%;
											margin: 0 10px;
											.default_img{
												width: 30px;
												height: 30px;
											}
										}
										.select_text{
											color: #999999;
											font-size: 16px;
											width: 100px;
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
										}
									}
									.select_top_right{
										width: 20%;
										height: 40px;
										line-height: 40px;
										text-align: center;
										background-color: rgb(49,53,56);
										color: #999999;
										font-size: 16px;
									}
									.select_color{
										color: #D3AA53;
									}
								}
							}
							.selection_border{
								position: absolute;
								width: 15px;
								height: 190px;
								position:absolute;
								right: -18px;
								top: 39px;
								.border_one{
									width: 15px;
									height: 190px;
									border-top: 1px solid #3D3D3D;
									border-right: 1px solid #3D3D3D;
									border-bottom: 1px solid #3D3D3D;
									position: relative;
									.border_in{
										width: 18px;
										height: 1px;
										position: absolute;
										right: -18px;
										top: 50%;
										background-color: #3D3D3D;
									}
								}

							}
						}

					}
				}
				.selection_step2{
					margin-top: 40px;
					//Group Stage
					.event_group_tabs{
						margin: 41px 30px 0 30px;
						// 排行榜
						.group_table_block{
							margin-bottom: 142px;
							.group_tabs_title{
								display: flex;
								align-items: center;
								margin-bottom: 50px;
								.group_text{
									font-size: 20px;
									font-family: Noto Sans S Chinese;
									font-weight: 900;
									color: #FFFFFF;
									margin-right: 20px;
									font-family:'Roboto-Bold';
								}
								.group_btn{
									width: 220px;
									height: 46px;
									font-size: 16px;
									font-weight: 500;
									color: #B7B7B7;
									border-radius: 5px;
									cursor: pointer;
									margin-right: 22px;
									display: flex;
									align-items: center;
									justify-content: center;
									border: 1px solid #67717A;
									// font-family: PingFangSC-Medium, PingFang SC;
									font-family:'Roboto-Regular';
								}
								.group_btn2{
									color: #fff;
									border: 1px solid #1F75DB;
									background-color: #1F75DB;
									position: relative;
									font-family:'Roboto-Regular';
								}
							}
							.group_tabs_table{
								.group_table_top{
									display: flex;
									align-items: center;
									height: 65px;
									font-size: 18px;
									font-weight: 400;
									color: #FFFFFF;
									font-family: Noto Sans S Chinese;
									background-color: #5B5E72;
									font-family:'Roboto-Bold';
									.group_top_block{
										width: 10%;
										height: 65px;
										display: flex;
										align-items: center;
										justify-content: center;
									}
									.group_top_block2{
										width: 20%;
										height: 65px;
										display: flex;
										align-items: center;
										justify-content: center;
									}
									.group_top_block3{
										width: 12.5%;
										height: 65px;
										display: flex;
										align-items: center;
										justify-content: center;
									}
								}
								.group_table_content{
									.group_list{
										display: flex;
										align-items: center;
										font-size: 18px;
										font-weight: 400;
										color: #FFFFFF;
										font-family: Noto Sans S Chinese;
										border-bottom: 1px solid #44525E;
										font-family:'Roboto-Regular';
										.group_btom_block{
											width: 10%;
											height: 70px;
											display: flex;
											align-items: center;
											justify-content: center;
										}
										.group_btom_block2{
											width: 20%;
											height: 70px;
											display: flex;
											align-items: center;
											justify-content: center;
											.group_radius{
												width: 25px;
												height: 25px;
												border-radius: 50%;
												// background-color: #57617C;
												margin-right: 10px;
											}
											.group_radius_name{
												width: 150px;
												overflow: hidden;
												text-overflow: ellipsis;
												white-space: nowrap;
											}
											.group_status{
												display: flex;
												font-size: 18px;
												font-weight: 400;
												color: #FFFFFF;
												position: relative;
												.group_color{
													width: 32px;
													height: 32px;
													line-height: 32px;
													text-align: center;
													border-radius: 6px;
													margin-right: 10px;
													background-color: #00E000;
													font-family:'Roboto-Bold';
												}
												.group_color2{
													width: 32px;
													height: 32px;
													line-height: 32px;
													text-align: center;
													border-radius: 6px;
													margin-right: 10px;
													background-color: #0075E2;
													font-family:'Roboto-Bold';
												}
												.group_color3{
													width: 32px;
													height: 32px;
													line-height: 32px;
													text-align: center;
													border-radius: 6px;
													margin-right: 10px;
													background-color: #FF0000;
													font-family:'Roboto-Bold';
												}
												.group_status_area{
													display: flex;
													font-size: 18px;
													font-weight: 400;
													color: #FFFFFF;
													background-color: #57617C;
													border-radius: 10px;
													padding: 20px;
													position: absolute;
													z-index: 9999;
													right: 0px;
													top: 50px;
													.group_color{
														width: 32px;
														height: 32px;
														line-height: 32px;
														text-align: center;
														border-radius: 6px;
														margin-right: 10px;
														background-color: #00E000;
													}
													.group_color2{
														width: 32px;
														height: 32px;
														line-height: 32px;
														text-align: center;
														border-radius: 6px;
														margin-right: 10px;
														background-color: #0075E2;
													}
													.group_color3{
														width: 32px;
														height: 32px;
														line-height: 32px;
														text-align: center;
														border-radius: 6px;
														background-color: #FF0000;
														margin-right: 10px;
													}
												}

											}
										}
										.group_btom_block3{
											width: 12.5%;
											height: 70px;
											display: flex;
											align-items: center;
											justify-content: center;
										}
									}
								}
							}
						}
						.group_table_block:last-child{
							margin-bottom: 0;
						}

						// 对阵详情
						.grou_tabs_information{
							margin-bottom: 142px;
							.group_tabs_title{
								display: flex;
								align-items: center;
								margin-bottom: 50px;
								.group_text{
									font-size: 20px;
									font-family: Noto Sans S Chinese;
									font-weight: 900;
									color: #FFFFFF;
									margin-right: 20px;
								}
								.group_btn{
									width: 220px;
									height: 46px;
									font-size: 16px;
									font-weight: 500;
									color: #B7B7B7;
									border-radius: 5px;
									cursor: pointer;
									margin-right: 22px;
									display: flex;
									align-items: center;
									justify-content: center;
									border: 1px solid #67717A;
									font-family: PingFangSC-Medium, PingFang SC;
								}
								.group_btn2{
									color: #fff;
									border: 1px solid #1F75DB;
									background-color: #1F75DB;
									position: relative;
								}
							}
							.group_details{
								.grounp_tabs_container{
									display: flex;
									overflow-x: scroll;
									.group_tabs_list{
										display: flex;
										margin-bottom: 20px;
										.group_block{
											width: 210px;
											height: 48px;
											font-size: 16px;
											font-weight: 500;
											color: #B7B7B7;
											border-radius: 5px;
											cursor: pointer;
											display: flex;
											align-items: center;
											justify-content: center;
											border: 1px solid #67717A;
											margin-right: 20px;
											font-family: PingFangSC-Medium, PingFang SC;
										}
										.group_block:last-child{
											margin-right: 0;
										}
										.group_av{
											color: #fff;
											border: 1px solid #1F75DB;
											background-color: #1F75DB;
											position: relative;
										}
									}
									&::-webkit-scrollbar {
										/*滚动条整体样式*/
										width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
										height: 8px;
									}
									&::-webkit-scrollbar-thumb {
										/*滚动条里面小方块*/
										border-radius: 10px;
										box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
										background   : #BF9D62;
									}
									&::-webkit-scrollbar-track {
										/*滚动条里面轨道*/
										box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
										border-radius: 10px;
										// background   : #000000;
									    // background: rgba(0,0,0,.7);
										// background: #1D2023;
									}
								}
								.group_round_container{
									overflow-x: scroll;
									margin-top: 50px;
									&::-webkit-scrollbar {
										/*滚动条整体样式*/
										width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
										height: 8px;
									}
									&::-webkit-scrollbar-thumb {
										/*滚动条里面小方块*/
										border-radius: 10px;
										box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
										background   : #BF9D62;
									}
									&::-webkit-scrollbar-track {
										/*滚动条里面轨道*/
										box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
										border-radius: 10px;
										// background   : #000000;
									    // background: rgba(0,0,0,.7);
										// background: #1D2023;
									}
									.arrange_top{
										display: flex;
										// top 第一列
										.arrange_list_one{
											.arrage_round_two{
												position: relative;
												.round_block_two{
													width: 180px;
													padding: 0 15px;
													margin-bottom: 35px;
													border-radius: 16px;
													background-color: #1d2023;
													margin-right: 5px;
													.team_top{
														display: flex;
														justify-content: space-between;
														border-bottom: 1px solid #464A4E;
														padding: 10px 0;
														.team_left{
															display: flex;
															align-items: center;
															.team_radius{
																width: 30px;
																height: 30px;
																// background-color: #57617C;
																border-radius: 50%;
																margin-right: 20px;
																.default_img{
																	width: 30px;
																	height: 30px;
																}
															}
															.team_name{
																font-size: 16px;
																font-family: Roboto;
																font-weight: 400;
																color: #FFFFFF;
																width: 95px;
																overflow: hidden;
																text-overflow: ellipsis;
																white-space: nowrap;
															}
														}
														.team_right{
															.team_num{
																width: 40px;
																height: 40px;
																line-height: 45px;
																text-align: center;
																font-size: 16px;
																border: 1px solid #5F6C76;
																font-family: Roboto;
																font-weight: 400;
																color: #FFFFFF;
																background: #313538;
															}
														}
													}
													.team_btom{
														display: flex;
														justify-content: space-between;
														padding: 10px 0;
														.team_left{
															display: flex;
															align-items: center;
															.team_radius{
																width: 30px;
																height: 30px;
																// background-color: #57617C;
																border-radius: 50%;
																margin-right: 20px;
																.default_img{
																	width: 30px;
																	height: 30px;
																}
															}
															.team_name{
																font-size: 16px;
																font-family: Roboto;
																font-weight: 400;
																color: #FFFFFF;
																width: 95px;
																overflow: hidden;
																text-overflow: ellipsis;
																white-space: nowrap;
															}
														}
														.team_right{
															.team_num{
																width: 40px;
																height: 40px;
																line-height: 45px;
																text-align: center;
																font-size: 16px;
																border: 1px solid #5F6C76;
																font-family: Roboto;
																font-weight: 400;
																color: #FFFFFF;
																background: #313538;
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
						.grou_tabs_information:last-child{
							margin-bottom: 0;
						}
					}
					// Final Stage
					.event_final_tabs{
						.rounb_margin2{
							display: flex;
							margin-bottom: 40px;
							.round_block2{
								width: 200px;
								height: 60px;
								color: #999999;
								line-height: 60px;
								border-radius: 15px;
								text-align: center;
								background-color: #000000;
								margin: 0 40px 0 0;
								font-size: 17px;
								cursor: pointer;
							}
						}
					}
				}
			}
		}
	}
}
</style>
