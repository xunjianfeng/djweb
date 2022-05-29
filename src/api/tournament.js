import request from '@/utils/request'

// 赛事列表
export function tournamentList(params) {
    return request({
        url: '/tournament/list',
        method: 'POST',
        params
    })
}

// 用户端-赛事报名
export function tournamentSignup(params) {
    return request({
        url: '/tournament/signup',
        method: 'POST',
        params
    })
}

// 用户端-赛事详情
export function tournamentDetail(params) {
    return request({
        url: '/tournament/detail',
        method: 'POST',
        params
    })
}

// 用户端/管理端 - 赛事对阵信息
export function roundLog(params) {
    return request({
        url: '/tournament/round/log',
        method: 'POST',
        params
    })
}
// 管理端-游戏类型列表
export function gameCategoryList(params) {
    return request({
        url: '/game/category/list',
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