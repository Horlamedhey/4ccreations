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
		<v-flex class="primary white--text" xs12 sm10>
			<v-card dark class="elevation-12" :img="require('~/assets/welcome.png')">
				<v-toolbar color="primary">
					<v-toolbar-title class="white--text headline">REGISTERATION FORM</v-toolbar-title>
				</v-toolbar>
				<div style="background: rgba(0,0,0,0.3)">
				<v-card-text>
					<v-form ref="form" class="pa-4">
						<v-layout wrap row justify-space-between>
							<v-flex xs12 md4>
								<v-select hint="HINT: Mr, Dr" color="secondary" tags open-on-clear autocomplete deletable-chips dense editable clearable
								          chips no-data-text="Invalid selection"
								           label="Title" v-model="user.title" :items="titles" multiple
								            :error-messages="titleErrors" @change="$v.user.title.$touch()"
								            @blur="$v.user.title.$touch()" append-icon="mdi-chevron-down"/>
							</v-flex>
							<v-flex xs12 md8>
								<v-text-field autocomplete hint="HINT: Gafar Olamide Ajao" color="secondary" prepend-icon="mdi-account" clearable
								               label="Name" v-model="user.name" :error-messages="nameErrors"
								               @input="$v.user.name.$touch()"
								              @blur="$v.user.name.$touch()"
								             />
							</v-flex>
						</v-layout>
						<v-layout wrap row justify-space-between>
							<v-flex xs12 md6>
								<v-text-field autocomplete hint="HINT: Variable1" color="secondary" prepend-icon="mdi-account-key" clearable label="Username" v-model="user.username" :error-messages="usernameErrors"
								               :counter="10" @input="$v.user.username.$touch()"
								              @blur="$v.user.username.$touch()"
								             />
							</v-flex>
							<v-flex xs12 md5>
								<v-text-field autocomplete hint="HINT: 08134549552, +2348134549552" color="secondary" type="tel" prepend-icon="mdi-phone" clearable
                              label="Phone" v-model="user.phone" :error-messages="phoneErrors"
                              :counter="14" @blur="$v.user.phone.$touch()"/>
							</v-flex>
						</v-layout>
            <v-layout row wrap justify-space-between>
              <v-flex xs12 md7>
						<v-text-field autocomplete hint="HINT: Horlasco34@gmail.com" prepend-icon="mdi-email" color="secondary" 
                          clearable label="E-mail" v-model="user.email"
						              :error-messages="emailErrors" @blur="$v.user.email.$touch()"
						             />
              </v-flex>
	            <v-flex xs12 md4>
		            <v-radio-group  :error-messages="statusErrors" label="Status" prepend-icon="mdi-briefcase-check" v-model="user.status" row>
			            <v-radio color="secondary" label="Professional" value="Professional" ></v-radio>
			            <v-radio color="secondary" label="Student" value="Student"></v-radio>
		            </v-radio-group>
              </v-flex>
            </v-layout>
            <v-layout wrap row justify-space-between>
							<v-flex xs12 md6>
								<v-text-field autocomplete hint="HINT: Variable1@" color="secondary" type="password" prepend-icon="mdi-lock" label="Password" v-model="user.password" :error-messages="passwordErrors"
								              :counter="8" @blur="$v.user.password.$touch()" @input="$v.user.password.$touch()"
                               :append-icon="passIcon ? 'mdi-eye' : 'mdi-eye-off'" :append-icon-cb="() => {if (user.password !== ''){passIcon = !passIcon}}" :type="passIcon ? 'password' : 'text'"/>
							</v-flex>
							<v-flex xs12 md5>
								<v-text-field autocomplete prepend-icon="mdi-lock-question" color="secondary" type="password"
                              label="Confirm password" v-model="user.confirmPassword" :error-messages="confirmPasswordErrors"
                               @input="$v.user.confirmPassword.$touch()" @blur="$v.user.confirmPassword.$touch()"
                              :append-icon="cpassIcon ? 'mdi-eye' : 'mdi-eye-off'"
                              :append-icon-cb="() => {if (user.confirmPassword !== ''){cpassIcon = !cpassIcon}}" :type="cpassIcon ? 'password' : 'text'"/>
							</v-flex>
						</v-layout>
						<v-layout wrap row justify-space-between>
							<v-flex xs12 md3 class="pt-3 pb-4">
								<v-select prepend-icon="mdi-flag-variant" color="secondary" solo-inverted open-on-clear autocomplete dense clearable
								          no-data-text="Invalid selection"
								          label="Nationality" v-model="user.nationality" :items="countries"
								          :error-messages="nationalityErrors" @change="reactivity"
								          @blur="$v.user.nationality.$touch()" append-icon="mdi-chevron-down"
								          @input="$store.commit('nationalit', user.nationality)"/>
							</v-flex>
							<v-flex xs12 md3 class="pt-3 pb-4">
								<v-select solo-inverted prepend-icon="mdi-map" color="secondary" open-on-clear autocomplete dense clearable
								          no-data-text="Invalid selection" @input="$store.commit('stat', user.state)"
								          label="State" v-model="user.state" :items="states" item-text="StateName"
								          :error-messages="stateErrors" @change="$v.user.state.$touch()"
								          @blur="$v.user.state.$touch()" append-icon="mdi-chevron-down"/>
							</v-flex>
							<v-flex xs12 md3 class="pt-3 pb-4">
								<v-select solo-inverted prepend-icon="mdi-map-marker" color="secondary" open-on-clear autocomplete 
								          dense clearable editable chips deletable-chips combobox no-data-text="Invalid selection"
								          label="City" v-model="user.city" :items="cities" @focus="deboun()"
								          :error-messages="cityErrors" @input="$store.commit('cit', user.city)"
								          @blur="$v.user.city.$touch()" append-icon="mdi-chevron-down"/>
							</v-flex>
						</v-layout>
						<v-layout>
							<v-flex xs12 md6>
								<v-checkbox style="font-size:200px;" color="secondary" prepend-icon="mdi-email-open-outline"
								            label="Subscribe to newsletters?" v-model="user.newsletter"
								/>
							</v-flex>
						</v-layout>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="secondary" @click="submit">submit</v-btn>
					<v-btn color="secondary" @click="clear">clear</v-btn>
				</v-card-actions>
				</div>
			</v-card>
		</v-flex>
	</v-layout>
