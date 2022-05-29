import request from '@/utils/request'

//联赛-获取联赛资讯
export function leagueInfo(params) {
    return request({
        url: '/league/info',
        method: 'GET',
        params
    })
}

//前端-分页查询战队战绩
export function leagueStanding(params) {
    return request({
        url: '/league/match/find-team-standing-page',
        method: 'GET',
        params
    })
}

//前端-查询联赛列表
export function leagueList(params) {
    return request({
        url: '/league/list',
        method: 'GET',
        params
    })
}

// 前端&后端-获取联赛战队列表
export function teamFindList(params) {
  return request({
    url: '/league/team/find-by-page',
    method: 'GET',
    params
  })
}

// 前端-分页查询比赛日和对局及结果
export function findMatchDay(params) {
  return request({
    url: '/league/match/find-match-day-page',
    method: 'GET',
    params
  })
}

// 前端&后端-分页查询队员转会记录
export function showTransfer(params) {
  return request({
    url: '/league/team/transfer-record-page',
    method: 'GET',
    params
  })
}

// 后端-分页查询对局
export function findFixture(params) {
  return request({
    url: '/league/match/find-fixture-page',
    method: 'GET',
    params
  })
}

//前端&后端-获取轮播海报
export function leagueCarouselList(params) {
    return request({
        url: '/league/list-carousels',
        method: 'GET',
        params
    })
}

// 前端&后端-精彩瞬间列表
export function HighlightList(params) {
  return request({
    url: '/league/highlight/find-page',
    method: 'GET',
    params
  })
}

// 快打

// 前端-获取主持人教程视频
export function getVideo(params) {
  return request({
    url: '/rapid-challenge/host/get-tutorial-video',
    method: 'GET',
    params
  })
}

//前端&后端-获取主持人问题
export function getQuestions(params) {
  return request({
    url: '/rapid-challenge/host/get-questions',
    method: 'GET',
    params
  })
}

// 前端-主持人创建房间
export function createRoom(data) {
  return request({
    url: '/rapid-challenge/create-room',
    method: 'POST',
    data
  })
}

// 前端-主持人答题
export function hostAnswers(data) {
  return request({
    url: '/rapid-challenge/host/test',
    method: 'POST',
    data
  })
}

// 前端-分页查询主持人
export function hostList(params) {
  return request({
    url: '/rapid-challenge/host/list-host-by-page',
    method: 'GET',
    params
  })
}

// 前端-分页查询主持过的比赛
export function hostChallengeList(params) {
  return request({
    url: '/rapid-challenge/host/list-challenge-by-page',
    method: 'GET',
    params
  })
}

// 前端-分页查询匹配中的房间
export function hostRoomList(params) {
  return request({
    url: '/rapid-challenge/list-room-by-page',
    method: 'GET',
    params
  })
}

// 前端-分页查询参与过的比赛
export function joinGameList(params) {
  return request({
    url: '/rapid-challenge/list-game-by-page',
    method: 'GET',
    params
  })
}

// 前端-开始游戏
export function startGame(params) {
  return request({
    url: '/rapid-challenge/start-game',
    method: 'POST',
    params
  })
}

// 前端-确认比赛结果并给主持人打分
export function confirmGameResult(params) {
  return request({
    url: '/rapid-challenge/confirm-game-result',
    method: 'POST',
    params
  })
}

// 前端-获取主持人可用的房费列表
export function hostRoomFee(params) {
  return request({
    url: '/rapid-challenge/host/get-available-room-fees',
    method: 'GET',
    params
  })
}

// 前端-获取主持人概况
export function getHostOverview(params) {
  return request({
    url: '/rapid-challenge/host/get-overview',
    method: 'GET',
    params
  })
}

// 前端-获取主持人等级规则
export function getLevelRules(params) {
  return request({
    url: '/rapid-challenge/host/get-level-rules',
    method: 'GET',
    params
  })
}

// 前端-获取所有房费列表
export function getAllRoomFee(params) {
  return request({
    url: '/rapid-challenge/get-all-room-fees',
    method: 'GET',
    params
  })
}

// 前端-获取比赛结果
export function getGameResult(params) {
  return request({
    url: '/rapid-challenge/get-game-result',
    method: 'GET',
    params
  })
}

// 前端-结束游戏并上传成绩
export function completeGame(data) {
  return request({
    url: '/rapid-challenge/complete-game',
    method: 'POST',
    data
  })
}

// 前端&后端-获取Top玩家
export function getTopPlayers(params) {
  return request({
    url: '/league/get-top-players',
    method: 'GET',
    params
  })
}