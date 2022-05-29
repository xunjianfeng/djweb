<template>
  <div class="index">
    <div id="top">
      <!--提示完善信息-->
      <div class="mark_bac"
           v-if="left_mark_up == true">
        <div class="mark_cancel"
             v-if="left_mark_up == true"
             @click.stop="left_mark_up = false">
          <img class="cancel_img"
               src="@/assets/images/cancel.png">
        </div>
        <div class="mark_Top_container"
             v-if="left_mark_up == true">
          <div class="mark_my_content ">
            <div class="mark_text_one">Please complete your information first</div>
            <div class="mark_text_two">Before operating this function, you need to complete your information</div>
          </div>
          <div class="mark_my_foot">
            <div class="mark_foot_button"
                 @click="jupm_later">Go to complete my profile ></div>
          </div>
        </div>
      </div>
      <!-- 弹窗end -->
      <div class="top">
        <div class="top_back"
             @click="back"
             v-if="return_status_back == 2">
          <img src="../assets/images/turn_left.png"
               alt="">
          BACK
        </div>
        <div class="lorem">
          <img src="@/assets/images/icon6.png"
               class="lorem_img">
          <marquee direction="right"
                   scrollAmount="3">{{messageTitle}}</marquee>
          <!-- <el-tooltip class="item" effect="dark" :content="msg_list[0].messageTitle" placement="bottom">
						<p>{{msg_list[0].messageTitle}}</p>
					</el-tooltip> -->
          <!-- <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tinci</p> -->
        </div>
        <div class="user"
             @click="reset">
          <div class="user_icon">
            <!-- 隐蔽项start-目前已打开 -->
            <el-tooltip class="item"
                        effect="dark"
                        content="Top Up"
                        placement="bottom">
              <div class="user_icon_col"
                   @click="jump_center(2)">
                <img :src="select_index == 2? select_recharge:recharge">
              </div>
            </el-tooltip>
            <!-- 隐蔽项end-->
            <el-tooltip class="item"
                        effect="dark"
                        content="Task"
                        placement="bottom">
              <div class="user_icon_col"
                   @click="jump_center(3)">
                <img :src="select_index == 3? select_task:task">
              </div>
            </el-tooltip>
            <el-tooltip class="item"
                        effect="dark"
                        content="Notifications"
                        placement="bottom">
              <div class="user_icon_col"
                   :class="{redPoint:notificatNews}"
                   @click="jump_center(4)">
                <img :src="select_index == 4? select_news:news">
              </div>
            </el-tooltip>
            <el-tooltip class="item"
                        effect="dark"
                        content="Team"
                        placement="bottom">
              <div class="user_icon_col"
                   :class="{redPoint:teamNews}"
                   @click="jump_center(5)">
                <img :src="select_index == 5? select_team:team">
              </div>
            </el-tooltip>
          </div>
          <div class="user_info"
               @click="jump_center(1)">
            <div :class="{avatarRedPoint:friendNews}">
              <el-image :src="HOST + top_user_info.avatar"
                        class="user_info_img">
                <div slot="error"
                     class="image-slot">
                  <img src="../assets/images/default.png"
                       class="default_img" />
                </div>
              </el-image>
            </div>

            <div class="user_info_text">
              <div class="user_info_top">
                <el-tooltip class="item"
                            effect="dark"
                            :content="top_user_info.fullName"
                            placement="bottom">
                  <div class="user_info_id">{{top_user_info.fullName}}</div>
                </el-tooltip>
                <!-- <div style="color:#7C7C7C;font-size: 16px;margin-left: 10px;font-family:'Roboto-Regular';">({{top_user_info.countryCode || 'UID' }}{{top_user_info.userId}})</div> -->
                <div class="uid_text">({{top_user_info.countryCode || 'UID' }}{{top_user_info.userId}})</div>
              </div>
              <div class="user_text_name">
                <!-- coins隐蔽项start-目前已打开-->
                {{top_user_info.coin||0}} Coins
                <div class="user_name_border"></div>
                <!-- coins隐蔽end-->
                <span>{{top_user_info.point || 0}}Points</span>
              </div>
            </div>
          </div>
          <!-- 判断是否为会员 -->
          <el-tooltip class="item"
                      effect="dark"
                      :content="top_user_info.vipLevel+' '+'Member'"
                      placement="bottom"
                      v-if="top_user_info.vipLevel == 'PRO MAX'">
            <img src="../assets/images/icon10.png"
                 class="crown_img">
          </el-tooltip>
          <el-tooltip class="item"
                      effect="dark"
                      :content="top_user_info.vipLevel+' '+'Member'"
                      placement="bottom"
                      v-else>
            <img src="../assets/images/icon_10_gray.png"
                 class="crown_img"
                 @click="hover_status1=!hover_status1" />
          </el-tooltip>
          <img src="@/assets/images/set.png"
               class="set_img"
               @click.stop="hover_up">
        </div>
        <!-- hover弹窗 -->
        <div class="set_hover"
             v-if="hover_status">
          <div class="corner_text"
               @click="jump_corner(1)">FAQ</div>
          <div class="corner_text"
               @click="jump_corner(2)">Help/Resources/Tutorials</div>
          <div class="corner_text"
               @click="jump_corner(3)">Report an abuse/Support</div>
          <div class="corner_out"
               @click="jump_corner(4)">Log Out</div>
        </div>
        <div class="set_hovers"
             v-if="hover_status1">
          <div class="set_hovers_out">Subscription Now! <span @click="jump_viewPlan">Subscription>></span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userInfo } from '@/api/user_info.js'
