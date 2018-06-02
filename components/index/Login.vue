<template>
<v-layout style="height: unset;" align-center justify-center wrap class="pb-3">
	<v-flex xs12 sm8>
			<v-alert transition="scale-transition" v-model="alert" color="info" icon="mdi-information">
				All fields are compulsory!
				<v-btn @click="alert = !alert" icon class="right">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<div>Already a member? click on the <strong>LOGIN</strong> button above.</div>
			</v-alert>
			<v-alert transition="scale-transition" v-model="registerAlert" color="success" icon="mdi-success">
				Voila! Successfully registered!!!
				<v-btn @click="registerAlert = !registerAlert" icon class="right">
				<v-icon>mdi-close</v-icon>
			</v-btn>
			</v-alert>
		</v-flex>
		<v-flex class="primary white--text" xs12 sm6>
			<v-card dark class="elevation-12" :img="require('~/assets/login.png')">
				<v-toolbar color="primary">
					<v-toolbar-title class="white--text headline">LOGIN FORM</v-toolbar-title>
				</v-toolbar>
				<div style="background: rgba(0,0,0,0.3)">
					<v-card-text>
						<v-form ref="form" class="pa-4">
							<v-layout row justify-space-around>
								<v-flex>
									<v-text-field hint="HINT: Variable1" color="secondary" prepend-icon="mdi-account-key" clearable
									              label="Username" v-model="user.login"/>
								</v-flex>
							</v-layout>
							<v-layout wrap justify-space-around>
								<v-flex>
									<v-text-field hint="HINT: Variable1@" color="secondary" type="password" prepend-icon="mdi-key" clearable
									              label="Password" v-model="user.password"/>
								</v-flex>
							</v-layout>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="secondary" @click="submit">submit</v-btn>
						<v-btn color="secondary" @click="recover">recover password</v-btn>
					</v-card-actions>
				</div>
			</v-card>
		</v-flex>
		</v-layout>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      alert: false,
      user: {
        login: null,
        password: null
      }
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      this.$store.dispatch('login', this.user)
    }
  },
  computed: {},
  mounted () {
    setTimeout(() => {
      this.alert = true
    }, 500)
  }
}
</script>

<style scoped>
</style>
