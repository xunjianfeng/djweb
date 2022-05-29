<template>
	<div class="index">
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<p class="av">STEP 03</p>
					<p >——</p>
					<p >——</p>
					<p >——</p>
				</div>
				<div class="content_right_form">
					<div class="right_form_title">
						<p>Update Your Verify</p>
						<div class="left_block">
							<!-- <div class="do_it_later">
								<img src="../../assets/images/wenhao.png" alt="">
								<p>Do It Later</p>
							</div> -->
							<button class="confirm" @click="submit_Identification">Confirm</button>
							<button class="back" @click="jump_personal">Back</button>
						</div>
				    </div><!-- right_form_title -->
					<div class="right_form_information">
						<div class="form_inputs">
							<div class="form_input1" >
								<p>Type of Your Verify</p>
								<div class="select">
									<select>
										<option>NRIC</option>
										<option>PASSPORT</option>
									</select>
									<img class="dropdown" src="../../assets/images/dropdown.png" />
								</div>
								
								<!-- <input type="text"  value="Jalan Laksamana 1 Teega Tower Unit 01-02, Puteri Harbour"> -->
							</div>
							<div class="form_input2" >
								<p>Your NRIC Number</p>
								<input type="text"  value="">
							</div>
							<div class="form_input3" >
								<p>Please upload your NRIC number & front and back for verification</p>
								<div class="pic_img">
									<div class="front_view">
										<p>Front View</p>
										<div class="img">
											<img src="../../assets/images/update.png" />
										</div>
									</div>
									<div class="front_view">
										<p>Back View</p>
										<div class="img">
											<img src="../../assets/images/update.png" />
										</div>
									</div>
								</div><!-- pic_img -->
							</div><!-- form_input3 -->
						</div><!-- form_inputs -->
					</div><!-- right_form_information -->
				</div><!-- content_right_form -->
			</div><!-- content_right -->
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/order/left.vue'
	import {userIdentification} from '@/api/user_info.js'
	export default{
		name:"index",
		data(){
			return{
				info_list:''
			}
		},
		components:{
			LeftView
		},
		mounted() {
			// console.log("userId是："+ sessionStorage.getItem("userId"))
			// this.submit_Identification()
		},
		methods:{
			jump_personal(){
				this.$router.push({path:'/center/personal'})
			},
			submit_Identification(){
				let self = this;
				let user_Id = sessionStorage.getItem("userId");
				userIdentification(user_Id)
					.then(function(res){
						// if(user_Id == res.data.userId){
						// 	self.info_list = res.data;
						// 	console.log(self.info_list)
						// }else{
						// 	console.log("出错了-_-||")
						// }
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
	flex-wrap: wrap; /* 换行 */
	padding-bottom: 30px;
	.content_right{
		width: calc(100% - 370px);
		.content_right_nav{
			margin-top: 50px;
			p{
				display: inline-block;
				color: #BF9D62;
				padding: 0 0 0 30px;
				font-size: 16px;
				&:nth-child(n+2){
					font-size: 22px;
					padding: 0;
					margin-left: 10px;
					color: #BF9D62;
				}
			}
			.av{
				color: #BF9D62;
				font-family:'Quicksand-Bold';
			}
		}//content_right_nav
		.content_right_form{
			width: calc(100% - 60px);
			background: #0E0F11;
			border-radius: 50px;
			padding: 20px;
			.right_form_title{
				display: flex;
				align-items: center;
				justify-content: space-between; 
				// flex-wrap: wrap;
				width: 95%;
				margin: 0 2.5%;
				padding-bottom: 25px;
				border-bottom: 1px solid #2D2D2D;
				p{
					color: #fff;
					font-size: 18px;
					font-family:'Quicksand-Bold';
				}
				.left_block{
					display: flex;
					align-items: center;
					.do_it_later{
						display: flex;
						align-items: center;
						margin-right: 92px;
						p{
							color: #D3AA53;
							font-size: 20px;
							margin-left: 18px;
							font-family:'Quicksand-Bold';
						}
					}
					.confirm{
					  width: 130px;
					  height: 50px;
					  background: #D3AA53;
					  border: none;
					  color: #000;
					  border-radius: 50px;
					  font-size: 16px;
					  font-family:'Roboto-Regular';
					  // float: right;
					}
					.back{
					  width: 130px;
					  height: 50px;
					  background: #0E0F11;
					  border: 1px solid #ffffff;
					  // border: none;
					  color: #fff;
					  border-radius: 50px;
					  font-size: 16px;
					  margin-left: 20px;
					  font-family:'Roboto-Regular';
					  // float: right;
					}
				}
			}//right_form_title
			.right_form_information{
				width: 95%;
				margin: 0 2.5%;
				margin-top: 30px;
				font-family:'Roboto-Regular';
				.form_inputs{
					// width: 4%;
					// &:nth-child(2n){
					//   position: relative;
					//   left: -20px;  
					// }
					p{
					  color: #727272;
					  font-size: 16px;
					  
					}
					input{
					  width: 40%;
					  height: 55px;
					  border: 2px solid #2D2D2D;
					  border-radius: 19px;
					  color: #fff;
					  background: inherit;
					  padding-left: 20px;
					  font-size: 16px;
					}
					.form_input1{
						margin: 50px 0;
						.select{
							width: 43%;
							display: flex;
							align-items: center;
							
							.dropdown{
								width: 10px;
								height: 8px;
								position: relative;
								right: 30px;
							}
							select{
								width: 100%;
								height: 55px;
								border: 2px solid #2D2D2D;
								border-radius: 19px;
								background-color: #0E0F11;
								color: #fff;
								/*取消默认箭头开始*/
								appearance:none;
								-moz-appearance:none;
								-webkit-appearance:none;
								/*取消默认箭头结束*/
								padding-left: 10px;
							}
						}
						
					}
					.form_input2{
						margin: 50px 0;
					}
					.form_input3{
						margin-top: 30px;
						padding-bottom: 50px;
						p{
						  color: #727272;
						  font-size: 16px;
						  
						}
						.pic_img{
							width: 300px;
							display: flex;
							text-align: center;
							// justify-content: center;
							.front_view{
								margin-right: 20px;
								
								p{
									color: #FFF;
									font-size: 18px;
									font-family:'Roboto-Regular';
								}
								.img{
									width: 300px;
									height: 150px;
									border-radius: 20px;
									background-color: #000;
									display: flex;
									align-items: center;
									justify-content: center;
									img{
										width: 25px;
										height: 25px;
									}
								}
							}//.front_view
						}//.pic_img
					}//form_input3
				}//form_inputs
			}//right_form_information
		}//content_right_form
	}//content_right
 }
</style>
