import request from '@/utils/request'

//前端&后端-分页查询竞猜列表
export function predictListPage(params) {
    return request({
        url: '/predict/list-by-page',
        method: 'get',
        params
    })
}

//前端&后端-获取竞猜战队列表
export function predictTeams(params) {
    return request({
        url: '/predict/get-teams',
        method: 'get',
        params
    })
}

//前端&后端-获取竞猜参与者列表
export function predictRegistrations(params) {
    return request({
        url: '/predict/get-registrations',
        method: 'get',
        params
    })
}

//前端-竞猜下注
export function predictRegistry(params) {
    return request({
        url: '/predict/registry',
        method: 'post',
        params
    })
}

// 前端-获取竞猜结果
export function predictResult(params) {
    return request({
        url: '/predict/get-result',
        method: 'GET',
        params
    })
}