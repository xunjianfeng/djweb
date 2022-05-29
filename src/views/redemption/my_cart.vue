<template>
	<div class="index">
		<div class="container">
			<!-- 结算信息 弹窗 -->
			<div class="mark_check" v-if="check_status == true" @click.stop="open_shop(2)">
				<img src="@/assets/images/cancel.png" >
			</div>
			<div class="mark_bac" v-if="check_status == true"></div>
			<div class="mark_check_container" v-if="check_status == true">
				<div class="mark_my_content ">
					<div class="mark_text_one">Confirm Purchase</div>
					<div class="mark_product_container">
						<div class="mark_product">
							<div class="product_two" v-for="(stem,sdex) in settle_list" :key='sdex'>
								<div class="product_img">
									<img :src="HOST + stem.commodityLogo" alt="">
								</div>
								<div class="product_product">
									<div class="product_title">{{stem.commodityName}}</div>
									<div class="product_subtitle">{{stem.species}}</div>
								</div>
								<div class="product_right">
									X{{stem.specs.num}}
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
								<!-- <div class="apply_coupon" v-if="coupon_status != false">
									<div class="match_content">
										<div class="match_content_coupon">
											<div class="coupon_list" v-for="(item,index) in coupon_list" :key="index">
												<div class="coupon_img"><img src="../../assets/images/coupon.png" alt=""></div>
												<div class="coupon_list_warp">
													<div class="coupon_tit">{{item.couponTitle}}</div> 
													<div class="coupon_exp">EXP：{{initDete(item.validityTime)}}</div>
												</div>
												<div class="coupon_right">
													<div class="coupon_button" @click.stop="get_receive(item.couponCode)">Choose</div>
													<div class="coupon_rule">Rule>></div>
												</div>
											</div>
										</div>
									</div>
								</div> -->
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
								<div class="td_text2">{{foot_totalAmount}}{{settle_list[0].payMethod}}</div>
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
			<!-- Check out 02 弹窗 -->
			<div class="mark_cancel" v-if="update_up == true" @click.stop="update_up = false">
				<img src="@/assets/images/cancel.png" >
			</div>
			<div class="mark_bac" v-if="update_up == true"></div>
			<div class="mark_Top_container" v-if="update_up == true">
				<div class="mark_my_content ">
					<div class="mark_text_one">Successful Transaction</div>
					<div class="mark_text_two">You can view the details of your order from the <span>My Redemption</span></div>
				</div>
				<div class="mark_my_foot">
					<div class="mark_foot_button" @click="upda_status(2)">Go to My Redemption>></div>
				</div>
			</div>
			<!--  end -->
			<div class="cart_right">
				<div class="cart_top">
					<div class="cart_title">My Shopping Cart ({{cart_list.length || 0}})</div>
					<div class="cart_operate">
						<div class="operate_left">Select Item ({{choice_num}})</div>
						<div class="operate_all" @click="all_Check">Select All</div>
					</div>
				</div>
				<div class="cart_list_container">
					<div class="list_cart_head">
						<div class="head_block"></div>
						<div class="head_block2">Product</div>
						<div class="head_block3">Unit Price</div>
						<div class="head_block4">Quantity</div>
						<div class="head_block5">Total Price</div>
					</div> 
					<div class="list_cart_table">
						<div class="table_block" v-for="(item,index) in cart_list" :key='index'>
							<div class="table_lump">
								<div class="lump_one">
									<div class="lump_one_check" v-if="item.check == false" @click="single_check(item.specs.specsId)"></div>
									<div class="lump_one_av" v-else @click="single_check(item.specs.specsId)">
										<img src="../../assets/images/gou.png" alt="">
									</div>
								</div>
							</div>
							<div class="table_lump2">
								<div class="lump2_two">
									<div class="lump2_img">
										<img :src="HOST + item.commodityLogo" alt="">
									</div>
									<div class="lump2_product">
										<div class="product_title">{{item.commodityName}}</div>
										<div class="product_subtitle">{{item.species}}</div>
									</div>
								</div>
							</div>
							<div class="table_lump3">
								<div class="lump3_text">{{item.specs.specsPrice}} {{item.payMethod}}</div>
							</div>
							<div class="table_lump4">
								<div class="select_num">
									<div class="reduce_num" @click="reduce(index)">-</div>
									<div class="num">{{item.specs.num}}</div>
									<div class="add_num" @click="increase(index)">+</div>
								</div>
							</div>
							<div class="table_lump5">
								<div class="lump5_price">
									<div class="price_left">
										<img src="../../assets/images/dollar.png" alt="">
										<div class="price_text">
											<div class="price_money">{{item.specs.num * item.specs.specsPrice}}</div>{{item.payMethod}}
										</div>
									</div>
									<div class="price_img" @click="goods_list_remove(index)">
										<img src="../../assets/images/cancel.png" alt="" >
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="cart_foot">
			<div class="foot_content">
				<div class="foot_left" @click="go_redemption">
					<div class="foot_button">< Continue Shopping</div>
				</div>
				<div class="foot_right">
					<div class="foot_right_pay">
						<div class="pay_text">Total Pay</div>
						<div class="price_left">
							<img src="../../assets/images/dollar.png" alt="">
							<div class="price_text">
								<div class="price_money">{{pay_money}}</div>Coin
							</div>
						</div>
					</div>
					<div class="foot_right_check" @click="open_shop(1)">Check Out</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {CommodityDetail,CommodityBuy,CouponApply,CouponMy} from '@/api/redemption.js'
	export default {
		name: "my_cart",
		components: {},
		data() {
			return {
				coupon_code:"",
				num:1,
				info_status:false,
				check_status:false,
				update_up:false,
				all_status:false,
				tableData:'',  //规格
				num_index:0, //当前点击的规格index
				commod_detail:'', //商品信息
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
				coupon_list:[],
				couponAmount:'',//优惠金额
				pay_money:'0', //应支付金额
				coupon_status:false,
				listQuery2:{
					order: {receive_time: 'desc'},
					// code:'',
				},
				cart_list:[], //购物车列表
				foot_totalAmount:0,//底部总金额
				choice_num:0, //选中数量
			};
		},
		mounted() {
			console.log('....购物车......')
			this.cart_list = JSON.parse(sessionStorage.getItem("cart_list"))||[]
		},
		beforeRouteLeave(to,from,next) {
			this.refresh_mycart()//路由变化时调用该方法
			next()
		},
		methods: {
			// 打开结算信息Popup  type 1 打开  2 关闭
			open_shop(type){
				let that = this;
				if(type == 1){
					for (let i in that.cart_list) {
						if(that.cart_list[i].check == true){
							that.pass.orderCommdity.push({
								specsId:that.cart_list[i].specs.specsId,
								amount:that.cart_list[i].specs.num,
							})
							that.settle_list.push(that.cart_list[i])
							that.pay_money = that.foot_totalAmount
							that.check_status =  true
						}
					}
				}else{
					that.pass = {
						orderCommdity:[],//订单商品 
						couponUserId:'', 
						totalAmount:'',
					}
					that.settle_list = []
					that.coupon_code = ""
					that.check_status =  false
					this.couponAmount = 0 //关闭成功重置优惠券金额
					that.pay_money = that.foot_totalAmount  //关闭时重置结算金额
				}
			},
			// 购买 CommodityBuy
			get_buy() {
				// console.log(this.cart_list)
				let that = this;
				that.pass.totalAmount = that.foot_totalAmount
				CommodityBuy(that.pass).then(res => {
					if(res.code == 200){
						this.$message({
						  message: res.message,
						  type: 'success'
						});
						this.$emit("topRefresh")
						this.coupon_code = ""  //支付成功后重置优惠券
						this.couponAmount = 0 //支付成功重置优惠券金额
						this.pay_money = 0 //支付成功后重置购物车列表金额

					}
					console.log(this.cart_list)
					that.pass = {
						orderCommdity:[],//订单商品 
						couponUserId:'', 
						totalAmount:'',
					}
					for(let i = 0; i < that.cart_list.length; i++) {
						if(that.cart_list[i].check == true){
							that.cart_list.splice(i,1)
							i--;
							if(that.cart_list){
								
							}else{
								that.cart_list = []
							}
							
						}
					}

					if( that.cart_list ){
						sessionStorage.setItem("cart_list", JSON.stringify(that.cart_list))	
					}else{
						sessionStorage.setItem("cart_list", '')	
					}
					that.settle_list = []
					that.foot_totalAmount = 0
					this.check_status = false
					that.update_up = true
					that.choice_num = 0
				})
			},
			// 我的优惠券
			get_myCoupon() {
				let that = this;
				CouponMy(that.listQuery2).then(res => {
					this.coupon_list = res.data
					if(this.coupon_list != '' ||  this.coupon_list != null){
						this.coupon_status = true
					}
					for(let i = 0; i < res.data.length;i++){
						res.data[i].validityDay = ''
					}
					that.coupon_list = res.data
					console.log(that.coupon_list)
					if(this.coupon_list != '' ||  this.coupon_list != null){
						this.coupon_status = true
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
						// console.log(that.coupon_list[v].validityDay)
						// console.log("无情的分割线")
					}
				})
				
			},
			//关闭优惠券弹窗时清空购买弹窗的数据
			game_info_cloose(){
				this.pass.orderCommdity.splice(0,1) //关闭时清空商品id和数量
				this.settle_list = []
				this.info_status = false
			},
			// 搜索优惠券
			aply_coupon(){
				this.get_myCoupon();
				this.info_status = true	//打开选择优惠券弹窗
				this.check_status =false //关闭支付弹窗
				// console.log(this.coupon_list)
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
					// totalAmount:that.pass.totalAmount,
					totalAmount:that.foot_totalAmount
				}
				CouponApply(params).then(res => {
					that.couponAmount = res.data.couponAmount   
					that.pass.couponCode = that.coupon_code  
					// that.pass.couponCode = that.listQuery2.code
					that.pass.totalAmount = that.foot_totalAmount
					that.pay_money = that.pass.totalAmount - that.couponAmount
					// that.coupon_status = false
					that.info_status = false
					that.check_status = true
				})
			},
			//删除购物车列表商品
			goods_list_remove(index){
				//此操作讲删除该购物车商品,是否继续?
				  this.$confirm('Going to delete product in your cart, confirm to continue?', 'Confirmation', {
				          confirmButtonText: 'Confirm',
				          cancelButtonText: 'Cancel',
				          type: 'warning'
				        }).then(() => {
				          this.$message({
				            type: 'success',
				            message: ' Successfully deleted!'//删除成功
				          });
						  if(this.cart_list[index].check){ //只有当商品被选中才会生效
						  	this.pay_money = this.pay_money-this.cart_list[index].specs.specsPrice //删除时减去总金额减去删除的商品价格
						  	this.foot_totalAmount = this.pay_money
						  }
						  this.cart_list.splice(index,1)
						  this.choice_num = this.cart_list.length
						  if(this.cart_list){
						  	sessionStorage.setItem("cart_list", JSON.stringify(this.cart_list))	
						  }else{
						  	sessionStorage.setItem("cart_list", '')	
						  }
				        }).catch(() => {
				          this.$message({
				            type: 'warning',
				            message: 'Cancel delete'//已取消删除
				          });          
				        });
			},
			
			// 全选 
			all_Check(){
				let that = this;
				that.all_status = !that.all_status
				that.foot_totalAmount = 0
				if(that.cart_list != ''){
					for (let i in that.cart_list) {
						if(that.all_status == false){
							that.cart_list[i].check = false
							that.foot_totalAmount = 0
							that.choice_num = 0
							that.pay_money = that.foot_totalAmount
						}else{
							that.cart_list[i].check = true
							that.foot_totalAmount += that.cart_list[i].specs.specsPrice *  that.cart_list[i].specs.num
							that.choice_num = that.cart_list.length
							that.pay_money = that.foot_totalAmount
						}
					}
				}
			},
			// 单选
			single_check(specsId){
				let that = this;
				for (let i in that.cart_list) {
					if(that.cart_list[i].specs.specsId == specsId){
						if(that.cart_list[i].check == true){
							that.cart_list[i].check = false
							that.choice_num --
							that.foot_totalAmount -= that.cart_list[i].specs.specsPrice *  that.cart_list[i].specs.num
							that.pay_money = that.foot_totalAmount
						}else{
							that.cart_list[i].check = true
							that.choice_num ++
							that.foot_totalAmount += that.cart_list[i].specs.specsPrice *  that.cart_list[i].specs.num
							that.pay_money = that.foot_totalAmount
						}
					}
				}
			},
			// 减
			reduce(index){
				let that = this;
				if(that.cart_list[index].specs.num > 1){
					that.cart_list[index].specs.num --
					if(that.cart_list[index].check == true){
						that.foot_totalAmount -= that.cart_list[index].specs.specsPrice 
						that.pay_money = that.foot_totalAmount
					}
				}
				
			},
			// 加
			increase(index){
				let that = this;
				// 判断 购买数量不能大于当前规格的库存数量
				if(this.cart_list[index].specs.num > this.cart_list[index].specs.specsStock){
					 this.$message({
					  message: "Cannot more than stock's number.",//不能超过库存数量
					  type: 'warning'
					});
					return
				}else{
					this.cart_list[index].specs.num ++
					if(that.cart_list[index].check == true){
						that.foot_totalAmount += that.cart_list[index].specs.specsPrice
						that.pay_money = that.foot_totalAmount
					}
				}
				
				
			},
			upda_status(index){
				let that = this;
				// 关闭01弹窗 打开02
				if(index == 1){
					that.check_status = false
					that.update_up = true
				}else if(index == 2){
					// that.update_up = false
					this.$router.push({path: '/followers/my_redemption'})
				}
			},
			
			// 返回购物车
			go_redemption(){
				this.$router.push({path: '/redemption/redemption'})
			},
			
			refresh_mycart(){	//路由变化时重置
				for(let i = 0 ;i<this.cart_list.length;i++){
					this.cart_list[i].check = false
				}
				this.pay_money = 0//跳转时重置金额
				this.foot_totalAmount = this.pay_money
				if(this.cart_list ){
					sessionStorage.setItem("cart_list", JSON.stringify(this.cart_list))	
				}else{
					sessionStorage.setItem("cart_list", '')	
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.container {
		display: flex;
		justify-content: space-between;/* 横向中间自动空间 */
		flex-wrap: wrap;/* 换行 */
		padding-bottom: 120px;
		margin: 45px 0px 0px 91px;
		// Check out 01弹窗 start
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
									font-size: 22px;
									text-align: left;
									margin-bottom: 20px;
									font-family:'Roboto-Bold';
								}
								.product_subtitle{
									color: #727272;
									font-size: 18px;
									text-align: left;
									font-family:'Roboto-Regular';
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
													font-family:'Roboto-Bold';
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
													font-size: 16px;
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
												font-family:'Roboto-Regular';
												line-height: 27px;
												font-weight: bold;
											}
											.match_time {
												color: #d3aa53;
												font-size: 18px;
												font-weight: 500;
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
													font-family:'Roboto-Regular';
													font-size: 18px;
												}
												.text_right {
													color: #ffffff;
													font-family:'Roboto-Regular';
													font-size: 18px;
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
													font-family:'Roboto-Regular';
													font-size: 18px;
													font-weight: 500;
												}
												.text_right {
													font-family:'Roboto-Regular';
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
							font-family:'Roboto-Regular';
							font-size: 20px;
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
							}
							.td_text2{
								color: #FFFFFF;
								font-size: 22px;
							}
						}
						.td_right{
							.td_text2{
								color: #FFFFFF;
								font-size: 22px;
							}
							.td_text3{
								color: #FF4810;
								font-size: 22px;
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
									font-size: 22px;
									.price_money{
										font-weight: bold;
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
										font-size: 16px;
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
		// Check out 02弹窗 start
		.mark_cancel{
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
		.mark_Top_container{
			position: absolute;
			left: 357px;
			top: 185px;
			z-index: 999;
			width: 611px;
			padding: 126px 95px 103px 95px;
			background: #0E0F11;
			border-radius: 27px;
			overflow: hidden;
			display: flex;
			flex-flow: column;
			align-items: center;
			.mark_my_content{
				width: 100%;
				text-align: center;
				margin-bottom: 80px;
				.mark_text_one{
					color: #DBA83F;
					font-size: 24px;
					font-family:'Quicksand-Bold';
					margin-bottom: 20px;
				}
				.mark_text_two{
					color: #989898;
					font-size: 20px;
					font-family:'Roboto-Regular';
					span{
						color: #EDEDED;
						font-family:'Roboto-Black';
					}
				}
			}
			.mark_my_foot{
				.mark_foot_button{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 229px;
					height: 58px;
					color: #0E0F11;
					cursor: pointer;
					font-size: 18px;
					background: #DBA83F;
					border-radius: 25px;
					font-family:'Roboto-Regular';
				}
			}
		}
		//Check out 02弹窗  end
		.cart_right {
			width: calc(100% - 147px);
			position: relative;
			.cart_top{
				margin-bottom: 27px;
				.cart_title{
					color: #FFFFFF;
					font-size: 22px;
					font-family:'Quicksand-Bold';
					margin-bottom: 43px;
				}
				.cart_operate{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.operate_left{
						color: #D3AA53;
						font-size: 20px;
						font-family:'Roboto-Medium';
					}
					.operate_all{
						color: #898989;
						font-family:'Roboto-Regular';
						font-size: 20px;
						margin-right: 70px;
						cursor: pointer;
					}
				}
			}
			.cart_list_container{
				overflow: hidden;
				border-radius: 36px;
				.list_cart_head{
					height: 75px;
					color:#E5E5E5;
					font-family:'Roboto-Bold';
					font-size: 22px;
					display: flex;
					align-items: center;
					background-color:#000000;
					.head_block{
						width: 5%;
						height: 75px;
						display: flex;
						align-items: center;
					}
					.head_block2{
						width: 35%;
						height: 75px;
						display: flex;
						align-items: center;
					}
					.head_block3{
						width: 15%;
						height: 75px;
						display: flex;
						padding-left: 2%;
						align-items: center;
					}
					.head_block4{
						width: 16%;
						height: 75px;
						display: flex;
						padding-left: 2%;
						align-items: center;
					}
					.head_block5{
						width: 23%;
						height: 75px;
						padding-left: 2%;
						display: flex;
						align-items: center;
					}
				}
				.list_cart_table{
					margin-bottom: 150px;
					.table_block{
						display: flex;
						align-items: center;
						height: 154px;
						.table_lump{
							width: 5%;
							height: 154px;
							display: flex;
							align-items: center;
							justify-content: center;
							.lump_one{
								.lump_one_check{
									width: 24px;
									height: 24px;
									border: 1px solid #565656;
								}
								.lump_one_av{
									width: 24px;
									height: 24px;
									display: flex;
									align-items: center;
									justify-content: center;
									background-color:#0AEA14;
									img{
										width: 22px;
									}
								}
							}
						}
						.table_lump2{
							width: 34.8%;
							height: 154px;
							display: flex;
							align-items: center;
							border-right: 3px solid #161616;
							.lump2_two{
								width: 100%;
								display: flex;
								align-items: center;
								.lump2_img{
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
								.lump2_product{
									width: 60%;
									.product_title{
										color: #FFFFFF;
										font-size: 22px;
										text-align: left;
										margin-bottom: 20px;
										font-family:'Roboto-Medium';
									}
									.product_subtitle{
										color: #727272;
										text-align: left;
										font-size: 18px;
										font-family:'Roboto-Regular';
									}
								}
							}
						}
						.table_lump3{
							width: 14.8%;
							height: 154px;
							display: flex;
							align-items: center;
							padding-left: 2%;
							border-right: 3px solid #161616;
							.lump3_text{
								font-size: 22px;
								color: #F4F4F4;
								font-family:'Roboto-Regular';
							}
						}
						.table_lump4{
							width: 15.8%;
							height: 154px;
							padding-left: 2%;
							display: flex;
							align-items: center;
							border-right: 3px solid #161616;
							.select_num{
								width: 201px;
								height: 61px;
								font-size: 25px;
								display: flex;
								.reduce_num{
									width: 59px;
									height: 59px;
									color: #636363;
									cursor: pointer;
									display: flex;
									align-items: center;
									justify-content: center;
									background: #060707;
									font-family:'Roboto-Regular';
									cursor: pointer;
								}
								.num{
									width: 99px;
									height: 56px;
									border: 1px solid #060707;
									color: #FFFFFF;
									font-family:'Roboto-Regular';
									font-size: 20px;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.add_num{
									width: 59px;
									height: 59px;
									color: #D3AA53;
									cursor: pointer;
									display: flex;
									align-items: center;
									justify-content: center;
									background: #060707;
									font-family:'Roboto-Regular';
									cursor: pointer;
								}
							}
						}
						.table_lump5{
							width: 21%;
							height: 154px;
							padding: 0 2% 0 2%;
							display: flex;
							align-items: center;
							.lump5_price{
								width: 100%;
								display: flex;
								justify-content: space-between;
								.price_left{
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
											font-family:'Roboto-Black';
											margin-right: 6px;
										}
									}
								}
								.price_img{
									img{
										width: 23px;
									}
								}
							}
						}
					}
					.table_block:nth-child(2n){
						background-color:#313538;
					}
					
				}
			}
			
		}
	}
	.cart_foot{
		position: fixed;
		left: 215px;
		bottom: 0;
		right: 0;
		margin: 0 auto;
		background-color: rgb(29,32,35);
		.foot_content{
			height: 121px;
			padding: 86px 137px 86px 91px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-shadow:0px -100px 200px #1d2023;  /*上边阴影*/ 
			.foot_left{
				cursor: pointer;
				.foot_button{
					width: 241px;
					height: 58px;
					color: #FFFFFF;
					font-family:'Roboto-Regular';
					font-size: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 1px solid #777777;
					border-radius: 25px;
				}
			}
			.foot_right{
				width: 1032px;
				height: 121px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background: #000000;
				border-radius: 38px;
				.foot_right_pay{
					display: flex;
					align-items: center;
					margin-left: 75px;
					.pay_text{
						color: #fff;
						font-size: 22px;
						margin-right: 51px;
						font-family:'Roboto-Medium';
					}
					.price_left{
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
								font-family:'Roboto-Black';
								margin-right: 6px;
							}
						}
					}
				}
				.foot_right_check{
					margin-right: 53px;
					width: 163px;
					height: 58px;
					cursor: pointer;
					line-height: 58px;
					text-align: center;
					color: #0E0F11;
					font-family:'Roboto-Regular';
					font-size: 18px;
					background: #D3AA53;
					border-radius: 25px;
				}
			}
		}
	}
</style>
