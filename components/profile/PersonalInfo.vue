<template>
  <v-layout>
    <v-dialog v-model="dialog.status" persistent max-width="300">
      <v-btn id="diagBtn" style="display: none;" slot="activator" color="primary" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-text class="subheading">
          {{dialog.message}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog.status = false">No</v-btn>
          <v-btn color="green darken-1" flat
                 @click.native="confirmRemoveProfilePic()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2.status" persistent max-width="300">
      <v-btn id="diagBtn2" style="display: none;" slot="activator" color="primary" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-text class="subheading">
          {{dialog2.message}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog2.status = false">No</v-btn>
          <v-btn color="green darken-1" flat
                 @click="confirmCancelAllEdits()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3.status" persistent max-width="300">
      <v-btn id="diagBtn3" style="display: none;" slot="activator" color="primary" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-text class="subheading">
          {{dialog3.message}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog3.status = false">No</v-btn>
          <v-btn color="green darken-1" flat
                 @click="confirmSaveChanges()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex xs12 sm8 offset-sm2 class="mb-3">
      <v-card>
        <div v-if="editing.length > 0">
          <v-tooltip left color="primary">
            <v-btn small slot="activator" @click="saveChanges()"
                   class="scaleIn save" fab color="accent">
              <v-icon color="primary">mdi-content-save-all</v-icon>
            </v-btn>
            <span>Save All</span>
          </v-tooltip>
          <v-tooltip left color="primary">
            <v-btn small slot="activator" @click="cancelAllEdits()"
                   class="scaleIn cancel" fab color="warning">
              <v-icon color="primary">mdi-close</v-icon>
            </v-btn>
            <span>Cancel</span>
          </v-tooltip>
        </div>
        <v-snackbar class="mt-5" v-model="snackbar.status" top vertical :timeout="5000">
          {{ snackbar.text }}
          <v-btn color="pink" flat @click="snackbar.status = false">Close</v-btn>
        </v-snackbar>
        <v-flex style="margin:0 auto;" xs12 sm8 lg6>
          <input @change="processProfilePic()" ref="pickProfilePic"
                 id="changeProfilePic" style="display: none;" type="file"
                 accept="image/*">
          <v-img alt="profile picture" contain :src="picture"
                 height="300px"
                 lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-qKxv_sDOMxYNz_-yYrwElcOVIyj9qusYZ0Nd-4y6QSVMkpi&reload=on">
            <v-layout slot="placeholder" fill-height align-center justify-center
                      ma-0>
              <v-progress-circular indeterminate color="grey lighten-5">
              </v-progress-circular>
            </v-layout>
            <div style="height: 100%;width: 100%;background: rgba(0,0,0,0.2)">
              <v-speed-dial style="z-index:99;" class="right" direction="bottom"
                            open-on-hover
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
          </v-img>
        </v-flex>
        <v-slide-y-transition>
          <v-card-title primary-title class="pt-2">
            <div style="height: fit-content; width:100%;">
              <!-- //Title -->
                <div class="title infos">
                    <v-layout class="justify-space-between">
                        <span>
                        Title(s): 
                        <span style="font-weight: 800;" v-for="title in titles" :key="title" class="grey--texts subheading">{{title}} </span>
                        </span>
                        <v-btn @click="edit('title')" icon flat>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-layout>
                </div>
                <div v-if="editing.includes('title')">
                  <v-layout style="width:100%;"
                            justify-space-between row
                            v-for="(title, i) in titles" :key="i">
                    <v-flex class="subheading pt-3 xs6">{{title}}</v-flex>
                    <v-flex class="xs6">
                      <v-btn @click="removeTitle(i)" flat fab color="primary">
                          <v-icon>mdi-minus-box</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                  <div style="position: relative;">
                    <v-select v-model="titles" id="newTitle" style="width: 20%; display: inline-flex" :items="['Mr', 'Mrs', 'Miss', 'Dr', 'Engr']" label="Titles" outline/>
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
                        <v-text-field :rules="[rules.required]" :outline="editing.includes('name')" class="d-inline-block" v-model="name" full-width
                        :disabled="!editing.includes('name')"/>
                        </span>
                        <v-btn @click="edit('name')" icon flat>
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
                        <v-text-field type="email" :rules="[rules.email, rules.required]" :outline="editing.includes('email')" class="d-inline-block" v-model="email" full-width :disabled="!editing.includes('email')"/>
                        </span>
                        <v-btn @click="edit('email')" icon flat>
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
                        <v-text-field type="tel" :rules="[rules.required]" :outline="editing.includes('phone')" class="d-inline-block" v-model="phone" full-width :disabled="!editing.includes('phone')"/>
                        </span>
                        <v-btn @click="edit('phone')" icon flat>
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
                            {{username}}
                          </span>
                          </span>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
                  <!-- //Gender -->
                  <div class="title infos mb-5">
                      <v-layout class="justify-space-between">
                          <span>
                          Gender: 
                          <span class="grey--text">{{gender}}</span>
                          <v-radio-group column v-model="gender"
                                         v-if="editing.includes('gender')">
                            <v-radio label="male" value="male"></v-radio>
                            <v-radio label="female" value="female"></v-radio>
                          </v-radio-group>
                          </span>
                          <v-btn @click="edit('gender')" v-if="gender === ''" icon flat>
                              <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
                  <!-- //Dob -->
                  <div class="title infos mb-5">
                      <v-layout class="justify-space-between">
                          <span>
                          DoB: 
                          <span class="grey--text">{{dob}}</span>
                          <v-flex>
                          <v-date-picker scrollable color="secondary" width="220" v-if="editing.includes('dob')"
                                         v-model="dob" portrait reactive>
                          </v-date-picker>
                          </v-flex>
                          </span>
                          <v-btn @click="edit('dob')" v-if="dob === ''" icon flat>
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
                            {{nationality}}
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
                            {{state}}
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
                            {{city}}
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
                            {{status}}
                          </span>
                          </span>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
                  <!-- //Company/Institution -->
                  <div class="title infos">
                      <v-layout class="justify-space-between">
                          <span v-if="status === 'Professional'">
                          Company: 
                          <v-text-field :rules="[rules.required]" :outline="editing.includes('company/institution')" class="d-inline-block" v-model="company" full-width :disabled="!editing.includes('company/institution')"/>
                          </span>
                          <span v-if="status === 'Student'">
                          Institution: 
                          <v-text-field :rules="[rules.required]" :outline="editing.includes('company/institution')" class="d-inline-block" v-model="institution" full-width :disabled="!editing.includes('company/institution')"/>
                          </span>
                          <v-btn @click="edit('company/institution')" icon flat>
                              <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                      </v-layout>
                      <v-spacer></v-spacer>
                  </div>
                  <!-- //Position/Level -->
                  <div class="title infos">
                      <v-layout class="justify-space-between">
                          <span v-if="status === 'Professional'">
                          Position: 
                          <v-text-field :rules="[rules.required]" :outline="editing.includes('position/level')" class="d-inline-block" v-model="position" full-width :disabled="!editing.includes('position/level')"/>
                          </span>
                          <span v-if="status === 'Student'">
                          Level: 
                          <v-text-field :rules="[rules.required]" :outline="editing.includes('position/level')" class="d-inline-block" v-model="level" full-width :disabled="!editing.includes('position/level')"/>
                          </span>
                          <v-btn @click="edit('position/level')" icon flat>
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
import axios from '~/plugins/axios'
import io from 'socket.io-client'
export default {
  name: 'PersonalInfo',
  components: {
  },
  data () {
    return {
      snackbar: {status: true, text: 'All non-editable details can be edited by contacting the support team through the "Account Settings" section.'},
      expand: false,
      dialog: {status: false, message: 'Are you sure you want to remove this profile picture?'},
      dialog2: {status: false, message: 'Are you sure you want to cancel all edits?'},
      dialog3: {status: false, message: 'Are you sure you want to save all changes?'},
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    async profileAuth () {
      await axios.get('/profileAuth')
        .then(res => {
          if (res.data.auth === false) {
            this.$store.commit('profile/dialog', res.data.message)
          } else {
            res.data.userData.id = res.data.userId
            this.$store.commit('profile/personalInfo', res.data.userData)
          }
        })
    },
    changeProfilePic () {
      document.getElementById('changeProfilePic').click()
    },
    removeProfilePic () {
      if (this.picture !== 'http://byronbayphotographer.com/wp-content/uploads/2017/11/pleasing-mystery-clipart-person-pencil-and-in-color.jpg') {
        document.getElementById('diagBtn').click()
      }
    },
    confirmRemoveProfilePic () {
      this.dialog.status = false
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
    edit (arg) {
      this.$store.commit('profile/editing', arg)
    },
    addTitle () {
      let newTitle = document.getElementsByClassName('v-select__selection')[0]
      if (!newTitle) {
        this.snackbar.text = 'Invalid Selection!'
        this.snackbar.status = true
      } else if (this.titles.includes(newTitle.innerHTML)) {
        this.snackbar.text = 'No multiple of the same title!'
        this.snackbar.status = true
      } else {
        this.$store.commit('profile/setTitle', newTitle.innerHTML)
      }
    },
    removeTitle (i) {
      this.$store.commit('profile/removeTitle', i)
    },
    cancelAllEdits () {
      document.getElementById('diagBtn2').click()
    },
    confirmCancelAllEdits () {
      this.dialog2.status = false
      this.$store.commit('profile/cancelAllEdits')
    },
    saveChanges () {
      let master = this.$store.state.profile.personalInfo
      let slave = this.$store.state.profile.userInfo
      let key, key1, element, element1
      let changesChecker = []
      let titleChecker = []
      for (key in slave) {
        element = slave[key]
        for (key1 in master) {
          element1 = master[key1]
          if (key === key1) {
            if (key === 'title') {
              if (slave[key].length === master[key1].length) {
                slave[key].forEach((v, i) => {
                  master[key1].forEach((u, j) => {
                    if (i === j) {
                      if (v === u) {
                        titleChecker.push(true)
                      } else if (v !== u) {
                        titleChecker.push(false)
                      }
                    }
                  })
                })
                if (titleChecker.includes(false)) {
                  changesChecker.push(false)
                } else if (!titleChecker.includes(false)) {
                  changesChecker.push(true)
                }
              } else if (slave[key].length !== master[key1].length) {
                titleChecker.push(false)
                changesChecker.push(false)
              }
            } else if (key !== 'title') {
              if (element === element1) {
                changesChecker.push(true)
              } else if (element !== element1) {
                changesChecker.push(false)
              }
            }
          }
        }
      }
      if (!changesChecker.includes(false)) {
        this.snackbar.text = 'You have not made any changes!'
        this.snackbar.status = true
      } else if (changesChecker.includes(false)) {
        document.getElementById('diagBtn3').click()
      }
    },
    confirmSaveChanges () {
      this.dialog3.status = false
      this.$store.dispatch('profile/saveChanges')
    }
  },
  beforeMount () {
    this.profileAuth()
  },
  mounted () {
    this.updateProfilePic()
  },
  computed: {
    picture: {
      get () {
        return this.$store.state.profile.userInfo.picture
      }
    },
    titles: {
      get () {
        return this.$store.state.profile.userInfo.title
      },
      set () {}
    },
    name: {
      get () {
        return this.$store.state.profile.userInfo.name
      },
      set (value) {
        this.$store.commit('profile/setName', value)
      }
    },
    email: {
      get () {
        return this.$store.state.profile.userInfo.email
      },
      set (value) {
        this.$store.commit('profile/setEmail', value)
      }
    },
    phone: {
      get () {
        return this.$store.state.profile.userInfo.phone
      },
      set (value) {
        this.$store.commit('profile/setPhone', value)
      }
    },
    username: {
      get () {
        return this.$store.state.profile.userInfo.username
      }
    },
    gender: {
      get () {
        return this.$store.state.profile.userInfo.gender
      },
      set (value) {
        this.$store.commit('profile/setGender', value)
      }
    },
    dob: {
      get () {
        return this.$store.state.profile.userInfo.dob
      },
      set (value) {
        this.$store.commit('profile/setDob', value)
      }
    },
    nationality: {
      get () {
        return this.$store.state.profile.userInfo.nationality
      }
    },
    state: {
      get () {
        return this.$store.state.profile.userInfo.state
      }
    },
    city: {
      get () {
        return this.$store.state.profile.userInfo.city
      }
    },
    status: {
      get () {
        return this.$store.state.profile.userInfo.status
      }
    },
    company: {
      get () {
        return this.$store.state.profile.userInfo.company
      },
      set (value) {
        this.$store.commit('profile/setCompany', value)
      }
    },
    institution: {
      get () {
        return this.$store.state.profile.userInfo.institution
      },
      set (value) {
        this.$store.commit('profile/setInstitution', value)
      }
    },
    position: {
      get () {
        return this.$store.state.profile.userInfo.position
      },
      set (value) {
        this.$store.commit('profile/setPosition', value)
      }
    },
    level: {
      get () {
        return this.$store.state.profile.userInfo.level
      },
      set (value) {
        this.$store.commit('profile/setLevel', value)
      }
    },
    editing: {
      get () {
        return this.$store.state.profile.editing
      }
    }
  }
}
</script>

<style scoped>
.scaleIn{
  animation: scaleIn 0.3s;
}
@keyframes scaleIn{
  0%{
    transform: scale(0) rotate(90deg);
  }
  100%{
    transform: scale(1) rotate(270deg);
  }
}
</style>

