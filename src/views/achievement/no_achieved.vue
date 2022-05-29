<template>
	<div class="index">
		<div class="container">
			<LeftView :index="8"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<router-link to="/achievement/achievement">
						<div class="nav_left">
							<< Back to list
						</div>
					</router-link>
				</div>
				<div class="content_block">
					<div class="block_top">
						<div class="achieved_img">
							<img src="../../assets/images/medal_2.png" />
						</div>
						<div class="achieved_info">
							<div class="info_1">
								<div class="achieved_name">Charm Master</div>
								<!-- <img src="../../assets/images/yg.png" /> -->
							</div>
							<div class="get_time">Not Achieved</div>
						</div>
					</div>
					<div class="achieved_text_area">
						<div class="how_text">
							<div class="text_title">How to Get</div>
							<div class="text_area">
								<div class="text">Receive the most gift (worth 5,000 Points).</div>
							</div>
						</div>
						<div class="terms_text">
							<div class="text_title">Bonus</div>
							<div class="text_bonus">
								<div class="bonus_img">
									<img src="../../assets/images/human.png" alt="">
								</div>
								<div class="bonus_text">750<span>Points</span></div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/order/left.vue'
	export default{
		name:"no_achieved",
		data(){
			return{
				
			}
		},
		components:{
			LeftView
		}
	}
</script>

<style lang="less" scoped>
.container{
	margin-left: 61px;
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	padding-bottom: 30px;
	.content_right{
		width: calc(100% - 370px);
		.content_right_nav {
			margin-top: 50px;
			a{
				text-decoration: none;
			}
			.nav_left {
				font-size: 20px;
				color: #fff;
				font-weight: bold;
				font-family:'Quicksand-Bold';
			}
		}
		.content_block{
			width: calc(100% - 198px);
			background: #0E0F11;
			border-radius: 46px;
			margin-top: 27px;
			.block_top{
				width: 85%;
				display: flex;
				align-items: center;
				border-bottom: 2px solid #2D2D2D;
				margin-left: 76px;
				padding-top: 50px;
				padding-bottom:59px;
				.achieved_img{
					width: 30%;
					img{
						width: 182px;
						height: 172px;
						margin-left: 10px;
					}
				}
				.achieved_info{
					margin-left: 20px;
					.info_1{
						display: flex;
						align-items: center;
						margin-bottom: 10px;
						img{
							width: 26px;
							height: 26px;
							margin-left: 20px;
						}
						.achieved_name{
							color:#BBBBBB;
							font-size: 30px;
							font-family:'Quicksand-Bold';
						}
					}
					.get_time{
						color: #727272;
						font-size: 18px;
						font-family:'Roboto-Regular';
					}
				}//achieved_info
			}//.block_top
			.achieved_text_area{
				width: 85%;
				background-color: #0E0F11;
				padding-bottom: 120px;
				margin-bottom: 50px;
				margin-top: 24px;
				margin-left: 76px;
				.how_text{
					padding-top: 40px;
					.text_title{
						color: #ffffff;
						font-size: 22px;
						font-family:'Roboto-Medium';
					}
					.text_area{
						color: #727272;
						font-size: 20px;
						margin-top: 27px;
						font-family:'Roboto-Regular';
						div{
							margin-bottom: 15px;
						}
					}
				}
				
				.terms_text{
					margin-top: 75px;
					.text_title{
						color: #ffffff;
						font-size: 22px;
						margin-bottom: 34px;
						font-family:'Roboto-Medium';
					}
					.text_bonus{
						display: flex;
						align-items: center;
						.bonus_img{
							width: 37px;
							height: 37px;
							margin-right: 17px;
							img{
								width: 37px;
								height: 37px;
							}
						}
						.bonus_text{
							color: #FCDE61;
							font-size: 25px;
							font-weight: bold;
							span{
								margin-left: 10px;
								font-size: 18px;
								font-weight: 500;
								font-family:'Roboto-Regular';
							}
						}
					}
				}
			}
		}
	}
}
</style>
