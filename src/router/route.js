export default [
  {
    path: '/',
    name: 'root',
    component: () => import('@v'),
    redirect: {
      name: 'login',
    },
    children: [
      {
        path: 'test',
        name: 'test',
        component: () => import('@v/test'),
        children: [
          {
            path: 'test1',
            name: 'test-test1',
            component: () => import('@v/test/test1'),
            meta: {
              title: '测试子节点1'
            }
          },
          {
            path: 'test2',
            name: 'test-test2',
            component: () => import('@v/test/test2'),
            meta: {
              title: '测试子节点2'
            }
          },
          {
            path: 'test1',
            name: 'test-test3',
            component: () => import('@v/test/test1'),
            meta: {
              title: '测试子节点1'
            }
          },
          {
            path: 'test2',
            name: 'test-test4',
            component: () => import('@v/test/test2'),
            meta: {
              title: '测试子节点2'
            }
          },
          {
            path: 'test1',
            name: 'test-test5',
            component: () => import('@v/test/test1'),
            meta: {
              title: '测试子节点1'
            }
          },
          {
            path: 'test2',
            name: 'test-test6',
            component: () => import('@v/test/test2'),
            meta: {
              title: '测试子节点2'
            }
          },
          {
            path: 'test1',
            name: 'test-test7',
            component: () => import('@v/test/test1'),
            meta: {
              title: '测试子节点1'
            }
          },
          {
            path: 'test2',
            name: 'test-test8',
            component: () => import('@v/test/test2'),
            meta: {
              title: '测试子节点2'
            }
          },
          {
            path: 'test1',
            name: 'test-test9',
            component: () => import('@v/test/test1'),
            meta: {
              title: '测试子节点1'
            }
          },
          {
            path: 'test2',
            name: 'test-test10',
            component: () => import('@v/test/test2'),
            meta: {
              title: '测试子节点2'
            }
          },
        ],
        meta: {
          title: '测试父节点1'
        }
      },
      {
        path: 'test2',
        name: 'test2',
        component: () => import('@v/test2'),
        children: [
          {
            path: 'test1',
            name: 'test2-test1',
            component: () => import('@v/test2/test1'),
            meta: {
              title: '测试子节点1'
            }
          },
          {
            path: 'test2',
            name: 'test2-test2',
            component: () => import('@v/test2/test2'),
            meta: {
              title: '测试子节点2'
            }
          },
        ],
        meta: {
          title: '测试父节点2'
        }
      },
      {
        path: 'test',
        name: 'test',
        component: () => import('@v/test'),
        children: [
          {
            path: 'test1',
            name: 'test-test1',
            component: () => import('@v/test/test1'),
            meta: {
              title: '测试子节点1'
            }
          },
          {
            path: 'test2',
            name: 'test-test2',
            component: () => import('@v/test/test2'),
            meta: {
              title: '测试子节点2'
            }
          },
          {
            path: 'test1',
            name: 'test-test3',
            component: () => import('@v/test/test1'),
            meta: {
              title: '测试子节点1'
            }
          },
          {
            path: 'test2',
            name: 'test-test4',
            component: () => import('@v/test/test2'),
            meta: {
              title: '测试子节点2'
            }
          },
          {
            path: 'test1',
            name: 'test-test5',
            component: () => import('@v/test/test1'),
            meta: {
              title: '测试子节点1'
            }
          },
          {
            path: 'test2',
            name: 'test-test6',
            component: () => import('@v/test/test2'),
            meta: {
              title: '测试子节点2'
            }
          },
          {
            path: 'test1',
            name: 'test-test7',
            component: () => import('@v/test/test1'),
            meta: {
              title: '测试子节点1'
            }
          },
          {
            path: 'test2',
            name: 'test-test8',
            component: () => import('@v/test/test2'),
            meta: {
              title: '测试子节点2'
            }
          },
          {
            path: 'test1',
            name: 'test-test9',
            component: () => import('@v/test/test1'),
            meta: {
              title: '测试子节点1'
            }
          },
          {
            path: 'test2',
            name: 'test-test10',
            component: () => import('@v/test/test2'),
            meta: {
              title: '测试子节点2'
            }
          },
        ],
        meta: {
          title: '测试父节点1'
        }
      },
      {
        path: 'test2',
        name: 'test2',
        component: () => import('@v/test2'),
        children: [
          {
            path: 'test1',
            name: 'test2-test1',
            component: () => import('@v/test2/test1'),
            meta: {
              title: '测试子节点1'
            }
          },
          {
            path: 'test2',
            name: 'test2-test2',
            component: () => import('@v/test2/test2'),
            meta: {
              title: '测试子节点2'
            }
          },
        ],
        meta: {
          title: '测试父节点2'
        }
      },
    ],
    meta: {
      isRootRoute: true, // 用来标识根路由，用于动态加载侧边栏路由列表时查找，如果想要动态加载路由侧边栏则必填
    },
  },
  { // 登录页，如果不修改其他地方，这里的 name 值不能修改
    path: '/login',
    name: 'login',
    component: () => import('@v/login'),
  },
  { // 这里设置为通配符而不是具体路径之后使用路由守卫导向的原因是为该页面中的 返回上一页 功能服务
    path: '*',
    name: 'not-found',
    component: () => import('@v/not-found'),
  },
]
