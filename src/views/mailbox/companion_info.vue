<template>
	<div class="index">
		<div class="container">
			<div class="content_left_block">
				<div class="search">
					<input placeholder="Enter UID" />
					<button class="btn">
						<img src="../../assets/images/search.png" />
					</button>
				</div>
				<div class="left_nav">
					<p class="acv">All index</p>
					<p class="no_acv">
						<!-- Collect -->
						 Favorites
						<img src="../../assets/images/star_gray.png" />
					</p>
				</div>
			</div>
			
			<div class="content_right">
				<div class="right_top">
					<img class="star" src="../../assets/images/star_gray.png" />
					<p class="del">
						<img src="../../assets/images/delete_gray.png"/>
						delete
					</p>
				</div>
				<div class="right_form">
					<div class="form_top">
						<div class="form_top_left">
							<p>Companion cancel order</p>
						</div>
						<div class="form_top_right">
							<p class="top_right_1">
								<img src="../../assets/images/icon_e.png" />
								E-SPORT
							</p>
							<P class="top_right_date">23 July 2020</P>
						</div>
					</div>
					<div class="form_user_info">
						<img src="../../assets/images/user.png" />
						<div class="msg">
							<p class="name">Peter</p>
							<p>Dota 2</p>
						</div>
					</div>
					<div class="choice">
						<p>Your Companion has cancelled your order, sorry about that. Do you have any review to put?</p>
						<div class="option_select">
							<div class="yes">
								<img src="../../assets/images/yls.png" />
								<p>YES</p>
							</div>
							<div class="no">
								<img src="../../assets/images/yl.png" />
								<p>NO</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
.container{
	width: 90%;
	margin-left: 61px;
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	padding-bottom: 30px;
	.content_left_block{
		margin-top: 55px;
		.search{
			display: flex;
			background: #0E0F11;
			border-radius: 23px;
			input{
				width: 255px;
				height: 60px;
				background: #0E0F11;
				border-radius: 23px;
				font-size: 18px;
				font-family:'Roboto-Regular';
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
				img{
					width: 22px;
					height: 22px;
				}
			}
		}
		.left_nav{
			.acv{
				width: 316px;
				height: 53px;
				background: #0E0F11;
				border-radius: 20px;
				color: #D3AA53;
				font-size: 18px;
				line-height: 53px;
				font-family:'Quicksand-Bold';
				padding-left: 32px;
				margin-top: 23px;
			}
			.no_acv{
				color: #9B9B9B;
				font-size: 18px;
				padding-left: 32px;
				font-family:'Quicksand-Bold';
				margin-top: 47px;
				img{
					width: 17px;
					height: 16px;
					margin-left: 12px;
				}
			}
		}
	}
	.content_right{
		width: calc(100%-420px);
		.right_top{
			width: 100%;
			display: flex;
			align-items: center;
			.star{
				width: 36px;
				height: 34px;
				margin-left: 15px;
			}
			.del{
				color: #7F7F7F;
				font-size: 20px;
				display: flex;
				align-items: center;
				margin-left: 62px;
				font-family:'Roboto-Regular';
				img{
					width: 28px;
					height: 24px;
				}
			}
		}
		.right_form{
			height: 506px;
			background: #0E0F11;
			border-radius: 32px;
			.form_top{
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #565656;
				margin-left: 47px;
				margin-right: 45px;
				padding-top: 10px;
				.form_top_left{
					color: #FFFFFF;
					font-size: 25px;
					font-family:'Roboto-Bold';
				}
				.form_top_right{
					display: flex;
					.top_right_1{
						color: #ffffff;
						font-family:'Roboto-Bold';
						font-size: 20px;
						display: flex;
						align-items: flex-end;
						img{
							width: 26px;
							height: 26px;
							margin-right: 9.5px;
						}
					}
					.top_right_date{
						color: #727272;
						font-size: 20px;
						margin-left: 88px;
						font-family:'Roboto-Bold';
					}
				}
			}
			.form_user_info{
				margin-top: 40px;
				display: flex;
				align-items: center;
				margin-left: 47px;
				p{
					margin: 0;
					font-family:'Roboto-Regular';
				}
				img{
					width: 120px;
					height: 119px;
					border-radius: 10px;
				}
				.msg{
					color: #727272;
					font-size: 18px;
					margin-left: 53px;
					font-family:'Roboto-Regular';
					.name{
						color: #ffffff;
						font-size: 22px;
						margin-bottom: 13px;
						font-family:'Roboto-Medium';
					}
				}
			}
			.choice{
				margin-left: 47px;
				margin-top: 67px;
				p{
					color: #727272;
					font-size: 20px;
				}
				.option_select{
					display: flex;
					.yes{
						display: flex;
						align-items: center;
						p{
							margin-left: 22px;
							font-family:'Roboto-Regular';
						}
						img{
							width: 33px;
							height: 33px;
						}
					}
					.no{
						display: flex;
						align-items: center;
						margin-left: 78px;
						p{
							margin-left: 22px;
							font-family:'Roboto-Regular';
						}
						img{
							width: 33px;
							height: 33px;
						}
					}
				}
			}
		}
	}
}
</style>
