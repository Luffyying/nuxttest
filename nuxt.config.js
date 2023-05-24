const fs = require("fs")
const path = require('path');
const InjectCodePlugin = require('./plugin/injectCode.js');
const statStr = fs.readFileSync(path.join(__dirname, '/utils/statHm.js'));
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxttest',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // 进行一些webpack扩展
    extend(config, ctx) {
      const extraPlugin = []
      // if (!ctx.isDev) {
        extraPlugin.push(
            // 注入百度统计
            new InjectCodePlugin({
                condition: '</body>',
                code: `\n<script>\n${statStr}</script>\n`
            })
        );
      // }
      config.plugins = [...config.plugins, ...extraPlugin];

    },
  }
}
