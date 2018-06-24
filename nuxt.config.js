const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')
module.exports = {
  // serverMiddleware: [
  //   // Will register redirect-ssl npm package
  //   'redirect-ssl'
  // ],
  modules: [
    '@nuxtjs/pwa',
    'nuxt-imagemin'
    // 'nuxt-babel'
  ],
  /*
     ** Headers of the page
     */
  head: {
    title: '4c-creations',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Community webapp' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      // }
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://cdn.materialdesignicons.com/2.3.54/css/materialdesignicons.min.css'
      // }
    ],
    script: []
  },
  loading: { color: '#ffffff' },
  manifest: {
    name: '4c-creations',
    theme_color: '#4E008C'
  },
  /*
     ** Global CSS
     */
  css: [
    '~/assets/css/fonts.css',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/css/app.styl',
    '~/assets/css/main.css'
  ],
  plugins: [
    '~/plugins/vuetify.js',
    {
      src: '~/plugins/vue-particles.js',
      ssr: false
    },
    {
      src: '~/plugins/vue-typer.js',
      ssr: false
    },
    {
      src: '~/plugins/emoji-mart-vue.js',
      ssr: false
    },
    {
      src: '~/plugins/vue-lazyload.js'
    }
  ],
  /*
     ** Add axios globally
     */
  build: {
    vendor: ['axios', 'vuetify'],
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    },
    /*
		   ** Run ESLINT on save
		   */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        // config.module.rules.push({
        //   test: /\.js?$/,
        //   exclude: [/.nuxt/, /node_modules/],
        //   include: [/node_modules\/vue-particles/],
        //   use: [{
        //     loader: 'babel-loader',
        //     options: {
        //       presets: ['env']
        //     }
        //   }]
        // })
        imagemin(['images/*.{jpg,png}'], '~/assets', {
          plugins: [imageminWebp({ lossless: true })]
        }).then(() => {
          console.log('Images optimized')
        })
      }
    }
  }
}
