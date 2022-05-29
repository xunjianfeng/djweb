<template>
	<div class="index">
		<div class="container" :style="nav==1?'height:100vh':'height:100%'">
			<div class="login_container">
				<div class="login_logo">
					<!-- <img src="@/assets/images/group_logo.png" alt=""> -->
					<img src="../../assets/images/resgiter.png" />
				</div>
				<div class="tab_list">
					<div :class="nav == 1?'tab_login':'tab_login1'" @click="nav=1">LOGIN</div>
					<div class="tab_border"></div>
					<div :class="nav == 2?'tab_sign':'tab_sign1'" @click="nav = 2">SIGN UP</div>
				</div>
				<div v-if="nav == 1">
					<div class="tab_button">
						<!-- Goole 登录 -->
						<g-signin-button :params="googleSignInParams" @success="onSignInSuccessG"
							@error="onSignInErrorG" class="login-third-btn google" style="font-family:'Roboto-Bold';">
							<img src="@/assets/images/Group.png" alt="">
							Google
						</g-signin-button>
						<!-- <button v-google-signin-button="clientId" class="login-third-btn google" style="font-family:'Roboto-Bold';"> 
							<img src="@/assets/images/Group.png" alt="">
							Google
						</button> -->
						<!-- FaceBook 登录 -->
						<!-- <button id="facebook">登陆</button> -->
						<!-- <button class="login-third-btn facebook" type="button" @click="handleFaceBookLogin">Facebook</button> -->
						<fb-signin-button :params="fbSignInParams" @success="onSignInSuccess" @error="onSignInError"
							style="font-family:'Roboto-Bold';">
							<img :src="imgs" alt="">
							Facebook
						</fb-signin-button>
						<!--  -->
						<!-- <button @click="login">Facebook Login</button> -->
						<!-- 	<fb:login-button scope="public_profile,email" @onlogin="checkLoginState">Facebook Login
						</fb:login-button> -->
						<!-- <fb-signin-button :params="fbSignInParams" @success="onSignInSuccessF" @error="onSignInErrorF" style="font-family:'Roboto-Bold';">
							<img :src="imgs" alt="">
							FacebookF
						</fb-signin-button> -->
						<!-- <div class="fb-login-button" @success="onSignInSuccessF" @error="onSignInErrorF"   data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" 
						style="color: #F20D0D;">FacebookF</div> -->
						<!-- <div class="btn2" @click="third_party(2)">
							<img :src="imgs" alt="">
							<span>Facebook Login</span>y
						</div> -->
					</div>
					<div class="tab_email">
						<div class="tab_order"></div>
						<div class="tab_text1">Or Email Login</div>
						<div class="tab_order"></div>
					</div>
					<div class="input_block">
						<div class="input_tit">Email</div>
						<div class="input_input">
							<input type="text" v-model="login_form.username.u">
						</div>
					</div>
					<div class="input_block" style="margin-bottom: 13px;">
						<div class="input_tit">Password</div>
						<div class="input_input">
							<input type="password" v-model="login_form.password">
						</div>
					</div>
					<div class="password_block">
						<div class="pass_left">
							<div class="pass_check" @click="remember_event"></div>
							<div class="pass_check_true" v-if="remember" @click="remember_event">
								<img src="../../assets/images/true.png">
							</div>
							<div class="pass_text" @click="delRemember">Remember me</div>
						</div>
						<div class="pass_right" @click="jump_delPassword">Forgot password?</div>
					</div>
					<div class="foot">
						<div class="foot_button" @click="hand_login">Login</div>
					</div>
				</div>
				<div v-if="nav == 2">
					<div class="ima">
						<div :class="form.userType == 2?'ima_col1':'ima_col'" @click="form.userType = 2">
							<!-- <img src="../../assets/images/sign.png" alt=""> -->
							<img src="../../assets/images/login_personal.png" />
							<div>
								<p style="font-family:'Roboto-Regular';">i`m a</p>
								<p style="font-family:'Roboto-Black';">PLAYER</p>
							</div>
						</div>
						<div :class="form.userType == 3?'ima_col1':'ima_col'" @click="form.userType = 3">
							<!-- <img src="../../assets/images/sign2.png" alt=""> -->
							<img src="../../assets/images/login_origan.png" />
							<div>
								<p style="font-family:'Roboto-Regular';">i`m an</p>
								<p style="font-family:'Roboto-Black';">ORGANIZER</p>
							</div>
						</div>
					</div>
					<div class="tab_button" style="display:none;">
						<!-- Goole 登录 -->
						<button v-google-signin-button="clientId" class="login-third-btn google"
							style="font-family:'Roboto-Bold';"> <img src="@/assets/images/Group.png"
								alt="">Google</button>
						<!-- FaceBook 登录 -->
						<fb-signin-button :params="fbSignInParams" style="font-family:'Roboto-Bold';">
							<img :src="imgs" alt="">
							Facebook
						</fb-signin-button>
					</div>
					<div class="tab_email">
						<div class="tab_order"></div>
						<div class="tab_text1">Or Email Login</div>
						<div class="tab_order"></div>
					</div>
					<div class="input_block">
						<div class="input_tit">User Name*</div>
						<div class="input_input">
							<input type="text " v-model="form.fullName" maxlength="20">
						</div>
					</div>
					<div class="input_blocks">
						<div class="input_tit">Email</div>
						<div class="input_input_email">
							<!-- <img src="../../assets/images/img4.png" alt="">
							<span>(+60) | </span> -->
							<input type="text" v-model="form.email">
							<button @click.stop="send_mail_code">{{times}}</button>
						</div>
					</div>
					<div class="input_block">
						<div class="input_tit">Verify Code</div>
						<div class="input_input">
							<input type="text" v-model="form.verificationCode">
						</div>
					</div>
					<div class="input_block">
						<div class="input_tit">Password</div>
						<div class="input_input">
							<input type="password" v-model="form.password">
						</div>
					</div>
					<div class="input_block">
						<div class="input_tit">Confirm Password</div>
						<div class="input_input">
							<input type="password" v-model="confirm_password">
						</div>
					</div>

					<div v-if="isReferral" class="input_block">
						<div class="input_tit">Referral ID</div>
						<div class="input_input referralId">
							<input disabled v-model="$route.query.referralId">
						</div>
					</div>
					<div class="foot" style="padding-bottom:20px">
						<div class="foot_button" @click="hand_register">Sign Up</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<!-- // 	(function(d, s, id) {
