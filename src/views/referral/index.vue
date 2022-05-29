<template>
  <div class="index">
    <div class="container">
      <LeftView :index="11"></LeftView>

      <div class="content_right">
        <div class="title">Invite & earn COINS! </div>
        <dvi class="subtitle">Earn 5% of coins reward on your friends'top up. This referral does not stack with other promotion.</dvi>

        <div class="funList">
          <div class="funItem"
               v-for="(item,index) in funList"
               :key="index">
            <div class="funIcon">
              <img :src="item.icon"
                   alt="">
            </div>
            <div>{{item.label}}</div>
          </div>
        </div>

        <div class="referralContent">
          <div class="referralBox">
            <div class="referralItem">
              <div class="referralLabel">You receive</div>
              <div class="referralValue">{{receive}} <span>Coins</span></div>
            </div>
            <div class="referralItem">
              <div class="referralLabel">Friends’receive</div>
              <div class="referralValue">{{friendReceive}} <span>Coins</span></div>
            </div>
          </div>

          <div class="copyBox">
            <div class="copyLabel">Referral ID</div>
            <div class="copyValue">{{referralCode}}</div>
            <img style="width:23px;height:26px"
                 src="../../assets/images/icon-copy.png"
                 @click="copyFun(referralCode)">
          </div>

          <div class="copyBox">
            <div class="copyLabel">Referral link</div>
            <div class="copyValue">{{referralLink}}</div>
            <img style="width:23px;height:26px"
                 src="../../assets/images/icon-copy.png"
                 @click="copyFun(referralLink)">
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getUserReferral } from '@/api/user_info.js'
import LeftView from '@/components/order/left.vue'
export default {
  name: "referral",
  data () {
    return {
      userInfo: {},

      funList: [
        {
          label: 'Get link',
          icon: require('../../assets/images/icon-referral1.png')
        },
        {
          label: 'Invite friends',
          icon: require('../../assets/images/icon-referral2.png')
        },
        {
          label: 'Earn Coins ',
          icon: require('../../assets/images/icon-referral3.png')
        },
      ],

      referralLink: '',

      friendReceive: 0,
      receive: 0,
      referralCode: ""
    }
  },
  components: {
    LeftView
  },
  mounted () {
    this.getUserReferral()
    this.userInfo = JSON.parse(sessionStorage.getItem("userinfo"))


  },
  methods: {
    getUserReferral () {
      getUserReferral().then(res => {
        console.log(res)
        this.referralCode = res.data.referralCode
        this.receive = res.data.receive
        this.friendReceive = res.data.friendReceive
        const href = window.location.href.split('/')
        this.referralLink = `${href[0]}//${href[2]}/${href[3]}/login/index?referralId=${this.referralCode}`

      })
    },
    copyFun (val) {
      let copyInput = document.createElement("input");
      copyInput.setAttribute("value", val);
      document.body.appendChild(copyInput);
      copyInput.select();
      try {
        let copyed = document.execCommand("copy");
        if (copyed) {
          document.body.removeChild(copyInput);
        }
      } catch {
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 90%;
  margin-left: 61px;
  display: flex;
  justify-content: space-between; /* 横向中间自动空间 */
  flex-wrap: wrap; /* 换行 */
  padding-bottom: 30px;
  .content_right {
    width: calc(100% - 370px);
    padding-top: 220px;

    .title {
      font-size: 22px;
      font-family: Quicksand-Bold;
      color: #ffffff;
      margin-bottom: 19px;
    }
    .subtitle {
      font-size: 20px;
      font-family: Roboto-Regular;
      color: #898989;
    }

    .funList {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-top: 83px;
      margin-bottom: 65px;

      .funItem {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        font-size: 20px;
        font-family: Quicksand-Bold;
        color: #ffffff;

        &:nth-child(2) {
          margin-right: 119px;
          margin-left: 133px;
        }
        .funIcon {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 90px;
          height: 90px;
          background: rgba(14, 15, 17, 0.39);
          border-radius: 12px;

          margin-bottom: 12px;
          img {
            width: 37px;
            height: 37px;
          }
        }
      }
    }

    .referralContent {
      width: 1059px;
      height: 508px;
      background: #0e0f11;
      border-radius: 17px;

      .referralBox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #2d2d2d;

        padding: 54px 124px 47px 124px;
        box-sizing: border-box;

        margin-bottom: 82px;
        .referralItem {
          .referralLabel {
            font-size: 22px;
            font-family: Quicksand-Bold;
            color: #ffffff;
            margin-bottom: 10px;
          }
          .referralValue {
            font-size: 22px;
            font-family: Roboto-Regular;
            color: #e5a518;
            span {
              font-size: 20px;
              font-family: Roboto-Regular;
              color: #727272;
            }
          }
        }
      }

      .copyBox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        padding: 0px 124px;
        box-sizing: border-box;
        margin-bottom: 51px;

        .copyLabel {
          width: 116px;
          font-size: 20px;
          font-family: Roboto-Regular;
          color: #727272;
          margin-right: 70px;
        }
        .copyValue {
          flex: 1;
          font-size: 22px;
          font-family: Quicksand-Bold;
          line-height: 26px;
          color: #ffffff;
          white-space: nowrap;
        }
        img {
          width: 23px;
          height: 26px;
          cursor: pointer;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
