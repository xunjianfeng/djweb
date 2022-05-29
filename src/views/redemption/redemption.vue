<template>
	<div class="index">
		<div class="container">
			<!-- 支付弹窗 -->
			<div class="mark_check" v-if="check_status == true" @click.stop="open_shop(2)">
				<img src="@/assets/images/cancel.png" >
			</div>
			<div class="mark_bac" v-if="check_status == true"></div>
			<div class="mark_bac1" v-if="check_status == true"></div>	<!-- 设置同级盒子 -->
			<div class="mark_check_container" v-if="check_status == true">
				<div class="mark_my_content ">
					<div class="mark_text_one">Confirm Purchase</div>
					<div class="mark_product_container">
						<div class="mark_product">
							<div class="product_two" v-for="(stem,sdex) in settle_list" :key='sdex'>
								<div class="product_img">
									<img :src="HOST + stem.picture[0].url" alt="">
								</div>
								<div class="product_product">
									<div class="product_title">{{stem.commodityName}}</div>
									<div class="product_subtitle">{{stem.species}}</div>
								</div>
								<div class="product_right">
									X{{stem.add_num}}
								</div>
							</div>
						</div>
					</div>
					<!-- 优惠券 -->
					<div class="check_code">
						<div class="code_tit">Apply Code</div>
						<div class="apply_search">
							<div class="apply_code">
								<input type="text" v-model="coupon_code" placeholder="Key in your code" disabled > 
							</div>
							<div class="apply_apply" @click="aply_coupon">Apply</div>
						</div>
					</div>
					<!-- 结算金额、优惠金额 -->
					<div class="check_table">
						<div class="check_td">
							<div class="td_left">
								<div class="td_text">Total Pay</div>
							</div>
							<div class="td_right">
								<div class="td_text2">{{pass.totalAmount}}{{settle_list[0].payMethod}}</div>
							</div>
						</div>
						<div class="check_td">
							<div class="td_left">
								<div class="td_text">Code</div>
							</div>
							<div class="td_right">
								<div class="td_text3">- {{couponAmount||0}} {{settle_list[0].payMethod}}</div>
							</div>
						</div>
						<div class="check_td">
							<div class="td_left">
								<div class="td_text2">Net</div>
							</div>
							<div class="td_right">
								<div class="td_text4">
									<img src="../../assets/images/dollar.png" alt="">
									<div class="price_text">
										<div class="price_money">{{pay_money}}</div>{{settle_list[0].payMethod}}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mark_my_foot">
					<div class="mark_foot_button" @click="get_buy">Check Out</div>
				</div>
			</div>
			<!-- end -->
			<!-- 选择优惠券弹窗 -->
			<div class="game_info" v-if="info_status == true">
				<div class="mark_check" @click="game_info_cloose">
					<img src="@/assets/images/cancel.png" >
				</div>
				<div class="mark_bac"></div>
				<div class="mark_bac1" v-if="info_status == true"></div>	<!-- 设置同级盒子 -->
				<div class="mark_check_container">
					<div class="mark_my_content ">
						<!-- <div class="mark_text_one">Does it cost {{detail_list.registeryFee || 0 }} {{detail_list.registeryFeeType}} to register for the competition?</div> -->
						<div class="mark_text_one">Use My Coupon</div>
						<div class="mark_product_container">
							<div class="mark_product">
								<div class="coupon_list" v-for="(ctem,cndex) in coupon_list" :key="cndex">
									<div class="coupon_img"><img src="../../assets/images/coupon.png" alt=""></div>
									<div class="coupon_list_warp">
										<el-tooltip class="item" effect="dark" :content="ctem.couponTitle" placement="bottom">
											<div class="coupon_tit">{{ctem.couponTitle}}</div>
										</el-tooltip>
										<!-- 领券起……天后过期 - This coupon will expire after -->
										<div class="coupon_exp">EXP：{{ctem.timeMode==1?ctem.startTime:'This coupon will expire after'+ctem.validityDay}}</div>
										<!-- <div class="coupon_exp">EXP：{{ctem.timeMode==1?ctem.startTime:'领券起'+ctem.validityDay+'天后过期'}}</div> -->
									</div>
									<div class="coupon_right">
										<div class="coupon_button" @click.stop="get_receive(ctem.couponCode)">To Use</div>
										<div class="coupon_rule">Rule>></div>
									</div>
								</div>
								
								<!-- 没有数据 -->
								<div class="no_data_area" v-if="coupon_list == ''">
									<div class="no_data">
										<img src="../../assets/images/no_tournament.svg" />
										<div class="no_data_text" >No Coupon Details</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
					<div class="mark_my_foot">
						<!-- <div class="confirm_btn">Confirm</div> -->
						<!-- <div class="cancel_btn"@click="info_status = false">Cancel</div> -->
					</div>
				</div>
			</div>
			<!-- end -->
			<div class="content_block">
				<!-- 筛选、充值 -->
				<div class="content_top">
					<div class="tit_name">Redemption</div>
					<div class="order_choice">
						<div class="choice_left">
							<div class="status">
								<p class="status_text">Type</p>
								<div class="options">
									<el-select placeholder="Please select" v-model="listQuery.categoryId" @change="handleFilter" style="margin-right: 20px;"
									 :popper-append-to-body="false">
										<el-option :label="item.categoryName" v-for="item in category_list" :value="item.commodityCategoryId"></el-option>
									</el-select>
								</div>
							</div>
							<div class="sort_by">
								<p class="sort_by_text">Sort by</p>
								<div class="options">
									<el-select  placeholder="Please select" v-model="listQuery.order.price"  @change="handleFilter" style="margin-right: 20px;"
									 :popper-append-to-body="false">
										<el-option label="降序" value="desc"></el-option>
										<el-option label="升序" value="asc"></el-option>
									</el-select>
								</div>
							</div>
						</div>
						<div class="search">
							<input placeholder="Enter Item Name" v-model="listQuery.commodityName"/>
							<button class="btn" @click="handleFilter">
								<img src="../../assets/images/search.png" />
							</button>
						</div>
					</div>
					<div class="card_block" @click="jump_topUp">
						<div class="card_img">
							<img src="../../assets/images/icon9.png" />
						</div>
						<div class="card_right">
							<div class="card_msg">Top-Up Coin</div>
							<div class="card_btn">
								View More
							</div>
						</div>
					</div>
				</div>
				<!--商品列表  -->
				<div class="content_form">
					<div class="form_card">
						<div class="card_product" v-for="(item,index) in list" :key="index" >
							<div class="product_img"  @click.stop="jump_itemDetail(item.commodityId)" >
								<img v-if="item.picture != ''" :src="HOST +  item.picture[0].url" />
								<img v-else src="#" />
							</div>
							<div class="card_right" @click.stop="jump_itemDetail(item.commodityId)" >
								<div class="product_name" >{{item.commodityName}}</div>
								<div class="product_type">{{item.species}}</div>
								<div class="product_price">
									<img src="../../assets/images/dollar.png" />
									<div class="price_num"><span>{{item.specs[0].specsPrice}}</span> {{item.payMethod}}</div>
								</div>
								<div class="add_num">
									<div class="left_block">
										<div class="reduce" @click.stop="reduce(item.commodityId)">-</div>
										<div class="num">{{item.add_num}}</div>
										<div class="increase" @click.stop="increase(item.commodityId)">+</div>
									</div>
									<div class="right_block"   @click.stop="open_shop(1,index)">Redeem</div>
								</div>
							</div>
						</div>
					</div>
					<div class="content_bottom">
						<!-- 分页组件 -->
						<div class="order_pagination">
							<pagination v-show="total_count>0" :total="total_count" :page.sync="listQuery.page" :limit.sync="listQuery.size"  @pagination="handlePageChange" @page_change="PageChange" />
						</div>
						<div class="content_bottom_right">
							<div class="shop" @click="jump_myCart">
								<!-- <img src="../../assets/images/shop.png" /> -->
								<img src="../../assets/images/shop_car.png" />
								<div class="shop_num">{{cart_list.length || 0}}</div>
							</div>
							<div class="chat">
								<img src="../../assets/images/weichat.png" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {commondityList,CommodityDetail,CommodityBuy,CouponApply,CouponMy,commodityCategoryList} from '@/api/redemption.js'
	import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
	import Listing from '@/mixin/Listing';
	export default{
		name:"redemption",
		mixins: [Listing],
		components:{
			Pagination
		},
		data(){
			return{
				coupon_code:"",
				list:[],
				total_count: 1,
				listQuery: {
					categoryId:'',
					commodityName:'',
					order:{
						price:'desc'
					},
					page: 1,
					size: 10
				},
				check_status:false, //支付弹窗
				info_status:false,//选择优惠券弹窗
				pass:{
					orderCommdity:[ //订单商品
						// {
						// 	specsId:'', //商品规格ID
						// 	amount:'', //商品数量
						// }
					], 
					couponCode:'', //优惠券Code
					totalAmount:'', //总金额
				},
				settle_list:[], //用于在结算信息显示的商品信息
				settle_index:'',
				coupon_list:[],
				couponAmount:'',//优惠金额
				pay_money:'', //应支付金额
				coupon_status:false,
				cart_list:"", //购物车的商品数量
				listQuery2:{
					order: {receive_time: 'desc'},
				},
				category_list:[]
			}
		},
		mounted() {
			this.getList()
			this.cart_list = JSON.parse(sessionStorage.getItem("cart_list"))||[]	//获取购物车商品列表的数据
			setTimeout(()=>{
				this.listQuery.page = this.PageNumber.page_number;
				this.getList()
			},200)	//当组件跳转时获取全局变量页数进行跳转
			this.getCategory()
		},
		methods:{
			PageChange(value){
							this.PageNumber.page_number = value.page
			},
			getList() {
				let that = this;
				commondityList(that.listQuery).then(function(res){
					let { list, total} = res.data
					for (let i = 0; i < list.length; i++) {
						list[i].add_num = 1
					}
					that.list = list
					that.total_count = total
				})
			},
			getCategory(){
				commodityCategoryList().then(res => {
					this.category_list = res.data.list
					
				})
			},
			// 打开结算信息Popup  type 1 打开  2 关闭
			open_shop(type,index){
				let that = this;
				that.settle_index = index  //用于弹窗显示哪个商品
				if(type == 1){
					if(that.list[index].specs[0].specsStock  == '' || that.list[index].specs[0].specsStock == 0 ){
						this.$message({
						  message: 'Please choose other product as this is sold out.',//当前规格库存已空，请选择其它商品
						  type: 'warning'
						});
						return
					}else{
						that.pass.orderCommdity.push({
							specsId:that.list[index].specs[0].specsId,
							amount:that.list[index].add_num,
						})
						that.settle_list.push(that.list[index])
						that.pass.totalAmount = that.list[index].specs[0].specsPrice *  that.list[index].add_num  
						that.pay_money = that.pass.totalAmount
						that.coupon_code = ""
						that.check_status =  true
					}
				}else{
					that.pass = {
						orderCommdity:[],//订单商品 
						couponUserId:'', 
						totalAmount:'',
					}
					that.settle_list = []
					that.check_status =  false
					that.couponAmount = 0	//关闭重置优惠券金额
				}
			},
			//关闭优惠券弹窗时清空购买弹窗的数据
			game_info_cloose(){
				this.pass.orderCommdity.splice(0,1) //关闭时清空商品id和数量
				this.settle_list = []
				this.info_status = false
			},
			// 购买 CommodityBuy
			get_buy() {
				let that = this;
				CommodityBuy(that.pass).then(res => {
					if(res.code == 200){
						this.$message({
						  message: res.message,
						  type: 'success'
						});
					that.couponAmount = 0	//关闭重置优惠券金额
					}
					that.pass = {
						orderCommdity:[],//订单商品 
						couponUserId:'', 
						totalAmount:'',
					}
					that.settle_list = []
					that.check_status = false
					that.getList();
					this.$emit("topRefresh")	//向父组件发送一个事件
				})
			},
			// 我的优惠券
			get_myCoupon() {
				let that = this;
				CouponMy(that.listQuery2).then(res => {
					that.coupon_list = res.data
					if(that.coupon_list != '' ||  that.coupon_list != null){
						that.coupon_status = true
					}
					for(let i = 0; i < res.data.length;i++){
						res.data[i].validityDay = ''
					}
					that.coupon_list = res.data
					// console.log("执行")
					// console.log(that.coupon_list)
					if(that.coupon_list != '' ||  that.coupon_list != null){
						that.coupon_status = true
					}
					for(let v = 0; v < that.coupon_list.length;v++){
						//过期的日期
						var endDate = new Date(that.coupon_list[v].validityTime);
						//领取的日期
						var nowDate = new Date(that.coupon_list[v].receiveTime);
						//相差的总秒数
						var totalSeconds = parseInt((endDate - nowDate) / 1000);
						//天数
						var days = Math.floor(totalSeconds / (60 * 60 * 24));
						that.coupon_list[v].validityDay = days
					}
				})
			},
			// 点击选择优惠券
			select_coupon(couponCode){
				for(let c = 0; c <  this.coupon_list.length;c++){
					if(this.coupon_list[c].couponCode == couponCode){
						// console.log(couponId)
					}
				}
			},
			// 搜索优惠券
			aply_coupon(){
				this.get_myCoupon();
				this.check_status = false
				this.info_status = true
			},
			// 使用优惠券
			get_receive(couponCode){
				let  that = this;
				let ordersCommdity  = []
				for(let c = 0; c <  that.coupon_list.length;c++){
					if(that.coupon_list[c].couponCode == couponCode){
						that.coupon_name =  that.coupon_list[c].couponTitle
						that.coupon_code =  that.coupon_list[c].couponCode
					}
				}
				for (let i = 0; i < that.settle_list.length; i++) {
					ordersCommdity.push({
						commodityId:that.settle_list[i].commodityId,
						amount:that.settle_list[i].num
					})
				}
				let  params = {
					couponCode,
				    orderCommdity:ordersCommdity,
					totalAmount:that.pass.totalAmount
					// totalAmount:that.foot_totalAmount
				}
				CouponApply(params).then(res => {
					that.couponAmount = res.data.couponAmount   
					that.pass.couponCode = that.coupon_code  
					// that.pass.couponCode = that.listQuery2.code
					that.pay_money = that.pass.totalAmount - that.couponAmount
					// that.coupon_status = false
					that.info_status = false
					that.check_status = true
				})
			},
			handleFilter(){
				this.listQuery.page = 1
				this.getList()
			},
			// 减
			reduce(commodityId){
				for (let i = 0; i < this.list.length; i++) {
					if(this.list[i].commodityId == commodityId){
						if(this.list[i].add_num > 1){
							this.list[i].add_num --
						}
					}
				}
			},
			// 加
			increase(commodityId){
				for (let i = 0; i < this.list.length; i++) {
					
					if(this.list[i].commodityId == commodityId){
						// 判断 购买数量不能大于当前规格的库存数量
						console.log(this.list[i].specs[0].specsStock)
						if(this.list[i].add_num >= this.list[i].specs[0].specsStock){
							 this.$message({
							  message: "Cannot more than stock's number.",//不能超过库存数量
							  type: 'warning'
							});
							return
						}else{
							this.list[i].add_num ++;
						}
					}
				}
			},
			jump_topUp(){
				this.$router.push({path:'/redemption/top_up'})
			},
			jump_itemDetail(commodityId){
				this.$router.push({path:'/redemption/item_detail',query:{commodityId}})
			},
			jump_myCart(){
				this.$router.push({path:'/redemption/my_cart'})
			},
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
	// 支付弹窗
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
	.mark_bac1{	//设置同级盒子使得页面可以滚动
		// width: 1800px;
		// height: 1900px;
		width: 100%;
		// height: 100%;
		height: 100vh;
		// background-color: #FFEEAA;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 89;
	}
	.mark_check_container{
		position: absolute;
		left: 357px;
		top: 0px;
		z-index: 999;
		width: 753px;
		padding: 48px 20px 31px 28px;
		background: #0E0F11;
		border-radius: 27px;
		overflow: hidden;
		display: flex;
		flex-flow: column;
		align-items: center;
		.mark_my_content{
			width: 100%;
			margin-bottom: 55px;
			.mark_text_one{
				color: #DBA83F;
				font-size: 24px;
				text-align: center;
				margin-bottom: 20px;
				font-family:'Quicksand-Bold';
			}
			// 购买商品
			.mark_product_container{
				width: 100%;
				max-height: 496px;
				overflow-y: scroll;
				margin-bottom: 28px;
				.mark_product{
					width: 98%;
					border: 1px solid #313538;
					border-radius: 22px;
					.product_two{
						height: 165px;
						margin: 0 20px;
						display: flex;
						align-items: center;
						border-bottom: 1px solid #313538;
						.product_img{
							width: 120px;
							height: 119px;
							border-radius: 13px;
							overflow: hidden;
							margin-right: 46px;
							img{
								width: 120px;
								height: 119px;
								object-fit: cover;
							}
						}
						.product_product{
							width: 60%;
							.product_title{
								color: #FFFFFF;
								font-family:'Roboto-Bold';
								font-size: 22px;
								margin-bottom: 20px;
							}
							.product_subtitle{
								color: #727272;
								font-family:'Roboto-Regular';
								font-size: 18px;
							}
						}
						.product_right{
							color: #fff;
							font-size: 22px;
							font-family:'Roboto-Regular';
						}
					}
					.product_two:last-child{
						border-bottom: none;
					}
				}
				&::-webkit-scrollbar {
					/*滚动条整体样式*/
					width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
					height: 1px;
				}
				&::-webkit-scrollbar-thumb {
				/*滚动条里面小方块*/
				border-radius: 10px;
				box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
				background   : #2B2B2B;
				}
				&::-webkit-scrollbar-track {
				/*滚动条里面轨道*/
				box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
				border-radius: 10px;
				background   : #000000;
				}
			}
			// 优惠券
			.check_code{
				margin-bottom: 26px;
				.code_tit{
					color: #727272;
					font-family:'Roboto-Regular';
					font-size: 20px;
					margin-bottom: 12px;
				}
				.apply_search{
					display: flex;
					justify-content: space-between;
					.apply_code{
						width: 546px;
						height: 59px;
						border: 2px solid #2D2D2D;
						border-radius: 19px;
						display: flex;
						align-items: center;
						position: relative;
						input{
							width: 90%;
							height: 50px;
							margin: 0 auto;
							border: none;
							color: #fff;
							font-family:'Roboto-Regular';
							font-size: 20px;
							background-color: #0E0F11;
						}
						.apply_coupon{
							width: 98%;
							border-radius: 16px;
							position: absolute;
							top: 70px;
							left: 0;
							background-color: #000;
							.match_content {
								// 优惠券
								.match_content_coupon {
									padding: 15px 15px 0px 15px;
									.coupon_list {
										background: #0E0F11;
										border-radius: 16px;
										display: flex;
										align-items: center;
										padding: 30px 20px;
										margin-bottom: 15px;
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
												font-weight: bold;
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
												font-family:'Roboto-Regular';
												border-radius: 20px;
												text-align: center;
												line-height: 45px;
												font-weight: bold;
												cursor: pointer;
											}
											.coupon_rule {
												text-align: center;
												color: #D3AA53;
												font-family:'Roboto-Regular';
												margin-top: 10px;
											}
										}
									}
								}
								.match_card {
									width: 751px;
									height: 371px;
									background: #1c2023 ;
									border: 2px solid #232323;
									border-radius: 16px;
									display: flex;
									margin-right: 42px;
									margin-bottom: 42px;
									overflow: hidden;
									box-shadow: 0 0.0625px 16px 0 rgb(0 0 0 / 10%);
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
										padding: 41px 30px 0px 30px;
										.match_tit {
											font-size: 21px;
											color: #fff;
											line-height: 27px;
											font-family:'Roboto-Bold';
											
										}
										.match_time {
											color: #d3aa53;
											font-size: 18px;
											font-weight: 500;
											margin: 10px 0;
											font-family:'Roboto-Regular';
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
													img {
														width: 55px;
														height: 57px;
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
												font-weight: 500;
												font-family:'Roboto-Regular';
											}
											.text_right {
												color: #ffffff;
												font-size: 18px;
												font-weight: bold;
											}
										}
									}
								}
								.match_card:nth-child(2n) {
									margin-right: 0;
								}
							}
						}
					}
					.apply_apply{
						width: 158px;
						height: 59px;
						line-height: 59px;
						color: #D3AA53;
						font-size: 20px;
						font-family:'Roboto-Bold';
						text-align: center;
						cursor: pointer;
						margin-left: 20px;
						border: 2px solid #D3AA53;
						border-radius: 25px;
					}
				}
			}
			// 结算信息金额
			.check_table{
				padding: 10px 19px 0px 19px;
				background: #000000;
				border-radius: 22px;
				.check_td{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 16px 40px;
					border-bottom: 1px solid #313538;						
					.td_left{
						.td_text{
							color: #727272;
							font-size: 20px;
							font-family:'Roboto-Regular';
						}
						.td_text2{
							color: #FFFFFF;
							font-size: 22px;
							font-family:'Roboto-Bold';
						}
					}
					.td_right{
						.td_text2{
							color: #FFFFFF;
							font-size: 22px;
							font-family:'Roboto-Bold';
						}
						.td_text3{
							color: #FF4810;
							font-size: 22px;
							font-family:'Roboto-Regular';
						}
						.td_text4{
							display: flex;
							img{
								width: 30px;
								height: 34px;
								margin-right: 17px;
							}
							.price_text{
								display: flex;
								align-items: center;
								color: #D3AA53;
								font-family:'Roboto-Regular';
								font-size: 22px;
								.price_money{
									font-family:'Roboto-Bold';
									margin-right: 6px;
									
								}
							}
						}
					}
				}
				.check_td:last-child{
					border-bottom: 0px;
				}
			}
		}
		.mark_my_foot{
			width: 100%;
			.mark_foot_button{
				height: 69px;
				color: #0E0F11;
				font-size: 18px;
				display: flex;
				background: #DBA83F;
				border-radius: 9px;
				font-family:'Roboto-Regular';
				align-items: center;
				cursor: pointer;
				justify-content: center;
			}
		}
	}
	// end
	//选择优惠券弹窗
	.game_info{
		// Check out 01弹窗 start
		.mark_check{
			position: absolute;
			right: 80px;
			top: 50px;
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
			// position: fixed;
			// left: 300px;
			left: 24%;
			top: 100px;
			z-index: 999;
			// width: 753px;
			width: 800px;
			padding: 40px 20px 30px 28px;
			// background: #0E0F11;
			background-color: #1D2023;
			border-radius: 27px;
			overflow: hidden;
			display: flex;
			flex-flow: column;
			align-items: center;
			.mark_my_content{
				width: 100%;
				// margin-bottom: 55px;
				margin: 0 50px 55px 45px;
				.mark_check_inset{
					position: absolute;
					right: 50px;
					top: 40px;
					img{
						width: 35px;
						height: 35px;
						cursor: pointer;
					}
					z-index: 999;
				}
				.mark_text_one{
					font-family:'Quicksand-Bold';
				}
				.mark_product_container{
					width: 100%;
					height: 516px;
					overflow-y: scroll;
					margin-bottom: 30px;
					.mark_product{
						// margin-top: 20px;
						width: 98%;
						margin: 0 auto;
						// margin-right: 10px;
						border-radius: 22px;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						border: none;
						.coupon_list {
							width: 40%;
							background: #0E0F11;
							border-radius: 16px;
							display: flex;
							align-items: center;
							padding: 30px 20px;
							margin-bottom: 30px;
							.coupon_img {
								width: 50px;
								height: 50px;
								display: flex;
								justify-content: center;
								align-items: center;
								background: #1D2023;
								border-radius: 14px;
						
								img {
									width: 30px;
									height: auto;
								}
							}
						
							.coupon_list_warp {
								margin: 0 20px;
								flex: 1;
						
								.coupon_tit {
									color: #fff;
									font-weight: bold;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
									overflow: hidden;
									font-size: 16px;
									line-height: 22px;
									margin-bottom: 10px;
									width: 100px;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
						
								.coupon_exp {
									color: #7c7c7c;
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
									font-weight: bold;
									cursor: pointer;
									font-size: 19px;
								}
						
								.coupon_rule {
									text-align: center;
									color: #D3AA53;
									font-size: 17px;
									margin-top: 10px;
								}
							}
						}
						.no_data_area {
							width: 100%;
							height: 350px;
							display: flex;
							align-items: center;
							justify-content: center;
							.no_data {
								text-align: center;
								img {}
								.no_data_text {
									color: #565656;
									font-size: 20px;
									margin-top: 20px;
								}
							}
						}
											
					}
					&::-webkit-scrollbar {
						/*滚动条整体样式*/
						width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
						height: 1px;
					}
					&::-webkit-scrollbar-thumb {
					/*滚动条里面小方块*/
						border-radius: 10px;
						box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
						background   : #2B2B2B;
					}
					&::-webkit-scrollbar-track {
					/*滚动条里面轨道*/
						box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
						border-radius: 10px;
						background   : #000000;
					}
				}
				
			}
			.mark_my_foot{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.confirm_btn{
					cursor: pointer;
					background-color: #D3AA53;
					color: #000;
					border-radius: 25px;
					width: 100px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					font-size: 16px;
					margin-right: 30px;
					font-family:'Roboto-Regular';
				}
				.cancel_btn{
					cursor: pointer;
					// background-color: #D3AA53;
					border: 1px solid #666666;
					border-radius: 25px;
					width: 100px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					font-size: 16px;
					color: #fff;
					font-family:'Roboto-Regular';
				}
			}
		}
	}
	//选择优惠券弹窗end
	.content_block{
		width: 95%;
		margin-left: 50px;
		.content_top{
			border-bottom: 2px solid #2D2D2D;
			padding-bottom: 20px;
			.tit_name{
				color: #FFFFFF;
				font-family:'Quicksand-Bold';
				font-size: 22px;
				margin: 45px 0 24px 0;
			}
			.order_choice{
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				.choice_left {
					display: flex;
				
					div {
						margin-right: 20px;
				
						.options {
							position: relative;
							.dropdown {
								width: 10px;
								height: 8px;
								position: absolute;
								right: 30px;
								top: 45%;
							}
				
							select {
								/*取消默认箭头开始*/
								appearance: none;
								-moz-appearance: none;
								-webkit-appearance: none;
								/*取消默认箭头结束*/
								width: 225px;
								height: 59px;
								background-color: #0E0F11;
								color: #ffffff;
								border-radius: 20px;
								opacity: 1;
								border: none;
								font-family:'Roboto-Regular';
								font-size: 18px;
								padding-left: 20px;
								padding-right: 20px;
							}
				
							/deep/ .el-select .el-input .el-input__inner {
								border: 0px;
								width: 230px;
								height: 59px;
								color: #fff;
								font-family:'Roboto-Regular';
								border-radius: 20px;
								background-color: #0E0F11;
								border: 1px solid #0E0F11;
							}
				
							/deep/ .el-select-dropdown {
								background-color: #0E0F11;
								border: 1px solid rgba(255,255,255,0.2);
							}
				
							/deep/ .el-icon-arrow-up:before {
								content: "\e78f";
							}
				
							/deep/ .el-icon-arrow-down:before {
								content: "\e790";
							}
							//修改单个的选项的样式
							/deep/ .el-select-dropdown__item {
								background-color: transparent;
								color: #fff;
								font-family:'Roboto-Regular';
								text-align: center;
							}
							/deep/ .el-select-dropdown__item.hover{
								background-color: #1D2023;
							}
							/deep/ .el-select-dropdown__item.selected{
								background-color: #1D2023;
							}
						}
					}
				
					.status {
						.status_text {
							text-align: left;
							letter-spacing: 0px;
							color: #727272;
							opacity: 1;
							font-family:'Roboto-Regular';
							font-size: 18px;
						}
					}
				
					.sort_by {
						.sort_by_text {
							text-align: left;
							letter-spacing: 0px;
							color: #727272;
							font-family:'Roboto-Regular';
							font-size: 18px;
						}
					}
				}
				.search{
					background: #0E0F11;
					border-radius: 23px;
					input{
						width: 300px;
						height: 60px;
						background: #0E0F11;
						border-radius: 23px;
						font-size: 18px;
						border: none;
						padding-left: 35px;
						color: #565656;
						font-family:'Roboto-Regular';
					}
					.btn{
						width: 60px;
						height: 60px;
						background: #D3AA53;
						border: none;
						border-radius: 22px;
						opacity: 1;
						cursor: pointer;
						img{
							width: 22px;
							height: 22px;
						}
					}
				}
			}
			.card_block{
				width: 350px;
				height: 150px;
				background: #0E0F11;
				border-radius: 23px;
				display: flex;align-items: center;
				margin-top: 20px;
				.card_img{
					width: 45%;
					display: flex;
					align-items: center;
					justify-content: center;
					img{
						width: 120px;
					}
				}
				.card_right{
					margin-left: 10px;
					.card_msg{
						color: #ffffff;
						font-size: 18px;
						font-family:'Roboto-Bold';
						margin-bottom: 15px;
					}
					.card_btn{
						width: 130px;
						height: 40px;
						font-size: 18px;
						background: #D3AA53;
						border-radius: 22px;
						color: #000000;
						font-family:'Roboto-Regular';
						display: flex;
						align-items: center;
						justify-content: center;
						cursor: pointer;
					}
				}
			}
		}
		.content_form{
			.form_card{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.card_product{
					width: 48%;
					display: flex;
					align-items: center;
					background: #0E0F11;
					border-radius: 23px;
					margin-top: 25px;
					.product_img{
						width: 40%;
						img{
							border-radius: 22px;
							width: 230px;
							height:230px;
						}
					}
					.card_right{
						width: 60%;
						.product_name{
							color: #ffffff;
							font-family:'Quicksand-Bold';
							font-size: 20px;
							margin-bottom: 15px;
						}
						.product_type{
							color: #727272;
							font-size: 18px;
							margin-bottom: 15px;
						}
						.product_price{
							display: flex;
							align-items: center;
							color: #D3AA53;
							font-family:'Roboto-Regular';
							margin-bottom: 15px;
							img{
								width: 30px;
								height: 30px;
								margin-right: 10px;
							}
							.price_num{
								font-size: 18px;
								span{
									font-size: 20px;
									font-family:'Roboto-Bold';
								}
							}
						}
						.add_num{
							display: flex;
							.left_block{
								display: flex;
								margin-right: 55px;
								.reduce{
									width: 40px;
									height: 40px;
									background: #2D2D2D;
									color: #D3AA53;
									display: flex;
									align-items: center;
									justify-content: center;
									font-size: 18px;
									font-family:'Roboto-Regular';
									cursor: pointer;
								}
								.num{
									width: 70px;
									height: 40px;
									font-size: 20px;
									border: 1px solid #2D2D2D;
									color: #FFFFFF;
									font-family:'Roboto-Regular';
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.increase{
									width: 40px;
									height: 40px;
									font-size: 18px;
									background: #2D2D2D;
									color: #D3AA53;
									display: flex;
									align-items: center;
									justify-content: center;
									font-family:'Roboto-Regular';
									cursor: pointer;
								}
							}
							.right_block{
								width: 130px;
								height: 40px;
								font-size: 18px;
								background: #D3AA53;
								border-radius: 22px;
								color: #000000;
								font-family:'Roboto-Regular';
								cursor: pointer;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
					}
				}
			}
			.content_bottom{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.order_pagination {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					padding-right: 100px;
				}
				.center_pagination{
					display: flex;
					align-items: center;
					justify-content: flex-start;
					margin-top: 75px;
					margin-bottom: 80px;
					
					.prev{
						width: 66px;
						height: 49px;
					}
					.next{
						width: 66px;
						height: 49px;
					}
					.num{
						width: 66px;
						height: 49px;
					}
					p{
						width: 49px;
						height: 49px;
						line-height: 49px;
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
						background: #D3AA53 0% 0% no-repeat padding-box;
						border-radius: 10px;
						color: #FFFFFF;
					}
				}
				.content_bottom_right{
					position: fixed;
					bottom: 0px;
					right: 140px;
					display: flex;
					align-items: center;
					.shop{
						position: relative;
						img{
							width: 120px;
							height: 120px;
						}
						.shop_num{
							width: 30px;
							height: 30px;
							border-radius: 18px;
							border: 2px solid #ffffff;
							background: red;
							color: #ffffff;
							font-family:'Roboto-Regular';
							text-align: center;
							line-height: 30px;
							font-size: 18px;
							position: absolute;
							top: 16px;
							right: 16px;
							z-index: 9999;
						}
					}
					.chat{
						width: 85px;
						height: 85px;
						// border-radius: 40px;
						border-radius: 50%;
						background: rgba(14,15,17,0.5);
						border: 2px solid #2D2D2D;
						display: flex;
						align-items: center;
						justify-content: center;
						img{
							width: 60px;
							height: 60px;
						}	
					}
				}
			}
			
		}
	}
}
</style>
