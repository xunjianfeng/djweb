<template>
	<div class="index index_background">
		<div class="container">
			<div class="container_bacolor">
				<div class="match_container">
					<div class="match_content">
						<div class="desc_top">
							<div class="title_text" v-if="state==1">
								{{detail_list.tournamentName}}
							</div>
							<div class="title_text" style="margin-bottom: 30px;" v-if="state == 2">
								Participants
							</div>
							<div class="title_nav" v-if="state==1">
								<div  @click="jump_free(1)">Bracket</div>
								<div class="av" @click="jump_free(2)">Participants</div>
								<div @click="jump_free(3)">Information</div>
								<div @click="jump_free(4)" v-if="format > 2">Standings</div>
							</div>
						</div>
						<!-- 版块head -->
						<div class="partake_container">
							<div class="partake_block" v-for="(item,index) in contestant" :key='index' @mouseenter="detail_list.tournamentType!=0?showMemeber(item.teamId):''" @mouseleave="detail_list.tournamentType!=0?closeMember(item.teamId):''">
								<div class="partake_block_padding"  v-if="item.show_status == false">
									<div class="partake_left">
										<img :src="HOST + item.teamLogo" alt="">
									</div>
									<!-- 左侧 -->
									<div class="partake_right">
										<div class="partake_tit">
											<!-- {{item.teamName}} -->
											<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
												<div>{{item.teamName}}</div>
												<!-- <p>{{item.teamName}}</p> -->
											</el-tooltip>
										</div>
										<div class="partake_version">{{item.aboutTeam}}</div>
									</div>
								</div>
								<!-- 显示战队成员 -->
								<div class="team_member_list" v-if="item.show_status == true">
									<div class="team_member">
										<div class="member_block" v-for="(mtem,mndex) in item.users" :key="mndex">
											<el-image :src="HOST + mtem.avatar" class="member_avatar">
												<div slot="error" class="image-slot"> 
													<img src="../../assets/images/default.png" class="member_avatar"/>
												</div>
											</el-image>
											<!-- <img :src="HOST + mtem.avatar" class="member_avatar" v-if="mtem.avatar"/> -->
											<!-- <img src="../../assets/images/default.png" class="member_avatar" v-else /> -->
											<el-tooltip class="item" effect="dark" :content="mtem.fullName" placement="bottom">
												<div class="member_name">{{mtem.fullName}}</div>
											</el-tooltip>
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {
	roundLog,
	tournamentDetail
} from '@/api/tournament'
	import {teamUsers} from '@/api/team.js'
export default {
	name: 'participantm',
	data() {
		return {
			tournamentId:'',
			contestant:'',
			detail_list:'',
			member_list:[],
			format:1,
			state:1,//1为非报名状态下的参赛人员，2为报名状态下的参赛人员
		};
	},
	mounted() {
		if(this.$route.query.id != '' &&  this.$route.query.id != null && this.$route.query.id != undefined ){
			this.tournamentId = this.$route.query.id
			this.tournamentDetail();
		}
		if(this.$route.query.state != '' &&  this.$route.query.state != null && this.$route.query.state != undefined){
			this.state = this.$route.query.state
		}else{
			this.state == 1
		}
	},
	methods:{
		//显示战队成员
		showMemeber(teamId){
			// console.log(teamId)
			// this.show_status = true
			// teamUsers({teamId}).then(res => {
			// 	this.member_list = res.data.usrs
			// 	console.log(this.member_list)
			// })
			for(let a = 0; a< this.contestant.length; a++){
				if(this.contestant[a].teamId == teamId){
					this.contestant[a].show_status = true
				}else{
					this.contestant[a].show_status = false
				}
			}
		},
		//关闭战队成员的显示
		closeMember(teamId){
			for(let a = 0; a< this.contestant.length; a++){
				if(this.contestant[a].teamId == teamId){
					this.contestant[a].show_status = false
				}
			}
		},
		tournamentDetail(){
			let that = this;
			tournamentDetail({tournamentId:that.$route.query.id}).then(res => {
				for(let i = 0; i < res.data.contestant.length;i++){
					res.data.contestant[i]['show_status'] = false
				}
				that.contestant = res.data.contestant
				that.detail_list = res.data;
				that.format = res.data.stages[0].format
			})
		},
		jump_free(index){
			let that = this;
			if(index == 1){
				that.$router.push({ path: '/tournament/bracketm',query:{id:that.tournamentId}})
			}else if(index == 2){
				that.$router.push({ path: '/tournament/participantm',query:{id:that.tournamentId}})
			}else if(index == 3){
				that.$router.push({ path: '/tournament/Informationsm',query:{id:that.tournamentId}})
			}else if(index == 4){
				that.$router.push({ path: '/tournament/standingsm',query:{id:that.tournamentId}})
			}
		}
	}
};
</script>

