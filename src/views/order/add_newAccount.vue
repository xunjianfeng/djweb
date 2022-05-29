<template>
	<div class="index">
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<router-link to="/order/wallet">
						<div class="nav_left">
							<< Add New Account
						</div>
					</router-link>
					<div class="nav_right">
						<p class="save" @click="add_save">Save</p>
						<p class="cancel" @click="retrun_cancel">Cancel</p>
					</div>
				</div><!-- content_right_nav -->
				<div class="content_right_form">
					<div class="user_name">
						<div class="text_title">User Name</div>
						<input type="text" placeholder="" v-model="bank_form.name" />
					</div>
					<div class="number">
						<div class="text_title">Account Number</div>
						<input type="number" placeholder=""  v-model="bank_form.accountNumber" />
					</div>
					<div class="bank">
						<div class="text_title">Bank</div>
						<div class="bank_input">
							<img src="../../assets/images/public_bank.png" />
							<input type="text" placeholder="" v-model="bank_form.bankName" />
						</div>
					</div>
					<div class="set">
						<div class="text_title">Set as default account</div>
						<div class="slider">
							<el-switch
							  v-model="bank_form.isDefault"
							  active-color="#13ce66"
							  :width="40">
							</el-switch>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {account_add} from '@/api/user_info';
	import {addTeam,gameList} from '@/api/team';
	import LeftView from '@/components/order/left.vue';
	export default{
		name:"add_newAccount",
		data(){
			return{
				value:false,
				bank_form:{
					name:'',
					bankName:'',
					accountNumber:'',
					isDefault:false
				}
			}
		},
		components: {
			LeftView
		},
		methods:{
			// 银行账号-添加
			add_save(){
				let that = this;
				let { name , bankName ,accountNumber ,isDefault } = that.bank_form;
				if(name == '' || bankName == '' || accountNumber == ''){
					that.$message({
						message: 'Please fill in complete bank information！',//请填写完整银行账户信息
						type: 'warning'
					})
					return false
				} else {
					account_add(that.bank_form).then(res => {
						that.$message({
							message: res.message,
							type: 'success'
						})
						this.$router.push({path:'/order/wallet'})
					})
				}
			},
			retrun_cancel(){
				this.$router.push({path:'/order/wallet'})
			}
		}
	}
</script>

<style lang="less" scoped>
.container {
	width: 90%;
	margin-left: 61px;
	display: flex;
	justify-content: space-between; 	/* 横向中间自动空间 */
	flex-wrap: wrap;		/* 换行 */
	padding-bottom: 30px;
	
	.content_right {
		width: calc(100% - 370px);	
		.content_right_nav {
			margin-top: 50px;
			width: 90%;
			margin-bottom: 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		
			a{
				text-decoration: none;
			}
			.nav_left {
				font-size: 20px;
				color: #fff;
				font-family:'Quicksand-Bold';
			}
			.nav_right {
				display: flex;
				text-align: center;
				.save {
					width: 120px;
					height: 50px;
					line-height: 50px;
					background-color: #D3AA53;
					border-radius: 25px;
					text-align: center;
					color: #000;
					font-size: 18px;
					font-family:'Roboto-Regular';
					cursor: pointer;
				}
				.cancel {
					width: 120px;
					height: 50px;
					line-height: 50px;
					border: 1px solid #777777;
					border-radius: 25px;
					text-align: center;
					color: #fff;
					font-size: 18px;
					font-family:'Roboto-Regular';
					margin-left: 15px;
					cursor: pointer;
				}
			}
		}
		.content_right_form{
			border-radius: 50px;
			padding-bottom: 80px;
			background: #0E0F11;
			padding-left: 50px;
			.user_name{
				padding-top: 30px;
				margin-bottom: 30px;
				.text_title{
					color: #727272;
					font-size: 18px;
					font-family:'Roboto-Regular';
					margin-bottom: 10px;
				}
				input{
					-web-kit-appearance:none;
					-moz-appearance: none;
					width: 92%;
					height: 50px;
					font-family:'Roboto-Regular';
					border-radius: 19px;
					background: #0E0F11;
					border: 2px solid #2D2D2D;
					padding-left: 15px;
					font-size: 18px;
					color: #ffffff;
				}
				input::-webkit-input-placeholder{
					color: #ffffff;
				}
			}
			.number{
				margin-bottom: 30px;
				.text_title{
					color: #727272;
					font-size: 18px;
					font-family:'Roboto-Regular';
					margin-bottom: 10px;
				}
				input{
					color: #ffffff;
					font-family:'Roboto-Regular';
					padding-left: 15px;
					font-size: 18px;
					-web-kit-appearance:none;
					-moz-appearance: none;
					width: 92%;
					height: 50px;
					border-radius: 19px;
					background: #0E0F11;
					border: 2px solid #2D2D2D;
					
				}
				input::-webkit-input-placeholder{
					color: #ffffff;
				}
			}
			.bank{
				margin-bottom: 30px;
				.text_title{
					color: #727272;
					font-size: 18px;
					margin-bottom: 10px;
					font-family:'Roboto-Regular';
				}
				.bank_input{
					width: 90%;
					border: 2px solid #2D2D2D;
					border-radius: 19px;
					display: flex;
					align-items: center;
					padding-left: 15px;
					img{
						height: 40px;
						margin-right: 5px;
					}
					input{
						color: #ffffff;
						padding-left:30px;
						font-size: 18px;
						-web-kit-appearance:none;
						-moz-appearance: none;
						width: 80%;
						height: 50px;
						font-family:'Roboto-Regular';
						background: #0E0F11;
						border: none;
					}
					input::-webkit-input-placeholder{
						color: #ffffff;
					}
				}
			}
			.set{
				.text_title{
					color: #727272;
					font-size: 18px;
					margin-bottom: 10px;
					font-family:'Roboto-Regular';
				}
				.set{
					margin-top: 10px;
					margin-left: 50px;
				}
				.slider{
					margin-top: 30px;
					margin-left: 20px;
				}
			}
		}
	}
}
</style>
<style lang="less">
	.el-switch{
		.el-switch.is-checked .el-switch__core:after {
			// width: 200px;
			// height: 200px;
		}
		.el-switch__core:after{
			width: 30px;
			height: 30px;
			position: absolute;
			left: -10px;
			top: -6px;
		}
	}
</style>