<template>
	<div class="index">
		<div class="container">
			<LeftView :index="6"></LeftView>
			<div class="content_right">
				<div class="content_right_top">
					<p class="title">Friend List</p>
					<div class="content_right_nav">
						<router-link to="/friend_list/my_friend">
							<p class="av">My Friend ({{total_count || 0}})</p>
						</router-link>
						<router-link to="/friend_list/to_comfirm">
							<p>Pending Request ({{confirm_num || 0}})</p>
						</router-link>
					</div>
					<!-- 搜索框 -->
					<div class="search">
						<input placeholder="Search UID" v-model="uid"/>
						<button class="btn" @click="jump_friendSearch(uid)">
							<img src="@/assets/images/search.png" />
						</button>
					</div>
				</div>
				<!-- 没有数据 -->
				<div class="no_data_area"  v-if="friend_list == ''" >
					<div class="no_data">
						<img src="../../assets/images/no_tournament.svg" />
						<div class="no_data_text">No Pending Request</div>
					</div>
				</div>
				<!-- 有数据 -->
				<div class="content_right_form" v-if="friend_list != ''">
					<div class="friend_list">
						<div class="block" v-for="(item,index) in friend_list" :key="index">
							<div class="block_left">
								<div class="pic">
									<el-image :src="HOST +  item.avatar" class="avatar_img" >
										<div slot="error" class="image-slot"> 
											<img src="../../assets/images/default.png" class="default_img"/>
										</div>
									</el-image>
									<!-- <img :src="HOST + item.avatar" v-if="item.avatar"/> -->
									<!-- <img src="../../assets/images/default.png" v-else /> -->
								</div>
								<div class="info">
									<el-tooltip class="item" effect="dark" :content="item.fullName" placement="bottom">
										<p class="name">{{item.fullName}}</p>
									</el-tooltip>
									<p class="uid_text">UID {{item.userId}}</p>
								</div>
							</div>
							<div class="block_right">
								<div class="news">
									<img src="../../assets/images/chat.png" />
								</div>
								<div class="more">
									<img src="../../assets/images/more.png" @click="up_more(item.userId)" />
									<div class="noneMoreDel" v-if="item.status == true">
										<div class="none_text" @click="jump_viewProfileTwo(item)">View Profile</div>
										<div class="none_text2" @click="del_friend(item.userId)">Remove Firend</div>
									</div>
								</div>
							</div>							
						</div>
					</div>
					
				</div>
				<!-- 分页组件 -->
				<div class="pagnationBox">
					<pagination v-show="total_count>10" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="handlePageChange" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {friendList} from '@/api/center';
	import LeftView from '@/components/order/left.vue'
	import {applyList,friendRemove} from '@/api/friend.js'
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
				friend_num:'',
				friend_list:[],
				uid:'',
				confirm_num:'',
				listQuery:{
					page:1,
					size:10
				},
				total_count:0
			}
		},
		mounted() {
			// this.getList();
		},
		methods:{
			// 用户好友列表
			getList() {
				let that = this;
				friendList(this.listQuery).then(res => {
					const {
						list,total
					} = res.data
					var friends = list
					for (let i = 0; i < friends.length; i++) {
						friends[i].status = false
					}
					that.friend_list = friends
					that.friend_num = list.length;
					that.total_count = total
				})
				//To Comfirm的个数
				applyList().then(res => {
					this.confirm_num = res.data.total
				})
			},
			// 打开操作
			up_more(user_id){
				let that = this;
				for (let i = 0; i < that.friend_list.length; i++) {
					if( user_id ==  that.friend_list[i].userId){
						that.friend_list[i].status = ! that.friend_list[i].status
					}else{
						that.friend_list[i].status = false
					}
				}
			},
			// 删除朋友
			del_friend(userId){
				let that = this;
				this.$confirm('Delete this friend?', 'Confirmation', {//是否删除该好友?
				  confirmButtonText: 'Confirm',
				  cancelButtonText: 'Cancel',
				  type: 'warning',
				  center: true
				}).then(() => {
					friendRemove({userId}).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						this.getList();
					})
				})
			},
			//搜索跳转
			jump_friendSearch(uid){
				this.$router.push({path:'/friend_list/search_send',query:{uid:uid}})
			},
			jump_viewProfileTwo(item){
				let {userId,fullName,avatar } = item;
				// console.log(item)
				this.$router.push({path:'/friend_list/view_profile_two',query:{userId,fullName,avatar}})
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
					width: 315px;
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
					cursor:pointer;
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
			max-width: 90%;
			border-radius: 56px;
			background: #0E0F11;
			margin-top: 40px;
			// padding-bottom:50px;
			padding: 0 30px 50px;
			font-family:'Roboto-Regular';
			.friend_list{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				// justify-content:space-around;
				justify-content: space-between;
				.block{
					width: 45%;
					padding-right: 3%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top:50px;
					&:first-child{
						margin-top:30px;
					}
					&:nth-child(2){
						margin-top:30px;
					}
					.block_left{
						display: flex;
						.pic{
							width:100px;
							height:100px;
							.avatar_img{
								width: 100px;
								height:100px;
								object-fit: cover;
								border-radius: 30px;
							}
							.default_img{
								width: 110px;
								height:110px;
								display: flex;
								align-items: center;
								justify-content: center;
								// background-color: #FF0000;
							}
						}
						.info{
							color: #565656;
							margin-left: 20px;
							.name{
								width: 200px;
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
						display: flex;
						.news{
							width: 45px;
							height: 45px;
							border-radius: 8px;
							background: #1D2023;
							text-align: center;
							margin-right: 20px;
							margin-bottom: 8px;
							img{
								margin-top: 6px;
							}
						}
						.more{
							width: 50px;
							position: relative;
							img{
								width: 50px;
								height: 45px;
								cursor: pointer;
							}
							.noneMoreDel{
								width: 120px;
								background: #1D2023;
								padding: 17px 28px;
								border-radius: 25px;
								position: absolute;
								bottom: -100px;
								right:0 ;
								-webkit-box-shadow: 5px 5px 5px 5px #0E0F11;
								box-shadow: 0px 0px 10px 1px #0E0F11;
								font-size: 16px;
								font-family:'Roboto-Bold';
								.none_text{
									color: #fff;
									padding: 10px 0;
									margin-bottom: 10px;
									cursor: pointer;
									border-bottom: 1px solid #3C3E3F;
								}
								.none_text2{
									color: red;
									padding: 5px 0;
									cursor: pointer;
								}
							}
						}
					}//block_right
				}//block
			}//.friend_list
			
		}//content_right_form
		.pagnationBox{
			margin-top: 75px;
		}
	}//content_right
}
</style>
