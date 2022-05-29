<template>
	<div class="index">
		<div class="container">
			<!-- 加入哪个队伍 -->
			<div class="team_select_content">
				<div class="mark_cancel" v-if="update_up == true" @click.stop="update_up = false">
					<img src="@/assets/images/cancel.png" alt="">
				</div>
				<div class="mark_bac" v-if="update_up == true"></div>
				<div class="mark_popup_container" v-if="update_up == true">
					<div class="top_block">
						<div class="mark_top_head" >{{room_detail.roomName}}</div>
						<!-- <div class="mark_border"></div> -->
						<div class="mark_content">
							<div class="team">
								<div :class="team_index == ttem.no ? 'team_a' : 'team_b'" v-for="(ttem,tndex) in member_detail_list" @click="teamSelect(ttem.no)">Team {{ttem.no}}</div>
								<!-- <div :class="team_index == 2 ? 'team_a' : 'team_b'"  v-for="(ttem,tndex) in 3" @click="teamSelect(2)">Team B</div> -->
							</div>
							<div class="mark_foot"> 
								<div class="foot_right">
									<div class="foot_button" @click="sendBtn">Join</div>
								</div>
							</div>
						</div>
					</div>
				
				</div>
				
			</div>
			<!-- end -->
			
			<div class="content">
				<div class="content_top">
					<div class="rapic_head">
						<div class="rapic_head_tit">{{room_detail.roomName}}</div>
					</div>
					<div class="card_bottom">
						<div class="add_num">{{room_detail.players}}/{{room_detail.capacity}}</div>
						<div class="add_coin">{{room_detail.fee}} Coins</div>
						<div class="add_way">
							<img v-if="room_detail.isPublic == true" src="../../assets/images/open_lock.svg" />	<!-- public -->
							<img v-if="room_detail.isPublic == false" src="../../assets/images/lock.png" /> <!-- private -->
							<div class="text">{{room_detail.isPublic == true ? 'Public' :'Private'}}</div>
						</div>
						<div class="share_area">
							<img src="../../assets/images/share.svg" />
							<div class="text">Share</div>
						</div>
					</div>
				</div>
				<div class="content_info">
					<div class="info_top">
						<div class="mode">{{room_detail.gameMode}}</div>
						<div class="card_time">{{room_detail.planningPlayTime}}</div>
						<div class="best_of">Best of {{room_detail.bestOf}}</div>
					</div>
					<div class="terms_info">
						<div class="term_label">Terms and conditions</div>
						<div class="term_text">
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat 
							nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
						</div>
						<div class="show_more">Show more</div>
					</div>
					<div class="team_matching">
						<!-- 未匹配完成 -->
						<div class="team_area" >
							<div class="team_one" v-for="(item,index) in member_detail_list" :key="index">
								<div class="team_num">Team {{item.no}}</div>
								<div class="player_area">
									<div class="player_info" v-for="(utem,undex) in item.members" :key="undex">
										<div class="info_left">
											<el-image :src="HOST + utem.userInfo.avatar" class="avatar">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default.png" class="avatar"/>
												</div>
											</el-image>
											<!-- <img :src="HOST + utem.userInfo.avatar" class="avatar" v-if="utem.userInfo.avatar"/> -->
											<!-- <img src="../../assets/images/default.png" class="avatar" v-else/> -->
											<div class="player_name">{{utem.userInfo.fullName}}</div>
										</div>
										<div class="info_right">
											<img src="../../assets/images/dg.svg" v-if="utem.isReady"/>
										</div>
									</div>
									<div class="waiting_player" v-for="(gtem,gdex) in item.waiting" :key="gdex">
										<img src="../../assets/images/group_985.svg" />
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>
				<div v-if="!userId" class="btn_area">
					<div class="enter_btn" v-if="ready_up == false && start_status == false" @click="showJoinMsg">Join</div>
					<div class="back_btn" v-if="ready_up == false && start_status == false" @click="jump_gameItem">Cancel</div>
					<div class="enter_btn" v-if="ready_up == true" @click="changeStatus">Ready</div>
				</div>
				<div v-else  class="btn_area">
					<div class="enter_btn" @click="handleStart">Start</div>
				</div>
					
				<!-- <div class="btn_area">
					<div class="enter_btn" @click="update_up = true">Join</div>
					<div class="back_btn" >Cancel</div>
					<div class="enter_btn"  @click="changeStatus">Ready</div>
					<div class="enter_btn" @click="start"> Start</div>
				</div> -->
				
			</div>
		</div>
	</div>
