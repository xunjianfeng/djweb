<template>
	<div class="index">
		<div class="container">
			<div class="content_left_info">
				<div class="img">
					<el-image :src="HOST +  lisQuery.avatar" class="avatar_img">
						<div slot="error" class="image-slot"> 
							<img src="../../assets/images/default.png" class="avatar_img"/>
						</div>
					</el-image>
					<!-- <img :src="HOST + lisQuery.avatar" v-if="lisQuery.avatar"/> -->
					<!-- <img src="../../assets/images/default.png" v-else /> -->
				</div>
			</div>
			<div class="content_right">
				<div class="block_1">
					<div class="block_left">
						<button class="true_btn" @click.stop="teamDecision(2)">
							<img src="../../assets/images/right_green.png" />
							Accept
						</button>
						<button class="false_btn" @click.stop="teamDecision(3)">
							<img src="../../assets/images/false_red.png" />
							Reject
						</button>
					</div>
					<div class="block_right">
						<button class="chat">
							<img src="../../assets/images/chat.png" />
							Chat
						</button>
					</div>
				</div>
				<div class="block_2" v-for="(item,index) in profile_info" :key='index'>
					<div class="block_2_top">
						<div class="img_nav">
							<div class="nav_1">
								<el-image :src="HOST +  item.gameLogo" class="game_img">
									<div slot="error" class="image-slot"> 
										<img src="../../assets/images/default_game.png" class="game_img"/>
									</div>
								</el-image>
								<!-- <img :src="HOST + item.gameLogo" v-if="item.gameLogo"/> -->
								<!-- <img src="../../assets/images/default_game.png" v-else/> -->
							</div>
						</div>
					</div>
					<div class="block_2_content">
						<div class="content_name_id">
							<div class="game_name">
								<p class="label_name">In Game Name(IGN)</p>
								<P>{{item.ign}}</P>
							</div>
							<div class="game_id">
								<p class="label_name">In Game ID(IGID)</p>
								<P>{{item.igid}}</P>
							</div>
						</div>
						<div class="game_char">
							<P class="label_name">Game Character</P>
							<p>{{item.role}}</p>
						</div>
						<div class="game_intro">
							<p class="label_name">In Game Introduction (why people should team with me)</p>
							<p>{{item.introduce}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		profileUser,
		teamDecision
	} from '@/api/team';
	export default {
		name: 'application_userinfo',
		data() {
			return {
				nav: 1,
				value: 4,
				lisQuery:{
					userId:'',
					teamId:'',
					type:'',
				},
				profile_info:'',
			}
		},
		mounted() {
			if(this.$route.query != '' && this.$route.query != null && this.$route.query != undefined){
				this.lisQuery = this.$route.query
				this.get_profile();
			}
		},
		methods: {
			// 获取用户游戏配置
			get_profile() {
				let that = this;
				profileUser({userId:that.lisQuery.userId}).then(res => {
					that.profile_info = res.data
				})
			},
			// 同意/拒绝 加入队伍
			teamDecision(agree) {
				let that = this;
				let params = {
					teamId:that.lisQuery.teamId,
					type:that.lisQuery.type,//invite 邀请 apply 申请
					agree,  	// 2 同意 3拒绝
					userId:that.lisQuery.userId,
				}
				if(agree == 2){
					this.$confirm('Agree to join team?', 'Confirmation', {//是否同意加入战队
					  confirmButtonText: 'Confrim',
					  cancelButtonText: 'Cancel',
					  type: 'warning',
					  center: true
					}).then(() => {
						teamDecision(params).then(res => {
							this.$message({
								type: 'success',
								message: res.message
							});
							this.$router.push({ path: '/tearm/application_list'})
						})
					})
				}else{
					this.$confirm('Reject to join team?', 'Confirmation', {//是否拒绝加入战队
					  confirmButtonText: 'Confrim',
					  cancelButtonText: 'Cancel',
					  type: 'warning',
					  center: true
					}).then(() => {
						teamDecision(params).then(res => {
							this.$message({
								type: 'success',
								message: res.message
							});
							this.$router.push({ path: '/tearm/application_list'})
						})
					})
				}
			},
		}

	}
</script>

