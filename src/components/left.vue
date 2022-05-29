<template>
	<div class="index">
		<div id="left">
			<!--提示完善信息 弹窗 -->
			<div class="mark_bac" v-if="left_mark_up == true">
				<div class="mark_cancel" v-if="left_mark_up == true" @click.stop="left_mark_up = false">
					<img class="cancel_img" src="@/assets/images/cancel.png" >
				</div>
				<div class="mark_Top_container" v-if="left_mark_up == true">
					<div class="mark_my_content ">
						<div class="mark_text_one">Please complete your information first</div>
						<div class="mark_text_two">Before operating this function, you need to complete your information</div>
					</div>
					<div class="mark_my_foot">
						<div class="mark_foot_button" @click="jupm_later">Go to complete my profile ></div>
					</div>
				</div>
			</div>
			<!-- Check out 02 end -->
			<div class="left_logo">
				<!-- <img src="@/assets/images/group_logo.png"> -->
				<img src="../assets/images/list.png" />
			</div>
			<div class="left_content" @click="reset">
				<div :class="nav_index == 1?'left_content_col col_av':'left_content_col'" @click="left_navigation(1)">
					<div class="left_content_col_img">
						<img :src="nav_index == 1? left_icon_av:left_icon">
					</div>
					<p class="left_content_col_p">Home</p>
				</div>
				<div :class="nav_index == 2?'left_content_col col_av':'left_content_col'" @click="left_navigation(2)">
					<div class="left_content_col_img">
						<img :src="nav_index == 2? left_icon_av2:left_icon2">
					</div>
					<p class="left_content_col_p">Tournament</p>
				</div>

				<!-- 以下为隐蔽项start -->
				<div :class="nav_index == 3?'left_content_col col_av':'left_content_col'" @click="left_navigation(3)">
					<div class="left_fang_col_img">
						<img :class="nav_index == 3?'fang_img':'fang_img2'" :src="nav_index == 3? left_icon_av3:left_icon3">
					</div>
					<p class="left_content_col_p">Rapid Challenge</p>
				</div>
				<div :class="nav_index == 4?'left_content_col col_av':'left_content_col'" @click="left_navigation(4)">
					<div class="left_small_col_img">
						<img :src="nav_index == 4 ? left_icon_av4:left_icon4">
					</div>
					<p class="left_content_col_p">League</p>
				</div>
				<div :class="nav_index == 5?'left_content_col col_av':'left_content_col'" @click="left_navigation(5)">
					<div class="left_small_col_img">
						<img :src="nav_index == 5 ? left_icon_av5:left_icon5">
					</div>
					<p class="left_content_col_p">Predict and Win</p>
				</div>
				<div :class="nav_index == 6?'left_content_col col_av':'left_content_col'" @click="left_navigation(6)">
					<div class="left_content_col_img">
						<img :src="nav_index == 6 ? left_icon_av6:left_icon6">
					</div>
					<p class="left_content_col_p">Redemption</p>
				</div>
				<div :class="nav_index == 7?'left_content_col col_av':'left_content_col'" @click="left_navigation(7)">
					<div class="left_content_col_img">
						<img :src="nav_index == 7 ? left_icon_av7:left_icon7">
					</div>
					<p class="left_content_col_p">Companion</p>
				</div>
				<!-- 以下为隐蔽end -->
				<div :class="nav_index == 8?'left_content_col col_av':'left_content_col'" @click="left_navigation(8)">
					<div class="left_content_col_img">
						<img :src="nav_index == 8? left_icon_av8:left_icon8">
					</div>
					<p class="left_content_col_p">Ranking</p>
				</div>
				<p class="bottom_text">Privacy · Terms · Eternity 2021</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		components: {},
		data() {
			return {
				hover_status: false,
				hover_status1:false,
				left_mark_up:false,
				nav_index: 0,
				left_icon_av:require("../assets/images/left_icon_av.png"),// 左侧icon 选中
				left_icon_av2:require("../assets/images/left_icon_av2.png"),
				left_icon_av3:require("../assets/images/left_icon_av3.png"),
				left_icon_av4:require("../assets/images/left_icon_av4.png"),
				left_icon_av5:require("../assets/images/left_icon_av5.png"),
				left_icon_av6:require("../assets/images/left_icon_av6.png"),
				left_icon_av7:require("../assets/images/left_icon_av7.png"),
				left_icon_av8:require("../assets/images/left_icon_av8.png"),
				left_icon:require("../assets/images/left_icon.png"),// 左侧icon 未选中
				left_icon2:require("../assets/images/left_icon2.png"),
				left_icon3:require("../assets/images/left_icon3.png"),
				left_icon4:require("../assets/images/left_icon4.png"),
				left_icon5:require("../assets/images/left_icon5.png"),
				left_icon6:require("../assets/images/left_icon6.png"),
				left_icon7:require("../assets/images/left_icon7.png"),
				left_icon8:require("../assets/images/left_icon8.png"),
				top_user_info:'',
			};
		},
		created() {
			this.nav_index = sessionStorage.getItem("nav_status")
		},
		mounted() {
			this.top_user_info = JSON.parse(sessionStorage.getItem("userinfo"))
			// this.nav_index = sessionStorage.getItem("nav_status")
		},
		watch: {
			$route(to, from) {
				let that = this;
				that.nav_index = sessionStorage.getItem("nav_status")
			}
		},
		methods: {
			refreshnav(){
				this.left_navigation(1)	//当父组件发送事件刷新导航条
			},
			reset(){
				this.PageNumber.page_number = 1; //当跳转其他页面时重置页数
			},
			jupm_later(){
				this.left_mark_up = false
				this.$router.push({ path: '/center/personal'})
			},
			// 左侧导航跳转
			left_navigation(index){
				let that = this;
				sessionStorage.setItem("select_status", 0)
				sessionStorage.setItem("nav_status", index)
				that.top_user_info = JSON.parse(sessionStorage.getItem("userinfo"))
				if(index == 1){
					that.$router.push({ path: '/'})
					that.nav_index = index
				}else if(index == 2){
					if(this.top_user_info.vipLevel == 'NA'){
						that.left_mark_up = true
					}else{
						// tourn_status 2 Open Registration  3 In Progress  4 History  通过点击缓存状态， 在赛事列表页判断默认状态
						sessionStorage.setItem("tourn_status", 2)
						that.$router.push({ path: '/tournament/registration'})
						that.nav_index = index
					}
				}else if(index == 3){
					if(this.top_user_info.vipLevel == 'NA'){
						that.left_mark_up = true
					}else{
						that.$router.push({ path: '/league/rapid_challenge'})
						that.nav_index = index
					}
				}else if(index == 4){
					if(this.top_user_info.vipLevel == 'NA'){
						that.left_mark_up = true
					}else{
						that.$router.push({ path: '/league/league'})
						that.nav_index = index
					}
				}else if(index == 5){
					if(this.top_user_info.vipLevel == 'NA'){
						that.left_mark_up = true
					}else{
						that.$router.push({ path: '/league/predict_and_win'})
						that.nav_index = index
					}
				}else if(index == 6){
					if(this.top_user_info.vipLevel == 'NA'){
						that.left_mark_up = true
					}else{
						that.$router.push({ path: '/redemption/redemption'})
						that.nav_index = index
					}
				}else if(index == 7){
					if(this.top_user_info.vipLevel == 'NA'){
						that.left_mark_up = true
					}else{
						that.$router.push({ path: '/companion/index'})
						that.nav_index = index
					}
				}
				else if(index == 8){
					if(this.top_user_info.vipLevel == 'NA'){
						that.left_mark_up = true
					}else{
						that.$router.push({ path: '/ranking/index'})
						that.nav_index = index
					}
				}

			},


			hover_up() {
				this.hover_status = !this.hover_status
			},
			// 移入事件
			enters(index) {
				if (index == 1) {
					this.hover_status = true
				}
			},
			// 移出事件
			leaver(index) {
				if (index == 1) {
					this.hover_status = false
				}
			},
		}
	};
