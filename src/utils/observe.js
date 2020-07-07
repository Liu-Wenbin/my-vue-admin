class Observer {
  #container = {}

  subscribe (type, fn) {
    if (!this.#container[type]) {
      this.#container[type] = [fn]
    } else {
      this.#container[type].push(fn)
    }
  }

  publish (type, argObj, env) {
    if (!this.#container[type]) { return }

    this.#container[type].forEach(fn => {
      fn.call(env, argObj)
    })
  }

  stop (type, fn) {
    const list = this.#container[type]
    if (!list) { return }

    const index = list.findIndex(item => item === fn)
    list.splice(index, 1)
  }
}