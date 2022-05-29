<template>
	<div class="index">
		<div class="container">
			<!-- 支付弹窗 -->
			<div class="mark_check" v-if="use_status == true"  @click="use_status = false">
				<img src="@/assets/images/cancel.png" >
			</div>
			<div class="mark_bac" v-if="use_status == true"></div>
			<div class="mark_check_container" v-if="use_status == true">
				<div class="mark_my_content ">
					<div class="popun_img">
						<img src="../../assets/images/coupon2.png" alt="">
					</div>
					<div class="popun_tit">You can view your coupon from the <span>My Redemption</span></div>
					<div class="popun_num">{{coupon_info.couponTitle}}</div>
				</div>
				<div class="mark_my_foot">
					<div class="user_button" @click="jump_cat">Use</div> 
				</div>
			</div>
			<div class="mark_check_container_add" v-if="use_status == true"></div>
			<!-- end -->
			<div class="container_bacolor">
				<div class="content_right">
					<!-- 轮播图 -->
					<div class="home_carousel">
						<el-carousel class="carousel_block" height="412px" :interval="5000" :autoplay="false">
							<el-carousel-item v-for="item in advertisementList" :key="item">
								<img :src="HOST+item.advertisementUrl" :key="item.advertisementId" class="carousel_img" />
								<div class="carousel-con">
									<div class="carousel-con-tit">{{item.advertisementTitle}}</div>
									<div class="carousel-con-botton">
										<div class="carousel-botton-left" @click="jump(item.joinLink)" v-if="item.joinLink">Join</div>
										<div class="carousel-botton-right" @click="jump(item.seeMore)" v-if="item.seeMore">See more</div>
									</div>
								</div>
							</el-carousel-item>
						</el-carousel>
					</div>
					<!-- 优惠券 -->
					<div class="match_container" v-if="coupon_list.length>0">
						<div class="match_title">
							<div class="match_tit_left">Get Coupon</div>
							<!-- <div class="match_tit_right" @click="talk_status = ! talk_status">More coupon</div> -->
						</div>
						<div class="match_content" style="overflow-x: scroll;padding-bottom:20px;">
							<div class="match_content_coupon">
								<div class="coupon_list" v-for="(item,index) in coupon_list" :key="index">
									<div class="coupon_img"><img src="../../assets/images/coupon.png" alt=""></div>
									<div class="coupon_list_warp">
										<div class="coupon_tit">{{item.couponTitle}}</div>
										<!-- <div class="coupon_exp">EXP：{{item.timeMode==1?item.startTime:'领券起'+item.validityDay+'天后过期'}}</div> -->
										<div class="coupon_exp">Expired at {{initDate(item.endTime)}}</div>
									</div>
									<div class="coupon_right">
										<div class="coupon_button" @click.stop="get_receive(item.couponId,item)">Get</div>
										<div class="coupon_rule">Rule>></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 赛事card -->
					<div class="match_container">
						<div class="match_title">
							<div class="match_tit_left">Best</div>
							<div class="match_tit_right" @click="talk_status = ! talk_status">View more</div>
						</div>
						<div class="match_content">
							<div class="match_card" v-for="(item, index) in list" :key="index" @click="jump_reg_info(item.id,item.status)">
								<div class="match_left"><img :src="HOST + item.tournamentCover" ></div>
								<div class="match_right">
									<div class="match_tit">{{ item.tournamentName }}</div>
									<div class="match_time">Tournament ends at</div>
									<div class="match_hour_text">{{initDete(item.createTime)}}</div>
									<div class="match_flex">
										<div class="match_flex_left">
											<div class="flex_left_img">
												<img src="../../assets/images/icon1.png" alt="" v-show="item.tournamentCategory=='privately'">
												<img src="../../assets/images/icon0.png" alt="" v-show="item.tournamentCategory=='officially'">
											</div>
											<div class="flex_left_img">
												<img src="../../assets/images/icon2.png" alt="" v-show="item.tournamentType==0">
												<img src="../../assets/images/icon3.png" alt="" v-show="item.tournamentType!='0'">
											</div>
										</div>
										<div class="match_flex_right">
											<div class="flex_right_img">
												<el-image :src="HOST + item.gameLogo" class="game_img">
													<div slot="error" class="image-slot"> 
														<img src="../../assets/images/default_game.png" class="default_img"/>
													</div>
												</el-image>
												<!-- <img :src="HOST + item.gameLogo" alt="" v-if="item.gameLogo"> -->
											</div>
										</div>
									</div>
									<div class="match_flex_text">
										<div class="text_left">Format</div>
										<div class="text_right">
											{{item.stages_format==1?'Single Elimination':item.stages_format==2?'Double Elimination':item.stages_format==3?'Round Robin':'Free For All'}}
											<span v-if="item.stages_format == 3">({{item.groupSize || 0}} > {{item.promotionSize || 0}})</span>
										</div>
									</div>
									<!-- <div class="match_flex_text">
										<div class="text_left">Best Of</div>
										<div class="text_right">4</div>
									</div> -->
									<div class="match_flex_text">
										<div class="text_left">Mode</div>
										<div class="text_right">{{item.mode||0}} vs {{item.mode||0}}</div>
									</div>
									<div class="match_flex_text">
										<div class="text_left">Joinned</div>
										<div class="text_right">{{item.joinned||0}}/{{item.participantsSize||0}}</div>
									</div>
									<div class="match_flex_text" v-if="listQuery.state==2">
										<el-progress style="width:100%;margin-top:20px;" :percentage="item.num" :show-text="false" color="#d3aa53" :stroke-width="10"></el-progress>
									</div>
									<div class="match_flex_text2" >
										<div class="text_left">Total Value</div>
										<div class="text_right">{{item.bonus}}</div>
									</div>
								</div>
							</div>
							
						</div>
					</div>
					<!-- 聊天icon -->
					<div class="chart" @click="talk_status = ! talk_status">
						<img src="../../assets/images/chart.png" alt="">
					</div>
					<!-- 聊天弹窗 -->
					<div class="chart_mark" v-if="talk_status">
						<div class="chart_container">
							<div class="chart_left">
								<div class="chart_left_head">
									<div class="search">
										<input placeholder="Search Order ID" />
										<button class="btn">
											<img src="@/assets/images/search.png"/>
										</button>
									</div>
									<!-- 左侧用户 -->
									<div class="chart_user_list">
										<div class="chart_border">
											<div :class="tab_index == 1 ?'chart_av':'chart_user' "  @click="tab_index = 1">
												<div class="chart_user_left">
													<div class="user_left_img">
														<img src="../../assets/images/talk4.png" alt="">
													</div>
													<div class="user_left_text">
														<div class="talk_name">Keth Jim</div>
														<div class="talk_text">Lorem ipsum doloret...</div>
													</div>
												</div>
												<div class="chart_user_right">
													<div class="user_left_status">
														<div class="user_num" v-if="status == 1">+6</div>
													</div>
												</div>
											</div>
										</div>
										<div class="chart_border">
											<div :class="tab_index == 2 ?'chart_av':'chart_user' "  @click="tab_index = 2">
												<div class="chart_user_left">
													<div class="user_left_img">
														<img src="../../assets/images/no_msg.png" alt="">
													</div>
													<div class="user_left_text">
														<div class="talk_name">Unfollow Message</div>
														<div class="talk_text">Lorem ipsum doloret...</div>
													</div>
												</div>
												<div class="chart_user_right">
													<div class="user_left_status">
														<div class="user_num" v-if="status == 1">+6</div>
													</div>
												</div>
											</div>
										</div>
										<div class="chart_border">
											<div class="chart_user">
											<!-- <div :class="tab_index == 2 ?'chart_av':'chart_user' "  @click="tab_index = 2"> -->
												<div class="chart_user_left">
													<div class="user_left_img">
														<img src="../../assets/images/talk4.png" alt="">
													</div>
													<div class="user_left_text">
														<div class="talk_name">Keth Jim</div>
														<div class="talk_text">Lorem ipsum doloret...</div>
													</div>
												</div>
												<div class="chart_user_right">
													<div class="user_left_status">
														<div class="user_style">
															<div class="status_one">Release</div>
															<div class="status_text">13:40</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="chart_border">
											<div class="chart_user">
												<div class="chart_user_left">
													<div class="user_left_img">
														<img src="../../assets/images/talk4.png" alt="">
													</div>
													<div class="user_left_text">
														<div class="talk_name">Keth Jim</div>
														<div class="talk_text">Lorem ipsum doloret...</div>
													</div>
												</div>
												<div class="chart_user_right">
													<div class="user_left_status">
														<div class="user_style">
															<div class="status_two">Release</div>
															<div class="status_text">13:40</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="chart_border">
											<div class="chart_user">
												<div class="chart_user_left">
													<div class="user_left_img">
														<img src="../../assets/images/talk4.png" alt="">
													</div>
													<div class="user_left_text">
														<div class="talk_name">Keth Jim</div>
														<div class="talk_text">Lorem ipsum doloret...</div>
													</div>
												</div>
												<div class="chart_user_right">
													<div class="user_left_status">
														<div class="user_style">
															<div class="status_two">Release</div>
															<div class="status_text">13:40</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										
									</div>
								</div>
								<div class="chart_left_btom">
									<div class="left_btom">
										My Status<div class="text_chart" @click="left_status = ! left_status" >Release</div>
									</div>
									<div class="right_btom" @click="left_status = ! left_status"   >
										<img src="../../assets/images/talk3.png" alt="">
									</div>
									<!-- Release / Busy 弹窗 -->
									<div class="chart_status_container" v-if="left_status == true">
										<div :class="select_index == 1 ?'status_block select_av':'status_block' "  @click="select_index = 1">
											<img src="../../assets/images/release.png" alt="">
											<span>Release</span>
										</div>
										<div class="status_block2" @click="left_status = false "  >
											<img src="../../assets/images/busy.png" alt="">
											<span>Busy</span>
										</div>
									</div>
								</div>
							</div>
							<div class="chart_right">
								<div class="tale_head">
									<div class="tale_left_btom" v-if="tab_index == 1">
										Yang Ming<div class="text_left_chart">Release</div>
									</div>
									<div class="tale_left_btom" v-if="tab_index == 2">
										Unfollow Message
									</div>
									<div class="tale_left_btom" v-if="tab_index == 3">
										<div class="text_left_back" @click="tab_index = 2">
											<img src="../../assets/images/turn_left.png" alt="">
											<span>Back</span>
										</div>
										<span class="who_name" @click="tab_index = 2">Brooke Cagle</span><div class="text_left_chart">Release</div>
									</div>
								</div>
								<div class="tale_content" v-if="tab_index == 1">
									<div class="tale_in_block">
										<div class="tale_time">13:40</div>
										<div class="tale_in_news">
											<div class="tale_in_left">
												<img class="tale_img" src="../../assets/images/avatar.png" alt="">
												<div class="tale_txt">Lorem ipsum dolor sit amet, consectetuer</div>
											</div>
											<div class="tale_in_right">
												<div class="tale_txt">Lorem ipsum dolor sit amet, consectetuer</div>
												<img class="tale_img" src="../../assets/images/avatar.png" alt="">
											</div>
										</div>
										<div class="tale_in_news">
											<div class="tale_in_left">
												<img class="tale_img" src="../../assets/images/avatar.png" alt="">
												<div class="tale_txt">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad</div>
											</div>
											<div class="tale_in_right">
												<div class="tale_txt">consectetuer</div>
												<img class="tale_img" src="../../assets/images/avatar.png" alt="">
											</div>
										</div>
									</div>
								</div>
								<div class="tale_content2" v-if="tab_index == 2">
									<div class="tale_message_block">
										<div class="message_user" @click="tab_index = 3">
											<div class="message_user_left">
												<div class="message_left_img">
													<img src="../../assets/images/talk4.png" alt="">
												</div>
												<div class="message_left_text">
													<div class="talk_name">Keth Jim</div>
													<div class="talk_text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod...</div>
												</div>
											</div>
											<div class="message_user_right">
												<div class="message_left_status">
													<div class="message_style">
														<div class="status_two">Release</div>
														<div class="status_text">13:40</div>
													</div>
												</div>
											</div>
										</div>
										<div class="message_user" @click="tab_index = 3">
											<div class="message_user_left">
												<div class="message_left_img">
													<img src="../../assets/images/talk4.png" alt="">
												</div>
												<div class="message_left_text">
													<div class="talk_name">Keth Jim</div>
													<div class="talk_text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod...</div>
												</div>
											</div>
											<div class="message_user_right">
												<div class="message_left_status">
													<div class="message_style">
														<div class="status_one">Release</div>
														<div class="status_text">13:40</div>
													</div>
												</div>
											</div>
										</div>
										<div class="message_user" @click="tab_index = 3">
											<div class="message_user_left">
												<div class="message_left_img">
													<img src="../../assets/images/talk4.png" alt="">
												</div>
												<div class="message_left_text">
													<div class="talk_name">Keth Jim</div>
													<div class="talk_text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod...</div>
												</div>
											</div>
											<div class="message_user_right">
												<div class="message_left_status">
													<div class="message_style">
														<div class="status_two">Release</div>
														<div class="status_text">13:40</div>
													</div>
												</div>
											</div>
										</div>
										<div class="message_user" @click="tab_index = 3">
											<div class="message_user_left">
												<div class="message_left_img">
													<img src="../../assets/images/talk4.png" alt="">
												</div>
												<div class="message_left_text">
													<div class="talk_name">Keth Jim</div>
													<div class="talk_text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod...</div>
												</div>
											</div>
											<div class="message_user_right">
												<div class="message_left_status">
													<div class="message_style">
														<div class="status_two">Release</div>
														<div class="status_text">13:40</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="tale_content" v-if="tab_index == 3">
									<div class="tale_in_block">
										<div class="tale_time">13:40</div>
										<div class="tale_in_news">
											<div class="tale_in_left">
												<img class="tale_img" src="../../assets/images/avatar.png" alt="">
												<div class="tale_txt">Lorem ipsum dolor sit amet, consectetuer</div>
											</div>
											
										</div>
									</div>
								</div>
								<div class="tale_bottom" v-if="tab_index == 1 || tab_index == 3">
									<div class="left_btom">
										<input type="text" v-model="user_content">
									</div>
									<div class="right_btom">
										<!-- <div class="right_btom" @click="talk_status = false"> -->
										<img src="../../assets/images/talk.png"  v-if="user_content == ''"  @click="talk_status = false">
										<img src="../../assets/images/talk_fj.png"  v-else  @click="talk_status = false">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {getAdvertisement,} from '@/api/home';
