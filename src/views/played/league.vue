<template>
	<div class="index">
		<div class="container">
			<LeftView :index="3"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<router-link to="/center/personal">
						<p>Profile</p>
					</router-link>
					<router-link to="/order/wallet">
						<p>Wallet</p>
					</router-link>
					<router-link to='/order/host'>
						<p>Host</p>
					</router-link>
					<router-link to='/center/companion'>
						<p class="av">Companion</p>
					</router-link>
				</div>
				<div class="content_right_form">
					<div class="right_in_img">
						<img class="info_game" src="@/assets/images/game.png" alt="">
					</div>
					<div class="in_content">
						<div class="in_tit">Apply to be a Companion</div>
						<div class="in_info">If you are ready to become a Companion to offer your service, please click the APPLY button
							below. Your application is not guaranteed and is under platform’s approval within 72 hours.</div>
						<div class="in_btn" @click="jump_apply">Apply</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/order/left.vue'
	export default {
		name: "index",
		components: {
			LeftView
		},
		data() {
			return {};
		},
		mounted() {
			console.log('compainon.....')
		},
		methods: {
			jump_apply() {
				this.$router.push({
					path: '/order/apply'
				})
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

		.content_left {
			width: 318px;
			height: 761px;
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
					padding: 0 30px;
					font-size: 16px;
				}

				a {
					border-right: 1px solid #7F7F7F;

					&:last-child{
						border: none;
					}
				}

				.av {
					color: #BF9D62;
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
					margin: 111px 0 54px 0;

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
					}

					.in_info {
						font-size: 20px;
						line-height: 25px;
						font-weight: 500;
						color: #989898;
						margin: 14px 0 77px 0;
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
					}
				}


			}
		}
	}
</style>
