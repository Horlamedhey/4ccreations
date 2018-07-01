<template>
<v-layout style="height: unset;" align-center justify-center wrap class="pb-3">
	<v-dialog persistent v-model="dialog.status" max-width="300">
      <v-card>
        <v-icon class="pa-3" :color="dialog.color" style="font-size:80px;margin-left:35%;">{{dialog.icon}}</v-icon>
        <v-btn v-if="dialog.color === 'error'" @click="dialog.status = false" icon flat class="right">
          <v-icon color="black">mdi-close</v-icon>
        </v-btn>
        <v-card-text class="headline text-xs-center">{{content}}</v-card-text>
      </v-card>
    </v-dialog>
	<v-flex xs12 sm8>
			<v-alert transition="scale-transition" v-model="alert" color="info" icon="mdi-information">
				All fields are compulsory!
				<v-btn @click="alert = !alert" icon class="right">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<div>Already a member? click on the <strong>LOGIN</strong> button above.</div>
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
									              label="Username" v-model="user.username"/>
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
						<!-- <v-btn color="secondary" @click="recover">recover password</v-btn> -->
					</v-card-actions>
				</div>
			</v-card>
		</v-flex>
		</v-layout>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  name: 'Login',
  data () {
    return {
      dialog: {status: false, color: 'error', icon: 'mdi-account-alert'},
      content: '',
      alert: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async submit () {
      let {username, password} = this.user
      let user = {username, password}
      await axios.post('/login', user)
        .then((res) => {
          console.log(res)
          if (res.data.status === 'error') {
            this.content = res.data.message
            this.dialog.color = 'error'
            this.dialog.icon = 'mdi-account-alert'
          } else if (res.data.token) {
            let data = JSON.stringify(res.data.token)
            this.$cookie.set('token', data, {path: '/', maxAge: 60 * 60 * 24})
            console.log(data)
            this.content = 'User Successfully Authenticated. Logging In...'
            this.dialog.color = 'success'
            this.dialog.icon = 'mdi-account-check'
            this.dialog.status = true
            setTimeout(() => {
              this.dialog.status = false
              this.$router.push('/profile')
            }, 2000)
          }
        })
        .catch(err => {
          console.log(err)
        })
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
