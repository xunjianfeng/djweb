<template>
  <div class="index">
    <div class="container">
      <LeftView :index="3"></LeftView>
      <div class="add_count_container">
        <!-- 赛事报名-选择队员弹窗 -->
        <div class="team_user"
             v-if="member_status == true">
          <div class="mark_check"
               @click.stop="close_teammember">
            <img src="@/assets/images/cancel.png">
          </div>
          <div class="mark_bac"></div>
          <div class="mark_check_container">
            <div class="mark_my_content ">
              <div class="mark_text_one">Choose LineUp</div>
              <!-- <div class="search">
								<div class="search_left">
									<input placeholder="search Member Name"/>
									<button class="btn">
										<img src="@/assets/images/search.png" />
									</button>
								</div>
							</div> -->
              <div class="mark_product_container">
                <!-- <div class="search">
								</div> -->
                <div class="mark_product">
                  <div class="selected_area">
                    <div class="block_text">Selected</div>
                    <!-- <div class="show_text" v-if="showText == true">Please Choose Your Team</div> -->
                    <div class="selected_user_list">
                      <div class="user_selected"
                           v-for="(sitem,sindex) in selected_users_list"
                           v-if="sitem.check == true"
                           :key="sindex"
                           @click="cancelUserMember(sitem.userId,sindex)">
                        <div class="img_area">
                          <el-image :src="HOST + sitem.avatar"
                                    class="avatar_img">
                            <div slot="error"
                                 class="image-slot">
                              <img src="../../assets/images/default.png"
                                   class="avatar_img" />
                            </div>
                          </el-image>
                        </div>
                        <div class="user_info">
                          <div class="user_name">{{sitem.fullName}}</div>
                          <div class="game_role">{{sitem.role}}</div>
                        </div>
                      </div>
                      <div class="user_add"
                           v-for="mmtem in player_block">
                        <div class="add_img">
                          <!-- <img src="../../assets/images/add.png" /> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="line"></div>
                  <div class="unselected_area">
                    <div class="block_text">Unselected</div>
                    <!-- <div class="show_text" v-if="showText == true">Please Choose Your Team</div> -->
                    <div class="selected_user_list">
                      <div class="user_selected"
                           v-for="(Uitem,index) in team_user"
                           v-if="Uitem.check == false"
                           :key="index"
                           @click="get_selected_user(member_num,Uitem.userId)">
                        <div class="img_area">
                          <el-image :src="HOST + Uitem.avatar"
                                    class="avatar_img">
                            <div slot="error"
                                 class="image-slot">
                              <img src="../../assets/images/default.png"
                                   class="avatar_img" />
                            </div>
                          </el-image>
                        </div>
                        <div class="user_info">
                          <div class="user_name">{{Uitem.fullName}}</div>
                          <div class="game_role">{{Uitem.role}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="mark_my_foot">
              <div class="confirm_btn"
                   @click="updateTeamUesr">Save</div>
              <div class="cancel_btn"
                   @click.stop="close_teammember">Cancel</div>
            </div>
          </div>
        </div>
        <!-- 赛事报名-选择队员弹窗 end-->
      </div>

      <div class="content_right">
        <div class="upcoming_right_form">
          <div class="content_right_nav">
            <div class="right_nav_right">
              <p class="av"
                 @click="jump_playd(1)">Tournament</p>
              <!-- 隐蔽项start -->
              <!-- <p @click="jump_playd(2)">Rapid Challenge</p>
							<p @click="jump_playd(3)">League</p>
							<p @click="jump_playd(4)">Predict and Win</p> -->
              <!-- 隐蔽项end -->
            </div>
          </div>
          <div class="my_contaniner">
            <div class="my_order_table">
              <div class="order_table_head">
                <div :class="switch_index == 2 ?'table_head_title table_av':'table_head_title'"
                     @click="tab_switch(2)">Upcoming</div>
                <div :class="switch_index == 3 ?'table_head_title table_av':'table_head_title'"
                     @click="tab_switch(3)">Processing</div>
                <div :class="switch_index == 4 ?'table_head_title table_av':'table_head_title'"
                     @click="tab_switch(4)">History</div>
              </div>
              <!-- 筛选 -->
              <div class="order_table_btom">
                <div class="choice-contani">
                  <p class="choice_text">Game Type</p>
                  <div class="choice_date"
                       @click="jump_dota">
                    <div class="date_date">{{gameName}}</div>
                    <div class="date_img">
                      <img src="@/assets/images/more2.png"
                           alt="">
                    </div>
                  </div>
                </div>
                <div class="sort_by">
                  <p class="sort_by_text">Sort by</p>
                  <div class="options">
                    <el-select v-model="listQuery.order.id"
                               @change="handleFilter"
                               placeholder="请选择"
                               style="margin-right: 20px;"
                               :popper-append-to-body="false">
                      <el-option label="Newest"
                                 value="desc"></el-option>
                      <el-option label="Oldest"
                                 value="asc"></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 没有数据 -->
          <div class="no_data_area"
               v-if="list == ''">
            <div class="no_data">
              <img src="../../assets/images/no_tournament.svg" />
              <div class="no_data_text">No any data</div>
            </div>
          </div>
          <!-- 赛事card -->
          <div class="upcom_container"
               v-if="list != ''">
            <div class="match_card"
                 v-for="(item, index) in list"
                 :key="index"
                 @click="jump_reg_info(item.id,item.status)">
              <div class="match_left">
                <img :src="HOST + item.tournamentCover"
                     alt="">
                <div class="championBox">
                  <!-- 团队 -->
                  <!-- <div class="championTeam">
                    <img class="championTeamIcon"
                         src="../../assets/images/icon-champion.png">
                    <img class="championTeamAvatar"
                         src="../../assets/images/icon-champion.png">
                  </div> -->
                  <!-- 个人 -->
                  <div class="championPerson">
                    <img class="championPersonAvatar"
                         src="../../assets/images/icon-champion.png">
                    <div class="championPersonName">Crystal Palance</div>
                  </div>
                </div>
              </div>
              <div class="match_right">
                <el-tooltip class="item"
                            effect="dark"
                            :content="item.tournamentName"
                            placement="bottom">
                  <div class="match_tit">{{ item.tournamentName }}</div>
                </el-tooltip>
                <!-- <div class="match_tit">{{ item.tournamentName }}</div> -->
                <div class="match_time">Tournament start at</div>
                <div class="match_hour_text">{{initDete(item.tournamentTime)}}</div>
                <div class="match_flex">
                  <div class="match_flex_left">
                    <div class="flex_left_img">
                      <img src="../../assets/images/icon1.png"
                           alt=""
                           v-show="item.tournamentCategory=='privately'">
                      <img src="../../assets/images/icon0.png"
                           alt=""
                           v-show="item.tournamentCategory=='officially'">
                    </div>
                    <div class="flex_left_img">
                      <img src="../../assets/images/icon2.png"
                           alt=""
                           v-show="item.tournamentType==0">
                      <img src="../../assets/images/icon3.png"
                           alt=""
                           v-show="item.tournamentType!='0'">
                    </div>
                  </div>
                  <div class="match_flex_right">
                    <div class="flex_right_img">
                      <el-image :src="HOST + item.gameLogo"
                                class="game_img"
                                v-if="item.gameName != ''">
                        <div slot="error"
                             class="image-slot">
                          <img src="../../assets/images/default_game.png"
                               class="game_img" />
                        </div>
                      </el-image>
                      <!-- <img :src="HOST + item.gameLogo" alt="" v-if="item.gameLogo"> -->
                    </div>
                  </div>
                </div>
                <!-- <div class="match_flex_text">
									<div class="text_left"></div>
									<div class="text_right"></div>
								</div> -->
                <!-- <div class="match_flex_text">
									<div class="text_left"></div>
									<div class="text_right"></div>
								</div> -->
                <div class="match_flex_text">
                  <div class="text_left">Format</div>
                  <div class="text_right">
                    <!-- {{item.stages_format}} -->
                    {{item.stages_format==1?'Single Elimination':item.stages_format==2?'Double Elimination':item.stages_format==3?'Round Robin':'Free For All'}}
                    <span v-if="item.stages_format == 3">({{item.groupSize || 0}} > {{item.promotionSize || 0}})</span>
                  </div>
                </div>
                <div class="match_flex_text">
                  <div class="text_left">Mode</div>
                  <div class="text_right">{{item.mode||0}} vs {{item.mode||0}}</div>
                </div>
                <div class="match_flex_text">
                  <div class="text_left">Participants</div>
                  <div class="text_right">{{item.joinned||0}}/{{item.participantsSize||0}}</div>
                </div>
                <div class="match_flex_text"
                     v-if="listQuery.state==2">
                  <el-progress style="width:100%;margin-top:5px;"
                               :percentage="item.num"
                               :show-text="false"
                               color="#d3aa53"
                               :stroke-width="10"></el-progress>
                </div>
                <div class="match_flex_text2"
                     :style="listQuery.state!=2?'border-top: 1px solid #BF9D62;':''">
                  <div class="text_left">Prize</div>
                  <div class="text_right">{{item.bonus}}</div>
                </div>
                <!-- <div class="match_flex_text3" v-if="item.stages_format == 3">Round Robin ({{item.groupSize || 0}} > {{item.promotionSize || 0}})</div> -->
                <div :class="item.checkIn == true ? 'check_in_btn check_color' : 'check_in_btn btn_cursor '"
                     @click.stop="item.checkIn == true ? '' : checkTour(item.id)">{{item.checkIn == true ? 'Checked in' :'Check in'}}</div>
                <div v-if="item.tournamentType!=0 "
                     class="change_in_btn"
                     @click.stop="changeTeam(item.id)">ChangeTeam</div>
              </div>
              <div class="match_position"
                   v-if="item.authentication">
                <img src="../../assets/images/badge.png"
                     alt="">
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TournamentUist, TournamentCheckIn, TournamentUpdateTeam } from '@/api/played.js'
import { teamUsers } from '@/api/team.js'
import LeftView from '@/components/order/left.vue'
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
import Listing from '@/mixin/Listing';
export default {
  name: "tounament",
  mixins: [Listing],
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      };
      return statusMap[status];
    }
  },
  components: {
    LeftView,
    Pagination
  },
  data () {
    return {
      member_status: false,//战队成员弹窗
      listQuery: {
        tournamentName: "",
        //tournamentCategory: '',//officially
        // tournamentType: "",
        state: 2, //赛事状态 1 待审核  2 报名中 3进行中 4已结束 5 未通过6 草稿
        hot: "",
        gameId: "",
        page: 1,
        size: 10,
        order: { id: 'desc' },
      },
      list: [],
      total_count: 0,
      switch_index: 2,
      gameName: 'Please select',
      tour_info: {},//点击的赛事的赛事详情
      team_user: [],//战队成员
      selected_users_list: [],//参赛的战队成员
      tourDetail: {},//赛事详情
      player_block: 0,
      selected_userId_list: [],//选择的队员Id
      unselected_userId_list: [],//未选择的队员ID
      member_num: '',//战队ID
      tourId: '',//赛事ID
    };
  },
  mounted () {

  },
  methods: {
    //比赛未开始、用户未签到前的队员替换
    changeTeam (id) {

      this.tourId = id
      let arrId = []
      for (let m in this.list) {
        if (this.list[m].id == id) {
          this.tour_info = this.list[m]
          this.player_block = this.list[m].mode
          //团队赛事的参赛成员
          this.selected_users_list = this.list[m].tournamentTeamUsers
          // console.log(this.selected_users_list,"selected_users_list")
          if (this.selected_users_list == '' || this.selected_users_list == null || this.selected_users_list == undefined) {
            this.$message({
              type: 'warning',
              message: "You are unable to change team as you are not the team's leader."//您不是参赛战队的队长，无法修改参赛人员
            })
          } else {
            this.member_status = true
            this.member_num = this.selected_users_list[0].teamId//战队id
            this.player_block = this.tour_info.mode - this.selected_users_list.length
            for (let a = 0; a < this.selected_users_list.length; a++) {
              arrId.push(this.selected_users_list[a].userId)
            }
            this.get_team_users(this.member_num)
          }

        }
      }
      this.selected_userId_list = arrId
      // console.log(this.selected_userId_list,"selectId")
    },
    // 用户端-战队成员
    get_team_users (member_num) {
      // console.log(member_num)
      let params = {
        teamId: member_num
      }
      if (member_num == '') {
        // this.showText = true
      } else {
        // this.showText = false
        teamUsers(params).then(res => {
          for (let i = 0; i < res.data.usrs.length; i++) {
            res.data.usrs[i]['check'] = false;
          }
          this.team_user = res.data.usrs
          // console.log(this.team_user,"team_user")
          for (let s = 0; s < this.selected_users_list.length; s++) {
            for (let u = 0; u < this.team_user.length; u++) {
              if (this.selected_users_list[s].userId == this.team_user[u].userId) {
                this.selected_users_list[s].check = true
                this.team_user[u].check = true
              }
            }
          }
        })
      }

    },
    //点击选中的队员，消失，在原来的位置显示
    cancelUserMember (userId, sindex) {
      // console.log(userId) 
      // console.log(sindex)
      this.selected_users_list.splice(sindex, 1)
      // console.log(this.selected_users_list,"dssds")
      let arrIds = []
      arrIds = this.selected_userId_list
      // console.log(arrIds,'arrIds1')
      for (let d = 0; d < arrIds.length; d++) {
        let undex = (arrIds).findIndex((arrIds) => arrIds[d] == userId)
        // console.log(undex,"undex")
        arrIds.splice(undex, 1)
      }
      // console.log(arrIds,'arrIds2')
      this.selected_userId_list = arrIds
      for (let s = 0; s < this.team_user.length; s++) {
        if (userId == this.team_user[s].userId) {
          this.team_user[s]['check'] = false
          this.player_block = this.tour_info.mode - this.selected_users_list.length
        } else {
        }
      }
      // console.log(this.selected_userId_list,"selected_userId_list1")
    },
    //选择战队成员
    get_selected_user (member_num, userId) {
      // console.log(userId)
      let arrUserId = []
      if ((this.selected_userId_list).includes(userId)) {
        this.selected_userId_list = (this.selected_userId_list).filter(function (ele) { return ele != userId; })

      } else {
        arrUserId.push(userId)
        // console.log(arrUserId,'arrUserId')
        this.selected_userId_list = arrUserId
        // let team_Id = {
        // 	teamId :member_num
        // }
        // teamUsers(team_Id).then(res => {
        // this.team_user = res.data.usrs
        for (let i = 0; i < this.team_user.length; i++) {
          for (let j = 0; j < arrUserId.length; j++) {
            if (arrUserId[j] == this.team_user[i].userId) {
              this.team_user[i]['check'] = true;
            }
          }
        }
        let arr = []
        let userIds = []
        for (let i = 0; i < this.team_user.length; i++) {
          if (this.team_user[i]['check']) {
            arr.push(this.team_user[i])
          }
        }
        this.selected_users_list = arr
        this.player_block = this.tour_info.mode - this.selected_users_list.length
        // console.log(this.selected_users_list,"this.selected_users_list,")
        // console.log(this.selected_userId_list,"selected_userId_lis2")
        for (let n = 0; n < this.selected_users_list.length; n++) {
          userIds.push(this.selected_users_list[n].userId)
          // console.log(userIds,"userIds")
        }
        this.selected_userId_list = userIds
        // console.log(this.selected_userId_list,"selected_userId_list")
        // })
      }
    },

    //关闭战队弹窗
    close_teammember () {
      this.getList()
      this.member_status = false
    },
    //修改参赛人员
    updateTeamUesr () {
      let userIds = ''
      if (Array.prototype.isPrototypeOf(this.selected_userId_list)) {
        userIds = this.selected_userId_list.join(',');
      }
      let params = {
        tournamentId: this.tourId,
        teamId: this.member_num,
        userIds
      }
      this.$confirm('Confirm to change your team member? It will cost you 80 coins.', 'Confirmation', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        TournamentUpdateTeam(params).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.member_status = false
        })
      })

    },

    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    tab_switch (only) {
      let that = this;
      that.switch_index = only
      that.listQuery.state = only
      that.getList();
    },

    getList () {
      this.list = []
      if (this.$route.query.gameId != undefined && this.$route.query.gameId != '' && this.$route.query.gameId != null) {
        this.listQuery.gameId = this.$route.query.gameId
        this.gameName = this.$route.query.gameName
      }
      TournamentUist(this.listQuery).then(res => {
        const {
          list,
          total
        } = res.data
        for (let i in list) {
          list[i]['num'] = this.GetPercent(list[i]['joinned'] || 0, list[i]['participantsSize'] || 0)
          // 处理 列表 format 显示
          for (let j in list[i].stages) {
            list[i]['stages_format'] = list[i].stages[0].format
            if (list[i].stages[j].format == 3) {
              list[i]['groupSize'] = list[i].stages[j].groupSize
              list[i]['promotionSize'] = list[i].stages[j].promotionSize
            }
          }
          if (list[i].tournamentTeamUsers != '' && list[i].tournamentTeamUsers != null && list[i].tournamentTeamUsers != undefined) {
            for (let t = 0; t < list[i].tournamentTeamUsers.length; t++) {
              list[i].tournamentTeamUsers[t]['check'] = true;
            }
          }
        }
        this.list = list;
        this.total_count = total;
        // console.log(this.list,"list")

      })
    },
    //点击签到
    checkTour (id) {
      console.log(id)
      // this.$confirm('Confirm to check in now?', 'Confirmation', {
      this.$confirm('Confirm to check in now? You are not able to change anything after check in. Any changes incurred is irrecoverable and the fee (if any) is not refundable.', ' Please note that', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          TournamentCheckIn({ tournamentId: id }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getList()
          })
        })

    },
    // 计算百分比
    GetPercent (num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (total < num) {
        return total = 100
      }
      return total <= 0 ? "0%" : (Math.round(num / total * 100));
    },
    jump_reg_info (id, status) {
      if (status >= 3) {
        this.$router.push({ path: '/tournament/bracketm', query: { id } })
      } else {
        this.$router.push({ path: '/tournament/regis_Information', query: { id } })
      }
    },
    jump_dota () {
      this.$router.push({ path: '/tournament/filter_game', query: { type: 2 } })
    },
    jump_playd (index) {
      if (index == 1) {
        this.$router.push({
          path: '/played/tounament'
        })
      } else if (index == 2) {
        this.$router.push({
          path: '/played/rapic_challenge'
        })
      } else if (index == 3) {
        this.$router.push({
          // path: '/played/league'
        })
      } else if (index == 4) {
        this.$router.push({
          path: '/played/predict_win'
        })
      }
    },
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 90%;
  margin-left: 61px;
  display: flex;
  justify-content: space-between;
  /* 横向中间自动空间 */
  flex-wrap: wrap;
  /* 换行 */
  padding-bottom: 30px;
  .add_count_container {
    /deep/.el-dialog {
      width: 460px;
    }
    /deep/.el-dialog__title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    /deep/.el-form-item__label {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
    }
    /deep/.el-form-item {
      /deep/ .fullname {
        .el-input__inner {
          border: 1px solid #ffffff;
        }
      }
    }

    /deep/.el-input__inner {
      width: 258px;
      height: 32px;
      border-radius: 2px;
      border: 1px solid #595959;
    }
    /deep/.el-dialog__body {
      padding: 24px 24px;
    }
    //战队成员
    .team_user {
      // Check out 01弹窗 start
      .mark_check {
        position: absolute;
        right: 80px;
        top: 50px;
        img {
          width: 46px;
          height: 46px;
          cursor: pointer;
        }
        z-index: 999;
      }
      .mark_bac {
        width: 100%;
        height: 100vh;
        background: #000000b3;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 88;
      }
      .mark_check_container {
        position: absolute;
        left: 120px;
        top: 150px;
        z-index: 999;
        // width: 753px;
        width: 1200px;
        padding: 48px 20px 51px 28px;
        // background: #0E0F11;
        background-color: #1d2023;
        border-radius: 27px;
        overflow: hidden;
        display: flex;
        flex-flow: column;
        align-items: center;
        .mark_my_content {
          width: 100%;
          // margin-bottom: 55px;
          margin: 0 50px 55px;
          .search {
            padding: 0 20px;
            position: absolute;
            right: -50px;
            top: 35px;

            // justify-content: space-between;
            .search_left {
              margin-right: 50px;
              input {
                width: 315px;
                height: 60px;
                background: #0e0f11;
                border-radius: 23px;
                font-size: 18px;
                border: none;
                padding-left: 35px;
                color: #565656;
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
                img {
                  width: 22px;
                  height: 22px;
                }
              }
            }
          } //search
          .mark_text_one {
            font-family: "Quicksand-Bold";
          }
          .mark_product_container {
            width: 100%;
            height: 496px;
            overflow-y: scroll;
            margin-bottom: 35px;
            .mark_product {
              margin-top: 20px;
              width: 95%;
              margin: 0 auto;
              // border: 1px solid #313538;
              border-radius: 22px;
              .selected_area {
                .block_text {
                  color: #ffffff;
                  font-size: 18px;
                  font-family: "Roboto-Bold";
                }
                .show_text {
                  color: #d3aa53;
                  font-size: 28px;
                  padding: 100px 0;
                  font-family: "Roboto-Bold";
                  // margin-top: 150px;
                }
                .selected_user_list {
                  margin-top: 20px;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  .user_selected {
                    // width: 200px;
                    width: 17%;
                    height: 200px;
                    background-color: #0e0f11;
                    margin-left: 25px;
                    border-radius: 20px;
                    margin-bottom: 20px;
                    // line-height: 230px;
                    // text-align: center;
                    .img_area {
                      margin-top: 25px;
                      .avatar_img {
                        width: 86px;
                        height: 86px;
                        border-radius: 20px;
                        object-fit: cover;
                      }
                    }
                    .user_info {
                      display: block;
                      margin-top: 20px;
                      font-family: "Roboto-Regular";
                      .user_name {
                        color: #ffffff;
                        font-size: 18px;
                      }
                      .game_role {
                        color: #727272;
                        font-size: 16px;
                        margin-top: 10px;
                      }
                    }
                  }
                  .user_add {
                    width: 17%;
                    height: 200px;
                    background-color: #0e0f11;
                    // margin-left: 3px;
                    margin-left: 25px;
                    margin-bottom: 20px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                      width: 48px;
                      height: 48px;
                    }
                  }
                }
              }
              .line {
                background-color: #ffffff;
                width: 100%;
                height: 1px;
                margin-top: 20px;
              }
              .unselected_area {
                margin-top: 20px;
                .block_text {
                  color: #ffffff;
                  font-size: 18px;
                  font-family: "Roboto-Bold";
                }
                .show_text {
                  color: #d3aa53;
                  font-size: 28px;
                  padding: 100px 0;
                  font-family: "Roboto-Bold";
                }
                .selected_user_list {
                  margin-top: 20px;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  .user_selected {
                    // width: 200px;
                    width: 17%;
                    height: 200px;
                    background-color: #0e0f11;
                    margin-left: 25px;
                    margin-bottom: 20px;
                    border-radius: 20px;
                    // line-height: 230px;
                    // text-align: center;
                    .img_area {
                      margin-top: 25px;
                      .avatar_img {
                        width: 86px;
                        height: 86px;
                        border-radius: 20px;
                        object-fit: cover;
                      }
                    }
                    .user_info {
                      display: block;
                      margin-top: 20px;
                      font-family: "Roboto-Regular";
                      .user_name {
                        color: #ffffff;
                        font-size: 18px;
                      }
                      .game_role {
                        color: #727272;
                        font-size: 16px;
                        margin-top: 10px;
                      }
                    }
                  }
                  .user_add {
                    width: 17%;
                    height: 200px;
                    background-color: #0e0f11;
                    margin-left: 3px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                }
              }
            }
            &::-webkit-scrollbar {
              /*滚动条整体样式*/
              width: 13px; /*高宽分别对应横竖滚动条的尺寸*/
              height: 1px;
            }
            &::-webkit-scrollbar-thumb {
              /*滚动条里面小方块*/
              border-radius: 10px;
              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              background: #2b2b2b;
            }
            &::-webkit-scrollbar-track {
              /*滚动条里面轨道*/
              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              border-radius: 10px;
              background: #000000;
            }
          }
        }
        .mark_my_foot {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .confirm_btn {
            cursor: pointer;
            background-color: #d3aa53;
            color: #000;
            border-radius: 25px;
            width: 100px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
            margin-right: 30px;
            font-family: "Roboto-Regular";
          }
          .cancel_btn {
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
            font-family: "Roboto-Regular";
          }
        }
      }
      //Check out 01弹窗  end
    }
    //战队成员 end
  }

  .content_right {
    width: calc(100% - 370px);
    .upcoming_right_form {
      margin-top: 50px;
      .content_right_nav {
        display: flex;
        align-items: center;
        .right_nav_right {
          p {
            display: inline-block;
            color: #898989;
            padding: 0 30px;
            font-size: 18px;
            cursor: pointer;
            font-family: "Quicksand-Bold";
            border-right: 1px solid #7f7f7f;
          }
          p {
            &:last-child {
              border: none;
            }
          }
          .av {
            color: #bf9d62;
            font-family: "Quicksand-Bold";
          }
        }
      }
      .my_contaniner {
        width: 1000px;
        background: #0e0f11;
        border-radius: 29px;
        // margin: 40px 0 25px 0;
        margin: 20px 0 25px 0;
        .my_order_table {
          .order_table_head {
            padding: 20px 53px 0px 53px;
            height: 55px;
            font-size: 18px;
            display: flex;
            align-items: center;
            border-bottom: 2px solid #2d2d2d;
            .table_head_title {
              width: 20%;
              color: #727272;
              font-family: "Roboto-Bold";
              cursor: pointer;
            }
          }
          .table_av {
            color: #fff !important;
            font-size: 20px;
            font-family: "Roboto-Bold";
          }
          .order_table_btom {
            padding: 25px 53px;
            font-size: 25px;
            display: flex;
            align-items: center;
            .choice-contani {
              .choice_text {
                font-size: 18px;
                text-align: left;
                letter-spacing: 0px;
                color: #727272;
                font-family: "Roboto-Regular";
                opacity: 1;
              }
              .choice_date {
                width: 200px;
                height: 59px;
                background: #1d2023;
                border-radius: 20px;
                padding: 0 24px 0 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                .date_date {
                  color: #ffffff;
                  font-size: 20px;
                  font-family: "Roboto-Regular";
                  font-weight: 400;
                }
                .date_img {
                  width: 32px;
                  // height: 21px;
                  img {
                    width: 32px;
                    height: 21px;
                    object-fit: fill;
                  }
                }
              }
            }

            .status {
              .status_text {
                font-size: 18px;
                text-align: left;
                letter-spacing: 0px;
                color: #727272;
                font-family: "Roboto-Regular";
                opacity: 1;
              }
            }
            .sort_by {
              .sort_by_text {
                font-size: 18px;
                text-align: left;
                letter-spacing: 0px;
                color: #727272;
                opacity: 1;
                font-family: "Roboto-Regular";
              }
            }

            div {
              margin-right: 20px;
              .options {
                .dropdown {
                  width: 10px;
                  height: 8px;
                  position: relative;
                  right: 30px;
                }
                /deep/ .el-select .el-input .el-input__inner {
                  border: 0px;
                  width: 230px;
                  height: 59px;
                  color: #fff;
                  font-family: "Roboto-Regular";
                  border-radius: 20px;
                  background-color: #1d2023;
                  border: 1px solid #1d2023;
                }

                /deep/ .el-select-dropdown {
                  background-color: #0e0f11;
                  border: 1px solid rgba(255, 255, 255, 0.2);
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
                  text-align: center;
                }
                /deep/ .el-select-dropdown__item.hover {
                  background-color: #1d2023;
                }
                /deep/ .el-select-dropdown__item.selected {
                  background-color: #1d2023;
                }
              }
            }
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

          img {
          }

          .no_data_text {
            color: #565656;
            font-size: 20px;
            font-family: "Roboto-Regular";
            margin-top: 20px;
          }
        }
      }
      .upcom_container {
        display: flex;
        flex-wrap: wrap;
        display: flex;
        flex-wrap: wrap;
        margin-top: 50px;
        .match_card {
          // width: 751px;
          width: 1000px;
          height: 371px;
          background: #1c2023;
          border-radius: 16px;
          display: flex;
          margin-right: 42px;
          margin-bottom: 42px;
          overflow: hidden;
          box-shadow: 0 0.0625px 16px 0 rgb(0 0 0 / 10%);
          position: relative;
          cursor: pointer;
          .match_left {
            position: relative;
            width: 369px;
            height: 100%;
            height: 395px;
            img {
              width: 369px;
              height: 371px;
              object-fit: cover;
            }
          }
          .match_right {
            flex: 1;
            padding: 18px 30px 20px 30px;
            position: relative;
            .match_tit {
              width: 220px;
              font-size: 21px;
              color: #fff;
              line-height: 27px;
              font-family: "Roboto-Bold";
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .match_time {
              color: #d3aa53;
              font-size: 18px;
              font-family: "Roboto-Regular";
              margin-top: 15px;
              margin-bottom: 5px;
            }
            .match_hour_text {
              color: #fff;
              margin-bottom: 15px;
              font-family: "Roboto-Regular";
              font-size: 21px;
            }
            .match_flex {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 5px;
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
                  }
                }
              }
            }
            .match_flex_text {
              display: flex;
              align-items: center;
              line-height: 32px;
              justify-content: space-between;
              .text_left {
                color: #bf9d62;
                font-size: 18px;
                font-family: "Roboto-Regular";
              }
              .text_right {
                color: #ffffff;
                font-family: "Roboto-Regular";
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
                font-size: 18px;
                font-family: "Roboto-Regular";
              }
              .text_right {
                color: #ffffff;
                font-size: 18px;
                font-family: "Roboto-Bold";
              }
            }
            .check_in_btn {
              border: 1px solid #ff0000;
              border-radius: 15px;
              width: 120px;
              height: 35px;
              font-size: 16px;
              text-align: center;
              line-height: 35px;
              color: #ff0000;
              position: absolute;
              right: 80px;
              top: 20px;
            }
            .check_color {
              border: 1px solid #8cc63f;
              color: #8cc63f;
            }
            .btn_cursor {
              cursor: pointer;
            }
            .change_in_btn {
              border: 1px solid #ff0000;
              border-radius: 15px;
              width: 120px;
              height: 35px;
              font-size: 16px;
              text-align: center;
              line-height: 35px;
              color: #ff0000;
              position: absolute;
              right: 230px;
              top: 20px;
            }
            .match_flex_text3 {
              color: #ff0000;
              display: flex;
              // align-items: center;
              justify-content: flex-end;
              margin-top: 5px;
            }
          }
          .match_position {
            position: absolute;
            right: 0;
            top: 0;
            img {
              width: 40px;
            }
          }
        }
        .match_card:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
}

.championBox {
  position: absolute;
  bottom: 18px;
  width: 369px;
  height: 64px;
  background: rgba(0, 0, 0, 0.39);
}

.championTeam {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}
.championTeamIcon {
  width: 28px !important;
  height: 31px !important;
  margin-right: 17px;
  margin-left: 15px;
}

.championTeamAvatar {
  width: 43px !important;
  height: 43px !important;
  border-radius: 16px;
  margin-right: 8px;
}

.championPerson {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}

.championPersonAvatar {
  width: 45px !important;
  height: 45px !important;
  border-radius: 50%;
  margin-left: 27px;
  margin-right: 15px;
}

.championPersonName {
  font-size: 20px;
  font-family: Roboto-Regular;
  line-height: 24px;
  color: #ffffff;
}
</style>
