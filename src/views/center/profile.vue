<template>
	<div class="index">
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<div class="content_right_nav">
					<div class="adiv" @click="jump_pagee(1)">
						<p class="av">Profile</p>
					</div>
					<div class="adiv" @click="jump_pagee(2)">
						<p>Wallet</p>
					</div>
					<!-- 隐蔽项start -->
					<!-- <div class="adiv" @click="jump_pagee(3)">
						<p>Host</p>
					</div>
					<div class="adiv" @click="jump_pagee(4)">
						<p>Companion</p>
					</div> -->
					<!-- 隐蔽项end -->
				</div>
				<div class="content_right_form">
					<div class="right_form_title">
						<p>Personal Information</p>
						<p @click="jump_game">Game profile</p>
						<div :class="modify_text == 'Edit' ? 'qbutton':'mobton' " @click.stop="updateUserInfo">
							{{modify_text}}</div>
					</div>
					<div class="right_form_change">
						<!-- <el-image :src="HOST +  info_list.avatar" class="active1_img" :rules="ruleValidate" ref="formValidate">
							<div slot="error" class="image-slot">
								<img src="../../assets/images/default.png" class="active1_img"/>
							</div>
						</el-image> -->
						<img class="active1_img"
							v-if="info_list.avatar == '' || info_list.avatar == undefined || info_list.avatar == null"
							src="../../assets/images/default.png">
						<img class="active1_img" v-else :src="HOST + info_list.avatar" :rules="ruleValidate"
							ref="formValidate">
						<p v-if="modify_text != 'Edit'" @click="uploadPicture('flagImg')">Change profile picture</p>
						<div class="cropper_img" v-if="cropper_status == true">
							<div class="mark_check" @click.stop="cropper_status = false">
								<img src="@/assets/images/cancel.png">
							</div>
							<div class="mark_bac"></div>
							<div class="cropper_img_content">
								<CropperImg :Name="cropperName" @uploadImgSuccess="handleUploadSuccess" ref="child">
								</CropperImg>
							</div>
						</div>
						<!-- <el-upload class="avatar-uploader" 	:action="HOST + '/img/upload'" :show-file-list="false"
						 :on-success="res => {return handleAvatarSuccess(res,'avatar');}" :before-upload="beforeAvatarUpload">
							<p v-if="modify_text != 'Edit'">Change profile picture</p>
						</el-upload> -->
					</div>
					<div class="right_form_information">
						<p class="information_title">Account Information</p>
						<div class="form_inputs">
							<div class="form_content">
								<div class="form_input">
									<p>User Name<span>*</span></p>
									<input type="text" v-model="info_list.fullName" disabled
										v-if="modify_text == 'Edit'">
									<input type="text" maxlength="30" v-model="info_list.fullName"
										v-if="modify_text != 'Edit'">
								</div>
							</div>
							<div class="form_content">
								<div class="form_input">
									<p>Full Name<span>*</span> (as per NRIC/Passport)</p>
									<input type="text" v-model="info_list.userName" disabled
										v-if="modify_text == 'Edit'">
									<input type="text" maxlength="30" v-model="info_list.userName"
										v-if="modify_text != 'Edit'">
								</div>
								<div class="form_input">
									<p>Gender</p>
									<input type="text" v-model="info_list.gender" disabled v-if="modify_text == 'Edit'">
									<el-select class="user_name" :popper-append-to-body="false"
										placeholder="Please select" v-model="info_list.gender"
										v-if="modify_text != 'Edit'">
										<el-option key="Male" label="Male" value="Male"></el-option>
										<el-option key="Female" label="Female" value="Female"></el-option>
									</el-select>
								</div>
							</div>
							<div class="form_content">
								<div class="form_input1">
									<!-- <div class="form_input_phone">
										<img src="@/assets/images/img4.png" >
										<p>(+60)</p>
									</div> -->
									<p>Phone Number<span>*</span></p>
									<div class="Phone_Number_Input">
										<VuePhoneNumberInput id="phoneNumber1" v-model="info_list.phoneNumber"
											:default-country-code="info_list.countryCode" @update="onUpdate"
											:disabled="disabled" />
									</div>
									<!-- <div class="form_input1_content">
										<input type="text" class="input1" v-model="info_list.phoneNumber">
										<img src="@/assets/images/yn.png"  v-if="info_list.phoneNumber == null || info_list.phoneNumber == ''">
										<img src="@/assets/images/yg.png" v-else>
									</div> -->
								</div>
								<div class="form_input1">
									<p>Email Address<span>*</span></p>
									<div class="form_input1_content">
										<input type="text" v-model="info_list.email" disabled
											v-if="modify_text == 'Edit'">
										<input type="text" v-model="info_list.email" v-if="modify_text != 'Edit'">
										<img src="@/assets/images/yn.png"
											v-if="info_list.email == null || info_list.email == ''">
										<img src="@/assets/images/yg.png" v-else>
									</div>
								</div>
							</div>
							<div class="form_input3">
								<p>OKU<span>*</span></p>
								<div :class="modify_text != 'Edit' ? 'inputs_img1 input_cursor' : 'inputs_img1'">
									<img src="@/assets/images/yls.png"
										v-if="info_list.oku == false || info_list.oku == '' || info_list.oku == null"
										@click="modify_text != 'Edit' ? selectOku() :''">
									<img src="@/assets/images/yl.png" v-if="info_list.oku == true"
										@click="modify_text != 'Edit' ? selectOku() : ''">
									<p>YES</p>
								</div>
								<div :class="modify_text != 'Edit' ? 'inputs_img1 input_cursor' : 'inputs_img1'">
									<img src="@/assets/images/yls.png"
										v-if="info_list.oku == true || info_list.oku == null"
										@click="modify_text != 'Edit' ? selectOku() : ''">
									<img src="@/assets/images/yl.png"
										v-if="info_list.oku == false || info_list.oku == ''"
										@click="modify_text != 'Edit' ? selectOku() : ''">
									<p>NO</p>
								</div>
							</div>
							<div class="form_content">
								<div class="form_input2">
									<p>Date of Birth</p>
									<div class="date_picker">
										<el-date-picker v-model="date_value" disabled v-if="modify_text == 'Edit'"
											type="date" format="MM-dd" value-format="MM-dd"></el-date-picker>
										<el-date-picker v-model="date_value" popper-class="picker-date"
											v-if="modify_text != 'Edit'" type="date" format="MM-dd" value-format="MM-dd"></el-date-picker>
									</div>
								</div>
								<div class="form_input2">
									<p>Year</p>
									<div class="year_picker">
										<el-date-picker v-model="year_value" disabled v-if="modify_text == 'Edit'"
											type="year" value-format="yyyy"></el-date-picker>
										<el-date-picker v-model="year_value" v-if="modify_text != 'Edit'" type="year"
											value-format="yyyy"></el-date-picker>
									</div>
								</div>
								<div class="form_input2">
									<p>Nationality</p>
									<input type="text" v-model="info_list.nationality" disabled
										v-if="modify_text == 'Edit'">
									<!-- filterable :filter-method="filter" @focus="clickClearNa" -->
									<el-select class="user_name" :popper-append-to-body="false"
										placeholder="Please select" v-model="nationality"
										filterable :filter-method="filter1" @focus="clickClearNa" @blur="clickInfoNa"
										@change="chaneInfoNa"
										v-if="modify_text != 'Edit'">
										<el-option :label="item.name" :value="item.name" :key="item.id"
											v-for="(item,index) in country"></el-option>
									</el-select>
								</div>
								<div class="form_input2">
									<p>Relationship Status</p>
									<input type="text" v-model="info_list.relationship" disabled
										v-if="modify_text == 'Edit'">
									<el-select class="user_name" :popper-append-to-body="false"
										placeholder="Please select" v-model="info_list.relationship"
										v-if="modify_text != 'Edit'">
										<el-option key="Single" label="Single" value="Single"></el-option>
										<el-option key="In a Relationship" label="In a Relationship"
											value="In a Relationship"></el-option>
										<el-option key="Engaged" label="Engaged" value="Engaged"></el-option>
										<el-option key="Married" label="Married" value="Married"></el-option>
										<el-option key="It's Complicated" label="It's Complicated"
											value="It's Complicated"></el-option>
										<el-option key="Widowed" label="Widowed" value="Widowed"></el-option>
										<el-option key="Separated" label="Separated" value="Separated"></el-option>
										<el-option key="Divorced" label="Divorced" value="Divorced"></el-option>
										<el-option key="Others" label="Others" value="Others"></el-option>
									</el-select>
								</div>
							</div>
						</div>
					</div>
					<div class="right_form_information">
						<p class="information_title">Address Information</p>
						<div class="form_inputs">
							<div class="form_input3" style="width:98%">
								<p>Address</p>
								<input type="text" v-model="info_list.addressDetail" disabled
									v-if="modify_text == 'Edit'">
								<input type="text" v-model="info_list.addressDetail" v-if="modify_text != 'Edit'">
							</div>
							<div class="form_content">
								<div class="form_input">
									<p>Country<span>*</span></p>
									<input type="text" v-model="info_list.addressCountry" disabled
										v-if="modify_text == 'Edit'">
									<!-- filterable :filter-method="filter" @focus="clickClearNad" -->
									<el-select class="user_name" :popper-append-to-body="false"
										placeholder="Please select" v-model="addressCountry"
										filterable :filter-method="filter" @focus="clickClearNad" @blur="clickInfoNad"
										@change="change_state" v-if="modify_text != 'Edit'">
										<el-option :label="item.name" :value="item.name" :key="item.id"
											v-for="(item,index) in country"></el-option>
									</el-select>
								</div>
								<div class="form_input">
									<p>State</p>
									<input type="text" v-model="info_list.addressState" disabled
										v-if="modify_text == 'Edit'">
									<el-select class="user_name" :popper-append-to-body="false"
										placeholder="Please select" v-model="addressState"
										filterable :filter-method="filter2" @focus="clickClearNas" @blur="clickInfoNas"
										@change="chaneStateInfoNa"
										v-if="modify_text != 'Edit'">
										<el-option :label="item.name" :value="item.name" :key="item.id"
											v-for="(item,index) in stateList"></el-option>
									</el-select>
								</div>
								<div class="form_input1">
									<p>Postcode</p>
									<input type="text" class="input" v-model="info_list.postcode" disabled
										v-if="modify_text == 'Edit'">
									<input type="text" class="input" v-model="info_list.postcode"
										v-if="modify_text != 'Edit'">
								</div>

							</div>
						</div>
					</div>
					<div class="right_form_information">
						<p class="information_title">My Introduction</p>
						<div class="form_inputs">
							<div class="form_input3" style="width:98%">
								<p>About Me</p>
								<textarea name="" id="" cols="30" rows="10" v-model="info_list.introduction" disabled
									v-if="modify_text == 'Edit'"></textarea>
								<textarea name="" id="" cols="30" rows="10" v-model="info_list.introduction"
									v-if="modify_text != 'Edit'"></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import VuePhoneNumberInput from 'vue-phone-number-input';
	import LeftView from '@/components/order/left.vue'
	import CropperImg from '@/components/CropperImg/index.vue'
	import {
		userInfo,
		updateInfo,
	} from '@/api/user_info'
	import {
		countriesAll,
		countriesStates
	} from '@/api/center'
	export default {
		name: "profile",
		components: {
			LeftView,
			VuePhoneNumberInput,
			CropperImg
		},
		data() {
			return {
				year_value: '',
				date_value: '',
				all_stamp: '',
				all_year_value: '',
				all_date_value: '',
				birthday: '',
				stamp: '',
				info_list: {
					countryCode: 'MY',//默认马来西亚
					avatar:''
				},
				country: [],
				stateList: [],
				// countryId: '',
				modify_text: 'Edit',
				disabled: true,
				results: '',
				postcode: '',
				copy: [],
				prtime: 0,
				cropper_status: false,//剪裁上传的图片弹窗
				formValidate: {
					mainImage: '',
				},
				ruleValidate: {
					mainImage: [{
						required: true,
						message: 'Please upload cover image',//请上传封面
						trigger: 'blur'
					}],
				},
				//裁切图片参数
				cropperName: '',
				imgName: '',
				countryId:'',
				copy:[],
				addressCountry:'',//国家
				nationality:'',//国籍
				addressState:'',//州
				stateCopy:[],//州列表复制
				prtime:0,
			};
		},
		mounted() {
			// this.copy = [];
			// this.stateCopy = [];
			this.prtime = 0;
			this.get_user_info()
			this.countriesAll();
		},
		methods: {
			//国家和国籍选择后列表恢复
			chaneInfoNa(){
				this.country = this.copy
			},
			//州选择后列表恢复
			chaneStateInfoNa(){
				this.stateList = this.stateCopy
			},
			//nationality可输入选择框获取焦点时
			clickClearNa(){
				// this.country = this.copy	//获取焦点时国家列表恢复
				this.nationality = ''
				// this.country = this.copy	//失去焦点时国家列表恢复
			},
			//nationality可输入选择框失去焦点时
			clickInfoNa(){
				if(this.nationality == ''){
					//当没有输入首字母失去焦点时，国家返回用户信息的国家
					this.nationality = this.info_list.nationality
					this.country = this.copy	//失去焦点时国家列表恢复
				}else{
					this.nationality = this.nationality
					// this.country = this.copy	//失去焦点时国家列表恢复
				}
			},
			//国家可输入选择框获取焦点时
			clickClearNad(){
				// this.dataForm.addressCountry = ''
				this.addressCountry = ''
			},
			//国家可输入选择框失去焦点时
			clickInfoNad(){
				if(this.addressCountry == ''){
					//当没有输入首字母失去焦点时，国家返回用户信息的国家
					this.addressCountry = this.info_list.addressCountry
					this.country = this.copy	//失去焦点时国家列表恢复
				}else{
					this.addressCountry = this.addressCountry
				}
			},

			//国家筛选
			filter(val) {
				console.log(val,"筛选")
				// console.log(index,"下标")
				this.prtime = (new Date()).getTime();
				var that = this;
				setTimeout(function () {
					if (((new Date()).getTime()-that.prtime)>=800){
						//对绑定数据赋值
						if(val!=' '){
							var result = []
							that.copy.forEach( e => {
								if(e.name.toUpperCase().indexOf(val.toUpperCase()) == 0) {
								   result.push(e)
								}
							})
							console.log(result,"result")
							that.addressCountry = val
							//搜索到相应的数据就把符合条件的n个数据赋值brand
							that.country = result
						}else{
							//没有搜索到数据，就还展示所有的brand
							that.country = that.copy
						}
					}
				},800);
			},
			//nationality筛选
			filter1(val) {
				console.log(val,"筛选")
				// console.log(index,"下标")
				this.prtime = (new Date()).getTime();
				var that = this;
				setTimeout(function () {
					if (((new Date()).getTime()-that.prtime)>=800){
						//对绑定数据赋值
						if(val!=' '){
							var result = []
							that.copy.forEach( e => {
								if(e.name.toUpperCase().indexOf(val.toUpperCase()) == 0) {
								   result.push(e)
								}
							})
							that.nationality = val
							//搜索到相应的数据就把符合条件的n个数据赋值brand
							that.country = result
						}else{
							//没有搜索到数据，就还展示所有的brand
							that.country = that.copy
						}
					}
				},800);
			},
			//state可输入选择框获取焦点时
			clickClearNas(){
				this.addressState = ''
			},
			//state可输入选择框失去焦点时
			clickInfoNas(){
				if(this.addressState == ''){
					//当没有输入首字母失去焦点时，国家返回用户信息的国家
					this.addressState = this.info_list.addressState
					this.stateList = this.stateCopy	//失去焦点时省份列表恢复
				}else{
					this.addressState = this.addressState
				}
			},
			//state筛选
			filter2(val) {
				console.log(val,"筛选")
				// console.log(index,"下标")
				this.prtime = (new Date()).getTime();
				var that = this;
				setTimeout(function () {
					if (((new Date()).getTime()-that.prtime)>=800){
						//对绑定数据赋值
						if(val!=' '){
							var result = []
							that.stateCopy.forEach( e => {
								if(e.name.toUpperCase().indexOf(val.toUpperCase()) == 0) {
								   result.push(e)
								}
							})
							console.log(result,"result")
							that.addressState = val
							//搜索到相应的数据就把符合条件的n个数据赋值brand
							that.stateList = result
						}else{
							//没有搜索到数据，就还展示所有的brand
							that.stateList = that.stateCopy
						}
					}
				},800);
			},
			//封面设置
			uploadPicture(name) {
				this.cropperName = name;
				this.cropper_status = true;
			},
			//图片上传成功后
			handleUploadSuccess(data) {
				// console.log(data)
				switch (data.name) {
					case 'flagImg':
						this.info_list.avatar = data.url
						// console.log(this.info_list.avatar)
						// this.formValidate.mainImage = 'http://ydfblog.cn/dfs/' + data.url;
						// console.log('最终输出' + data.name)
						break;
				}
				this.cropper_status = false;
			},

			onUpdate(payload) {
				this.results = payload
				this.info_list.phoneNumber = payload.nationalNumber
				this.info_list.countryCode = payload.countryCode
			},
			// 获取国家
			countriesAll() {
				countriesAll({}).then(res => {
					this.country = res.data
					this.copy = res.data
					if(this.addressCountry){
						for(let a=0;a < this.copy.length;a++){
							if(this.addressCountry == this.copy[a].name){
								this.countryId = this.copy[a].id
								this.change_state()
							}
						}
					}
				})
			},
			// 获取省
			change_state(val) {
				this.country = this.copy
				let that = this;
				for (let i = 0; i < this.country.length; i++) {
					if (this.country[i].name == val) {
						that.countryId = this.country[i].id
					}
				}
				if (that.countryId != '') {
					let params = {
						countryId: this.countryId
					}
					countriesStates(params).then(res => {
						that.stateList = res.data
						that.stateCopy = res.data
					})
				}
			},
			jump_game() {
				this.$router.push({
					path: '/center/game'
				})
			},
			//获取用户信息
			get_user_info() {
				let self = this;
				let user_Id = new URLSearchParams();
				user_Id.append('userId', sessionStorage.getItem("userId"));
				userInfo(user_Id).then(res => {
					self.info_list = res.data.userInfo;
					self.addressCountry = res.data.userInfo.addressCountry
					self.nationality = res.data.userInfo.nationality
					self.addressState = res.data.userInfo.addressState
					if (res.data.userInfo.birthday != null && res.data.userInfo.birthday != '') {
						// 处理返回的时间戳格式， 转为日期格式显示
						let date_timestamp = res.data.userInfo.birthday
						let day_timess = new Date(parseInt(date_timestamp))
						let day_day =
							`${day_timess.getFullYear()}-${day_timess.getMonth()+1}-${day_timess.getDate()}`
						self.year_value = day_day.split('-')[0]
						self.date_value = day_day.split('-')[1] + '-' + day_day.split('-')[2]
						self.all_stamp = res.data.userInfo.birthday
						self.all_year_value = day_day.split('-')[0]
						self.all_date_value = day_day.split('-')[1] + '-' + day_day.split('-')[2]
					} else {

					}
				})
			},
			// 上传成功
			handleAvatarSuccess(res, attr) {
				this.$loading({
					customClass: "animated fadeOut"
				}).close();
				if(res.code == 200){
					this.$message({
						message: res.message,
						type: 'success'
					});
					if (attr === 'avatar') {
						this.info_list.avatar = res.data
					}
				}else{
					this.$message({
						message: res.message,
						type: 'error'
					});
				}

			},
			beforeAvatarUpload(file) {
				const isJPG = file.type;
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.$loading({
					background: "rgba(255, 255, 255, 0.7)",
					customClass: "animated fadeIn",
					text: "loading..."
				});
				return isJPG && isLt2M;
			},
			selectOku() {
				let self = this;
				self.info_list.oku = !self.info_list.oku;
			},
			updateUserInfo(index) {
				let self = this;
				if (self.modify_text == 'Edit') {
					self.modify_text = 'Save'
					self.disabled = false
				} else {
					if (self.info_list.fullName == '') {
						this.$message({
							message: 'Must fill in Full Name',
							type: 'warning'
						});
						return false
					} else {
						let user_Id = sessionStorage.getItem("userId");
						if (self.info_list.oku == true) {
							self.info_list.oku = true;
						} else {
							self.info_list.oku = false
						}
						if (self.year_value == '' || self.date_value == '') {
							this.$message({
								message: 'Please select your date of birth！',//请选择生日时间
								type: 'warning'
							});
							return false;
						} else {
							// 判断日期有没有修改过，没修改还是用详情返回的
							// if (self.all_year_value == self.year_value && self.all_date_value == self.date_value) {
							// 	self.stamp = self.all_stamp
							// 	self.birthday = self.all_year_value + '-' + self.date_value
							// } else {
							// 	let year_time = self.year_value;
							// 	let month_time = self.date_value.getMonth() + 1;
							// 	let day_time = self.date_value.getDate();
							// 	self.birthday = year_time + '-' + month_time + '-' + day_time;
							// 	self.stamp = Date.parse(self.birthday)
							// }

              self.birthday = self.year_value + '-' + self.date_value
              self.stamp = Date.parse(self.birthday)

							let submit_info = {
								userId: user_Id,
								fullName: self.info_list.fullName,
								countryCode: self.info_list.countryCode,
								gender: self.info_list.gender,
								phoneNumber: self.info_list.phoneNumber,
								email: self.info_list.email,
								oku: self.info_list.oku,
								birthday: self.stamp,
								// nationality: self.info_list.nationality,
								nationality:self.nationality,
								relationship: self.info_list.relationship,
								addressDetail: self.info_list.addressDetail,
								// addressState: self.info_list.addressState,
								addressState: self.addressState,
								postcode: self.info_list.postcode,
								// postcode:self.postcode,
								// addressCountry: self.info_list.addressCountry,
								addressCountry: self.addressCountry,
								introduction: self.info_list.introduction,
								avatar: self.info_list.avatar,
								userName: self.info_list.userName
							}
							updateInfo(submit_info).then(res => {
								this.$message({
									type: 'success',
									message: res.message
								});
								self.modify_text = 'Edit'
								self.disabled = true
								this.get_userinfo();
							})
						}
					}
				}
			},
			get_userinfo() {
				let self = this;
				let params = {
					userId: sessionStorage.getItem('userId')
				}
				userInfo(params).then(res => {
					sessionStorage.setItem("userinfo", JSON.stringify(res.data.userInfo))
					// setTimeout(function(){
					// 	location.reload();
					// },800)
				})
			},
			// 跳转页面
			jump_pagee(index) {
				if (index == 1) {
					this.$router.push({
						path: '/center/profile'
					})
				} else if (index == 2) {
					this.$router.push({
						path: '/order/wallet'
					})
				} else if (index == 3) {
					this.$router.push({
						path: '/order/host'
					})
				} else if (index == 4) {
					this.$router.push({
						path: '/center/companion'
					})
				}
			},
		}
	};
