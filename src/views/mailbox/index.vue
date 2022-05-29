<template>
	<div class="index">
		<div class="container">
			<div class="content_left_block">
				<div class="search">
					<input placeholder="Search inbox" v-model="listQuery.messageTitle"/>
					<button class="btn" @click="selectChanged">
						<img src="../../assets/images/search.png" />
					</button>
				</div>
				<div class="left_nav">
					<p :class="nav_index == 1 ? 'acv' : 'no_acv'" @click="getList(1)">All index</p>
					<p :class="nav_index == 2 ? 'acv' : 'no_acv'" @click="getList(2)">
						Favorites
						<img src="../../assets/images/star_gray.png" v-if="nav_index != 2"/>
						<img class="star" src="../../assets/images/evaluate_av.png" v-if="nav_index == 2"/>
					</p>
				</div>
			</div>
			<div class="content_right_block">
				<div class="order_choice">
					<div class="choice_left">
						<div class="status">
							<p class="status_text">Filter</p>
							<div class="options">
								<el-select v-model="listQuery.state" placeholder="Please select" style="margin-right: 20px;"
								 :popper-append-to-body="false" @change="selectChanged">
									<el-option label="All" value=""></el-option>
									<el-option label="Read" value="1"></el-option>
									<el-option label="Unread" value="2"></el-option>
								</el-select>
							</div>
						</div>
						<div class="sort_by">
							<p class="sort_by_text">Sort by</p>
							<div class="options">
								<el-select v-model="listQuery.messageSort" placeholder="Please select" style="margin-right: 20px;"
								 :popper-append-to-body="false" @change="selectChanged">
									<el-option label="Desc" value="desc"></el-option>
									<el-option label="Asc" value="asc"></el-option>
								</el-select>
							</div>
						</div>
					</div>
					<div class="choice_right" >
						<div class="delete" v-if="detale_status == true" @click="delMsg">
							<img src="../../assets/images/trash.png" />
							<div>Delete</div>
						</div>
					</div>
				</div>
				<div class="content_right_form">
					<!-- 没有数据 -->
					<div class="no_data_area"  v-if="row_list == ''" >
						<div class="no_data">
							<img src="../../assets/images/no_tournament.svg" />
							<div class="no_data_text">No Message</div>
						</div>
					</div>
					<div class="table">
						<!-- 有数据 -->
						<div class="row"  v-for="(item,index) in row_list" :key="index" >
							<div class="col_1">											<!-- @click="item.jump == 'info' ?jump_info():jump_companionInfo()" -->
								<div class="checkbox" @click.stop="selectIt(item.messageId)" v-if="item.showIt == false"></div>
								<div class="checked" v-if="item.showIt == true" @click.stop="selectIt(item.messageId)">
									<img src="../../assets/images/gou.png" />
								</div>
								<img src="../../assets/images/star_gray.png" v-if="item.favorites != true" @click="collect_msg(1,item.messageId)"/>
								<img src="../../assets/images/evaluate_av.png" v-if="item.favorites == true" @click="collect_msg(2,item.messageId)"/>
							</div>
							<div class="col_2" @click="jump_info(item.messageId)">
								<img v-if="item.messageType == 2" src="../../assets/images/icon_e.png" />
								<img v-if="item.messageType == 3" src="../../assets/images/icon_setting.png" />
								<div :class="item.state == 1 ? 'msg_g' : 'msg_w'">{{item.messageType==2?'Bountee':'System'}}</div><!-- Bountee站内信、System系统通知 -->
							</div>
							<div class="col_3" @click="jump_info(item.messageId)">
								<el-tooltip class="item" effect="dark" :content="item.messageTitle" placement="bottom">
									<div :class="item.state == 1 ? 'text_g' : 'text'">{{item.messageTitle}}</div>
								</el-tooltip>
							</div>
							<div class="col_4" @click="jump_info(item.messageId)">
								<div :class="item.state == 1 ? 'date_time_g' : 'date_time'">{{initDete(item.createTime)}}</div>
							</div>
						</div>
					</div>
					<div class="order_pagination">
						<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"  @pagination="handlePageChange"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {userMsgList,userMsgUpdate} from '@/api/message.js'
	import Pagination from '@/components/Pagination'; 
	import Listing from '@/mixin/Listing';
	export default{
		name:"index",
		inject:['reload'],
		mixins: [Listing],
		components:{
			Pagination
		},
		data(){
			return{
				detale_status:false,
				nav_index:1,
				row_list:[],
				listQuery:{
					state:"",
					messageType:2, //1 公告 2 站内信/系统通知,
					favorites:'',
					messageSort:'desc',
					messageTitle:'',
					page:1,
					size:10
				},
				messageIds:[],//选择的消息id
				total_count:0
			}
		},
		mounted() {
			if(this.$route.query.nav_index != '' && this.$route.query.nav_index != null && this.$route.query.nav_index != undefined){
				this.nav_index = this.$route.query.nav_index
				this.getList(this.nav_index)
			}else{
				this.getList(1)
			}
		},
		methods:{
			//消息列表
			getList(index){
				this.nav_index = index
				if(this.nav_index == 1){
					this.listQuery.favorites = ''
				}else if(this.nav_index == 2){
					this.listQuery.favorites = true
				}
				userMsgList(this.listQuery).then(res => {
					// console.log(res.data)
					for(let a = 0; a<res.data.list.length;a++){
						res.data.list[a]['showIt'] = false
					}
					this.row_list = res.data.list
					this.total_count = res.data.total
				})
			},
			selectChanged(value) {
				// let that = this;
				this.listQuery.page = 1
				this.getList(1);
			},
			// 选项框的点击、取下
			selectIt(messageId){
				let arr = []
				for (let i = 0; i < this.row_list.length; i++) {
					if(this.row_list[i].messageId == messageId){
						this.row_list[i].showIt = !this.row_list[i].showIt
						this.detale_status = true
					}
					if(this.row_list[i].showIt == true){
						arr.push(this.row_list[i].messageId)
					}
				}
				this.messageIds = arr
			},
			//删除选中的消息
			delMsg(){
				let params = {
					messageId:this.messageIds.join(","),
					state:4
				}
				userMsgUpdate(params).then(res => {
					this.$message({
					  message: res.message,
					  type: 'success'
					});
					this.reload()
				})
			},
			//收藏、取消收藏
			collect_msg(index,messageId){
				if(index == 1){
					//收藏
					let params1 = {
						messageId:messageId,
						state:3,
					}
					userMsgUpdate(params1).then(res => {
						this.$message({
						  message: res.message,
						  type: 'success'
						});
						this.reload()
					})
				}else if(index == 2){
					//取消收藏
					let params2 = {
						messageId:messageId,
						state:5,
					}
					userMsgUpdate(params2).then(res => {
						this.$message({
						  message: res.message,
						  type: 'success'
						});
						this.reload()
					})
				}
			},
			jump_companionInfo(){
				this.$router.push({path:'/mailbox/companion_info'})
			},
			//跳转信息详情页
			jump_info(messageId){
				//标记为已读
				let params = {
					messageId:messageId,
					state:1
				}
				userMsgUpdate(params).then(res => {
					this.$router.push({path:'/mailbox/info',query:{messageId:messageId}})
				})
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
	// flex-wrap: wrap; /* 换行 */
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
				cursor: pointer;
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
				cursor: pointer;
				img{
					width: 17px;
					height: 16px;
					margin-left: 12px;
				}
			}
			.no_acv{
				// color: #9B9B9B;
				// font-size: 18px;
				// padding-left: 32px;
				// font-family:'Quicksand-Bold';
				// margin-top: 47px;
				width: 316px;
				height: 53px;
				// background: #0E0F11;
				// border-radius: 20px;
				color: #9B9B9B;
				font-size: 18px;
				line-height: 53px;
				font-family:'Quicksand-Bold';
				padding-left: 32px;
				margin-top: 23px;
				cursor: pointer;
				img{
					width: 17px;
					height: 16px;
					margin-left: 12px;
				}
			}
		}
	}
	.content_right_block{
		width: calc(100%-420px);
		.order_choice{
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			margin-top: 51px;
			.choice_left{
				display: flex;
				.status{
					.status_text{
						font-size: 18px;
						text-align: left;
						letter-spacing: 0px;
						color: #727272;
						font-family:'Roboto-Regular';
					}
					img{
						width: 50px;
						height: 10px;
					}
				}
				.sort_by{
					.sort_by_text{
						font-size: 18px;
						text-align: left;
						letter-spacing: 0px;
						color: #727272;
						font-family:'Roboto-Regular';
					}
				}
				div{
					margin-right: 20px;
					.options{
						// .dropdown1{
						// 	width: 10px;
						// 	height: 8px;
						// 	position: relative;
						// 	right: 30px;
						// }
						.dropdown2{
							width: 10px;
							height: 8px;
							position: relative;
							right: 30px;
						}
						position: relative;
						.dropdown {
							width: 10px;
							height: 8px;
							position: absolute;
							right: 30px;
							top: 45%;
						}
						select {
							/*取消默认箭头开始*/
							appearance: none;
							-moz-appearance: none;
							-webkit-appearance: none;
							/*取消默认箭头结束*/
							width: 225px;
							height: 59px;
							background-color: #0E0F11;
							color: #ffffff;
							border-radius: 20px;
							opacity: 1;
							border: none;
							font-family:'Roboto-Regular';
							font-size: 18px;
							padding-left: 20px;
							padding-right: 20px;
						}
						
						/deep/ .el-select .el-input .el-input__inner {
							border: 0px;
							width: 230px;
							height: 59px;
							color: #fff;
							font-family:'Roboto-Regular';
							border-radius: 20px;
							background-color: #0E0F11;
							border: 1px solid #0E0F11;
						}
						
						/deep/ .el-select-dropdown {
							background-color: #0E0F11;
							border: 1px solid rgba(255,255,255,0.2);
						}
						
						/deep/ .el-icon-arrow-up:before {
							content: "\e78f";
						}
						
						/deep/ .el-icon-arrow-down:before {
							content: "\e790";
						}
						//修改单个的选项的样式
						/deep/ .el-select-dropdown__item {
							background-color: transparent;
							color: #fff;
							font-family:'Roboto-Regular';
							text-align: center;
						}
						/deep/ .el-select-dropdown__item.hover{
							background-color: #1D2023;
						}
						/deep/ .el-select-dropdown__item.selected{
							background-color: #1D2023;
						}							
					}
				}
			}
			.choice_right{
				.delete{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 168px;
					height: 59px;
					background: #0E0F11 0% 0% no-repeat padding-box;
					border-radius: 22px;
					color: #FF1212;
					font-size: 20px;
					font-family:'Roboto-Bold';
					cursor: pointer;
					img{
						width: 28px;
						height: 24px;
						margin-right: 11px;
					}
				}
			}
		}
		.content_right_form{
			.no_data_area{
				width: 100%;
				height:500px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-family:'Roboto-Regular';
				margin-top: 30px;
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
			.table{
				background: #0E0F11 0% 0% no-repeat padding-box;
				border-radius: 31px;
				
				.row{
					width: 100%;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #565656;
					&:first-child{
						margin-top: 16px;
					}
					&:last-child{
						border: none;
					}
					.col_1{
						width: 10%;
						margin-top: 34px;
						margin-bottom: 25px;
						margin-left: 38px;
						display: flex;
						align-items: center;
						.checkbox{
							width: 24px;
							height: 24px;
							border: 1px solid #565656;
							margin-right: 20px;
							
						}
						.checked{
							width: 24px;
							height: 24px;
							margin-right: 20px;
							border: 1px solid #0AEA14;
							background-color: #0AEA14;
							img{
								width: 24px;
								height: 24px;
							}
						}
						
						img{
							width: 29px;
							height: 28px;
						}
					}
					.col_2{
						width: 15%;
						display: flex;
						align-items: center;
						margin-top: 34px;
						margin-bottom: 25px;
						cursor: pointer;
						.msg_w{
							color: #FFFFFF;
							font-size: 18px;
							font-family:'Roboto-Bold';
						}
						.msg_g{
							color: #727272;
							font-size: 18px;
							font-family:'Roboto-Bold';
						}
						img{
							width: 36px;
							height: 36px;
							margin-right: 15px;
						}
					}
					.col_3{
						width: 55%;
						margin-top: 34px;
						margin-bottom: 25px;
						cursor: pointer;
						.text{
							color: #FFFFFF;
							font-size: 18px;
							font-family:'Roboto-Bold';
							// width: 98%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						::v-deep{
							img{
								width: 0;
								height: 0;
							}
						}
						.text_g{
							color: #727272;
							font-size: 18px;
							font-family:'Roboto-Bold';
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
					.col_4{
						width: 15%;
						margin-top: 34px;
						margin-bottom: 25px;
						text-align: right;
						margin-right: 31px;
						cursor: pointer;
						.date_time{
							color: #FFFFFF;
							font-size: 18px;
							font-family:'Roboto-Bold';
							
						}
						.date_time_g{
							color: #727272;
							font-family:'Roboto-Bold';
							font-size: 18px;
						}
					}
				}
			}
			.order_pagination{
				display: flex;
				justify-content: flex-end;
			}
		}
	}
}
</style>
