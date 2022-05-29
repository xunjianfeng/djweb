import request from '@/utils/request'

//用户详情信息
export function userInfo(params) {
  return request({
    url: '/user/info/detail',
    method: 'POST',
	params
	// params:{
	// 	userId:sessionStorage.getItem("userId")
	// }
  })
}

// 获取用户游戏配置
export function userProfile(params) {
  return request({
    url: '/game/profile/user',
    method: 'POST',
    params
  })
}

// 修改登陆密码
export function updatePassword(params) {
  return request({
    url: '/user/update/password',
    method: 'POST',
    params
  })
}

// 获取用户游戏配置
export function updateTransaction(params) {
  return request({
    url: '/user/transaction/password/update',
    method: 'POST',
    params
  })
}

//用户提交认证信息
export function userIdentification(params) {
  return request({
    url: '/identification/save',
    method: 'POST',
	params
  })
}

//修改用户信息
export function updateInfo(params) {
  return request({
    url: '/user/info/update',
    method: 'POST',
	params
  })
}

//忘记密码发送邮箱
export function sendEmail(params) {
  return request({
    url: '/user/info/forget/password',
    method: 'POST',
	params
  })
}

//忘记密码修改密码
export function changePassword(params) {
  return request({
    url: '/user/info/forget/update',
    method: 'POST',
	params
  })
}

// 用户端 获取战队成员
export function teamUsers(params) {
  return request({
    url: '/team/users',
    method: 'POST',
    params
  })
}

// 用户端 银行账号-用户列表
export function bankAccount(params) {
  return request({
    url: '/user/bank/account/account',
    method: 'POST',
    params
  })
}

// 用户端 银行账号-添加
export function account_add(params) {
  return request({
    url: '/user/bank/account/add',
    method: 'POST',
    params
  })
}

// 用户端 积分交易明细
export function pointDetail(params) {
  return request({
    url: '/points/transaction/list/user',
    method: 'POST',
    params
  })
}

// 用户端 Coin交易明细
export function coinDetail(params) {
  return request({
    url: '/coin/transaction/list/user',
    method: 'POST',
    params
  })
}

// 问题报告
export function addReport(params) {
  return request({
    url: '/report/add',
    method: 'POST',
    params
  })
}

// 用户端-获取订阅套餐
export function subscribeList(params) {
  return request({
    url: '/user/info/subscribe/list',
    method: 'POST',
    params
  })
}
// 用户订阅会员
export function subscribeUser(params) {
  return request({
    url: '/user/info/subscribe',
    method: 'POST',
    params
  })
}

//获取支付订单
export function paymentOrderList(params) {
  return request({
    url: '/payment/order/list',
    method: 'POST',
    params
  })
}

export function getUserReferral(params) {
  return request({
    url: '/referral/log/user',
    method: 'POST',
    params
  })
}
