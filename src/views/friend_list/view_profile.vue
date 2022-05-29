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
					<!-- <img src="../../assets/images/default.png" v-else/> -->
				</div>
				<div class="per_info">
					<div class="per_name">
						<p>{{listQuery.fullName}}</p>
					</div>
				</div>
			</div>
			<div class="content_right">
				<div class="block_1">
					<div class="block_left">
						<button class="true_btn" @click="getState(2)">
							<img src="../../assets/images/right_green.png" />
							Accept
						</button>
						<button class="false_btn" @click="getState(3)">
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
				<!-- 没有数据 -->
				<div class="no_data_area"  v-if="profile_info == ''" >
					<div class="no_data">
						<img src="../../assets/images/no_tournament.svg" />
						<div class="no_data_text">No any games</div>
					</div>
				</div>
				<div class="info_block" v-if="profile_info != ''">
					<div class="block_2" >
						<div class="block_2_top">
							<div class="img_nav">
								<div class="nav_1" v-for="(item,index) in profile_info" :key="index">
									<img :src="HOST + item.gameLogo" @click="switch_game(index)" v-if="item.gameLogo"/>
									<img src="../../assets/images/default_game.png" v-else @click="switch_game(index)"/>
								</div>
							</div><!-- img_nav -->
						</div><!-- block_2_top -->
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
								<p>
									{{profile_info[game_index].introduce}}
									<!-- Lorem ipsum dolor sit amet,consectetuer adipiscing edit,seed diam nonummy nibh euismod tincidunt ut laoreet
									dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam,quis nostrud exerci tation ullamcorper suscipit
									lobortis nisl ut aliquip ex ea commodo consequat.Duis autem vel eum iriure dolor in hendrerit in vulputate -->
								</p>
							</div>
						</div><!-- block_2_content -->
					</div><!-- block_2 -->
					<!-- v-if="item.introduction != ''&&item.displayAreas != null" -->
					<div class="block_3" v-if="profile_info[game_index].introduction != '' && profile_info[game_index].introduction != null">
						<div class="block_3_title">
							<p>Achievements</p>
						</div>
						<div class="block_3_content">
							<p>
								{{profile_info[game_index].introduction}}
							</p>
						</div>
					</div><!-- block_3 -->
					 <!-- v-if="displayAreas_len != 0" -->
					<div class="block_4" v-if="displayAreas_len != 0">
						<div class="block_4_title">
							<p>Display Area</p>
						</div>
						<div class="display_area">
							<div class="big_img">
								<img :src="HOST + profile_info[game_index].displayAreas[img_key].url" :class="{'pic_big': img_key === undex}"/>
								<!-- <img :class="{'pic_big': status === index}" src="../../assets/images/bac_one.png" v-if="status === 0" />
								<img :class="{'pic_big': status === index}" src="../../assets/images/bac_one.png" v-if="status === 1" />
								<img :class="{'pic_big': status === index}" src="../../assets/images/bac_one.png" v-if="status === 2" /> -->
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
	import {
		profileUser
	} from '@/api/team';
	import {agreeFriend} from '@/api/friend.js'
	export default {
		name: 'view_profile',
		data() {
			return {
				nav: 1,
				value: 4,
				listQuery:{
					fansId:'',
					fullName:'',
					avatar:'',
				},
				img_key:0,
				profile_info:'',
				displayAreas_len:'',
				game_index:0,
			}
		},
		mounted() {
			if(this.$route.query != '' && this.$route.query != null && this.$route.query != undefined){
				this.listQuery = this.$route.query
				this.get_profile();
			}
		},
		methods: {
			//点击游戏logo切换内容
			switch_game(index) {
				// console.log(index)
				this.game_index = index
			},
			// 获取用户游戏配置
			get_profile() {
				let that = this;
				profileUser({userId:that.listQuery.fansId}).then(res => {
					that.profile_info = res.data
					for(let i in res.data){
						that.displayAreas_len = (res.data[i].displayAreas).length
					}
				})
			},
			//切换图片
			changeImges(undex) {
				this.img_key = undex;
			},
			// 同意或拒绝添加好友
			getState(index){
				if(index == 2){
					let params = {
						userId:this.listQuery.fansId,
						state:2
					}
					agreeFriend(params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: res.message
						})
						this.$router.go(-1);
						// this.reload()
					})
					
				}else if(index == 3){
					let params = {
						userId:this.listQuery.fansId,
						state:3
					}
					agreeFriend(params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: res.message
						})
						this.$router.go(-1);
						// this.reload()
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
			// height: 465px;
			height: 318px;
			background: #0E0F11;
			border-radius: 36px;
			margin-top: 80px;
		
			// padding: 20px;
			.img {
				width: 50%;
				height: 150px;
				overflow: hidden;
				display: flex;
				align-items: center;
				margin: 15px auto 35px;
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
				width: 90%;
				margin: 40px auto 10px;
				.per_name {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FFFFFF;
					font-size: 22px;
					font-family:'Roboto-Medium';
				}
			}
		}
		
		//content_left_info
		.content_right {
			width: calc(100% - 370px);
			margin-top: 80px;
			font-family:'Roboto-Regular';
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
						font-size: 18px;
						margin-right: 30px;
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
			.info_block{
				font-family:'Roboto-Regular';
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
				
								img {
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
				//block_3
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
									// margin-right: 25px;
								}
				
							}
				
							.img_acv {
								border: 3px solid #D3AA53;
							}
				
						}
					}
				}
				//block_4
			}
			
		}
	}
</style>
