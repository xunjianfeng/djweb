<template>
	<div class="index">
		<div class="container">
			<LeftView :index="4"></LeftView>
			<div class="content_right">
				<!-- content_right_top -->
				<div class="content_right_form">
					<div class="notice_noticetion">
						<div class="notice_container">
							<div class="notice_head">
								<div class="" v-if="edit_ment != 1">
									<div class="notice_head_text" v-if="team_info.announcementTitle != null && team_info.announcementTitle != ''">{{team_info.announcementTitle}}</div>
									<div class="notice_head_text" v-if="(team_info.announcementTitle == null || team_info.announcementTitle == '')">Update your announcement</div>
									
								</div>
								<div class="notice_head_input" v-else>
									<input type="text" v-model="team_info.announcementTitle">
								</div>
								<div class="" v-if="edit_ment != 1">
									<div class="notice_head_time"  v-if="team_info.announcementTitle != null && team_info.announcementTitle != ''">Last Updated:{{initDete(team_info.announcementTime)}}</div>
								</div>
							</div>
							<div class="notice_content">
								<div class="" v-if="edit_ment != 1 ">
									<div class="notice_text notice_margin" v-if="team_info.announcement != null && team_info.announcement != ''">{{team_info.announcement || ''}}</div>
									<div class="notice_text notice_margin" v-if="team_info.announcement == null || team_info.announcement == ''">You can update your announcement in setting (Only leader can update)</div>
									
								</div>
								<div class="area_input_block" v-else>
									<textarea rows="12" class="input-left" v-model="team_info.announcement" maxlength="1000"></textarea>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 取消/保存 -->
				<div class="creat_team_btom" v-if="edit_ment == 1"> 
					<div class="skip_button" @click="jump_setting">Cancel</div>
					<div class="invite_button" @click="edit_team">Save</div>
				</div>
				<!-- 聊天icon -->
				<div class="chart">
					<img src="../../assets/images/chart.png" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {addTeam,teamAchievement} from '@/api/team';
	import LeftView from '@/components/team/left.vue'
	export default{
		name:"team_announcement",
		components:{
			LeftView
		},
		data(){
			return{
				teamId:sessionStorage.getItem("teamId"),
				team_info:'',
				edit_ment:'', //1 编辑  其他状态只显示
			}
		},
		mounted() {
			if(this.$route.query.type != '' && this.$route.query.type != undefined && this.$route.query.type != null){
				this.edit_ment = this.$route.query.type
			}
			this.get_team(sessionStorage.getItem("teamId"))
		},
		methods:{
			// 战队详细信息
			get_team(teamId){
				let that = this;
				let params = {
					teamId
				}
				teamAchievement(params).then(res => {
					that.team_info = res.data
					sessionStorage.setItem("leaderId", res.data.leaderId)
				})
			},
			// 保存信息
			edit_team(){
				let that  = this;
				let { teamName ,teamLogo ,teamSlogan ,aboutTeam , gameId,announcementTitle} = that.team_info;
				let params = {
					teamId:sessionStorage.getItem("teamId"),
					teamName,
					teamLogo,
					teamSlogan,
					aboutTeam,
					announcementTitle:that.team_info.announcementTitle,
					announcement:that.team_info.announcement,
					gameId,
				}
				addTeam(params).then(res => {
					that.$message({
						message: res.message,
						type: 'success'
					})					
					that.$router.go(-1);
				})
			},
			// 返回战队设置
			jump_setting(){
				this.$router.push({ path: '/tearm/team_setting'})
			},
		}
	}
</script>

<style lang="less" scoped>
.container{
	width: calc(100% - 150px);
	margin-left: 61px;
	display: flex;
	flex-wrap: wrap; /* 换行 */
	.content_right{
		margin-left: 51px;
		width: calc(100% - 435px);
		.content_right_form{
			margin-top: 120px;
			.notice_noticetion{
				width: 100%;
				background: #0E0F11;
				border-radius: 55px;
				.notice_container{
					padding: 0 60px;
					.notice_head{
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 46px 0px 27px 0px;
						border-bottom: 2px solid #3C3E3F;
						.notice_head_text{
							font-size: 22px;
							color: #FFFFFF;
							font-family:'Quicksand-Bold';
						}
						.notice_head_input{
							width: 60%;
							font-size: 22px;
							color: #FFFFFF;
							font-family:'Quicksand-Bold';
							input{
								width: 100%;
								height: 40px;
								font-size: 18px;
								color: #FFFFFF;
								font-family:'Quicksand-Bold';
								padding: 0 2%;
								background-color:#0E0F11;
								border: 1px solid #3c3e3f;
							}
						}
						.notice_head_time{
							font-size: 20px;
							color: #D3AA53;
							font-family:'Roboto-Regular';
						}
					}
					.notice_content{
						padding: 32px 0 112px 0;
						.notice_text{
							color: #727272;
							font-size: 20px;
							font-family:'Roboto-Regular';
						}
						.notice_margin{
							margin-bottom: 30px;
							font-family:'Roboto-Regular';
						}
						.area_input_block {
							display: flex;
							padding: 20px 0px;
							background-color: #0e0f11;
							align-items: center;
							border-radius: 19px;
							position: relative;
							color: #fff;
							font-family:'Roboto-Regular';
							.input-left {
								width: 100%;
								color: #fff;
								font-family:'Roboto-Regular';
								height: 260px;
								padding: 10px 10px;
								border: none;
								background-color: #0e0f11;
								background: inherit;
								font-size: 20px;
								resize: none;
								border: 1px solid #3c3e3f;
							}
						}
					}
				}
			}
		}
		.creat_team_btom {
			margin-top: 179px;
			margin: 40px 0 40px 0;
			display: flex;
			align-items: center;
			justify-content: center;
			.invite_button {
				width: 163px;
				height: 58px;
				color: #0E0F11;
				font-size: 20px;
				cursor: pointer;
				line-height: 58px;
				text-align: center;
				background: #D3AA53;
				font-family:'Roboto-Regular';
				border-radius: 25px;
			}
			.skip_button {
				width: 163px;
				height: 56px;
				color: #FFFFFF;
				font-family:'Roboto-Regular';
				font-size: 20px;
				cursor: pointer;
				line-height: 58px;
				text-align: center;
				border-radius: 25px;
				margin-right: 20px;
				border: 1px solid #777777;
			}
		}
		.chart{
			position: fixed;
			bottom: -120px;
			right: -110px;
			width: 350px;
			height: 350px;
			img{
				width: 300px;
				height: 300px;
			}
		}
	}
}
</style>
