import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
// import HomeRouter from './router/home'
import less from 'less'
import ElementUI from 'element-ui';

import locale from 'element-ui/lib/locale/lang/en' 	//英文

import 'element-ui/lib/theme-chalk/index.css';

import FBSignInButton from 'vue-facebook-signin-button';
import GSignInButton from 'vue-google-signin-button';
import Clipboard from 'clipboard';

import page_number from "@/api/global.js"	//引入全局变量

import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

import './assets/index.css'

Vue.component('vue-phone-number-input', VuePhoneNumberInput);

Vue.use(FBSignInButton);
Vue.use(GSignInButton);
Vue.use(ElementUI,{locale});
// Vue.use(enLocale)//使用英文
Vue.use(less)

Vue.prototype.PageNumber = page_number //设置成全局变量，让每个组件都可以使用该全局变量


Vue.prototype.Clipboard = Clipboard;
// Vue.prototype.HOST = 'http://8002.frp.wanghuiwen.com/'
Vue.prototype.HOST = 'https://api.bountee.com.my/api/' //正式服
// todo
// Vue.prototype.HOST = 'http://13.212.212.253/game/api/' //测试服
Vue.prototype.initDete = function(date) {
	// var timestamp4 = new Date(date); //直接用 new Date(时间戳) 格式转化获得当前时间
	// return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)
	// toLocaleDateString方法在不同的浏览器中有可能结果不同，可进行如下操作：
	   var now = new Date(date),
	　　y = now.getFullYear(),
	　　m = now.getMonth() + 1,
	　　d = now.getDate();
	　　return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}
Vue.prototype.initDetes = function(date) {
    // var time1 = new Date(date).getTime() / 1000
	// getTime()/1000返回的是1970年的时间
	var date1 = new Date(date);
	let time1 = date1.getTime()
    return time1
}

