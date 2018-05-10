import axios from '~/plugins/axios'
export const state = () => ({
  loader: true,
  index: 'Home',
  trends: [],
  locations: null,
  countries: [],
  nationality: null,
  staleStates: null,
  states: [],
  state: null,
  cities: [],
  city: null,
  addCity: null,
  id: null
})

export const mutations = {
  loader (state) {
    state.loader = false
  },
  populateTrends (state, data) {
    state.trends = data
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
        .patch(`http://localhost:3001/countries/${state.id}`, state.addCity)
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
  async fetchTrends ({ commit }) {
    await axios
      .get('http://localhost:3003/trends')
      .then(result => {
        let data = result.data
        commit('populateTrends', data)
        console.log('Fetch ok')
      })
      .catch(err => {
        console.log(err)
      })
  },
  async fetchLocation ({ commit }) {
    await axios
      .get('http://localhost:3001/countries')
      .then(result => {
        let data = result.data
        commit('fetchLocation', data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
