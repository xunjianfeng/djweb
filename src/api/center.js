import request from '@/utils/request'

// 用户好友
export function friendList(params) {
    return request({
        url: '/user/friend/list',
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

// 获取用户游戏配置
export function profileSave(params) {
    return request({
        url: '/game/profile/save',
        method: 'POST',
        params
    })
}

// 删除游戏配置
export function profileDelete(params) {
    return request({
        url: '/game/profile/delete',
        method: 'POST',
        params
    })
}

//  游戏列表
export function gamdList(params) {
    return request({
        url: '/game/list',
        method: 'POST',
        params
    })
}

//  获取全部国家
export function countriesAll(params) {
    return request({
        url: '/countries/all',
        method: 'POST',
        params
    })
}

//  根据国家获取省会
export function countriesStates(params) {
    return request({
        url: '/countries/states',
        method: 'POST',
        params
    })
}

// FQA列表
export function faqList(params) {
    return request({
        url: '/fqa/list',
        method: 'POST',
        params
    })
}

// FQA分类列表
export function faqCategoryList(params) {
    return request({
        url: '/fqa/category/list',
        method: 'POST',
        params
    })
}

// 上传图片
export function imgUpload(data) {
    return request({
        url: 'img/upload',
        method: 'POST',
        data
    })
}