import {tournamentList} from '@/api/tournament.js'
import {listCoupon,couponReceive,} from '@/api/coupon';
export default {
	name: 'home',
	data() {
		return {
			// swiper_list: [require('@/assets/images/bac6.png'), require('@/assets/images/bac6.png'), require('@/assets/images/bac6.png')],
			status:1,
			talk_status:false,
			left_status:false,
			select_index:1,
			tab_index:1,
			user_content:'',
			advertisementList: [],
			coupon_list: [],
			list:[],
			listQuery: {
				tournamentName: "",
				state:2, //赛事状态 1 待审核  2 报名中 3进行中 4已结束 5 未通过6 草稿
				hot:true,
				gameId: "",
				page: 1,
				size: 10
			},
			total_count: 0,
			use_status:false, //优惠券使用弹窗
			coupon_info:{}, //优惠券信息
		};
	},
	mounted() {
		if(sessionStorage.getItem("token") != '' && sessionStorage.getItem("token") != null && sessionStorage.getItem("token") != undefined){
			// 广告列表
			this.advertisement()
			// 优惠券列表
			this.getCouponList()
			// 赛事列表
			this.getList();
		}				
	},
	methods: {
		see_input(){
			console.log(this.user_content)
		},
		// 赛事列表
		getList() {
			let that = this;
			that.list = []
			tournamentList(this.listQuery).then(res => {
				const {
					list,
					total
				} = res.data
				for ( let i in list ) {
					list[i]['num'] = that.GetPercent(list[i]['joinned']||0,list[i]['participantsSize']||0)
					// 处理 列表 format 显示
					for(let j in  list[i].stages){
						list[i]['stages_format'] = list[i].stages[0].format
						if(list[i].stages[j].format == 3){
							list[i]['groupSize'] = list[i].stages[j].groupSize
							list[i]['promotionSize'] = list[i].stages[j].promotionSize
						}
					}
				}
				that.list = list;
			})
			
		},
		// 计算百分比
		GetPercent(num, total) {
			num = parseFloat(num);
			total = parseFloat(total);
			if ( total < num ) {
				return total = 100
			}
			return total <= 0 ? "0%" : (Math.round(num / total * 100));
		},
		jump_reg_info(id,status){
			if(status >= 3){
				this.$router.push({path:'/tournament/bracketm',query:{id}})
			}else{
				this.$router.push({path:'/tournament/regis_Information',query:{id}})
			}	
		},
		// 广告列表接口
		advertisement() {
			let parms = {};
			getAdvertisement(parms).then(res => {
				this.advertisementList = res.data
			})
		},
		// 优惠券列表接口
		getCouponList() {
			let parms = {
				type:2,
				title:'',
				order:{create_time:"desc"}
			};
			listCoupon(parms).then(res => {
				var coupons = res.data.list
				for (let i = 0; i < coupons.length; i++) {
					coupons[i].spen_status = false
				}
				this.coupon_list = coupons
			})
		},
		// 领取优惠券
		get_receive(couponId,cinfo){
			let that = this;
			let params = {
				couponId
			}
			couponReceive(params).then(res => {
				that.$message({
					message: res.message,
					type: 'success'
				})
				that.coupon_info = cinfo
				that.use_status = true
			})
		},
		// 跳转
		jump_cat(){
			this.$router.push({path: '/redemption/my_cart'})
		},
		// 广告跳转
		jump(path) {
			window.open(path)
		},
	}
};
</script>
<style scoped>
/deep/.el-carousel__button {
	display: block;
	opacity: 0.48;
	width: 10px;
	height: 10px;
	background: #6D6D6D;
	border-radius: 50%;
	border: none;
	outline: 0;
	padding: 0;
	margin: 0;
	cursor: pointer;
	-webkit-transition: 0.3s;
	transition: 0.3s;
	border-radius: 50%;
}
/deep/.el-carousel__indicator.is-active button {
	display: block;
	opacity: 0.48;
	width: 10px;
	height: 10px;
	background: #d3aa53;
	border-radius: 50%;
	border: none;
	outline: 0;
	padding: 0;
	margin: 0;
	cursor: pointer;
	-webkit-transition: 0.3s;
	transition: 0.3s;
	border-radius: 50%;
}
</style>
<style lang="less" scoped>
	body::-webkit-scrollbar {
	    display: none;
	}
