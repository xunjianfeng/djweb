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
						<router-link to="/friend_list/to_comfirm" >
							<p class="av" :class="{redPoint:friendNews}">Pending Request ({{total_count || 0}})</p>
						</router-link>
					</div><!-- content_right_nav -->
					<!-- 搜索框 -->
					<div class="search">
						<input placeholder="Search UID" v-model="uid"/>
						<button class="btn" @click="jump_friendSearch(uid)">
							<img src="@/assets/images/search.png" />
						</button>
					</div>
				</div><!-- content_right_top -->
				<!-- 没有数据 -->
				<div class="no_data_area"  v-if="comfirm_list == ''" >
					<div class="no_data">
						<img src="../../assets/images/no_tournament.svg" />
						<div class="no_data_text">No Pending Request</div>
					</div>
				</div>
				<!-- 有数据 -->
				<div class="content_right_form">
					<div class="friend_list">
						<div class="block" v-for="(item,index) in comfirm_list" :key="item.id" >
							<div class="block_left">
								<div class="pic">
									<el-image :src="HOST +  item.avatar" class="avatar_img" >
										<div slot="error" class="image-slot"> 
											<img src="../../assets/images/default.png" class="default_img"/>
										</div>
									</el-image>
									<!-- <img :src="HOST + item.avatar"  v-if="item.avatar"/> -->
									<!-- <img src="../../assets/images/default.png" v-else /> -->
								</div>
								<div class="info">
									<el-tooltip class="item" effect="dark" :content="item.fullName" placement="bottom">
										<p class="name">{{item.fullName}}</p>
									</el-tooltip>
									<!-- <p class="name">{{item.fullName}}</p> -->
									<p class="uid_text">UID {{item.fansId}}</p>
								</div>
							</div>
							<div class="block_right" id="block_right">
								<div class="true_false">
									<button class="true_btn" @click="getState(item.fansId,2)">
										<img src="../../assets/images/right_green.png" />
										Accept
									</button>
									<button  class="false_btn" @click="getState(item.fansId,3)">
										<img src="../../assets/images/false_red.png" />
										Reject
									</button>
								</div>
								<div class="news">
									<img src="../../assets/images/chat.png" />
								</div>
								<div class="more" >
									<!--  -->
									<img src="../../assets/images/more.png"  @click="up_more(item.fansId)"/>
									<!-- @click="jump_friendView(item)" -->
									<div class="noneMoreDel" v-if="item.status == true" >
										<div class="none_text" @click="jump_friendView(item)">View Profile</div>
									</div>
								</div>
								
							</div>
						</div><!-- block -->
					</div><!-- friend_list -->
					<div class="pagnationBox">
						<pagination v-show="total_count>3" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="handlePageChange" />
					</div>
				</div><!-- content_right_form -->
			</div><!-- content_right -->
		</div><!-- container -->
	</div>
</template>

<script>
	import LeftView from '@/components/order/left.vue'
	import {friendList} from '@/api/center';
	import {applyList,agreeFriend} from '@/api/friend.js'
	import Pagination from '@/components/Pagination/wallet.vue';
	import Listing from '@/mixin/Listing';
	import { getUserInfo } from '@/api/userInfo.js'

	export default{
		name:"index",
		mixins: [Listing],
		components:{
			LeftView,
			Pagination
		},
		inject:['reload'],
		data(){
			return{
				showMore:false,
				status:false,
				comfirm_list:[],
				confirm_num:'',
				state:2,
				friend_num:'',
				uid:'',
				listQuery: {
					page: 1,
					size: 10
				},
				total_count:0,

				friendNews:false
			};
		},
		mounted() {
			this.getList()
			this.getFriendNews()
		},
		methods:{
		// 查询好友消息
    getFriendNews () {
      getUserInfo().then(res => {
        if (res.data.friend > 0) {
          this.friendNews = true
        }
        else {
          this.friendNews = false
        }
      })
    },
			jump_friendView(item){
				let {fansId,fullName,avatar } = item;
				// console.log(fansId)
				this.$router.push({path:'/friend_list/view_profile',query:{fansId,fullName,avatar}})
			},
			// 好友申请列表
			getList(){
				applyList(this.listQuery).then(res => {
					for (let i = 0; i < res.data.list.length; i++) {
						res.data.list[i].status = false
					}
					this.comfirm_list = res.data.list
					this.total_count = res.data.total
					// this.confirm_num = (res.data).length
				})
				//my friend的个数
				friendList().then(res => {
					this.friend_num = res.data.total
				})
			},
			// 同意或拒绝添加好友
			getState(fansId,index){
				if(index == 2){
					let params = {
						userId:fansId,
						state:2
					}
					agreeFriend(params).then(res => {
						console.log(res)
						this.$message({
							type: 'success',
							message: res.message
						})
						this.reload()
					})
					
				}else if(index == 3){
					let params = {
						userId:fansId,
						state:3
					}
					agreeFriend(params).then(res => {
						console.log(res)
						this.$message({
							type: 'success',
							message: res.message
						})
						this.reload()
					})
				}
			},
			//搜索框跳转
			jump_friendSearch(uid){
				this.$router.push({path:'/friend_list/search_send',query:{uid:uid}})
				// console.log(uid)
				// if(uid == ''){
				// 	this.$message({
				// 		type: 'warning',
				// 		message: 'UID为空，请输入UID'
				// 	});
				// }else{
				// 	this.$router.push({path:'/friend_list/search_send',query:{uid:uid}})
				// }
			},
			up_more(fansId){
				console.log(fansId)
				let that = this;
				for (let j = 0; j < that.comfirm_list.length; j++) {
					if( fansId ==  that.comfirm_list[j].fansId){
						that.comfirm_list[j].status = ! that.comfirm_list[j].status
					}else{
						that.comfirm_list[j].status = false
					}
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
			// margin-top: 80px;
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
					// color: #565656;
					color: #fff;
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
							.default_img{
								width: 110px;
								height:110px;
								display: flex;
								align-items: center;
								justify-content: center;
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
								// background-color: #FFFFB6;
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
						justify-content: space-between;
						.true_false{
							display: flex;
							margin-right: 30px;
							.true_btn{
								width: 130px;
								height: 50px;
								border-radius: 20px;
								background: #1D2023;
								border: 1px solid #1D2023;
								color: #59AC00;
								font-size: 18px;
								margin-right: 25px;
								display: flex;
								align-items: center;
								justify-content: center;
								img{
									width: 20px;
									height: 20px;
									margin-right: 5px;
								}
							}
							.false_btn{
								width: 130px;
								height: 50px;
								border-radius: 20px;
								background: #1D2023;
								border: 1px solid #1D2023;
								color: #ff0000;
								font-size: 18px;
								display: flex;
								align-items: center;
								justify-content: center;
								img{
									width: 30px;
									height: 30px;
									margin-right: 5px;
								}
							}
						}//.block_left
						.news{
							width: 45px;
							height: 45px;
							border-radius: 8px;
							background: #1D2023;
							text-align: center;
							margin-right: 20px;
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
			.pagnationBox {
				margin-top: 75px;
			
			}
		}//content_right_form
			
	}//content_right
}
.redPoint{
	position: relative;
}
.redPoint:before {
  content: " ";
  background: #C52823;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  position: absolute;
  z-index: 1000;
  right: 80px;
  top: 40px;
}
</style>
