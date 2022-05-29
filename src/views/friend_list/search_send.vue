<template>
	<div class="index">
		<div class="container">
			<LeftView :index="6"></LeftView>
			<div class="content_right">
				<div class="content_right_top">
					<p class="title">Friend List</p>
					<div class="content_right_nav">
						<router-link to="/friend_list/my_friend">
							<p>My Friend ({{friend_num || 0}})</p>
						</router-link>
						<router-link to="/friend_list/to_comfirm">
							<p>Pending Request ({{confirm_num || 0}})</p>
						</router-link>
					</div><!-- content_right_nav -->
					<!-- 搜索框 -->
					<div class="search">
						<input v-model="UID_value"/>
						<button class="btn" @click="jump_friendSearch(UID_value)">
							<img src="@/assets/images/search.png" />
						</button>
					</div>
				</div><!-- content_right_top -->
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
									<el-image :src="HOST + item.avatar" class="avatar_img">
										<div slot="error" class="image-slot"> 
											<img src="../../assets/images/default.png" class="avatar_img"/>
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
								<div class="add_friend" @click="jump_search(item.userId)" v-if="item.appling == false && item.createTime == null">
									<img src="../../assets/images/add_friend.svg" />
									<p >Send request</p>
								</div>
								<div class="waiting" @click="jump_addFriendView(item.userId)"  v-if="item.appling == true">
									<img src="../../assets/images/img9.png" />
									<p >Waiting for reply</p>
								</div>
								<div class="news">
									<img src="../../assets/images/chat.png" />
								</div>
								<div class="more" >
									<img src="../../assets/images/more.png" @click="up_more(item.userId)"/>
									<div class="noneMoreDel" v-if="item.status == true" @click="jump_sendFriendView(item)">
										<div class="none_text" >View Profile</div>
									</div>
								</div>
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
	import {friendList} from '@/api/center';
	import {applyList,searchUser,addFriend} from '@/api/friend.js'
	export default{
		name:"index",
		inject:['reload'],
		data(){
			return{
				// status:false,
				search_list:[],
				// appling:false,
				UID_value:'',
				friend_num:'',
				confirm_num:''
			}
		},
		components:{
			LeftView
		},
		mounted() {
			this.get_SearchUser()
		},
		methods:{
			up_more(userId){
				// console.log(status)
				// this.status =! this.status;
				let that = this
				for (let b = 0; b < that.search_list.length; b++) {
					if( userId ==  that.search_list[b].userId){
						that.search_list[b].status = ! that.search_list[b].status
					}else{
						that.search_list[b].status = false
					}
				}
			},
			jump_sendFriendView(item){
				let {userId,fullName,avatar } = item;
				console.log(item)
				this.$router.push({path:'/friend_list/sendFriend_view',query:{userId,fullName,avatar}})
			},
			//添加好友搜索用户
			get_SearchUser(){
				this.UID_value = this.$route.query.uid
				let params = {
					uid:this.UID_value
				}
				console.log(params)
				searchUser(params).then(res => {
					for(let a = 0; a< res.data.length;a++){
						res.data[a].status = false
						res.data[a].appling = false
					}
					this.search_list = res.data
					console.log(this.search_list)
				})
				//my friend的个数
				friendList().then(res => {
					this.friend_num = res.data.total
				})
				//To Comfirm的个数
				applyList().then(res => {
					this.confirm_num = res.data.total
					console.log(this.confirm_num)
				})
			},
			//申请好友
			jump_search(userId){
				console.log(userId)
				let params = {
					userId:userId
				}
				addFriend(params).then(res => {
					console.log(res)
					this.$message({
						// message: "您已提交好友申请，请耐心等待回复^_^",
						type: 'success',
						message: res.message
					})
					for (let b = 0; b < this.search_list.length; b++) {
						if( userId ==  this.search_list[b].userId){
							this.search_list[b].appling = true
						}else{
							this.search_list[b].appling = false
						}
					}
					
					// this.$router.push({path:'/friend_list/search',query:{id:userId}})
				})
			},
			jump_friendSearch(UID_value){
				if(UID_value == ''){
					this.$router.push({path:'/friend_list/my_friend'})
				}else{
					this.$router.push({path:'/friend_list/search_send',query:{uid:UID_value}})
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
					width: 315px;
					height: 50px;
					background: #0E0F11;
					border-radius: 23px;
					font-size: 18px;
					border: none;
					padding-left: 35px;
					color: #fff;
					font-family:'Roboto-Regular';
				}
				input::-webkit-input-placeholder{
					color: #ffffff;
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
			.friend_list{
				width: 100%;
				margin-top: 40px;
				font-family:'Roboto-Regular';
				.block{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20px 25px 20px 23px;
					border-radius: 40px;
					background: #0E0F11;
					margin-top: 20px;
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
						}
						.info{
							color: #565656;
							margin-left: 20px;
							.name{
								width: 250px;
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
					}//block_left
					.block_right{
						width: 35%;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						.add_friend{
							width: 220px;
							height: 55px;
							background-color: #1D2023;
							border-radius: 20px;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-right: 20px;
							cursor: pointer;
							img{
								width: 30px;
								height: 30px;
								margin-right: 10px;
							}
							p{
								color: #ffffff;
								font-size: 16px;
							}
						}
						.waiting{
							width: 220px;
							height: 55px;
							background-color: #1D2023;
							border-radius: 20px;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-right: 20px;
							img{
								width: 30px;
								height: 30px;
								margin-right: 10px;
							}
							p{
								color: #707070;
								font-size: 16px;
							}
						}
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
								padding: 20px 28px;
								border-radius: 25px;
								position: absolute;
								bottom: -70px;
								right:0 ;
								-webkit-box-shadow: 5px 5px 5px 5px #0E0F11;
								box-shadow: 0px 0px 10px 1px #0E0F11;
								font-size: 16px;
								font-family:'Roboto-Bold';
								.none_text{
									color: #fff;
									margin-bottom: 0px;
									cursor: pointer;
								}
								
							}
						}
					}//block_right
				}//block
			}//.friend_list
		}//content_right_form
	
	}//content_right
}
</style>
