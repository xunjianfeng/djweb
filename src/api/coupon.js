import request from '@/utils/request'
// 管理端-优惠券列表
export function listCoupon(params) {
  return request({
    url: '/coupon/list',
    method: 'POST',
    params
  })
}


// 用户端-可领取优惠券列表
export function couponList(params) {
  return request({
    url: '/coupon/list/user',
    method: 'POST',
    params
  })
}

// 优惠券-领取
export function couponReceive(params) {
  return request({
    url: '/coupon/receive',
    method: 'POST',
    params
  })
}

// 优惠券使用
export function couponApply(params) {
  return request({
    url: '/coupon/apply',
    method: 'POST',
    params
  })
}

// 我的优惠券
export function couponMy(params) {
  return request({
    url: '/coupon/my',
    method: 'POST',
    params
  })
}