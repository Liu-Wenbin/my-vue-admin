import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'

import {
  Button,
  message,
  Menu,
  Icon,
  Dropdown,
} from 'ant-design-vue'

Vue
  .use(Button)
  .use(Menu)
  .use(Icon)
  .use(Dropdown)

message.config({
  maxCount: 1,
})

Vue.prototype.$message = message
