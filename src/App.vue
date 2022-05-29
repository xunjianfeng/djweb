<template>
  <div id="app">
    <LeftView v-if="route_status == true" ref="leftnav" ></LeftView>
	<TopView :return_status="return_status" v-if="route_status == true" ref="topnav" @agin_nav = "aginNav" ></TopView>
    <router-view :class="route_status == true ?'route':'' " v-if="isRouterAlive" @topRefresh="topRefresh" />
  </div>
</template>

<script>
function fetch() {
  return new Promise(resolve => {
    console.log('---- Only console on the server ----')
    setTimeout(() => {
      resolve({
        code: 0,
        data: { foo: 1 }
      })
    }, 200)
  })
}
import LeftView from '@/components/left'
import TopView from '@/components/top'
export default {
  name: 'app',
  components:{
    LeftView,
	TopView
  },
  provide(){
	 return{
		  reload: this.reload
	 }
  },
  data () {
    return {
      res: {},
	  route_status:true,
	  return_status:1,
	  isRouterAlive:true

    }
  },
  methods:{
	reload(){
		this.isRouterAlive = false
		this.$nextTick(function(){
			this.isRouterAlive = true
		})
	},
	topRefresh(){	//当客户购买完毕商品时，执行该事件向顶部导航发送事件刷新余额
		this.$refs.topnav.refreshmoney()
	},
	aginNav(){
		this.$refs.leftnav.refreshnav()
	}
  },
  // 设置刷新页面后按钮不会消失
  beforeMount(){
	if(this.$route.path == '/tournament/regis_Information' || this.$route.path == '/redemption/top_up' || this.$route.path =='/companion/description'
	|| this.$route.path	== '/redemption/item_detail' || this.$route.path == '/tournament/filter_game' || this.$route.path == '/league/game_item' ||
	this.$route.path == '/league/teams' || this.$route.path == '/league/fixtures' || this.$route.path == '/league/standing'|| this.$route.path == '/league/results'
	|| this.$route.path == '/league/transfer' || this.$route.path == '/league/info' || this.$route.path == '/league/top_players' ||
	this.$route.path == '/league/highlights' || this.$route.path == '/tearm/team_about' || this.$route.path == '/tearm/application_list' ||
	this.$route.path == '/tearm/tour_upcoming' || this.$route.path == '/tearm/team_announcement' || this.$route.path == '/league/room_item' ||
	this.$route.path == '/tournament/bracketm' || this.$route.path == '/tournament/participantm' || this.$route.path == '/tournament/Informationsm' ||
	this.$route.path == '/tournament/standingsm' || this.$route.path == '/tearm/team_info' ||  this.$route.path == '/order/edit_info' ||
	this.$route.path == '/membership/current_plan_one' || this.$route.path == '/security/replace_password' || this.$route.path == '/security/replace_passwordTwo'
	|| this.$route.path == '/friend_list/view_profile_two' || this.$route.path == '/achievement/achieved' || this.$route.path == '/redemption/my_cart' || this.$route.path == '/mailbox/info'
	){
		this.return_status = 2
	}
  },
  watch:{
    // 监听路由变化 登录相关页面不需要头部和底部组件 去除  开始
    $route (to, from) {
		let that = this;
		console.log(to.path)
		if(to.path == '/login/index' ){
			that.route_status = false
		}else{
			that.route_status = true
			if ( !sessionStorage.getItem("token") ) {
				if(to.path != '/tournament/regis_Information' && to.path != '/security/forget_password'){
					this.$message({
						showClose: true,
						message: 'Please log in',
						type: 'error'
					});
					this.$router.push({ path: '/login/index'})
				}else{

				}

			}
		}
		// 判断哪些页面不需要显示Back按钮   1隐藏   2 显示
		if(to.path == '/login/index' || to.path == '/companion/index' || to.path == '/redemption/redemption' || to.path == '/'|| to.path == '/tournament/registration'
		|| to.path == '/corner/corner_operate' || to.path == '/corner/support' || to.path == '/center/profile' || to.path == '/order/wallet'|| to.path == '/order/host'
		|| to.path == '/center/personal' || to.path == '/security/index' || to.path == '/order/my_order' || to.path == '/membership/membership_plans'
		|| to.path == '/followers/following'|| to.path == '/achievement/achievement'|| to.path == '/followers/my_redemption' || to.path == '/order/setting'
		|| to.path == '/membership/current_plan'|| to.path == '/friend_list/to_comfirm'|| to.path == '/followers/my_followers'|| to.path == '/followers/search'
		|| to.path == '/friend_list/search_send' || to.path == '/order/apply'|| to.path == '/order/apply_03'|| to.path == '/order/apply_04'|| to.path == '/tearm/my_join_team'
		|| to.path == '/mailbox/index' || to.path == '/redemption/task' || to.path == '/tournament/index'|| to.path == '/tournament/history' || to.path == '/center/companion'
		|| to.path == '/center/game'  || to.path == '/league/predict_and_win' || to.path == '/league/league' || to.path == '/league/rapid_challenge' || to.path == '/played/tounament'
		|| to.path == '/played/rapic_challenge'|| to.path == '/played/predict_win'|| to.path == '/friend_list/my_friend' || to.path == '/center/update_data'|| to.path == '/friend_list/to_comfirm'
		  || to.path == '/order/apply_success_02' || to.path == '/order/host_level' || to.path == '/league/game_item'||to.path == '/ranking/index'){
			that.return_status = 1
		}else{
			// sessionStorage.setItem("return_status", 2)
			that.return_status = 2
			// that.return_status = sessionStorage.getItem("return_status")
			// console.log(that.return_status)
		}
    }
  },
  mounted() {
	 let that = this;
	// 判断路由为login/index  页面去掉全局组件
	if(that.$route.path == '/login/index'){
		that.route_status = false
	}else{
		that.route_status = true
		if ( !sessionStorage.getItem("token") ) {
			if(that.$route.path  != '/tournament/regis_Information' && that.$route.path  != '/security/forget_password'){
				this.$message({
					showClose: true,
					message: 'Please log in',
					type: 'error'
				});
				this.$router.push({ path: '/login/index'})
			}else{

			}
		}
	}
  },
  needSerialize: true,
  async created() {
    // this.res = await fetch()
	// console.log('.....Created.....')
	this.$router.beforeEach((to, from, next) => {
	 //    console.log(to);
		// console.log(from);
		// console.log(next);
	    next();
	});

  },
}
</script>
<style>
	@import url("common/font/font.css");
