// 用来放公共接口
import axios from '@s/axios'

export default {
  // 根据权限获取路由列表
  getRouteList (data) {
    return axios.request({
      url: 'route/getList',
      method: 'post',
      data
    })
  },
}