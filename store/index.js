import axios from '~/plugins/axios'
export const state = () => ({
  // userData
  userIn: {},
  // page loader
  loader: true,
  // slider
  sliderHeight: 90,
  // HOME PAGE
  content: false,
  index: 'Home',
  // post
  postsLoading: true,
  postBox: false,
  bigPost: { image: [], title: null, desc: null, comments: null, likes: null, category: null, uploader: null, uploaderImg: null, time: null, activeImg: null },
  enlargeImg: false,
  enlargePost: false,
  postsCat: { posts: [], category: '' },
  newPost: {
    title: '',
    description: '',
    img: [],
    category: [],
    uploader: '???',
    uploaderImg: '???'
  },
  post: null,
  id: null,
  // profile page
  mobileProf: false,
  // DATABASE
  newsletterSubscribers: [],
  posts: [],
  // location
  locations: null,
  countries: [],
  nationality: null,
  staleStates: null,
  states: [],
  state: null,
  cities: [],
  city: null,
  addCity: null,
  // misc
  dump: ''
})

export const mutations = {
  dump (state, payload) {
    state.dump = payload
  },
  //  receives the logged in user information and the status of the postBox
  postBox (state, payload) {
    state.postBox = payload.status
    state.newPost.title = ''
    state.newPost.description = ''
    state.newPost.img = []
    state.newPost.category = []
    if (payload.user) {
      state.newPost.uploader = payload.user.username
      state.newPost.uploaderImg = payload.user.picture
    }
  },
  userIn (state, payload) {
    state.userIn = payload
  },
  mobileProf (state, payload) {
    if (payload === false) {
      state.mobileProf = payload
    }
    if (payload === true) {
      state.mobileProf = !state.mobileProf
    }
  },
  loader (state) {
    state.loader = false
  },
  content (state) {
    state.content = true
  },
  sliderHeight (state) {
    state.sliderHeight = 0
  },
  prevImg (state, i) {
    if (state.posts[i].activeImg > 0) {
      state.posts[i].activeImg -= 1
    } else if (state.posts[i].activeImg === 0) {
      state.posts[i].activeImg = state.posts[i].img.length - 1
    }
  },
  nextImg (state, i) {
    if (state.posts[i].activeImg < state.posts[i].img.length - 1) {
      state.posts[i].activeImg += 1
    } else if (state.posts[i].activeImg === state.posts[i].img.length - 1) {
      state.posts[i].activeImg = 0
    }
  },
  prevBigImg (state, i) {
    if (state.bigPost.activeImg > 0) {
      state.bigPost.activeImg -= 1
    } else if (state.bigPost.activeImg === 0) {
      state.bigPost.activeImg = state.bigPost.image.length - 1
    }
  },
  nextBigImg (state, i) {
    if (state.bigPost.activeImg < state.bigPost.image.length - 1) {
      state.bigPost.activeImg += 1
    } else if (state.bigPost.activeImg === state.bigPost.image.length - 1) {
      state.bigPost.activeImg = 0
    }
  },
  bigPost (state, payload) {
    let {
      uploaderImg,
      uploader,
      time,
      title,
      description,
      img,
      category,
      comments,
      likes,
      activeImg
    } = payload
    state.bigPost.time = time
    state.bigPost.image = img
    state.bigPost.title = title
    state.bigPost.desc = description
    state.bigPost.comments = comments
    state.bigPost.likes = likes
    state.bigPost.category = category
    state.bigPost.uploader = uploader
    state.bigPost.uploaderImg = uploaderImg
    state.bigPost.activeImg = activeImg
  },
  hover (state, i) {
    state.posts[i].hover = !state.posts[i].hover
  },
  submitEmail (state, payload) {
    state.newsletterSubscribers.push(payload)
    setTimeout(() => {
      axios.post('http://localhost:3001/emails', payload).then(() => {
        console.log('email added')
      })
    }, 200)
  },
  title (state, payload) {
    state.newPost.title = payload
  },
  description (state, payload) {
    state.newPost.description = payload
  },
  image (state, payload) {
    state.newPost.img = payload
  },
  category (state, payload) {
    state.newPost.category = payload
  },
  pushPost (state) {
    let num = state.posts.length + 1
    let now = new Date()
    let moment = now.toDateString() + ', ' + now.toLocaleTimeString()
    let {
      title,
      description,
      img,
      category,
      uploader,
      uploaderImg
    } = state.newPost
    state.post = {
      id: num,
      time: moment,
      uploaderImg,
      uploader,
      title,
      description,
      img,
      category,
      comments: [],
      likes: []
    }
    state.posts.unshift(state.post)
    state.postBox = false
    state.postsLoading = false
  },
  populatePostsCat (state, payload) {
    state.postsCat.posts = []
    state.postsCat.category = payload
    state.posts.forEach(v => {
      if (v.category.includes(payload) || payload === 'TRENDS') {
        state.postsCat.posts.push(v)
      }
    })
  },
  populatePosts (state, data) {
    state.postsLoading = false
    function compare (a, b) {
      if (a.id < b.id) {
        return 1
      }
      if (a.id > b.id) {
        return -1
      }
      return 0
    }
    data.forEach(v => {
      v.descriptionStatus = false
      v.commentStatus = false
      v.hover = false
      v.activeImg = 0
    })
    state.posts = data.sort(compare)
  },
  comment (state, i) {
    state.posts.forEach(v => {
      v.commentStatus = false
      v.descriptionStatus = false
    })
    state.posts[i].commentStatus = true
    state.posts[i].descriptionStatus = false
  },
  unComment (state, i) {
    state.posts[i].commentStatus = false
  },
  submitComment (state, payload) {
    state.posts[payload.id].comments.push(payload.data)
  },
  toggleDescription (state, post) {
    state.posts.forEach(v => {
      if (
        (v.descriptionStatus === true || v.commentStatus === true) &&
        v !== post
      ) {
        v.descriptionStatus = false
        v.commentStatus = false
      }
    })
    post.descriptionStatus = !post.descriptionStatus
  },
  index (state, component) {
    state.index = component
  },
  fetchLocation (state, data) {
    state.locations = data
    state.locations.forEach(v => {
      state.countries.push(v.CountryName)
    })
  },
  nationalit (state, data) {
    state.nationality = data
    state.locations.forEach(v => {
      if (v.CountryName === state.nationality) {
        state.id = v.id
        state.staleStates = v.States
        state.states = []
        state.staleStates.forEach(w => {
          state.states.push(w.StateName)
        })
      }
    })
  },
  stat (state, data) {
    state.state = data
    state.cities = []
    state.staleStates.forEach(v => {
      if (v.StateName === state.state) {
        v.Cities.forEach(u => {
          state.cities.push(u)
        })
      }
    })
  },
  cit (state, data) {
    data = data.charAt(0).toUpperCase() + data.slice(1)
    if (state.state !== null) {
      state.city = data
    }
    if (
      !state.cities.includes(state.city) &&
      state.state !== null &&
      state.city !== null
    ) {
      state.cities.push(state.city)
      state.cities.sort()
      state.locations.forEach(u => {
        if (u.id === state.id) {
          state.addCity = u
        }
      })
      state.addCity.States.forEach(v => {
        if (v.StateName === state.state) {
          v.Cities = state.cities
        }
      })
      axios
        .patch(`http://localhost:3002/countries/${state.id}`, state.addCity)
        .then(() => {
          console.log('voila!')
        })
    }
  },
  empty (state) {
    state.city = null
    state.cities = []
    state.states = []
    state.staleState = null
    state.state = null
  }
}

export const actions = {
  async pushPost (context) {
    context.commit('pushPost')
    await axios
      .post('http://localhost:3001/posts', context.state.post)
      .then(() => {
        console.log('posts updated')
      })
      .catch(err => {
        console.log(err)
      })
  },
  async fetchPosts ({ commit }) {
    await axios
      .get('http://localhost:3001/posts')
      .then(result => {
        let data = result.data
        commit('populatePosts', data)
      })
      .then(() => {
        console.log('fetch ok!')
      })
      .catch(err => {
        console.log(err)
      })
  },
  async fetchLocation ({ commit }) {
    await axios
      .get('http://localhost:3002/Countries')
      .then(result => {
        let data = result.data
        commit('fetchLocation', data)
      })
      .then(() => {
        console.log('country')
      })
      .catch(err => {
        console.log(err)
      })
  }
}
