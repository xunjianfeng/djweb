import request from '@/utils/request'


//用户端 好友申请列表
export function applyList(params) {
  return request({
    url: '/user/friend/apply/list',
    method: 'POST',
	params
  })
}

//用户端 申请好友
export function addFriend(params) {
  return request({
    url: '/user/friend/add',
    method: 'POST',
	params
  })
}

//用户端 同意或拒绝添加
export function agreeFriend(params) {
  return request({
    url: '/user/friend/agree',
    method: 'POST',
	params
  })
}

//用户端 添加好友搜索用户
export function searchUser(params) {
  return request({
    url: '/user/friend/user/search',
    method: 'POST',
	params
  })
}

//用户端 删除好友
export function friendRemove(params) {
  return request({
    url: '/user/friend/remove',
    method: 'POST',
	params
  })
}
