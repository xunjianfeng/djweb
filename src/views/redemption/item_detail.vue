<template>
	<div class="index">
		<div class="container">
			<!-- 规格弹窗 -->
			<div class="norms_cancel" v-if="red_status" @click.stop="red_status = false">
				<img src="@/assets/images/cancel.png" >
			</div>
			<div class="norms_bac" v-if="red_status"></div>
			<div class="norms_Top_container" v-if="red_status">
				<div class="norms_my_head "> 
					<div class="norms_text_two">Specification</div>
				</div>
				<div class="norms_my_content ">
					<div class="markc_block_list">
						<div  v-for="(item,index) in tableData" :key='index' :class="spec_ky == item.specsId ?'markc_block markc_border':'markc_block'"  @click="switch_spec(index)">
							<!-- <img class="markc_img" src="../../assets/images/dollar.png" alt=""> -->
							<div class="markc_text">{{item.specsName}}</div>
						</div>
					</div>
				</div>
				<div class="norms_my_foot">
					<div class="norms_foot_confirm" @click.stop="red_status = false">Redeem</div>
					<div class="markc_shop_img">
						<img src="../../assets/images/shop.png" />
					</div>
				</div>
			</div>
			<!-- end-->
			<!-- 支付弹窗 -->
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
									<img :src="HOST + img_list[0]" alt="">
								</div>
								<div class="product_product">
									<div class="product_title">{{commod_detail.commodityName}}</div>
									<div class="product_subtitle">{{commod_detail.species}}</div>
								</div>
								<div class="product_right">
									X{{stem.num}}
								</div>
							</div>
						</div>
					</div>
					<!-- 优惠券 -->
					<div class="check_code">
						<div class="code_tit">Apply Code</div>
						<div class="apply_search">
							<div class="apply_code">
								<input type="text" disabled v-model="coupon_code" placeholder="Key in your code">
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
								<div class="td_text2">{{pass.totalAmount}}{{commod_detail.payMethod}}</div>
							</div>
						</div>
						<div class="check_td">
							<div class="td_left">
								<div class="td_text">Code</div>
							</div>
							<div class="td_right">
								<div class="td_text3">- {{couponAmount||0}} {{commod_detail.payMethod}}</div>
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
										<div class="price_money">{{pay_money}}</div>{{commod_detail.payMethod}}
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
			<div class="content_block">
				<div class="item_info">
					<div class="item_pic">
						<img :src="HOST + img_list[img_key]" />
						<div class="img_area" >
							<div class="pic" v-for="(imem,mndex) in img_list" :key="mndex" @click="changeImg(mndex)">
								<img :src="HOST + imem" />
							</div>
						</div>
					</div>
					<div class="item_info_block">
						<div class="info_name">
							<div class="product_name">{{commod_detail.commodityName}}</div>
							<div class="info_btom">
								<div class="product_type">{{commod_detail.species}}</div>
								<!-- <div class="item_time">
									<div class="item_title">Validity</div>
									<div class="date_time">23 July 2021 - 30 July 2021</div>
								</div> -->
							</div>
						</div>
						<div class="item_criteria">
							<!-- <div class="item_title">Criteria</div> -->
							<div class="item_text">{{commod_detail.standard}}</div>
						</div>
						<div class="item_specification">
							<div class="item_title">Specification</div>
							<div class="spec_block_list">
								<div v-if="tableData.length <= 4"  v-for="(item,index) in tableData" :key='index' :class="spec_ky == item.specsId ?'spec_block spec_border':'spec_block'"  @click="switch_spec(index)">
									<!-- <img class="spec_img" src="../../assets/images/dollar.png" alt=""> -->
									<div class="spec_text">{{item.specsName}}</div>
								</div>
								<div class="spec_show" v-if="tableData.length > 4">Show more</div>
							</div>
						</div>
						<div class="item_quantity">
							<div class="item_title">Quantity</div>
							<div class="quantity_block">
								<div class="left_block">
									<div class="add_num">
										<div class="reduce" @click="reduce">-</div>
										<div class="num">{{tableData[num_index].num}}</div>
										<div class="increase" @click="increase">+</div>
									</div>
									<div class="item_price">
										<img src="../../assets/images/dollar.png" />
										<div class="price_num"><span>{{commod_detail.specs[num_index].specsPrice}}</span> {{commod_detail.payMethod}}</div>
									</div>
								</div>
								<div class="right_block">
									<div class="item_btn" @click="open_shop(1)">Redeem</div>
									<div class="shop_img" @click="add_cart">
										<img src="../../assets/images/shop.png" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 商品介绍、使用方法、规则 -->
				<div class="message">
					<div class="message_nav">
						<div class="av">Description</div>
						<div>Where to Use</div>
						<div>Terms and Conditions</div>
					</div>
					<div class="item_text_area">
						<div class="description_text">
							<div class="text_title">Description</div>
							<div class="text_area">
								<div class="text">{{commod_detail.commodityIntroduce}}</div>
							</div>
						</div>
						<div class="where_text">
							<div class="text_title">Where to Use</div>
							<div class="text_area">
								<div class="text">{{commod_detail.howUse}}</div>
							</div>
						</div>
						<div class="term_text">
							<div class="text_title">Terms and Conditions</div>
							<div class="text_area">
								<div class="text">{{commod_detail.rule}}</div>
							</div>
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
	import {CommodityDetail,CommodityBuy,CouponApply,CouponMy} from '@/api/redemption.js'
	import {couponMy} from '@/api/coupon';
	export default{
		name:"item_detail",
		inject:['reload'],
		data(){
			return{
				img_key:0,
				img_list:[], //商品图片
				red_status:false, //规格弹窗
				check_status:false, //支付弹窗
				info_status:false,//选择优惠券弹窗
				commodityId:'',
				spec_ky:'', //规格选中样式依据
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
				coupon_list:[],//优惠券
				couponAmount:'',//优惠金额
				pay_money:'', //应支付金额
				coupon_status:false,
				listQuery2:{
					order: {receive_time: 'desc'},
					// code:'',
				},
				cart_list:[],
				specs_list:[],
				coupon_name:'',
				coupon_code:''
			}
		},
		mounted() {
			this.commodityId = this.$route.query.commodityId
			if(this.commodityId != '' && this.commodityId!= undefined && this.commodityId!= null){
				this.commody_details(this.commodityId)
			}
			this.cart_list = JSON.parse(sessionStorage.getItem("cart_list"))||[]
		},
		methods:{
			// 加入购物车  缓存选中规格
			add_cart(){
				let that = this;
				//库存为空，不打开结算信息弹窗，直接提示库存已空
				if(that.tableData[that.num_index].specsStock  == '' || that.tableData[that.num_index].specsStock == 0 ){
					this.$message({
					  message: 'Please pick other redemption as this out of stock.',//当前规格库存已空，请选择其它规格商品
					  type: 'warning'
					});
					return
				}else{
					if(that.cart_list == ''){
						that.cart_list.push({
							check:false,
							commodityName:that.commod_detail.commodityName,
							species:that.commod_detail.species,
							payMethod:that.commod_detail.payMethod,
							commodityLogo:that.img_list[0],
							specs:this.tableData[this.num_index]
							
						})
					}else{
						let cf = 0;
						// 判断加入的规格是否重复
						for (  let i in that.cart_list ) {
							// 判断是否重复规格 
							if(that.tableData[that.num_index].specsId == that.cart_list[i].specs.specsId){
								// console.log('一致')
								that.cart_list[i].specs.num  ==  that.tableData[that.num_index].num
								cf ++
							} else {
								
							}
						}
						// 不一致,追加新规格
						if ( cf == 0 ) {
							that.cart_list.push({
								check:false,
								commodityName:that.commod_detail.commodityName,
								species:that.commod_detail.species,
								payMethod:that.commod_detail.payMethod,
								commodityLogo:that.img_list[0],
								specs:this.tableData[this.num_index]
								
							})
						}
				}
				
				}
				sessionStorage.setItem("cart_list", JSON.stringify(that.cart_list))		
				this.$message({
				  message: 'Added to cart.',//已加入购物车
				  type: 'success'
				});
			},
			// 我的优惠券
			get_myCoupon() {
				let that = this;
				couponMy(that.listQuery2).then(res => {
					for(let i = 0; i < res.data.length;i++){
						res.data[i].validityDay = ''
					}
					that.coupon_list = res.data
					// console.log(that.coupon_list)
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
			//关闭优惠券弹窗时清空购买弹窗的数据
			game_info_cloose(){
				this.pass.orderCommdity.splice(0,1) //关闭时清空商品id和数量
				this.settle_list = []
				this.info_status = false
			},
			// 商品详情
			commody_details(commodityId){
				let that = this;
				CommodityDetail({commodityId}).then(res => {
					let goodsInfo = res.data
					if ( goodsInfo['picture'] ) {
						if(that.img_list.length === 1){
							
						}else{
							that.img_list.push(goodsInfo.picture[0].url) 
						}
						
					}
					if(goodsInfo['specs']){
						for (var j = 0; j < goodsInfo.specs.length; j++) {
							goodsInfo.specs[j]['num'] = 1
						}
						that.tableData = goodsInfo['specs']||[]
						that.spec_ky = that.tableData[0].specsId
					}
					that.commod_detail = goodsInfo
				})
			},
			// 打开结算信息Popup  type 1 打开  2 关闭
			open_shop(type){
				let that = this;
				if(type == 1){
					//库存为空，不打开结算信息弹窗，直接提示库存已空
					if(that.tableData[that.num_index].specsStock  == '' || that.tableData[that.num_index].specsStock == 0 ){
						this.$message({
						  message: 'Please pick other redemption as this out of stock.',//当前规格库存已空，请选择其它规格商品
						  type: 'warning'
						});
						return
					}else{
						that.pass.orderCommdity.push({
							specsId:that.tableData[that.num_index].specsId,
							amount:that.tableData[that.num_index].num,
						})
						that.settle_list.push(that.tableData[that.num_index])
						that.pass.totalAmount = that.tableData[that.num_index].specsPrice * that.tableData[that.num_index].num
						that.pay_money = that.pass.totalAmount
						that.check_status =  true
					}
					
				}else{
					that.pass = {
						orderCommdity:[],//订单商品 
						couponUserId:'', 
						totalAmount:'',
					}
					that.settle_list = []
					that.coupon_code = ''
					that.check_status =  false
					this.couponAmount = 0 //关闭成功重置优惠券金额
				}
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
						this.$emit("topRefresh")	//支付成功发送刷新事件
						this.coupon_code = ""  //支付成功后重置优惠券
						this.couponAmount = 0 //支付成功重置优惠券金额
					}
					that.pass = {
						orderCommdity:[],//订单商品 
						couponUserId:'', 
						totalAmount:'',
					}
					that.settle_list = []
					that.check_status = false
					that.commody_details(that.commodityId)
				})
			},
			// 搜索优惠券
			aply_coupon(){
				// this.get_myCoupon();
				this.get_myCoupon()
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
					totalAmount:that.pass.totalAmount,
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
			// 切换规格
			switch_spec(index){
				this.spec_ky = this.tableData[index].specsId
				this.num_index = index
			},
			// 减
			reduce(){
				if(this.tableData[this.num_index].num > 1){
					this.tableData[this.num_index].num --
				}
			},
			// 加
			increase(){
				// 购买数量不能超过库存
				if(this.tableData[this.num_index].num >= this.tableData[this.num_index].specsStock){
					 this.$message({
					  message: "Cannot more than stock's number.",//不能超过库存数量
					  type: 'warning'
					});
					return
				}else{
					this.tableData[this.num_index].num ++
				}
			},
			// 商品图切换
			changeImg(mndex){
				this.img_key = mndex;
			},
			// 跳转购物车
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
	justify-content: space-between;
	flex-wrap: wrap; 
	padding-bottom: 30px;
	// 规格 弹窗 start
	.norms_cancel{
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
	.norms_bac{
		width: 100%;
		height: 100%;
		background:#000000b3;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 88;
	}
	.norms_Top_container{
		position: absolute;
		left: 357px;
		top: 85px;
		z-index: 999;
		width: 611px;
		padding: 48px 105px 100px 105px;
		background: #0E0F11;
		border-radius: 32px;
		overflow: hidden;
		display: flex;
		flex-flow: column;
		align-items: center;
		.norms_my_head{
			width: 100%;
			text-align: center;
			margin-bottom: 70px;
			.norms_text_two{
				color: #DBA83F;
				font-size: 24px;
				font-family:'Quicksand-Bold';
			}
		}
		.norms_my_content{
			.markc_block_list{
				display: flex;
				flex-wrap: wrap;
				.markc_block{
					height: 45px;
					display: flex;
					align-items: center;
					background: #1D2023;
					padding: 0  20px 0 10px;
					margin-bottom: 16px;
					margin-right: 12px;
					cursor: pointer;
					border: 1px solid #1D2023;
					.markc_img{
						width: 36px;
						height: 37px;
						object-fit: cover;
						margin-right: 16px;
					}
					.markc_text{
						color: #FFFFFF;
						font-family:'Roboto-Regular';
						font-size: 18px;
					}
				}
				.markc_border{
					border: 1px solid #D3AA53;
					border-radius: 9px;
				}
			}
		}
		.norms_my_foot{
			display: flex;
			align-items: center;
			.norms_foot_confirm{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 163px;
				height: 58px;
				color: #0E0F11;
				font-family:'Roboto-Regular';
				cursor: pointer;
				font-size: 20px;
				background: #DBA83F;
				border-radius: 25px;
				margin-right: 20px;
			}
			.markc_shop_img{
				width: 60px;
				height: 58px;
				background: #AFAFAF;
				border-radius: 15px;
				display: flex;
				align-items: center;
				justify-content: center;
				img{
					width: 31px;
					height: auto;
				}
			}
		}
	}
	//end
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
								margin-bottom: 20px;
								font-family:'Roboto-Bold';
							}
							.product_subtitle{
								color: #727272;
								font-size: 18px;
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
	.content_block{
		width: 95%;
		margin-left: 50px;
		margin-top: 76px;
		.item_info{
			width: 90%;
			background-color: #0E0F11;
			display: flex;
			justify-content: space-between;
			.item_pic{
				width: 546px;
				height: 546px;
				img{
					width: 546px;
					height: 546px;
				}
				.img_area{
					margin-left: 15px;
					display: flex;
					position: relative;
					bottom: 115px;
					.pic{
						img{
							width: 92px;
							height: 95px;
							margin-right: 10px;
						}
					}
				}
			}
			.item_info_block{
				width: 55%;
				.info_name{
					border-bottom: 1px solid #727272;
					margin-top: 57px;
					margin-right: 59px;
					.product_name{
						color: #FFFFFF;
						font-size: 25px;
						font-family:'Quicksand-Bold';
					}
					.info_btom{
						display: flex;
						justify-content: space-between;
						.product_type{
							color: #727272;
							font-size: 18px;
							font-family:'Roboto-Regular';
							margin: 20px 0px 20px 0px;
						}
						.item_time{
							display: flex;
							align-items: center;
							.item_title{
								color: #727272;
								font-size: 18px;
								font-family:'Roboto-Regular';
								margin-right: 10px;
							}
							.date_time{
								color: #FFFFFF;
								font-family:'Roboto-Regular';
								font-size: 18px;
							}
						}
					}
				}
				.item_criteria{
					margin-top: 20px;
					.item_title{
						color: #727272;
						font-size: 20px;
						font-family:'Roboto-Regular';
						margin-bottom: 10px;
					}
					.item_text{
						color: #ffffff;
						font-size: 20px;
						font-family:'Roboto-Regular';
					}
				}
				.item_specification{
					margin-top: 30px;
					.item_title{
						color: #727272;
						font-size: 20px;
						font-family:'Roboto-Regular';
						margin-bottom: 10px;
					}
					.spec_block_list{
						display: flex;
						flex-wrap: wrap;
						.spec_block{
							height: 45px;
							display: flex;
							align-items: center;
							background: #1D2023;
							padding: 0  20px 0 20px;
							margin-bottom: 16px;
							margin-right: 12px;
							cursor: pointer;
							border: 1px solid #1D2023;
							// text-align: center;
							.spec_img{
								width: 36px;
								height: 37px;
								object-fit: cover;
								margin-right: 16px;
							}
							.spec_text{
								color: #FFFFFF;
								font-family:'Roboto-Regular';
								font-size: 18px;
							}
						}
						.spec_border{
							border: 1px solid #D3AA53;
							border-radius: 9px;
						}
					}
				}
				.item_quantity{
					margin-top: 14px;
					.item_title{
						color: #727272;
						font-size: 20px;
						font-family:'Roboto-Regular';
						margin-bottom: 20px;
					}
					.quantity_block{
						display: flex;
						align-items: center;
						justify-content: space-between;
						.left_block{
							display: flex;
							align-items: center;
							.add_num{
								display: flex;
								.reduce{
									width: 40px;
									height: 40px;
									background: #2D2D2D;
									color: #D3AA53;
									font-family:'Roboto-Regular';
									display: flex;
									align-items: center;
									justify-content: center;
									font-size: 18px;
									cursor: pointer;
								}
								.num{
									width: 70px;
									height: 40px;
									font-size: 20px;
									border: 1px solid #2D2D2D;
									color: #FFFFFF;
									display: flex;
									font-family:'Roboto-Regular';
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
									font-family:'Roboto-Regular';
									align-items: center;
									justify-content: center;
									cursor: pointer;
								}
								
							}
							.item_price{
								display: flex;
								align-items: center;
								color: #D3AA53;
								font-family:'Roboto-Regular';
								margin-left: 29px;
								img{
									width: 30px;
									height: 30px;
									margin-right: 10px;
								}
								.price_num{
									font-size: 18px;
									span{
										font-size: 30px;
										font-family:'Roboto-Bold';
									}
								}
							}
						}
						.right_block{
							display: flex;
							align-items: center;
							justify-content: center;
							.item_btn{
								width: 163px;
								height: 58px;
								background: #D3AA53;
								border-radius: 25px;
								color: #000000;
								font-size: 18px;
								display: flex;
								font-family:'Roboto-Regular';
								align-items: center;
								justify-content: center;
								margin-right: 26px;
								cursor: pointer;
							}
							.shop_img{
								width: 60px;
								height: 58px;
								background: #AFAFAF;
								border-radius: 15px;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 28px;
								cursor: pointer;
								img{
									width: 31px;
									height: 32px;
								}
							}
						}
					}
				}
			}
		}
		.message{
			.message_nav{
				margin-top: 50px;
				div{
					display: inline-block;
					color: #898989;
					padding: 0 30px;
					font-size: 20px;
					font-family:'Roboto-Regular';
					border-right: 1px solid #7F7F7F;
					&:last-child{
						border: none;
					}
					&:first-child{
						padding-left: 0;
					}
				}
				.av{
				  color: #BF9D62;
				  font-family:'Roboto-Bold';
				}
			}
			.item_text_area{
				width: 90%;
				background-color: #0E0F11;
				padding-bottom: 120px;
				margin-bottom: 50px;
				margin-top: 24px;
				.description_text{
					padding-top: 40px;
					margin-left: 48px;
					margin-right: 100px;
					.text_title{
						color: #ffffff;
						font-size: 22px;
						font-family:'Roboto-Medium';
					}
					.text_area{
						color: #727272;
						font-size: 20px;
						font-family:'Roboto-Regular';
						margin-top: 27px;
						div{
							margin-bottom: 15px;
						}
					}
				}
				.where_text{
					margin: 55px 100px 0 48px;
					.text_title{
						color: #ffffff;
						font-family:'Roboto-Medium';
						font-size: 22px;
					}
					.text_area{
						margin-top: 27px;
						color: #727272;
						font-size: 20px;
						font-family:'Roboto-Regular';
					}
				}
				.term_text{
					margin-left: 48px;
					margin-right: 100px;
					margin-top: 65px;
					.text_title{
						color: #ffffff;
						font-family:'Roboto-Medium';
						font-size: 22px;
					}
					.text_area{
						color: #727272;
						font-size: 20px;
						margin-top: 27px;
						font-family:'Roboto-Regular';
						div{
							margin-bottom: 15px;
						}
					}
				}
				.content_bottom_right{
					display: flex;
					align-items: center;
					justify-content: flex-end;
					position: fixed;
					bottom: 25px;
					right: 120px;
					// .shop{
					// 	width: 85px;
					// 	height: 85px;
					// 	// background: #D3AA53;
					// 	border: 3px solid #ffffff;
					// 	border-radius: 43px;
					// 	display: flex;
					// 	justify-content: center;
					// 	align-items: center;
					// 	img{
					// 		width: 50px;
					// 		height: 40px;
					// 	}
						
					// }
					.shop{
						width: 130px;
						height: 130px;
						cursor: pointer;
						img{
							width: 130px;
							height: 130px;
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
							right: 120px;
							z-index: 9999;
						}
					}
					.chat{
						width: 85px;
						height: 85px;
						// border-radius: 42px;
						border-radius: 50%;
						background: rgba(14,15,17,0.5);
						border: 2px solid #2D2D2D;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: 10px;
						cursor: pointer;
						img{
							width: 60px;
							height: 60px;
						}	
					}
				}
			}//item_text_area
		}
	}
}
</style>
