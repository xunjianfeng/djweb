import request from '@/utils/request'

// 用户端-用户消息
export function userMsgList(params) {
  return request({
    url: '/message/user/list',
    method: 'POST',
    params
  })
}

// 用户端-删除/收藏/阅读消息
export function userMsgUpdate(params) {
  return request({
    url: '/message/user/update',
    method: 'POST',
    params
  })
}

