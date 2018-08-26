/* eslint-disable */
<template>
<div class="text-xs-center">
	<v-dialog
      v-model="dialog"
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text class="text-xs-center">
		<v-progress-circular
				indeterminate
				color="accent"
				size="80"
		/>
        </v-card-text>
        <v-card-text class="text-xs-center">
          {{message}}
        </v-card-text>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
  name: 'Loader',
  props: ['message'],
  data () {
    return {
      dialog: true
    }
  },
  beforeDestroy () {},
  mounted () {},
  computed: {
    // loader: {
    //   get () {
    //     return this.$store.state.loader
    //   }
    // }
  }
}
</script>

<style scoped>
</style>
