module.exports = {
  webpack: (config, options, webpack) => {
    require('babel-register')
    config.entry.main = './server/index.js'
    return config
  }
}
