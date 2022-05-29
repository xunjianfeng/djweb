<template>
	<div class="index">
		<div class="container">
			<LeftView :index="8"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<p :class="ach_index == 1 ? 'nav av' : 'nav'" @click="getList(1)">All</p>
					<p :class="ach_index == 2 ? 'nav av' : 'nav'" @click="getList(2)">My Achievement</p>
				</div>
				<div class="content_right_form">
					<div class="form_row">
						<!-- 没有数据 -->
						<div class="no_data_area"  v-if="(ach_index == 1 && all_list == '') || (ach_index == 2 && my_list == '')" >
							<div class="no_data">
								<img src="../../assets/images/no_tournament.svg" />
								<div class="no_data_text">No Data</div>
							</div>
						</div>
						<!-- 有数据 -->
						<div class="row_col_1" v-for="(item,index) in all_list" @click="jump_achieved(item.achievementId)" v-if="ach_index == 1">
							<img :src="HOST + item.achievementUrl" :class="item.createTime == null || item.createTime == '' ? 'gray' : ''"/>
							<div class="achi_name">{{item.achievementName}}</div>
							<div class="get_time" v-if="item.createTime == null || item.createTime == ''">No Achieved</div>
							<div class="get_time" v-else>{{initDate(item.createTime)}} GET</div>
						</div>
						<div class="row_col_1" v-for="(item,index) in my_list" @click="jump_achieved(item.achievementId)" v-if="ach_index == 2">
							<img :src="HOST + item.achievementUrl" />
							<div class="achi_name">{{item.achievementName}}</div>
							<div class="get_time">{{initDate(item.createTime)}} Get</div>
						</div>
					</div>
					<!-- 分页组件 -->
					<!-- <div class="center_pagination">
						<p>
							<img src="@/assets/images/double_left.png" />
						</p>
						<p class="prev">PREV</p>
						<p>1</p>
						<P class="active">2</P>
						<P>3</P>
						<P>4</P>
						<p class="next">NEXT</p>
						<P>
							<img src="@/assets/images/double_right.png" />
						</P>
						<p class="num">2 of 4</p>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/order/left.vue'
	import {allAchievement,myAchievement} from '@/api/followers.js'
	export default{
		name:"achievement",
		data(){
			return{
				ach_index:1,
				all_list:[],
				my_list:[],
				achieved_list:[
					{
						id:1,
						achi_name:"Top Spender",
						icon:require("../../assets/images/medal.png"),
						get_status:"2019-02-02 Get",
						no_achieved:[
							{
								achi_name:"Charm Master",
								icon:require("../../assets/images/medal_2.png"),
								get_status:"No Achieved",
							},
							{
								achi_name:"Secret Admirer",
								icon:require("../../assets/images/medal_3.png"),
								get_status:"No Achieved",
							}
						]
					},
					{
						id:2,
						achi_name:"Bountee Hunter",
						icon:require("../../assets/images/medal_8.png"),
						get_status:"Not Achieved",
						no_achieved:[
							{
								achi_name:"Brother in Arm",
								icon:require("../../assets/images/medal_5.png"),
								get_status:"No Achieved",
							},
							{
								achi_name:"The Expendables",
								icon:require("../../assets/images/medal_6.png"),
								get_status:"No Achieved",
							}
						]
					},
					{
						id:3,
						achi_name:"Future Star",
						icon:require("../../assets/images/medal_4.png"),
						get_status:"No Achieved",
						no_achieved:[
							{
								achi_name:"Host of the Nation",
								icon:require("../../assets/images/medal_7.png"),
								get_status:"No Achieved",
							},
							{
								achi_name:"Spin till i Win",
								icon:require("../../assets/images/medal_9.png"),
								get_status:"No Achieved",
							}
						]
					}
				]
			}
		},
		components:{
			LeftView
		},
		mounted() {
			this.getList(1)
		},
		methods:{
			// tabAch(index){
			// 	this.ach_index = index
			// },
			getList(index){
				this.ach_index = index
				if(this.ach_index == 1){
					allAchievement().then(res => {
						this.all_list = res.data
						console.log(this.all_list)
					})
				}else if(this.ach_index == 2){
					myAchievement().then(res => {
						this.my_list = res.data
						console.log("my_list")
						console.log(this.my_list)
					})
				}
				
			},
			jump_achieved(achievementId){
				this.$router.push({path:'/achievement/achieved',query:{id:achievementId}});
			},
			jump_noAchieved(){
				this.$router.push({path:'/achievement/no_achieved'});
			}
		}
	}
</script>

<style lang="less" scoped>
.container{
	margin-left: 61px;
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	padding-bottom: 30px;
	.content_right{
		width: calc(100% - 370px);
		.content_right_nav{
			margin-top: 50px;
			font-family:'Roboto-Regular';
			.nav{
				display: inline-block;
				color: #898989;
				padding: 0 30px;
				font-size: 20px;
				border-right: 1px solid #7F7F7F;
				cursor: pointer;
				&:last-child{
					border: none;
				}
			}
			.av{
			  color: #BF9D62;
			  font-family:'Roboto-Bold';
			}
		}
		.content_right_form{
			width: calc(100% - 198px);
			.form_row{
				border-radius: 46px;
				// background: #0E0F11;
				display: flex;
				align-items: flex-end;
				// justify-content: space-around;
				flex-wrap: wrap;
				text-align: center;
				// padding-top: 53px;
				padding-bottom: 43px;
				margin-top: 20px;
				background: #0E0F11;
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
				.row_col_1{
					width: 28%;
					margin: 0 55px 50px 0;
					// margin-bottom: 50px;
					// background: #0E0F11;
					border-radius: 46px;
					padding: 53px 0 43px 0;
					cursor: pointer;
					img{
						width: 172px;
						height: 167px;
					}
					.gray { 
						-webkit-filter: grayscale(100%);
						-moz-filter: grayscale(100%);
						-ms-filter: grayscale(100%);
						-o-filter: grayscale(100%);
						filter: grayscale(100%);
						filter: gray;
					}
					.achi_name{
						color: #FFFFFF;
						font-size: 20px;
						margin: 10px 0 7px;
						font-family:'Roboto-Bold';
					}
					.get_time{
						color: #727272;
						font-size: 18px;
						font-family:'Roboto-Regular';
					}
				}
				.row_col{
					img{
						width: 172px;
						height: 167px;
					}
					.achi_name{
						color: #FFFFFF;
						font-size: 20px;
						margin: 10px 0 7px;
						font-family:'Roboto-Bold';
					}
					.get_time{
						color: #727272;
						font-size: 18px;
						font-family:'Roboto-Regular';
					}
				}
			}
			.center_pagination{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				margin-top: 30px;
				.prev{
					width: 76px;
					height: 59px;
				}
				.next{
					width: 76px;
					height: 59px;
				}
				.num{
					width: 76px;
					height: 59px;
				}
				p{
					width: 59px;
					height: 59px;
					line-height: 59px;
					text-align: center;
					background: #0E0F11;
					border-radius: 11px;
					margin-left: 10px;
					font-size: 16px;
					color: #727272;
					img{
						width: 17px;
						height: 17px;
					}
				}
				.active{
					background: #D3AA53;
					border-radius: 10px;
					color: #FFFFFF;
				}
			}//center_pagination
		}
	}
}
</style>
