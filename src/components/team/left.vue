<template>
  <div class="index">
    <div class="container">
      <div class="content_left">
        <div class="content_left_head">
			<div class="about_block">
				<div class="about_block_padding">
					<div class="about_left">
						<div class="myan_left_in">
							<img :src="HOST + team_info.teamLogo" alt="">
						</div>
					</div>
					<div class="about_right">
						<div class="about_tit">{{team_info.teamName}}</div>
						<div class="about_subtit">{{team_info.gameName}}</div>
						<div class="about_version">{{team_info.teamSlogan}}</div>
						<div class="about_botm">
							<div class="about_btom_left">
								<div class="about_img">
									<img src="../../assets/images/rank4.png" alt="">
									<div class="about_num">{{team_info.champion || 0}}</div>
								</div>
								<div class="about_img2">
									<img src="../../assets/images/rank5.png" alt="">
									<div class="about_num">{{team_info.runnerUp || 0}}</div>
								</div>
								<div class="about_img2" style="margin-right: 0;">
									<img src="../../assets/images/rank6.png" alt="">
									<div class="about_num">{{team_info.thirdPlace || 0}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        
		<div class="content_left_col">
			<p  :class="nav==1?'av':''" @click="navs(1)">About</p>
			<p :class="nav==2?'av':''" @click="navs(2)">Team Member</p>
			<p :class="nav==3?'av':''" @click="navs(3)">Team Tournament</p>
			<p :class="nav==4?'av':''" @click="navs(4)">Announcement</p>
			<p v-if="userId == leaderId" :class="nav==5?'av':''" @click="navs(5)">Setting</p>
		</div>
      </div>
    </div>
  </div>
</template>

<script>
	import {teamAchievement} from '@/api/team';
export default { 
  name: "index",
  components: {
  },
  props: ['index'],
  data() {
    return {
        nav:this.index,
		teamId:sessionStorage.getItem("teamId"),
		team_info:'',
		member_list:'',
		userId:sessionStorage.getItem("userId"), 
		leaderId:'', //队长id
    };
  },
  mounted() {
	  this.get_team(sessionStorage.getItem("teamId"))	 
  },
  methods: {
	  // 战队详细信息
	  get_team(teamId){
	  	let that = this;
	  	let params = {
	  		teamId
	  	}
	  	teamAchievement(params).then(res => {
	  		that.team_info = res.data
			that.leaderId = res.data.leaderId
			sessionStorage.setItem("leaderId", res.data.leaderId)
			sessionStorage.setItem("info_team", '')
	  		sessionStorage.setItem("info_team", JSON.stringify(that.team_info))
	  	})
	  },
      navs(index){
		if(index == 1){
			this.$router.push({path:'/tearm/team_about'})
		}else if(index == 2){
			this.$router.push({path:'/tearm/application_list'})
		}else if(index == 3){
			this.$router.push({path:'/tearm/tour_upcoming'})
		}else if(index == 4){
			this.$router.push({path:'/tearm/team_announcement'})
		}else if(index == 5){
			this.$router.push({path:'/tearm/team_setting'})
		}
    }
  }
};
</script>
<style lang="less" scoped>
.container{
  .content_left{
    width: 301px;
    // margin-top: 125px;
	margin-top: 157px;
	// left_head
	.content_left_head{
		.about_block{
			background-color: #0E0F11;
			border-radius: 29px;
			.about_block_padding{
				position: relative;
				padding: 0px 37px 23px 37px;
				.about_left{
					position: absolute;
					// top: -50px;
					top: -110px;
					left: 0;
					right: 0;
					width: 184px;
					height: 184px;
					border-radius: 50%;
					background-color: #0E0F11;
					overflow: hidden;
					margin: 0 auto;
					display: flex;
					justify-content: center;
					align-items: center;
					.myan_left_in{
						// width: 163px;
						// height: 163px;
						width: 184px;
						height: 184px;
						border-radius: 50%;
						overflow: hidden;
						img{
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}
					
				}
				.about_right{
					// padding-top: 137px;
					padding-top: 107px;
					display: flex;
					flex-direction: column;
					.about_tit{
						color: #FFFFFF;
						font-size: 25px;
						font-family:'Roboto-Medium';
						margin: 13px 0px 6px 0px;
					}
					.about_subtit{
						color: #D3AA53;
						font-size: 18px;
						font-family:'Roboto-Regular';
						margin: 0px 0px 12px 0px;
					}
					.about_version{
						color: #727272;
						font-size: 18px;
						line-height: 25px;
						font-family:'Roboto-Regular';
						overflow:hidden;
						text-overflow:ellipsis;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:2; 
						text-align: center;
					}
					.about_botm{
						margin-top: 40px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.about_btom_left{
							display: flex;
							width: 100%;
							justify-content: space-between;
							.about_img{
								border-radius: 18px;
								overflow: hidden;
								margin-right: 11px;
								display: flex;
								flex-direction: column;
								align-items: center;
								img{
									width: 52px;
									object-fit: cover;
								}
								.about_num{
									margin-top: 11px;
									color: #D3AA53;
									font-size: 18px;
									font-family:'Roboto-Medium';
								}
							}
							.about_img2{
								border-radius: 18px;
								overflow: hidden;
								margin-right: 11px;
								display: flex;
								flex-direction: column;
								align-items: center;
								img{
									width: 43px;
									object-fit: cover;
								}
								.about_num{
									margin-top: 11px;
									color: #D3AA53;
									font-size: 18px;
									font-family:'Roboto-Medium';
								}
							}
						}
					}
				}
			}
			
		}
	}
	// left_nav
    .content_left_col{
      padding: 13px 19px 13px 15px;
	  border-radius: 33px;
	  background-color: #0E0F11;
	  margin: 18px 0 0px 0;
      p{
        cursor: pointer;
        height: 53px;
        border-radius: 18px;
        color: #9B9B9B;
        line-height: 53px;
        padding-left: 20px;
        font-size: 18px;
		font-family:'Quicksand-Bold';
      }
      .av{
        background: #1D2023;
		font-family:'Quicksand-Bold';
        color: #D3AA53;
      }
    }
  }
}
</style>
