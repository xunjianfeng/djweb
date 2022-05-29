<template>
  <div class="index">
    <div class="container">
      <!-- 分类 -->
      <div class="firstType">
        <div class="typeText"
             :class="{ typeTextActive: firstType == '1' }"
             @click="switchType(1)">
          Tournament
        </div>
        <div style="margin: 0 8px">|</div>
        <div class="typeText"
             :class="{ typeTextActive: firstType == '2' }"
             @click="switchType(2)">
          Rapid Challenge
        </div>
      </div>

      <div class="secondType">
        <div class="secondTypeText"
             :class="{ secondTypeTextActive: secondType == '3' }"
             @click="switchSecondType(3)">
          Personal
        </div>
        <div v-if="firstType == '1'"
             class="line"></div>
        <div v-if="firstType == '1'"
             class="secondTypeText"
             :class="{ secondTypeTextActive: secondType == '4' }"
             @click="switchSecondType(4)">
          Team
        </div>
      </div>

      <!-- 筛选 -->
      <!-- <div class="order_table_btom">
        <div class="choice-contani">
          <p class="choice_text">Game</p>
          <div class="choice_date"
               @click="jump_dota">
            <div class="date_date">{{ gameName }}</div>
            <div class="date_img">
              <img src="@/assets/images/more2.png"
                   alt="" />
            </div>
          </div>
        </div>

        <div class="sort_by">
          <p class="sort_by_text">Filter</p>
          <div class="options">
            <el-select v-model="params.type"
                       @change="handleFilter"
                       placeholder="请选择"
                       style="margin-right: 20px"
                       :popper-append-to-body="false">
              <el-option label="Newest"
                         value="desc"></el-option>
              <el-option label="Oldest"
                         value="asc"></el-option>
            </el-select>
          </div>
        </div>
      </div> -->

      <!-- 前三名 -->

      <template v-if="firstType==1">
        <template v-if="secondType==3">
          <div class="rankingList">
            <div class="rankingItem second">
              <img class="avatar"
                   :src="HOST+tournamentPersonal[1].avatar" />
              <img class="bg"
                   src="../../assets/images/icon-ranking2.png">
              <div>{{ tournamentPersonal[1].teamName }}</div>
            </div>

            <div class="rankingItem first">
              <img class="avatar"
                   :src="HOST+tournamentPersonal[0].avatar" />
              <img class="bg"
                   src="../../assets/images/icon-ranking1.png">
              <div>{{ tournamentPersonal[0].teamName }}</div>
            </div>

            <div class="rankingItem third">
              <img class="avatar"
                   :src="HOST+tournamentPersonal[2].avatar" />
              <img class="bg"
                   src="../../assets/images/icon-ranking3.png">
              <div>{{ tournamentPersonal[2].teamName }}</div>
            </div>
          </div>
        </template>
        <template v-else-if="secondType==4">

          <div class="rankingList">
            <div class="rankingItem second">
              <img class="avatar"
                   :src="HOST+tournamentTeam[1].avatar" />
              <img class="bg"
                   src="../../assets/images/icon-ranking2.png">
              <div>{{ tournamentTeam[1].teamName }}</div>
            </div>

            <div class="rankingItem first">
              <img class="avatar"
                   :src="HOST+tournamentTeam[0].avatar" />
              <img class="bg"
                   src="../../assets/images/icon-ranking1.png">
              <div>{{ tournamentTeam[0].teamName }}</div>
            </div>

            <div class="rankingItem third">
              <img class="avatar"
                   :src="HOST+tournamentTeam[2].avatar" />
              <img class="bg"
                   src="../../assets/images/icon-ranking3.png">
              <div>{{ tournamentTeam[2].teamName }}</div>
            </div>
          </div>
        </template>
      </template>
      <template v-else-if="firstType==2">

        <div class="rankingList">
          <div class="rankingItem second">
            <img class="avatar"
                 :src="HOST+rapidPersonal[1].avatar" />
            <img class="bg"
                 src="../../assets/images/icon-ranking2.png">
            <div>{{ rapidPersonal[1].userName }}</div>
          </div>

          <div class="rankingItem first">
            <img class="avatar"
                 :src="HOST+rapidPersonal[0].avatar" />
            <img class="bg"
                 src="../../assets/images/icon-ranking1.png">
            <div>{{ rapidPersonal[0].userName }}</div>
          </div>

          <div class="rankingItem third">
            <img class="avatar"
                 :src="HOST+rapidPersonal[2].avatar" />
            <img class="bg"
                 src="../../assets/images/icon-ranking3.png">
            <div>{{ rapidPersonal[2].userName }}</div>
          </div>
        </div>
      </template>

      <!-- 表格 -->
      <template v-if="firstType==1">

        <template v-if="secondType==3">

          <div style="width: 1446px">
            <el-table :data="tournamentPersonalData"
                      border
                      stripe
                      :header-cell-style="headerCellStyle"
                      :cell-style="cellStyle">
              <el-table-column align="center"
                               label="Rank"
                               width="177">
                <template slot-scope="scope">
                  <img style="width: 145px"
                       v-if="params.page==1&&scope.$index==0"
                       src="../../assets/images/rank1.png" />
                  <img style="width: 116px"
                       v-else-if="params.page==1&&scope.$index==1"
                       src="../../assets/images/rank2.png" />
                  <img style="width: 101px"
                       v-else-if="params.page==1&&scope.$index==2"
                       src="../../assets/images/rank3.png" />
                  <span v-else>{{ params.page==1?scope.$index+1: (params.page-1)*10+scope.$index+1 }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left"
                               prop="name"
                               label="User Name">
                <template slot-scope="scope">
                  <div class="avatarBox">
                    <img :class="[scope.$index<3?'bigAvatar':'smallAvatar']"
                         :src="HOST+scope.row.avatar"
                         alt="avatar">
                    <div class="userName">{{scope.row.teamName}}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center"
                               prop="totalGamePlayed"
                               label="Number of game played">
              </el-table-column>
              <el-table-column align="center"
                               prop="champion"
                               label="1#"
                               width="120">
              </el-table-column>
              <el-table-column align="center"
                               prop="runnerUp"
                               label="2#"
                               width="120">
              </el-table-column>
              <el-table-column align="center"
                               prop="secondRunnerUp"
                               label="3#"
                               width="120">

              </el-table-column>
              <el-table-column align="center"
                               prop="prizeWon"
                               label="Prize won (MYR)"
                               width="231">
              </el-table-column>
            </el-table>
          </div>

          <pagination :total="tournamentPersonalTotal"
                      :page.sync="params.page"
                      :limit.sync="params.limit"
                      @pagination="getList" />
        </template>

        <template v-else-if="secondType==4">
          <el-table :data="tournamentTeamData"
                    border
                    stripe
                    :header-cell-style="headerCellStyle"
                    :cell-style="cellStyle">
            <el-table-column align="center"
                             label="Rank"
                             width="177">
              <template slot-scope="scope">
                <img style="width: 145px"
                     v-if="params.page==1&&scope.$index==0"
                     src="../../assets/images/rank1.png" />
                <img style="width: 116px"
                     v-else-if="params.page==1&&scope.$index==1"
                     src="../../assets/images/rank2.png" />
                <img style="width: 101px"
                     v-else-if="params.page==1&&scope.$index==2"
                     src="../../assets/images/rank3.png" />
                <span v-else>{{ params.page==1?scope.$index+1: (params.page-1)*10+scope.$index+1 }}</span>
              </template>
            </el-table-column>
            <el-table-column align="left"
                             prop="name"
                             label="User Name">
              <template slot-scope="scope">
                <div class="avatarBox">
                  <img :class="[scope.$index<3?'bigAvatar':'smallAvatar']"
                       :src="HOST+scope.row.avatar"
                       alt="avatar">
                  <div class="userName">{{scope.row.teamName}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             prop="totalGamePlayed"
                             label="Number of game played"
                             width="266">
            </el-table-column>
            <el-table-column align="center"
                             prop="champion"
                             label="1#"
                             width="120">
            </el-table-column>
            <el-table-column align="center"
                             prop="runnerUp"
                             label="2#"
                             width="120">
            </el-table-column>
            <el-table-column align="center"
                             prop="secondRunnerUp"
                             label="3#"
                             width="120">

            </el-table-column>
            <el-table-column align="center"
                             prop="prizeWon"
                             label="Prize won (MYR)"
                             width="231">
            </el-table-column>
          </el-table>

          <pagination :total="tournamentTeamTotal"
                      :page.sync="params.page"
                      :limit.sync="params.limit"
                      @pagination="getList" />
        </template>
      </template>

      <template v-else-if="firstType==2">
        <div style="width: 1446px">
          <el-table :data="rapidPersonalData"
                    border
                    stripe
                    :header-cell-style="headerCellStyle"
                    :cell-style="cellStyle">
            <el-table-column align="center"
                             label="Rank"
                             width="177">
              <template slot-scope="scope">
                <img style="width: 145px"
                     v-if="params.page==1&&scope.$index==0"
                     src="../../assets/images/rank1.png" />
                <img style="width: 116px"
                     v-else-if="params.page==1&&scope.$index==1"
                     src="../../assets/images/rank2.png" />
                <img style="width: 101px"
                     v-else-if="params.page==1&&scope.$index==2"
                     src="../../assets/images/rank3.png" />
                <span v-else>{{ params.page==1?scope.$index+1: (params.page-1)*10+scope.$index+1 }}</span>
              </template>
            </el-table-column>
            <el-table-column align="left"
                             prop="name"
                             label="User Name">
              <template slot-scope="scope">
                <div class="avatarBox">
                  <img :class="[scope.$index<3?'bigAvatar':'smallAvatar']"
                       :src="HOST+scope.row.avatar"
                       alt="avatar">
                  <div class="userName">{{scope.row.userName}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             prop="totalGamePlayed"
                             label="Total game played"
                             width="266">
            </el-table-column>
            <el-table-column align="center"
                             prop="totalGameWon"
                             label="Total game won"
                             width="232">
            </el-table-column>
            <el-table-column align="center"
                             prop="winRate"
                             label="Win rate"
                             width="127">
            </el-table-column>
            <el-table-column align="center"
                             prop="coinsWon"
                             label="coins"
                             width="231">
            </el-table-column>
          </el-table>
        </div>

        <pagination :total="rapidPersonalTotal"
                    :page.sync="params.page"
                    :limit.sync="params.limit"
                    @pagination="getList" />
      </template>

    </div>
  </div>
</template>
<script>
import pagination from "../../components/Pagination/ranking.vue";
import { rankRapid, rankTournament } from '@/api/ranking.js'

export default {
  name: "ranking",
  filters: {},
  components: { pagination },
  data () {
    return {
      headerCellStyle: {
        background: "#000",
        color: "#fff",
        height: "75px",
        borderRight: "4px solid #000",
        borderBottom: "1px solid #000",
        fontSize: "22px",
        fontFamily: "Roboto-Bold",
        color: "#E5E5E5",
        lineHeight: '24px'
      },
      cellStyle: {
        background: "#1D2023",
        borderBottom: "0px solid #000",
        fontSize: "22px",
        fontFamily: "Roboto-Regular",
        color: "#F4F4F4",
      },
      firstType: "1",
      secondType: "3",

      gameName: "All",

      rankingList: [
        {
          name: "Peter Tang",
          icon: require("@/assets/images/icon-ranking1.png"),
        },
        {
          name: "Jessica Liong",
          icon: require("@/assets/images/icon-ranking2.png"),
        },
        {
          name: "Lion",
          icon: require("@/assets/images/icon-ranking3.png"),
        },
      ],

      tournamentPersonal: [],
      tournamentTeam: [],
      rapidPersonal: [],

      tournamentPersonalPage: [],
      tournamentTeamPage: [],
      rapidPersonalPage: [],

      tournamentPersonalData: [],
      tournamentTeamData: [],
      rapidPersonalData: [],

      tournamentPersonalTotal: 0,
      tournamentTeamTotal: 0,
      rapidPersonalTotal: 0,

      params: {
        page: 1,
        limit: 10,
        type: "desc",
      },
    };
  },
  mounted () {
    this.getList();
  },
  methods: {
    group (array, subGroupLength) {
      console.log(subGroupLength)
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
      }
      return newArray;
    },

    switchType (e) {
      this.firstType = e;
      this.secondType = "3";
    },
    switchSecondType (e) {
      this.secondType = e;
    },

    handleFilter () {
      this.params.page = 1;
      this.getList();
    },

    getList () {
      // 获取数据

      rankRapid().then(res => {
        this.rapidPersonal = res.data
        this.rapidPersonalTotal = this.rapidPersonal.length
        let rapidPersonalPages = Math.ceil(this.rapidPersonal.length / 10)
        this.rapidPersonalPage = this.group(this.rapidPersonal, 10)
        this.rapidPersonalData = this.rapidPersonalPage[this.params.page - 1]
      })

      rankTournament().then(res => {
        this.tournamentPersonal = res.data[1]
        this.tournamentPersonalTotal = this.tournamentPersonal.length
        let tournamentPersonalPages = Math.ceil(this.tournamentPersonal.length / 10)
        this.tournamentPersonalPage = this.group(this.tournamentPersonal, 10)
        this.tournamentPersonalData = this.tournamentPersonalPage[this.params.page - 1]

        this.tournamentTeam = res.data[2]
        this.tournamentTeamTotal = this.tournamentTeam.length
        let tournamentTeamPages = Math.ceil(this.tournamentTeam.length / 10)
        this.tournamentTeamPage = this.group(this.tournamentTeam, 10)
        this.tournamentTeamData = this.tournamentTeamPage[this.params.page - 1]
      })
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 94%;
  padding-left: 4%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 99% 2%;
  background-size: 50%;
  padding-top: 46px;

  .firstType {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    font-size: 22px;
    font-family: Quicksand-Bold;
    color: #fff;

    margin-bottom: 34px;

    .typeText {
      cursor: pointer;
    }

    .typeTextActive {
      color: #d3aa53;
    }
  }

  .secondType {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    font-size: 20px;
    font-family: Roboto-Regular;
    color: #898989;
    cursor: pointer;
  }

  .secondTypeTextActive {
    font-family: Roboto-Bold;
    color: #bf9d62;
  }

  .line {
    width: 1px;
    height: 25px;
    background: #7f7f7f;
    margin-left: 58px;
    margin-right: 73px;
  }

  .order_table_btom {
    margin-top: 32px;
    font-size: 20px;
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
        background: #0e0f11;
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
          background-color: #0e0f11;
          border: 1px solid #0e0f11;
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

  .rankingList {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 38px;
    .rankingItem {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      position: relative;
    }

    .first {
      width: 427px;
      height: 339px;
      font-size: 25px;
      font-family: Roboto-Medium;
      color: #ffd255;
      margin: 0 72px;
      .bg {
        position: absolute;
        width: 427px;
        z-index: 10;
      }
      .avatar {
        position: absolute;
        top: 95px;
        width: 140px;
        height: 163px;

        z-index: 5;
        object-fit: cover;
      }
      div {
        position: absolute;
        top: 320px;
      }
    }

    .second {
      width: 301px;
      height: 229px;
      font-size: 22px;
      font-family: Roboto-Medium;
      color: #cad6e0;
      .bg {
        position: absolute;
        width: 427px;
        z-index: 10;
      }
      .avatar {
        position: absolute;
        top: 81px;
        width: 140px;
        height: 164px;

        z-index: 5;
        object-fit: cover;
      }
      div {
        position: absolute;
        top: 290px;
      }
    }

    .third {
      width: 271px;
      height: 209px;
      font-size: 22px;
      font-family: Roboto-Medium;
      color: #fd7a66;
      .bg {
        position: absolute;
        width: 427px;
        z-index: 10;
      }
      .avatar {
        position: absolute;
        top: 77px;
        width: 140px;
        height: 160px;

        z-index: 5;
        object-fit: cover;
      }
      div {
        position: absolute;
        top: 270px;
      }
    }
  }

  /deep/.el-table {
    border-radius: 32px;
    background: #1d2023;
    overflow: hidden;
  }
  /deep/.el-table--border {
    border: 1px solid #1d2023;
  }
  /deep/.el-table tr {
    background: #1d2023;
  }

  /deep/.el-table__row--striped td {
    background: #313538 !important;
  }
  /deep/.el-table:before {
    height: 0px;
  }
  /deep/.el-table--border:after {
    width: 0px;
  }
  /deep/.el-table__row td {
    border-right: 4px solid #161616;
  }
  /deep/.el-table__row td:last-child {
    border-right: 0px solid #161616;
  }

  .avatarBox {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .bigAvatar {
    width: 100px;
    height: 100px;
    border-radius: 36px;
    margin-right: 41px;
  }
  .smallAvatar {
    width: 50px;
    height: 50px;
    border-radius: 18px;
    margin-right: 66px;
    margin-left: 25px;
  }
  .userName {
    font-size: 22px;
    font-family: Roboto-Bold;
    color: #f4f4f4;
  }
}
</style>
