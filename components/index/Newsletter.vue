<template>
	<v-layout row justify-center>
		<v-dialog v-model="newsletter" persistent max-width="500px">
			<v-btn @click="clear()" id="newsletter" style="opacity: 0;" class="newsletter" fab slot="activator"/>
			<v-card>
				<v-card-actions style="position: absolute;z-index: 99;right: 0;">
				<v-btn @click.native="newsletter = false" right icon color="primary">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				</v-card-actions>
				<v-toolbar color="accent">
					<v-toolbar-title>Subscribe to our Newsletter</v-toolbar-title>
				</v-toolbar>
				<v-card-text>
					<v-container>
						<v-layout>
							<v-flex>
								<v-text-field v-model="email" :error-messages="emailError" @blur="check()" prepend-icon="mdi-email" clearable label="E-mail"/>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="subscribe()" color="accent">
						Subscribe
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
export default {
  name: 'Newsletter',
  data () {
    return {
      newsletter: false,
      email: '',
      emailError: []
    }
  },
  methods: {
    clear () {
      this.email = ''
      this.emailError = []
    },
    check () {
      if (
        !this.email.includes('@') ||
        !this.email.includes('.com') ||
        this.email === ''
      ) {
        this.emailError = 'please input a valid email address'
        return false
      } else {
        this.emailError = []
        return true
      }
    },
    subscribe () {
      if (this.check()) {
        let email = this.email
        this.$store.commit('submitEmail', email)
        this.newsletter = false
      }
    }
  }
}
</script>

<style scoped>
</style>
