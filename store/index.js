export const state = () => ({
  sidebar: false,
  index: 'Home',
  trends: []
})

export const mutations = {
  populateTrends (state, data) {
    state.trends = data
  },
  index (state, component) {
    state.index = component
  }
}