import { getUserInfo } from '@/api/userInfo.js'
import { userMsgList } from '@/api/message.js'
export default {
  name: "top",
  components: {},
  props: ['return_status'],
  data () {
    return {
      hover_status: false,
      hover_status1: false,
      left_mark_up: false,
      return_status_back: this.return_status, //1隐藏  2显示
      top_user_info: '', //用户信息
      page_type: 0, // 0 默认返回上一页 1 团队 跳到团队列表   2 返回赛事列表
      select_index: 0,
      default_avatar: require("../assets/images/default.png"), //默认头像
      recharge: require("../assets/images/icon9.png"), //待选中
      task: require("../assets/images/icon8.png"),
      news: require("../assets/images/icon7.png"),
      team: require("../assets/images/icon3.png"),
      select_recharge: require("../assets/images/icon9-1.png"), //选中
      select_task: require("../assets/images/icon8-1.png"),
      select_news: require("../assets/images/icon7-1.png"),
      select_team: require("../assets/images/icon3-1.png"),
      listQuery: {
        state: "",
        messageType: 1,
        favorites: "",
        messageSort: 'desc',
      },
      msg_list: [],//消息列表
      messageTitle: '',

      teamNews: false,  //队伍消息已读未读
      notificatNews: false,  //未读消息
      friendNews: false  //好友请求
    };
  },
  created () {
    console.info(this.return_status_back, 666666)
  },
  mounted () {
    if (sessionStorage.getItem("token") != '' && sessionStorage.getItem("token") != null && sessionStorage.getItem("token") != undefined) {
      this.get_userInfo()
      this.getNotice()
      this.get_team()
    }

  },
  watch: {
    return_status () {
      this.return_status_back = this.return_status
      console.log(this.return_status_back)
    },
    $route (to, from) {
      let that = this;
      that.select_index = sessionStorage.getItem("select_status")
      if (to.path == '/tearm/team_about' || to.path == '/tearm/application_list' || to.path == '/tearm/tour_upcoming' || to.path == '/tearm/team_announcement' || to.path == '/tearm/team_setting') {
        that.page_type = 1
      } else if (to.path == '/tournament/bracketm' || to.path == '/tournament/participantm' || to.path == '/tournament/Informationsm' || to.path == 'tournament/standingsm') {
        that.page_type = 2
      } else {
        that.page_type = 0
      }
      this.get_userInfo()
    },
    "$route": "hover_down",	//监听路由变化后关闭弹窗

  },
  methods: {
    // changeStatus(){
    // 	let that = this
    // 	if(that.return_status == 1){
    // 		that.return_status = that.return_status
    // 		console.log(that.return_status)
    // 	}else if(that.return_status == 2){
    // 		that.return_status = sessionStorage.getItem("return_status")
    // 		// console.log(that.return_status)
    // 	}
    // },
    reset () {
      this.PageNumber.page_number = 1; //当跳转其他页面时重置页数
    },

    refreshmoney () {
      this.get_userInfo()	//当app发送事件时，重新获取数据，实现实时刷新余额
    },

    // 查询队伍消息
    get_team () {
      getUserInfo().then(res => {
        if (res.data.team > 0) {
          this.teamNews = true
        }
        else {
          this.teamNews = false
        }

        if (res.data.message > 0) {
          this.notificatNews = true
        }
        else {
          this.notificatNews = false
        }
        if (res.data.friend > 0) {
          this.friendNews = true
        }
        else {
          this.friendNews = false
        } F
      })
    },

    //消息公告
    getNotice () {
      userMsgList(this.listQuery).then(res => {
        this.msg_list = res.data.list
        this.messageTitle = this.msg_list[0].messageTitle
      })
    },
    // 获取用户信息
    get_userInfo () {
      let that = this;
      let pamas = {
        userId: sessionStorage.getItem("userId")
      }
      userInfo(pamas).then(res => {
        that.top_user_info = res.data.userInfo
        sessionStorage.setItem("userinfo", JSON.stringify(res.data.userInfo))
      })
    },
    // 跳转完善信息
    jupm_later () {
      this.left_mark_up = false
      this.$router.push({ path: '/center/personal' })
    },
    // 返回上一页
    back () {
      if (this.page_type == 1) {
        this.$router.push({ path: '/tearm/my_join_team' })
      } else if (this.page_type == 2) {
        this.$router.push({ path: '/tournament/registration' })
      } else {
        this.$router.go(-1); //返回上一层
      }
    },
    // 右上角跳转
    jump_corner (index) {
      let that = this;
      if (index == 1) {
        that.$router.push({
          path: '/corner/corner_operate'
        })
      } else if (index == 2) {
        that.$router.push({
          path: '/home/home'
        })
      } else if (index == 3) {
        that.$router.push({
          path: '/corner/support'
        })
      } else if (index == 4) {
        sessionStorage.setItem("token", '')
        sessionStorage.setItem("userId", '')
        sessionStorage.setItem("cart_list", '')
        that.$router.push({
          path: '/login/index'
        })
        this.$emit("agin_nav")
      }
      that.hover_status = false
    },
    jump_center (index) {
      let that = this;
      that.select_index = index
      sessionStorage.setItem("select_status", index)
      sessionStorage.setItem("nav_status", 0)

      that.top_user_info = JSON.parse(sessionStorage.getItem("userinfo"))
      // 判断用户未完善资料无法查看相关界面  NA 未认证
      if (index == 1) {
        if (that.top_user_info.vipLevel == 'NA') {
          that.$router.push({ path: '/center/personal' })
        } else {
          that.$router.push({ path: '/center/profile' })
        }
      } else if (index == 2) {
        if (that.top_user_info.vipLevel == 'NA') {
          that.left_mark_up = true
        } else {
          that.$router.push({
            path: '/redemption/top_up'
          })
        }
      } else if (index == 3) {
        if (that.top_user_info.vipLevel == 'NA') {
          that.left_mark_up = true
        } else {
          that.$router.push({
            path: '/redemption/task'
          })
        }
      } else if (index == 4) {
        if (that.top_user_info.vipLevel == 'NA') {
          that.left_mark_up = true
        } else {
          that.$router.push({
            path: '/mailbox/index'
          })
        }
      } else if (index == 5) {
        if (that.top_user_info.vipLevel == 'NA') {
          that.left_mark_up = true
        } else {
          that.$router.push({
            path: '/tearm/my_join_team'
          })
        }
      }
    },
    hover_up () {
      let that = this;
      that.hover_status = !that.hover_status
    },
    hover_down () {
      let that = this;
      that.hover_status = false;	//当路由改变时关闭弹窗
    },
    jump_viewPlan () {
      this.$router.push({ path: '/membership/current_plan_one' })
    }
  }
};
</script>
<style>
#top {
  width: 91%;
  height: 120px;
  position: fixed;
  top: 0;
  left: 215px;
  color: #fff;
  z-index: 100;
}
/* Check out 02弹窗 start */
.mark_cancel {
  position: absolute;
  right: 80px;
  top: 95px;
  z-index: 100;
}
.cancel_img {
  width: 46px;
  height: 46px;
  cursor: pointer;
}
.mark_bac {
  width: 100%;
  height: 100vh;
  background: #000000b3;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
}
.mark_Top_container {
  position: absolute;
  left: 600px;
  top: 200px;
  z-index: ;
  width: 557px;
  padding: 126px 111px 103px 162px;
  background: #0e0f11;
  border-radius: 27px;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.mark_my_content {
  width: 100%;
  text-align: center;
  margin-bottom: 60px;
}
.mark_text_one {
  color: #dba83f;
  font-size: 24px;
  font-family: "Roboto-Regular";
  margin-bottom: 20px;
}
.mark_text_two {
  color: #989898;
  font-family: "Roboto-Regular";
  font-size: 20px;
  span {
    color: #ededed;
    font-weight: bold;
    font-family: "Roboto-Regular";
  }
}
.mark_my_foot {
}
.mark_foot_button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 58px;
  color: #0e0f11;
  cursor: pointer;
  font-size: 20px;
  background: #dba83f;
  border-radius: 25px;
  font-family: "Roboto-Regular";
}
/* Check out 02弹窗  end */
.top {
  width: 90%;
  padding: 0 4% 0 4%;
  height: 120px;
  border-bottom: 2px solid #15181a;
  background: #15181a;
  display: flex;
  justify-content: space-between;
  /* 横向中间自动空间 */
  align-items: center;
  flex-wrap: wrap;
  /* 换行 */
  position: relative;
  /* background-color: #FF00FF; */
}

