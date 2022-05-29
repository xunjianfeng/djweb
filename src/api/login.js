import request from '@/utils/request'

// 用户注册
export function userRegister(params) {
  return request({
    url: '/user/info/register',
    method: 'POST',
    params
  })
}
// 发送验证码
export function userVerification(params) {
  return request({
    url: '/user/send/verification',
    method: 'POST',
    params
  })
}

// 登陆
export function userLogin(params) {
  return request({
    url: '/login',
    method: 'POST',
    params
  })
}

//第三方登陆
export function thirdLogin(params) {
  return request({
    url: '/user/third/login',
    method: 'POST',
    params
  })
}

// 修改交易密码
export function updatePassword(params) {
  return request({
    url: '/user/transaction/password/update',
    method: 'POST',
    params
  })
}

// 修改登陆密码
export function updateUser_password(params) {
  return request({
    url: '/user/update/password',
    method: 'POST',
    params
  })
}

// 第三方登录
export function googleFacebookLogin(params) {
  return request({
    url: '/user/info/third/login',
    method: 'POST',
    params
  })
}