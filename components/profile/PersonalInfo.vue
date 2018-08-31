<template>
  <v-layout>
    <loader v-if="loading"/>
    <v-dialog v-model="dialog" persistent max-width="300">
      <v-btn id="diagBtn" style="display: none;" slot="activator" color="primary" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-title class="subheading">
          Are you sure you want to remove this profile picture?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">No</v-btn>
          <v-btn color="green darken-1" flat
                 @click.native="confirmRemoveProfilePic()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex xs12 sm8 offset-sm2 class="mb-3">
      <v-card v-if="userDetails">
        <v-snackbar class="mt-5" v-model="snackbar.status" top vertical :timeout="4000">
          {{ snackbar.text }}
          <v-btn color="pink" flat @click="snackbar.status = false">Close</v-btn>
        </v-snackbar>
        <v-flex style="margin:0 auto;" xs12 sm8 lg6>
          <input @change="processProfilePic()" ref="pickProfilePic"
                 id="changeProfilePic" style="display: none;" type="file"
                 accept="image/*">
          <v-card-media :src="userDetails.picture" height="300px">
            <div style="height: 100%;width: 100%;background: rgba(0,0,0,0.2)">
              <v-speed-dial class="right" direction="bottom" open-on-hover
                            transition="slide-x-reverse-transition">
                <v-btn @click.stop slot="activator" color="white" flat icon hover>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                <v-btn @click="changeProfilePic()" icon flat color="warning">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="removeProfilePic()" icon flat color="error">
                  <v-icon>mdi-delete-forever</v-icon>
                </v-btn>
              </v-speed-dial>
            </div>
          </v-card-media>
        </v-flex>
        <v-slide-y-transition>
          <v-card-title primary-title class="pt-2">
            <div style="height: fit-content; width:100%;">
              <!-- //Title -->
                <div class="title infos">
                    <v-layout class="justify-space-between">
                        <span>
                        Title(s): 
                        <span style="font-weight: 800;" v-for="title in userDetails.title" :key="title" class="grey--texts subheading">{{title}} </span>
                        </span>
                        <v-btn @click="editing.push('title')" icon flat>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-layout>
                </div>
                <div v-if="disabled === false || editing.includes('title')">
                  <v-layout style="width:100%;"
                            justify-space-between row
                            v-for="(title, i) in userDetails.title" :key="i">
                    <v-flex class="subheading pt-3 xs6">{{title}}</v-flex>
                    <v-flex class="xs6">
                      <v-btn @click="removeTitle(i)" flat fab color="primary">
                          <v-icon>mdi-minus-box</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                  <div style="position: relative;">
                    <v-select id="newTitle" style="width: 20%; display: inline-flex" :items="['Mr', 'Mrs', 'Miss', 'Dr', 'Engr']" label="Titles" outline/>
                    <v-btn style="position:absolute; left: 50%;"
                            @click="addTitle()" flat fab color="primary">
                      <v-icon>mdi-plus-box</v-icon>
                    </v-btn>
                  </div>
                </div>
                <!-- //Name -->
                <div class="title infos">
                    <v-layout class="justify-space-between">
                        <span>
                        Name: 
                        <v-text-field class="d-inline-block" v-model="userDetails.name" full-width
                        :disabled="disabled === true && !editing.includes('name')"/>
                        </span>
                        <v-btn @click="editing.push('name')" icon flat>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-layout>
                    <v-spacer></v-spacer>
                </div>
                <!-- //Email -->
                <div class="title infos">
                    <v-layout class="justify-space-between">
                        <span>
                        Email: 
                        <v-text-field class="d-inline-block" v-model="userDetails.email" full-width :disabled="disabled === true && !editing.includes('email')"/>
                        </span>
                        <v-btn @click="editing.push('email')" icon flat>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-layout>
                    <v-spacer></v-spacer>
                </div>
                <!-- //Phone -->
                <div class="title infos">
                    <v-layout class="justify-space-between">
                        <span>
                        Phone: 
                        <v-text-field class="d-inline-block" v-model="userDetails.phone" full-width :disabled="disabled === true && !editing.includes('phone')"/>
                        </span>
                        <v-btn @click="editing.push('phone')" icon flat>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-layout>
                    <v-spacer></v-spacer>
                </div>
                <span v-if="expand">
                  <!-- //Username -->
                  <div class="unchanged title infos">
                      <v-layout class="justify-space-between">
                          <span>
                          Username: 
                          <span class="grey--text d-inline-block">
                            {{userDetails.username}}
                          </span>
                          </span>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
                  <!-- //Gender -->
                  <div class="title infos">
                      <v-layout class="justify-space-between">
                          <span>
                          Gender: 
                          <v-text-field class="d-inline-block" v-model="userDetails.gender" full-width :disabled="disabled === true && !editing.includes('gender')"/>
                          </span>
                          <v-btn @click="editing.push('gender')" v-if="user.gender === ''" icon flat>
                              <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
                  <!-- //Dob -->
                  <div class="title infos">
                      <v-layout class="justify-space-between">
                          <span>
                          DoB: 
                          <v-text-field class="d-inline-block" v-model="userDetails.dob" full-width :disabled="disabled === true && !editing.includes('dob')"/>
                          </span>
                          <v-btn @click="editing.push('dob')" icon flat>
                              <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
                  <!-- //Nationality -->
                  <div class="unchanged title infos">
                      <v-layout class="justify-space-between">
                          <span>
                          Nationality: 
                          <span class="grey--text d-inline-block">
                            {{userDetails.nationality}}
                          </span>
                          </span>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
                  <!-- //State -->
                  <div class="unchanged title infos">
                      <v-layout class="justify-space-between">
                          <span>
                          State: 
                          <span class="grey--text d-inline-block">
                            {{userDetails.state}}
                          </span>
                          </span>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
                  <!-- //City -->
                  <div class="unchanged title infos">
                      <v-layout class="justify-space-between">
                          <span>
                          City: 
                          <span class="grey--text d-inline-block">
                            {{userDetails.city}}
                          </span>
                          </span>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
                  <!-- //Status -->
                  <div class="unchanged title infos">
                      <v-layout class="justify-space-between">
                          <span>
                          Status: 
                          <span class="grey--text d-inline-block">
                            {{userDetails.status}}
                          </span>
                          </span>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
                  <!-- //Company/Institution -->
                  <div class="title infos">
                      <v-layout class="justify-space-between">
                          <span v-if="user.status === 'Professional'">
                          Company: 
                          <v-text-field class="d-inline-block" v-model="userDetails.company" full-width :disabled="disabled === true && !editing.includes('company/institution')"/>
                          </span>
                          <span v-if="user.status === 'Student'">
                          Institution: 
                          <v-text-field class="d-inline-block" v-model="userDetails.institution" full-width :disabled="disabled === true && !editing.includes('company/institution')"/>
                          </span>
                          <v-btn @click="editing.push('company/institution')" icon flat>
                              <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
                  <!-- //Position/Level -->
                  <div class="title infos">
                      <v-layout class="justify-space-between">
                          <span v-if="user.status === 'Professional'">
                          Position: 
                          <v-text-field class="d-inline-block" v-model="userDetails.position" full-width :disabled="disabled === true && !editing.includes('position/level')"/>
                          </span>
                          <span v-if="user.status === 'Student'">
                          Level: 
                          <v-text-field class="d-inline-block" v-model="userDetails.level" full-width :disabled="disabled === true && !editing.includes('level')"/>
                          </span>
                          <v-btn @click="editing.push('position/level')" icon flat>
                              <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
              </span>
            </div>
          </v-card-title>
        </v-slide-y-transition>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="expand = !expand">
            <v-icon>{{ expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import io from 'socket.io-client'
import Loader from '~/components/Loader2'
export default {
  name: 'PersonalInfo',
  components: {
    Loader
  },
  data () {
    return {
      snackbar: {status: false, text: ''},
      userDetails: {},
      expand: false,
      dialog: false,
      disabled: true,
      editing: []
    }
  },
  methods: {
    changeProfilePic () {
      document.getElementById('changeProfilePic').click()
    },
    removeProfilePic () {
      if (this.user.picture !== 'http://byronbayphotographer.com/wp-content/uploads/2017/11/pleasing-mystery-clipart-person-pencil-and-in-color.jpg') {
        document.getElementById('diagBtn').click()
      }
    },
    confirmRemoveProfilePic () {
      this.dialog = false
      this.$store.dispatch('profile/removeProfilePic')
    },
    processProfilePic () {
      this.$store.dispatch('profile/changeProfilePic', this.$refs.pickProfilePic.files[0])
    },
    updateProfilePic () {
      io().on('profilePic', data => {
        this.$store.commit('profile/updateProfilePic', data.profilePic)
        let {profilePic, username} = data
        let user = {picture: profilePic, username: username}
        this.$cookie.set('userInfo', user, {path: '/', maxAge: 14400})
      })
    },
    addTitle () {
      let newTitle = document.getElementsByClassName('v-select__selection')[0]
      if (!newTitle) {
        this.snackbar.text = 'Invalid Selection!'
        this.snackbar.status = true
      } else if (this.userDetails.title.includes(newTitle.innerHTML)) {
        this.snackbar.text = 'No multiple of the same title!'
        this.snackbar.status = true
      } else {
        this.userDetails.title.push(newTitle.innerHTML)
      }
    },
    removeTitle (i) {
      this.userDetails.title.splice(i, 1)
    }
  },
  mounted () {
    setTimeout(() => {
      let {city, company, dob, email, gender, institution, level, name, nationality, newsletter, password, phone, picture, position, state, status, username} = this.user
      let title = []
      this.user.title.forEach(v => {
        title.push(v)
      })
      this.userDetails = {city, company, dob, email, gender, institution, level, name, nationality, newsletter, password, phone, picture, position, state, status, title: title, username}
    }, 200)
    this.updateProfilePic()
  },
  computed: {
    user: {
      get () {
        return this.$store.state.profile.userIn.personalInfo
      }
    },
    loading: {
      get () {
        return this.$store.state.profile.dialog
      }
    }
  }
}
</script>

<style scoped>
</style>

