<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn id="comments" absolute style="opacity:0;" slot="activator" color="primary" dark/>
      <v-card>
        <v-toolbar dark color="primary">
        <v-avatar>
          <img :src="post.uploaderImg"/>
        </v-avatar>
          <v-toolbar-title>{{post.uploader}}</v-toolbar-title>
          <v-spacer/>
          <v-toolbar-title>{{post.title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-layout row wrap justify-space-between>
          <v-flex xs12 sm7 md6 lg4 xl3>
            <v-card-media height="400px">
              <v-layout style="position:absolute;top:45%;width:100%;" justify-space-between align-center v-if="post.image.length > 1">
              <v-btn @click.stop="$store.commit('prevBigImg')" icon color="accent"><v-icon>mdi-chevron-left</v-icon></v-btn>
              <v-btn @click.stop="$store.commit('nextBigImg')" icon color="accent"><v-icon>mdi-chevron-right</v-icon></v-btn>
            </v-layout>
              <img style="max-width:100%;height:auto;" :src="post.image[post.activeImg]" alt="postImage">
            </v-card-media>
          </v-flex>
          <v-flex xs12 sm5 md6 lg7 wrap>
            <v-flex xs12>
              <v-card-text>{{post.desc}}</v-card-text>
              <v-card-text>{{post.time}}</v-card-text>
            </v-flex>
            <v-layout wrap>
              <v-flex xs12>
                <span v-for="(category, i) in post.category" :key="i">
                  <v-chip>
                    <v-avatar class="secondary">{{category[0]}}</v-avatar>
                    {{category}}
                  </v-chip>
                </span>
              </v-flex>
              <v-flex xs12>
                <v-card-actions>
                  <v-speed-dial
                    direction="left"
                    open-on-hover
                    transition="slide-x-reverse-transition">
                    <v-btn @click.stop slot="activator" color="secondary" flat icon hover>
                      <v-icon>mdi-heart-pulse</v-icon>
                    </v-btn>
                    <v-btn icon flat color="error">
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon flat color="warning">
                      <v-icon>mdi-heart-half-full</v-icon>
                    </v-btn>
                    <v-btn icon flat color="accent">
                      <v-icon>mdi-heart-broken</v-icon>
                    </v-btn>
                  </v-speed-dial>
                  <v-tooltip bottom color="accent" lazy>
                    <v-btn slot="activator" icon color="secondary" flat>
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                    <span>view</span>
                  </v-tooltip>
                  <v-tooltip bottom color="accent" lazy>
                    <v-btn slot="activator" icon color="secondary" flat>
                      <v-icon>mdi-cloud-download</v-icon>
                    </v-btn>
                    <span>download</span>
                  </v-tooltip>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
          <v-toolbar>
            <v-toolbar-title>Comments</v-toolbar-title>
          </v-toolbar>
          <v-card v-for="(comment, i) in post.comments" :key="i">
            <v-card-text>{{comment}}</v-card-text>
            <!-- <v-card-actions></v-card-actions> -->
          </v-card>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'Post_Comments',
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    post: {
      get () {
        return this.$store.state.bigPost
      }
    }
  }
}
</script>
