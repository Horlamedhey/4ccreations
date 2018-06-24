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
          <div :style="expand ? 'width:100%' : 'height: 180px; overflow: hidden; width:100%;'">
              <div v-for="(info, i) in infos" :key="i" class="title infos">
                  <v-layout class="justify-space-between">
                      <span>
                      {{info.title}}: 
                      <span class="grey--text subheading">{{info.content}}</span>
                      </span>
                      <v-btn class="pencil" v-if="info.title === 'title(s)' || info.title ==='Name' || info.title ==='Email' || info.title ==='Phone' || info.title ==='Address' || info.title ==='Status' || info.title ==='Institution(s)' || info.title ==='Company' || info.title ==='Level/Position'" icon flat color="primary">
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
    import axios from '~/plugins/axios'
export default {
      name: 'PersonalInfo',
      data () {
        return {
          expand: false,
          infos: [
            {title: 'title(s)', content: ''},
            {title: 'Name', content: ''},
            {title: 'Email', content: ''},
            {title: 'Phone', content: ''},
            {title: 'Nationality', content: ''},
            {title: 'State of Origin', content: ''},
            {title: 'City', content: ''},
            {title: 'Address', content: ''},
            {title: 'Dob', content: ''},
            {title: 'Gender', content: ''},
            {title: 'Status', content: ''},
            {title: 'Institution(s)', content: ''},
            {title: 'Company', content: ''},
            {title: 'Level/Position', content: ''}
          ]
        }
      },
      mounted () {
        this.profileAuth()
      },
      methods: {
        async profileAuth () {
          await axios.get('/profileAuth')
            .then(res => {
              this.infos.forEach((u, i) => {
                res.data.forEach((v, j) => {
                  if (i === j) {
                    u.content = v
                  }
                })
              })
              console.log(res)
            })
        }

      }
}
</script>
