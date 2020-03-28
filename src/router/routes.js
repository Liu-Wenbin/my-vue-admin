export default [
  {
    path: '/',
    name: 'root',
    component: () => import('@v/index'),
    redirect: {
      name: 'login'
    },
    children: [
      
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@v/login')
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('@v/not-found')
  }
]