// import axios from '~/plugins/axios'
export const state = () => ({
  loader: false,
  dialog: {status: false, color: 'error', icon: 'mdi-account-alert', content: 'User not logged in.'},
  // userData
  editing: [],
  userInfo: {}
  //  user's portfolio
})

export const mutations = {
  loading (state, payload) {
    state.loader = payload
  },
  collectData (state) {
    let {city, company, dob, email, gender, institution, level, name, nationality, newsletter, password, phone, picture, position, status, username} = this.$auth.user.userData
    let title = []
    this.$auth.user.userData.title.forEach(v => {
      title.push(v)
    })
    state.userInfo = {city, company, dob, email, gender, institution, level, name, nationality, newsletter, password, phone, picture, position, state: this.$auth.user.userData.state, status, title: title, username}
  },
  dialog (state, payload) {
    state.dialog.content = payload
    state.dialog.status = true
  },
  updateProfilePic (state, payload) {
    this.$auth.user.userData.picture = payload
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
    let {city, company, dob, email, gender, institution, level, name, nationality, newsletter, password, phone, picture, position, status, username} = this.$auth.user.userData
    let title = []
    this.$auth.user.userData.title.forEach(v => {
      title.push(v)
    })
    let {stateOfOrigin} = this.$auth.user.userData.state
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
    data.user = this.$auth.user.id
    let profilePic = new FormData()
    profilePic.append('newPic', data.picture)
    profilePic.append('user', data.user)
    await this.$axios.post('/user/changeProfilePic', profilePic)
    setTimeout(() => {
      commit('loading', false)
    }, 3000)
  },
  async removeProfilePic ({commit}) {
    commit('loading', true)
    let user = {user: this.$auth.user.id}
    await this.$axios.post('user/changeProfilePic', user)
    setTimeout(() => {
      commit('loading', false)
    }, 3000)
  },
  async saveChanges ({state, commit}) {
    commit('loading', true)
    await this.$axios.patch('user/saveUserInfo', {id: this.$auth.user.id, personalInfo: state.userInfo})
    commit('changesSaved')
    setTimeout(() => {
      commit('loading', false)
    }, 1500)
  },
  async fetchPosts ({state, commit}) {
    let res = await this.$axios.$get('/fetchPosts', {params: {user: this.$auth.user.userData.username}})
    await commit('populatePosts', res, {root: true})
    await commit('populatePostsCat', 'ALL', {root: true})
  }
}
