<template>
	<keep-alive>
		<component :is="component"></component>
	</keep-alive>
</template>

<script>
import Home from '~/components/index/Home'
import Register from '~/components/index/Register'
import Login from '~/components/index/Login'
export default {
  name: 'index',
  components: {
    Home,
    Register,
    Login
  },
  computed: {
    component: {
      get () {
        return this.$store.state.index
      }
    }
  },
  beforeMount () {}
}
</script>

<style scoped>
</style>
