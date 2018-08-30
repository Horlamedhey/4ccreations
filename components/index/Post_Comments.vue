<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn id="comments" absolute style="display:none;" slot="activator" color="primary" dark/>
      <v-layout wrap row class="pb-5 white" style=" height: 100%;">
        <v-card class="pb-1" style="width: 100%;">
          <v-toolbar fixed dark color="primary">
            <v-avatar size="40">
              <img :src="post.uploaderImg"/>
            </v-avatar>
            <v-toolbar-title>{{post.uploader}}</v-toolbar-title>
            <v-spacer/>
            <v-toolbar-title>{{post.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click.native="closeComments()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-layout class="pa-1" style="margin-top: 64px;" row wrap justify-space-between>
            <v-flex xs12 sm7 md6 lg4 xl3>
              <v-card-media :src="post.image[post.activeImg]" height="300px">
                  <v-layout style="position:absolute;top:45%;width:100%;" justify-space-between align-center v-if="post && post.image && post.image.length > 1">
                  <v-btn @click.stop="$store.commit('prevBigImg')" icon color="accent"><v-icon>mdi-chevron-left</v-icon></v-btn>
                  <v-btn @click.stop="$store.commit('nextBigImg')" icon color="accent"><v-icon>mdi-chevron-right</v-icon></v-btn>
                </v-layout>
                <!-- <img style="max-width:100%;height:auto;" :src="post.image[post.activeImg]" alt="postImage"> -->
              </v-card-media>
            </v-flex>
            <v-flex xs12 sm5 md6 lg7 wrap>
              <v-flex xs12 class="mt-5" style="max-height: 24.5vh; overflow-y: scroll;margin-bottom: 195px">
                <v-card-text>{{post.desc}}</v-card-text>
              </v-flex>
              <v-layout wrap style="position: absolute; bottom:0">
                <v-card-text class="time grey--text">{{post.time}}</v-card-text>
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
                      style="z-index: 2"
                      direction="top"
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
        </v-card>
        <v-flex class="white mt-5 pb-4"
                style="width: 100%; border-bottom: 1px solid #E80CE8" raised hover>
          <v-toolbar class="mb-2" color="primary">
            <v-toolbar-title class="white--text display-1">Comments</v-toolbar-title>
          </v-toolbar>
          <v-card raised hover color="grey lighten-3" class="pa-3 mb-2" v-for="(comment, i) in post.comments" :key="i"> 
            <v-layout wrap row>
              <v-avatar style="border: 1px solid #E80CE8" size="50px" color="red">
                <img :src="comment.commentorImg" alt="commentorImg">
              </v-avatar>
              <v-card-title class="headline">{{comment.commentor}}</v-card-title>
            </v-layout>
            <v-card-text class="mb-3">
              <p>{{comment.comment}}</p>
              <p class="grey--text right mt-3">
                {{comment.time | timeago}}
                <!-- <timeago :datetime="comment.time" :auto-update="60"></timeago> -->
              </p>
            </v-card-text>
            <!-- <v-card-actions></v-card-actions> -->
          </v-card>
        </v-flex>
      </v-layout>
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
  methods: {
    closeComments () {
      this.dialog = false
      this.$store.commit('closeComments')
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
