export default class Route {
  routeList
  
  constructor (options, mixins) {
    this.routeList = options
    
    this.mixin(this.routeList, mixins)
    // 依赖于mixin
    this.normalizeRoute(this.routeList)
    
    return this.routeList
  }

  mixin (routeList, mixins = {}) {
    routeList.forEach(parentRoute => {
      // 混入自定义配置项
      const cached = parentRoute.meta || {}
      parentRoute.meta = Object.assign({}, mixins, cached, {
        $children: parentRoute.children || []
      })

      if (parentRoute.children) {
        parentRoute.children.forEach(childRoute => {
          if (typeof childRoute.meta === 'object') {
            childRoute.meta.$parentRoute = parentRoute
          } else {
            childRoute.meta = {
              $parentRoute: parentRoute
            }
          }
        })

        this.mixin(parentRoute.children, mixins)
      }
    })
  }

  /**
   * 规范化路由，给路由添加必要选项
   */
  normalizeRoute (routeList) {
    routeList.forEach(route => {
      // 顶层路由
      const isTopRoute = !route.meta.$parentRoute

      if (isTopRoute) {
        if (!route.path) {
          route.path = `/${ route.name }`
        }

        if (!route.component) {
          route.component = () => import('@v')
        }
      } else {
        if (!route.path) {
          route.path = route.name
        }

        if (!route.component) {
          route.component = () => import(`@v/${ route.meta.$parentRoute.name }/${ route.name }`)
        }
      }

      if (route.children) {
        this.normalizeRoute(route.children)
      }
    })
  }
}