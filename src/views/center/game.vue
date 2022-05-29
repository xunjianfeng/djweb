<template>
	<div class="index">
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<div class="adiv" @click="jump_pagee(1)">
						<p class="av">Profile</p>
					</div>
					<div class="adiv" @click="jump_pagee(2)">
						<p >Wallet</p>
					</div>
					<!-- 正式服隐蔽项start -->
					<!-- <div class="adiv" @click="jump_pagee(3)">
						<p >Host</p>
					</div>
					<div class="adiv" @click="jump_pagee(4)">
						<p >Companion</p>
					</div> -->
					<!-- 正式服隐蔽项end -->
				</div>
				<div class="content_right_form">
					<div class="right_form_title">
						<p @click="jump_personal_info">Personal Information</p>
						<p>Game profile</p>
						<div class="qbutton" v-if="profile_info != ''"  @click.stop="jump_update_data">Edit</div>
						<div class="add" v-if="profile_info == ''" @click.stop="jump_update_data">Add</div>
					</div>
					<div class="right_form_information">
						<!-- 没有数据 -->
						<div class="no_data_area"  v-if="profile_info == ''" >
							<div class="no_data">
								<img src="../../assets/images/no_tournament.svg" />
								<div class="no_data_text">No Game Profile</div>
								<div class="no_data_text">You may add yours now</div>
							</div>
						</div>
						<div class="form_inputs" v-if="profile_info != ''">
							<div class="form_input3">
								<div class="inputs_img1" v-for="(item,index) in profile_info" :key='index'>
									<el-image :src="HOST + item.gameLogo" class="game_img"  @click="switch_game(index)"> 
										<div slot="error" class="image-slot"> 
											<img src="../../assets/images/default_game.png" class="default_img"  @click="switch_game(index)"/>
										</div>
									</el-image>
									<!-- <img v-if="item.gameLogo" :src="HOST + item.gameLogo" alt="" @click="switch_game(index)"> -->
									<!-- <img v-else src="../../assets/images/default_game.png" @click="switch_game(index)"/> -->
								</div>
							</div>
							<div class="form_content">
								<div class="form_input1">
									<p>In Game Name (IGN)</p>
									<input type="text" disabled="disabled" class="input" v-model="profile_info[game_index].ign">
								</div>
								<div class="form_input1">
									<p>In Game ID (IGID)</p>
									<input type="text" disabled="disabled" class="input" v-model="profile_info[game_index].igid">
								</div>
								<div class="form_input1">
									<p>Game Character</p>
									<input type="text" disabled="disabled" class="input" v-model="profile_info[game_index].role">
								</div>
							</div>
							<div class="form_input3" style="width:98%">
								<p>In Game Introduction （why people should team with me) </p>
								<textarea name="" id="" disabled="disabled" cols="30" rows="10" v-model="profile_info[game_index].introduce"></textarea>
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
	} from '@/api/center'
	import LeftView from '@/components/order/left.vue'
	export default {
		name: "index",
		components: {
			LeftView
		},
		data() {
			return {
				profile_info: [], //游戏配置
				game_index: 0,
			};
		},
		mounted() {
			this.get_profile();
		},
		methods: {
			switch_game(index) {
				this.game_index = index
			},
			// 获取用户游戏配置
			get_profile() {
				let that = this;
				profileUser({}).then(res => {
					that.profile_info = res.data
				})
			},
			jump_personal_info() {
				this.$router.push({
					path: '/center/profile'
				})
			},
			jump_update_data() {
				this.$router.push({
					path: '/center/update_data'
				})
			},
			// 跳转页面
			jump_pagee(index){
				if(index == 1){
					this.$router.push({path: '/center/profile'})
				}else if(index == 2){
					this.$router.push({path: '/order/wallet'})
				}else if(index == 3){
					this.$router.push({path: '/order/host'})
				}else if(index == 4){
					this.$router.push({path: '/center/companion'})
				}
			},
		}
	};