.top_back {
  width: 146px;
  height: 58px;
  color: #d3aa53;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0e0f11;
  border-radius: 23px;
  cursor: pointer;
  /* background-color: #FF0000; */
}

.top_back img {
  width: 30px;
  margin-right: 13px;
}

.lorem {
  float: left;
  width: 40%;
  display: flex;
  align-items: center;
  font-size: 20px;
  /* background-color: #FFF000; */
}

.lorem img {
  width: 58px;
  height: 58px;
  float: left;
}

.lorem p {
  color: #7c7c7c;
  /* font-size: 18px; */
  font-size: 14px;
  float: left;
  margin-left: 10px;
  width: 80%;
  line-height: 34px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Roboto-Regular";
  white-space: nowrap;
}

.user {
  display: flex;
  align-items: center;
  /* background-color: #0000ff; */
}

.crown_img {
  width: 42px;
  height: 42px;
  margin-right: 45px;
}

.set_img {
  width: 5px;
  cursor: pointer;
}

/* 右上角hover 窗 */
.set_hover {
  position: absolute;
  right: -26px;
  top: 107px;
  width: 263px;
  padding: 0 17px;
  background: #0e0f11;
  border-radius: 24px;
}

.set_hovers {
  position: absolute;
  right: 10px;
  top: 130px;
  width: 300px;
  padding: 0 17px;
  background: #020202;
  border-radius: 24px;
  height: 60px;
  display: flex;
  align-items: center;
}

