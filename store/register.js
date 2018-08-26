import axios from '~/plugins/axios'
export const state = () => ({
  // location
  id: {},
  locations: null,
  countries: [],
  nationality: null,
  states: [],
  state: null,
  cities: [],
  city: null,
  addCity: {id: {}}
})

export const mutations = {
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
        state.id.country = v._id
        state.states = []
        v.States.forEach(u => {
          state.states.push(u.StateName)
        })
      }
    })
  },
  stat (state, data) {
    state.state = data
    state.locations.forEach(v => {
      v.States.forEach(u => {
        if (u.StateName === state.state) {
          state.id.state = u._id
          state.cities = []
          u.Cities.forEach(w => {
            state.cities.push(w)
          })
        }
      })
    })
  },
  cit (state, data) {
    if (data && data.length > 0) {
      data = data.charAt(0).toUpperCase() + data.slice(1)
    }
    if (state.state !== null) {
      state.city = data
    }
    if (!state.cities.includes(state.city) &&
      state.state !== null &&
      state.city !== null && state.city
    ) {
      state.locations.forEach(u => {
        u.States.forEach(w => {
          if (w._id === state.id.state) {
            state.addCity.id.country = state.id.country
            state.addCity.id.state = state.id.state
            state.addCity.newCity = state.city
          }
        })
      })
      axios
        .patch('/location', state.addCity)
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
