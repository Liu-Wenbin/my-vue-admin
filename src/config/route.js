export default class Route {
  routeList
  
  constructor (options) {
    this.routeList = options
    
    this.mixin(this.routeList)
    
    return this.routeList
  }

  mixin (routeList) {
    routeList.forEach(parentRoute => {
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

        this.mixin(parentRoute.children)
      }
    })
  }
}