<style lang="less" scoped>
	.container {
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;
		/* 换行 */
		padding-bottom: 30px;

		.content_left_info {
			width: 318px;
			height: 265px;
			background: #0E0F11;
			border-radius: 36px;
			margin-top: 45px;
			display: flex;
			align-items: center;
			justify-content: center;
			.img {
				width: 50%;
				height: 150px;
				overflow: hidden;
				display: flex;
				align-items: center;
				border-radius: 36px;
				.avatar_img {
					width: 100%;
					height: 150px;
					object-fit: cover;
					border-radius: 36px;
				}
			}
			.per_info {
				width: 90%;
				margin: 80px auto 10px;

				.per_name {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #FFFFFF;
					font-size: 22px;
					padding: 16px 23px 0;

					p {
						margin: 0;
					}

					.like {
						width: 31px;
						height: 28px;
					}
				}

				.fire_num {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 10px;
					padding: 16px 23px 0;

					.fire {
						width: 17px;
						height: 21px;
						margin-right: 10px;
					}

					p {
						margin: 0;
						color: #727272;
						font-size: 18px;
					}
				}

				.per_price {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #727272;
					font-size: 18px;
					padding: 16px 23px 0;
					margin-top: 10px;

					p {
						margin: 0;
					}

					.dollar {
						width: 17px;
						height: 21px;
						background-color: #FFFFFF;
						border-radius: 13px;
						margin-right: 10px;
					}

					.price_hour {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						span {
							font-size: 25px;
							margin-right: 5px;
						}
					}
				}
			}
		}
		.content_right {
			width: calc(100% - 370px);
			margin-top: 45px;

			.block_1 {
				width: 100%;
				height: 80px;
				background: #0E0F11;
				border-radius: 30px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.block_left {
					margin-left: 60px;
					display: flex;

					.true_btn {
						width: 130px;
						height: 50px;
						border-radius: 20px;
						background: #1D2023;
						border: 1px solid #1D2023;
						color: #59AC00;
						font-family:'Roboto-Regular';
						font-size: 18px;
						margin-right: 30px;
						display: flex;
						align-items: center;
						justify-content: center;

						img {
							width: 20px;
							height: 20px;
							margin-right: 5px;
						}
					}

					.false_btn {
						width: 130px;
						height: 50px;
						border-radius: 20px;
						background: #1D2023;
						border: 1px solid #1D2023;
						color: #ff0000;
						font-size: 18px;
						display: flex;
						align-items: center;
						justify-content: center;
						font-family:'Roboto-Regular';
						img {
							width: 20px;
							height: 20px;
							margin-right: 5px;
						}
					}
				}
				.block_right {
					display: flex;
					align-items: center;
					margin-right: 60px;

					.chat {
						width: 130px;
						height: 50px;
						border-radius: 20px;
						background: #1D2023;
						border: 1px solid #1D2023;
						color: #D3AA53;
						font-size: 18px;
						display: flex;
						align-items: center;
						justify-content: center;
						font-family:'Roboto-Regular';
						img {
							width: 20px;
							height: 20px;
							margin-right: 5px;
						}
					}
				}
			}
			.block_2 {
				// height: 375px;
				background: #0E0F11;
				border-radius: 56px;
				margin-top: 50px;
				padding-bottom: 40px;

				.block_2_top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 0px 60px 0 60px;
					border-bottom: 1px solid #565656;

					.img_nav {
						display: flex;
						margin-top: 10px;
						.nav_1 {
							width: 73px;
							height: 90px;
							margin-right: 71px;

							.game_img {
								width: 74px;
								height: 75px;
							}
						}

						.nav_2 {
							width: 112px;
							height: 70px;
							margin-right: 68px;

							img {
								width: 112px;
								height: 70px;
							}
						}

						.nav_3 {
							width: 101px;
							height: 75px;

							img {
								width: 101px;
								height: 75px;
							}
						}
					}
				}
				.block_2_content {
					padding: 0 60px 0 60px;
					font-size: 18px;
					.label_name {
						color: #727272;
						font-family:'Roboto-Regular';
						font-size: 18px;
					}
					.content_name_id {
						display: flex;
						color: #ffffff;
						font-family:'Roboto-Regular';
						.game_name {
							width: 50%;
						}
					}
					.game_char {
						color: #ffffff;
						font-family:'Roboto-Regular';
					}
					.game_intro {
						color: #ffffff;
						font-family:'Roboto-Regular';
						margin-top: 50px;
					}
				}
			}
		}
	}
</style>
