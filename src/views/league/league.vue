<template>
	<div class="index">
		<div class="container">
			<div class="content_header_nav">
				<div :class="nav_index == item.gameCategoryId ? 'header_nav av' : 'header_nav'" v-for="item in category_list" @click="tab_nav(item.gameCategoryId)">{{item.gameCategoryName}}</div>
				<!-- <div :class="nav_index == 2 ? 'header_nav av' : 'header_nav'" @click="tab_nav(2)">Consule</div> -->
				<!-- <div :class="nav_index == 3 ? 'header_nav av' : 'header_nav'" @click="tab_nav(3)">Mobile</div> -->
				<!-- <div v-for="item in category_list" :class="nav_index == item.gameCategoryId ? 'header_nav av' : 'header_nav'" @click="tab_nav(item.gameCategoryId)">
					{{item.gameCategoryName}}
					<div :class="nav_index == item.gameCategoryId ? 'line_under' : ''"></div>
				</div> -->
			</div>
			<div class="content_area">
				<div class="game_list_area">
					<div class="game_list" v-for="(item,index) in league_list" :key="index" @click="jump_teams(item.id,item)">
						<div class="game_img">
							<img :src="HOST + item.poster" />
						</div>
						<div class="game_name">{{item.game.name}}</div>
					</div>
				</div>
				<div class="game_banner">
					<el-carousel class="carousel_block" height="326px" :interval="5000" :autoplay="false">
						<el-carousel-item v-for="(ctem,cndex) in advertisement_list" :key="cndex">
							<img :src="HOST + ctem.imageUrl"  class="carousel_img" @click="jump(ctem.href)"/>
							<!-- <div class="carousel-con">
								<div class="carousel-con-tit">{{item.advertisementTitle}}</div>
								<div class="carousel-con-botton">
									<div class="carousel-botton-left" @click="jump(item.joinLink)">Join</div>
									<div class="carousel-botton-right" @click="jump(item.seeMore)">See more</div>
								</div>
							</div> -->
						</el-carousel-item>
					</el-carousel>
					<!-- <div class="text_area">
						<div class="text">
							<div class="text_1">Advertisements / Highlights</div>
							<div class="text_2">Leagues News / Merchandise</div>
						</div>
						
					</div>
					<img src="../../assets/images/game_img2.png" /> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {leagueList,leagueCarouselList} from '@/api/league.js'
	import {gameCategoryList} from '@/api/tournament.js'
	export default{
		name:'league',
		data(){
			return{
				nav_index:1,
				leagueId:3,
				category_list:[],
				league_list:[],
				advertisement_list: [],
			}
		},
		mounted() {
			this.categoryList()
			this.advertisementList()
		},
		methods:{
			tab_nav(index){
				this.nav_index = index
				this.leagueList()
			},
			jump_teams(id,item){
				// console.log(id)
				let leagueItem = {}
				sessionStorage.setItem("leagueItem", JSON.stringify(item))
				// console.log(leagueItem)
				this.$router.push({ path: '/league/teams',query:{leagueId:id}})
			},
			// 游戏类型列表
			categoryList() {
				let params = {}
				gameCategoryList(params).then(res => {
					this.category_list = res.data
					for ( let i in this.category_list ) {
						if ( i == 0 ) {
							this.nav_index = this.category_list[i]['gameCategoryId']
						}
					}
					// 调用联赛列表
					this.leagueList()
				})
			},
			// 联赛列表
			leagueList() {
				let params = {
					gameCategoryId: this.nav_index
				}
				leagueList(params).then(res => {
					this.league_list = res.data
				})
			},
			// 广告列表
			advertisementList() {
				let params = {}
				leagueCarouselList(params).then(res => {
					this.advertisement_list = res.data
				})
			},
			// 广告跳转
			jump(path) {
				window.open(path)
			},
		}
	}
</script>

<style scoped>
/deep/.el-carousel__button {
	display: block;
	opacity: 0.48;
	width: 10px;
	height: 10px;
	background: #6D6D6D;
	border-radius: 50%;
	border: none;
	outline: 0;
	padding: 0;
	margin: 0;
	cursor: pointer;
	-webkit-transition: 0.3s;
	transition: 0.3s;
	border-radius: 50%;
}
/deep/.el-carousel__indicator.is-active button {
	display: block;
	opacity: 0.48;
	width: 10px;
	height: 10px;
	background: #d3aa53;
	border-radius: 50%;
	border: none;
	outline: 0;
	padding: 0;
	margin: 0;
	cursor: pointer;
	-webkit-transition: 0.3s;
	transition: 0.3s;
	border-radius: 50%;
}
</style>
<style lang="less" scoped>
	.container {
		width: calc(100% - 140px);
		padding-bottom: 30px;
		margin-left: 69px;
		.content_header_nav{
			display: flex;
			align-items: center;
			margin: 50px 0;
			.header_nav{
				color: #8C8C8C;
				font-size: 20px;
				margin-right: 50px;
				font-family:'Quicksand-Bold';
				cursor: pointer;
			}
			.av{
				color: #D3AA53;
			}
			
		}
		.content_area{
			padding-bottom: 50px;
			.game_list_area{
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin-bottom: 50px;
				.game_list{
					width: 20%;
					margin-right:5%;
					position: relative;
					cursor: pointer;
					margin-bottom: 50px;
					.game_img{
						img{
							width: 100%;
							height: 400px;
							// width: 200px;
							// max-height: 100%;
							object-fit: cover;
						}
					}
					.game_name{
						width: 100%;
						text-align: center;
						color: #FFFFFF;
						font-size: 36px;
						font-weight: bold;
						position: absolute;
						top: 200px;
						font-family:'Roboto-Bold';
					}
				}
			}
			.game_banner{
				width: 95%;
				// height: 345px;
				// margin-top: 60px;
				// display: flex;
				// align-items: center;
				// background-color:rgba(0, 0, 0, 0.5);
				// padding-bottom: 50px;
				// width: 100%;
				height:326px;
				border-radius: 15px;
				// overflow: hidden;
				margin-top: 28px;
				background-color: #0e0f11;
				position: relative;
				/deep/ .el-carousel__container{
					height: 326px !important;
				}
				.carousel_img {
					width: 100%;
					// max-height: 100%;
					object-fit:cover;
					// object-fit:cover;
					cursor: pointer;
				}
				// position:relative;
				// left: 0;
				// top: 0;
				z-index: 11111;
				// margin-right: 5%;
				.text_area{
					width:50%;
					height: 300px;
					display: flex;
					align-items: center;
					justify-content: center;
					// background-color: #FFF000;
					.text{
						font-family:'Quicksand-Bold';
						.text_1{
							color: #FFFFFF;
							font-size: 20px;
						}
						.text_2{
							color: rgba(211,170,83,1);
							font-size: 28px;
							margin-top: 20px;
						}
					}
					
				}
				// img{
				// 	width: 50%;
				// 	height: 300px;
				// 	object-fit: cover;
				// }
			}
		}
	}
</style>
