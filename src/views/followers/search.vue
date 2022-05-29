<template>
	<div class="index">
		<div class="container">
			<LeftView :index="7"></LeftView>
			<div class="content_right">   
				<div class="content_right_top">
					<p class="title">My Followers  |  Following</p>
					<div class="content_right_nav">
						<router-link to="/followers/following">
							<p class="">Following ({{following_num || 0}})</p>
						</router-link>
						<router-link to="/followers/my_followers">
							<p>My Followers ({{my_follower_num || 0}})</p>
						</router-link>
					</div>
					<!-- 搜索框 -->
					<div class="search">
						<input v-model="UID_value"/>
						<button class="btn"  @click="jump_friendSearch(UID_value)">
							<img src="@/assets/images/search.png" />
						</button>
					</div>
				</div>
				<!-- 没有数据 -->
				<div class="no_data_area"  v-if="search_list == ''" >
					<div class="no_data">
						<img src="../../assets/images/no_tournament.svg" />
						<div class="no_data_text">No User</div>
					</div>
				</div>
				<!-- 有数据 -->
				<div class="content_right_form">
					<div class="friend_list">
						<div class="block" v-for="(item,index) in search_list" :key="index">
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
								
								<div class="news">
									<img src="../../assets/images/chat.png" />
									<p>Chat</p>
								</div>
								<div class="follow">
									<img src="../../assets/images/yh.png" />
									<span>*</span>
									<p>Follow</p>
								</div>
								
							</div>							
						</div><!-- block -->
					</div><!-- friend_list -->
				</div><!-- content_right_form -->
			</div><!-- content_right -->
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/order/left.vue'
	import {searchUser} from '@/api/friend.js'
	import {followList} from '@/api/followers.js'
	export default{
		name:"index",
		inject:['reload'],
		data(){
			return{
				search_list:[],
				UID_value:'',
				following_num:0,
				my_follower_num:0
			}
		},
		components:{
			LeftView
		},
		mounted() {
			// this.UID_value = this.$route.query.uid
			this.get_SearchUser()
			// this.getList()
		},
		methods:{
			//添加好友搜索用户
			get_SearchUser(){
				this.UID_value = this.$route.query.uid
				let params = {
					uid:this.UID_value
				}
				searchUser(params).then(res => {
					for(let a = 0; a< res.data.length;a++){
						res.data[a].status = false
						res.data[a].appling = false
					}
					this.search_list = res.data
				})
				//my friend的个数
				let params1 = {
					userId:sessionStorage.getItem("userId"),
					me:false,
				}
				followList(params1).then(res => {
					this.following_num = res.data.total
				})
				//To Comfirm的个数
				let par = {
					userId:sessionStorage.getItem("userId"),
					me:true,
				}
				followList(par).then(res => {
					this.my_follower_num = res.data.total
				})
			},
			jump_friendSearch(UID_value){
				if(UID_value == ''){
					this.$router.push({path:'/followers/following'})
				}else{
					this.$router.push({path:'/followers/search',query:{uid:UID_value}})
					this.reload()
				}
				
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
			}//.content_right_nav
			.search{
				input{
					width: 365px;
					height: 50px;
					background: #0E0F11;
					border-radius: 23px;
					font-size: 18px;
					border: none;
					padding-left: 35px;
					color: #ffffff;
					font-family:'Roboto-Regular';
					
				}
				input::-webkit-input-placeholder{
					color: #565656;
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
			}//search
		}//content_right_top
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
			font-family:'Roboto-Regular';
			.friend_list{
				width: 100%;
				margin-top: 40px;
				.block{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20px 25px 20px 51px;
					border-radius: 40px;
					background: #0E0F11;
					margin-top: 20px;
					.block_left{
						width: 30%;
						display: flex;
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
							width: 30%;
							color: #565656;
							margin-left: 20px;
							.name{
								color: #FFFFFF;
								font-size: 18px;
								font-family:'Roboto-Medium';
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							.uid_text{
								font-size: 18px;
								margin-left: 0;
							}
						}
					}
					.block_right{
						// width: 35%;
						display: flex;
						align-items: center;
						margin-right: 21px;
						// justify-content: space-between;
						
						.news{
							width: 163px;
							height: 58px;
							border-radius: 25px;
							background: #1D2023;
							text-align: center;
							margin-right: 20px;
							display: flex;
							align-items: center;
							justify-content: center;
							img{
								width: 30px;
								height: 30px;
								// margin-top: 6px;
							}
							p{
								color: #D3AA53;
								font-size: 20px;
								margin: 0;
								margin-left: 8px;
							}
						}//news
						.follow{
							width: 162px;
							height: 55px;
							border: 2px solid #DBA83F;
							border-radius: 20px;
							margin-left: 30px;
							display: flex;
							align-items: center;
							justify-content: center;
							img{
								width: 30px;
								height: 30px;
							}
							span{
								color: #D3AA53;
								position: relative;
								right: 5px;
								bottom: 5px;
								
							}
							p{
								color: #D3AA53;
								font-size: 20px;
								margin: 0;
								margin-left: 8px;
							}
						}
						
					}//block_right
				}//block
			}//.friend_list
		}//content_right_form
	
	}//content_right
}
</style>
