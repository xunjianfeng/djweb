import request from '@/utils/request'

//用户端-用户参与的赛事
export function TournamentUist(params) {
  return request({
    url: '/tournament/user/list',
    method: 'POST',
	params
  })
}

//用户端签到
export function TournamentCheckIn(params) {
  return request({
    url: '/tournament/checkin',
    method: 'POST',
	params
  })
}

//修改参赛人员
export function TournamentUpdateTeam(params) {
  return request({
    url: '/tournament/update/team',
    method: 'POST',
	params
  })
}