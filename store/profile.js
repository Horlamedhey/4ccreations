import axios from '~/plugins/axios'
export const state = () => ({
  loader: false,
  dialog: {status: false, color: 'error', icon: 'mdi-account-alert', content: 'User not logged in.'},
  // userData
  id: '',
  personalInfo: {},
  userIsLogged: false,
  editing: [],
  userInfo: {}
  //  user's portfolio
})

export const mutations = {
  loading (state, payload) {
    state.loader = payload
  },
  dialog (state, payload) {
    state.dialog.content = payload
    state.dialog.status = true
  },
  personalInfo (state, payload) {
    if (payload) {
      state.personalInfo = payload
      state.id = payload.id
      let {city, company, dob, email, gender, institution, level, name, nationality, newsletter, password, phone, picture, position, status, username} = payload
      let title = []
      payload.title.forEach(v => {
        title.push(v)
      })
      state.userInfo = {city, company, dob, email, gender, institution, level, name, nationality, newsletter, password, phone, picture, position, state: payload.state, status, title: title, username}
    } else {
      state.personalInfo = {}
      state.userInfo = {}
    }
  },
  //  checks if user is logged in
  userIsLogged (state, payload) {
    state.userIsLogged = payload
  },
  updateProfilePic (state, payload) {
    state.personalInfo.picture = payload
    state.userInfo.picture = payload
  },
  editing (state, payload) {
    state.editing.push(payload)
  },
  setTitle (state, payload) {
    state.userInfo.title.push(payload)
  },
  removeTitle (state, payload) {
    state.userInfo.title.splice(payload, 1)
  },
  setName (state, payload) {
    state.userInfo.name = payload
  },
  setEmail (state, payload) {
    state.userInfo.email = payload
  },
  setPhone (state, payload) {
    state.userInfo.phone = payload
  },
  setGender (state, payload) {
    state.userInfo.gender = payload
  },
  setDob (state, payload) {
    state.userInfo.dob = payload
  },
  setCompany (state, payload) {
    state.userInfo.company = payload
  },
  setInstitution (state, payload) {
    state.userInfo.institution = payload
  },
  setPosition (state, payload) {
    state.userInfo.position = payload
  },
  setLevel (state, payload) {
    state.userInfo.level = payload
  },
  cancelAllEdits (state) {
    state.editing = []
    let {city, company, dob, email, gender, institution, level, name, nationality, newsletter, password, phone, picture, position, status, username} = state.personalInfo
    let title = []
    state.personalInfo.title.forEach(v => {
      title.push(v)
    })
    let {stateOfOrigin} = state.personalInfo.state
    state.userInfo = {city, company, dob, email, gender, institution, level, name, nationality, newsletter, password, phone, picture, position, state: stateOfOrigin, status, title: title, username}
  },
  changesSaved (state) {
    state.editing = []
  }
}

export const actions = {
  async changeProfilePic ({state, commit}, payload) {
    commit('loading', true)
    let data = {}
    data.picture = payload
    data.user = state.id
    let profilePic = new FormData()
    profilePic.append('newPic', data.picture)
    profilePic.append('user', data.user)
    await axios.post('/changeProfilePic', profilePic)
      .then(res => {
        setTimeout(() => {
          commit('loading', false)
        }, 3000)
      })
  },
  async removeProfilePic ({state, commit}) {
    commit('loading', true)
    let user = {user: state.id}
    await axios.post('/changeProfilePic', user)
      .then(res => {
        setTimeout(() => {
          commit('loading', false)
        }, 3000)
      })
  },
  async saveChanges ({state, commit}) {
    commit('loading', true)
    await axios.patch('/saveUserInfo', {id: state.id, personalInfo: state.userInfo})
      .then(() => {
        commit('changesSaved')
        setTimeout(() => {
          commit('loading', false)
        }, 1500)
      })
  },
  async fetchPosts ({state, commit}) {
    await axios.get('/fetchPosts', {params: {user: state.personalInfo.username}})
      .then(res => {
        commit('populatePosts', res.data, {root: true})
      }).then(() => {
        commit('populatePostsCat', 'ALL', {root: true})
      })
  }
}
