import request from '@/utils/request'
// 主持人申请
export function infoSave(data) {
    return request({
        url: '/manage/info/save',
        method: 'POST',
        data
    })
}

// 管理端/用户端-主持人详细信息
export function infoDetail(params) {
    return request({
        url: '/manage/info/detail',
        method: 'POST',
        params
    })
}

// 用户端-用户提交认证信息
export function identificationSave(params) {
    return request({
        url: '/identification/save',
        method: 'POST',
        params
    })
}