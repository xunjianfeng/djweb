<template>
	<div class="index">
		<div class="container">
			<LeftView :index="1"></LeftView>
			<div class="content_right">
				<!--提示完善信息 弹窗 -->
				<div class="mark_cancel" v-if="update_up == true" @click.stop="update_up = false">
					<img src="@/assets/images/cancel.png" >
				</div>
				<div class="mark_bac" v-if="update_up == true"></div>
				<div class="mark_Top_container" v-if="update_up == true">
					<div class="mark_my_content ">
						<div class="mark_text_one">Complete the information later?</div>
						<div class="mark_text_two">Note that you will not be able to use some functions before completing the information</div>
					</div>
					<div class="mark_my_foot">
						<div class="mark_foot_button" @click="jupm_later">Do It Later ></div>
					</div>
				</div>
				<!-- 第一次登录提示语 -->
				<div class="first_bac" v-if="first_status == true">
					<div class="mark_Top_container" v-if="first_status == true">
						<div class="mark_my_content ">
							<div class="mark_text_one">Welcome to Bountee</div>
							<div class="mark_text_two">Please complete your personal profile.</div>
						</div>
						<div class="mark_my_foot">
							<div class="mark_foot_button" @click="first_status = false">Start ></div>
						</div>
					</div>
				</div>
				
				<!-- 步骤条 -->
				<div class="content_right_nav">
					<p class="av">STEP 0{{step_type}}</p>
					<p class="border_av">——</p>
					<!-- <p :class="step_type == 1 ?'border_none':'border_av' ">——</p> -->
					<p :class="step_type == 2 ?'border_av':'border_none' ">——</p>
				</div>
				<!-- 步骤内容 -->
				<div class="content_right_form" v-if="step_type  == 1">
					<div class="right_form_title">
						<p>Personal Information</p>
						<div class="left_block">
							<!-- <div class="do_it_later" @click.stop="update_up = true">
								<img src="../../assets/images/wenhao.png" alt="">
								<p>Do It Later</p>
							</div> -->
							<button @click="updateUserInfo(1)">Next</button>
						</div>

					</div>
					<div class="right_form_change">
						<el-image :src="HOST +  info_list.avatar" class="active1_img" :rules="ruleValidate" ref="formValidate">
							<div slot="error" class="image-slot"> 
								<img src="../../assets/images/default.png" class="active1_img"/>
							</div>
						</el-image>
						<!-- <img class="active1_img" v-if="info_list != '' && info_list != undefined  " :src="info_list.avatar == null ? default_avatar : HOST + info_list.avatar"> -->
						<p @click="uploadPicture('flagImg')">Upload profile picture</p>
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
							<p>Upload profile picture</p>
						</el-upload> -->
					</div>
					<div class="right_form_information">
						<p class="information_title">Account Information</p>
						<div class="form_inputs">
							<div class="form_content">
								<div class="form_input">
									<p>User Name<span>*</span></p>
									<input type="text" v-model="info_list.fullName">
								</div>
							</div>
							<div class="form_content">
								<div class="form_input">
									<p>Full Name<span>*</span> (as per NRIC/Passport)</p>
									<input type="text" v-model="info_list.userName">
								</div>
								<div class="form_input">
									<p>Gender</p>
									<el-select :popper-append-to-body="false" placeholder="Please select" class="user_name" v-model="info_list.gender">
										<el-option key="Male" label="Male" value="Male"></el-option>
										<el-option key="Female" label="Female" value="Female"></el-option>
									</el-select>
								</div>
							</div>
							<div class="form_content">
								<div class="form_input1">
									<p>Phone Number<span>*</span></p>
									<div class="Phone_Number_Input">
										<VuePhoneNumberInput
											id="phoneNumber1"
											v-model="info_list.phoneNumber"
											:default-country-code="info_list.countryCode"
											@update="onUpdate"
											/>
									</div>
								</div>
								<div class="form_input1">
									<p>Email Address<span>*</span></p>
									<div class="form_input1_content">
										<input type="text" v-model="info_list.email">
										<img src="@/assets/images/yg.png" alt="">
									</div>
								</div>
							</div>
							<div class="form_input3">
								<p>OKU<span>*</span></p>
								<div class="inputs_img1">
									<img src="@/assets/images/yls.png" alt="" v-if="info_list.oku == false || info_list.oku == '' || info_list.oku == null"
									 @click="selectOku"><!-- 没选中 -->
									<img src="@/assets/images/yl.png" alt="" v-if="info_list.oku == true" @click="selectOku"> <!-- 选中 -->
									<p>YES</p>
								</div>
								<div class="inputs_img1">
									<img src="@/assets/images/yls.png" alt="" v-if="info_list.oku == true || info_list.oku == null" @click="selectOku">
									<img src="@/assets/images/yl.png" alt="" v-if="info_list.oku == false || info_list.oku == ''" @click="selectOku">
									<p>NO</p>
								</div>
							</div>
							<div class="form_content">
								<div class="form_input2">
									<p>Date of Birth</p>
									<div class="date_picker">
										<el-date-picker popper-class="picker-date" v-model="date_value" type="date" format="MM-dd"></el-date-picker>
									</div>
								</div>
								<div class="form_input2">
									<p>Year</p>
									<div class="year_picker">
										<el-date-picker v-model="year_value" type="year" value-format="yyyy"></el-date-picker>
									</div>
								</div>
								<div class="form_input2">
									<p>Nationality</p>
									<!-- <input type="text" v-model="info_list.nationality"> -->
									<el-select :popper-append-to-body="false" filterable :filter-method="filter1" @focus="clickClearNa" @blur="clickInfoNa" @change="chaneInfoNa" class="user_name" placeholder="Please select"  v-model="nationality" >
										<el-option  :label="item.name" :value="item.name" :key="index" v-for="(item,index) in country"></el-option>
									</el-select>
								</div>
								<div class="form_input2">
									<p>Relationship Status</p>
									<el-select :popper-append-to-body="false" class="user_name" placeholder="Please select"  v-model="info_list.relationship">
										<el-option key="Single" label="Single" value="Single"></el-option>
										<el-option key="In a Relationship" label="In a Relationship" value="In a Relationship"></el-option>
										<el-option key="Engaged" label="Engaged" value="Engaged"></el-option>
										<el-option key="Married" label="Married" value="Married"></el-option>
										<el-option key="It's Complicated" label="It's Complicated" value="It's Complicated"></el-option>
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
								<input type="text" v-model="info_list.addressDetail">
							</div>
							<div class="form_content">
								<div class="form_input">
									<p>Country<span>*</span></p>
									<el-select :popper-append-to-body="false" filterable :filter-method="filter" @focus="clickClearNad" @blur="clickInfoNad" class="user_name" placeholder="Please select"  v-model="addressCountry" @change="change_state">
										<el-option  :label="item.name" :value="item.name" :key="index" v-for="(item,index) in country"></el-option>
									</el-select>
								</div>
								<div class="form_input">
									<p>State</p>
									<el-select :popper-append-to-body="false" filterable :filter-method="filter2" @focus="clickClearNas" @blur="clickInfoNas" @change="chaneStateInfoNa" class="user_name" placeholder="Please select"  v-model="addressState">
										<el-option  :label="item.name" :value="item.name" :key="index" v-for="(item,index) in stateList"></el-option>
									</el-select>
								</div>
								<div class="form_input1">
									<p>Postcode</p>
									<input type="text" class="input" v-model="info_list.postcode">
								</div>
								
							</div>
						</div>
					</div>
					<div class="right_form_information">
						<p class="information_title">My Introduction</p>
						<div class="form_inputs">
							<div class="form_input3" style="width:98%">
								<p>About Me</p>
								<textarea name="" id="" cols="30" rows="10" v-model="info_list.introduction">{{info_list.introduction}}</textarea>
							</div>
						</div>
					</div>
				</div>
				<!-- 第二步   游戏配置 -->
				<!-- <div class="content_step_two" v-else-if="step_type == 2">
					<div class="two_step_title">
						<p>Game Information</p>
						<div class="left_block">
							<button class="confirm" @click="updateUserInfo(2)">Next</button>
							<button class="back" @click="return_confirm(1)">Back</button>
						</div>
					</div>
					<div class="content_top">
						<div :class="index==tabIndex?'top_block':'top_block2'" v-for="(item,index) in list" :key="index" @click="tab_nav(index)">
							<img class="top_block_img" v-if="item.gameName != ''" :src="HOST+item.gameLogo " alt="">
							<div class="top_block_name" v-if="item.gameName != ''">{{item.gameName}}</div>
							<div class="top_block_name2" v-else>Pleasr choose game type</div>
						</div>
						<div class="top_block3" @click="addList">
							<img class="top_block_img" src="@/assets/images/add.png" alt="">
						</div>
					</div>
					<div class="content_right_container">
						<div class="content_right_form">
							<div class="right_form_information">
								<div class="form_inputs">
									<div class="form_user">
										<p class="form_username">Game</p>
										<div class="inputs_block">
											<div class="inputs_img1">
												<img :src="HOST+list[tabIndex]['gameLogo']" alt="">
												<el-select class="user_name" placeholder="Please select"  v-model="list[tabIndex]['gameId']" @change="selectChanged">
													<el-option v-for="item in game_list" :key="item.gameId" :label="item.gameName" :value="item.gameId">
													</el-option>
												</el-select>
											</div>
										</div>
									</div>
									<div class="form_content">
										<div class="form_input1">
											<p>In Game Name (IGN)<span>*</span></p>
											<input type="text" class="input" v-model="list[tabIndex]['ign']">
										</div>
										<div class="form_input1">
											<p>In Game ID (IGID)<span>*</span></p>
											<input type="text" class="input" v-model="list[tabIndex]['igid']">
										</div>
										<div class="form_input1">
											<p>Game Character</p>
											<input type="text" class="input" v-model="list[tabIndex]['role']">
										</div>
									</div>
									<div class="form_input3 form_margin" style="width:98%">
										<p>In Game Introduction （why people should team with me)</p>
										<textarea name="" id="" cols="30" rows="10" v-model="list[tabIndex]['introduce']"></textarea>
									</div>
									<div class="foot_del">
										<img src="../../assets/images/trash.png" class="del_img" alt="" @click="delDisplayArea">
										<div class="del_text" @click="delDisplayArea">Delete</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> -->
				<!-- 第三步 验证 -->
				<div class="content_step_three" v-else>
					<div class="right_step_title">
						<p>Update Your Verify</p>
						<div class="left_block">
							<!-- <div class="do_it_later"  @click.stop="update_up = true">
								<img src="../../assets/images/wenhao.png" alt="">
								<p>Do It Later</p>
							</div> -->
							<button class="confirm" @click="updateUserInfo(3)">Confirm</button>
							<button class="back" @click="return_confirm(1)">Back</button>
						</div>
					</div>
					<div class="right_step_information">
						<div class="step_threes">
							<div class="step_three1">
								<p>Type of Your Verify</p>
								<div class="select">
									<el-select :popper-append-to-body="false" class="user_name" placeholder="Please select"  v-model="dataForm.type">
										<el-option key="nric" label="NRIC" value="nric"></el-option>
										<el-option key="passport" label="PASSPORT" value="passport"></el-option>
									</el-select>
								</div>
							</div>
							<div class="step_three2">
								<p v-if="dataForm.type == 'nric' || dataForm.type == ''">Your NRIC Number <span style="font-size: 18rpx;">(eg. xxxxxxxxxxxx)</span></p>
								<p v-if="dataForm.type == 'passport'">Your PASSPORT Number</p>
								<input type="number" value="" v-model="dataForm.identification">
							</div>
							<div class="step_three3">
								<p>Please upload your NRIC number & front and back for verification</p>
								<div class="pic_img">
									<div class="front_view">
										<p>Front View</p>
										<div class="img">
											<el-upload class="avatar-uploader" :action="HOST + '/img/upload'" :show-file-list="false"
											 :on-success="res => {return handleAvatarSuccess(res,'frontUrl');}" :before-upload="beforeAvatarUpload">
												<img class="font_img" v-if="dataForm.frontUrl == ''" src="../../assets/images/update.png" />
												<img  class="font_none" v-else   :src="HOST + dataForm.frontUrl"/>
											</el-upload>
										</div>
									</div>
									<div class="front_view" v-if="dataForm.type == 'nric'">
										<p>Back View</p>
										<div class="img" >
											<el-upload class="avatar-uploader" :action="HOST + '/img/upload'" :show-file-list="false"
											 :on-success="res => {return handleAvatarSuccess(res,'backUrl');}" :before-upload="beforeAvatarUpload">
												<img class="font_img" v-if="dataForm.backUrl == ''" src="../../assets/images/update.png" />
												<img  class="font_none" v-else   :src="HOST + dataForm.backUrl"/>
											</el-upload>
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
	import VuePhoneNumberInput from 'vue-phone-number-input';
	import LeftView from '@/components/order/left.vue'
	import CropperImg from '@/components/CropperImg/index.vue'
	import {
		userInfo,
		updateInfo,
		userIdentification
	} from '@/api/user_info'
	import {
		profileUser,
		gamdList,
		profileSave,
		profileDelete,
		countriesAll,
		countriesStates
	} from '@/api/center'
		
	export default {
		name: "personal",
		components: {
			LeftView,
			VuePhoneNumberInput,
			CropperImg
		},
		data() {
			return {
				default_avatar:require("../../assets/images/default.png"),
				update_up:false,
				first_status:false,
				year_value: '',
				date_value: '',
				all_stamp: '',
				all_year_value: '',
				all_date_value: '',
				birthday: '',
				stamp: '',
				step_type: 1, //step  进度
				info_list: {
					userId:'',
					fullName:'',
					gender:'',
					phoneNumber:'',
					countryCode:'MY',//默认马来西亚
					email:'',
					oku:'',
					birthday:'',
					nationality:'',
					relationship:'',
					addressState:'',
					addressCountry:'',
					addressDetail:'',
					postcode:'',
					introduction:'',
					avatar:'',
					userName:''
				}, //step 01信息
				list: [{
					profileId: '',
					userId: sessionStorage.getItem("userId"),
					gameId: '',
					gameLogo: '',
					gameName: '',
					ign: '',
					igid: '',
					role: '',
					introduce: '',
				}, ], //第二步所需
				tabIndex: 0,
				game_list: '',
				dataForm:{
					type:'',
					frontUrl:'',
					backUrl:'',
					identification:""
				},
				user_info:'',
				country:[], 
				stateList:[],
				// countryId:'',
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
			this.get_user_info();
			this.gamdList();
			this.get_profile();
			this.user_info = JSON.parse(sessionStorage.getItem("userinfo"))
			if(this.user_info.login == 0){
				this.first_status = true
			}
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
				this.nationality = ''
			},
			//nationality可输入选择框失去焦点时
			clickInfoNa(){
				if(this.nationality == ''){
					//当没有输入首字母失去焦点时，国家返回用户信息的国家
					this.nationality = this.info_list.nationality
					this.country = this.copy	//失去焦点时国家列表恢复
				}else{
					this.nationality = this.nationality
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
					this.addressState = this.info_list.addressStat
					this.stateList = this.stateCopy	//失去焦点时省份列表恢复e
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
				switch (data.name) {
					case 'flagImg':
						this.info_list.avatar = data.url
						console.log(this.info_list.avatar)
						break;
				}
				this.cropper_status = false;
			},
			onUpdate(payload) {
				this.info_list.phoneNumber = payload.nationalNumber
				this.info_list.countryCode = payload.countryCode
			},
			// 获取国家
			countriesAll(){
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
			change_state(val){
				this.country = this.copy
				let that = this;
				for (let i = 0; i < this.country.length; i++) {
					if(this.country[i].name == val){
						that.countryId = this.country[i].id
					}
				}
				if(that.countryId != ''){
					let params = {
						countryId:this.countryId
					}
					countriesStates(params).then(res => {
						that.stateList = res.data
						that.stateCopy = res.data
						// console.log(res.data)
					})
				}
			},
			selectOku() {
				let self = this;
				self.info_list.oku = !self.info_list.oku;
			},
			get_user_info() {
				let self = this;
				// let user_Id = sessionStorage.getItem("userId");
				let user_Id = new URLSearchParams();
				user_Id.append('userId', sessionStorage.getItem("userId"));
				userInfo(user_Id).then(res => {
					self.info_list = res.data.userInfo;
					self.addressCountry = res.data.userInfo.addressCountry
					self.nationality = res.data.userInfo.nationality
					self.addressState = res.data.userInfo.addressState
					if(res.data.userInfo.birthday != null && res.data.userInfo.birthday != ''){
						// 处理返回的时间戳格式， 转为日期格式显示
						let date_timestamp = res.data.userInfo.birthday
						let day_timess = new Date(parseInt(date_timestamp))
						let day_day = `${day_timess.getFullYear()}-${day_timess.getMonth()+1}-${day_timess.getDate()}`
						self.year_value = day_day.substring(0, 4)
						self.date_value = day_day.substring(5, 9)
						self.all_stamp = res.data.userInfo.birthday
						self.all_year_value = day_day.substring(0, 4)
						self.all_date_value = day_day.substring(5, 9)
					}else{
						
					}
				})
			},
			//上传图片
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
						console.log(this.info_list.avatar)
					}else if(attr == 'frontUrl'){
						this.dataForm.frontUrl = res.data
					}else if(attr == 'backUrl'){
						this.dataForm.backUrl = res.data
					}
				}else{
					this.$message({
						message: res.message,
						type: 'error'
					});
				}
				
			},
			//上传中
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
			// 下一步
			updateUserInfo(index) {
				let self = this;
				if (index == 1) {
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
							if (self.all_date_value == self.date_value) {
								self.stamp = self.all_stamp
								self.birthday = self.all_year_value + '-' + self.date_value
							} else {
								let year_time = self.year_value;
								let month_time = self.date_value.getMonth() + 1;
								let day_time = self.date_value.getDate();
								self.birthday = year_time + '-' + month_time + '-' + day_time;
								self.stamp = Date.parse(self.birthday)
							}
							let submit_info = {
								userId: user_Id,
								fullName: self.info_list.fullName,
								gender: self.info_list.gender,
								phoneNumber: self.info_list.phoneNumber,
								countryCode: self.info_list.countryCode,
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
								// addressCountry: self.info_list.addressCountry,
								addressCountry: self.addressCountry,
								introduction: self.info_list.introduction,
								avatar: self.info_list.avatar,
								userName:self.info_list.userName
							}
							updateInfo(submit_info).then(res => {
								this.$message({
									type: 'success',
									message: res.message
								});
								self.step_type = 2
								// self.step_type = 3
							})

						}
					}
				} else if (index == 2) {
					// self.submit();
					// self.step_type = 3
				} else if (index == 3) {
					self.get_identification();
				}
			},
			// 返回上一步
			return_confirm(key) {
				this.step_type = key
			},

			// 第二步事件  游戏列表
			gamdList() {
				gamdList({size:0}).then(res => {
					const {
						list,
						total
					} = res.data
					this.game_list = list;
				})
			},
			selectChanged(value) {
				let that = this;
				for (let i = 0; i < that.game_list.length; i++) {
					if (that.game_list[i].gameId == value) {
						that.list[that.tabIndex]['gameLogo'] = that.game_list[i].gameLogo
						that.list[that.tabIndex]['gameName'] = that.game_list[i].gameName
					}
				}
			},
			// 获取用户游戏配置
			get_profile() {
				let that = this;
				profileUser({}).then(res => {
					if (res.data != '') {
						that.list = res.data
					}
				})
			},
			// 提交 游戏配置
			submit() {
				let that = this,
					{
						gameName,
						gameLogo,
						...data
					} = this.list[this.tabIndex],
					params = data;
				profileSave(params).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					setTimeout(() => {
						// that.step_type = 3
						that.step_type = 2
					}, 500)
				})
			},
			// 添加
			addList() {
				this.list.push({
					gameName: '',
					gameLogo: '',
					profileId: '',
					userId: sessionStorage.getItem("userId"),
					gameId: '',
					ign: '',
					igid: '',
					role: '',
					introduce: '',
				})
			},
			// 切换
			tab_nav(index) {
				this.tabIndex = index
			},
			// 删除游戏配置
			delDisplayArea() {
				let that = this;
				if (that.list[that.tabIndex]['profileId'] != '') {
					let params = {
						id: that.list[that.tabIndex]['profileId']
					}
					profileDelete(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						setTimeout(() => {
							that.get_profile();
							that.gamdList();
						}, 500)
					})
				} else {
					that.list.splice(that.tabIndex, 1)
					that.tabIndex = that.tabIndex - 1
				}
			},
			// 用户提交认证信息
			get_identification() {
				let that = this;
				let {type, frontUrl, backUrl,identification} = that.dataForm;
				if(this.dataForm.type == 'nric'){
					if(type == '' || frontUrl == '' || backUrl == '' || identification == ''){
						this.$message({
							message: 'Please complete your verification information！！',//请输入完整认证信息
							type: 'warning'
						});
						return false
					}
				}else{
					if(type == '' || frontUrl == '' || identification == ''){
						this.$message({
							message: 'Please complete your verification information！！',//请输入完整认证信息
							type: 'warning'
						});
						return false
					}
				}
				
				userIdentification(that.dataForm).then(res => {
					this.$message({
						type: 'success',
						message: res.message
					});
					that.get_userinfo();
					
				})
			},
			get_userinfo() {
				let self = this;
				let user_Id = new URLSearchParams();
				user_Id.append('userId', sessionStorage.getItem("userId"));
				userInfo(user_Id).then(res => {
					// console.log('测试')
					sessionStorage.setItem("userinfo", JSON.stringify(res.data.userInfo))
					setTimeout(function(){
						self.$router.push({path:'/center/profile'})
					},1000)
				})
			},
			jupm_later(){
				let that  = this;
				that.update_up = false
				that.$router.push({path: '/'})
			}
		},

	};
