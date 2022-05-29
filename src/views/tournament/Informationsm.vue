<template>
	<div class="index index_background">
		<div class="container">
			<div class="container_bacolor">
				<div class="match_container">
					<div class="match_content">
						<div class="desc_top">
							<div class="title_text">
								{{detail_list.tournamentName}}
							</div>
							<div class="title_nav">
								<div  @click="jump_free(1)">Bracket</div>
								<div @click="jump_free(2)">Participants</div>
								<div class="av" @click="jump_free(3)">Information</div>
								<div @click="jump_free(4)" v-if="detail_list.stages[0].format > 2">Standings</div>
							</div>
						</div>
						<!-- 版块head -->
						<div class="match_card_container">
							<div class="match_card">
								<div class="match_left"><img :src="HOST+detail_list.tournamentCover" /></div>
								<div class="match_right">
									<div class="match_flex_text"  v-show="detail_list.registeryFee">
										<div class="text_left">Cost</div>
										<div class="text_right"></div>
									</div>
									<div class="match_flex">
										<div class="match_flex_left"  v-show="detail_list.registeryFee">{{detail_list.registeryFee}} {{detail_list.registeryFeeType}}</div>
										
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
										{{detail_list.stages[0].format==1?'Single Elimination':detail_list.stages[0].format==2?'Double Elimination':detail_list.stages[0].format==3?'Round Robin':'Free For All'}}
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
									<!-- <div class="match_flex_text">
										<div class="text_left">Maximum Number</div>
										<div class="text_right">{{detail_list.participantsSize}}</div>
									</div> -->
									<div class="match_border"></div>
									<div class="match_flex_text">
										<div class="text_left">Participants</div>
										<div class="text_right">( {{player_list_len||0}}/{{detail_list.participantsSize||0}} )</div>
									</div>
									<!-- <div class="match_button" v-if="detail_list.status != 3" @click="join_step(detail_list.tournamentType)">
										Join
									</div> -->
									<div class="match_button_gray" v-if="detail_list.status == 3">
										Join
									</div>
									<div class="match_content_text">
										Please read the terms and conditions first before you click the
										<span>JOIN</span> button, and we will treat you as agreed to our <span style="text-decoration: underline">terms and
										conditions</span> once you <span>JOIN</span> our tournament.
									</div>
									<div class="match_flex_link" v-if="detail_list.liveUrl">
										<div class="text_left">
											<div class="link_icon"><img src="../../assets/images/icon4.png" /></div>
											<div class="link_icon"><img src="../../assets/images/icon5.png" /></div>
										</div>
										<div class="text_right">
											<div class="text_over">{{detail_list.liveUrl}}</div>
											<div class="text_copy" :data-clipboard-text="detail_list.liveUrl" @click="copy">COPY</div>
										</div>
									</div>
								</div>
								
							</div>
							<div class="match_position">
								<img src="../../assets/images/position.png" alt=""  v-if="detail_list.state != ''">
							</div>
						</div>
						
						<!-- 版块Step -->
						<div class="match_step">
							  <el-tabs :tab-position="tabPosition">
							    <el-tab-pane label="Description">
									<div class="description_container">
										<div class="desc_tit">{{detail_list.tournamentName}}</div>
										<div class="desc_time">Tournament will start at {{initDete(detail_list.registrationTimeStart)}}</div>
										<div class="desc_border"></div>
										<div class="desc_content" v-html="detail_list.introduction"></div>
										<div class="desc_seat"></div>
									</div>
								</el-tab-pane>
							    <el-tab-pane label="Prize">
									<div class="Price_container">
										<div class="price_head">
											<div class="price_head_left">
												<div class="head_left_text">Total Value</div>
												<div class="head_left_money">{{totalPrice}} MYR</div>
											</div>
											<div class="price_head_right">
												<div class="head_right_text">Prize Type</div>
												<div class="head_right_money">{{detail_list.rewards[0].rewardType==1?'Good':'Cash'}}</div>
											</div>
										</div>
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
														<img :src="HOST+item.rewardPicture" alt="" class="rel_img">
													</div>
													<div class="prick_text_block">
														<div class="prick_name">{{item.rewardName}}</div>
														<div class="prick_text">{{item.rewardPrice}}</div>
													</div>
													<div class="prick_text2">x {{item.quantity||0}}</div>
												</div>
												<div class="price_block_right" v-if="item.ranking != '' && item.ranking != null ">
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
											<div class="organize_block"  v-if="detail_list.tournamentCategory!='officially'&&detail_list.organizer">
												<div class="organ_left">
													<img :src="HOST+detail_list.organizer.avatar" alt="" v-if="detail_list.organizer.avatar">
													<img src="../../assets/images/default.png" v-else />
												</div>
												<div class="organ_right">
													<div class="organ_right_tit">{{detail_list.organizer.fullName}}</div>
													<div class="organ_right_text" v-html="detail_list.organizer.aboutOrganizer"></div>
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
										<div class="terms_content" v-html="detail_list.terms"></div>
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
	import {
		tournamentDetail
	} from '@/api/tournament'