</template>
countries
<script>
import axios from '~/plugins/axios'
import { validationMixin } from 'vuelidate'
import {
  required,
  maxLength,
  minLength,
  email,
  numeric,
  alpha,
  sameAs,
  alphaNum
} from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    user: {
      title: { required },
      name: { required, alpha },
      username: { required, maxLength: maxLength(10) },
      phone: {
        required,
        maxLength: maxLength(14),
        minLength: minLength(11),
        numeric
      },
      email: { required, email },
      status: { required },
      password: {
        required,
        minLength: minLength(8),
        alphaNum
      },
      confirmPassword: { required, sameAsPassword: sameAs('password') },
      nationality: { required },
      state: { required },
      city: { required }
    }
  },
  name: 'Register',
  data () {
    return {
      passIcon: true,
      cpassIcon: true,
      alert: false,
      registerAlert: false,
      titles: ['Mr', 'Mrs', 'Miss', 'Dr', 'Engr'],
      user: {
        id: null,
        title: [],
        name: '',
        username: '',
        phone: '',
        email: '',
        status: null,
        password: '',
        confirmPassword: '',
        nationality: null,
        state: null,
        city: null,
        newsletter: false
      }
    }
  },
  methods: {
    reactivity () {
      this.$v.user.nationality.$touch()
      this.user.state = null
      this.user.city = null
      this.$store.commit('empty')
    },
    async submit () {
      this.$v.$touch()
      if (
        this.titleErrors.length > 0 ||
        this.nameErrors.length > 0 ||
        this.usernameErrors.length > 0 ||
        this.phoneErrors.length > 0 ||
        this.emailErrors.length > 0 ||
        this.statusErrors.length > 0 ||
        this.passwordErrors.length > 0 ||
        this.confirmPasswordErrors.length > 0 ||
        this.nationalityErrors.length > 0 ||
        this.stateErrors.length > 0 ||
        this.cityErrors.length > 0
      ) {
        console.log('error')
      } else {
        let {
          id,
          title,
          name,
          username,
          phone,
          email,
          status,
          password,
          nationality,
          state,
          city,
          newsletter
        } = this.user
        let user = {
          id,
          title,
          name,
          username,
          phone,
          email,
          status,
          password,
          nationality,
          state,
          city,
          newsletter
        }
        await axios
          .post('http://localhost:3003/users', user)
          .then(() => {
            this.registerAlert = true
            setTimeout(() => {
              this.registerAlert = false
            }, 5000)
          })
          .then(() => {
            setTimeout(() => {
              this.$store.commit('index', 'Login')
            }, 5000)
          })
          .then(() => {
            this.$v.$reset()
            this.user.name = ''
            this.user.email = ''
            this.user.title = []
            this.user.username = ''
            this.user.password = ''
            this.user.confirmPassword = ''
            this.user.phone = ''
            this.user.status = null
            this.user.nationality = null
            this.user.state = null
            this.user.city = null
            this.user.newsletter = false
            this.passIcon = true
            this.cpassIcon = true
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    clear () {
      this.$v.$reset()
      this.user.name = ''
      this.user.email = ''
      this.user.title = []
      this.user.username = ''
      this.user.password = ''
      this.user.confirmPassword = ''
      this.user.phone = ''
      this.user.status = null
      this.user.nationality = null
      this.user.state = null
      this.user.city = null
      this.user.newsletter = false
      this.passIcon = true
      this.cpassIcon = true
    }
  },
  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.user.title.$dirty) return errors
      !this.$v.user.title.required && errors.push('Title cannot be empty')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.user.name.$dirty) return errors
      !this.$v.user.name.required && errors.push('Name is required.')
      !this.$v.user.name.alpha && errors.push('Can contain only alphabets')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.user.username.$dirty) return errors
      !this.$v.user.username.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.user.username.required && errors.push('Username is required.')
      if (/\s/.test(this.user.username)) {
        errors.push('Space character is not allowed')
      }
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.user.phone.$dirty) return errors
      !this.$v.user.phone.maxLength &&
        errors.push('Name must be at most 14 characters long')
      !this.$v.user.phone.minLength &&
        errors.push('Name must be at least 11 characters long')
      !this.$v.user.phone.required && errors.push('Phone is required.')
      !this.$v.user.phone.numeric && errors.push('Must be valid phone')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.user.email.$dirty) return errors
      !this.$v.user.email.email && errors.push('Must be valid e-mail')
      !this.$v.user.email.required && errors.push('E-mail is required')
      return errors
    },
    statusErrors () {
      const errors = []
      if (!this.$v.user.status.$dirty) return errors
      !this.$v.user.status.required && errors.push('Status cannot be empty')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.user.password.$dirty) return errors
      !this.$v.user.password.minLength && errors.push('Password is too short')
      !this.$v.user.password.required && errors.push('Password is required')
      !this.$v.user.password.alphaNum &&
        errors.push(
          'Password must contain at least one UPPERCASE, lowercase and special character'
        )
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.user.confirmPassword.$dirty) return errors
      !this.$v.user.confirmPassword.sameAsPassword &&
        errors.push('Password does not match')
      !this.$v.user.confirmPassword.required &&
        errors.push('Password does not match')
      return errors
    },
    nationalityErrors () {
      const errors = []
      if (!this.$v.user.nationality.$dirty) return errors
      !this.$v.user.nationality.required &&
        errors.push('You must choose one NATION')
      return errors
    },
    stateErrors () {
      const errors = []
      if (!this.$v.user.state.$dirty) return errors
      !this.$v.user.state.required && errors.push('You must choose one STATE')
      return errors
    },
    cityErrors () {
      const errors = []
      if (!this.$v.user.city.$dirty) return errors
      !this.$v.user.city.required && errors.push('You must choose one City')
      return errors
    },
    countries: {
      get () {
        return this.$store.state.countries
      }
    },
    states: {
      get () {
        return this.$store.state.states
      }
    },
    cities: {
      get () {
        return this.$store.state.cities
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.alert = true
    }, 500)
  }
}
</script>
