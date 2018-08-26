var mixin = {
  beforeMount () {
    if (this.$cookie.get('userInfo')) {
      this.$store.commit('profile/userIsLogged', true)
      console.log('yes')
    } else {
      this.$store.commit('profile/userIsLogged', false)
      console.log('no')
    }
  }
}
export default mixin