</script>
<style lang="less" scoped>
	.container {
		width: 90%;
		margin-left: 61px;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;
		.content_right {
			width: calc(100% - 370px);
			.content_right_nav{
				margin-top: 50px;
				margin-bottom: 20px;
				font-family:'Roboto-Regular';
				p{
					display: inline-block;
					color: #898989;
					padding: 0 30px;
					font-size: 16px;
					margin: 0;
				 }
				.adiv{
					display: inline-block;
					cursor: pointer;
					border-right: 1px solid #7F7F7F;
					&:last-child{
						border: none;
					}
				}
				a {
					border-right: 1px solid #7F7F7F;
					&:nth-child(4) {
						border: none;
					}
				}
				.av{
					color: #BF9D62;
					font-family:'Roboto-Bold';
				}
			}
			.content_right_form {
				width: calc(100% - 60px);
				background: #0E0F11;
				border-radius: 50px;
				padding: 20px;

				.right_form_title {
					display: inline-block;
					width: 95%;
					margin: 0 2.5%;

					p {
						color: #fff;
						display: inline-block;
						margin-right: 50px;
						font-family:'Quicksand-Regular';
						cursor: pointer;
						&:nth-child(2) {
							padding-bottom: 5px;
							border-bottom: 2px solid #D3AA53;
							font-family:'Quicksand-Bold';
						}

						&:nth-child(1) {
							color: #727272;
						}
					}

					.qbutton {
						width: 120px;
						height: 50px;
						background: #0E0F11;
						border: 1px solid #777777;
						color: #fff;
						border-radius: 50px;
						font-size: 14px;
						display: flex;
						align-items: center;
						justify-content: center;
						float: right;
						font-family:'Roboto-Regular';
						cursor: pointer;
					}
					.add {
						width: 120px;
						height: 50px;
						background: #D3AA53;
						// border: 1px solid #777777;
						color: #0E0F11;
						border-radius: 50px;
						font-size: 14px;
						display: flex;
						align-items: center;
						justify-content: center;
						float: right;
						font-family:'Roboto-Regular';
						cursor: pointer;
					}
				}

				.right_form_change {
					width: 90%;
					margin: 0 2.5%;
					border: 1px solid #2D2D2D;
					border-radius: 20px;
					margin-top: 20px;
					display: flex;
					align-items: center;
					padding: 2.5%;

					p {
						color: #D3AA53;
						font-size: 14px;
						margin-left: 30px;
					}
				}

				.right_form_information {
					width: 95%;
					margin: 0 2.5%;
					margin-top: 30px;

					.information_title {
						color: #fff;
						padding-top: 20px;
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
								margin-bottom: 25px;
							}
							.no_data_text{
								color: #565656;
								font-size: 20px;
								margin-bottom: 10px;
							}
						}
					}
					.form_inputs {
						font-family:'Roboto-Regular';
						.form_content {
							display: flex;
							justify-content: space-between;
							/* 横向中间自动空间 */
							flex-wrap: wrap;

							/* 换行 */
							.form_input {
								width: 45%;

								&:nth-child(2n) {
									position: relative;
									left: -20px;
								}

								p {
									color: #727272;
									font-size: 15px;

									span {
										color: red;
									}
								}

								input {
									width: 100%;
									height: 55px;
									// border-radius: 19px;
									color: #fff;
									background: inherit;
									font-size: 16px;
								}
							}

							.form_input1 {
								width: 45%;
								margin-top: 20px;
								position: relative;

								&:nth-child(2n) {
									position: relative;
									left: -20px;
								}

								p {
									color: #727272;
									font-size: 15px;

									span {
										color: red;
									}
								}

								.input {
									width: 100%;
									border: none;
									// border-radius: 19px;
									color: #fff;
									background: inherit;
									font-size: 16px;
								}

								.form_input_phone {
									width: 150px;
									display: flex;
									align-items: center;
									position: absolute;
									top: 47px;
									left: 20px;

									p {
										height: 30px;
										line-height: 30px;
										margin-left: 10px;
										border-right: 1px solid #2d2d2d;
										padding-right: 10px;
									}
								}

								.form_input1_content {
									width: 105%;
									height: 55px;
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									position: relative;

									input {
										width: 85%;
										height: 55px;
										color: #fff;
										background: inherit;
										padding-left: 20px;
										border: none;
										font-size: 16px;
									}

									.input1 {
										width: 50%;
										margin-left: 130px;
									}

									img {
										position: absolute;
										right: 15px;
										top: 20px
									}
								}

							}

							.form_input2 {
								width: 45%;
								margin-top: 20px;

								&:nth-child(2n) {
									position: relative;
									left: -20px;
								}

								p {
									color: #727272;
									font-size: 15px;

									span {
										color: red;
									}
								}

								input {
									width: 100%;
									height: 55px;
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									color: #fff;
									background: inherit;
									padding-left: 20px;
									font-size: 16px;
								}
							}
						}

						.form_input3 {
							width: 100%;
							display: inline-block;

							&:nth-child(1) {
								border-bottom: 1px solid #2d2d2d;
							}

							padding-bottom: 30px;

							.inputs_img {}

							.inputs_img1 {
								display: flex;
								align-items: center;
								float: left;

								.game_img {
									width: 100px;
									height: 100px;
									object-fit: fill;
									margin-right: 40px;
								}
								.default_img{
									width: 100px;
									height: 100px;
									object-fit: fill;
									margin-right: 40px;
								}
								p {
									color: #fff;
									margin-left: 20px;
								}
							}

							p {
								color: #727272;
								font-size: 15px;

								span {
									color: red;
								}
							}

							input {
								width: 100%;
								height: 55px;
								border: 2px solid #2D2D2D;
								border-radius: 19px;
								color: #fff;
								background: inherit;
								padding-left: 20px;
								font-size: 16px;
							}

							textarea {
								width: calc(100% - 20px);
								border: none;
								border-radius: 15px;
								color: #fff;
								background: inherit;
								font-size: 16px;
								height: 120px;
								resize: none;
								font-family:'Roboto-Regular';
							}
						}
					}
				}
			}
		}
	}
</style>
