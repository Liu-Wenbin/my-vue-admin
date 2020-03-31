import axios from '@s/axios'

export default {
	// 登录请求
	commitLogin (params) {
		return axios.request({
			url: 'login',
			method: 'get',
			params
		})
	},
}