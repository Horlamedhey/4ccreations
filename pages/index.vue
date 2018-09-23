<template>
<v-container style="padding:0;" fluid :fill-height="component !== 'Home'">
    <slider/>
    <keep-alive>
      <component :is="component"></component>
    </keep-alive>
		</v-container>
</template>

<script>
import Slider from '~/components/index/Slider'
import Home from '~/components/index/Home'
import Register from '~/components/index/Register'
import Login from '~/components/index/Login'
export default {
  name: 'index',
  components: {
    Slider,
    Home,
    Register,
    Login
  },
  mixins: [],
  computed: {
    component: {
      get () {
        return this.$store.state.default.index
      }
    }
  },
  beforeCreate () {
    // this.$store.dispatch('fetchLocation')
  }
}
</script>

<style scoped>
</style>