export default {
	name: 'Informationsm',
	data() {
		return {
			 tabPosition: 'left',
			 tournamentId:'',
			 detail_list:'',
			 stage:'',
			 player_list_len:'',
		};
	},
	mounted() {
		if(this.$route.query.id != '' &&  this.$route.query.id != null && this.$route.query.id != undefined){
			this.tournamentId = this.$route.query.id
			this.tournamentDetail();
		}
	},
	computed:{
		//奖品总价
		totalPrice(){
			let total = 0
			if(this.detail_list != '' && this.detail_list != null && this.detail_list != undefined){
				for(let i=0; i<(this.detail_list.rewards).length;i++){
					total += this.detail_list.rewards[i].rewardPrice
				}
				return total
			}
		}
	},
	methods:{
		// 赛事详情
		tournamentDetail(){
			let that = this;
			tournamentDetail({tournamentId:that.$route.query.id}).then(res => {
				that.detail_list = res.data;
				let stages_list = res.data.stages
				that.player_list_len = (res.data.contestant).length;
				for(let i=0;i<stages_list.length;i++){
					that.stage = stages_list[i]
				}
				// for ( let i in detail_list ) {
				// 	for(let j in  detail_list[i].stages){
				// 		detail_list[i]['stages_format'] = detail_list[i].stages[0].format
				// 	}
				// }
				
			})
		},
		// 复制
		copy() {  
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
		jump_free(index){
			let that = this;
			if(index == 1){
				that.$router.push({ path: '/tournament/bracketm',query:{id:that.tournamentId}})
			}else if(index == 2){
				that.$router.push({ path: '/tournament/participantm',query:{id:that.tournamentId}})
			}else if(index == 3){
				that.$router.push({ path: '/tournament/Informationsm',query:{id:that.tournamentId}})
			}else if(index == 4){
				that.$router.push({ path: '/tournament/standingsm',query:{id:that.tournamentId}})
			}
		}
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
		height: auto;
		position: absolute !important;;
		top: 0 !important;
		
	}
.index_background{
	background: rgba(0, 0, 0, 0.7);
	.container {
		background-repeat: no-repeat;
		background-size: 100% ;
		height: 100vh;
		.container_bacolor {
			width: calc(100% - 150px);
			display: flex;
			justify-content: space-between; /* 横向中间自动空间 */
			flex-wrap: wrap; /* 换行 */
			// width: 1293px;
			.match_container {
				margin-top: 160px;
				.match_content {
					display: flex;
					flex-wrap: wrap;
					.desc_top{
						width: 100%;
						margin-left: 120px;
						text-align: center;
						.title_text{
							font-size: 30px;
							color: #fff;
							font-family:'Roboto-Bold';
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
					.match_card_container{
						position: relative;
						margin-left: 120px;
						.match_card {
							width: 100%;
							height: 617px;
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
								padding: 21px 30px 0px 30px;
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
									font-family:'Roboto-Medium';
									cursor: pointer;
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
									background-color: #767676;
									margin: 10px 0 20px 0;
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
										width: 170px;
										display: flex;
										align-items: center;
										.link_icon{
											width: 61px;
											height: 61px;
											margin-right: 10px;
											img {
												width: 100%;
												height: 100%;
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
											width: 350px;
											overflow: hidden;
											text-overflow:ellipsis;
											white-space: nowrap;
											letter-spacing: 1px;
										}
										.text_copy{
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
					
					// 版块Step
					.match_step{
						width: 100%;
						// height: 1000px;
						margin: 100px 0px  0px  60px;
						// margin: 100px 0px  150px  60px;
						// background-color: #FFFFFF;
						/deep/ .el-tabs--left{
							width: 1350px;
							/deep/ .el-tabs__content{
								width: 86%;
							}
						}
						.description_container{
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
								// width: 900px;
								color: #999999;
								font-family:'Roboto-Regular';
								font-size: 17px;
								word-wrap: break-word;
								white-space: pre-wrap;
							}
							::v-deep{
								img{
									width: 100%;
									height: 100%;
								} 
							}
							.desc_seat{
								width: 70%;
								height: 300px;
								// background-color: #999;
								margin: 40px 0;
							}
						}
						.Price_container{
							margin-left: 40px;
							margin-top: 100px;
							margin-bottom: 100px;
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
											font-size: 22rpx;
										}
									}
								}
							}
						}
						.Organizer_container{
							margin-left: 40px;
							margin-top: 100px;
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
										img{
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
							margin-top: 100px;
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
										left: -10px;
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
							// margin-top: 100px;
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
								word-wrap: break-word;
								white-space: pre-wrap;
							}
							::v-deep{
								img{
									width: 100%;
									height: 100%;
								} 
							}
						}
					}
				}
			}
		}
	} //container
}
</style>
