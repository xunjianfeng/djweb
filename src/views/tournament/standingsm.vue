<template>
	<div class="index index_background">
		<div class="container">
			<div class="content_right">
				<div class="free_container">
					<div class="title_text">
						{{detail_list.tournamentName}}
					</div>
					<div class="title_nav">
						<div  @click="jump_free(1)">Bracket</div>
						<div  @click="jump_free(2)">Participants</div>
						<div  @click="jump_free(3)">Information</div>
						<div class="av"  @click="jump_free(4)">Standings</div>
					</div>
					<div class="table">
						<div class="table_header">
							<div>
								<p>Rank</p>
							</div>
							<div>
								<p>Participant Name</p>
							</div>
							<div>
								<p>Win</p>
							</div>
							<div>
								<p>Draw</p>
							</div>
							<div>
								<p>Lose</p>
							</div>
						</div>
						<div class="table_body">
							<div class="table_body_row" v-for="(item,index) in stand_list" :key="index">
								<div>
									<p>{{item.rank}}</p>
								</div>
								<div class="participant_name">
									<img :src="HOST +  item.teamLogo" />
									<el-tooltip class="item" effect="dark" :content="item.teamName" placement="bottom">
										<p>{{item.teamName}}</p>
									</el-tooltip>
									<!-- <p>{{item.teamName}}</p> -->
								</div>
								<div class="">
									<p>{{item.win}}</p>
								</div>
								<div class="">
									<p>{{item.draw}}</p>
								</div>
								<div class="">
									<p>{{item.lose}}</p>
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
	export default {
		name: "standingsm",
		data() {
			return {
				tournamentId:'',
				stand_list:'',
				detail_list:'',
			}
		},
		mounted() {
			if(this.$route.query.id != '' &&  this.$route.query.id != null && this.$route.query.id != undefined){
				this.tournamentId = this.$route.query.id
				this.tournamentDetail();
			}
		},
		methods:{
			tournamentDetail(){
				let that = this;
				tournamentDetail({tournamentId:that.$route.query.id}).then(res => {
					that.stand_list = res.data.contestant
					that.detail_list = res.data;
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
	}
</script>

<style lang="less" scoped>
	.route{
		height: auto;
		position: absolute !important;;
		top: 0 !important;
		
	}
	.index_background {
		background: rgba(0, 0, 0, 0.7);
		.container {
			// background-image: url(../../assets/images/bac13.png);
			background-repeat: no-repeat;
			background-size: 100% ;
			height: 100vh;
			// padding: 160px 0px 60px 0px;
			.content_right {
				width: calc(100% - 150px);
				text-align: center;
				padding-top: 160px;
				.free_container {
					margin-left: 120px;
					.title_text {
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
							cursor: pointer;
							border-right: 1px solid #727272;
							width: 25%;
							padding-right: 20px;
							text-align: center;
						}
						
						div:nth-child(4){
								border-right: 0px;
						}
						.av{
						  color: #BF9D62;
						}
					}
					.table {
						margin: 52px 0px 0px 0px;
						.table_header {
							width: 100%;
							display: flex;
							font-size: 18px;
							height: 75px;
							background: #000000 0% 0% no-repeat padding-box;
							border-radius: 31px 31px 0px 0px;
							opacity: 1;
							align-items: center;
							font-family:'Roboto-Bold';
							div {
								width: 15%;
								display: flex;
								align-items: center;

								&:nth-child(2) {
									width: 40%;
								}

								p {
									width: 100%;
									color: #FFFFFF;
								}

							}
						}

						.table_body {
							color: #FFFFFF;
							font-size: 20px;
							font-family:'Roboto-Regular';
							.table_body_row {
								display: flex;
								font-size: 18px;
								height: 75px;
								align-items: center;
								text-align: center;

								&:nth-child(2n+1) {
									// background-color: #1D2023;
									background-color: #313538;
								}

								&:nth-child(2n) {
									background-color: #565656;
								}

								&:last-child {
									border-radius: 0px 0px 26px 26px;
								}

								div {
									width: 15%;
									height: 74px;
									color: #FFFFFF;
									display: flex;
									align-items: center;
									border-right: 2px solid #161616;

									p {
										width: 100%;
									}

									&:last-child {
										border: none;
									}

									&:nth-child(2) {
										width: 40%;
										text-align: center;
										// border: none;
									}

								}

								.participant_name {
									img {
										width: 50px;
										height: 50px;
										margin-left: 40px;
									}

									p {
										text-align: left;
										margin-left: 10px;
										width: 300px;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
								}
								.win{
									color: #0000ff;
								}
								.draw{
									color: #00FF00;
								}
								.lose{
									color: #ff0000;
								}
							}
						}

						//table_body
					}

					//table
				}

			}

			//content_right
		}

		//container
	}

	//index
</style>
