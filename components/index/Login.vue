<template>
	<v-layout align-center justify-center wrap>
		<v-flex xs12 sm7>
			<v-alert transition="scale-transition" v-model="alert" type="info" dismissible>
				All fields are compulsory!
				<div>Not yet a member? click on the <strong>REGISTER</strong> button above.</div>
			</v-alert>
		</v-flex>
		<v-flex class="primary white--text" xs12 sm6>
			<v-card dark class="elevation-12" img="/images/login.jpg">
				<v-toolbar color="primary">
					<v-toolbar-title class="white--text headline">LOGIN FORM</v-toolbar-title>
				</v-toolbar>
				<div style="background: rgba(0,0,0,0.3)">
					<v-card-text>
						<v-form ref="form" class="pa-4">
							<v-layout row justify-space-around>
								<v-flex xs12 md6>
									<v-text-field hint="HINT: Variable1" color="secondary" prepend-icon="mdi-account-key" clearable
									              label="Username" v-model="login"/>
								</v-flex>
							</v-layout>
							<v-layout wrap justify-space-around>
								<v-flex xs12 md6>
									<v-text-field hint="HINT: Variable1@" color="secondary" type="password" prepend-icon="mdi-key" clearable
									              label="Password" v-model="password"/>
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
      login: null,
      password: null
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
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