<style lang="less" scoped>
.route{
	height: auto;
	position: absolute !important;;
	top: 0 !important;
	
}
.index_background{
	background: rgba(0, 0, 0, 0.7);
	.container {
		background-repeat: no-repeat;
		background-size: 100% ;
		height: 100vh;
		.container_bacolor {
			width: calc(100% - 150px);
			display: flex;
			justify-content: space-between; /* 横向中间自动空间 */
			flex-wrap: wrap; /* 换行 */
			// width: 1293px;
			.match_container {
				margin-top: 160px;
				width: 100%;
				margin-left: 120px;
				.match_content {
					display: flex;
					flex-wrap: wrap;
					
					.desc_top{
						width: 100%;
						text-align: center;
						.title_text{
							font-size: 30px;
							color: #fff;
							font-family:'Roboto-Bold';
						}
						.title_nav{
							width: 100%;
							height: 60px;
							color: #9B9B9B;
							background: #000000 0% 0% no-repeat padding-box;
							display: flex;
							align-items: center;
							font-size: 20px;
							border-radius: 25px;
							margin: 30px auto;		
							font-family:'Roboto-Bold';
							div{
								border-right: 1px solid #727272;
								width: 25%;
								padding-right: 20px;
								text-align: center;
								cursor: pointer;
							}
							
							div:nth-child(4){
									border-right: 0px;
							}
							div:last-child{
								border-right: 0px;
							}
							.av{
							  color: #BF9D62;
							}
						}
					}
					//参与partake
					.partake_container{
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						margin-bottom: 120px;
						.partake_block{
							width: 48%;
							background-color: #0E0F11;
							border-radius: 20px;
							margin: 0 40px 40px 0;
							.partake_block_padding{
								display: flex;
								padding: 30px 30px 30px 30px;
								.partake_left{
									width: 100px;
									height: 100px;
									border-radius: 50%;
									overflow: hidden;
									margin-right: 30px;
									img{
										width: 100%;
										height: 100%;
										object-fit: cover;
									}
								}
								.partake_right{
									width: 70%;
									.partake_tit{
										color: #FFFFFF;
										font-size: 18px;
										font-family:'Roboto-Regular';
										margin: 12px 0px;
										width: 300px;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap
									}
									.partake_version{
										color: #727272;
										font-family:'Roboto-Regular';
										font-size: 17px;
									}
								}
								
							}
							//显示战队成员
							.team_member_list{
								width: 95%;
								margin: 20px 0 0 20px;
								// background-color: #FFFF4F;
								.team_member{
									display: flex;
									align-items: center;
									flex-wrap: wrap;
									// justify-content: space-between;
									.member_block{
										display: flex;
										align-items: center;
										margin-right: 15px;
										margin-bottom: 10px;
										.member_avatar{
											width: 40px;
											height: 40px;
											border-radius: 50%;
											margin-right: 10px;
										}
										.member_name{
											width:100px;
											color: #FFFFFF;
											font-size: 16px;
											font-family:'Roboto-Regular';
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
										}
									}
								}
							}
							
						}
						.partake_block:nth-child(2n){
							margin-right: 0;
						}
					}
				}
			}
		}
	} //container
}
</style>
