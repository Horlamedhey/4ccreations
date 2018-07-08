<template>
    <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
          <v-flex
          style="margin:0 auto;"
            xs12 sm8 lg6>
            <v-card-media
            :src="require('~/assets/Night.png')"
            height="200px"
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
                  <v-btn icon flat color="warning">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon flat color="error">
                    <v-icon>mdi-delete-forever</v-icon>
                  </v-btn>
                </v-speed-dial>
              </div>
            </v-card-media>
          </v-flex>
          <v-slide-y-transition>
        <v-card-title primary-title class="pt-2">
          <div v-if="user" :style="expand ? 'height: fit-content;width:100%;' : 'height: 180px; overflow: hidden; width:100%;'">
            <!-- //Title -->
              <div class="title infos">
                  <v-layout class="justify-space-between">
                      <span>
                      Title(s): 
                      <span v-for="title in user.title" :key="title" class="grey--texts subheading">{{title}} </span>
                      </span>
                      <v-btn class="pencil" icon flat color="primary">
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
                      <span class="grey--texts subheading">{{user.name}}</span>
                      </span>
                      <v-btn class="pencil" icon flat color="primary">
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
                      <span class="grey--texts subheading">{{user.email}}</span>
                      </span>
                      <v-btn class="pencil" icon flat color="primary">
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
                      <span class="grey--texts subheading">{{user.phone}}</span>
                      </span>
                      <v-btn class="pencil" icon flat color="primary">
                          <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                  </v-layout>
                  <v-spacer></v-spacer>
              </div>
              <!-- //Username -->
              <div class="title infos">
                  <v-layout class="justify-space-between">
                      <span>
                      Username: 
                      <span class="grey--texts subheading">{{user.username}}</span>
                      </span>
                  </v-layout>
                  <v-spacer></v-spacer>
              </div>
              <!-- //Gender -->
              <div class="title infos">
                  <v-layout class="justify-space-between">
                      <span>
                      Gender: 
                      <span class="grey--texts subheading">{{user.gender}}</span>
                      </span>
                      <v-btn v-if="user.gender === ''" class="pencil" icon flat color="primary">
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
                      <span class="grey--texts subheading">{{user.dob}}</span>
                      </span>
                      <v-btn class="pencil" icon flat color="primary">
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
                      <span class="grey--texts subheading">{{user.nationality}}</span>
                      </span>
                  </v-layout>
                  <v-spacer></v-spacer>
              </div>
              <!-- //State -->
              <div class="title infos">
                  <v-layout class="justify-space-between">
                      <span>
                      State: 
                      <span class="grey--texts subheading">{{user.state}}</span>
                      </span>
                  </v-layout>
                  <v-spacer></v-spacer>
              </div>
              <!-- //City -->
              <div class="title infos">
                  <v-layout class="justify-space-between">
                      <span>
                      City: 
                      <span class="grey--texts subheading">{{user.city}}</span>
                      </span>
                  </v-layout>
                  <v-spacer></v-spacer>
              </div>
              <!-- //Status -->
              <div class="title infos">
                  <v-layout class="justify-space-between">
                      <span>
                      Status: 
                      <span class="grey--texts subheading">{{user.status}}</span>
                      </span>
                  </v-layout>
                  <v-spacer></v-spacer>
              </div>
              <!-- //Company/Institution -->
              <div class="title infos">
                  <v-layout class="justify-space-between">
                      <span v-if="user.status === 'Professional'">
                      Company: 
                      <span class="grey--texts subheading">{{user.company}}</span>
                      </span>
                      <span v-if="user.status === 'Student'">
                      Institution: 
                      <span class="grey--texts subheading">{{user.institution}}</span>
                      </span>
                      <v-btn class="pencil" icon flat color="primary">
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
                      <span class="grey--texts subheading">{{user.position}}</span>
                      </span>
                      <span v-if="user.status === 'Student'">
                      Level: 
                      <span class="grey--texts subheading">{{user.level}}</span>
                      </span>
                      <v-btn class="pencil" icon flat color="primary">
                          <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                  </v-layout>
                  <v-spacer></v-spacer>
              </div>
          </div>
        </v-card-title>
          </v-slide-y-transition>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="expand = !expand">
            <v-icon>{{ expand ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    // axios.defaults.headers.common['rt'] = 6
export default {
      name: 'PersonalInfo',
      data () {
        return {
          expand: false
        }
      },
      mounted () {
      },
      methods: {
      },
      computed: {
        user: {
          get () {
            return this.$store.state.userIn.personalInfo
          }
        }
      }
}
</script>
