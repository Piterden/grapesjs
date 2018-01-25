let Backbone = require('backbone')
let CssRule = require('./CssRule')

module.exports = Backbone.Collection.extend({
  initialize(models, opt) {
    // Inject editor
    if (opt && opt.sm) this.editor = opt.sm

    // Not used
    this.model = (attrs, options) => {
      let model

      if (!options.sm && opt && opt.sm) options.sm = opt.sm

      switch (1) {
        default:
          model = new CssRule(attrs, options)
      }

      return model
    }
  },

  add(models, opt = {}) {
    if (typeof models === 'string') {
      models = this.editor.get('Parser').parseCss(models)
    }
    opt.em = this.editor
    return Backbone.Collection.prototype.add.apply(this, [models, opt])
  },
})
