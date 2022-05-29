<template>
	<div class="index">
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<div class="adiv" @click="jump_pagee(1)">
						<p>Profile</p>
					</div>
					<div class="adiv" @click="jump_pagee(2)">
						<p>Wallet</p>
					</div>
					<div class="adiv" @click="jump_pagee(3)">
						<p class="av">Host</p>
					</div>
					<div class="adiv" @click="jump_pagee(4)">
						<p>Companion</p>
					</div>
				</div>
				<div class="content_right_form">
					<div class="content_right">
						<div class="form_top">
							<div class="title">Answer to apply for host</div>
							<div class="limit_condition">
								<div class="to_pass"><span>To PASS 80%</span> or higher</div>
								<div class="line">|</div>
								<div class="total_num">Total questions {{option_list.length || 0}}</div>
							</div>
						</div>
						<div class="questions_area">
							<div class="question_list" v-for="(item,index) in option_list">
								<div class="question_label"><span>{{item.order}}.</span>{{item.question}}</div>
								<div class="option_list">
									<div class="inputs_img1" v-for="(atem,index1) in item.answers">
										<img src="@/assets/images/yls.png"  v-if="atem.select_status == false" @click="selectRight(index,index1)">
										<img src="@/assets/images/yl.png"  v-if="atem.select_status == true" @click="selectRight(index,index1)">
										<p>{{atem.answer}}</p>
									</div>
									<!-- <div class="inputs_img1">
										<img src="@/assets/images/yls.png" v-if="option_list.oku == true || option_list.oku == null" >
										<img src="@/assets/images/yl.png"  v-if="option_list.oku == false || option_list.oku == ''" >
										<p>option2</p>
									</div>
									<div class="inputs_img1">
										<img src="@/assets/images/yls.png" v-if="option_list.oku == true || option_list.oku == null" >
										<img src="@/assets/images/yl.png"  v-if="option_list.oku == false || option_list.oku == ''" >
										<p>option3</p>
									</div> -->
								</div>
							</div>
						</div>
						<div class="btn_area">
							<div class="submit_btn" @click="submit">Submit</div>
							<div class="cancel_btn" @click="jump_host">Cancel</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/order/left.vue'
	import {getQuestions,hostAnswers,getHostOverview} from '@/api/league.js'
	export default{
		name:"host_apply",
		components: {
			LeftView
		},
		data(){
			return{
				// option_list:{
				// 	// oku:false
				// }
				option_list:[],
				option_list_choose:[],
				dataForm:[
					{
						question:'',
						answers:[
							{
								answer:'',
								isRight:false
							}
						]
					}
				],
				answer_list:[],
				host_detail:{},//主持人概况
			}
		},
		mounted() {
			this.getQuestions()
			this.getHostOverview()
		},
		methods:{
			//获取主持人问题
			getQuestions(){
				getQuestions().then(res => {
					for(let a = 0; a < res.data.length;a++){
						for(let b = 0; b < res.data[a].answers.length;b++){
							res.data[a].answers[b]['select_status'] = false
						}
					}
					this.option_list = res.data
				})
			},
			// 选择答案
			selectRight(index,index1){
				// console.log(this.option_list[index].answers[index1]['answer'])
				// console.log(this.option_list)
				let arr = []
				let obj = {}
				//设置一个变量获取修改前的商品列表数据，并将其转换成新的变量地址，防止修改时被一起修改
				this.option_list_choose = JSON.stringify(this.option_list[index].answers)
				this.option_list_choose = JSON.parse( this.option_list_choose )
				
				for(let b = 0; b < this.option_list[index].answers.length;b++){
					//这里的意思就是，当你选择的答案和option_list列表里面的一个答案相同时，所对应的处理
					if(this.option_list[index].answers[index1]['answer'] == this.option_list[index].answers[b]['answer']){
						if(this.option_list[index].answers[b]['select_status'] == false ){
							
							//点击选择时，当select_status为false时，select_status要为true表示选择了这个答案
							this.option_list[index].answers[b]['select_status'] = true
							
							obj = {
								order:this.option_list[index].order,
								answer:this.option_list[index].answers[index1]['answer']
							}
							//获取是否有被选中返回值来进行判断
							let is_add = this.option_list_choose.findIndex((value)=>value["select_status"] == true )
							if(is_add == -1){
								this.answer_list.push(obj)
								
							}else{	//已有选中的获取下标进行替换
								let replace_value = this.option_list[index].answers[is_add].answer;	//获取当前替换值
								let location = this.answer_list.findIndex((value)=>value["answer"] == replace_value) //获取需要替换位置的下标
								this.answer_list.splice(location,1,obj)
							}
							
							console.log(this.answer_list)

						}else{
							this.option_list[index].answers[b]['select_status'] = false
							let is_add = this.option_list_choose.findIndex((value)=>value["select_status"] == true ) //获取是否有被选中返回值来进行判断
							let replace_value = this.option_list[index].answers[is_add].answer;	//获取当前替换值
							let location = this.answer_list.findIndex((value)=>value["answer"] == replace_value) //获取需要替换位置的下标
							this.answer_list.splice(location,1)
						}
						
					}else{
						// if(this.option_list[index].answers[b]['select_status'] == true){
							this.option_list[index].answers[b]['select_status'] = false
						// }else{
							// this.option_list[index].answers[b]['select_status'] = true
						// } 
							
					}
				}
				// 
				// console.log(this.answer_list)
			},
			// 提交答案
			submit(){
				console.log(this.answer_list)
				hostAnswers(this.answer_list).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					// console.log(res.data)
					if(res.data.testProgress >= 80 || res.data.testProgress >= 0.8){
						this.$router.push({path: '/order/host_level'})
					}else{
						this.$router.push({path: '/order/host'})
					}
				})
			},
			//获取主持人概况
			getHostOverview(){
				getHostOverview().then(res => {
					this.host_detail = res.data
				})
			},
			// 跳转页面
			jump_pagee(index) {
				if (index == 1) {
					this.$router.push({
						path: '/center/profile'
					})
				} else if (index == 2) {
					this.$router.push({
						path: '/order/wallet'
					})
				} else if (index == 3) {
					if(this.host_detail.status == 'ENABLE'){
						this.$router.push({path: '/order/host_level'})
					}else{
						this.$router.push({path: '/order/host'})
					}
				} else if (index == 4) {
					this.$router.push({
						path: '/center/companion'
					})
				}
			},
			jump_host(){
				this.$router.push({path: '/order/host'})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 90%;
		margin-left: 61px;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;
		/* 换行 */
		padding-bottom: 30px;
		.content_right {
			width: calc(100% - 370px);
			.content_right_nav {
				margin-top: 50px;
				margin-bottom: 20px;
				p {
					display: inline-block;
					color: #898989;
					font-family: 'Roboto-Regular';
					padding: 0 30px;
					font-size: 16px;
					margin: 0;
				}
				.adiv {
					display: inline-block;
					cursor: pointer;
					border-right: 1px solid #7F7F7F;
		
					&:last-child {
						border: none;
					}
				}
				.av {
					color: #BF9D62;
					font-family: 'Roboto-Bold';
				}
			}
			.content_right_form{
				width: calc(100%-60px);
				.content_right{
					width: 100%;
					// height: 751px;
					background: #0E0F11;
					border-radius: 65px;
					margin-top: 30px;
					padding: 50px;
					.form_top{
						// padding: 30px 30px 50px;
						padding-bottom: 20px;
						border-bottom: 1px solid #727272;
						.title{
							color: #DBA83F;
							font-size: 22px;
							font-family: 'Roboto-Regular';
						}
						.limit_condition{
							display: flex;
							margin-top: 20px;
							.to_pass{
								color: #7f7f7f;
								font-size: 18px;
								span{
									color: #FFFFFF;
									font-family: 'Roboto-Bold';
								}
							}
							.line{
								margin: 0 25px;
								color: #7f7f7f;
							}
							.total_num{
								font-family: 'Roboto-Regular';
								color: #7f7f7f;
								font-size: 18px;
							}
						}
					}
					.questions_area{
						width: 95%;
						margin-top: 50px;
						.question_list{
							// width: 80%;
							margin-bottom: 30px;
							.question_label{
								color: #7f7f7f;
								font-size: 18px;
								width: 100%;
								// background-color: #FFF000;
								word-wrap: break-word;
								white-space: pre-wrap;
								span{
									color: #FFFFFF;
									// font-size: 18px;
								}
							}
							.option_list{
								display: flex;
								flex-direction: column;
								margin-left: 20px;
								margin-top: 10px;
								font-size: 18px;
								.inputs_img1 {
									display: flex;
									align-items: center;
									margin-bottom: 8px;
									// float: left;
									img {
										width: 25px;
									}
									p {
										margin: 10px;
										color: #727272;
										width: 90%;
										// background-color: #FFFFB6;
										word-wrap: break-word;
										white-space: pre-wrap;
									}
								}
							}
						}
					}
					.btn_area{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						.submit_btn {
							width: 120px;
							height: 50px;
							line-height: 50px;
							background-color: #D3AA53;
							border-radius: 25px;
							text-align: center;
							color: #000;
							font-size: 18px;
							font-family:'Roboto-Regular';
							cursor: pointer;
						}
						.cancel_btn {
							width: 120px;
							height: 50px;
							line-height: 50px;
							border: 1px solid #777777;
							border-radius: 25px;
							text-align: center;
							color: #fff;
							font-size: 18px;
							margin-left: 20px;
							font-family:'Roboto-Regular';
							cursor: pointer;
						}
					}
				}
			}
		}
	}
	
</style>
