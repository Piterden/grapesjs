let Backbone = require('backbone')

module.exports = Backbone.Model.extend({
  defaults: {
    checkLocal: true,
  },

  /**
   * @private
   */
  store(data, clb) {
    this.checkStorageEnvironment()

    for (let key in data) localStorage.setItem(key, data[key])

    if (typeof clb == 'function') {
      clb()
    }
  },

  /**
   * @private
   */
  load(keys, clb) {
    this.checkStorageEnvironment()
    let result = {}

    for (let i = 0, len = keys.length; i < len; i++) {
      let value = localStorage.getItem(keys[i])
      if (value) result[keys[i]] = value
    }

    if (typeof clb == 'function') {
      clb(result)
    }

    return result
  },

  /**
   * @private
   */
  remove(keys) {
    this.checkStorageEnvironment()

    for (let i = 0, len = keys.length; i < len; i++)
      localStorage.removeItem(keys[i])
  },

  /**
   * Check storage environment
   * @private
   * */
  checkStorageEnvironment() {
    if (this.get('checkLocal') && !localStorage)
      console.warn("Your browser doesn't support localStorage")
  },
})
