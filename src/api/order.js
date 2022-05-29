import request from '@/utils/request'

// 用户端-用户申请陪玩
export function companionApply(params) {
  return request({
    url: '/companion/apply',
    method: 'POST',
    params
  })
}

// 管理端/用户端-游戏列表
export function gameList(params) {
    return request({
      url: '/game/list',
      method: 'POST',
      params
    })
}

// 用户端-完善陪玩信息
export function companionUpdate(data) {
    return request({
      url: '/companion/update',
      method: 'POST',
      data
    })
}

// 用户端/管理端-陪玩详细信息
export function companionDetail(params) {
    return request({
        url: '/companion/detail',
        method: 'POST',
        params
    })
}

// 用户端-陪玩订单
export function companionOrderList(params) {
    return request({
        url: '/companion/order/list/user',
        method: 'POST',
        params
    })
}

// 用户端-陪玩订单统计
export function companionStatistics(params) {
    return request({
        url: '/companion/statistics',
        method: 'POST',
        params
    })
}

// 用户端-同意拒绝订单
export function companionAgree(params) {
    return request({
        url: '/companion/order/agree',
        method: 'POST',
        params
    })
}

// 用户端-完成订单
export function companionComplete(params) {
    return request({
        url: '/companion/order/complete',
        method: 'POST',
        params
    })
}

// 用户端-下陪玩订单
export function companionBuy(params) {
    return request({
        url: '/companion/buy',
        method: 'POST',
        params
    })
}

// 用户端-评论陪玩订单
export function companionReview(params) {
    return request({
        url: '/companion/order/review',
        method: 'POST',
        params
    })
}

// 用户端-订单列表
export function commodityUserList(params) {
    return request({
        url: '/commodity/order/user/list',
        method: 'POST',
        params
    })
}

// 商城-完成订单
export function orderComplete(params) {
    return request({
        url: '/commodity/order/completed',
        method: 'POST',
        params
    })
}