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
						<p>Host</p>
					</div>
					<div class="adiv" @click="jump_pagee(4)">
						<p class="av">Companion</p>
					</div>
				</div>
				<div class="content_right_form">
					<div class="right_in_img" v-if="companionGame.length > 1 && companionGame[0].examine != 1">
						<img class="info_game" src="@/assets/images/game.png" alt="">
					</div>
					<!-- 等级足够未申请陪玩 -->
					<div class="in_content" v-if="userinfo.vipLevel =='PRO MAX' &&  companionGame.length == 0" style="margin: 80px auto;">
						<div class="in_tit">Apply to be a Companion</div>
						<div class="in_info">If you are ready to become a Companion to offer your service, please click the <span>APPLY</span>
							button below. Your application is not guaranteed and is under platform’s approval within 72 hours.</div>
						<div class="in_btn" @click="jump_apply(1)">Apply</div>
					</div>
					<!-- 等级不够 -->
					<div class="in_content" v-if="companionGame.length  == 0 && userinfo.vipLevel =='BASIC'" style="margin: 80px auto;">
						<div class="in_tit">Apply to be a Companion</div>
						<div class="in_info">Please upgrade to Pro Max member before you could apply to provide Companion service.</div>
						<div class="in_btn" @click="jump_apply(0)">I want to be Pro Max Member</div>
					</div>
					<!-- 陪玩审核中 -->
					<div class="in_content" v-if="companionGame.length != 0 && companionGame[0].examine == 1" style="margin: 80px auto;">
					   <div class="in_tit" @click="jump_applySuccess">Apply to be a Companion</div>
					   <div class="in_info">Your application is under progress,please stay tuned for it!</div>
					</div>
					<!-- 陪玩审核失败 -->
					<div class="in_content" v-if="companionGame.length != 0 && companionGame[0].examine == 3" style="margin: 80px auto;">
					   <div class="in_tit" >Apply to be a Companion</div>
					   <div class="in_info">Your application has failed, please apply again!</div>
					   <div class="in_btn" @click="jump_apply(1)">Apply</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		reviewList,
		companionDetail,
		companionBuy
	} from '@/api/companion'
	import LeftView from '@/components/order/left.vue'
	export default {
		name: "index",
		components: {
			LeftView
		},
		data() {
			return {
				userinfo: JSON.parse(sessionStorage.getItem("userinfo")) || {},
				info:'',
				companionGame:'',
			};
		},
		mounted() {
			this.playDetail();
		},
		methods: {
			// 陪玩信息
			playDetail(userId) {
				let that = this;
				let params = {
					userId:that.userinfo.userId
				}
				companionDetail(params).then(res => {
					const {
						info,
						companionGame
					} = res.data
					that.info = info
					that.companionGame = companionGame
					// examine审核状态 1 代处理 2 通过 3 拒绝
					if(  companionGame[0].examine == 2){
						this.$router.push({path: '/order/apply_success_02'})
					}
				})
			},
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
					this.$router.push({
						path: '/order/host'
					})
				} else if (index == 4) {
					this.$router.push({
						path: '/center/companion'
					})
				}
			},
			jump_apply(type) {
				if (type == 1) {
					this.$router.push({
						path: '/order/apply'
					})
				} else {
					this.$router.push({
						path: '/membership/membership_plans'
					})
				}
			}
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
		/* 换行 */
		padding-bottom: 30px;
		.content_right {
			width: calc(100% - 370px);

			.content_right_nav {
				margin-top: 50px;
				margin-bottom: 20px;

				p {
					display: inline-block;
					color: #898989;
					padding: 0 30px;
					font-size: 16px;
					margin: 0;
				}

				.adiv {
					cursor: pointer;
					display: inline-block;
					border-right: 1px solid #7F7F7F;
					font-family:'Roboto-Regular';
					&:last-child {
						border: none;
					}
				}

				.av {
					color: #BF9D62;
					font-family:'Roboto-Bold';
				}
			}

			.content_right_form {
				width: calc(100% - 60px);
				background: #0E0F11;
				height: 549px;
				border-radius: 50px;
				padding: 20px;

				.right_in_img {
					margin: 0 auto;
					text-align: center;
					margin: 100px 0 0px 0;

					.info_game {
						width: 75px;
						height: 75px;
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
						font-family:'Quicksand-Bold';
					}
					.in_info {
						font-size: 20px;
						line-height: 25px;
						font-weight: 500;
						color: #989898;
						margin: 14px 0 77px 0;
						font-family:'Roboto-Regular';
						span {
							color: #FFFFFF;
							font-family:'Roboto-Black';
						}
					}
					.in_btn {
						width: 180px;
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
		}
	}
</style>
