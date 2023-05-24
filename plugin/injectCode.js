const HtmlWebpackPlugin = require('html-webpack-plugin');
class InjectCodePlugin {
  constructor (options) {
    this.options = options || ''
  }

  apply (compiler) {
    const condition = this.options.condition;
    const code = this.options.code;

    compiler.hooks.compilation.tap(
      'InjectCodePlugin',
      compilation => {
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(
          'InjectCodePlugin',
          (htmlPluginData, cb) => {
            const htmlStr = htmlPluginData.html.toString();
            const codeFrag = htmlStr.split(condition);
            if (codeFrag[0] && codeFrag[1]) {
                htmlPluginData.html = codeFrag[0] + code + condition + codeFrag[1];
                cb && cb(null, htmlPluginData)
            }
          }
        )
    })

  }
}

module.exports = InjectCodePlugin
