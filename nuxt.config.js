module.exports = {
  /*
     ** Headers of the page
     */
  head: {
    title: '4c-creations',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    script: []
  },
  /*
     ** Global CSS
     */
  css: [
    '@mdi/font/css/materialdesignicons.css',
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
    }
  ],
  /*
     ** Add axios globally
     */
  build: {
    vendor: [
      'axios',
      'vuetify',
      'vue-particles',
      'vue-typer',
      'emoji-mart-vue'
    ],
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
      }
    }
  }
}
