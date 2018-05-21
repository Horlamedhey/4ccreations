<template>
	<v-layout>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque error
		excepturi illo illum nesciunt odit placeat quisquam reiciendis,
		sunt veritatis. Animi at dignissimos et modi quae quaerat quos repellat totam!
	</v-layout>
</template>

<script>
export default {
  name: 'profile',
  mounted () {
    this.$store.commit('index', '')
    let t = setInterval(() => {
      if (document.readyState === 'complete') {
        this.$store.commit('loader')
        clearInterval(t)
      }
    }, 3000)
  }
}
</script>

<style scoped>
</style>