</template>

<script>
	import {hostRoomList,startGame} from '@/api/league.js'
	export default{
		name:'room_item',
		inject:['reload'],
		data(){
			return{
				update_up:false,
				team_index:1,
				ready_up:false,
				start_status:false,
				password:'',
				roomId:'',
				gameId:'',
				room_detail:{}	,//房间详情
				member_detail_list:[],
				maxMembers:0,//队伍最多人数
				ws:null,//建立连接
				event:"",
				userId:false,
				websock: null, //建立的连接
				lockReconnect: false, //是否真正建立连接
				timeout: 28 * 1000, //30秒一次心跳
				timeoutObj: null, //心跳心跳倒计时
				serverTimeoutObj: null, //心跳倒计时
				timeoutnum: null, //断开 重连倒计时
				user_userId:sessionStorage.getItem('userId'),
				setEvenet:""
			}
		},
		mounted() {
			let that = this
			that.token = sessionStorage.getItem("token")
			that.roomId = that.$route.query.roomId
			that.gameId = that.$route.query.gameId
			that.password = that.$route.query.password
			let memberId = that.$route.query.userId
			let userIds = JSON.parse(sessionStorage.getItem("userinfo")).userId
			if(memberId == userIds){
				that.userId = true;
			}
			that.getRoom()
			// this.initWebsocket()
			// that.start_ws()
		},
		created() {
			//页面刚进入时开启长连接
			this.initWebSocket();
			// this.start_ws()
		},
		destroyed() {
			//页面销毁时关闭长连接
			this.websocketclose();
			// this.websocketonclose()
		},
		methods:{
			initWebSocket(){
				let Authorization = "Bearer"  + this.token;
				//测试服
				// this.websock = new WebSocket("ws://13.212.212.253/game/api/rc/lobby?roomId="+this.roomId+"&password="+this.password,Authorization)
				//正式服
				this.websock = new WebSocket("wss://api.bountee.com.my/api/rc/lobby?roomId="+this.roomId+"&password="+this.password,Authorization)
				//建立连接
				// this.websock = new WebSocket(wsuri);
				//连接成功
				this.websock.onopen = this.websocketonopen;
				//连接错误
				this.websock.onerror = this.websocketonerror;
				//接收信息
				this.websock.onmessage = this.websocketonmessage;
				//连接关闭
				this.websock.onclose = this.websocketclose;
			},
			//重新连接
			reconnect() {
			    var that = this;
			    if (that.lockReconnect) {
			        return;
			    }
				if(this.member_detail_list == '' || this.member_detail_list == null){
					this.ready_up == false
					this.start_status == false
				}else{
					for(let m in this.member_detail_list){
						console.log(this.user_userId,"userId")
						if(this.member_detail_list[m].userId != this.user_userId){
							this.ready_up == false
							this.start_status == false
						}
					}
				}
			    that.lockReconnect = true;
			      //没连接上会一直重连，设置延迟避免请求过多
			    that.timeoutnum && clearTimeout(that.timeoutnum);
			    that.timeoutnum = setTimeout(function () {
			        //新连接
			        that.initWebSocket();
			        that.lockReconnect = false;
			    }, 5000);
			},
			//重置心跳
			reset() {
			    var that = this;
			    //清除时间
			    clearTimeout(that.timeoutObj);
			    clearTimeout(that.serverTimeoutObj);
			    //重启心跳
			    that.start();
			},
			//开启心跳
			start() {
				var self = this;
				self.timeoutObj && clearTimeout(self.timeoutObj);
				self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
				self.timeoutObj = setTimeout(function () {
					//这里发送一个心跳，后端收到后，返回一个心跳消息，
					if (self.websock.readyState == 1) {
					//如果连接正常
						let arr = {
							event:self.setEvenet
						}
						self.websock.send(JSON.stringify(arr))
						// self.websock.send(
						// 	'{"toUserId":"' + self.$route.query.telphone + '"}'
						// );
						// console.log("发送消息");
					} else {
						//否则重连
						self.reconnect();
					}
					self.serverTimeoutObj = setTimeout(function () {
						//超时关闭
						self.websock.close();
					}, self.timeout);
				}, self.timeout);
			},
			//连接成功事件
			websocketonopen() {
				//提示成功
				// console.log("连接成功", 3);
				//开启心跳
				this.start();
			},
			//连接失败事件
			websocketonerror(e) {
				//错误
				// console.log("WebSocket连接发生错误");
				//错误提示
				// console.log("Websocket error, Check you internet!");
				//重连
				this.reconnect();
			},
			//连接关闭事件
			websocketclose(e) {
				//关闭
				// console.log("connection closed (" + e + ")");
				// console.log('websocket断开', + e.code + '' + e.reason+ ''+ e.wasClean)
				//提示关闭
				// console.log("连接已关闭", 3);
				//重连
				this.reconnect();
			},
			//接收服务器推送的信息
			websocketonmessage(data) {
				//打印收到服务器的内容
				//数据接收
				// let that = this;
				// const redata = JSON.parse(event.data);
				// console.log(redata,"数据接收");
				// let arr = JSON.parse(data.data)
				let arr = JSON.parse(data.data)
				let {event} = arr;
				let datas = arr.data
				// 获取后端的内容
				if(event == "SERVER_ROOM_DETAIL"){
					// 进入房间
					for(let a = 0; a < datas.length; a++){
						datas[a]['waiting'] = 0
					}
					let member_detail_list =  datas
					for(let b = 0; b < member_detail_list.length; b++){
						var {members,maxMembers,} = member_detail_list[b]
						if(members.length != 0){
							member_detail_list[b].waiting = maxMembers - members.length
						}else{
							member_detail_list[b].waiting = maxMembers
						}
					}
					this.member_detail_list = member_detail_list
					// console.log(this.member_detail_list)
					// this.setEvenet = "SERVER_ROOM_DETAIL"
				}else if(event == "SERVER_TEAM_DETAIL"&&event != "CLIENT_READY_TO_GAME"){
					// 选择队伍更新数据
					let member_detail_list = this.member_detail_list;
					for(let i = 0 ; i < this.member_detail_list.length; i++){
						if(this.member_detail_list[i]['no'] == datas.no){
							this.$set(this.member_detail_list, i, datas)
						}
					}
					for(let b = 0; b < member_detail_list.length; b++){
						var {members,maxMembers,} = member_detail_list[b]
						if(members.length != 0){
							member_detail_list[b].waiting = maxMembers - members.length
						}else{
							member_detail_list[b].waiting = maxMembers
						}
					}
					this.member_detail_list = member_detail_list
					// console.log(this.member_detail_list)
					// this.setEvenet = "SERVER_TEAM_DETAIL"
				}else if(event == "CLIENT_READY_TO_GAME"){
					for(let i = 0 ; i < this.member_detail_list.length; i++){
						if(this.member_detail_list[i]['no'] == datas.no){
							this.$set(this.member_detail_list, i, datas)
						}
					}
					this.setEvenet = "CLIENT_READY_TO_GAME"
				}
				// console.log(this.setEvenet)
				// console.log(data.data,"datadata")
				//收到服务器信息，心跳重置
				this.reset();
			},
			
			//向服务器发送信息
			// websocketsend(msg) {
			// 	//数据发送
			// 	this.websock.send(msg);
			// },
			
			// reconnect() {//重新连接
			// 	var that = this;
			// 	if(that.lockReconnect) {
			// 		return;
			// 	};
			// 	that.lockReconnect = true;
			// 	//没连接上会一直重连，设置延迟避免请求过多
			// 	that.timeoutnum && clearTimeout(that.timeoutnum);
			// 	that.timeoutnum = setTimeout(function () {
			// 		  //新连接
			// 		  that.start_ws();
			// 		  that.lockReconnect = false;
			// 	},4000);
			// },
			// reset(){//重置心跳
			// 	var that = this;
			// 	//清除时间
			// 	clearTimeout(that.timeoutObj);
			// 	clearTimeout(that.serverTimeoutObj);
			// 	//重启心跳
			// 	that.start();
			// },
			// start(){//开启心跳
			// 	var self = this;
			// 	self.timeoutObj && clearTimeout(self.timeoutObj);
			// 	self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
			// 	self.timeoutObj = setTimeout(function(){
			// 	  //这里发送一个心跳，后端收到后，返回一个心跳消息，
			// 		if (self.ws.readyState == 1) {//如果连接正常
			// 			self.ws.send("heartCheck");
			// 			console.log("heartCheck")
			// 		}else{//否则重连
			// 			self.reconnect();
			// 		}
			// 		self.serverTimeoutObj = setTimeout(function() {
			// 			//超时关闭
			// 			self.ws.close();
			// 		}, self.timeout);
			// 	}, self.timeout)
			// }, 
			// start_ws(){
			// 	// 打开
			// 	let Authorization = "Bearer"  + this.token;
			// 	// let Authorization = this.token;
			// 	// this.ws = new WebSocket("ws://13.212.212.253/game/api/rc/lobby?roomId="+this.roomId+"&password="+this.password,Authorization)
			// 	this.ws = new WebSocket("wss://api.bountee.com.my/api/rc/lobby?roomId="+this.roomId+"&password="+this.password,Authorization)
			// 	// this.ws = new ReconnectingWebSocket("ws://13.212.212.253/game/api/rc/lobby?roomId="+this.roomId+"&password="+this.password,Authorization)
			// 	const ws = this.ws
			// 	ws.onopen = e => {
			// 		// 连接后监听
			// 		console.log("获取数据")
			// 		console.log(`WebSocket 连接状态： ${ws.readyState}`)
			// 		this.ready_up = false
			// 		this.start_status = false
			// 		//开启心跳
			// 		this.start()
			// 		//  首次页面加载的时候，则需要监听websoket的状态是不是处于open状态
			// 		// 判断websocket的连接状态，当未 1 时，证明连接成功，方可发起请求
			// 		// if (ws.readyState === 1) {
			// 		//     // let sendStr = JSON.stringify(attr) + '\n'
			// 		//     ws.send("sendStr")
			// 		// }
			// 		// //  首次页面加载的时候，则需要监听websoket的状态是不是处于open状态
			// 		// ws.addEventListener('open', function () {
			// 		//     // let sendStr = JSON.stringify(attr) + '\n'
			// 		//    ws.send("sendStr")
			// 		// })
			// 	}  
			// 	ws.onmessage = data => { 
			// 		let arr = JSON.parse(data.data)
			// 		let {event} = arr;
			// 		let datas = arr.data
			// 		// 获取后端的内容
			// 		if(event == "SERVER_ROOM_DETAIL"){
			// 			// 进入房间
			// 			for(let a = 0; a < datas.length; a++){
			// 				datas[a]['waiting'] = 0
			// 			}
			// 			let member_detail_list =  datas
			// 			for(let b = 0; b < member_detail_list.length; b++){
			// 				var {members,maxMembers,} = member_detail_list[b]
			// 				if(members.length != 0){
			// 					member_detail_list[b].waiting = maxMembers - members.length
			// 				}else{
			// 					member_detail_list[b].waiting = maxMembers
			// 				}
			// 			}
			// 			this.member_detail_list = member_detail_list
			// 		}else if(event == "SERVER_TEAM_DETAIL"&&event != "CLIENT_READY_TO_GAME"){
			// 			// 选择队伍更新数据
			// 			let member_detail_list = this.member_detail_list;
			// 			for(let i = 0 ; i < this.member_detail_list.length; i++){
			// 				if(this.member_detail_list[i]['no'] == datas.no){
			// 					this.$set(this.member_detail_list, i, datas)
			// 				}
			// 			}
			// 			for(let b = 0; b < member_detail_list.length; b++){
			// 				var {members,maxMembers,} = member_detail_list[b]
			// 				if(members.length != 0){
			// 					member_detail_list[b].waiting = maxMembers - members.length
			// 				}else{
			// 					member_detail_list[b].waiting = maxMembers
			// 				}
			// 			}
			// 			this.member_detail_list = member_detail_list
			// 		}else if(event == "CLIENT_READY_TO_GAME"){
			// 			for(let i = 0 ; i < this.member_detail_list.length; i++){
			// 				if(this.member_detail_list[i]['no'] == datas.no){
			// 					this.$set(this.member_detail_list, i, datas)
			// 				}
			// 			}
			// 		}
			// 		console.log(data.data,"datadata")
			// 		console.log(data.data.byteLength,"byteLength");
			// 		//收到服务器信息，心跳重置
			// 		this.reset();
			// 	}
			// 	ws.onclose = data => {
			// 		// 监听连接关闭  
			// 		console.log("WebSoket连接已关闭")
			// 		console.log('websocket断开', + data.code + '' + data.reason+ ''+ data.wasClean)
			// 		console.log(data,"closedata")
			// 		this.ready_up = false
			// 		this.start_status = false
			// 		// if (this.roomId != '' || this.roomId != null || this.roomId != undefined) {
			// 		// 	setTimeout(() => {
			// 		// 		console.log("有到你吗")
			// 		// 		// this.start_ws();
			// 		// 		this.reconnect();
			// 		// 	}, 2000);
			// 		// }
			// 	   //重连
			// 		this.reconnect();
			// 		// this.start();
			// 		// console.log(data);
			// 	}
			// 	ws.onerror = function () {
			// 		// 报错
			// 		console.log("ws连接异常，请稍候重试")
			// 		// Message.error('ws连接异常，请稍候重试')
			// 		// errorCallback()
			// 		// this.start_ws()
			// 		 //重连
			// 		 this.reconnect();
			// 	}
			// },
			
			//加入哪支队伍
			sendBtn(){
				// let ws = this.ws;
				let ws = this.websock;
				// 点击发送按钮。将数据发送给服务端
				let arr = {
					data:this.team_index,
					event:"CLIENT_JOIN_TEAM"
				}
				ws.send(JSON.stringify(arr))
				this.ready_up = true;
				this.start_status = true;
				this.update_up = false;
				this.setEvenet = "CLIENT_JOIN_TEAM"
				//收到服务器信息，心跳重置
				// this.reset();
				// this.start()
			},
			//点击ready
			changeStatus(){
				// let ws = this.ws;
				let ws = this.websock;
				// 点击发送按钮。将数据发送给服务端
				let arr = {
					event:"CLIENT_READY_TO_GAME"
				}
				this.event = "CLIENT_READY_TO_GAME"
				this.setEvenet = "CLIENT_READY_TO_GAME"
				// console.log(this.event)
				ws.send(JSON.stringify(arr))
				//收到服务器信息，心跳重置
				this.reset();
				// this.start()
				
			},
			showJoinMsg(){
				let that = this
				if(that.member_detail_list == '' || that.member_detail_list == null || that.member_detail_list == undefined){
					that.$message({
						type:'warning',
						message:'Loading....'//加载中，请稍等
					})
				}else{
					that.update_up = true
				}
			},
			//主持人开始房间
			handleStart(){
				sessionStorage.setItem("member_detail_list", JSON.stringify(this.member_detail_list))
				// console.log(sessionStorage.getItem("member_detail_list"))
				let that = this;
				startGame({
					roomId:that.roomId
				}).then(res => {
					this.$message({
						message: "Game started",
						type: 'success'
					});
					setTimeout(function(){
						that.$router.push({path: '/order/host_level'})
					},1500)
				})
			},
			getRoom(){
				hostRoomList().then(res => {
					for(let i = 0; i < res.data.list.length;i++){
						if(this.roomId == res.data.list[i].roomId){
							this.room_detail = res.data.list[i]
						}
					}
				})
			},
			teamSelect(no){
				this.team_index = no
				// console.log(this.team_index)
			},
			join_team(){
				this.update_up = false
				this.ready_up = true
			},
			jump_gameItem(){
				this.$router.go(-1); //返回上一层
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.container{
		width: calc(100% - 140px);
		padding-bottom: 50px;
		margin-left: 70px;
		.team_select_content{
			position: absolute;
			// position: fixed;
			z-index: 99;
			top: 5px;
			.mark_cancel{
				// position: absolute;
				position: fixed;
				right: 80px;
				top: 140px;
				img{
					width: 46px;
					height: 46px;
					cursor: pointer;
				}
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
			.mark_popup_container{
				position: fixed;
				// position: fixed;
				// left: 26%;
				left:28%;
				top:28%;
				z-index: 99;
				.top_block{
					padding: 50px 119px;
					// background: #0E0F11;
					background-color: #1D2023;
					border-radius: 32px;
					overflow: hidden;
					.mark_top_head{
						font-size: 24px;
						color:#E5A518 ;
						font-family:'Quicksand-Bold';
						text-align: center;
						margin-bottom: 15px;
					}
					.mark_content{
						margin-top: 55px;
						.team{
							width: 700px;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-wrap: wrap;
							.team_a{
								width: 281px;
								height: 130px;
								background: #000000;
								border: 2px solid #C69B58;
								border-radius: 20px;
								font-size: 24px;
								color:#FFFFFF;
								font-family:'Roboto-Bold';
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 52px;
								margin-bottom:30px;
								margin: auto;
							}
							.team_b{
								width: 281px;
								height: 130px;
								background: #000000;
								border: 2px solid #000000;
								border-radius: 20px;
								font-size: 24px;
								color:#FFFFFF;
								font-family:'Roboto-Bold';
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 52px;
								margin-bottom:30px;
								margin: auto;
							}
						}
						.mark_foot{
							margin-top: 109px;
							margin-bottom: 20px;
							.foot_right{
								margin: 0 auto;
								width: 163px;
								height: 58px;
								color: #0E0F11;
								line-height: 58px;
								font-size: 20px;
								cursor: pointer;
								text-align: center;
								background: #E5A518;
								border-radius: 25px;
							}
						}
					}
				}
			}
			
		}
		
		.content{
			.content_top{
				.rapic_head{
					text-align: center;
					// margin-bottom: 50px;
					margin: 44px 0 25px;
					.rapic_head_tit{
						color: #DBA83F;
						font-size: 24px;
						font-weight: bold;
						font-family:'Quicksand-Bold';
					}
				}
				.card_bottom{
					width: 100%;
					// background-color: #F0C674;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FFFFFF;
					font-size: 18px;
					font-family:'Roboto-Regular';
					position: relative;
					// text-align: center;
					// margin: 0 auto;
					.add_num{
						// width: 30%;
					}
					.add_coin{
						// width: 30%;
						margin: 0 65px 0 76px;
					}
					.add_way{
						// width: 30%;
						display: flex;
						align-items: flex-end;
						img{
							width: 18px;
							height: 26px;
						}
						.text{
							margin-left: 9px;
						}
					}
					.share_area{
						position: absolute;
						right: 50px;
						display: flex;
						align-items: center;
						img{
							width: 31px;
							height: 31px;
						}
						.text{
							color: #DBA83F;
							font-family:'Roboto-Regular';
							font-size: 18px;
							margin-left: 15px;
						}
					}
				}
			}
			.content_info{
				// width: 1588px;
				width: 95%;
				height: 881px;
				background: #0E0F11;
				border-radius: 19px;
				margin-top: 26px;
				padding: 33px 30px;
				.info_top{
					padding-bottom: 20px;
					border-bottom: 2px solid #2D2D2D;
					.mode{
						color: #FFFFFF;
						font-size: 22px;
						font-family:'Roboto-Medium';
						margin-bottom: 10px;
					}
					.card_time{
						color: #727272;
						font-size: 20px;
						font-family:'Roboto-Regular';
						margin-bottom: 10px;
					}
					.best_of{
						color: #FFFFFF;
						font-size: 22px;
						font-family:'Roboto-Medium';
						// margin-bottom: 10px;
					}
				}
				.terms_info{
					margin-top: 30px;
					padding-bottom: 20px;
					border-bottom: 2px solid #2D2D2D;
					.term_label{
						color: #FFFFFF;
						font-size: 22px;
						font-family:'Roboto-Medium';
						margin-bottom: 10px;
					}
					.term_text{
						color: #7F7F7F;
						font-family:'Roboto-Regular';
						font-size: 20px;
						
					}
					.show_more{
						color: #DBA83F;
						font-size: 20px;
						font-family:'Roboto-Bold';
						margin-top: 25px;
					}
				}
				.team_matching{
					display: flex;
					justify-content: center;
					.team_area{
						margin-top: 80px;
						display: flex;
						align-items: center;
						.team_one{
							width: 300px;
							text-align: center;
							margin-left: 92px;
							.team_num{
								color: #FFFFFF;
								font-family:'Roboto-Bold';
								font-size: 22px;
								margin-bottom: 15px;
							}
							.player_area{
								width: 299px;
								height: 346px;
								background: #1D2023;
								border-radius: 18px;
								// padding: 0 24px;
								.player_info{
									display: flex;
									align-items: center;
									justify-content: space-between;
									height: 57px;
									line-height: 57px;
									border-bottom: 1px solid #2D2D2D;
									// margin: 0 24px;
									.info_left{
										display: flex;
										align-items: center;
										margin-left: 24px;
										.avatar{
											width: 33px;
											height: 33px;
										}
										.player_name{
											color: #999999;
											font-family:'Roboto-Regular';
											font-size: 18px;
											margin-left: 24px;
											cursor: pointer;
										}
										.me{
											color: #DBA83F;
											span{
												color: #999999;
											}
										}
									}
									.info_right{
										display: flex;
										align-items: center;
										img{
											width: 23px;
											height: 23px;
											margin-right: 21px;
										}
									}
									
								}
								.waiting_player{
									height: 57px;
									line-height: 57px;
									text-align: center;
									border-bottom: 1px solid #2D2D2D;
								}
								
							}
						}
					}
				}
			}
			.btn_area{
				margin-top: 70px;
				display: flex;
				align-items: center;
				justify-content: center;
				.enter_btn {
					width: 163px;
					height: 58px;
					line-height: 58px;
					background-color: #DBA83F ;
					border-radius: 25px;
					text-align: center;
					color: #000;
					font-size: 18px;
					font-family:'Roboto-Regular';
					cursor: pointer;
				}
				.back_btn {
					width: 163px;
					height: 58px;
					line-height: 58px;
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
</style>