.set_hovers::after {
  content: "";
  position: absolute;
  top: -30px;
  right: 40px;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 30px solid #020202;
}

.set_hovers_out {
  color: #fff;
  display: inline-block;
  width: 100%;
  font-size: 16px;
}

.set_hovers_out span {
  color: #d3aa53;
  font-size: 16px;
  cursor: pointer;
  float: right;
  display: inline-block;
}

.corner_text {
  color: #7c7c7c;
  font-size: 18px;
  margin-top: 27px;
  cursor: pointer;
  padding: 0 10px 22px 10px;
  border-bottom: 1px solid #494848;
  font-family: "Roboto-Regular";
}

.corner_out {
  color: #d3aa53;
  font-size: 18px;
  padding: 0 10px 30px 10px;
  margin-top: 27px;
  cursor: pointer;
  font-family: "Roboto-Bold";
}

/* 右上角hover 窗 end */
.user_info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user_info_img {
  width: 58px;
  height: 58px;
  float: left;
  border-radius: 16px;
  margin: 0px 17px 0px 17px;
  /* background-color: #ff0; */
}
.default_img {
  width: 60px;
  height: 60px;
}
.user_info_text {
  float: left;
  margin-right: 50px;
}
.user_info_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user_info_id {
  width: 100px;
  font-size: 15px;
  color: #d3aa53;
  margin: 8px 0;
  font-family: "Roboto-Medium";
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.uid_text {
  color: #7c7c7c;
  font-size: 16px;
  margin-left: 10px;
  font-family: "Roboto-Regular";
}
.user_text_name {
  display: flex;
  color: #7c7c7c;
  font-size: 16px;
  font-family: "Roboto-Regular";
}

.user_name_border {
  display: inline-block;
  width: 1px;
  height: 16px;
  margin: 0 14px;
  background-color: #7c7c7c;
}

.user_icon_col {
  width: 58px;
  height: 58px;
  background: #0e0f11;
  border-radius: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  cursor: pointer;
  margin-right: 17px;
}

.user_icon_col img {
  width: 58px;
  height: 58px;
}

/* 大于1080px小于1920px的时候执行下面的CSS。 */
@media screen and (min-width: 1080px) and (max-width: 1919px) {
  #left {
    height: 100%;
    /* height: calc(100vh - 120px); */
    /* zoom: 0.85; */
  }

  .lorem {
    float: left;
    width: 40%;
    display: flex;
    align-items: center;
  }

  .lorem p {
    color: #7c7c7c;
    font-size: 18px;
    float: left;
    margin-left: 10px;
    width: 430px;
    line-height: 34px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.redPoint:before {
  content: " ";
  background: #c52823;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  position: absolute;
  z-index: 1000;
  margin-right: -50px;
  margin-top: -50px;
}
.avatarRedPoint{
  position: relative;
}
.avatarRedPoint:before {
  content: " ";
  background: #c52823;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  position: absolute;
  z-index: 1000;
  right: 10px;
  top: 0px;
}
</style>
