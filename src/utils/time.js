/*
  dependence: npm i dayjs -S
 */

import dayjs from 'dayjs'

export class Time {
  static dayjs = dayjs

  /**
   * 格式化时间
   * @param  {[type]} time      [需要格式化的时间戳、时间字符串]
   * @param  {String} formatter [格式化格式]
   * @return {[type]}           [格式化之后的时间字符串]
   */
  static format(time, formatter = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(time).format(formatter)
  }

  /**
   * 获取当前时间
   * @return {[type]} [当前时间对象]
   */
  static now() {
    return dayjs()
  }
  /**
   * 将一个时间转为时间戳
   * @param  {[type]} time [时间字符串或任何能被dayjs识别的时间格式]
   * @return {[type]}      [时间戳]
   */
  static toStamp(time) {
    return dayjs(time).valueOf()
  }

  /**
   * 将一个时间推迟或倒退
   * @param {[type]} time [时间]
   * @param {[type]} num  [推迟或倒退的数值]
   * @param {[type]} type [数值对应的类型]
   * @return {[type]}     [推迟之后的时间]
   */
  static add(time, num, type) {
    return dayjs(time).add(num, type)
  }

  /**
   * 将一个时间推迟一天并返回时间戳（用于接口日期）
   */
  static delayOneDay(time) {
    return Time.toStamp(Time.add(Time.add(time, 1, 'day'), -1, 'millisecond'))
  }

  /**
   * 将一个时间格式化成截止到日期的时间戳
   */
  static formatToDateStamp(time) {
    return Time.toStamp(Time.format(time, 'YYYY-MM-DD'))
  }

  /**
   * 比较两个时间到日期为止的先后
   * 如果前一个时间晚于后一个时间，返回 false
   * 否则返回 true
   */
  static compareDate(time1, time2) {
    return Time.formatToDateStamp(time1) <= Time.formatToDateStamp(time2)
  }

  /**
   * 判断给定时间是否在当天之前
   */
  static isExceedToday(time) {
    return Time.formatToDateStamp(time) <= Time.formatToDateStamp(Time.now())
  }
}
