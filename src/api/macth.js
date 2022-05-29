import request from '@/utils/request'

export function review(params) {
    return request({
        url: '/toutnament/review',
        method: 'POST',
        params
    })
}

// 创建赛事
export function tournamentAdd(data) {
    return request({
        url: '/tournament/add',
        method: 'POST',
        data
    })
}

// 赛事列表
export function tournamentList(params) {
    return request({
        url: '/tournament/list',
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

// 管理端/用户端-赛事详情
export function eventDetail(params) {
    return request({
        url: '/tournament/detail',
        method: 'POST',
        params
    })
}

// 管理端-赛事赞助商添加
export function sponsorAdd(params) {
    return request({
        url: '/tournament/sponsor/add',
        method: 'POST',
        params
    })
}

// 管理端-赛事赞助商删除
export function sponsorDel(params) {
    return request({
        url: '/tournament/sponsor/delete',
        method: 'POST',
        params
    })
}

// 管理端-赛事赞助商修改
export function sponsorUpdate(params) {
    return request({
        url: '/tournament/sponsor/update',
        method: 'POST',
        params
    })
}