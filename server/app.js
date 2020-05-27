const app = require('express')()

app.use(require('cors')())

app.get('/admin/login', (req, res) => {
  const query = req.query
  console.log(query)
  if (query.username === 'admin' && query.password === '123') {
    res.json({
      success: true,
      data: {
        token: '123456'
      }
    })
  } else if (query.username === 'user' && query.password === '123') {
    res.json({
      success: true,
      data: {
        token: '123'
      }
    })
  } else {
    res.json({
      success: false,
      msg: '账号或密码错误'
    })
  }
})

app.get('/admin/route', (req, res) => {
  const auth = req.headers.authorization

  if (auth === '123456') {
    res.json({
      success: true,
      data: [
        {
          name: 'love-current',
          meta: { title: '爱当下' },
          children: [
            {
              name: 'current-people',
              meta: { title: '有些人' }
            },
            {
              name: 'current-place',
              meta: { title: '有些地方' }
            }
          ],
        },
        {
          name: 'love-game',
          meta: { title: '爱游戏' },
          children: [
            {
              name: 'game-yys',
              meta: { title: '阴阳师' }
            },
            {
              name: 'game-guard-radish',
              meta: { title: '保卫萝卜' }
            },
          ],
        },
      ]
    })
  } else if (auth === '123') {
    res.json({
      success: true,
      data: [
        {
          name: 'love-game',
          meta: { title: '爱游戏' },
          children: [
            {
              name: 'game-yys',
              meta: { title: '阴阳师' }
            },
            {
              name: 'game-guard-radish',
              meta: { title: '保卫萝卜' }
            },
          ],
        },
      ]
    })
  }
})

app.listen(3001, () => console.log('serve on'))