import request from '@/utils/request'

//用户端-充值
export function reCharge(params) {
    return request({
        url: '/recharge/order/add',
        method: 'POST',
        params
    })
}

//用户端-套餐列表
export function packageList(data) {
    return request({
        url: '/package/coin/list',
        method: 'POST',
        data
    })
}

//用户端-商品列表
export function commondityList(params) {
    return request({
        url: '/commodity/user/list',
        method: 'POST',
        params
    })
}


//用户端-商品详情
export function CommodityDetail(params) {
    return request({
        url: '/commodity/detail',
        method: 'POST',
        params
    })
}

//用户端-购买商品
export function CommodityBuy(data) {
    return request({
        url: '/commodity/order/buy',
        method: 'POST',
        data
    })
}

//用户端-优惠券使用
export function CouponApply(data) {
    return request({
        url: '/coupon/apply',
        method: 'POST',
        data
    })
}

//用户端-我的优惠券
export function CouponMy(params) {
    return request({
        url: '/coupon/my',
        method: 'POST',
        params
    })
}

//用户端-用户任务列表
export function taskList(params) {
    return request({
        url: '/task/user/list',
        method: 'POST',
        params
    })
}

//用户端-领取任务奖励
export function taskReceive(params) {
    return request({
        url: '/task/receive',
        method: 'POST',
        params
    })
}

export function commodityCategoryList(params){
	return request({
		url:'/commodity/category/list',
		method:'POST',
		params
	})
}

//用户端-充值
export function rechargeOrderAdd(params){
	return request({
		url:'/recharge/order/add',
		method:'POST',
		params
	})
}