<template>
	<div class="index">
		<div class="container">
			<div class="league_head">
				<div class="league_head_text">{{leagueItem.title}}</div>
			</div>
			<div class="league_switch">
				<div class="switch_head">
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Premier'">Premier</div>
					<div class="switch_h_block switch_h_av" v-if="leagueItem.leagueType == 'Armature'">Amateur</div>
				</div>
				<div class="switch_bottom">
					<LeagueSwitch :index="8"></LeagueSwitch>
				</div>
			</div>
			<div class="league_result_container">
				<div class="video_area" v-for="(item,index) in list" :key="index">
					<div class="block_left">
						<div class="text_area">
							<div class="text_title">{{item.title}}</div>
							<div class="text_content">
								{{item.introduction}}
							</div>
						</div>
					</div>
					<div class="block_right">
						<!-- <video controls class="video_play">
							<source :src="item.videoUrl" type="video/mp4"></source>
						</video> -->
				
						<iframe class="video_play" :src="item.videoUrl"
						 title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
						 allowfullscreen></iframe>
					</div>
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
	import LeagueSwitch from '@/components/league/league.vue'
	import {HighlightList} from '@/api/league.js'
	export default {
		name: "highlights",
		components:{
			LeagueSwitch
		},
		data() {
			return {
				leagueItem:{},
				h_swith:1,
				listQuery: {
					leagueId: this.$route.query.leagueId,
					page: 1,
					size: 10
				},
				list:[],
				video_list:[
					{
						id:1,
						video:require("../../assets/video/video.mp4"),
						title:'Highlight Title',
						content:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
					},
					{
						id:2,
						video:require("../../assets/video/video.mp4"),
						title:'Highlight Title',
						content:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
					},
					{
						id:3,
						video:require("../../assets/video/video.mp4"),
						title:'Highlight Title',
						content:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
					},
				]
			}
		},
		mounted() {
			this.leagueItem = JSON.parse(sessionStorage.getItem("leagueItem"))
			this.getList()
		},
		methods: {
			// 列表
			replace:function(input){
				// console.log(input);
				return input;
			},
			getList() {
				let that = this;
				HighlightList(that.listQuery).then(res => {
					const {
						list,
						total
					} = res.data
					// that.total_count = total
					that.list = list;
					for(let i=0;i < that.list.length;i++){
						that.list[i].videoUrl = that.list[i].videoUrl.replace("watch?v=","embed/")
						// this.$refs.video.src = this.list[i].videoUrl
						
					}
				})
			},
			hswith(index){
				this.h_swith = index
			}
		}

	}
</script>
<style lang="less" scoped>
	.container {
		width: calc(100% - 191px);
		margin-left: 72px;
		.league_head{
			display: flex;
			align-items: center;
			padding:46px 0 32px 0 ;
			border-bottom: 1px solid #2D2D2D;
			font-family:'Quicksand-Bold';
			.league_head_text{
				color: #FFFFFF;
				font-size: 24px;
				font-weight: bold;
			}
			.league_head_spot{
				width: 8px;
				height: 8px;
				background-color: #FFFFFF;
				border-radius: 50%;
				margin: 0 20px;
			}
		}
		.league_switch{
			.switch_head{
				display: flex;
				align-items: center;
				margin: 52px 0;
				font-family:'Quicksand-Regular';
				.switch_h_block{
					font-size: 24px;
					color: #FFFFFF;
					cursor: pointer;
					margin-right: 70px;
				}
				.switch_h_block:last-child{
					margin-right: 0;
				}
				.switch_h_av{
					color: #DBA83F;
					position: relative;
				}
				.switch_h_av:before{
				    content: '';
				    position: absolute;
					left: 0px;
				    bottom: 0px;
				    right: 0px;
				    border-top: 3px solid  #DBA83F;
				}
			}
			.switch_bottom{
				margin-bottom: 40px;
			}
		}
		.league_result_container{
			width: calc(100% - 36px);
			
			// padding: 42px 0 35px 0px;
			.video_area{
				width: 95%;
				// background: #03060D;
				background: #000000;
				border-radius: 17px;
				padding: 30px 30px 40px 60px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 40px;
				.block_left{
					width: 41%;
					.text_area{
						.text_title{
							color: #FFFFFF;
							font-size: 22px;
							font-family:'Roboto-Bold';
						}
						.text_content{
							color: #8C8C8C;
							font-size: 18px;
							margin-top: 20px;
							line-height: 28px;
							font-family:'Roboto-Regular';
						}
					}
				}
				.block_right{
					width: 55%;
					margin-right: 20px;
					margin-top: 35px;
				}
				.video_play{
					width:100%;
					height:472px;
				}
			}
		}
		
	}
</style>