.container {
	width: calc(100% - 140px);
	display: flex;
	justify-content: space-between; /* 横向中间自动空间 */
	flex-wrap: wrap; /* 换行 */
	padding-bottom: 60px;
	margin-left: 69px;
	// 优惠券使用弹窗
	.mark_check{
		position: absolute;
		right: 80px;
		top: 10px;
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
	.mark_check_container_add{ //添加同级盒子，可以使其在优惠券外部也能进行上下滑动
		position: absolute;
		left: 10px;
		top: 0px;
		z-index: 998;
		width: 100%;
		height: 1290px;
		border-radius: 27px;
		overflow: hidden;
	}
	.mark_check_container{
		position: absolute;
		left: 357px;
		top: 150px;
		z-index: 999;
		width: 753px;
		padding: 48px 20px 48px 28px;
		background: #0E0F11;
		border-radius: 27px;
		overflow: hidden;
		display: flex;
		flex-flow: column;
		align-items: center;
		.mark_my_content{
			width: 100%;
			margin-bottom: 55px;
			.popun_img{
				margin-bottom: 20px;
				img{
					width: 90px;
				}
			}
			.popun_tit{
				font-size: 19px;
				color: #7c7c7c;
				font-family:'Roboto-Regular';
				margin-bottom: 20px;
				span{
					color: #fff;
					font-family:'Roboto-Bold';
				}
			}
			.popun_num{
				color: #DBA83F;
				font-size: 24px;
				font-family:'Roboto-Bold';
			}
		}
		.mark_my_foot{
			.user_button{
				width: 170px;
				height: 50px;
				color: #0E0F11;
				font-size: 18px;
				font-family:'Roboto-Regular';
				display: flex;
				background: #DBA83F;
				border-radius: 17px;
				align-items: center;
				cursor: pointer;
				justify-content: center;
			}
		}
	}
	// end
	.container_bacolor {
		width: 100%;
		.content_right {
			// 轮播
			.home_carousel {
				width: 100%;
				// height:345px;
				height: 412px;
				border-radius: 15px;
				overflow: hidden;
				margin-top: 28px;
				background-color: #0e0f11;
				position: relative;
				/deep/ .el-carousel__container{
					height: 412px !important;
				}
				.carousel_img {
					width: 100%;
					// height: 100%;
					height: 412px;
					object-fit:cover;
				}
				.carousel-con {
					width: 450px;
					position: absolute;
					left: 240px;
					bottom: 100px;
					color: #f1f1ff;
					font-family:'Roboto-Regular';
				}
				.carousel-con-tit {
					font-size: 23px;
				}
				.carousel-con-botton {
					display: flex;
					align-items: center;
					padding-top: 30px;
				}
				.carousel-botton-left {
					width: 130px;
					height: 45px;
					line-height: 45px;
					text-align: center;
					background-color: #D3AA53;
					color: #232323;
					border: 1px solid #D3AA53;
					border-radius: 20px;
					margin-right: 20px;
					font-family:'Roboto-Regular';
					cursor: pointer;
					font-size: 18px;
				}
				.carousel-botton-right {
					width: 130px;
					height: 45px;
					line-height: 45px;
					text-align: center;
					color: #232323;
					border: 1px solid #f1f1f1;
					font-family:'Roboto-Regular';
					border-radius: 20px;
					color: #fff;
					cursor: pointer;
					font-size: 18px;
				}
			}
			// 赛事
			.match_container {
				margin-top: 37px;
				.match_title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 37px;
					.match_tit_left {
						color: #fff;
						font-size: 24px;
						font-family:'Roboto-Bold';
					}
					.match_tit_right {
						color: #d3aa53;
						font-size: 18px;
						font-family:'Roboto-Regular';
					}
				}
				::-webkit-scrollbar{
					width: 7px;
					height: 7px;
					background-color: #0E0F11;
				}
				/*定义滚动条轨道 内阴影+圆角*/
				::-webkit-scrollbar-track {
					box-shadow: inset 0 0 6px rgba(29,32,35, 0.3);
					-webkit-box-shadow: inset 0 0 6px rgba(29,32,35, 0.3);
					border-radius: 10px;
					background-color: #1D2023;
				}

				/*定义滑块 内阴影+圆角*/
				::-webkit-scrollbar-thumb{
					border-radius: 10px;
					box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
					-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
					background-color: #0E0F11;
				}
				.match_content {
					display: flex;
					flex-wrap: wrap;
					// 优惠券
					.match_content_coupon {
						display: flex;
						.coupon_list {
							width: 400px;
							background: #0E0F11;
							border-radius: 16px;
							margin-right: 42px;
							display: flex;
							align-items: center;
							padding: 30px 20px;
							.coupon_img {
								width: 50px;
								height:50px;
								display:flex;
								justify-content:center;
								align-items:center;
								background:#1D2023;
								border-radius: 14px;
								img {
									width: 30px;
									height:auto;
								}
							}
							.coupon_list_warp {
								margin: 0 20px;
								flex: 1;
								.coupon_tit {
									color: #fff;
									font-family:'Roboto-Bold';
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
									overflow: hidden;
									font-size: 16px;
									margin-bottom: 10px;
								}
								.coupon_exp {
									color: #7c7c7c;
									font-family:'Roboto-Regular';
								}
							}
							.coupon_right {
								.coupon_button {
									width: 120px;
									background: #D3AA53;
									color: #232323;
									border-radius: 20px;
									text-align: center;
									line-height: 45px;
									font-family:'Roboto-Bold';
									cursor: pointer;
								}
								.coupon_rule {
									text-align: center;
									color: #D3AA53;
									margin-top: 10px;
									font-family:'Roboto-Regular';
								}
							}
						}
					}
					.match_card {
						width: 751px;
						height: 371px;
						background: #1c2023 ;
						// border: 2px solid #232323;
						border-radius: 16px;
						display: flex;
						margin-right: 42px;
						margin-bottom: 42px;
						overflow: hidden;
						box-shadow: 0 0.0625px 16px 0 rgb(0 0 0 / 10%);
						cursor: pointer;
						.match_left {
							width: 369px;
							height: 371px;
							img {
								width: 369px;
								height: 371px;
								object-fit: cover;
							}
						}
						.match_right {
							flex: 1;
							// padding: 41px 30px 0px 30px;
							padding: 20px 30px 20px  30px;
							.match_tit {
								font-size: 21px;
								color: #fff;
								line-height: 27px;
								font-family:'Roboto-Bold';
							}
							.match_hour_text{
								color: #fff;
								margin-bottom: 15px;
								font-family:'Roboto-Regular';
								font-size: 18px;
							}
							.match_time {
								color: #d3aa53;
								font-size: 18px;
								font-family:'Roboto-Regular';
								margin: 10px 0;
							}
							.match_flex {
								display: flex;
								align-items: center;
								justify-content: space-between;
								.match_flex_left {
									display: flex;
									align-items: center;
									.flex_left_img {
										width: 45px;
										height: 45px;
										background: #0e0f11;
										border-radius: 12px;
										display: flex;
										align-items: center;
										justify-content: center;
										margin-right: 12px;
										img {
											width: 45px;
											height: 45px;
										}
									}
								}
								.match_flex_right {
									.flex_right_img {
										width: 55px;
										height: 57px;
										.game_img {
											width: 55px;
											height: 57px;
											.default_img{
												width: 55px;
												height: 57px;
											}
										}
									}
								}
							}
							.match_flex_text {
								display: flex;
								align-items: center;
								line-height: 35px;
								justify-content: space-between;
								.text_left {
									color: #bf9d62;
									font-size: 18px;
									font-family:'Roboto-Regular';
								}
								.text_right {
									color: #ffffff;
									font-size: 18px;
									font-family:'Roboto-Regular';
								}
							}
							.match_flex_text2 {
								display: flex;
								align-items: center;
								line-height: 35px;
								margin-top: 10px;
								justify-content: space-between;
								.text_left {
									color: #bf9d62;
									font-size: 18px;
									font-family:'Roboto-Regular';
								}
								.text_right {
									color: #ffffff;
									font-size: 18px;
									font-family:'Roboto-Bold';
								}
							}
						}
					}
					.match_card:nth-child(2n) {
						margin-right: 0;
					}
				}
			}
			.chart{
				position: fixed;
				bottom: -30px;
				right: -60px;
				width: 350px;
				height: 350px;
				cursor: pointer;
				img{
					width: 350px;
					height: 350px;
				}
			}
			//聊天弹窗
				.chart_mark{
				width: 90%;
				height: 980px;
				background: #0E0F11;
				border: 2px solid #2D2D2D;
				border-radius: 46px;
				position:absolute;
				top: -20px;
				left: 0px;
				z-index: 102;
				.chart_container{
					margin: 29px 21px;
					display: flex;
					justify-content: space-between;
					.chart_left{
						width: 34%;
						.chart_left_head{
							min-height: 748px;
							// overflow-y: scroll;
							// overflow-x: hidden;
							background: #000000;
							border-radius: 34px;
							padding-top: 37px;
							.search{
								margin: 0px 70px 20px 46px; 
								display: flex;
								justify-content: space-between;
								background: #0E0F11;
								border-radius: 23px;
								input{
									width: 70%;
									height: 60px;
									background: #0E0F11 ;
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
									background: #D3AA53 ;
									border: none;
									border-radius: 23px;
									opacity: 1;
									cursor: pointer;
									img{
										width: 22px;
										height: 22px;
									}
								}
							}//search
							.chart_user_list{
								.chart_border{
									border-bottom: 2px solid #2d2d2d;
									margin: 0 10px;
									// 未选中
									.chart_user{
										margin: 23px 0px 23px 0px;
										display: flex;
										cursor: pointer;
										padding: 15px 17px 15px 17px;
										justify-content: space-between;
										position: relative;

										.chart_user_left{
											display: flex;
											align-items: center;
											.user_left_img{
												width: 74px;
												height: 74px;
												border-radius: 15px;
												overflow: hidden;
												margin-right: 16px;
												img{
													width: 74px;
													height: 74px;
													object-fit: fill;
												}
											}
											.user_left_text{
												.talk_name{
													color: #fff;
													font-size: 20px;
													font-family:'Roboto-Medium';
													margin-bottom: 6px;
												}
												.talk_text{
													width: 195px;
													color: #727272;
													font-size: 18px;
													overflow: hidden;
													text-overflow:ellipsis;
													white-space: nowrap;
												}
											}
											
										}
										.chart_user_right{
											display: flex;
											align-items: center;
											.user_left_status{
												.user_num{
													width: 36px;
													height: 36px;
													border-radius: 50%;
													display: flex;
													align-items: center;
													justify-content: center;
													color: #FFFFFF;
													font-size: 18px;
													font-family:'Roboto-Regular';
													background: #FF0000 ;
												}
												.user_style{
													text-align: right;
													.status_one{
														width: 88px;
														height: 28px;
														line-height: 28px;
														text-align: center;
														color: #5BF700;
														background: rgba(91, 247, 0, 0.16);
														border-radius: 9px;
														margin-bottom: 6px;
														font-family:'Roboto-Regular';
													}
													.status_two{
														width: 88px;
														height: 28px;
														line-height: 28px;
														text-align: center;
														color: #FF0000;
														background: rgba(255, 0, 0, 0.16);
														border-radius: 9px;
														margin-bottom: 6px;
														font-family:'Roboto-Regular';
													}
													.status_text{
														color: #D3AA53;
														font-size: 18px;
														font-family:'Roboto-Regular';
													}
												}
											}
										}
									}
									
									// 选中
									.chart_av{
										margin: 23px 0px 23px 0px;
										display: flex;
										cursor: pointer;
										background-color: #0e0f11;
										padding: 15px 17px 15px 17px;
										justify-content: space-between;
										border-radius: 24px;
										position: relative;
										.chart_user_left{
											display: flex;
											align-items: center;
											.user_left_img{
												width: 74px;
												height: 74px;
												border-radius: 15px;
												overflow: hidden;
												margin-right: 16px;
												img{
													width: 74px;
													height: 74px;
													object-fit: fill;
												}
											}
											.user_left_text{
												.talk_name{
													color: #fff;
													font-size: 20px;
													font-family:'Roboto-Medium';
													margin-bottom: 6px;
												}
												.talk_text{
													width: 195px;
													color: #727272;
													font-size: 18px;
													overflow: hidden;
													text-overflow:ellipsis;
													white-space: nowrap;
													font-family:'Roboto-Regular';
												}
											}
											
										}
										.chart_user_right{
											display: flex;
											align-items: center;
											.user_left_status{
												.user_num{
													width: 36px;
													height: 36px;
													border-radius: 50%;
													display: flex;
													align-items: center;
													justify-content: center;
													color: #FFFFFF;
													font-size: 18px;
													font-family:'Roboto-Regular';
													background: #FF0000 ;
												}
												.user_style{
													text-align: right;
													.status_one{
														width: 88px;
														height: 28px;
														line-height: 28px;
														text-align: center;
														color: #5BF700;
														font-family:'Roboto-Regular';
														background: rgba(91, 247, 0, 0.16);
														border-radius: 9px;
														margin-bottom: 6px;
													}
													.status_two{
														width: 88px;
														height: 28px;
														line-height: 28px;
														text-align: center;
														color: #FF0000;
														font-family:'Roboto-Regular';
														background: rgba(255, 0, 0, 0.16);
														border-radius: 9px;
														margin-bottom: 6px;
													}
													.status_text{
														color: #D3AA53;
														font-size: 18px;
														font-family:'Roboto-Regular';
													}
												}
											}
										}
									}
									
								}
								.chart_border:last-child{
									border-bottom: none;
								}
								
							}
						}
						.chart_left_btom{
							// width: 367px;
							height: 56px;
							padding: 0 38px 0 20px;
							background: #000000 0% 0% no-repeat padding-box;
							border-radius: 15px;
							display: flex;
							align-items: center;
							margin-top: 14px;
							justify-content: space-between;
							position: relative;
							.left_btom{
								display: flex;
								color: #727272;
								font-size: 18px;
								.text_chart{
									color: #5BF700;
									font-size: 20px;
									font-weight: bold;
									margin-left: 23px;
								}
							}
							.right_btom{
								img{
									width: 31px;
									height: 31px;
								}
							}
							.chart_status_container{
								// width: 473px;
								height:170px;
								padding: 17px 17px;
								background: #000000;
								border-radius: 14px;
								position: absolute;
								right: -490px;
								top: -40px;
								.status_block{
									width: 410px;
									height: 74px;
									padding-left: 28px;
									display: flex;
									cursor: pointer;
									align-items: center;
									background: #000000;
									border-radius: 13px;
									img{
										width: 36px;
										height: 36px;
										
									}
									span{
										font-size: 22px;
										color: #5BF700;
										margin-left: 55px;
									}
								}
								.status_block2{
									width: 410px;
									height: 74px;
									cursor: pointer;
									padding-left: 28px;
									background: #000000;
									border-radius: 13px;
									display: flex;
									align-items: center;
									img{
										width: 31px;
										height: 31px;
									}
									span{
										font-size: 22px;
										color: #FF0000;
										margin-left: 55px;
									}
								}
								.select_av{
									width: 410px;
									height: 74px;
									padding-left: 28px;
									background: #1D2023;
									border-radius: 13px;
								}
							}
						}
					}
					
					.chart_right{
						width: 66%;
						height: 980px;
						.tale_head{
							// padding: 0 38px 0 20px;
							height: 73px;
							display: flex;
							align-items: center;
							margin: 0px 18px 0 18px;
							justify-content: space-between;
							border-bottom: 2px solid #2D2D2D;
							.tale_left_btom{
								display: flex;
								align-items: center;
								color: #fff;
								font-family:'Roboto-Medium';
								font-size: 24px;
								.text_left_back{
									width: 146px;
									height: 58px;
									background: #000000;
									border-radius: 23px;
									display: flex;
									align-items: center;
									justify-content: center;
									margin-right: 33px;
									cursor: pointer;
									img{
										width: 31px;
										// height: 17px;
										margin-right: 13px;
									}
									span{
										font-size: 20px;
										color: #D3AA53;
									}
								}
								.who_name{
									cursor: pointer;
								}
								.text_left_chart{
									width: 102px;
									height: 33px;
									line-height: 33px;
									text-align: center;
									color: #5BF700;
									background: rgba(91, 247, 0, 0.16);
									border-radius: 9px;
									margin-left: 20px;
								}
								.text_left_chart{
									width: 102px;
									height: 33px;
									line-height: 33px;
									text-align: center;
									color: #FF0000;
									background: rgba(255, 0, 0, 0.16);
									border-radius: 9px;
									margin-left: 20px;
								}
							}
							.tale_right_btom{
								img{
									width: 32px;
									height: 28px;
								}
							}
						}
						.tale_content{
							height: 670px;
							padding-left: 21px;
							
							.tale_in_block{
								.tale_time{
									color: #D3AA53;
									font-size: 18px;
									text-align: center;
									margin: 20px 0;
									font-family:'Roboto-Regular';
								}
								.tale_in_news{
									margin: 10px 0;
									.tale_in_left{
										display: flex;
										align-items: center;
										justify-content: flex-start;
										.tale_img{
											width: 54px;
											height: 54px;
											border-radius: 15px;
											margin-right: 23px;
										}
										.tale_txt{
											max-width: 383px;
											line-height: 52px;
											color: #0E0F11;
											font-size: 18px;
											padding:  0 21px;
											font-family:'Roboto-Regular';
											// transform: matrix(-1, 0, 0, -1, 0, 0);
											background: #FFFFFF 0% 0% no-repeat padding-box;
											border-radius: 0px 23px 22px 22px;
											// border-radius: 22px 23px 0px 22px;
										}
									}
									.tale_in_right{
										display: flex;
										align-items: center;
										justify-content: flex-end;
										.tale_img{
											width: 54px;
											height: 54px;
											border-radius: 15px;
											
										}
										.tale_txt{
											max-width: 383px;
											line-height: 52px;
											color: #0E0F11;
											font-size: 18px;
											padding:  0 21px;
											margin-right: 23px;
											font-family:'Roboto-Regular';
											// transform: matrix(-1, 0, 0, -1, 0, 0);
											background: #6CD34A 0% 0% no-repeat padding-box;
											border-radius: 22px 0px 23px 22px;
										}
									}
								}
							}							
						}
						// 消息
						.tale_content2{
							height: 735px;
							// padding: 0 20px;
							.tale_message_block{
								// margin-top:25px ;
								.message_user{
									margin: 0px 20px 0px 20px;
									display: flex;
									cursor: pointer;
									padding: 25px 0px 25px 0px;
									justify-content: space-between;
									border-bottom: 1px solid #2d2d2d;
									position: relative;
									.message_user_left{
										display: flex;
										align-items: center;
										.message_left_img{
											width: 74px;
											height: 74px;
											border-radius: 15px;
											overflow: hidden;
											margin-right: 16px;
											img{
												width: 74px;
												height: 74px;
												object-fit: fill;
											}
										}
										.message_left_text{
											.talk_name{
												color: #fff;
												font-family:'Roboto-Medium';
												font-size: 20px;
												margin-bottom: 6px;
											}
											.talk_text{
												width: 595px;
												color: #727272;
												font-family:'Roboto-Regular';
												font-size: 18px;
												overflow: hidden;
												text-overflow:ellipsis;
												white-space: nowrap;
											}
										}
										
									}
									.message_user_right{
										display: flex;
										align-items: center;
										.message_left_status{
											.message_num{
												width: 36px;
												height: 36px;
												border-radius: 50%;
												display: flex;
												align-items: center;
												justify-content: center;
												color: #FFFFFF;
												font-size: 18px;
												background: #FF0000 ;
												font-family:'Roboto-Regular';
											}
											.message_style{
												text-align: right;
												.status_one{
													width: 88px;
													height: 28px;
													line-height: 28px;
													text-align: center;
													color: #5BF700;
													font-family:'Roboto-Regular';
													background: rgba(91, 247, 0, 0.16);
													border-radius: 9px;
													margin-bottom: 6px;
												}
												.status_two{
													width: 88px;
													height: 28px;
													line-height: 28px;
													text-align: center;
													color: #FF0000;
													background: rgba(255, 0, 0, 0.16);
													border-radius: 9px;
													font-family:'Roboto-Regular';
													margin-bottom: 6px;
												}
												.status_text{
													font-family:'Roboto-Regular';
													color: #D3AA53;
													font-size: 18px;
												}
											}
										}
									}
								}
							}
							
						}
						.tale_bottom{
							padding: 0 20px 0 20px;
							// width: 932px;
							height: 73px;
							margin-top: 14px;
							display: flex;
							align-items: center;
							.left_btom{
								width: 96%;
								height: 73px;
								display: flex;
								align-items: center;
								background: #000000 0% 0% no-repeat padding-box;
								border-radius: 31px;
								overflow: hidden;
								color: #fff;
								input{
									width: 100%;
									height: 68px;
									outline: none;
									border: 0px;
									color: #fff;
									padding-left: 20px;
									background-color: #000000;
								}
							}
							.right_btom{
								margin-left: 10px;
								img{
									width: 31px;
									height: 31px;
								}
							}
						}
					}
				}
				
			}
		} //content_right
	}
} 
</style>