</script>

<style lang="less">
	.el-input--suffix .el-input__inner {
		background-color: #fff;
		color: #ff0000;
		height: 55px;
		border-radius: 19px;
		border: 1px solid #2D2D2D;
	}

	.country-selector__country-flag {
		margin: auto 0;
		position: absolute;
		top: 25px;
		left: 11px;
		z-index: 1;
		cursor: pointer;
	}

	.picker-date {
		.el-date-picker__header {
			span:nth-child(3) {
				display: none !important;
			}

			button:nth-child(1) {
				display: none !important;
			}

			button:nth-child(5) {
				display: none !important;
			}
		}
	}

	/deep/ .el-select .el-input .el-input__inner {
		border: 0px;
		width: 230px;
		height: 59px;
		color: #fff;
		font-family: 'Roboto-Regular';
		border-radius: 20px;
		background-color: #0E0F11;
		border: 1px solid #0E0F11;
	}

	/deep/ .el-select-dropdown {
		background-color: #0E0F11;
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
		font-family: 'Roboto-Regular';
	}

	/deep/ .el-select-dropdown__item.hover {
		background-color: #1D2023;
	}

	/deep/ .el-select-dropdown__item.selected {
		background-color: #1D2023;
	}
</style>
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

		.content_right {
			width: calc(100% - 370px);

			.content_right_nav {
				margin-top: 50px;
				margin-bottom: 20px;
				font-family: 'Roboto-Regular';

				p {
					display: inline-block;
					color: #898989;
					padding: 0 30px;
					font-size: 16px;
					margin: 0;
				}

				.adiv {
					display: inline-block;
					cursor: pointer;
					border-right: 1px solid #7F7F7F;

					&:last-child {
						border: none;
					}
				}

				a {
					border-right: 1px solid #7F7F7F;

					&:nth-child(4) {
						border: none;
					}
				}

				.av {
					color: #BF9D62;
					font-family: 'Roboto-Bold';
				}
			}

			.content_right_form {
				width: calc(100% - 60px);
				background: #0E0F11;
				border-radius: 50px;
				padding: 20px;

				.right_form_title {
					display: inline-block;
					width: 95%;
					margin: 0 2.5%;

					p {
						color: #fff;
						display: inline-block;
						margin-right: 50px;
						font-family: 'Quicksand-Regular';
						cursor: pointer;

						&:nth-child(1) {
							padding-bottom: 5px;
							border-bottom: 2px solid #D3AA53;
							font-family: 'Quicksand-Bold';
						}

						&:nth-child(2) {
							color: #727272;
						}
					}

					.qbutton {
						width: 120px;
						height: 50px;
						background: #0E0F11;
						border: 1px solid #777777;
						color: #fff;
						border-radius: 50px;
						font-size: 14px;
						display: flex;
						align-items: center;
						justify-content: center;
						float: right;
						cursor: pointer;
						font-family: 'Roboto-Regular';
					}

					.mobton {
						width: 120px;
						height: 50px;
						background: #D3AA53;
						border: 1px solid #D3AA53;
						color: #0E0F11;
						border-radius: 50px;
						font-size: 14px;
						display: flex;
						align-items: center;
						justify-content: center;
						float: right;
						cursor: pointer;
						font-family: 'Roboto-Regular';
					}
				}

				.right_form_change {
					width: 90%;
					margin: 0 2.5%;
					border: 1px solid #2D2D2D;
					border-radius: 20px;
					margin-top: 20px;
					display: flex;
					align-items: center;
					padding: 2.5%;

					p {
						color: #D3AA53;
						font-size: 14px;
						margin-left: 30px;
						font-family: 'Roboto-Regular';
						cursor: pointer;
					}

					.active1_img {
						width: 60px;
						height: 60px;
						border-radius: 10px;
					}

					.cropper_img {
						// width: 500px;
						// height: 500px;
						position: absolute;
						z-index: 99;
						top: 20px;
						left: 20%;
						.mark_check {
							position: fixed;
							right: 80px;
							top: 140px;
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
						.cropper_img_content {
							padding: 80px;
							border-radius: 20px;
							background-color: #0E0F11;
							position: absolute;
							z-index: 9999;
						}
					}
				}

				.right_form_information {
					width: 95%;
					margin: 0 2.5%;
					border-top: 1px solid #2d2d2d;
					margin-top: 30px;

					.information_title {
						color: #fff;
						padding-top: 20px;
						font-family: 'Quicksand-Bold';
					}

					.form_inputs {
						.form_content {
							display: flex;
							justify-content: space-between;
							font-family: 'Roboto-Regular';
							/* 横向中间自动空间 */
							flex-wrap: wrap;

							.form_input {
								width: 45%;

								&:nth-child(2n) {
									position: relative;
									left: -20px;
								}

								p {
									color: #727272;
									font-size: 15px;

									span {
										color: red;
									}
								}

								input {
									width: 100%;
									height: 55px;
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									color: #fff;
									background: inherit;
									padding-left: 20px;
									font-size: 16px;
								}

								/deep/ .el-select {
									width: 104%;
								}

								/deep/ .el-select .el-input .el-input__inner {
									width: 100%;
									height: 62px;
									color: #fff;
									border-radius: 19px;
									background-color: #0E0F11;
									border: 2px solid #2D2D2D;
								}

								/deep/ .el-select-dropdown {
									background-color: #0E0F11;
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
								}

								/deep/ .el-select-dropdown__item.hover {
									background-color: #1D2023;
								}

								/deep/ .el-select-dropdown__item.selected {
									background-color: #1D2023;
								}
							}

							.form_input1 {
								width: 45%;
								margin-top: 20px;
								position: relative;

								&:nth-child(2n) {
									position: relative;
									left: -20px;
								}

								p {
									color: #727272;
									font-size: 15px;

									span {
										color: red;
									}
								}

								.input {
									width: 100%;
									height: 55px;
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									color: #fff;
									background: inherit;
									padding-left: 20px;
									font-size: 16px;
								}

								.form_input_phone {
									width: 150px;
									display: flex;
									align-items: center;
									position: absolute;
									top: 47px;
									left: 20px;

									p {
										height: 30px;
										line-height: 30px;
										margin-left: 10px;
										border-right: 1px solid #2d2d2d;
										padding-right: 10px;
									}
								}

								.Phone_Number_Input {
									width: 105%;
									height: 55px;
									// border: 2px solid #2D2D2D;
									border-radius: 19px;
									position: relative;

									/deep/.country-selector__input {
										color: #fff;
										height: 55px;
										min-height: 55px;
										border: 1px solid #2d2d2d;
										border-top-left-radius: 19px !important;
										border-bottom-left-radius: 19px !important;
										background-color: #0e0f11 !important;
										// border-color: #D3AA53 !important;
									}

									/deep/.country-selector__label {
										// color: #D3AA53 !important;
									}

									/deep/.input-tel__input {
										color: #fff;
										height: 55px;
										min-height: 55px;
										border: 1px solid #2d2d2d;
										border-top-right-radius: 19px !important;
										border-bottom-right-radius: 19px !important;
										background-color: #0e0f11 !important;
									}

									/deep/.input-tel.is-valid .input-tel__input,
									.input-tel.is-valid .input-tel__input:hover {
										border-color: #D3AA53 !important;
									}

									/deep/.input-phone-number.is-focus.is-valid.has-value /deep/.input-tel__input {
										border-color: #D3AA53 !important;

									}

									/deep/.input-phone-number.is-focus.is-valid.has-value /deep/.input-tel__label {
										color: #D3AA53 !important;
									}

									/deep/.input-phone-number.is-valid.has-value /deep/.input-tel__input {
										border-color: #D3AA53 !important;
									}

									/deep/ .country-selector__list {
										background-color: #0E0F11 !important;
									}

									/deep/ .dots-text {
										color: #fff !important;
									}
								}

								.form_input1_content {
									width: 105%;
									height: 55px;
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									position: relative;

									input {
										width: 85%;
										height: 55px;
										color: #fff;
										background: inherit;
										padding-left: 20px;
										border: none;
										font-size: 16px;
									}

									.input1 {
										width: 50%;
										margin-left: 130px;
									}

									img {
										position: absolute;
										right: 15px;
										top: 20px
									}
								}

							}

							.form_input2 {
								width: 45%;
								margin-top: 20px;

								&:nth-child(2n) {
									position: relative;
									left: -20px;
								}

								/deep/ .el-select {
									width: 104%;
								}

								/deep/ .el-select .el-input .el-input__inner {
									width: 100%;
									height: 62px;
									color: #fff;
									border-radius: 19px;
									background-color: #0E0F11;
									border: 2px solid #2D2D2D;
								}

								/deep/ .el-select-dropdown {
									background-color: #0E0F11;
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
								}

								/deep/ .el-select-dropdown__item.hover {
									background-color: #1D2023;
								}

								/deep/ .el-select-dropdown__item.selected {
									background-color: #1D2023;
								}

								.year_picker {
									width: 105%;
									font-size: 16px;

									/deep/ .el-input.is-disabled {
										/deep/ .el-input__inner {
											border-color: #2D2D2D !important;
										}
									}

									/deep/ .el-date-editor {
										width: 100%;
										height: 55px;
										border-radius: 19px;
										background-color: #0E0F11;
										border: 1px solid #2D2D2D;


									}

									/deep/ .el-input__inner {
										background-color: #0E0F11;
										color: #ffffff;
										height: 55px;
										border-radius: 19px;
										border: 1px solid #2D2D2D;
									}
								}

								.date_picker {
									width: 105%;
									font-size: 16px;

									/deep/ .el-date-editor {
										width: 100%;
										height: 55px;
										border-radius: 19px;
										background-color: #0E0F11;
										border: 1px solid #2D2D2D;
									}

									/deep/ .el-date-editor--date {
										/deep/ .el-input__inner {
											background-color: #0E0F11;
											color: #FFFFFF;
										}
									}

									/deep/ .el-input__inner {
										background-color: #0E0F11;
										border-color: #2D2D2D;
										color: #FFFFFF;
									}


								}

								.inputs_img {}

								.inputs_img1 {
									display: flex;
									align-items: center;
									float: left;
									cursor: pointer;

									img {
										width: 25px;
									}

									p {
										margin: 10px;
									}

									&:nth-child(3) {
										margin-left: 40px;
									}
								}

								p {
									color: #727272;
									font-size: 15px;

									span {
										color: red;
									}
								}

								input {
									width: 100%;
									height: 55px;
									border: 2px solid #2D2D2D;
									border-radius: 19px;
									color: #fff;
									background: inherit;
									padding-left: 20px;
									font-size: 16px;
								}
							}
						}

						.form_input3 {
							width: 100%;
							margin-top: 20px;
							display: inline-block;

							.inputs_img {}

							.input_cursor {
								cursor: pointer;
							}

							.inputs_img1 {
								display: flex;
								align-items: center;
								float: left;

								img {
									width: 25px;
								}

								p {
									margin: 10px;
								}

								&:nth-child(3) {
									margin-left: 40px;
								}
							}

							p {
								color: #727272;
								font-size: 15px;

								span {
									color: red;
								}
							}

							input {
								width: 100%;
								height: 55px;
								border: 2px solid #2D2D2D;
								border-radius: 19px;
								color: #fff;
								background: inherit;
								padding-left: 20px;
								font-size: 16px;
							}

							textarea {
								width: calc(100% - 20px);
								border: 2px solid #2D2D2D;
								border-radius: 19px;
								color: #fff;
								background: inherit;
								padding: 20px;
								font-size: 16px;
								height: 120px;
								resize: none
							}
						}
					}
				}
			}
		}
	}

  @media screen and (max-width: 500px){
    .form_input1 {
      width: 100% !important;
      margin-bottom: 10px;

      .Phone_Number_Input {
        width: 100% !important;
        height: auto !important;

        /deep/.country-selector__input {
          height: auto !important;
        }

        /deep/.input-tel__input {
          height: auto !important;
        }
      }

      .form_input1_content, input {
        height: 30px !important;
      }
    }

     .form_input, .form_input2, .form_input3 {
        width: 100% !important;

        .el-date-editor {
          height: 30px !important;

          /deep/ input {
            height: 30px !important;
          }
        }

       input {
         height: 30px !important;
       }
     }
  }
</style>
