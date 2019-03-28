importScripts('/4ccreations/_nuxt/workbox.4c4f5ca6.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/4ccreations/_nuxt/app.8b9e57e9c61a70c74159.js",
    "revision": "f2152ab49112614546c28e864d49ccf0"
  },
  {
    "url": "/4ccreations/_nuxt/layouts/default.a57155cd79f488d3f82a.js",
    "revision": "0f2494b6da49a7dbacb9de5738c40cae"
  },
  {
    "url": "/4ccreations/_nuxt/manifest.776071a7418b16b552aa.js",
    "revision": "71e8b7db8267e82c0a8e4df36435b326"
  },
  {
    "url": "/4ccreations/_nuxt/pages/index.9ffa611a237a6ec48319.js",
    "revision": "c70e0ddc09a35a7fe43d511a3da26a68"
  },
  {
    "url": "/4ccreations/_nuxt/pages/profile.a3f1740a59aab0a6db4e.js",
    "revision": "16ff982098ccf4e1b0e11a9ff42eacc3"
  },
  {
    "url": "/4ccreations/_nuxt/vendor.967aef5fd2bd7a45a1eb.js",
    "revision": "ed1f8f16256daf2a8f4c86ac444ff5f6"
  }
], {
  "cacheId": "4c-creations",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/4ccreations/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/4ccreations/.*'), workbox.strategies.networkFirst({}), 'GET')





