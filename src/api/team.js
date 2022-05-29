import request from '@/utils/request'

// 添加战队
export function addTeam(params) {
  return request({
    url: '/team/add',
    method: 'POST',
    params
  })
}

// 战队列表
export function userList(params) {
  return request({
    url: '/team/user/list',
    method: 'POST',
    params
  })
}

// 邀请用户加入战队
export function teamInvite(params) {
  return request({
    url: '/team/invite',
    method: 'POST',
    params
  })
}

// 搜索用户
export function userSearch(params) {
  return request({
    url: '/team/user/search',
    method: 'POST',
    params
  })
}


// 申请加入战队
export function teamJoin(params) {
  return request({
    url: '/team/join',
    method: 'POST',
    params
  })
}

// 获取战队成员
export function teamUsers(params) {
  return request({
    url: '/team/users',
    method: 'POST',
    params
  })
}

// 申请加入战队的人员
export function teamApplications(params) {
  return request({
    url: '/team/applications',
    method: 'POST',
    params
  })
}

// 同意/拒绝 加入队伍
export function teamDecision(params) {
  return request({
    url: '/team/decision',
    method: 'POST',
    params
  })
}

// 移出战队
export function teamOut(params) {
  return request({
    url: '/team/move/out',
    method: 'POST',
    params
  })
}

//获取战队参与的赛事记录
export function teamTournament(params) {
  return request({
    url: '/team/tournaments',
    method: 'POST',
    params
  })
}

//战队详细信息
export function teamAchievement(params) {
  return request({
    url: '/team/achievement',
    method: 'POST',
    params
  })
}

// 游戏列表
export function gameList(params) {
  return request({
    url: '/game/list',
    method: 'POST',
    params
  })
}

// 获取用户游戏配置
export function profileUser(params) {
    return request({
        url: '/game/profile/user',
        method: 'POST',
        params
    })
}

// 用户端-移交战队
export function teamTransfer(params) {
    return request({
        url: '/team/transfer',
        method: 'POST',
        params
    })
}