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
   * 从一个树形数组中过滤出想要的项，filterKey支持obj.key语法
   * @param  {[type]} arr       [被过滤的数组]
   * @param  {[type]} filterKey [过滤条件的key]
   * @param  {[type]} filterVal [过滤条件的value]
   * @param  {[type]} childKey  [子节点的key]
   * @return {[type]}           [过滤出的项或者undefined]
   */
  static filterFirstTreeNode(arr, filterKey, filterVal, childKey) {
    // 加上IIFE的目的是防止最外层函数名被修改导致报错
    return (function _filter(arr, filterKey, filterVal, childKey) {
      let result

      for (let i = 0, len = arr.length; i < len; i++) {
        let val = arr[i]

        // 用于支持filterKey的key1.key2格式
        if (~filterKey.indexOf('.')) {
          const arr = filterKey.split('.')
          arr.forEach(item => {
            val = val[item]
          })
        } else {
          val = val[filterKey]
        }

        if (val === filterVal) {
          result = arr[i]
        } else if (arr[i][childKey] && arr[i][childKey].length) {
          result = _filter(arr[i][childKey], filterKey, filterVal, childKey)
        }

        if (result !== undefined) {
          break
        }
      }

      return result
    }(arr, filterKey, filterVal, childKey))
  }
}