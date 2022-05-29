<template>
	<div class="index">
		<div class="container">
			<LeftView :index="10"></LeftView>
			<div class="content_right">
				<div class="link_block">
					<p class="block_title">Link Account</p>
					<div class="block_cont">
						<div class="row_1">
							<div class="row_left">
								<img class="logo" src="../../assets/images/facebook.png" />
								<p class="name">Facebook</p>
							</div>
							<div :class="showFBLink == true ? 'row_right_green' : 'row_right'">{{showFBLink == true ? 'Link' :'-'}}</div>
						</div>
						<div class="row_2">
							<div class="row_left">
								<img class="logo" src="../../assets/images/Group.png" />
								<p class="name">Google</p>
							</div>
							<div :class="showLink == true ? 'row_right_green' : 'row_right'">{{showLink == true ? 'Link' :'-'}}</div>
						</div>
					</div>
				</div>
				<div class="other_block">
					<p class="block_title">Other</p>
					<div class="block_cont">
						<div class="row_1">
							<p>Language</p>
							<p>English</p>
						</div>
						<div class="row_2">
							<p target="_blank" @click="jump_blank('https://bountee.com.my/term-of-service/')">Term of Service</p>
						</div>
						<div class="row_3">
							<p target="_blank" @click="jump_policy('https://bountee.com.my/privacy-policy/')">Privacy Policy</p>
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
		name:"index",
		data(){
			return{
				userInfo:{},
				showLink:false,
				showFBLink:false
			}
		},
		components:{
			LeftView
		},
		mounted() {
			this.userInfo = JSON.parse(sessionStorage.getItem("userinfo"))
			// console.log(this.userInfo,"这里是userInfo")
			if(this.userInfo.registerType == 'google'){
				this.showLink = true
				this.showFBLink = false
			}else if (this.userInfo.registerType == 'facebook'){
				this.showFBLink = true
				this.showLink = false
			}else{
				this.showLink = false
				this.showFBLink = false
			}
		},
		methods:{
			jump_blank(url){
				window.open(url)
			},
			jump_policy(url){
				window.open(url)
			}
		}
	}
</script>

<style lang="less" scoped> 
.container{
	width: 90%;
	margin-left: 61px;
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	padding-bottom: 30px;
	.content_right{
		width: calc(100% - 370px);
		
		.link_block{
			margin-top: 100px;
			width: 95%;
			.block_title{
				color: #ffffff;
				font-size: 22px;
				margin-left: 30px;
				font-family:'Quicksand-Bold';
			}
			.block_cont{
				// height: 200px;
				background: #0E0F11;
				border-radius: 39px;
				padding-bottom: 8px;
				div:last-child{
					border: none;
				}
				.row_1{
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 2px solid #2D2D2D;
					margin: 0 30px 10px 30px;
					padding: 20px 33px 0 33px;
					.row_left{
						display: flex;
						align-items: center;
						.logo{
							width: 37px;
							height: 37px;
							background-color: #fff;
							border-radius: 19px;
						}
						.name{
							color: #727272;
							font-size: 20px;
							margin-left: 30px;
							font-family:'Roboto-Regular';
						}
					}
					.row_right_green{
						color: #83FF00;
						font-size: 20px;
						font-family:'Roboto-Bold';
					}
					.row_right{
						color: #fff;
						font-size: 20px;
					}
				}
				.row_2{
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 2px solid #2D2D2D;
					margin: 0 30px 10px 30px;
					padding: 5px 33px 0 33px;
					.row_left{
						display: flex;
						align-items: center;
						.logo{
							width: 37px;
							height: 37px;
						}
						.name{
							color: #727272;
							font-size: 20px;
							margin-left: 30px;
							font-family:'Roboto-Regular';
						}
					}
					.row_right{
						color: #fff;
						font-size: 20px;
					}
					.row_right_green{
						color: #83FF00;
						font-size: 20px;
						font-family:'Roboto-Bold';
					}
				}
			}
		}
		.other_block{
			width: 95%;
			margin-top: 45px;
			.block_title{
				color: #fff;
				font-size: 22px;
				margin-left: 30px;
				font-family:'Quicksand-Bold';
			}
			.block_cont{
				background: #0E0F11;
				border-radius: 39px;
				padding-bottom: 8px;
				div:last-child{
					border: none;
				}
				p{
					margin: 0;
				}
				.row_1{
					display: flex;
					justify-content: space-between;
					border-bottom: 2px solid #2D2D2D;
					margin: 0 30px 10px 30px;
					padding: 25px 33px ;
					p{
						color: #727272;
						font-size: 20px;
						font-family:'Roboto-Regular';
					}
				}
				.row_2{
					display: flex;
					justify-content: space-between;
					border-bottom: 2px solid #2D2D2D;
					margin: 0 30px 10px 30px;
					padding: 15px 33px 20px 33px;
					cursor: pointer;
					p{
						color: #727272;
						font-family:'Roboto-Regular';
						font-size: 20px;
					}
				}
				.row_3{
					display: flex;
					justify-content: space-between;
					border-bottom: 2px solid #2D2D2D;
					margin: 0 30px 10px 30px;
					padding: 15px 33px 20px 33px;
					cursor: pointer;
					p{
						color: #727272;
						font-size: 20px;
						font-family:'Roboto-Regular';
					}
				}
			}
		}
	}
}
</style>
