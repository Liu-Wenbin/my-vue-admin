import pinyin from 'pinyin2'

const _toString = Object.prototype.toString

export class Tool {
  static setStorage (obj) {
		for (let key in obj) {
			localStorage.setItem(key, obj[key])
		}
	}

	static getStorage (key) {
		return localStorage.getItem(key)
	}

  /**
   * 判断一个对象是否是空对象
   * @param  {[type]}  obj [需要判断的对象]
   * @return {Boolean}     [是空对象返回true]
   */
  static isEmptyObject(obj) {
    return !Object.keys(obj).length
  }

  /**
   * 判断一个值是否是非0假值（通常用于接口中status的判断）
   * @return {Boolean} [如果是非0假值则为true]
   */
  static isNoZeroFalsity(val) {
    return val === undefined ||
      val === null ||
      val === '' ||
      val === false ||
      Number.isNaN(val)
  }

  /**
   * 从树中过滤出第一个符合条件的节点
   * @param  {[type]} tree     [树]
   * @param  {[type]} filterFn [过滤函数]
   * @param  {[type]} childKey [子节点字段名]
   * @return {[type]}          [找到符合条件的第一个节点]
   */
  static filterFirstTreeNode(tree, filterFn, childKey) {
    return (function _f(tree, filterFn, childKey = 'children') {
      let data

      for (const item of tree) {
        if (filterFn(item)) {
          data = item
        } else if (item[childKey] && item[childKey].length) {
          data = _f(item[childKey], filterFn, childKey)
        }

        if (data) {
          break
        }
      }

      return data
    })(tree, filterFn, childKey)
  }

  /**
   * 过滤出一个树下符合条件的节点
   * @param  {[type]} tree     [树]
   * @param  {[type]} handleFn [过滤函数]
   * @param  {String} children [子节点字段名]
   * @return {[type]}          [过滤出的节点集合]
   */
  static filterTreeNode(tree, handleFn, childKey) {
    return (function _f(tree, handleFn, childKey = 'children') {
      const dep = []
      tree.forEach(item => {
        if (handleFn(item)) {
          dep.push(item)
        }

        if (item[childKey] && item[childKey].length) {
          dep.push(..._f(item[childKey], handleFn, childKey))
        }
      })

      return dep
    })(tree, handleFn, childKey)
  }

  /**
   * 得到一个值的原始类型
   * 比如null为Null，Symbol()为Symbol，new Date()为Date
   */
  static toRawType(v) {
    return _toString.call(v).slice(8, -1)
  }

  /**
   * 判断是否是纯对象
   */
  static isPlainObject(v) {
    return _toString.call(v) === '[object Object]'
  }
  
  /**
   * 下载流数据
   */
  static download(data, filename) {
    if (!data) return

    const url = window.URL.createObjectURL(data)
    const link = document.createElement('a')

    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
  }
  
  /**
   * 处理 . 语法路径，比如 obj.info.name
   */
  static parsePath(path) {
    const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/

    const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)

    if (bailRE.test(path)) { return }
    const segments = path.split('.')
    return function (obj) {
      for (let i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]]
      }
      return obj
    }
  }

  /**
   * 返回顶部，带动画效果
   */
  static scrollToTop(el) {
    const c = el.scrollTop
    if (c > 0) {
      el.scrollTo(0, c - c / 8)
      window.requestAnimationFrame(() => this.scrollToTop(el))
    }
  }

  /**
   * 转换为拼音首字母
   */
  static toPinyinInitials(text) {
    return pinyin(text, {
      style: pinyin.STYLE_NORMAL
    }).map(item => {
      return item[0].slice(0, 1)
    }).join('')
  }

  /**
   * 防抖函数
   */
  static debounce(fn, delay = 1000) {
    let timer = null

    return function () {
      clearTimeout(timer)

      timer = setTimeout(fn, delay)
    }
  }

  /**
   * 节流函数
   */
  static throttle(fn, delay = 1000) {
    let flag = true

    return function () {
      if (flag) {
        flag = false

        setTimeout(() => {
          fn()
          flag = true
        }, delay)
      }
    }
  }
}
