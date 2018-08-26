export const state = () => ({
  // profile page
  mobileProf: false,
  //  home page
  index: 'Home'
})

export const mutations = {
  mobileProf (state, payload) {
    state.mobileProf = payload
  },
  index (state, component) {
    state.index = component
  }
}
