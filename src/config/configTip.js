function _c(obj) {
  let str = ''
  for (const key in obj) {
    str += `${ key }:${ obj[key] };`
  }
  return str
}

const normal = _c({
  color: '#5e6d82',
  'font-size': '14px',
})

const primary = _c({
  color: '#409eff',
  'font-size': '14px',
})

const success = _c({
  color: '#5daf34',
  'font-size': '18px',
})

const warning = _c({
  color: '#cf9236',
  'font-size': '18px',
})

const danger = _c({
  color: '#dd6161',
  'font-size': '18px',
})

const disabled = _c({
  color: '#82848a',
  'font-size': '18px',
})

if (
  process.env.NODE_ENV !== 'production' &&
  $_funcConfig.operate.showProductTip
) {
  const {
    authority,
    layout,
    operate,
  } = $_funcConfig

  const log = [
    {
      show: !!authority.useRouteAuthority,
      trueMsg: '%c权限路由：%c开启',
      trueStyle: [primary, success],
      falseMsg: '%c权限路由：%c关闭',
      falseStyle: [primary, danger]
    },
    {
      show: !!layout.showFullScreen,
      trueMsg: '%c全屏操作：%c开启',
      trueStyle: [primary, success],
      falseMsg: '%c全屏操作：%c关闭',
      falseStyle: [primary, danger]
    },
    {
      show: !!operate.useAccordionMenu,
      trueMsg: '%c手风琴菜单：%c开启',
      trueStyle: [primary, success],
      falseMsg: '%c手风琴菜单：%c关闭',
      falseStyle: [primary, danger]
    },
    {
      show: !!operate.goHomeAfterRefresh,
      trueMsg: '%c刷新后回首页：%c开启',
      trueStyle: [primary, success],
      falseMsg: '%c刷新后回首页：%c关闭',
      falseStyle: [primary, danger]
    },
    {
      show: !!operate.keepRouteAlive,
      trueMsg: '%c路由缓存：%c开启',
      trueStyle: [primary, success],
      falseMsg: '%c路由缓存：%c关闭',
      falseStyle: [primary, danger]
    },
  ]

  console.log('%c生产提示已开启...', normal)
  log.forEach(item => {
    const msg = item[item.show + 'Msg']
    const style = item[item.show + 'Style']

    console.log(msg, ...style)
  })
}