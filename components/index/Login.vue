<template>
<v-layout style="height: unset;" align-center justify-center wrap class="pb-3">
  <v-dialog persistent v-model="dialog.status" max-width="400">
      <v-card>
        <v-icon class="pa-3" :color="dialog.color" style="font-size:80px;margin-left:35%;">{{dialog.icon}}</v-icon>
        <v-btn @click="dialog.status = false" icon flat class="right">
          <v-icon color="black">mdi-close</v-icon>
        </v-btn>
        <v-card-text class="headline text-xs-center">{{dialog.content}}</v-card-text>
        <v-card-actions>
          <v-layout justify-space-around>
            <v-btn color="green darken-1" flat @click="$store.commit('default/index', 'Home')">BACK TO HOME?</v-btn>
            <v-btn v-if="dialog.color !== 'error'" color="green darken-1" flat
                   @click="$router.push('/profile')">PROCEED TO PROFILE?
            </v-btn>
          </v-layout>
        </v-card-actions>
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
			<v-card dark class="elevation-12" :img="require('~/assets/login.webp')">
				<v-toolbar color="primary">
					<v-toolbar-title class="white--text headline">LOGIN FORM</v-toolbar-title>
				</v-toolbar>
				<div style="background: rgba(0,0,0,0.3)">
					<v-card-text>
						<v-form ref="form" class="pa-4">
							<v-layout row justify-space-around>
								<v-flex>
									<v-text-field id="username" solo-inverted hint="HINT: Variable1" color="secondary" prepend-icon="mdi-account-key" clearable
									              placeholder="Username" v-model="user.username"/>
								</v-flex>
							</v-layout>
							<v-layout wrap justify-space-around>
								<v-flex>
									<v-text-field id="password" solo-inverted hint="HINT: Variable1@" color="secondary" type="password" prepend-icon="mdi-key" clearable
									              placeholder="Password" v-model="user.password"/>
								</v-flex>
							</v-layout>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn id="submit" color="secondary" @click="submit">submit</v-btn>
						<!-- <v-btn color="secondary" @click="recover">recover password</v-btn> -->
					</v-card-actions>
				</div>
			</v-card>
		</v-flex>
		</v-layout>
</template>

<script>
// import axios from '~/plugins/axios'
// import io from 'socket.io-client'
export default {
  name: 'Login',
  data () {
    return {
      dialog: {status: false, color: 'error', icon: 'mdi-account-alert', content: ''},
      alert: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    navigate () {
      document.getElementById('username').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          document.getElementById('password').focus()
        }
      })
      document.getElementById('password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          if (document.getElementById('username').value !== '') {
            document.getElementById('submit').click()
          } else {
            document.getElementById('username').focus()
          }
        }
      })
    },
    async submit () {
      if (this.user.username === '' || this.user.username === null || this.user.password === '' || this.user.password === null) {
        this.dialog.content = 'Please fill all fields!'
        this.dialog.color = 'error'
        this.dialog.icon = 'mdi-account-alert'
        this.dialog.status = true
      } else {
        try {
          await this.$auth.loginWith('local', { data: {
            username: this.user.username.toLowerCase(),
            password: this.user.password
          } }).then(() => {
            this.dialog.content = 'User Successfully Authenticated. Logging In...'
            this.dialog.color = 'success'
            this.dialog.icon = 'mdi-account-check'
            this.dialog.status = true
          })
        } catch (e) {
          this.dialog.content = e.response.data
          this.dialog.color = 'error'
          this.dialog.icon = 'mdi-account-alert'
          this.dialog.status = true
        }
      }
    },
    closeDialog () {
      this.dialog.status = false
      if (this.dialog.content === 'Login failed. User not found.') {
        this.$store.commit('default/index', 'Register')
      }
    }
  },
  computed: {},
  mounted () {
    this.navigate()
    setTimeout(() => {
      this.alert = true
    }, 500)
  }
}
</script>

<style scoped>
</style>
