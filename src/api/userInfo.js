import request from '@/utils/request'

// 用户好友
export function getUserInfo() {
    return request({
        url: '/user/info/mark',
        method: 'POST'
    })
}