</script>
<style >
	#left {
		width: 215px;
		height: 100vh;
		background: #0E0F11;
		position: fixed;
		left: 0;
		top: 0;
		color: #fff;
		z-index:101;
	}
	/* Check out 02弹窗 start */
	.mark_cancel{
		position: absolute;
		right: 80px;
		top: 170px;
		z-index: 101;
	}
	.cancel_img{
		width: 46px;
		height: 46px;
		cursor: pointer;
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
	.mark_Top_container{
		position: absolute;
		left: 600px;
		top: 200px;
		z-index: 101;
		width: 557px;
		padding: 126px 111px 103px 162px;
		background: #0E0F11;
		border-radius: 27px;
		overflow: hidden;
		display: flex;
		flex-flow: column;
		align-items: center;

	}
	.mark_my_content{
		width: 100%;
		text-align: center;
		margin-bottom: 60px;
	}
	.mark_text_one{
		color: #DBA83F;
		font-size: 24px;
		margin-bottom: 20px;
		font-family:'Roboto-Regular';
	}
	.mark_text_two{
		color: #989898;
		font-size: 20px;
		font-family:'Roboto-Regular';
		span{
			color: #EDEDED;
			font-weight: bold;
			font-family:'Roboto-Regular';
		}
	}
	.mark_my_foot{}
	.mark_foot_button{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 260px;
		height: 58px;
		color: #0E0F11;
		cursor: pointer;
		font-size: 20px;
		background: #DBA83F;
		font-family:'Roboto-Regular';
		border-radius: 25px;
	}
	/* Check out 02弹窗  end */
	.left_logo {
		margin: 48px 25px 90px 25px;
	}
	.left_logo img {
		/* width: 140px; */
		/* height: 156px; */
		width: 143px;
		height: 157px;
		/* background-color: #FFFF00; */
	}

	.left_content {
		width: 100%;
	}

	.left_content_col {
		margin-top: 18px;
		padding: 0 7px 0 18px;
		cursor:pointer;
		/* background-color: #F0C78A; */
		height: 60px;
		display: flex;
		align-items: center;
	}
	.col_av{
		cursor:pointer;
		background-color:#1D2023 ;
		margin: 18px 7px 0 18px;
		padding: 0 0px 0 0px;
		border-radius: 12px;
		color: #D3AA53;
	}
	.left_content_col p {
		font-size: 15px;
		display: inline-block;
		margin-left: 10px;
		font-family:'Questrial-Regular';
	}
	.left_content_col_img {
		width: 45px;
		height: 45px;
		background: #1D2023;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		float: left
	}
	.left_content_col_img img {
		width: 20px;
	}
	.bottom_text{
		position: absolute;
		bottom: 10px;
		width: 90%;
		left: 5%;
		font-size: 14px;
		font-family:'Questrial-Regular';
	}
	.left_fang_col_img{
		width: 45px;
		height: 45px;
		background: #1D2023;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		float: left
	}
	.fang_img{
		width: 30px;
		height: 22px;
	}
	.fang_img2{
		width: 35px;
		/* height: 22px; */
	}
	.left_small_col_img {
		width: 45px;
		height: 45px;
		background: #1D2023;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		float: left
	}

	.left_small_col_img img {
		width: 14px;
	}

</style>
