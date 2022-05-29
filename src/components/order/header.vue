<template>
	<div class="index">
		<div class="container">
			<div class="content_right_nav">
				<div class="adiv" @click="jump_pagee(1)">
					<p :class="header_index == 1 ? 'av' : ''">Profile</p>
				</div>
				<div class="adiv" @click="jump_pagee(2)">
					<p :class="header_index == 2 ? 'av' : ''" >Wallet</p>
				</div>
				<div class="adiv" @click="jump_pagee(3)">
					<p :class="header_index == 3 ? 'av' : ''">Host</p>
				</div>
				<div class="adiv" @click="jump_pagee(4)">
					<p :class="header_index == 4 ? 'av' : ''">Companion</p>
				</div>
			</div><!-- content_right_nav -->
		</div>
	</div>
</template>

<script>
	import {getHostOverview} from '@/api/league.js'
	export default{
		name: "index",
		props: ['index'],
		data(){
			return{
				header_index:this.index,
				host_detail:{}
			}
		},
		methods:{
			//获取主持人概况
			getHostOverview(){
				getHostOverview().then(res => {
					this.host_detail = res.data
					console.log(this.host_detail)
				})
			},
			// 跳转页面
			jump_pagee(index){
				if(index == 1){
					this.$router.push({path: '/center/profile'})
				}else if(index == 2){
					this.$router.push({path: '/order/wallet'})
				}else if(index == 3){
					if(this.host_detail.status == "ENABLE"){
						// console.log("不是你吗")
						// this.$router.push({path: '/order/host'})
						this.$router.push({path: '/order/host_level'})
					}else{
						// console.log("不是你")
						// this.$router.push({path: '/order/host_level'})
						this.$router.push({path: '/order/host'})
					}
				}else if(index == 4){
					this.$router.push({path: '/center/companion'})
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.container{
		.content_right_nav{
		  margin-top: 50px;
		  margin-bottom: 20px;
		  p{
		    display: inline-block;
		    color: #898989;
			font-family:'Roboto-Regular';
		    padding: 0 30px;
		    font-size: 16px;
			margin: 0;
		  }
		  .adiv{
			display: inline-block;
			cursor: pointer;
		    border-right: 1px solid #7F7F7F;
		    &:last-child{
		      border: none;
		    }
		  }
		  .av{
		    color: #BF9D62;
			font-family:'Roboto-Bold';
		  }
		}
	}
</style>
