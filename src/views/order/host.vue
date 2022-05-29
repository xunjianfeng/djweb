<template>
	<div class="index">
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<div class="adiv" @click="jump_pagee(1)">
						<p>Profile</p>
					</div>
					<div class="adiv" @click="jump_pagee(2)">
						<p>Wallet</p>
					</div>
					<div class="adiv" @click="jump_pagee(3)">
						<p class="av">Host</p>
					</div>
					<div class="adiv" @click="jump_pagee(4)">
						<p>Companion</p>
					</div>
				</div>
				<!-- 普通会员 host -->
				<div class="content_right_forms" v-if="hide == false">
					<!-- <div class="content_right_forms" v-if="info_list.vipLevel == 'BASE'"> -->
					<div class="right_in_img">
						<img class="info_game" src="@/assets/images/games2.png" alt="">
					</div>
					<div class="in_content">
						<div class="in_info">Please upgrade to Pro Max member before you could apply to be a host.</div>
						<div class="in_btn">I want to be Pro Max Member</div>
					</div>
				</div>
				<!-- Pro max会员 host -->
				<div class="content_right_form" v-else>
					<div class="content_right_top" v-if="host_detail.status != 'NOT_A_HOST'">
						<div class="top_left">
							<div class="">Your application grade</div>
							<div class="percentage">{{testProgress || 0}}%</div><!-- {{host_detail.testProgress}} -->
						</div>
						<div class="top_right">
							<div class="try_btn" @click="jump_hostApply">Try Again</div>
						</div>
					</div>
					<div class="video_area">
						<div class="video_text">
							<p>If you want to be a host for <span>RAPID CHALLENGE</span> to gain more benefits
								such as more points to spend on redemption center. Please watch this <span>TUTORIAL VIDEO</span>.</p>
						</div>
						<!-- width="841px" height="472px"？ -->
						<!-- <video width="80%" ref="video" height="65%" controls class="video_play">
						</video> -->
						<iframe width="70%" height="472px" class="video_play" :src="video_url"
						 title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
						 allowfullscreen></iframe>
						<!-- </video> -->
						<div class="btn_area">
							<div class="apply_btn" @click="jump_hostApply">Apply to be a host</div>
						</div>
					</div>
					<div class="about_host">
						<p class="host_title">About Host</p>
						<div class="host_form">
							<div class="form_row" v-for="(item,index) in level_rule">
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
							<!-- <div class="">
								i) 3 stars host : 10% coins from total of the room hosted
							</div>
							<div class="">
								i) 3 stars host : 15% coins from total of the room hosted
							</div> -->
							<!-- <p>
								i) 3 stars host : 20% coins from total of the room hosted
							</p>-->
						</div>
					</div>
				
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import _videojs from 'video.js'
	// const videojs = window.videojs || _videojs
	// import 'video.js/dist/video-js.css'
	import LeftView from '@/components/order/left.vue'
	import {userInfo} from '@/api/user_info'
	import {getVideo,getLevelRules,getHostOverview} from '@/api/league.js'
	// import { videoPlayer } from 'vue-video-player'
	// import 'video.js/dist/video-js.css'
	export default {
		name: "host",
		components: {
			LeftView
		},
		data() {
			return {
				hide: false, //true Pro max会员的host页面  false 普通会员的host页面
				info_list: '',
				video_url:'',//主持人视频
				level_rule:[],//主持人等级规则
				host_detail:{},//主持人概况
				testProgress:0,
			}
		},
		mounted() {
			this.get_user_info();
			this.getLevelRules()
			
			setTimeout(()=>{
				this.getHostOverview() //延迟获取是否为主持人
			},100)
			
			setTimeout(()=>{
				this.getVideo(); //延迟获取播放接口
			},200)
			// this.initVideo()
			// this.getQuestions();
		},
		methods: {
			//获取主持人概况
			getHostOverview(){
				getHostOverview().then(res => {
					this.host_detail = res.data
					this.testProgress = this.host_detail.testProgress * 100
					// console.log(this.host_detail.testProgress)
					if(this.host_detail.testProgress < 0.8){
						this.hide = true
					}else{
						this.$router.push({path: '/order/host_level'})
					}
				})
			},
			//获取用户信息
			get_user_info() {
				let self = this;
				let user_Id = new URLSearchParams();
				user_Id.append('userId', sessionStorage.getItem("userId"));
				userInfo(user_Id).then(res => {
					self.info_list = res.data.userInfo;
					sessionStorage.setItem("userinfo", JSON.stringify(res.data.userInfo))
					if (self.info_list.vipLevel == 'PRO MAX') {
						self.hide = true
					} else {
						self.hide = false
					}
				})
			},
			replace:function(input){
				// console.log(input);
				return input;
			},
			//获取视频
			getVideo(){
				getVideo().then(res => {
					// this.$refs.video.src = res.data
					this.video_url = res.data
					this.video_url = this.video_url.replace("watch?v=","embed/")
					// console.log("视频链接")
					// console.log(this.$refs.video.src )
				})
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
						// console.log(this.level_rule[j]['proportion'])
					}
				})
			},
			// getQuestions(){
			// 	getQuestions().then(res => {
			// 		console.log(res.data)
			// 	})
			// },
			// 跳转页面
			jump_pagee(index) {
				if (index == 1) {
					this.$router.push({
						path: '/center/profile'
					})
				} else if (index == 2) {
					this.$router.push({
						path: '/order/wallet'
					})
				} else if (index == 3) {
					if(this.host_detail.status == 'ENABLE'){
						this.$router.push({path: '/order/host_level'})
					}else{
						this.$router.push({path: '/order/host'})
					}
					
				} else if (index == 4) {
					this.$router.push({
						path: '/center/companion'
					})
				}
			},
			jump_hostApply(){
				this.$router.push({path: '/order/host_apply'})
			},
			
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 90%;
		margin-left: 61px;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;
		/* 换行 */
		padding-bottom: 30px;

		.content_left {
			width: 318px;
			height: 913px;
			background: #0E0F11;
			margin-top: 100px;
			border-radius: 50px;

			.content_left_avatar {
				width: 90%;
				margin: 0 auto;
				text-align: center;
				border-bottom: 2px solid #2D2D2D;
				padding-bottom: 20px;

				.avatar {
					width: 140px;
					margin-top: -45px;
				}

				.content_left_text {
					width: 100%;
					text-align: center;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 50px;

					p {
						float: left;
					}

					img {
						width: 15px;
						float: left;
						margin-left: 10px;
					}
				}

				.text_uid {
					color: #727272;
					padding: 0;
					margin: 0;
				}
			}

			.content_left_col {
				width: 90%;
				margin: 0 auto;

				p {
					cursor: pointer;
					height: 50px;
					border-radius: 18px;
					color: #9B9B9B;
					line-height: 50px;
					padding-left: 20px;
					font-size: 16px;
				}

				.av {
					background: #1D2023;
					color: #D3AA53;
				}
			}
		}

		.content_right {
			width: calc(100% - 370px);
			.content_right_nav {
				margin-top: 50px;
				margin-bottom: 20px;
				p {
					display: inline-block;
					color: #898989;
					font-family: 'Roboto-Regular';
					padding: 0 30px;
					font-size: 16px;
					margin: 0;
				}
				.adiv {
					display: inline-block;
					cursor: pointer;
					border-right: 1px solid #7F7F7F;

					&:last-child{
						border: none;
					}
				}
				.av {
					color: #BF9D62;
					font-family: 'Roboto-Bold';
				}
			}
			.content_right_forms {
				width: calc(100% - 60px);
				background: #0E0F11;
				height: 549px;
				border-radius: 50px;
				padding: 20px;
				.right_in_img {
					margin: 0 auto;
					text-align: center;
					margin: 71px 0px 0px 0px;

					.info_game {
						width: 205px;
					}
				}
				.in_content {
					width: 830px;
					text-align: center;
					margin: 0 auto;
					.in_tit {
						font-size: 24px;
						font-weight: 500;
						color: #DBA83F;
					}
					.in_info {
						font-size: 20px;
						line-height: 25px;
						font-weight: 500;
						color: #989898;
						font-family:'Roboto-Regular';
						margin: 14px 0 77px 0;
					}
					.in_btn {
						width: 320px;
						height: 58px;
						font-size: 20px;
						font-weight: 500;
						color: #0E0F11;
						cursor: pointer;
						text-align: center;
						line-height: 58px;
						background: #D3AA53;
						border-radius: 25px;
						margin: 0 auto;
						font-family:'Roboto-Regular';
					}
				}
			}
			.content_right_form {
				width: calc(100%-60px);
				.content_right_top{
					width: 100%;
					height:80px;
					border-radius: 20px;
					background: #0E0F11;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-family:'Roboto-Regular';
					margin-top: 30px;
					// padding: 0 20px;
					.top_left{
						display: flex;
						align-items: center;
						color: #fff;
						font-size: 16px;
						padding-left: 30px;
						.percentage{
							color: #D3AA53;
							font-size: 20px;
							font-family:'Roboto-Bold';
							margin-left: 22px;
						}
					}
					.top_right{
						padding-right: 30px;
						.try_btn{
							width: 100px;
							height: 40px;
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
				.video_area {
					width: 100%;
					// height: 751px;
					background: #0E0F11;
					border-radius: 65px;
					text-align: center;

					.video_text {
						width: 750px;
						height: 24px;
						margin: 0px auto 12px;
						position: relative;
						top: 94px;

						p {
							text-align: center;
							letter-spacing: 0px;
							color: #989898;
							font-size: 20px;
							font-family: 'Roboto-Regular';

							span {
								color: #FFFFFF;
								font-family: 'Roboto-Black';
							}
						}
					}

					.video_play {
						margin: 150px auto 80px;

					}
					.btn_area{
						width: 100%;
						// background-color: #FFF000;
						// margin: 0 auto 100px;
						padding-bottom: 40px;
						display: flex;
						justify-content: center;
						.apply_btn{
							width: 220px;
							height: 50px;
							line-height: 50px;
							text-align: center;
							background-color: #DBA83F;
							color: #000;
							font-family: 'Roboto-Regular';
							border-radius: 25px;
							font-size: 18px;
							cursor: pointer;
						}
					}
				}

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
						background: #0E0F11 0% 0% no-repeat padding-box;
						border-radius: 55px;

						color: #FFFFFF;

						.form_row {
							display: flex;
							align-items: center;
							// justify-content: space-between;
							border-bottom: 1px solid #515151;

							margin: 0px 48px 12px 38px;

							&:first-child {
								padding-top: 27px;
								padding-bottom: 5px;
							}

							&:last-child {
								border: none;
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

								}
							}

							.host_form_content {
								margin-left: 70px;
								.host_form_content_row {
									width: 550px;
									display: flex;
									align-items: center;
									margin-right: 50px;

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

			//content_right_form

		}
	}
</style>
