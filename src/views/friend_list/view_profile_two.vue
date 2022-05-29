<template>
	<div class="index">
		<div class="container">
			<div class="content_left_info">
				<div class="img">
					<el-image :src="HOST +  listQuery.avatar" class="avatar_img" >
						<div slot="error" class="image-slot"> 
							<img src="../../assets/images/default.png" class="default_img"/>
						</div>
					</el-image>
					<!-- <img :src="HOST + listQuery.avatar" v-if="listQuery.avatar"/> -->
					<!-- <img src="../../assets/images/default.png" v-else /> -->
				</div>
				<div class="per_info">
					<div class="per_name">
						<p>{{listQuery.fullName}}</p>
						<!-- <img src="../../assets/images/yg.png" />
						<img class="like" src="../../assets/images/like.png" /> -->
					</div>
					<!-- <div class="fire_num">
						<img class="fire" src="../../assets/images/huo.png" />
						<p>1,046,667</p>
					</div>
					<div class="per_price">
						<p>Follow</p>
						<p>1,093</p>
					</div> -->
				</div>
			</div>
			<div class="content_right">
				<div class="text_block">
					<div class="friend">
						<img src="../../assets/images/mamberxz.png" alt="">
					</div>
					<img src="../../assets/images/more.png" alt="" class="more" @click="remove_status =! remove_status">
					<div class="noneMoreDel" v-if="remove_status" @click="del_friend">
						Remove Firend
					</div>
					<div class="chat_img">
						<img src="../../assets/images/chat.png" alt="">
						<span>chat</span>
					</div>
				</div>
				<!-- 没有数据 -->
				<div class="no_data_area"  v-if="profile_info == ''" >
					<div class="no_data">
						<img src="../../assets/images/no_tournament.svg" />
						<div class="no_data_text">No any games</div>
					</div>
				</div>
				<div v-if="profile_info != ''">
					<div class="block_2" >
						<div class="block_2_top">
							<div class="img_nav">
								<div class="nav_1" v-for="(item,index) in profile_info" :key="index">
									<el-image :src="HOST + item.gameLogo" class="game_img" @click="switch_game(index)">
										<div slot="error" class="image-slot"> 
											<img src="../../assets/images/default_game.png" class="game_img" @click="switch_game(index)"/>
										</div>
									</el-image>
									<!-- <img :src="HOST + item.gameLogo" v-if="item.gameLogo" @click="switch_game(index)"/> -->
								</div>
							</div>
						</div>
						<div class="block_2_content">
							<div class="content_name_id">
								<div class="game_name">
									<p class="label_name">In Game Name(IGN)</p>
									<P>{{profile_info[game_index].gameName}}</P>
								</div>
								<div class="game_id">
									<p class="label_name">In Game ID(IGID)</p>
									<P>{{profile_info[game_index].igid}}</P>
								</div>
							</div>
							<div class="game_char">
								<P class="label_name">Game Character</P>
								<p>{{profile_info[game_index].role}}</p>
							</div>
							<div class="game_intro">
								<p class="label_name">In Game Introduction (why people should team with me)</p>
								<p>{{profile_info[game_index].introduce}}</p>
							</div>
						</div>
					</div>
					<div class="block_3" v-if="profile_info[game_index].introduction != '' && profile_info[game_index].introduction != null">
						<div class="block_3_title">
							<p>Achievements</p>
						</div>
						<div class="block_3_content">
							<p>{{profile_info[game_index].introduction}}</p>
						</div>
					</div>
					<div class="block_4" v-if="displayAreas_len != 0">
						<div class="block_4_title">
							<p>Display Area</p>
						</div>
						<div class="display_area">
							<div class="big_img">
								<img :src="HOST + profile_info[game_index].displayAreas[img_key].url" :class="{'pic_big': img_key === undex}" />
							</div>
							<div class="small_img">
								<div class="img_block" :class="img_key === undex ? 'img_acv':''" v-for="(utem,undex) in profile_info[game_index].displayAreas" :key="undex"
								 @click="changeImges(undex)">
									<img :src="HOST + utem.url" />
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
	import {friendRemove} from '@/api/friend.js'
	import {
		profileUser
	} from '@/api/team';
	export default {
		name: 'view_profile_two',
		data() {
			return {
				nav: 1,
				remove_status: false,
				listQuery: {
					userId: '',
					fullName: '',
					avatar: '',
				},
				profile_info: '',
				displayAreas_len: '',
				game_index:0,	//游戏logo的下标
			}
		},
		mounted() {
			if (this.$route.query != '' && this.$route.query != null && this.$route.query != undefined) {
				this.listQuery = this.$route.query
				this.get_profile()
			}
		},
		methods: {
			switch_game(index) {
				this.game_index = index
			},
			// 删除朋友
			del_friend(){
				let that = this;
				this.$confirm('Delete this friend?', 'Confirmation', {
				  confirmButtonText: 'Confirm',
				  cancelButtonText: 'Cancel',
				  type: 'warning',
				  center: true
				}).then(() => {
					friendRemove({userId: that.listQuery.userId}).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.$router.push({ path: '/friend_list/my_friend'})
					})
				})
			},
			// 获取用户游戏配置
			get_profile() {
				let that = this;
				profileUser({
					userId: that.listQuery.userId
				}).then(res => {
					that.profile_info = res.data
					for (let i in res.data) {
						that.displayAreas_len = (res.data[i].displayAreas).length
					}
				})
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

		.content_left_info {
			width: 318px;
			height: 315px;
			background: #0E0F11;
			border-radius: 36px;
			margin-top: 80px;
			.img {
				width: 50%;
				height: 150px;
				overflow: hidden;
				display: flex;
				align-items: center;
				margin: 0 auto 35px;
				position: relative;
				top: 30px;
				border-radius: 36px;
				.avatar_img {
					max-width: 100%;
					border-radius: 36px;
					.default_img{
						width: 100%;
						height: 150px;
					}
				}			}
			.per_info {
				margin: 80px auto 10px;
				.per_name {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FFFFFF;
					font-size: 22px;
					padding: 16px 23px 0;
					font-family:'Roboto-Medium';
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

			//.per_info
		}

		//content_left_info
		.content_right {
			width: calc(100% - 370px);
			margin-top: 80px;

			.text_block {
				// width: 1200px;
				padding: 20px 0;
				width: 100%;
				background: #0E0F11 0% 0% no-repeat padding-box;
				border-radius: 25px;
				display: inline-block;
				margin-bottom: 30px;
				position: relative;

				.text_area {
					text-align: left;
					color: #727272;
					margin-left: 50px;
					display: inline-block;

					.white {
						color: #fff
					}
				}

				.more {
					width: 30px;
					cursor: pointer;
					margin: 11px 20px;
					position: relative;
				}

				.noneMoreDel {
					background: #1D2023;
					color: red;
					padding: 17px 28px;
					border-radius: 25px;
					bottom: -20px;
					position: absolute;
					left: 125px;
					-webkit-box-shadow: 5px 5px 5px 5px #0E0F11;
					box-shadow: 0px 0px 10px 1px #0E0F11;
					font-size: 16px;
				}

				.friend {
					float: left;
					margin-left: 40px;
					padding: 10px 20px;
					border-radius: 20px;
					background: #1D2023;

					img {
						width: 30px;
						cursor: pointer;
					}
				}

				.chat_img {
					float: right;
					margin-right: 40px;
					padding: 15px 30px;
					border-radius: 20px;
					background: #1D2023;

					img {
						width: 20px;
						float: left;
					}

					span {
						display: inline-block;
						margin-top: 2px;
						margin-left: 10px;
						color: #D3AA53;
					}
				}
			}

			//text_block
			.no_data_area{
				width: 100%;
				height:500px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-family:'Roboto-Regular';
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
			.block_2 {
				// height: 375px;
				background: #0E0F11;
				border-radius: 56px;
				margin-top: 50px;
				padding-bottom: 40px;
				font-family:'Roboto-Regular';
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

					//img_nav

				}

				//block_2_top
				.block_2_content {
					padding: 0 60px 0 60px;
					font-size: 18px;

					.label_name {
						color: #727272;
						font-size: 18px;
					}

					.content_name_id {
						display: flex;
						color: #ffffff;

						.game_name {
							width: 50%;
						}
					}

					.game_char {
						color: #ffffff;
					}

					.game_intro {
						color: #ffffff;
						margin-top: 50px;
					}
				}

				//block_2_content
			}

			//block_2
			.block_3 {
				background: #0E0F11;
				border-radius: 56px;
				margin-top: 50px;
				padding-bottom: 40px;
				font-family:'Roboto-Regular';
				.block_3_title {
					color: #D3AA53;
					border-bottom: 1px solid #565656;
					font-size: 18px;
					padding-top: 10px;
					font-family:'Quicksand-Bold';
					p {
						margin-left: 60px;
					}
				}

				.block_3_content {
					color: #ffffff;
					font-size: 18px;

					p {
						margin: 30px 60px;
					}
				}
			}

			.block_4 {
				background: #0E0F11;
				border-radius: 56px;
				margin-top: 50px;
				padding-bottom: 40px;
				font-family:'Roboto-Regular';
				.block_4_title {
					color: #D3AA53;
					border-bottom: 1px solid #565656;
					font-size: 18px;
					padding-top: 10px;
					font-family:'Quicksand-Bold';
					p {
						margin-left: 60px;
					}
				}
				.display_area {
					margin-left: 20%;
					margin-top: 40px;
					.big_img {
						width: 677px;
						height: 383px;

						.pic_big {
							width: 677px;
							height: 383px;
						}
					}

					.small_img {
						display: flex;
						margin-top: 36px;
						.img_block {
							width: 154px;
							height: 87px;
							margin-right: 25px;
							img {
								width: 154px;
								height: 87px;
							}
						}
						.img_acv {
							border: 3px solid #D3AA53;
						}
					}
				}
			}
		}
	}
</style>
