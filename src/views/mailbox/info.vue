<template>
	<div class="index">
		<div class="container">
			<div class="content_left_block">
				<div class="search">
					<input placeholder="Enter UID" />
					<button class="btn">
						<img src="../../assets/images/search.png" />
					</button>
				</div>
				<div class="left_nav">
					<p class="acv">All index</p>
					<!-- <p class="no_acv"> -->
					<p class="no_acv" @click="jump_index(2)">
						<!-- Collect -->
						 Favorites
						<!-- <img src="../../assets/images/star_gray.png" /> -->
						<img class="star" src="../../assets/images/star_gray.png" />
						<!-- <img class="star" src="../../assets/images/evaluate_av.png" v-if="msg_info.favorites == true"/> -->
					</p>
				</div>
			</div>
			<div class="content_right">
				<div class="right_top">
					<!-- <img class="star" src="../../assets/images/star_gray.png" /> -->
					<img class="star" src="../../assets/images/star_gray.png" v-if="msg_info.favorites != true" @click="collect_msg(1)"/>
					<img class="star" src="../../assets/images/evaluate_av.png" v-if="msg_info.favorites == true"@click="collect_msg(2)"/>
					<div class="del" @click="delMsg">
						<img src="../../assets/images/delete_gray.png"/>
						Delete
					</div>
				</div>
				<div class="right_form">
					<div class="form_top">
						<div class="form_top_left">
							<p>{{msg_info.messageTitle}}</p>
						</div>
						<div class="form_top_right">
							<p class="top_right_1">
								<img v-if="msg_info.messageType == 2" src="../../assets/images/icon_e.png" />
								<img v-if="msg_info.messageType == 3" src="../../assets/images/icon_setting.png" />
								{{msg_info.messageType == 2 ? 'Bountee' : 'System'}}
							</p>
							<P class="top_right_date">{{initDete(msg_info.createTime)}}</P>
						</div>
					</div>
					<div class="form_content" >
						<!-- <div class="content_pic">
							<img src="../../assets/images/info.png" />
						</div> -->
						<div class="content_text" v-html="msg_info.messageContent">
							<!-- <div>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. 
							</div>
							<div>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. </div>
							<div>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. </div>
							<div>Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</div>
						 -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {userMsgList,userMsgUpdate} from '@/api/message.js'
	export default{
		name:'info',
		inject:['reload'],
		data(){
			return{
				msg_info:{},
				messageId:this.$route.query.messageId,
				listQuery:{
					state:"",
					messageType:2, //1 公告 2 站内信/系统通知,
					favorites:'',
					messageSort:'desc',
					messageTitle:'',
				},
			}
		},
		mounted() {
			console.log(this.$route.query.messageId)
			this.getInfo()
		},
		methods:{
			//消息列表
			getInfo(){
				userMsgList(this.listQuery).then(res => {
					for(let a = 0; a < res.data.list.length;a++){
						if(res.data.list[a].messageId == this.messageId){
							this.msg_info = res.data.list[a]
						}
					}
				})
			},
			//删除选中的消息
			delMsg(){
				let params = {
					messageId:this.messageId,
					state:4
				}
				userMsgUpdate(params).then(res => {
					this.$message({
					  message: res.message,
					  type: 'success'
					});
					this.$router.push({path:'/mailbox/index'})
				})
			},
			//收藏、取消收藏
			collect_msg(index){
				if(index == 1){
					//收藏
					let params1 = {
						messageId:this.msg_info.messageId,
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
					let params1 = {
						messageId:this.msg_info.messageId,
						state:5,
					}
					userMsgUpdate(params1).then(res => {
						this.$message({
						  message: res.message,
						  type: 'success'
						});
						this.reload()
					})
				}
			},
			//点击collect跳转到收藏列表
			jump_index(index){
				let nav_index = index
				this.$router.push({path:'/mailbox/index',query:{nav_index}})
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
			}
			.no_acv{
				color: #9B9B9B;
				font-size: 18px;
				padding-left: 32px;
				font-family:'Quicksand-Bold';
				margin-top: 47px;
				cursor: pointer;
				img{
					width: 17px;
					height: 16px;
					margin-left: 12px;
				}
			}
		}
	}
	.content_right{
		width: calc(100%-420px);
		.right_top{
			width: 100%;
			display: flex;
			align-items: center;
			margin: 20px 0;
			.star{
				width: 34px;
				height: 34px;
				margin-left: 15px;
				cursor: pointer;
			}
			.del{
				color: #7F7F7F;
				font-size: 20px;
				display: flex;
				align-items: center;
				margin-left: 62px;
				font-family:'Roboto-Regular';
				cursor: pointer;
				img{
					width: 28px;
					height: 30px;
				}
			}
		}
		.right_form{
			background: #0E0F11;
			border-radius: 32px;
			padding-bottom: 40px;
			.form_top{
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #565656;
				margin-left: 47px;
				margin-right: 45px;
				padding-top: 10px;
				.form_top_left{
					width: 60%;
					color: #FFFFFF;
					font-size: 25px;
					font-family:'Roboto-Bold';
					
				}
				.form_top_right{
					display: flex;
					.top_right_1{
						color: #ffffff;
						font-family:'Roboto-Bold';
						font-size: 20px;
						display: flex;
						align-items: flex-end;
						img{
							width: 26px;
							height: 26px;
							margin-right: 9.5px;
						}
					}
					.top_right_date{
						color: #727272;
						font-size: 20px;
						margin-left: 88px;
						font-family:'Roboto-Bold';
					}
				}
			}
			.form_content{
				.content_pic{
					width: 536px;
					height: 255px;
					margin: 29px auto 25px;
					img{
						width: 536px;
						height: 255px;
					}
				}
				.content_text{
					margin-left: 47px;
					margin-right: 45px;
					color: #727272;
					font-family:'Roboto-Regular';
					font-size: 20px;
					word-wrap: break-word;
					white-space: pre-wrap;
					div{
						margin-bottom: 15px;
					}
				}
				::v-deep{
					img{
						max-width: 100%;
						max-height: 100%;
					}
				}
			}
		}
	}
}
</style>
