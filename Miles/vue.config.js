//const { defineConfig } = require('@vue/cli-service')
//module.exports = defineConfig({
//  transpileDependencies: [
//    'vuetify'
//  ]
//})

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "./src/static/styles/_index.scss";',
      },
    },
  },
};