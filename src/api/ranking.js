import request from '@/utils/request'

// 竞猜榜
export function rankRapid() {
  return request({
    url: '/rank/rapid',
    method: 'POST'
  })
}

// 赛事榜
export function rankTournament() {
  return request({
    url: '/rank/tournament',
    method: 'POST'
  })
}