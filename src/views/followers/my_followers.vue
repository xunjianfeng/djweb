<template>
	<div class="index">
		<div class="container">
			<LeftView :index="7"></LeftView>
			<div class="content_right">
				<div class="content_right_top">
					<p class="title">My Followers  |  Following</p>
					<div class="content_right_nav">
						<router-link to="/followers/following">
							<p >Following ({{following_count || 0}})</p>
						</router-link>
						<router-link to="/membership/current_plan">
							<p class="av">My Followers ({{total_count || 0}})</p>
						</router-link>
					</div><!-- content_right_nav -->
					<!-- 搜索框 -->
					<div class="search">
						<input placeholder="Search UID" v-model="uid"/>
						<button class="btn"  @click="jump_followSearch(uid)">
							<img src="@/assets/images/search.png" />
						</button>
					</div>
				</div><!-- content_right_top -->
				<!-- 没有数据 -->
				<div class="no_data_area"  v-if="my_followers == ''" >
					<div class="no_data">
						<img src="../../assets/images/no_tournament.svg" />
						<div class="no_data_text">No followers</div>
					</div>
				</div>
				<!-- 有数据 -->
				<div class="content_right_form">
					<div class="following_list">
						<div class="block" v-for="(item,index) in my_followers" :key="index">
							<div class="block_left">
								<div class="pic">
									<el-image :src="HOST +  item.avatar" class="avatar_img" >
										<div slot="error" class="image-slot"> 
											<img src="../../assets/images/default.png" class="avatar_img"/>
										</div>
									</el-image>
									<!-- <img :src="HOST + item.avatar" v-if="item.avatar"/> -->
									<!-- <img src="../../assets/images/default.png" v-else /> -->
								</div>
								<div class="info">
									<p class="name">{{item.fullName}}</p>
									<p class="uid_text">UID {{item.userId}}</p>
								</div>
							</div>
							<div class="block_right">
								<button class="chat_btn">
									<img src="../../assets/images/chat.png" />
									Chat
								</button>
								<button class="follow_btn">Follow</button>
							</div>
						</div><!-- block -->
					</div><!-- following_list -->
					<div class="pagnationBox">
						<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="handlePageChange" />
					</div>
				</div><!-- content_right_form -->
			</div><!-- content_right -->
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/order/left.vue'
	import {followList} from '@/api/followers.js'
	import Listing from '@/mixin/Listing';
	import Pagination from '@/components/Pagination/wallet.vue';
	export default{
		name:"index",
		mixins: [Listing],
		components:{
			LeftView,
			Pagination
		},
		data(){
			return{
				uid:'',
				my_followers:[],
				listQuery: {
					uid:'',
					me:true,//true 关注我的 false 我关注的
					page: 1,
					size: 10
				},
				total_count:0,
				following_count:0
			}
		},
		mounted() {
			// this.getList()
		},
		methods:{
			getList(){
				//关注我的用户
				followList(this.listQuery).then(res => {
					// console.log(res)
					this.my_followers = res.data.list
					this.total_count = res.data.total
					// console.log(this.my_followers)
					// console.log(this.total_count)
				})
				//我关注的用户个数
				let params = {
					userId:sessionStorage.getItem("userId"),
					me:false,
				}
				followList(params).then(res => {
					// console.log(res)
					this.following_count = res.data.total
					// console.log(this.following_count)
				})
			},
			jump_followSearch(uid){
				if(uid == ''){
					this.$message({
						type: 'warning',
						message: "Please key in UID."//UID为空，请输入UID
					});
				}else{
					this.$router.push({path:'/followers/search',query:{uid:uid}})
				}
				// this.$router.push({path:'/followers/search'})
			},
			jump_follow(){
				let params = {
					uid:this.listQuery.uid,
					me:'',//true 关注我的 false 我关注的
					page: 1,
					size: 10
				}
				// console.log((params))
				followList(params).then(res => {
					// console.log(res)
					this.my_followers = res.data.list
					this.total_count = res.data.total
				})
			},
			changStatus(){
				// this.listQuery.me = ''
				this.handleFilter()
			},
			handleFilter(){
				this.listQuery.page_index = 1;
				this.getList()
			},
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
		.content_right_top{
			margin-top: 50px;
			.title{
				color: #FFFFFF;
				font-size: 22px;
				font-family:'Quicksand-Bold';
			}
			.content_right_nav{
				p{
					display: inline-block;
					color: #727272;
					padding: 0 40px 0 0;
					font-size: 22px;
					font-family:'Roboto-Regular';
				}
				a{
					border-right: 1px solid #7F7F7F;
					&:nth-child(2){
						border: none;
						padding-left: 40px;
					}
				}
				.av{
				  color: #D3AA53;
				  font-family:'Roboto-Bold';
				}
			}
			.search{
				input{
					width: 365px;
					height: 50px;
					background: #0E0F11;
					border-radius: 23px;
					font-size: 18px;
					border: none;
					padding-left: 35px;
					color: #565656;
					font-family:'Roboto-Regular';
				}
				.btn{
					width: 50px;
					height: 50px;
					background: #D3AA53;
					border: none;
					border-radius: 17px;
					opacity: 1;
					position: relative;
					right: 50px;top: 4px;
					cursor: pointer;
					img{
						width: 22px;
						height: 22px;
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
		.content_right_form{
			width: 90%;
			padding-bottom:50px;
			font-family:'Roboto-Regular';
			.following_list{
				border-radius: 56px;
				background: #0E0F11;
				margin-top: 40px;
				.block{
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #2D2D2D;
					margin-left: 23px;
					margin-right: 24px;
					padding-bottom: 25px;
					padding-top: 27px;
					&:last-child{
						border: none;
					}
					.block_left{
						display: flex;
						margin-left: 30px;
						.pic{
							width:100px;
							height:100px;
							.avatar_img{
								width: 100px;
								height:100px;
								border-radius: 30px;
								object-fit: cover;
							}
						}
						.info{
							color: #565656;
							margin-left: 20px;
							.name{
								color: #FFFFFF;
								font-size: 18px;
								font-family:'Roboto-Medium';
							}
							.uid_text{
								font-size: 20px;
								margin-left: 0;
							}
						}
					}
					.block_right{
						display: flex;
						margin-right: 24px;
						// align-items: center;
						.chat_btn{
							width: 163px;
							height: 58px;
							background: #1D2023;
							border: 1px solid #1d2023;
							border-radius: 25px;
							color: #D3AA53;
							font-size: 20px;
							display: flex;
							align-items: center;
							justify-content: center;
							cursor: pointer;
							img{
								width: 30px;
								height: 30px;
								margin-right: 5px;
							}
						}
						.follow_btn{
							width: 162px;
							height: 55px;
							border: 1px solid #D3AA53;
							border-radius: 20px;
							background: #0E0F11;
							color: #DBA83F;
							font-size: 20px;
							margin-left: 46px;
							cursor: pointer;
						}
					}
				}
			}
			.pagnationBox {
				margin-top: 75px;
			
			}
		}
	}
}
</style>