</script>

<style lang="less">
	.picker-date{
		.el-date-picker__header{
			span:nth-child(3){
				display: none !important;
			}
			button:nth-child(1){
				display: none !important;
			}
			button:nth-child(5){
				display: none !important;
			}
		}
		/deep/ .el-select .el-input .el-input__inner {
			border: 0px;
			width: 230px;
			height: 59px;
			color: #fff;
			font-family:'Roboto-Regular';
			border-radius: 20px;
			background-color: #0E0F11;
			border: 1px solid #0E0F11;
		}
		
		/deep/ .el-select-dropdown {
			background-color: #0E0F11;
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
			font-family:'Roboto-Regular';
		}
		/deep/ .el-select-dropdown__item.hover{
			background-color: #1D2023;
		}
		/deep/ .el-select-dropdown__item.selected{
			background-color: #1D2023;
		}
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
			// Check out 02弹窗 start
			.mark_cancel{
				position: absolute;
				right: 80px;
				top: 10px;
				img{
					width: 46px;
					height: 46px;
					cursor: pointer;
				}
				z-index: 999;
			}
			.mark_bac{
				width: 100%;
				height: 100vh;
				background:#000000b3;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 88;
			}
			.mark_Top_container{
				position: absolute;
				left: 357px;
				top: 185px;
				z-index: 999;
				width: 557px;
				padding: 126px 111px 103px 162px;
				background: #0E0F11;
				border-radius: 27px;
				overflow: hidden;
				display: flex;
				flex-flow: column;
				align-items: center;
				.mark_my_content{
					width: 100%;
					text-align: center;
					margin-bottom: 60px;
					.mark_text_one{
						color: #DBA83F;
						font-size: 24px;
						margin-bottom: 20px;
						font-family:'Quicksand-Bold';
					}
					.mark_text_two{
						color: #989898;
						font-size: 20px;
						font-family:'Roboto-Regular';
						span{
							color: #EDEDED;
							font-weight: bold;
						}
					}
				}
				.mark_my_foot{
					.mark_foot_button{
						display: flex;
						align-items: center;
						justify-content: center;
						width: 163px;
						height: 58px;
						color: #0E0F11;
						cursor: pointer;
						font-size: 20px;
						background: #DBA83F;
						border-radius: 25px;
						font-family:'Roboto-Regular';
					}
				}
			}
			//Check out 02弹窗  end
			// 第一次登录
			.first_bac{
				width: 100%;
				height: 100vh;
				background:#000000b3;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 100;
				.mark_Top_container{
					position: absolute;
					left: 557px;
					top: 185px;
					z-index: 999;
					width: 557px;
					padding: 126px 111px 103px 162px;
					background: #0E0F11;
					border-radius: 27px;
					overflow: hidden;
					display: flex;
					flex-flow: column;
					align-items: center;
					.mark_my_content{
						width: 100%;
						text-align: center;
						margin-bottom: 60px;
						.mark_text_one{
							color: #DBA83F;
							font-size: 24px;
							margin-bottom: 20px;
							font-family:'Quicksand-Bold';
						}
						.mark_text_two{
							color: #989898;
							font-size: 20px;
							font-family:'Roboto-Regular';
							span{
								color: #EDEDED;
								font-weight: bold;
							}
						}
					}
					.mark_my_foot{
						.mark_foot_button{
							display: flex;
							align-items: center;
							justify-content: center;
							width: 163px;
							height: 58px;
							color: #0E0F11;
							cursor: pointer;
							font-size: 20px;
							background: #DBA83F;
							border-radius: 25px;
							font-family:'Roboto-Regular';
						}
					}
				}
			}
			.content_right_nav {
				margin-top: 50px;

				p {
					display: inline-block;
					color: #898989;
					padding: 0 0 0 30px;
					font-size: 16px;
				}
				.border_av{
					font-size: 22px;
					padding: 0;
					margin-left: 10px;
					color: #BF9D62;
				}
				.border_none{
					font-size: 22px;
					padding: 0;
					margin-left: 10px;
					color: #A5A5A5;
				}
				.av {
					color: #BF9D62;
					font-family:'Quicksand-Bold';
				}
			}

			// 步骤内容
			.content_right_form {
				width: calc(100% - 60px);
				background: #0E0F11;
				border-radius: 50px;
				padding: 20px;

				.right_form_title {
					display: flex;
					justify-content: space-between;
					/* 横向中间自动空间 */
					flex-wrap: wrap;
					/* 换行 */
					width: 95%;
					margin: 0 2.5%;

					p {
						color: #fff;
						font-family:'Quicksand-Bold';
					}

					.left_block {
						display: flex;
						align-items: center;

						.do_it_later {
							display: flex;
							align-items: center;
							margin-right: 92px;
							cursor: pointer;
							p {
								color: #D3AA53;
								font-size: 20px;
								margin-left: 18px;
								font-family:'Quicksand-Bold';
							}
						}

						button {
							width: 120px;
							height: 50px;
							background: #D3AA53;
							border: none;
							color: #000;
							border-radius: 50px;
							font-size: 16px;
							float: right;
							font-family:'Roboto-Regular';
						}
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
						font-family:'Roboto-Regular';
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
						font-family:'Quicksand-Bold';
					}

					.form_inputs {
						.form_content {
							display: flex;
							justify-content: space-between;
							flex-wrap: wrap;
							font-family:'Roboto-Regular';
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
									border: 1px solid rgba(255,255,255,0.2);
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
									// text-align: center;
								}
								/deep/ .el-select-dropdown__item.hover{
									background-color: #1D2023;
								}
								/deep/ .el-select-dropdown__item.selected{
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
								.Phone_Number_Input{
									width: 105%;
									height: 55px;
									// border: 2px solid #2D2D2D;
									border-radius: 19px;
									position: relative;
									/deep/.country-selector__input{
										color: #fff;
										height: 55px;
										min-height:55px;
										border: 1px solid #2d2d2d;
										border-top-left-radius: 19px !important;
										border-bottom-left-radius: 19px !important;
										background-color:#0e0f11 !important;
									}
									/deep/.input-tel__input{
										color: #fff;
										height: 55px;
										min-height:55px;
										border: 1px solid #2d2d2d;
										border-top-right-radius: 19px !important;
										border-bottom-right-radius: 19px !important;
										background-color:#0e0f11 !important;
									}
									/deep/ .country-selector__list{
										background-color: #0E0F11 !important;
									}
									/deep/ .dots-text{
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
									border: 1px solid rgba(255,255,255,0.2);
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
									// text-align: center;
								}
								/deep/ .el-select-dropdown__item.hover{
									background-color: #1D2023;
								}
								/deep/ .el-select-dropdown__item.selected{
									background-color: #1D2023;
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

								.year_picker {
									width: 105%;
									font-size: 16px;

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
									/deep/ .el-input__inner {
										background-color: #0E0F11;
										color: #ffffff;
										height: 55px;
										border-radius: 19px;
										border: 1px solid #2D2D2D;
									}
								}
							}
						}

						.form_input3 {
							width: 100%;
							margin-top: 20px;
							display: inline-block;

							.inputs_img {}

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

			.content_step_two {
				.two_step_title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					background: #0E0F11;
					padding: 30px 40px;
					border-radius: 30px;
					margin-bottom: 30px;

					p {
						color: #fff;
						font-size: 18px;
						font-family:'Quicksand-Bold';
					}

					.left_block {
						display: flex;
						align-items: center;
						font-family:'Quicksand-Bold';
						.do_it_later {
							cursor: pointer;
							display: flex;
							align-items: center;
							margin-right: 92px;

							p {
								color: #D3AA53;
								font-size: 20px;
								margin-left: 18px;
							}
						}

						.confirm {
							width: 130px;
							height: 50px;
							background: #D3AA53;
							border: none;
							color: #000;
							border-radius: 50px;
							font-size: 16px;
							font-family:'Roboto-Regular';
						}

						.back {
							width: 130px;
							height: 50px;
							background: #0E0F11;
							border: 1px solid #ffffff;
							// border: none;
							color: #fff;
							border-radius: 50px;
							font-size: 16px;
							margin-left: 20px;
							font-family:'Roboto-Regular';
						}
					}
				}

				.content_top {
					width: 95%;
					height: 70px;
					background-color: #1D2023;
					border: 1px solid #0E0F11;
					border-top-left-radius: 30px;
					border-top-right-radius: 30px;
					overflow-x: scroll;
					display: flex;

					.top_block {
						width: 60%;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #0E0F11;
						border-top-right-radius: 30px;
						max-width: 200px;

						.top_block_img {
							width: 35px;
							height: 35px;
						}

						.top_block_name {
							color: #fff;
							font-size: 20px;
							font-weight: 500;
							margin-left: 20px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.top_block_name2 {
							color: #727272;
							font-size: 16px;
							font-weight: 500;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}

					.top_block2 {
						width: 60%;
						background-color: #1D2023;
						display: flex;
						align-items: center;
						justify-content: center;
						border-top-right-radius: 30px;
						border: 1px solid #0E0F11;
						border-left: none;
						max-width: 200px;

						.top_block_img {
							width: 35px;
							height: 35px;
						}

						.top_block_name {
							color: #fff;
							font-size: 20px;
							margin-left: 20px;
							font-weight: 500;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.top_block_name2 {
							color: #727272;
							font-size: 16px;
							font-weight: 500;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}

					.top_block3 {
						width: 16%;
						background-color: #1D2023;
						display: flex;
						align-items: center;
						justify-content: center;
						border-top-right-radius: 30px;
						border: 1px solid #0E0F11;
						border-left: none;
						max-width: 100px;
						min-width: 50px;

						.top_block_img {
							width: 20px;
						}

					}

				}

				::-webkit-scrollbar {
					width: 7px;
					height: 7px;
					background-color: #0E0F11;
				}

				/*定义滚动条轨道 内阴影+圆角*/
				::-webkit-scrollbar-track {
					box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
					-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
					border-radius: 10px;
					background-color: #0E0F11;
				}

				/*定义滑块 内阴影+圆角*/
				::-webkit-scrollbar-thumb {
					border-radius: 10px;
					box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
					-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
					background-color: #1D2023;
				}

				.content_right_container {
					// width: calc(100% - 60px);
					background: #0E0F11;
					border-radius: 50px;
					border-top-left-radius: 0;
					margin-bottom: 40px;
					padding: 20px;
					font-family:'Roboto-Regular';
					.content_right_form {
						.right_form_information {
							width: 95%;
							margin: 0 2.5%;

							.form_inputs {
								font-family:'Roboto-Regular';
								.form_user {
									width: 98%;
									margin-top: 20px;
									margin-right: 2%;

									.form_username {
										color: #727272;
										font-size: 15px;

										span {
											color: red;
										}
									}

									.inputs_block {
										width: 98%;
										height: 55px;
										display: flex;
										padding: 0 20px;
										align-items: center;
										border: 2px solid #2D2D2D;
										border-radius: 19px;
										color: #fff;
										justify-content: space-between;

										.inputs_img1 {
											color: #fff;
											background: inherit;
											font-size: 16px;
											display: flex;
											align-items: center;

											img {
												width: 40px;
												height: 40px;
												object-fit: cover;
											}

											p {
												color: #fff;
												margin-left: 20px;
											}
										}

										.user_name {
											/deep/ .el-input__inner {
												background-color: #0e0f11;
												border: none;
												color: #FFFFFF;
												font-size: 18px;
											}

											/deep/ .el-icon-arrow-up:before {
												content: "";
											}

											/deep/ .el-select .el-input .el-input__inner {
												border: 0px;
												width: 151px;
												height: 55px;
												color: #fff;
												background-color: #33384B;
												border: 0px solid #ffffff;
											}
										}
									}
								}

								.form_content {
									display: flex;
									justify-content: space-between;
									/* 横向中间自动空间 */
									flex-wrap: wrap;

									/* 换行 */
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

										//form_input_phone
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

										//form_input1_content
										.select_price {
											width: 108%;
											display: flex;
											border: 2px solid #2D2D2D;
											border-radius: 19px;
											align-items: center;
											margin-top: 10px;

											.input {
												width: 70%;
												height: 55px;
												border: none;
												border-radius: 19px;
												color: #fff;
												background: inherit;
												padding-left: 20px;
												font-size: 16px;
											}

											select {
												width: 20%;
												height: 55px;
												border: none;
												// border-radius: 19px;
												// padding-left: 70%;
												// padding-right: 10%;
												background-color: #0E0F11;
												color: #FFFFFF;
												font-size: 18px;
												/*取消默认箭头开始*/
												appearance: none;
												-moz-appearance: none;
												-webkit-appearance: none;
												/*取消默认箭头结束*/
											}

											.dropdown {
												width: 15px;
												height: 16px;
												position: relative;
												right: 50px;
											}
										}

										.select_type {
											width: 108%;
											display: flex;
											align-items: center;
											margin-top: 10px;

											select {
												width: 100%;
												height: 55px;
												border: 1px solid sandybrown;
												border-radius: 19px;
												padding-left: 20px;
												// padding-left: 70%;
												// padding-right: 10%;
												background-color: #0E0F11;
												color: #FFFFFF;
												font-size: 18px;
												/*取消默认箭头开始*/
												appearance: none;
												-moz-appearance: none;
												-webkit-appearance: none;
												/*取消默认箭头结束*/

											}

											.dropdown {
												width: 15px;
												height: 16px;
												position: relative;
												right: 50px;
											}
										}

									}

									//form_input1

									.form_input2 {
										width: 45%;
										margin-top: 20px;

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
									}
								}

								.form_margin {
									margin: 20px 0;
								}

								.form_input3 {
									width: 100%;
									display: inline-block;

									.inputs_img {}

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

								.foot_del {
									cursor: pointer;
									padding: 20px 20px 20px 20px;
									display: flex;
									align-items: center;

									.del_img {
										width: 22px;
										height: 22px;
									}

									.del_text {
										margin-left: 10px;
										color: red;
										font-size: 22px;
										font-weight: 500;
									}
								}
							}
						}
					}
				}
			}

			.content_step_three {
				// width: calc(100% - 60px);
				background: #0E0F11;
				border-radius: 50px;
				padding: 20px;

				.right_step_title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 95%;
					margin: 0 2.5%;
					padding-bottom: 25px;
					border-bottom: 1px solid #2D2D2D;

					p {
						color: #fff;
						font-size: 18px;
						font-family:'Quicksand-Bold';
					}

					.left_block {
						display: flex;
						align-items: center;
						font-family:'Quicksand-Bold';
						.do_it_later {
							cursor: pointer;
							display: flex;
							align-items: center;
							margin-right: 92px;

							p {
								color: #D3AA53;
								font-size: 20px;
								margin-left: 18px;
							}
						}

						.confirm {
							width: 130px;
							height: 50px;
							background: #D3AA53;
							border: none;
							color: #000;
							border-radius: 50px;
							font-size: 16px;
							font-family:'Roboto-Regular';
						}

						.back {
							width: 130px;
							height: 50px;
							background: #0E0F11;
							border: 1px solid #ffffff;
							// border: none;
							color: #fff;
							border-radius: 50px;
							font-size: 16px;
							margin-left: 20px;
							font-family:'Roboto-Regular';
						}
					}
				}

				.right_step_information {
					width: 95%;
					margin: 0 2.5%;
					margin-top: 30px;
					font-family:'Roboto-Regular';
					.step_threes {
						p {
							color: #727272;
							font-size: 16px;

						}

						input {
							width: 40%;
							height: 55px;
							border: 2px solid #2D2D2D;
							border-radius: 19px;
							color: #fff;
							background: inherit;
							padding-left: 20px;
							font-size: 16px;
						}

						.step_three1 {
							margin: 50px 0;
							.select {
								width: 43%;
								display: flex;
								align-items: center;
								/deep/ .el-select {
									width: 100%;
									font-size: 16px !important;
								}
								/deep/ .el-select .el-input .el-input__inner {
									width: 100%;
									height: 62px;
									color: #fff;
									border-radius: 19px;
									background-color: #0E0F11;
									border: 2px solid #2D2D2D;
									font-size: 16px !important;
								}
								
								/deep/ .el-select-dropdown {
									background-color: #0E0F11;
									border: 1px solid rgba(255,255,255,0.2);
									font-size: 16px !important;
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
								/deep/ .el-select-dropdown__item.hover{
									background-color: #1D2023;
								}
								/deep/ .el-select-dropdown__item.selected{
									background-color: #1D2023;
								}
							}

						}
						.step_three2 {
							margin: 50px 0;
						}

						.step_three3 {
							margin-top: 30px;
							padding-bottom: 50px;

							p {
								color: #727272;
								font-size: 16px;

							}

							.pic_img {
								width: 300px;
								display: flex;
								text-align: center;

								.front_view {
									margin-right: 20px;
									p {
										color: #FFF;
										font-size: 18px;
										font-family:'Roboto-Bold';
									}
									.img {
										width: 300px;
										height: 150px;
										overflow: hidden;
										border-radius: 20px;
										background-color: #000;
										display: flex;
										align-items: center;
										justify-content: center;
										.font_img{
											width: 25px;
											height: 25px;
										}
										.font_none{
											width: 300px;
											height: 150px;
											object-fit: fill;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
