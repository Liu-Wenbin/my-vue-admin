import Route from '@s/route'

// 这里之所以使用 Route class 构建路由数组
// 是因为我需要给路由mixin一些属性方便后续功能
export default new Route([
  {
    path: '/',
    name: 'root',
    component: () => import('@v'),
    redirect: {
      name: 'login',
    },
    meta: {
      isRootRoute: true, // 用来标识根路由，用于动态加载侧边栏路由列表时查找，如果想要动态加载路由侧边栏则必填
    },
    children: [
      {
        path: 'love-current',
        name: 'love-current',
        meta: {
          title: '爱当下'
        },
        component: () => import('@v/love-current'),
        children: [
          {
            path: 'current-people',
            name: 'current-people',
            component: () => import('@v/love-current/current-people'),
            meta: {
              title: '有些人'
            }
          },
          {
            path: 'current-place',
            name: 'current-place',
            component: () => import('@v/love-current/current-place'),
            meta: {
              title: '有些地方'
            }
          },
        ],
      },
      {
        path: 'love-game',
        name: 'love-game',
        meta: {
          title: '爱游戏'
        },
        component: () => import('@v/love-game'),
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
    ],
  },
  { // 登录页，如果不修改其他地方，这里的 name 值不能修改
    path: '/login',
    name: 'login',
    component: () => import('@v/login'),
  },
  { // 这里设置为通配符而不是 使用具体路径后使用路由守卫导向 的原因是为该页面中的 返回上一页 功能服务
    path: '*',
    name: 'not-found',
    component: () => import('@v/not-found'),
  },
])
