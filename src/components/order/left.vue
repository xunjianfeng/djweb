<template>
  <div class="index">
    <div class="container">
      <div class="content_left">
        <div class="content_left_avatar">
			<!-- <el-image :src="HOST + top_user_info.avatar" class="avatar">
				<div slot="error" class="image-slot">
					<img src="../../assets/images/default.png" class="default_img"/>
				</div>
			</el-image> -->
          <img  :src="(top_user_info.avatar == null || top_user_info.avatar == '' || top_user_info.avatar == undefined) ? default_avatar : HOST + top_user_info.avatar"  class="avatar" alt="">
          <div class="content_left_text">
			  <el-tooltip class="item" effect="dark" :content="top_user_info.fullName" placement="bottom">
			    <p >{{top_user_info.fullName}}</p>
			  </el-tooltip>
            <img  src="@/assets/images/yg.png" alt="">
          </div>
          <p class="text_uid">UID {{top_user_info.userId}}</p>
        </div>
        <div class="content_left_col">
			<p :class="nav==1?'av':''" @click="navs(1)">Personal Information</p>
			<p :class="nav==11?'av':''" @click="navs(11)">My Referral</p>
			<p :class="nav==2?'av':''" @click="navs(2)">Security</p>
			<p :class="nav==3?'av':''" @click="navs(3)">Played Game</p>
			<!-- 隐蔽项start -->
			<!-- <p :class="nav==4?'av':''" @click="navs(4)">My Order</p> -->
			<!-- 隐蔽项end -->
			<p :class="nav==5?'av':''" @click="navs(5)">Membership</p>
			<p :class="nav==6?'av':''" @click="navs(6)">Friend List</p>
			<!-- 隐蔽项start -->
			<!-- <p :class="nav==7?'av':''" @click="navs(7)">My Followers | Following</p> -->
			<!-- 隐蔽项end -->
			<p :class="nav==8?'av':''" @click="navs(8)">Achievements</p>
			<!-- 隐蔽项start -->
			<!-- <p :class="nav==9?'av':''" @click="navs(9)">My Redemption</p> -->
			<!-- 隐蔽项end -->
			<p :class="nav==10?'av':''" @click="navs(10)">Setting</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {
  },
  props: ['index'],
  data() {
    return {
        nav:this.index,
		top_user_info:'', //用户信息
		default_avatar:require("../../assets/images/default.png"),
    };
  },
  mounted() {
	  this.top_user_info = JSON.parse(sessionStorage.getItem("userinfo"))
  },
  methods: {
      navs(index){
		if(index == 1){
			if(this.top_user_info.vipLevel == 'NA'){
				this.$router.push({path:'/center/personal'})
			}else{
				this.$router.push({path:'/center/profile'})
			}
		}else if(index == 2){
			this.$router.push({path:'/security/index'})
		}else if(index == 3){
			this.$router.push({path:'/played/tounament'})
		}else if(index == 4){
			this.$router.push({path:'/order/my_order'})
		}else if(index == 5){
			this.$router.push({path:'/membership/membership_plans'})
		}else if(index == 6){
			this.$router.push({path:'/friend_list/my_friend'})
		}else if(index == 7){
			this.$router.push({path:'/followers/following'})
		}else if(index == 8){
			this.$router.push({path:'/achievement/achievement'})
		}else if(index == 9){
			this.$router.push({path:'/followers/my_redemption'})
		}else if(index == 10){
			this.$router.push({path:'/order/setting'})
		}
        else if(index == 11){
            this.$router.push({path:'/referral/index'})
        }
    }
  }
};
</script>
<style lang="less" scoped>
.container{
  .content_left{
    width: 318px;
    height: 913px;
    background: #0E0F11;
    margin-top: 125px;
    border-radius: 50px;
    .content_left_avatar{
      width:90%;
      margin: 0 auto;
      text-align: center;
      border-bottom: 2px solid #2D2D2D;
      padding-bottom: 20px;
      .avatar{
        width: 140px;
		height: 140px;
        margin-top: -45px;
		border-radius: 16px;
		// background-color: #ff0;
		.default_img{
			width: 140px;
			height: 140px;
			text-align: center;
		}
      }
      .content_left_text{
        width: 100%;
        text-align: center;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
		font-family:'Roboto-Medium';
        p{
			max-width: 200px;
			float: left;
		  // background-color: #FFF000;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 22px;
        }
        img{
          width: 15px;
          float: left;
          margin-left: 10px;
        }
      }
      .text_uid{
        color: #727272;
        padding: 0 ;
        margin: 0;
		font-family:'Roboto-Regular';
		font-size: 20px;
      }
    }
    .content_left_col{
      width: 90%;
      margin: 0 auto;
	  font-family:'Quicksand-Bold';
      p{
          cursor: pointer;
        height: 50px;
        border-radius: 18px;
        color: #9B9B9B;
        line-height: 50px;
        padding-left: 20px;
        font-size: 16px;
      }
      .av{
        background: #1D2023;
        color: #D3AA53;
      }
    }
  }
}
</style>
