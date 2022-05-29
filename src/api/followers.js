import request from '@/utils/request'

//用户端 我关注的用户/关注我的用户
export function followList(params) {
  return request({
    url: '/user/follow/list',
    method: 'POST',
	params
  })
}

//用户端 取消关注
export function removeFollow(params) {
  return request({
    url: '/user/follow/remove',
    method: 'POST',
	params
  })
}

//用户端 取消关注
export function allAchievement(params) {
  return request({
    url: '/achievement/all',
    method: 'POST',
	params
  })
}

//用户端 取消关注
export function myAchievement(params) {
  return request({
    url: '/achievement/my',
    method: 'POST',
	params
  })
}
