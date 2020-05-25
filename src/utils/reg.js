export class Reg {
  // 匹配以 vw|px|% 为单位的度量单位
  static measure = /((^(0\.|[1-9][0-9]*\.)[0-9]+)|^[1-9][0-9]*)(vw|px|%)$/
  
  // 汉字、数字、字母
  static noSymbol = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/

  // 汉字、字母
  static name = /^[\u4e00-\u9fa5a-zA-Z]+$/

  // 数字
  static number = /^[0-9]+$/

  // 整数或小数
  static intOrFloat = /(^(0\.|[1-9][0-9]*\.)[0-9]+$)|^[1-9][0-9]*$/
}
