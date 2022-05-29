import axios from 'axios'
// import { getToken } from '@/utils/auth'
import {
    Message
} from 'element-ui'
// const BASE_URL = 'http://8002.frp.wanghuiwen.com/' //接口路径   测试环境
// const BASE_URL = 'http://n1-03.qjun.com.cn:17780' //接口路径   生产环境、、
// todo
    const BASE_URL = 'http://13.212.212.253/game/api/' //接口路径   生产环境、测试服
	// const BASE_URL = 'https://api.bountee.com.my/api/' //接口路径   正式环境、正式服
    // 创建axios
const service = axios.create({
        baseURL: BASE_URL,
        timeout: 20000, // request timeout
        headers: {
            "content-type": "application/json"
        }
    })
    // Oauth目录除了logout方法其他都不需要传token
service.interceptors.request.use(
    config => {
        if (sessionStorage.getItem("token")) {
            config.headers['Authorization'] = "Bearer " + sessionStorage.getItem("token");
            // config.headers['operator-admin-id'] = localStorage.getItem("operator_admin_id")||localStorage.getItem("operator_id");
            // config.headers['admin_id'] = localStorage.getItem("admin_id")
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// axios 数据返回
service.interceptors.response.use(
    // 接口请求成功
    response => {
        const res = response.data,
            {
                code,
                message,
                data
            } = res
        if (code == 200 || message == '余额不足' || message=='Insufficient balance') {
            return res
        } else {
            Message({
                message: message,
                type: 'error'
            })
            return Promise.reject(new Error(message || 'Error'))
        }
    },

    // 网络请求失败
    error => {
        console.log(error.response)
        console.log(error.response.data.message)
        if (error.response.data.message == '请先认证') {
            console.log('进来了')
            Message({
                message: error.response.data.message,
                type: 'error',
                duration: 5 * 1000
            })
            location.href = "#/center/personal"
        } else {
            Message({
                message: error.response.data.message,
                type: 'error',
                duration: 5 * 1000
            })
        }
        return Promise.reject(error)
    }
)

export default service
