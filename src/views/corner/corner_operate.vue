<template>
	<div class="index" id="appoint">
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<!-- 有内容 -->
				<div class="right_block" v-for="(ctem,cndex) in category_list" :key="cndex">
					<div class="right_head">
						<!-- <div class="head_text">Tournament</div> -->
						<div class="head_text">{{ctem.fqaCategory}}</div>
						<div class="head_border"></div>
					</div>
					<div class="right_info" v-for="(item,index) in question_list" :key="index">
						<div class="info_top" v-if="item.type == ctem.fqaCategoryId">
							<!-- <div class="info_top_left">Question 01</div> -->
							<div class="info_top_left">{{item.question}}</div>
							<div class="info_top_right">
								<img class="info_plus" src="@/assets/images/reduce.png" v-if="item.answer_status == true" alt="" @click="changeStatus(item.id)">
								<img class="info_plus" src="@/assets/images/plus.png" v-if="item.answer_status == false" alt="" @click="changeStatus(item.id)">
							</div>
						</div>
						<div class="text_content" v-if="item.answer_status == true && item.type == ctem.fqaCategoryId">
							<!-- <div class="info-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
								tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
								tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
								in hendrerit in vulputate velit esse molestie consequat</div> -->
							<div class="info-text">
								{{item.answer}}
								<!-- Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat -->
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import LeftView from '@/components/corner/left.vue'
	import {faqList,faqCategoryList} from '@/api/center.js'
	export default {
		name: "corner_operate",
		components: {
			LeftView
		},
		data() {
			return {
				category_list:[],
				question_list: []
			};
		},
		mounted() {
			this.getCategory()
			this.getList()
		},
		methods: {
			//分类列表
			getCategory(){
				faqCategoryList().then(res => {
					this.category_list = res.data
				})
			},			
			//FAQ列表
			getList() {
				faqList().then(res => {
					for(let i=0;i<res.data.length;i++){
						res.data[i]['answer_status'] = false
					}
					this.question_list = res.data
				})
			},
			//打开或关闭答案显示
			changeStatus(id){
				for(let a=0; a<this.question_list.length;a++){
					if(this.question_list[a].id == id){
						this.question_list[a].answer_status = !this.question_list[a].answer_status
					}
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.container {
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		/* 横向中间自动空间 */
		flex-wrap: wrap;

		/* 换行 */
		.content_right {
			width: calc(100% - 370px);
			padding-top: 110px;
			margin-bottom: 320px;
			.right_block {
				margin-bottom: 100px;
				.right_head {
					height: 24px;
					display: flex;
					align-items: center;
					margin-bottom: 20px;

					.head_text {
						color: #727272;
						font-size: 20px;
						font-weight: 500;
						margin-right: 83px;
						font-family: 'Roboto-Bold';
					}

					.head_border {
						width: 301px;
						height: 2px;
						background-color: #2D2D2D;
					}
				}

				.right_info {
					// width: 1119px;
					padding: 0px 61px 0px 61px;
					background: #0E0F11;
					border-radius: 24px;
					margin-bottom: 30px;

					.info_top {
						display: flex;
						height: 98px;
						align-items: center;
						justify-content: space-between;

						border-bottom: 2px solid #2D2D2D;

						.info_top_left {
							font-size: 20px;
							color: #fff;
							// font-weight: bold;
							font-family: 'Roboto-Bold';
						}

						.info_top_right {
							.info_plus {
								width: 42px;
								height: 41px;
								cursor: pointer;
							}
						}

					}

					.text_content {
						padding: 25px 0px;
						font-family: 'Roboto-Regular';

						.info-text {
							color: #727272;
							font-size: 20px;
							line-height: 30px;
							font-weight: 500;
						}
					}
				}
			}

			.right_block2 {
				margin-top: 100px;

				.right_head {
					height: 24px;
					display: flex;
					align-items: center;
					margin-bottom: 20px;

					.head_text {
						color: #727272;
						font-size: 20px;
						font-weight: 500;
						margin-right: 83px;
						font-family: 'Roboto-Bold';
					}

					.head_border {
						width: 301px;
						height: 2px;
						background-color: #2D2D2D;
					}
				}

				.right_info {
					// width: 1119px;
					padding: 0px 61px 0px 61px;
					background: #0E0F11;
					border-radius: 24px;
					margin-bottom: 30px;

					.info_top {
						display: flex;
						height: 98px;
						align-items: center;
						justify-content: space-between;

						border-bottom: 2px solid #2D2D2D;

						.info_top_left {
							font-size: 20px;
							color: #fff;
							// font-weight: bold;
							font-family: 'Roboto-Bold';
						}

						.info_top_right {
							.info_plus {
								width: 42px;
								height: 41px;
							}
						}

					}

					.text_content {
						padding: 25px 0px;
						font-family: 'Roboto-Regular';

						.info-text {
							color: #727272;
							font-size: 20px;
							line-height: 30px;
							font-weight: 500;
						}
					}
				}
			}

		}
	}
</style>
