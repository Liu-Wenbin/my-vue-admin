import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

class AxiosRequest {
  baseURL
  instance

  constructor (baseURL) {
    this.baseURL = baseURL
    this._init()
  }

  _init () {
    this.instance = axios.create(this.getDefaultConfig())
    this.initiInterceptors()
  }

  /**
   * 用于获取默认配置
   */
  getDefaultConfig () {
    const config = {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      }
    }

    return config
  }

  /**
   * 核心api，用于发送请求
   */
  request (options) {
    return this.instance(options)
  }

  initiInterceptors () {
    // 请求拦截
    const reqFn = config => {
      config.headers.Authorization = store.state.login.token
      
      return config
    }
    const reqErrorFn = err => {
      return Promise.reject(err)
    }
    this.instance.interceptors.request.use(reqFn, reqErrorFn)

    // 响应拦截
    const resFn = ({ data, status }) => {
      return data
    }
    const resErrorFn = err => {
      Vue.prototype.$message.warning('服务器开了小差，过会儿再来试试吧~')
      return Promise.reject(err)
    }
    this.instance.interceptors.response.use(resFn, resErrorFn)
  }
}

const baseURL =
  process.env.NODE_ENV === 'development'
    ? `${ $_netConfig.devRequestURL.baseURL }/${ $_netConfig.devRequestURL.module }`
    : `${ $_netConfig.proRequestURL.baseURL }/${ $_netConfig.proRequestURL.module }`

export default new AxiosRequest(baseURL)