input,textarea,select,button{
	outline:none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
body{
  background: #1D2023;
  margin: 0 0 !important;
}
audio{
		outline:none;
	}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
}
input[type="number"]{
	-moz-appearance: textfield;
}

.route {
     position: fixed;
	/* position: absolute; */
    top: 121px;
    left: 200px;
    height: calc(100vh - 120px);
	/* height: 1200px; */
    width: calc(100% - 200px);
    /* overflow: scroll; */
	overflow-x: hidden;
	overflow-y: scroll;
  }

  /* 大于1080px小于1920px的时候执行下面的CSS。 */
  @media screen and (min-width:1080px) and (max-width:1919px) {
    .route {
     /* height: 100vh;
      zoom: 0.9; */
    }
  }

  .route::-webkit-scrollbar {
    /* display: none; */
    /* Chrome Safari */
  }
  .route::-webkit-scrollbar {
  	/*滚动条整体样式*/
  	width: 10px;
  	/*高宽分别对应横竖滚动条的尺寸*/
  	/* height: 1px; */
  }

  .route::-webkit-scrollbar-thumb {
  	/*滚动条里面小方块*/
  	border-radius: 10px;
  	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  	background: #000000;
	/* background: #1D2023; */
  }

  .route::-webkit-scrollbar-track {
  	/*滚动条里面轨道*/
  	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  	border-radius: 10px;
  	background: #2D2D2D;
	/* background: #000000; */
  }
</style>
