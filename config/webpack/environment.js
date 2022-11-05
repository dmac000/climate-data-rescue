//
const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')
const erb = require('./loaders/erb')
const exposeLoader = require('./loaders/expose')

const webpack = require('webpack')
// const isProduction = process.env.NODE_ENV === 'production'

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
environment.loaders.prepend('erb', erb)
// environment.loaders.append('exposeLoader', exposeLoader)

// if (!isProduction) {
//   const eslint = require('./loaders/eslint')
//   environment.loaders.append('eslint', eslint)
// }

var path = require('path');

environment.plugins.prepend('env',
  new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
)

// TODO: check/do for marionete, backbone etc?
environment.plugins.append("Provide",
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default']
  })
)

// environment.loaders.append('expose', {
//   test: require.resolve('jquery'),
//   use: [{
//     loader: 'expose-loader',
//     options: 'jQuery'
//   }, {
//     loader: 'expose-loader',
//     options: '$'
//   }]
// })

// // environment.loaders.append('jquery', 
// //   {
// //     test: require.resolve('jquery'),
// //     loader: 'expose-loader',
// //     options: {
// //       exposes: ['$', 'jQuery']
// //     }
// //   }
// // )

// added and allow BootstrapVue to work.
const config = environment.toWebpackConfig()
config.resolve = {
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': path.resolve(__dirname, '../../app/javascript'),
    '@mixins': '@/mixins'
  },
  extensions: ['*', '.js', '.vue', '.json']
}

module.exports = environment
