module.exports = {
  serverMiddleware: [
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    ['cookie-universal-nuxt', {alias: 'cookie'}]
    // 'nuxt-babel'
  ],
  axios: {
    // baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/user/login', method: 'post', propertyName: 'token' },
          user: { url: '/user/profileAuth', method: 'get', propertyName: 'user' },
          logout: { url: '/user/logout', method: 'get' }
        }
      }
    }
  },
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      // }
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://cdn.materialdesignicons.com/2.3.54/css/materialdesignicons.min.css'
      // },
      {
        href: 'https://cdn.jsdelivr.net/embed.js/4.0.0/embed.min.css', media: 'all', rel: 'stylesheet'
      }
    ],
    script: [
      {src: '/js/webpjs-0.0.2.min.js'}
    ]
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
    },
    {
      src: '~/plugins/timeago'
    }
  ],
  /*
     ** Add axios globally
     */
  build: {
    vendor: ['axios', 'vuetify', 'socket.io-client'],
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    },
    /*
   ** Run ESLINT on save   */
    extend (config, ctx) {
      if (ctx.isClient || ctx.isServer) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.module.rules.push({
          test: /\.(gif|png|jpe?g|svg|webp)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                disable: false, // webpack@2.x and newer
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: true
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              }
            }
          ]
        })
      }
    }
  }
}
