<template>
	<div class="index">
		<div class="container">
			<div class="content_block">
				<!-- 弹窗 -->
				<!-- <div class="drawer_area" v-if="update_up == true" @click.stop="update_up = false">
					<div class="mark_cancel">
						<img src="@/assets/images/cancel.png" alt="">
					</div>
					<div class="drawer_content">
						<div class="drawer_content_top">
							<img :src="HOST + mark_item.task_logo" />
							<div class="drawer_content_top_info">
								<div class="">{{mark_item.task_name}}</div>
								<div class="info_date">Exp: 13 July,2020</div>
							</div>
						</div>
						<div class="drawer_content_text">
							<div>{{mark_item.task_content}}</div>
						</div>
						<div :class="mark_item.state == 1 || (mark_item.user_task_id != '' && mark_item.user_task_id != null)? 'drawer_content_btn btn_color' : 'drawer_content_btn'">
							Get
						</div>
					</div>
				</div> -->
				<!-- 领取奖励 弹窗 -->
				<div class="personal_play" v-if="success_status == true">
					<!-- <div class="mark_check" @click.stop="success_status = false">
						<img src="@/assets/images/cancel.png" >
					</div> -->
					<div class="mark_bac"></div>
					<div class="mark_check_container">
						<div class="mark_check_inset"  @click.stop="success_status = false">
							<img src="@/assets/images/cancel.png" >
						</div>
						<div class="mark_content">
							<div class="mark_title">Task Reward</div>
							<div class="content_text">
								Confirm to claim this reward?
							</div>
							<div class="btn_area">
								<div class="confirm_btn" @click="receivePoint">Confirm</div>
								<div class="cancel_btn" @click.stop="success_status = false">Cancel</div>
							</div>
						</div>
					</div>
				</div>
				<!-- end -->
				<div class="content_top">
					<div class="tit_name">Complete task everyday to earn points!</div>
					
				</div>
				<div class="content_form">
					<div class="list_1" v-for="(item,index) in task_list">
						<div class="list_left">
							<div class="left_icon">
								<img :src="HOST + item.task_logo" />
							</div>
							<div class="left_text">{{item.task_name}} ({{item.complete || 0}}/{{item.target ||0}})</div>
						</div>
						<div class="list_right">
							<div class="right_point">
								<img src="../../assets/images/bountee_tash-six.png" class="money_icon"/>
								<div class="point_num">{{item.reward}} <span>Points</span></div>
							</div>
							<div class="inputs_img1">
								<!-- state 1 未领取 2 已经领取 3 过期 -->
								<!-- <img src="../../assets/images/yls.png"v-if="(item.state  == 3 && item.state != 1 && item.state != 2) || item.user_task_id == '' || item.user_task_id == null"><还未领取 -->
								<!-- <img src="../../assets/images/yg.png" v-if="item.state == 1 || item.state == 2 || (item.user_task_id != '' && item.user_task_id != null)"/>满足条件 -->
								<!-- 目标还未达成还不能领取 -->
								<img src="../../assets/images/yls.png" v-if="item.complete < item.target && item.state == 1 || item.state == null"/>
								<!-- 已经领取,或者已过期 -->
								<img src="../../assets/images/yn.png" v-if="item.state == 2 || item.state == 3"/>
								<!-- 已达成目前还没领取，可点击领取 -->
								<img src="../../assets/images/yg.png" v-if="item.complete >= item.target && item.state == 1"  @click="open_mark(item.user_task_id)"><!--v-if="item.complete >= item.target && item.state == 1" @click="receivePoint(user_task_id)" -->
							</div>
							<!-- <div class="inputs_img1">
								<img src="@/assets/images/yls.png" >
								<img src="@/assets/images/yl.png" >
							</div> -->
						</div>
					</div>
					<!-- <div class="list_1">
						<div class="list_left">
							<div class="left_icon">
								<img src="../../assets/images/bountee_tash-one.png" />
							</div>
							<div class="left_text">Complete Rapid Challenge (0/1)</div>
						</div>
						<div class="list_right">
							<div class="right_point">
								<img src="../../assets/images/bountee_tash-six.png" class="money_icon"/>
								<div class="point_num">10 <span>Points</span></div>
							</div>
							<div class="inputs_img1">
								<img src="../../assets/images/yls.png"/>
								<img src="@/assets/images/yl.png" >
							</div>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {taskList,taskReceive} from '@/api/redemption.js'
	export default{
		name:"task",
		data(){
			return{
				update_up:false,
				task_list:[],
				mark_item:{},
				success_status:false,
				user_task_id:'',
			}
		},
		mounted() {
			this.getList()
		},
		methods:{
			open_mark(user_task_id){
				this.success_status = true
				this.user_task_id = user_task_id
			},
			getList(){
				taskList().then(res => {
					this.task_list = res.data
				})
			},
			//领取任务奖励
			receivePoint(){
				taskReceive({userTaskId:this.user_task_id}).then(res => {
					if(res.code == 200){
						this.$message({
							message: res.message,
							type: 'success'
						})
						this.success_status = false
					}else{
						this.$message({
							message: res.message,
							type: 'error'
						})
					}
					
				})
			},
			up_mark(item){
				let that  = this;
				that.update_up = ! that.update_up
				that.mark_item = item
				// console.log(that.mark_item)
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
	margin-top: 50px;
	.content_block{
		width: 80%;
		margin-left: 50px;
		//personal_play
		.personal_play{
			.mark_check{
				position: absolute;
				right: 80px;
				top: 80px;
				img{
					width: 46px;
					height: 46px;
					cursor: pointer;
				}
				z-index: 999;
			}
			.mark_bac{
				width: 100%;
				height: 100vh;
				background:#000000b3;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 88;
				
			}
			.mark_check_container{
				position: absolute;
				left: 357px;
				top: 270px;
				z-index: 999;
				width: 753px;
				padding: 50px 20px 70px 28px;
				background: #0E0F11;
				border-radius: 27px;
				overflow: hidden;
				display: flex;
				flex-flow: column;
				align-items: center;
				.mark_check_inset{
					position: absolute;
					right: 40px;
					top: 40px;
					img{
						width: 25px;
						height: 25px;
						cursor: pointer;
					}
					z-index: 999;
				}
				.mark_content{
					color: #ffffff;
					text-align: center;
					.mark_title{
						color: #D3AA53;	
						font-size: 20px;
						margin-bottom: 30px;
						font-family:'Quicksand-Bold';
					}
					.content_text{
						text-align: center;
						font-size: 18px;
						color: #666666;
						margin-bottom: 70px;
						display: flex;
						align-items: center;
						justify-content: center;
						font-family:'Roboto-Regular';
						.label{
							margin-right:50px;
						}
						.player{
							color: #fff;
							font-size: 20px;
						}
						span{
							color: #ffffff;
							font-size: 20px;
							margin: 0 5px;
						}
					}
					.btn_area{
						display: flex;
						align-items: center;
						justify-content: center;
						.confirm_btn{
							cursor: pointer;
							background-color: #D3AA53;
							color: #000;
							border-radius: 25px;
							width: 160px;
							height: 50px;
							text-align: center;
							line-height: 50px;
							font-size: 16px;
							margin-right: 30px;
							font-family:'Roboto-Regular';
						}
						.cancel_btn{
							cursor: pointer;
							// background-color: #D3AA53;
							border: 1px solid #666666;
							border-radius: 25px;
							width: 160px;
							height: 50px;
							text-align: center;
							line-height: 50px;
							font-size: 16px;
							font-family:'Roboto-Regular';
						}
					}
				}
			}
			//Check out 01弹窗  end
		}
		//personal_play  end
		// 弹窗
		.drawer_area{
			width: 744px;
			background: #000000;
			padding-bottom: 180px;
			position: absolute;
			right: 0;
			top: 0;
			z-index: 9999;
			.mark_cancel{
				position: absolute;
				right: 64px;
				top: 66px;
				img{
					width: 36px;
					height: 36px;
					cursor: pointer;
				}
			}
			.drawer_content{
				.drawer_content_top{
					display: flex;
					align-items: center;
					margin: 182px 105px 0 92px;
					padding-bottom: 33px;
					border-bottom: 2px solid #2D2D2D;
					img{
						width: 146px;
						height: 146px;
						border-radius: 10px;
						margin-right: 40px;
					}
					.drawer_content_top_info{
						color: #FFFFFF;
						font-size: 25px;
						font-family:'Roboto-Bold';
						.info_date{
							color: #D3AA53;
							font-size:18px;
							font-family:'Roboto-Regular';
							margin-top: 15px;
						}
					}
				}
				.drawer_content_text{
					margin-top: 34px;
					margin-left: 96px;
					margin-right: 105px;
					color: #727272;
					font-family:'Roboto-Regular';
					font-size: 20px;
					div{
						margin-bottom: 20px;
					}
				}
				.drawer_content_btn{
					width: 163px;
					height: 58px;
					background: #727272;
					font-family:'Roboto-Regular';
					border-radius: 25px;
					color: #0E0F11;
					font-size: 18px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 250px auto 0;
				}
				.btn_color{
					color: #FFFFFF;
					background-color: #39CC09;
				}
			}
		}
		// 内容区
		.content_top{
			border-bottom: 2px solid #2D2D2D;
			padding-bottom: 25px;
			.tit_name{
				color: #FFFFFF;
				font-size: 22px;
				font-family:'Quicksand-Bold';
				// margin: 45px 0 24px 0;
			}
			.order_choice{
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				.choice_left{
					display: flex;
					.status{
						.status_text{
							font-size: 18px;
							text-align: left;
							letter-spacing: 0px;
							color: #727272;
							font-family:'Roboto-Regular';
							opacity: 1;
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
							opacity: 1;
						}
					}
					div{
						margin-right: 20px;
						.options{
							.dropdown1{
								width: 10px;
								height: 8px;
								position: relative;
								right: 30px;
							}
							.dropdown2{
								width: 10px;
								height: 8px;
								position: relative;
								right: 30px;
							}
							select{
								/*取消默认箭头开始*/
								appearance:none;
								-moz-appearance:none;
								-webkit-appearance:none;
								/*取消默认箭头结束*/
								width: 230px;
								height: 59px;
								background-color: #0E0F11;
								color: #ffffff;
								font-family:'Roboto-Regular';
								border-radius: 20px;
								opacity: 1;
								border: none;
								font-size: 18px;
								padding-left: 20px;
								padding-right: 20px;
								width: 230px;
								height: 59px;
								
							}
						}//options
					}
				}
			}
		}
		.content_form{
			width: 100%;
			margin-top: 50px;
			.list_1{
				width: 100%;
				height: 153px;
				background: #0E0F11;
				border-radius: 38px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 23px;
				.list_left{
					display: flex;
					align-items: center;
					.left_icon{
						margin: 0 47px 0 47px;
						img{
							width: 44px;
							height: 46px;
							object-fit: cover;
						}
					}
					.left_text{
						color: #FFFFFF;
						font-size: 22px;
						font-family: "Roboto-Medium";
						
					}
				}
				.list_right{
					display: flex;
					align-items: center;
					.right_point{
						display: flex;
						align-items: center;
						margin-right: 253px;
						.money_icon{
							width: 32px;
							height: 32px;
							margin-right: 19px;
						}
						.point_num{
							color: #F7DF75;
							font-size: 25px;
							font-family: "Roboto-Black";
							span{
								font-size: 18px;
								font-family: "Roboto-Regular";
							}
						}
					}
					.inputs_img1{
						margin-right: 54px;
						img{
							width: 31px;
							height: 31px;
						}
					}
				}
			}
		}
	}
}
</style>
