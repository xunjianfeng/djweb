import request from '@/utils/request'

// 用户端/主持端-广告列表
export function getAdvertisement(params) {
  return request({
    url: '/advertisement/list/user',
    method: 'POST',
    params
  })
}