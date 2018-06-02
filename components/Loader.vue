<template>
<div class="loader" v-if="loader">
	<v-layout justify-center align-center>
		<v-progress-circular
				indeterminate
				color="accent"
				size="80"
		/>
	</v-layout>
</div>
</template>

<script>
export default {
  name: 'Loader',
  data () {
    return {}
  },
  beforeDestroy () {},
  mounted () {},
  computed: {
    loader: {
      get () {
        return this.$store.state.loader
      }
    }
  }
}
</script>

<style scoped>
</style>
