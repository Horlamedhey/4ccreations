export const state = () => ({
  // profile page
  mobileProf: false,
  //  home page
  index: 'Home',
  content: false
})

export const mutations = {
  content (state) {
    state.content = true
  }
}
