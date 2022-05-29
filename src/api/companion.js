import request from '@/utils/request'

// 获取陪玩评论
export function reviewList(params) {
  return request({
    url: '/companion/review/list',
    method: 'POST',
    params
  })
}

// 获取陪玩列表
export function companionList(params) {
  return request({
    url: '/companion/user/list',
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

// 用户端/管理端-陪玩详细信息
export function companionDetail(params) {
  return request({
    url: '/companion/detail',
    method: 'POST',
    params
  })
}


// 用户端-陪玩订单
export function companionOrder(params) {
  return request({
    url: '/companion/order/list/user',
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


// 用户端-关注用户
export function followAdd(params) {
    return request({
        url: '/user/follow/add',
        method: 'POST',
        params
    })
}

// 用户端-关注用户
export function followRemove(params) {
    return request({
        url: '/user/follow/remove',
        method: 'POST',
        params
    })
}