// 		var js, fjs = d.getElementsByTagName(s)[0];
// 		if (d.getElementById(id)) return;
// 		js = d.createElement(s);
// 		js.id = id;
// 		js.src = "https://connect.facebook.net/en_US/sdk.js";
// 		fjs.parentNode.insertBefore(js, fjs);
// 	}(document, 'script', 'facebook-jssdk'));
// 	window.fbAsyncInit = function() {
// 		FB.init({
// 			appId: '1688719291325931',
// 			cookie: true, // 启用cookie
// 			xfbml: true, // 解析此页面上的社交插件
// 			version: 'v10.0' // 使用图形api 2.8版本
// 		});
// 		FB.getLoginStatus(function(response) {
// 			statusChangeCallback(response);
// 			// console.log(response,"首次检测未登陆")
// 		});
// 		document.getElementById('facebook').onclick = function() { //登录
// 			FB.login(function(response) {
// 				if (response.status === 'connected') {
// 					$("#facebook").css("display", "none")
// 					$("#fbLike").css("display", "block")
// 					FB.api('/me', function(response) {
// 						roleName = encodeURIComponent(response.name);
// 						FB.getLoginStatus(function(response) {
// 							statusChangeCallback(response);
// 						});
// 					});

// 				} else {
// 					console.log('该用户没有登录成功');
// 				}
// 			}, {
// 				scope: 'public_profile,email'
// 			});
// 		};
// 		document.getElementById('signout').onclick = function() {
// 			FB.logout(function(response) {
// 				console.log(response, "用户退出");
// 			});
// 		};
// 	}
// -->
</script>
<script>
	import 'vue-google-signin-button-directive';
	import {
		userRegister,
		userLogin,
		thirdLogin,
		googleFacebookLogin,
		userVerification
	} from '@/api/login';
	import {
		userProfile,
		sendEmail
	} from '@/api/user_info';
	export default {
		name: "login",
		components: {

		},
		data() {
			return {
				nav: 1,
				ima: 1,
				imgs: require("../../assets/images/Path.svg"),
				form: {
					email: '',
					fullName: '',
					loginName: '',
					password: '',
					registerType: '',
					userType: '2', // 2普通用户  3主持人
					verificationCode: '',
				}, // 注册 
				login_form: {
					username: {
						u: '',
						t: 2
					},
					password: ''
				}, //登录
				confirm_password: '', //确认密码
				third_field: {
					loginType: '',
					token: '',
				},
				// 计时变量
				interval: null,
				time: '获取验证码', //倒计时
				times: 'Get Code',
				currentTime: 60,
				remember: true, //记住我显示
				fbSignInParams: {
					scope: 'email,user_likes',
					// scope: 'email,public_profile',
					return_scopes: true
				},
				clientId: '181471822995-15g520fublhsh14oa9rf78k26ksb1koi.apps.googleusercontent.com',
				googleSignInParams: {
					client_id: '946726492548-bb83nccj5s25hta6m0kc7ru23i2ip4e9.apps.googleusercontent.com'
				},
				refer: 0,

				isReferral:false
			};
		},
		created() { //监听键盘事件，当点击enter时调用登录方法
			let that = this;
			document.onkeydown = function(e) {
				//enter的ASCII码是13
				if (e.key == "Enter") {
					that.hand_login(); //登录方法
					document.onkeydown = '' //登录成功销毁键盘监听事件
				}
				// console.log(e.key)
			}
			// 防止重复
			if (!window.FB) {
				window.fbAsyncInit = function() {
					FB.init({
						// appId: '{your-app-id}',
						appId: '712541813242540',
						cookie: true,
						xfbml: true,
						version: '3.3' // 当前版本是： v7.0
					});

					FB.AppEvents.logPageView();
					FB.getLoginStatus(function(response) {
						// 检查登录状态 response: status,authResponse
						// status 表示用户登录状态  connected:用户已经登录facebook和您的应用 not_authorized: 用户已经登录facebook，但未登录您的应用  unknown:用户未登录facebook，或无法连接至facebook
						console.log(response)
					})
				};

				(function(d, s, id) {
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) {
						return;
					}
					js = d.createElement(s);
					js.id = id;
					js.src = "https://connect.facebook.net/en_US/sdk.js";
					fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
			}
			// }
		},
		mounted() {
			// console.log('../登录页/..')
			// console.log(this.login_form)
			// console.log(this.login_form.username.u)
			// console.log(sessionStorage.getItem("token"))
			//未登录从赛事详情页点击不能参赛，跳转到注册页
			if (this.$route.query.nav != '' && this.$route.query.nav != null) {
				this.nav = this.$route.query.nav
			}
			// 在页面加载时从cookie获取登录信息
			let account = this.getCookie("account")
			let password = this.getCookie('password')
			// 如果存在赋值给表单，并且将记住密码勾选
			//  console.log(account)
			//  console.log(password)
			if (account) {
				this.login_form.username.u = account
				this.login_form.password = password
				this.remember = true
			}


			// 判断是或否为邀请链接
			if(this.$route.query.referralId){
				this.nav = 2
				this.isReferral = true
			}
			else{
				this.isReferral = false
			}
		},
		methods: {
			login() {
				// 如果登录状态不为connected时才调用FB.login，如果登录状态为connected时可通过FB.getLoginStatus直接获取登录信息
				FB.login(function(response) {
					console.log(response) //拿到登录信息进行自己平台的登录
				})
			},
			googleFacebookLogin(type, token, email, name) {
				let that = this;
				//登录接口不带token信息
				sessionStorage.setItem("token", '')
				let parms = {
					loginType: type,
					token: token,
					email: email,
					name: name
				}
				console.log(parms, "谷歌点击返回参数")
				googleFacebookLogin(parms).then(res => {
					console.log(res.data)
					// 登录成功  缓存用户token
					sessionStorage.setItem("token", res.data.token)
					sessionStorage.setItem("userId", res.data.info.userId)
					sessionStorage.setItem("userinfo", JSON.stringify(res.data.info))
					document.onkeydown = '' //登录成功销毁键盘监听事件
					// 储存登录信息
					this.setUserInfo()
					that.$message({
						message: res.message,
						type: 'success'
					})
					setTimeout(function() {
						that.$router.push({
							path: '/',
						})
					}, 1000);
				})
			},
			onSignInSuccessG(googleUser) {
				const profile = googleUser.getBasicProfile()
				console.log(profile, "谷歌返回对象")
				// this.googleFacebookLogin('google',googleUser.wa,profile.Yt,profile.Re)
				this.googleFacebookLogin('google', profile.RW, profile.yv, profile.sf)
			},
			onSignInErrorG(error) {
				console.log('OH NOES', error)
			},
			onSignInSuccess(response) {
				// let vue_this = this;
				console.log('response', response)
				FB.api('/me?fields=id,name,email', dude => {
					console.log(dude, "FBAPI内容")
					this.googleFacebookLogin('facebook', response.authResponse.userID, dude.email, dude.name)
				})
				// console.log(response) //返回第三方的登录信息 token等
			},
			onSignInError(error) {
				console.log('onSignInError', error)
			},
			remember_event() { //点击显示隐藏记住我
				this.remember = !this.remember
				console.log(this.remember)
			},
			//处理记住密码
			delRemember() {
				// console.log()
			},
			jump_delPassword() {
				this.$router.push({
					path: '/security/forget_password'
				})
				// if(this.login_form.username.u == ''){
				// 	this.$message({
				// 		type:'warning',
				// 		message:'Please key in email!'
				// 	})
				// }else{
				// 	let params = {
				// 		email : this.login_form.username.u
				// 	}
				// 	console.log(params,"忘记密码")
				// 	sendEmail(params).then(res => {
				// 		this.$message({
				// 			type:'success',
				// 			message:res.message
				// 		})
				// 	})
				// }
			},
			// 储存表单信息
			setUserInfo: function() {
				// 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
				// 如果没有勾选，储存的信息为空
				if (this.remember) {
					console.log()
					this.setCookie("account", this.login_form.username.u)
					// 密码
					this.setCookie("password", this.login_form.password)
				} else {
					this.setCookie("account", "")
					this.setCookie("password", "")
				}
			},
			// 获取cookie
			getCookie: function(key) {
				if (document.cookie.length > 0) {
					var start = document.cookie.indexOf(key + '=')
					if (start !== -1) {
						start = start + key.length + 1
						var end = document.cookie.indexOf(';', start)
						if (end === -1) end = document.cookie.length
						return unescape(document.cookie.substring(start, end))
					}
				}
				return ''
			},
			// 保存cookie
			setCookie: function(cName, value, expiredays) {
				var exdate = new Date()
				exdate.setDate(exdate.getDate() + expiredays)
				document.cookie = cName + '=' + decodeURIComponent(value) +
					((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
			},
			// 获取邮箱验证码
			send_mail_code: function() {
				let that = this
					// {
					// 	currentTime
					// } = that,
					// reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
					// console.log(currentTime)

				if (that.form.email == '') {
					that.$message({
						message: 'Please key in email!',
						type: 'warning'
					})
					return false
				}
				// else if (!reg.test(that.form.email)) {
				// 	that.$message({
				// 		message: 'Email address is wrong', //邮箱格式错误
				// 		type: 'warning'
				// 	})
				// 	return false
				// }
				let params = {
					email: that.form.email
				}
				if (this.refer == 1) {
					return false
				}
				this.refer = 1
				userVerification(params).then(res => {
					that.$message({
						message: res.message,
						type: 'success'
					})
					// sessionStorage.setItem("token", res.data.token)
					that.interval = setInterval(function() {
						that.currentTime--
						that.times = that.currentTime + 's'
						if (that.currentTime <= 0) {
							clearInterval(that.interval)
							that.times = 'Resend'
							that.currentTime = 60
							that.refer = 0
						}
					}, 1000);
				}).catch(res => {
					this.refer = 0
				})

			},
			// goole  登录
			OnGoogleAuthSuccess(idToken) {
				// 请求后端接口，对登录信息进行校验
				console.log('OnGoogleAuthSuccess')
				console.log(idToken)
				this.third_party(1, idToken)
			},
			OnGoogleAuthFail(error) {
				console.log(error)
			},
			async GoogleLoginWithIdToken(idToken) {
				let res = await GoogleLoginWithIdToken(idToken)
				if (res.code === 0) {
					console.log('Google login success')
				}
			},
			// 脸书登录
			handleFaceBookLogin() {
				let vue_this = this;
				FB.login(function(response) {
					// get facebook user info
					FB.api("/me?fields=id,name,picture", function(response) {
						console.log('Good to see you, ' + response.name + '.')
						console.log('picture=' + response.picture.data.url)
					})
					// 登录回调函数
					vue_this.statusChangeCallBack(response)
				}, {
					scope: "public_profile"
				})
			},
			async statusChangeCallBack(response) {
				if (response.status === "connected") {
					var params = {
						id_token: response.authResponse.accessToken
					}
					const res = await FaceBookCallBack(params)
					if (res.code === 0) {
						console.log('Facebook login success')
					}
				}
			},
			// 第三方登录接口
			third_party(key, token) {
				console.log('第三方登录')
				let that = this;
				// key 1 = google  2 = facebook
				if (key == 1) {
					that.third_field.loginType = 'google'
				} else {
					that.third_field.loginType = 'facebook'
				}
				that.third_field.token = token
				let parms = that.third_field
				console.log(parms)
				thirdLogin(parms).then(res => {
					console.log(res)
				})
			},
			// 注册事件
			hand_register() {
				let that = this;
				let {
					fullName,
					email,
					password,
					loginName,
					registerType,
					verificationCode
				} = that.form;
				// 判断注册信息是否已填
				if (fullName != '' && email != '' && password != '' && verificationCode != '' && that.confirm_password !=
					'') {
					if (that.confirm_password != password) {
						this.$message({
							message: 'The password you keyed in is wrong.', //密码不一致，请确认密码是否一致
							type: 'warning'
						});
						return false
					}
				} else {
					this.$message({
						message: 'Please complete your personal information.', //请填写完整注册信息
						type: 'warning'
					});
					return false
				}
				that.form.loginName = email
				that.form.registerType = 'email'
				let parms = that.form
				parms.referralCode = this.$route.query.referralId
				userRegister(parms).then(res => {
					this.$message({
						message: res.message,
						type: 'success'
					});
					// 普通用户注册后直接登录，跳到完善信息页
					if (that.form.userType == '2') {
						sessionStorage.setItem("token", res.data.token)
						sessionStorage.setItem("userId", res.data.info.userId)
						sessionStorage.setItem("userinfo", JSON.stringify(res.data.info))
						that.$router.push({
							path: '/center/personal',
						})
					} else {
						// 注册主持端账号，跳转主持端个人中心修改资料 http://gamespreside.web.gdtuode.com/#/
						//正式服主持端
						window.open('http://organizer.bountee.com.my/#/user/personal_center?token=' + res.data.token + '&userId=' + res.data.info.userId) //正式版
						// 测试服主持端
						// window.open('http://gamespreside.web.gdtuode.com/#/user/personal_center?token=' + res.data.token + '&userId=' + res.data.info.userId) //测试版

						that.form = {
							email: '',
							fullName: '',
							loginName: '',
							password: '',
							registerType: '',
							userType: '3', // 2普通用户  3主持人
							verificationCode: '',
						}
						that.confirm_password = ''
					}
				})
			},
			// 邮箱账号登录
			hand_login() {
				let that = this;
				let {
					username,
					password
				} = that.login_form;
				if (username != '' && password != '') {
					let parms = that.login_form
					userLogin(parms).then(res => {
						console.log(res)
						// 登录成功  缓存用户token
						sessionStorage.setItem("token", res.data.token)
						sessionStorage.setItem("userId", res.data.info.userId)
						sessionStorage.setItem("userinfo", JSON.stringify(res.data.info))
						sessionStorage.setItem("referralCode", res.data.info.referralCode)
						document.onkeydown = '' //登录成功销毁键盘监听事件
						// 储存登录信息
						this.setUserInfo()
						that.$message({
							message: res.message,
							type: 'success'
						})
						setTimeout(function() {
							that.$router.push({
								path: '/',
							})
						}, 1000);
					})
				} else {
					if (username == '') {
						this.$message({
							message: 'Please key in email!',
							type: 'warning'
						});
						return false
					} else if (password == '') {
						this.$message({
							message: 'Please key in password!',
							type: 'warning'
						});
						return false
					}
				}
			},
		}
	};
</script>
<style lang="less" scoped>
	html,
	body,
	#app {
		height: 100%;
		margin: 0;
	}

	.container {
		width: 100%;
		background-image: url(../../assets/images/background.png);
		background-size: 100% 100%;

		.login_container {
			width: 511px;
			// background-color: #fff;
			margin: 0 auto;
			padding-top: 60px;

			.login_logo {
				// width: 222px;
				// height: 247px;
				width: 226px;
				height: 248px;
				margin: 0 auto;
				margin-bottom: 39px;
				// background-color: #ff0;
			}

			.login_logo img {
				width: 222px;
				height: 247px;
			}

			.tab_list {
				width: 222px;
				height: 24px;
				margin: 0 auto;
				margin-bottom: 32px;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.tab_login {
					color: #ed1c24;
					font-size: 20px;
					font-family: 'Roboto-Black';
					cursor: pointer;
				}

				.tab_login1 {
					color: #606060;
					font-size: 20px;
					font-family: 'Roboto-Black';
					cursor: pointer;
				}

				.tab_border {
					width: 1px;
					height: 21px;
					background-color: #606060;
				}

				.tab_sign {
					color: #ed1c24;
					font-family: 'Roboto-Black';
					font-size: 20px;
					cursor: pointer;
				}

				.tab_sign1 {
					color: #606060;
					font-family: 'Roboto-Black';
					font-size: 20px;
					cursor: pointer;
				}
			}

			.tab_button {
				height: 50px;
				margin: 0 auto;
				margin-bottom: 44px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.login-third-btn {
					width: 230px;
					height: 50px;
					background: #ffffff;
					border-radius: 25px;
					border: 0px;
					color: #232323;
					font-size: 17px;
					font-weight: bold;
					display: flex;
					align-items: center;
					cursor: pointer;

					img {
						width: 17px;
						height: 17px;
						margin: 0 18px 0 31px;
					}
				}

				.fb-signin-button {
					/* This is where you control how the button looks. Be creative! */
					width: 230px;
					height: 50px;
					background: #036bcb;
					border-radius: 25px;
					display: flex;
					align-items: center;
					cursor: pointer;
					border: 0px;
					color: #fff;
					font-size: 17px;
					font-weight: bold;

					img {
						width: 16px;
						height: 16px;
						margin: 0 18px 0 31px;
					}
				}

				.btn2 {
					width: 230px;
					height: 50px;
					background: #036bcb;
					border-radius: 25px;
					display: flex;
					align-items: center;
					cursor: pointer;

					img {
						width: 16px;
						height: 16px;
						margin: 0 18px 0 31px;
					}

					span {
						color: #fff;
						font-size: 17px;
						font-weight: bold;
					}
				}
			}

			.tab_email {
				height: 19px;
				margin: 0 auto;
				margin-bottom: 22px;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.tab_order {
					width: 185px;
					height: 1px;
					background-color: #606060;
				}

				.tab_text1 {
					font-family: 'Roboto-Bold';
					font-size: 16px;
					color: #ededed;
				}
			}

			.ima {
				width: 100%;
				display: inline-block;
				margin-bottom: 30px;

				.ima_col {
					width: 47%;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #000000;
					border: 1px solid #000000;
					border-radius: 20px;
					padding: 10px 0;
					float: left;
					cursor: pointer;

					&:nth-child(2) {
						float: right;
					}

					img {
						width: 30px;
						margin-right: 30px;
					}

					div {
						display: inline-block;

						p {
							color: #878787;
							margin: 0;
							font-size: 14px;

							&:nth-child(2) {
								color: #ed1c24;
								font-size: 20px;
							}
						}
					}
				}

				.ima_col1 {
					width: 47%;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #000000;
					border: 1px solid #890c0c;
					border-radius: 20px;
					padding: 10px 0;
					float: left;
					cursor: pointer;

					&:nth-child(2) {
						float: right;
					}

					img {
						width: 30px;
						margin-right: 30px;
					}

					div {
						display: inline-block;

						p {
							color: #878787;
							margin: 0;
							font-size: 14px;

							&:nth-child(2) {
								color: #ed1c24;
								font-size: 20px;
							}
						}
					}
				}
			}

			.input_block {
				margin-bottom: 37px;

				.input_tit {
					color: #878787;
					font-size: 18px;
					font-family: 'Roboto-Regular';
					margin-bottom: 17px;
				}

				.input_input {
					width: 100%;

					input {
						width: 94%;
						padding: 0 3%;
						color: #fff;
						height: 61px;
						font-family: 'Roboto-Regular';
						border-radius: 23px;
						border: none;
						font-size: 22px;
						background: rgba(232, 234, 239, 0.12) 0% 0% no-repeat padding-box;
					}
				}
			}

			.input_blocks {
				margin-bottom: 37px;

				.input_input {
					height: 61px;
					font-size: 22px;
					border-radius: 23px;
					background: rgba(232, 234, 239, 0.12) 0% 0% no-repeat padding-box;
					display: flex;
					align-items: center;
					color: #fff;

					img {
						width: 50px;
						margin-left: 20px;
					}

					span {
						margin: 0 10px;
					}



					input {
						width: 45%;
						background: initial;
						border: none;
						height: 60px;
						font-size: 22px;
						color: #fff;
					}

					button {
						background: #ed1c24;
						border: none;
						color: #fff;
						height: 45px;
						border-radius: 30px;
						width: 100px;
						font-size: 16px;
					}
				}

				.input_input_email {
					padding: 0 3%;
					height: 61px;
					font-size: 22px;
					border-radius: 23px;
					background: rgba(232, 234, 239, 0.12) 0% 0% no-repeat padding-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #fff;

					input {
						width: 74%;
						background: initial;
						border: none;
						height: 60px;
						font-family: 'Roboto-Regular';
						font-size: 22px;
						color: #fff;
					}

					button {
						background: #ed1c24;
						border: none;
						color: #fff;
						height: 45px;
						font-family: 'Roboto-Bold';
						border-radius: 30px;
						width: 100px;
						font-size: 16px;
					}
				}

				.input_tit {
					color: #878787;
					font-size: 18px;
					font-family: 'Roboto-Regular';
					margin-bottom: 17px;
				}
			}

			.password_block {
				height: 25px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.pass_left {
					display: flex;
					align-items: center;

					.pass_check {
						width: 23px;
						height: 23px;
						border: 1px solid #878787;
						border-radius: 5px;
						margin-right: 13px;
					}

					.pass_check_true {
						width: 23px;
						height: 23px;
						position: absolute;
						left: 705px;

						img {
							width: 23px;
							height: 23px;
						}
					}

					.pass_text {
						color: #878787;
						font-size: 18px;
						font-family: 'Roboto-Regular';
					}
				}

				.pass_right {
					color: #878787;
					font-size: 18px;
					font-family: 'Roboto-Regular';
					cursor: pointer;
				}
			}

			.foot {
				width: 100%;
				margin-top: 58px;

				.foot_button {
					width: 208px;
					height: 60px;
					color: #fff;
					font-size: 22px;
					font-family: 'Roboto-Medium';
					line-height: 60px;
					text-align: center;
					background: #ed1c24;
					border-radius: 25px;
					margin: 0 auto;
					cursor: pointer;
				}
			}
		}
	}
</style>
