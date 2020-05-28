import MyRoute from '@s/route'
import store from '@/store'

// 这里之所以使用 Route class 构建路由数组
// 是因为需要给路由mixin一些属性方便后续功能
let routeList = new MyRoute([
  { // 登录页
    path: '/login',
    name: 'login',
    component: () => import('@v/login'),
  },
  {
    path: '/',
    name: 'root',
    component: () => import('@v'),
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('@v/not-found'),
  },
])

// 没有开启权限路由，则写死页面级路由列表
if (!$_funcConfig.authority.useRouteAuthority) {
  // 自定义路由列表
  const list = [
    {
      path: '/love-current',
      name: 'love-current',
      meta: {
        title: '爱当下'
      },
      component: () => import('@v'),
      children: [
        {
          path: 'current-people',
          name: 'current-people',
          component: () => import('@v/love-current/current-people'),
          meta: {
            title: '有些人'
          }
        },
        // {
        //   path: 'current-place',
        //   name: 'current-place',
        //   component: () => import('@v/love-current/current-place'),
        //   meta: {
        //     title: '有些地方'
        //   }
        // },
      ],
    },
    {
      path: '/love-game',
      name: 'love-game',
      meta: {
        title: '爱游戏'
      },
      component: () => import('@v'),
      children: [
        {
          path: 'game-yys',
          name: 'game-yys',
          component: () => import('@v/love-game/game-yys'),
          meta: {
            title: '阴阳师'
          }
        },
        {
          path: 'game-guard-radish',
          name: 'game-guard-radish',
          component: () => import('@v/love-game/game-guard-radish'),
          meta: {
            title: '保卫萝卜'
          }
        },
      ],
    },
    {
      path: '/love-technology',
      name: 'love-technology',
      component: () => import('@v'),
      meta: {
        title: '爱技术'
      },
      children: [
        {
          path: 'love-front-end',
          name: 'love-front-end',
          component: () => import('@v/love-technology/technology-front-end'),
          meta: {
            title: '前端'
          }
        },
        {
          path: 'love-java',
          name: 'love-java',
          component: () => import('@v/love-technology/technology-java'),
          meta: {
            title: 'Java'
          }
        },
      ]
    },
  ]
  
  // 构建路由列表混入项
  // 该对象中的所有属性都将作为备选项传入每个路由的meta中
  const mixins = {
    isMenu: true, // 是否是menu中需要渲染的路由
  }
  const pageRouteList = new MyRoute(list, mixins)

  routeList = routeList.concat(pageRouteList)
}

export default routeList
