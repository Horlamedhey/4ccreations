var mixin = {
  beforeMount () {
    if (this.$cookie.get('userInfo')) {
      this.$store.commit('userIsLogged', true)
      console.log('yes')
    } else {
      this.$store.commit('userIsLogged', false)
      console.log('no')
    }
  }
}
export default mixin
