import axios from '~/plugins/axios'
export const state = () => ({
  dialog: false,
  // userData
  userIn: {},
  userIsLogged: false
})

export const mutations = {
  dialog (state) {
    state.dialog = !state.dialog
  },
  userIn (state, payload) {
    state.userIn = payload
    state.id = payload._id
  },
  //  checks if user is logged in
  userIsLogged (state, payload) {
    state.userIsLogged = payload
  },
  updateProfilePic (state, payload) {
    state.userIn.personalInfo.picture = payload
  }
}

export const actions = {
  async changeProfilePic ({state, commit}, payload) {
    commit('dialog')
    let data = {}
    data.picture = payload
    data.user = state.id
    let profilePic = new FormData()
    profilePic.append('newPic', data.picture)
    profilePic.append('user', data.user)
    await axios.post('/changeProfilePic', profilePic)
      .then(res => {
        setTimeout(() => {
          commit('dialog')
        }, 3000)
      })
  },
  async removeProfilePic ({state, commit}) {
    commit('dialog')
    let user = {user: state.id}
    await axios.post('/changeProfilePic', user)
      .then(res => {
        setTimeout(() => {
          commit('dialog')
        }, 3000)
      })
  }
}
