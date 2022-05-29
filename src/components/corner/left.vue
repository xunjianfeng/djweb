<template>
	<div class="index">
		<div class="container">
			<div class="content_left">
				<div class="content_left_avatar">
					<div class="content_left_text">
						FAQ
					</div>
				</div>
				<div class="content_left_col">
					<p :class="nav==item.fqaCategoryId?'av':''" @click="navs(item.fqaCategoryId , index)" v-for="(item,index) in category_list">{{item.fqaCategory}}</p>
					<!-- <p :class="nav==1?'av':''" @click="navs(1)">Tournament</p>
					<p :class="nav==2?'av':''" @click="navs(2)">Rapic Challenge</p>
					<p :class="nav==3?'av':''" @click="navs(3)">Predict and Win</p>
					<p :class="nav==4?'av':''" @click="navs(4)">Our Sponsor</p>
					<p :class="nav==5?'av':''" @click="navs(5)">Terms & Condition</p> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {faqList,faqCategoryList} from '@/api/center.js'
	export default {
		name: "index",
		components: {},
		props: ['index'],
		data() {
			return {
				nav: this.index,
				category_list:[]
			};
		},
		mounted() {
			this.getCategory()
		},
		methods: {
			navs(fqaCategoryId,index) {
				this.nav = fqaCategoryId
				// if(index == 1){
				//     this.$router.push({path:'/center/personal'})
				// }else if(index == 2){
				//     this.$router.push({path:'/center/following'})
				// }
				
				// 点击滚动到指定位置
				this.$nextTick(() => {
					let appoint = document.querySelector('#appoint')
					let height = 0
					let target = document.getElementsByClassName('right_block')[index]
					
					height += target.offsetTop
					
					appoint.scrollTo({
						top: height,
						behavior: 'smooth'
					})
				
				 })

			},
			//分类列表
			getCategory(){
				faqCategoryList().then(res => {
					this.category_list = res.data
				})
			},	
		}
	};
</script>

<style lang="less" scoped>
	.container {
		position: fixed;
		.content_left {
			width: 318px;
			height: 761px;
			// background: #0E0F11;
			margin-top: 74px;

			.content_left_avatar {
				width: 90%;
				margin: 0 auto;
				padding-bottom: 20px;

				.content_left_text {
					width: 100%;
					color: #fff;
					display: flex;
					font-size: 22px;
					font-weight: bold;
					align-items: center;
					height: 50px;
					font-family: 'Quicksand-Bold';

					img {
						width: 15px;
						float: left;
						margin-left: 10px;
					}
				}

				.text_uid {
					color: #727272;
					padding: 0;
					margin: 0;
				}
			}

			.content_left_col {

				// width: 90%;
				// margin: 0 auto;
				p {
					cursor: pointer;
					height: 50px;
					border-radius: 18px;
					color: #999999;
					line-height: 50px;
					padding-left: 20px;
					font-size: 22px;
					font-weight: 500;
					font-family: 'Roboto-Regular';
				}

				.av {
					// background: #1D2023;
					color: #BF9D62;
					font-family: 'Roboto-Medium';
				}
			}
		}
	}
</style>
