<template>
    <v-layout row>
      <loader v-if="loading"/>
  <v-flex xs12 sm6 offset-sm3>
    <v-dialog v-model="dialog" persistent max-width="300">
      <v-btn id="diagBtn" style="display: none;" slot="activator" color="primary" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-title class="subheading">Are you sure you want to remove this profile picture?</v-card-title>
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
      <v-card v-if="user">
          <v-flex
          style="margin:0 auto;"
            xs12 sm8 lg6>
            <input @change="processProfilePic()" ref="pickProfilePic" id="changeProfilePic" style="display: none;" type="file" accept="image/*">
            <v-card-media
            :src="user.picture"
            height="300px"
            >
              <div style="height: 100%;width: 100%;background: rgba(0,0,0,0.2)">
                <v-speed-dial
                        class="right"
                        direction="bottom"
                        open-on-hover
                        transition="slide-x-reverse-transition"
                >
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
                      <span v-for="title in user.title" :key="title" class="grey--texts subheading">{{title}} </span>
                      </span>
                      <v-btn icon flat>
                          <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                  </v-layout>
                  <v-spacer></v-spacer>
              </div>
              <!-- //Name -->
              <div class="title infos">
                  <v-layout class="justify-space-between">
                      <span>
                      Name: 
                      <v-text-field class="d-inline-block" :value="user.name" full-width :disabled="edit ? false : true"></v-text-field>
                      </span>
                      <v-btn icon flat>
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
                      <v-text-field class="d-inline-block" :value="user.email" full-width :disabled="edit ? false : true"></v-text-field>
                      </span>
                      <v-btn icon flat>
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
                      <v-text-field class="d-inline-block" :value="user.phone" full-width :disabled="edit ? false : true"></v-text-field>
                      </span>
                      <v-btn icon flat>
                          <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                  </v-layout>
                  <v-spacer></v-spacer>
              </div>
              <span v-if="expand">
                <!-- //Username -->
                <div class="title infos">
                    <v-layout class="justify-space-between">
                        <span>
                        Username: 
                        <v-text-field class="d-inline-block" :value="user.username" full-width :disabled="edit ? false : true"></v-text-field>
                        </span>
                    </v-layout>
                    <v-spacer></v-spacer>
                </div>
                <!-- //Gender -->
                <div class="title infos">
                    <v-layout class="justify-space-between">
                        <span>
                        Gender: 
                        <v-text-field class="d-inline-block" :value="user.gender" full-width :disabled="edit ? false : true"></v-text-field>
                        </span>
                        <v-btn v-if="user.gender === ''" icon flat>
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
                        <v-text-field class="d-inline-block" :value="user.dob" full-width :disabled="edit ? false : true"></v-text-field>
                        </span>
                        <v-btn icon flat>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-layout>
                    <v-spacer></v-spacer>
                </div>
                <!-- //Nationality -->
                <div class="title infos">
                    <v-layout class="justify-space-between">
                        <span>
                        Nationality: 
                        <v-text-field class="d-inline-block" :value="user.nationality" full-width :disabled="edit ? false : true"></v-text-field>
                        </span>
                    </v-layout>
                    <v-spacer></v-spacer>
                </div>
                <!-- //State -->
                <div class="title infos">
                    <v-layout class="justify-space-between">
                        <span>
                        State: 
                        <v-text-field class="d-inline-block" :value="user.state" full-width :disabled="edit ? false : true"></v-text-field>
                        </span>
                    </v-layout>
                    <v-spacer></v-spacer>
                </div>
                <!-- //City -->
                <div class="title infos">
                    <v-layout class="justify-space-between">
                        <span>
                        City: 
                        <v-text-field class="d-inline-block" :value="user.city" full-width :disabled="edit ? false : true"></v-text-field>
                        </span>
                    </v-layout>
                    <v-spacer></v-spacer>
                </div>
                <!-- //Status -->
                <div class="title infos">
                    <v-layout class="justify-space-between">
                        <span>
                        Status: 
                        <v-text-field class="d-inline-block" :value="user.status" full-width :disabled="edit ? false : true"></v-text-field>
                        </span>
                    </v-layout>
                    <v-spacer></v-spacer>
                </div>
                <!-- //Company/Institution -->
                <div class="title infos">
                    <v-layout class="justify-space-between">
                        <span v-if="user.status === 'Professional'">
                        Company: 
                        <v-text-field class="d-inline-block" :value="user.company" full-width :disabled="edit ? false : true"></v-text-field>
                        </span>
                        <span v-if="user.status === 'Student'">
                        Institution: 
                        <v-text-field class="d-inline-block" :value="user.institution" full-width :disabled="edit ? false : true"></v-text-field>
                        </span>
                        <v-btn icon flat>
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
                        <v-text-field class="d-inline-block" :value="user.position" full-width :disabled="edit ? false : true"></v-text-field>
                        </span>
                        <span v-if="user.status === 'Student'">
                        Level: 
                        <v-text-field class="d-inline-block" :value="user.level" full-width :disabled="edit ? false : true"></v-text-field>
                        </span>
                        <v-btn icon flat>
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
      expand: false,
      dialog: false,
      edit: true
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
    }
  },
  mounted () {
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
