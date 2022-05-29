<template>
  <div class="index">
    <div class="container">
      <div class="content_right">
        <div class="content_right_top">
          <div class="content_right_nav">
            <div :class="team_index == 1 ?'nav_block av':'nav_block'"
                 @click="q_team(1)">My Team!</div>
            <div :class="team_index == 2 ?'nav_block av':'nav_block'"
                 @click="q_team(2)">Join Team!</div>
            <div :class="team_index == 3 ?'nav_block av':'nav_block'"
                 @click="q_team(3)">
              <div :class="{redPoint:teamNews}">Team Request</div>
            </div>
          </div>
          <!-- 搜索框 -->
          <div class="search">
            <div class="search_left">
              <input placeholder="Enter Your Search"
                     v-model="listQuery.title" />
              <button class="btn"
                      @click="get_team">
                <img src="@/assets/images/search.png" />
              </button>
            </div>
            <div class="search_right">
              <div class="creat_btn"
                   @click="jump_create">Create New Team</div>
            </div>
          </div>
        </div>
        <div class="content_right_form">
          <!-- 没有数据 -->
          <div class="no_data_area"
               v-if="(team_index==1 && list == '') || (team_index==2 && join_list == '') || (team_index==3 && request_list == '')">
            <div class="no_data">
              <img src="../../assets/images/no_tournament.svg" />
              <div class="no_data_text">No Team</div>
            </div>
          </div>
          <!-- 我的战队 -->
          <div v-if="team_index == 1"
               class="my_team_container">
            <div class="myam_block"
                 v-for="(item,index) in list"
                 :key='index'
                 @click="jump_teamAbout(item.teamId)">
              <div class="myam_block_padding">
                <div class="myam_left">
                  <div class="myan_left_in">
                    <img :src="HOST + item.teamLogo"
                         alt="">
                  </div>
                </div>
                <div class="myam_right">
                  <div class="myam_tit">{{item.teamName}}</div>
                  <div class="myam_version">{{item.aboutTeam}}</div>
                  <div class="myam_botm">
                    <div class="myam_btom_left">
                      <div class="myam_img"
                           v-for="(utem,tdex) in item.teamUserVos"
                           :key='tdex'
                           v-if="tdex <= 2 ">
                        <el-image :src="HOST +  utem.avatar"
                                  class="avatar_img">
                          <div slot="error"
                               class="image-slot">
                            <img src="../../assets/images/default.png"
                                 class="default_img" />
                          </div>
                        </el-image>
                        <!-- <img :src="HOST + utem.avatar" alt="" v-if="utem.avatar"> -->
                        <!-- <img src="../../assets/images/default.png" v-else /> -->
                      </div>
                      <div class="myam_num">+{{item.teamUserVos.length}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 加入团队 -->
          <div v-else-if="team_index == 2"
               class="join_team_container">
            <div class="join_block"
                 v-for="(item2,index2) in join_list"
                 :key='index2'
                 @click="jump_teamInfo(1,item2.teamId)">
              <div class="join_block_padding">
                <div class="join_left"
                     @click="jump_teamInfo(1,item2.teamId)">
                  <img :src="HOST + item2.teamLogo"
                       alt="">
                </div>
                <div class="join_right">
                  <div class="join_tit">{{item2.teamName}}</div>
                  <div class="join_version">{{item2.aboutTeam}}</div>
                  <div class="join_botm">
                    <div class="join_btom_left">
                      <div class="join_img"
                           v-for="(utem,tdex) in item2.teamUserVos"
                           :key='tdex'
                           v-if="tdex <= 2 ">
                        <el-image :src="HOST +  utem.avatar"
                                  class="avatar_img">
                          <div slot="error"
                               class="image-slot">
                            <img src="../../assets/images/default.png"
                                 class="default_img" />
                          </div>
                        </el-image>
                        <!-- <img :src="HOST + utem.avatar" v-if="utem.avatar"> -->
                        <!-- <img src="../../assets/images/default.png" v-else /> -->
                      </div>
                      <div class="join_num">+{{item2.teamUserVos.length}}</div>
                    </div>
                    <div class="join_button"
                         @click.stop="Join_team(item2.teamId)">Join</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 被战队邀请 -->
          <div v-else
               class="join_team_container">
            <div class="join_block"
                 v-for="(item3,index3) in request_list"
                 :key='index3'
                 @click="jump_teamInfo(2,item3.teamId)">
              <div class="join_block_padding">
                <div class="join_left"
                     @click="jump_teamInfo(2,item3.teamId)">
                  <img :src="HOST + item3.teamLogo"
                       alt="">
                </div>
                <div class="join_right">
                  <div class="join_tit">{{item3.teamName}}</div>
                  <div class="join_version">{{item3.aboutTeam}}</div>
                  <div class="join_botm">
                    <div class="join_btom_left">
                      <div class="join_img"
                           v-for="(utem,tdex) in item3.teamUserVos"
                           :key='tdex'
                           v-if="tdex <= 2 ">
                        <el-image :src="HOST +  utem.avatar"
                                  class="avatar_img">
                          <div slot="error"
                               class="image-slot">
                            <img src="../../assets/images/default.png"
                                 class="default_img" />
                          </div>
                        </el-image>
                        <!-- <img :src="HOST + utem.avatar" v-if="utem.avatar"> -->
                        <!-- <img src="../../assets/images/default.png" v-else /> -->
                      </div>
                      <div class="join_num">+{{item3.teamUserVos.length}}</div>
                    </div>
                    <div class="join_button"
                         @click.stop="teamDecision(item3.teamId,'invite',2)">Accept</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="tearm_chart">
				<img src="../../assets/images/chart.png" alt="">
			</div> -->
      <div class="chart">
        <img src="../../assets/images/weichat.png" />
        <!-- <img src="../../assets/images/chart.png" alt=""> -->
      </div>
    </div>
  </div>
</template>

<script>
import { addTeam, userList, teamJoin, teamDecision } from '@/api/team';
import { getUserInfo } from '@/api/userInfo.js'

export default {
  name: "index",
  components: {},
  data () {
    return {
      list: [],
      join_list: [],
      request_list: [],
      team_index: 1,
      listQuery: {
        type: 1,  //1 我加入的 2 未加入的 3 被邀请加入战队
        title: ''
      },
      userId: sessionStorage.getItem('userId'),

      teamNews: false  //队伍消息已读未读
    }
  },
  mounted () {
    this.get_team()
		this.get_teamNews()
  },
  methods: {
    // 查询队伍消息
    get_teamNews () {
      getUserInfo().then(res => {
        if (res.data.team > 0) {
          this.teamNews = true
        }
        else {
          this.teamNews = false
        }
      })
    },
    // 申请加入战队
    Join_team (teamId) {
      this.$confirm('Request to join team', 'Confirmation', {//是否同意申请加入战队
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        let params = {
          teamId,
          userId: this.userId
        }
        teamJoin(params).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          });
          this.get_team()
        })
      })
    },
    // 同意加入战队
    teamDecision (teamId, type, agree) {
      let that = this;
      let params = {
        teamId,
        type,  	//invite 邀请 apply 申请
        agree,  	// 2 同意 3拒绝
        userId: that.userId
      }
      this.$confirm('Agree to join team?', 'Confirmation', {//是都同意加入战队
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        teamDecision(params).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          });
          that.get_team();
        })
      })
    },
    // 用户好友列表
    get_team () {
      userList(this.listQuery).then(res => {
        if (this.team_index == 1) {
          this.list = res.data;
        } else if (this.team_index == 2) {
          this.join_list = res.data;
        } else {
          this.request_list = res.data;
        }
      })
    },
    // tab 切换
    q_team (index) {
      let that = this;
      that.team_index = index
      that.listQuery.type = index
      that.get_team();
    },
    jump_teamAbout (teamId) {
      sessionStorage.setItem("teamId", teamId)
      this.$router.push({ path: '/tearm/team_about' })
    },
    jump_create () {
      this.$router.push({ path: '/tearm/create_team_04' })
    },
    jump_teamInfo (index, teamId) {
      if (index == 1) {
        this.$router.push({ path: '/tearm/team_info', query: { teamId: teamId } })
      } else {
        this.$router.push({ path: '/tearm/reque_info', query: { teamId: teamId } })
      }

    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: calc(100% - 150px);
  margin-left: 61px;
  display: flex;
  justify-content: space-between; /* 横向中间自动空间 */
  flex-wrap: wrap; /* 换行 */
  .content_right {
    width: 100%;
    .content_right_top {
      margin-top: 41px;
      .content_right_nav {
        margin-bottom: 72px;
        padding: 0 20px;
        .nav_block {
					position: relative;
          cursor: pointer;
          display: inline-block;
          color: #727272;
          padding: 0 47px 0 0;
          font-size: 22px;
          font-family: "Quicksand-Bold";
        }
        .av {
          color: #d3aa53;
          font-family: "Quicksand-Bold";
        }
      }
      .search {
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .search_left {
          input {
            width: 315px;
            height: 60px;
            background: #0e0f11;
            border-radius: 23px;
            font-size: 18px;
            border: none;
            padding-left: 35px;
            color: #565656;
            font-family: "Roboto-Regular";
          }
          .btn {
            width: 60px;
            height: 60px;
            background: #d3aa53;
            border: none;
            border-radius: 22px;
            opacity: 1;
            position: relative;
            right: 50px;
            top: 4px;
            cursor: pointer;
            img {
              width: 22px;
              height: 22px;
            }
          }
        }
        .search_right {
          .creat_btn {
            width: 236px;
            height: 59px;
            color: #d3aa53;
            font-size: 20px;
            cursor: pointer;
            line-height: 59px;
            text-align: center;
            background: #0e0f11;
            font-family: "Roboto-Regular";
            border-radius: 20px;
          }
        }
      }
    }
    .content_right_form {
      margin-top: 80px;
      .no_data_area {
        width: 100%;
        height: 550px;
        display: flex;
        align-items: center;
        justify-content: center;
        .no_data {
          text-align: center;
          img {
          }
          .no_data_text {
            color: #565656;
            font-size: 22px;
            margin-top: 20px;
          }
        }
      }
      .my_team_container {
        display: flex;
        flex-wrap: wrap;
        .myam_block {
          width: 23%;
          cursor: pointer;
          background-color: #0e0f11;
          border-radius: 61px;
          margin: 0 38px 93px 0;
          .myam_block_padding {
            position: relative;
            padding: 0px 39px 23px 39px;
            .myam_left {
              position: absolute;
              top: -50px;
              left: 0;
              right: 0;
              width: 163px;
              height: 163px;
              border-radius: 50%;
              background-color: #0e0f11;
              overflow: hidden;
              margin: 0 auto;
              display: flex;
              justify-content: center;
              align-items: center;
              .myan_left_in {
                width: 143px;
                height: 143px;
                border-radius: 50%;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
            }
            .myam_right {
              padding-top: 137px;
              display: flex;
              flex-direction: column;
              .myam_tit {
                color: #ffffff;
                font-size: 22px;
                font-family: "Roboto-Bold";
                text-align: center;
                margin: 13px 0px 11px 0px;
              }
              .myam_version {
                color: #727272;
                font-family: "Roboto-Regular";
                font-size: 18px;
                line-height: 25px;
                height: 70px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                text-align: center;
              }
              .myam_botm {
                margin-top: 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .myam_btom_left {
                  display: flex;
                  .myam_img {
                    width: 49px;
                    height: 49px;
                    border-radius: 18px;
                    overflow: hidden;
                    margin-right: 11px;
                    .avatar_img {
                      width: 49px;
                      height: 49px;
                      // object-fit: cover;
                      object-fit: contain;
                    }
                    .default_img {
                      width: 55px;
                      height: 55px;
                    }
                  }
                  .myam_num {
                    width: 49px;
                    height: 49px;
                    font-family: "Roboto-Regular";
                    line-height: 49px;
                    color: #7c7c7c;
                    font-size: 18px;
                    overflow: hidden;
                    border-radius: 18px;
                    text-align: center;
                    background-color: #303030;
                  }
                }
              }
            }
          }
        }
        .myam_block:nth-child(4n) {
          margin-right: 0;
        }
      }
      .join_team_container {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 120px;
        .join_block {
          width: 48.7%;
          cursor: pointer;
          background-color: #0e0f11;
          border-radius: 61px;
          margin: 0 40px 40px 0;
          .join_block_padding {
            display: flex;
            align-items: center;
            padding: 44px 28px 23px 47px;
            .join_left {
              width: 146px;
              height: 146px;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 47px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .join_right {
              width: 70%;
              .join_tit {
                color: #ffffff;
                font-size: 22px;
                font-family: "Roboto-Bold";
                margin: 0px 0px 11px 0px;
              }
              .join_version {
                color: #727272;
                font-size: 19px;
                line-height: 25px;
                font-family: "Roboto-Regular";
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
              .join_botm {
                margin-top: 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .join_btom_left {
                  display: flex;
                  .join_img {
                    width: 49px;
                    height: 49px;
                    border-radius: 18px;
                    overflow: hidden;
                    margin-right: 11px;
                    .avatar_img {
                      width: 49px;
                      height: 49px;
                      object-fit: cover;
                    }
                    .default_img {
                      width: 55px;
                      height: 55px;
                    }
                  }
                  .join_num {
                    width: 49px;
                    height: 49px;
                    line-height: 49px;
                    color: #7c7c7c;
                    font-family: "Roboto-Regular";
                    font-size: 18px;
                    overflow: hidden;
                    border-radius: 18px;
                    text-align: center;
                    background-color: #303030;
                  }
                }
                .join_button {
                  width: 163px;
                  height: 58px;
                  color: #2b2b2b;
                  cursor: pointer;
                  font-size: 18px;
                  line-height: 58px;
                  text-align: center;
                  background: #d3aa53;
                  border-radius: 25px;
                  font-family: "Roboto-Regular";
                }
              }
            }
          }
        }
        .join_block:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
  .chart {
    position: fixed;
    bottom: 70px;
    right: 70px;
    // width: 350px;
    // height: 350px;
    width: 85px;
    height: 85px;
    // border-radius: 40px;
    border-radius: 50%;
    background: rgba(14, 15, 17, 0.5);
    // border: 1px solid rgba(255,255,255,0.2);
    border: 2px solid #2d2d2d;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      // width: 350px;
      // height: 350px;
      width: 60px;
      height: 60px;
    }
  }
}

.redPoint:before {
  content: " ";
  background: #C52823;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  position: absolute;
  z-index: 1000;
  right: 90px;
  top: 50px;
}
</style>
