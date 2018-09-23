import axios from '~/plugins/axios'
// import io from 'socket.io-client'
// let now = new Date()
// let moment = now.toDateString() + ', ' + now.toLocaleTimeString()
export const state = () => ({
  // page loader
  loader: true,
  // post
  newPostLoader: false,
  postsLoading: true,
  postBox: false,
  bigPost: {
    image: [],
    title: null,
    desc: null,
    comments: [],
    likes: null,
    views: null,
    category: null,
    uploader: null,
    uploaderImg: null,
    time: null,
    activeImg: null
  },
  postsCat: {
    posts: [],
    category: ''
  },
  newPost: {
    isPublic: null,
    title: '',
    description: '',
    img: [],
    category: [],
    uploader: '',
    uploaderImg: ''
  },
  post: null,
  // DATABASE
  newsletterSubscribers: [],
  posts: []
})

export const mutations = {
  //  receives the logged in user information and the status of the postBox
  postBox (state, payload) {
    state.postBox = payload.status
    if (payload.status === false) {
      state.newPostLoader = false
    }
    state.newPost.title = ''
    state.newPost.description = ''
    state.newPost.img = []
    state.newPost.category = []
    if (this.$auth.loggedIn) {
      state.newPost.uploader = this.$auth.user.userData.username
      state.newPost.uploaderImg = this.$auth.user.userData.picture
    }
  },
  loader (state) {
    state.loader = false
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
    state.postsCat.posts.forEach(v => {
      if (v._id === payload) {
        state.bigPost.time = v.time
        state.bigPost.image = v.img
        state.bigPost.title = v.title
        state.bigPost.desc = v.description
        v.comments.forEach(u => {
          state.bigPost.comments.unshift(u)
        })
        state.bigPost.likes = v.likes
        state.bigPost.views = v.views
        state.bigPost.category = v.category
        state.bigPost.uploader = v.uploader
        state.bigPost.uploaderImg = v.uploaderImg
        state.bigPost.activeImg = v.activeImg
      }
    })
  },
  closeComments (state) {
    state.bigPost = {
      image: [],
      title: null,
      desc: null,
      comments: [],
      likes: null,
      views: null,
      category: null,
      uploader: null,
      uploaderImg: null,
      time: null,
      activeImg: null
    }
  },
  hover (state, i) {
    state.posts[i].hover = !state.posts[i].hover
  },
  submitEmail (state, payload) {
    state.newsletterSubscribers.push(payload)
    setTimeout(() => {
      axios.post('/newsletter', {email: payload}).then(() => {
        console.log('email added')
      })
    }, 200)
  },
  isPublic (state, payload) {
    state.newPost.isPublic = payload
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
    state.newPostLoader = true
    let {
      isPublic,
      title,
      description,
      img,
      category,
      uploader,
      uploaderImg
    } = state.newPost
    state.post = {
      isPublic,
      title,
      description,
      img,
      category,
      uploaderImg,
      uploader,
      comments: [],
      likes: [],
      views: 0
    }
    // state.postBox = false
    // state.postsLoading = false
  },
  populatePosts (state, data) {
    let datas = []
    data.forEach(v => {
      let full = []
      let half = []
      let dislike = []
      v.descriptionStatus = false
      v.commentStatus = false
      v.hover = false
      v.activeImg = 0
      if (v.likes.length > 0) {
        v.likes.forEach(u => {
          if (u.mode === 'half') {
            half.push(u)
          } else if (u.mode === 'full') {
            full.push(u)
          } else if (u.mode === 'dislike') {
            dislike.push(u)
          }
        })
      }
      v.commentsCount = v.comments.length
      v.likesCount = {
        full: full.length, half: half.length, dislike: dislike.length, total: full.length + half.length + dislike.length
      }
      let {
        _id,
        createdAt,
        isPublic,
        title,
        description,
        img,
        category,
        uploaderImg,
        uploader,
        comments,
        likes,
        views,
        descriptionStatus,
        commentStatus,
        hover,
        activeImg,
        commentsCount,
        likesCount
      } = v
      datas.push({
        _id,
        time: new Date(createdAt).toLocaleString(),
        isPublic,
        title,
        description,
        img,
        category,
        uploaderImg,
        uploader,
        comments,
        likes,
        views,
        descriptionStatus,
        commentStatus,
        hover,
        activeImg,
        commentsCount,
        likesCount
      })
    })
    state.postsLoading = false
    state.posts = datas.reverse()
  },
  populatePostsCat (state, payload) {
    state.postsCat.posts = []
    state.postsCat.category = payload
    state.posts.forEach(v => {
      if (v.category.includes(payload) || payload === 'TRENDS' || payload === 'ALL') {
        state.postsCat.posts.push(v)
      }
    })
  },
  comment (state, i) {
    state.posts.forEach(v => {
      v.commentStatus = false
      v.descriptionStatus = false
    })
    let post = state.posts[i]
    post.commentStatus = true
    post.descriptionStatus = false
    state.postsCat.posts.forEach(v => {
      if (v._id === post._id) {
        v.commentStatus = true
        v.descriptionStatus = false
      }
    })
  },
  unComment (state, i) {
    state.posts[i].commentStatus = false
    state.postsCat.posts.forEach(v => {
      if (v._id === state.posts[i]._id) {
        v.commentStatus = false
      }
    })
  },
  async submitComment (state, payload) {
    // state.posts[payload.id].comments.push(payload.data)
    let data = payload.data
    let post = state.posts[payload.id]
    let id = post._id
    let comment = { comment: data.text, commentor: data.name, commentorImg: data.image, time: new Date() }
    await axios.patch('/comment', {comment: comment, id: id})
    // .then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  async likePost (state, payload) {
    let data = payload.data
    let post = state.posts[payload.id]
    let id = post._id
    let type = ''
    let test = []
    post.likes.forEach(v => {
      if (v.liker === data.name) {
        test.push(true)
      } else {
        test.push(false)
      }
    })
    if (test.includes(true)) {
      type = 'existing'
    } else {
      type = 'new'
    }
    let postLike = { mode: data.mode, liker: data.name, likerImg: data.image }
    await axios.patch('/likePost', {postLike: postLike, id: id, type: type})
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  },
  async postViews (state, payload) {
    await axios.post('/postViews', {id: payload})
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
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

  //  Realtime updates

  updatePosts (state, data) {
    let {
      _id,
      uploader,
      isPublic,
      title,
      description,
      img,
      category,
      createdAt,
      uploaderImg,
      comments,
      likes,
      views
    } = data
    let full = []
    let half = []
    let dislike = []
    let post = {
      _id,
      time: new Date(createdAt).toLocaleString(),
      isPublic,
      title,
      description,
      img,
      category,
      uploaderImg,
      uploader,
      comments,
      likes,
      views,
      descriptionStatus: false,
      commentStatus: false,
      hover: false,
      activeImg: 0,
      commentsCount: comments.length
    }
    if (post.likes.length > 0) {
      post.likes.forEach(u => {
        if (u.mode === 'half') {
          half.push(u)
        } else if (u.mode === 'full') {
          full.push(u)
        } else if (u.mode === 'dislike') {
          dislike.push(u)
        }
      })
    }
    post.likesCount = {
      full: full.length, half: half.length, dislike: dislike.length, total: full.length + half.length + dislike.length
    }
    state.posts.unshift(post)
    if (post.category.includes(state.postsCat.category) || state.postsCat.category === 'TRENDS' || state.postsCat.category === 'ALL') {
      state.postsCat.posts.unshift(post)
    }
  },
  updateLikes (state, like) {
    // console.log(like)
    let full = []
    let half = []
    let dislike = []
    like.likes.forEach(v => {
      if (v.mode === 'full') {
        full.push(v)
      } else if (v.mode === 'half') {
        half.push(v)
      } else if (v.mode === 'dislike') {
        dislike.push(v)
      }
    })
    let total = full.length + half.length + dislike.length
    state.posts.forEach(v => {
      if (v._id === like.id) {
        v.likes = like.likes
        v.likesCount.total = total
        v.likesCount.full = full.length
        v.likesCount.half = half.length
        v.likesCount.dislike = dislike.length
      }
    })
    state.postsCat.posts.forEach(u => {
      if (u._id === like._id) {
        u.likes = like.likes
        u.likesCount.total = total
        u.likesCount.full = full.length
        u.likesCount.half = half.length
        u.likesCount.dislike = dislike.length
      }
    })
  },
  updateViews (state, payload) {
    state.posts.forEach(v => {
      if (v._id === payload.id) {
        v.views = payload.views
      }
    })
    state.postsCat.posts.forEach(u => {
      if (u._id === payload.id) {
        u.views = payload.views
      }
    })
  },
  updateComments (state, payload) {
    state.posts.forEach(v => {
      if (v._id === payload.id) {
        v.comments = payload.comments
        v.commentsCount = payload.comments.length
      }
    })
    state.postsCat.posts.forEach(u => {
      if (u._id === payload.id) {
        u.comments = payload.comments
        u.commentsCount = payload.comments.length
      }
    })
  }
}

export const actions = {
  async pushPost (context) {
    context.commit('pushPost')
    let postdata = new FormData()
    for (let i = 0; i < context.state.post.img.length; i++) {
      let image = context.state.post.img[i]
      postdata.append('images', image)
    }
    let {
      isPublic,
      title,
      description,
      category,
      uploaderImg,
      uploader,
      comments,
      likes,
      views
    } = context.state.post
    let newPost = JSON.stringify(
      {
        isPublic,
        title,
        description,
        category,
        uploaderImg,
        uploader,
        comments,
        likes,
        views
      }
    )
    postdata.append('newPost', newPost)
    // console.log(postdata.values())
    await axios
      .post('/newPost', postdata)
      .then((res) => {
        context.commit('postBox', {status: false})
        // context.state.posts.unshift(state.post)
        // console.log(res)
        console.log('posts updated')
      })
      .catch(err => {
        console.log(err)
      })
  },
  async fetchPosts ({
    commit
  }) {
    await axios
      .get('/fetchPosts')
      .then(result => {
        let data = result.data
        commit('populatePosts', data)
      })
      // .then(() => {
      //   console.log('fetch ok!')
      // })
      // .catch(err => {
      //   console.log(err)
      // })
  },
  toggleDescription ({commit}, payload) {
    commit('toggleDescription', payload)
    commit('postViews', payload._id)
  },
  prevImg ({commit, state}, payload) {
    commit('prevImg', payload)
    commit('postViews', state.posts[payload]._id)
  },
  nextImg ({commit, state}, payload) {
    commit('nextImg', payload)
    commit('postViews', state.posts[payload]._id)
  },
  bigPost ({commit}, payload) {
    commit('bigPost', payload)
    commit('postViews', payload)
  }
}