Vue.prototype.initDate = function(date) {
	var date = new Date(date);
	var YY = date.getFullYear() + '-';
	var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
	var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	// return YY + MM + DD + " " + hh + mm + ss;
	return YY + MM + DD;
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.config.productionTip = false
Vue.use(VueRouter)
export default function createApp() {
    const router = new VueRouter({
            mode: 'hash',
            routes: [{
                    path: '/',
                    component: () =>
                        import ('./views/home/home.vue'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/login/index',
                    component: () =>
                        import ('./views/login/index.vue'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/center/companion',
                    component: () =>
                        import ('./views/center/companion.vue'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/center/update_data',
                    component: () =>
                        import ('./views/center/update_data.vue'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/corner/corner_operate',
                    component: () =>
                        import ('./views/corner/corner_operate.vue'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/order/wallet',
                    component: () =>
                        import ('./views/order/wallet'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/order/host',
                    component: () =>
                        import ('./views/order/host'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/order/apply',
                    component: () =>
                        import ('./views/order/apply'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tournament/filter_game',
                    component: () =>
                        import ('./views/tournament/filter_game'),
                    meta: {
                        ssr: true
                    }
                },
				{
				    path: '/tournament/bracketm',
				    component: () =>
				        import ('./views/tournament/bracketm'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/tournament/participantm',
				    component: () =>
				        import ('./views/tournament/participantm'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/tournament/standingsm',
				    component: () =>
				        import ('./views/tournament/standingsm'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/tournament/Informationsm',
				    component: () =>
				        import ('./views/tournament/Informationsm'),
				    meta: {
				        ssr: true
				    }
				},
                {
                    path: '/corner/support',
                    component: () =>
                        import ('./views/corner/support.vue'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/order/edit_info',
                    component: () =>
                        import ('./views/order/edit_info'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/security/index',
                    component: () =>
                        import ('./views/security/index'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/security/replace_password',
                    component: () =>
                        import ('./views/security/replace_password'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/security/replace_passwordTwo',
                    component: () =>
                        import ('./views/security/replace_passwordTwo'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/security/forget_password',
                    component: () =>
                        import ('./views/security/forget_password'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/order/apply_success_02',
                    component: () =>
                        import ('./views/order/apply_success_02'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/companion/index',
                    component: () =>
                        import ('./views/companion/index'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/companion/description',
                    component: () =>
                        import ('./views/companion/description'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/order/my_order',
                    component: () =>
                        import ('./views/order/my_order'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/membership/membership_plans',
                    component: () =>
                        import ('@/views/membership/membership_plans'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/membership/current_plan',
                    component: () =>
                        import ('@/views/membership/current_plan'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/friend_list/my_friend',
                    component: () =>
                        import ('@/views/friend_list/my_friend'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/friend_list/view_profile',
                    component: () =>
                        import ('@/views/friend_list/view_profile'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/redemption/top_up',
                    component: () =>
                        import ('./views/redemption/top_up'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/redemption/my_cart',
                    component: () =>
                        import ('./views/redemption/my_cart'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/friend_list/to_comfirm',
                    component: () =>
                        import ('@/views/friend_list/to_comfirm'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/followers/following',
                    component: () =>
                        import ('@/views/followers/following'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/friend_list/view_profile_two',
                    component: () =>
                        import ('@/views/friend_list/view_profile_two'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tearm/create_team',
                    component: () =>
                        import ('@/views/tearm/create_team'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tearm/my_join_team',
                    component: () =>
                        import ('@/views/tearm/my_join_team'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tearm/team_about',
                    component: () =>
                        import ('@/views/tearm/team_about'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tearm/application_list',
                    component: () =>
                        import ('@/views/tearm/application_list'),
                    meta: {
                        ssr: true
                    },
                },
                {
                    path: '/followers/my_followers',
                    component: () =>
                        import ('@/views/followers/my_followers'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/followers/search',
                    component: () =>
                        import ('@/views/followers/search'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/followers/my_redemption',
                    component: () =>
                        import ('@/views/followers/my_redemption'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/order/setting',
                    component: () =>
                        import ('@/views/order/setting'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/referral/index',
                    component: () =>
                        import ('@/views/referral/index'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tournament/regis_Information',
                    component: () =>
                        import ('./views/tournament/regis_Information'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tournament/registration',
                    component: () =>
                        import ('./views/tournament/registration'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/redemption/task',
                    component: () =>
                        import ('@/views/redemption/task'),

                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/mailbox/index',
                    component: () =>
                        import ('@/views/mailbox/index'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/mailbox/info',
                    component: () =>
                        import ('@/views/mailbox/info'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/mailbox/companion_info',
                    component: () =>
                        import ('@/views/mailbox/companion_info'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tearm/member_invite',
                    component: () =>
                        import ('@/views/tearm/member_invite'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tearm/application_userinfo',
                    component: () =>
                        import ('@/views/tearm/application_userinfo'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/redemption/redemption',
                    component: () =>
                        import ('@/views/redemption/redemption'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/redemption/item_detail',
                    component: () =>
                        import ('@/views/redemption/item_detail'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/friend_list/search_send',
                    component: () =>
                        import ('@/views/friend_list/search_send'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/friend_list/sendFriend_view',
                    component: () =>
                        import ('@/views/friend_list/sendFriend_view'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tearm/tour_upcoming',
                    component: () =>
                        import ('@/views/tearm/tour_upcoming'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tearm/team_announcement',
                    component: () =>
                        import ('@/views/tearm/team_announcement'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tearm/team_setting',
                    component: () =>
                        import ('@/views/tearm/team_setting'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tearm/team_info',
                    component: () =>
                        import ('@/views/tearm/team_info'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/tearm/create_team_04',
                    component: () =>
                        import ('@/views/tearm/create_team_04'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/order/add_newAccount',
                    component: () =>
                        import ('@/views/order/add_newAccount'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/achievement/achievement',
                    component: () =>
                        import ('@/views/achievement/achievement'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/achievement/achieved',
                    component: () =>
                        import ('@/views/achievement/achieved'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/achievement/no_achieved',
                    component: () =>
                        import ('@/views/achievement/no_achieved'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/center/personal',
                    component: () =>
                        import ('@/views/center/personal'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/center/profile',
                    component: () =>
                        import ('@/views/center/profile'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/center/game',
                    component: () =>
                        import ('@/views/center/game'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/center/step_03',
                    component: () =>
                        import ('@/views/center/step_03'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/played/tounament',
                    component: () =>
                        import ('@/views/played/tounament'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/played/league',
                    component: () =>
                        import ('@/views/played/league'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/played/rapic_challenge',
                    component: () =>
                        import ('@/views/played/rapic_challenge'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/played/predict_win',
                    component: () =>
                        import ('@/views/played/predict_win'),
                    meta: {
                        ssr: true
                    }
                },
                {
                    path: '/membership/current_plan_one',
                    component: () =>
                        import ('@/views/membership/current_plan_one'),
                    meta: {
                        ssr: true
                    }
                },
				{
				    path: '/league/predict_and_win',
				    component: () =>
				        import ('@/views/league/predict_and_win'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/league/standing',
				    component: () =>
				        import ('@/views/league/standing'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/league/results',
				    component: () =>
				        import ('@/views/league/results'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/league/transfer',
				    component: () =>
				        import ('@/views/league/transfer'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/league/info',
				    component: () =>
				        import ('@/views/league/info'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/league/top_players',
				    component: () =>
				        import ('@/views/league/top_players'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/league/league',
				    component: () =>
				        import ('@/views/league/league'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/league/teams',
				    component: () =>
				        import ('@/views/league/teams'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/league/highlights',
				    component: () =>
				        import ('@/views/league/highlights'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/league/fixtures',
				    component: () =>
				        import ('@/views/league/fixtures'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/league/rapid_challenge',
				    component: () =>
				        import ('@/views/league/rapid_challenge'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/tearm/reque_info',
				    component: () =>
				        import ('@/views/tearm/reque_info'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/order/host_apply',
				    component: () =>
				        import ('@/views/order/host_apply'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/order/host_level',
				    component: () =>
				        import ('@/views/order/host_level'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/league/game_item',
				    component: () =>
				        import ('@/views/league/game_item'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/league/room_item',
				    component: () =>
				        import ('@/views/league/room_item'),
				    meta: {
				        ssr: true
				    }
				},
				{
				    path: '/cropperImg/index',
				    component: () =>
				        import ('@/components/CropperImg/index'),
				    meta: {
				        ssr: true
				    }
				},
                {
                    path: '/ranking/index',
                    component: () =>
                        import ('./views/ranking/index'),
                    meta: {
                        ssr: true
                    }
                },


                // HomeRouter,
            ],
        })
        // 2. Create the root component option
    const app = {
        router,
        // This is necessary, it is for vue-meta
        head: {},
        render: h => h(App)
    }

    // 3. return
    return app
}
