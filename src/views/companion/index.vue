<template>
	<div class="index">
		<div class="container">
			<div class="content_width">
				<div class="content_top">
					<div class="tit_name">Companion</div>
					<!-- 筛选 -->
					<div class="order_choice">
						<div class="choice_left">
							<div class="status">
								<p class="status_text">Game</p>
								<div class="choice_date" @click="jump_dota">
									<div class="date_date">{{gameName}}</div>
									<div class="date_img">
										<img src="../../assets/images/more2.png" alt="">
									</div>
								</div>
								<!-- <div class="options">
									<div class="date_date">{{gameName}}</div>
									<img class="dropdown1" src="../../assets/images/more2.png"/>
								</div> -->
							</div>
							<!-- <div class="sort_by">
								<p class="sort_by_text">Sort by</p>
								<div class="options">
									<select>
										<option>Best Seller</option>
										<option>one</option>
										<option>two</option>
										<option>three</option>
									</select>
									<img class="dropdown2" src="../../assets/images/dropdown.png" />
								</div>
							</div> -->
						</div>
						<div class="search">
							<input placeholder="Enter UID" v-model="listQuery.uid" />
							<button class="btn" @click="getList()">
								<img src="../../assets/images/search.png" />
							</button>
						</div>
					</div>
				</div>
				<!-- 列表 -->
				<div class="content_form">
					<div class="person" v-for="(item,index) in list" :key="index"
						@click.stop="jump_description(item.userId)">
						<div class="img">
							<img :src="HOST +  item.avatar" class="avatar_img"/>
							<!-- <img src="../../assets/images/default.png" v-else class="default_img"/> -->
							<div class="top_img">
								<el-image v-for="(ctem,ctex) in item.companionGames" :key="ctex" :src="HOST + ctem.gameLogo" class="top_block_img">
									<div slot="error" class="image-slot"> 
										<img src="../../assets/images/default_game.png" class="top_block_img"/>
									</div>
								</el-image>
								<!-- <img v-for="(ctem,ctex) in item.companionGames" :key="ctex"
									:src="HOST + ctem.gameLogo" v-if="ctem.gameLogo"/> -->
									<!-- <img src="../../assets/images/default_game.png" v-else/> -->
							</div>
						</div>
						<div class="per_info">
							<div class="per_name">
								<p class="user_name">{{item.fullName}}</p>
								<!-- 关注 -->
								<img class="like" v-if="item.follow == false" src="../../assets/images/like.png"
									@click.stop="add_follow(item.userId)" />
								<!-- 取消关注 -->
								<img class="like" v-else src="../../assets/images/like_a.png"
									@click.stop="remove_follow(item.userId)" />
							</div>
							<div class="fire_num">
								<img class="fire" src="../../assets/images/huo.png" />
								<p>{{item.popularity}}</p>
							</div>
							<div class="per_price">
								<img class="dollar" src="../../assets/images/dollar.png" />
								<div class="price_hour">
									<p class="price_num" v-if="ptem1==0" v-for="(ptem,ptem1) in item.companionGames">
										{{ptem.price}}<span>{{ptem.priceUnit}}</span>
									</p>
									<p class="price_right">/ per hour</p>
								</div>

							</div>
						</div>
					</div>
				</div>
				<div class="companion_pagination">
					<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page"
						:limit.sync="listQuery.size" @pagination="handlePageChange" @page_change="PageChange" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		companionList,
		followAdd,
		followRemove
	} from '@/api/companion'
	import Pagination from '@/components/Pagination/index.vue'; // secondary package based on el-pagination
	import Listing from '@/mixin/Listing';
	export default {
		name: "companion",
		mixins: [Listing],
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'info',
					deleted: 'danger'
				};
				return statusMap[status];
			}
		},
		components: {
			Pagination
		},
		mounted(){
					setTimeout(()=>{
						// console.log(this.PageNumber.page_number)
						this.listQuery.page = this.PageNumber.page_number;
						this.getList()
					},180)	//当组件跳转时获取全局变量页数进行跳转
				},
		data() {
			return {
				listQuery: {
					gameId: '',
					uid: '',
					page: 1,
					size: 10
				},
				total_count: 0,
				gameName: 'Please select',
				list: []
			};
		},
		methods: {
			PageChange(value){
							this.PageNumber.page_number = value.page
			},
			// 关注用户
			add_follow(userId) {
				let params = {
					userId
				}
				followAdd(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.getList();
				})
			},
			// 取消关注
			remove_follow(userId) {
				let params = {
					userId
				}
				followRemove(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					this.getList();
				})
			},
			jump_dota() {
				this.$router.push({
					path: '/tournament/filter_game',
					query: {
						type: 3
					}
				})
			},
			getList() {
				if (this.$route.query.gameId != undefined && this.$route.query.gameId != '' && this.$route.query.gameId !=
					null) {
					this.listQuery.gameId = this.$route.query.gameId
					this.gameName = this.$route.query.gameName
				}
				// this.list = []
				companionList(this.listQuery).then(res => {
					const {
						list,
						total
					} = res.data
					this.list = list;
					this.total_count = total;
				})
			},
			jump_description(userId) {
				this.$router.push({
					path: '/companion/description',
					query: {
						userId: userId
					}
				})
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

		.content_width {
			width: 100%;

			.content_top {
				.tit_name {
					color: #FFFFFF;
					font-size: 22px;
					margin: 45px 0 50px 0;
					font-family: 'Quicksand-Bold';
				}

				.order_choice {
					display: flex;
					align-items: flex-end;
					justify-content: space-between;

					.choice_left {
						display: flex;

						.status {
							.status_text {
								font-size: 18px;
								text-align: left;
								letter-spacing: 0px;
								color: #727272;
								opacity: 1;
								font-family: 'Roboto-Regular';
							}

							.choice_date {
								width: 230px;
								height: 59px;
								background: #0E0F11;
								border-radius: 20px;
								padding: 0 24px 0 16px;
								margin-right: 44px;
								display: flex;
								align-items: center;
								justify-content: space-between;
								cursor: pointer;

								.date_date {
									color: #FFFFFF;
									font-size: 20px;
									font-weight: 400;
								}

								.date_img {
									width: 32px;

									// height: 21px;
									img {
										width: 32px;
										height: 21px;
										object-fit: fill;
									}
								}
							}

							img {
								width: 50px;
								height: 10px;
							}
						}

						.sort_by {
							.sort_by_text {
								font-size: 18px;
								text-align: left;
								letter-spacing: 0px;
								color: #727272;
								opacity: 1;
							}
						}

						div {
							margin-right: 20px;

							.options {
								.dropdown1 {
									width: 20px;
									height: 20px;
									position: relative;
									right: 50px;
									top: 5px;
								}

								.dropdown2 {
									width: 10px;
									height: 8px;
									position: relative;
									right: 30px;
								}
							}
						}
					}

					.search {
						position: relative;
						// top: 40px;
						left: 45px;

						input {
							width: 315px;
							height: 60px;
							background: #0E0F11 0% 0% no-repeat padding-box;
							border-radius: 23px;
							font-size: 18px;
							border: none;
							padding-left: 35px;
							color: #565656;

						}

						.btn {
							width: 60px;
							height: 60px;
							background: #D3AA53 0% 0% no-repeat padding-box;
							border: none;
							border-radius: 22px;
							opacity: 1;
							position: relative;
							right: 60px;
							top: 5px;
							cursor: pointer;

							img {
								width: 22px;
								height: 22px;
							}
						}
					}

					//search
				}

				//order_choice

			}

			.content_form {
				display: flex;
				flex-wrap: wrap;

				.person {
					width: 18%;
					height: 385px;
					background: #0E0F11;
					border-radius: 24px;
					margin-top: 27px;
					margin-right: 2%;
					cursor: pointer;

					.img {
						width: 100%;
						height: 249px;
						overflow: hidden;
						border-top-left-radius: 24px;
						border-top-right-radius: 24px;
						display: flex;
						justify-content: center;
						align-items: center;
						position: relative;
						// background-color: #FF3333;
						.avatar_img {
							width: 100%;
						}
						.default_img{
							width: 100%;
							height: 100%;
						}
						.top_img {
							position: absolute;
							top: 10px;
							right: 4px;
							display: flex;

							.top_block_img {
								width: 60px;
								height: 60px;
								margin-right: 5px;
							}
						}
					}

					.per_info {
						width: 100%;
						height: 186px;

						// padding: 16px 23px 0;
						.per_name {
							display: flex;
							align-items: center;
							justify-content: space-between;
							color: #FFFFFF;
							font-size: 22px;
							padding: 16px 23px 0;

							p {
								margin: 0;
								font-family: 'Quicksand-Regular';
							}

							.user_name {
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}

							.like {
								width: 31px;
								height: 28px;
							}
						}

						.fire_num {
							display: flex;
							align-items: center;
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
								font-family: 'Roboto-Regular';
							}
						}

						.per_price {
							display: flex;
							align-items: center;
							color: #D3AA53;
							font-size: 18px;
							padding: 16px 23px 0;

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

								.price_num {
									font-family: 'Roboto-Black';

									span {
										// font-size: 22px;
										margin-left: 5px;
										font-family: 'Roboto-Regular';
									}
								}

								.price_right {
									font-family: 'Roboto-Regular';
								}
							}
						}
					}
				}
			}

			.companion_pagination {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				padding-right: 100px;
			}
		}
	}
</style>
