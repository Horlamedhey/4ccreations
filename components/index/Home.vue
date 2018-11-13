<template>
  <v-container v-if="content" class="pb-5">
    <v-dialog persistent v-model="dialog.status" max-width="400">
      <v-card>
        <v-icon class="pa-3" :color="dialog.color" style="font-size:80px;margin-left:35%;">{{dialog.icon}}</v-icon>
        <v-btn @click="dialog.status = false" icon flat class="right">
          <v-icon color="black">mdi-close</v-icon>
        </v-btn>
        <v-card-text class="headline text-xs-center">{{dialog.message}}</v-card-text>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn color="green darken-1" flat @click="dialog.status = false">STAY HERE?</v-btn>
            <v-btn color="green darken-1" flat @click="$store.commit('default/index', 'Login')">PROCEED TO LOGIN?</v-btn>
            <v-btn color="green darken-1" flat @click="$store.commit('default/index', 'Register')">REGISTER</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="3000"
      color="info"
      top
      vertical
      v-model="snackbar"
    >
      Not supported on small screens.
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
        <newsletter/>
        <new-post/>
      <v-fab-transition>
          <v-tooltip left color="primary">
      <v-btn slot="activator" @click="newPost()" class="newPost" fab color="accent">
          <v-icon>mdi-pencil</v-icon>
      </v-btn>
              <span>Create Post</span>
          </v-tooltip>
      </v-fab-transition>
      <v-fab-transition>
          <v-tooltip left color="primary">
      <v-btn slot="activator" @click="newslet()" class="newsletter" fab color="info">
          <v-icon>mdi-email-open</v-icon>
      </v-btn>
              <span>Newsletter</span>
          </v-tooltip>
      </v-fab-transition>
      <v-fab-transition>
          <v-tooltip left color="primary">
          <v-btn slot="activator" v-if="sliderHeight !== 0 && offset >= 1200 || (sliderHeight === 0 && offset >= 300)" @click="$vuetify.goTo('#top')" color="warning" dark class="scrollUp" fab>
              <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
              <span>Back To Top</span>
          </v-tooltip>
      </v-fab-transition>
      <v-layout id="top" class="pt-5 pb-5" justify-center>
          <v-flex headline xs12 class="align-center">
              Explore our constantly updated list of trending and fascinating architecture designs.
          </v-flex>
      </v-layout>
      <v-toolbar class="mb-1 accent white--text">
        <v-toolbar-title class="headline">{{posts.category}}</v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs12 class="mt-5 pt-5" headline v-if="posts.posts.length === 0">
          <span style="color: rgba(0,0,0,0.3)">
            There is nothing to show, Please click on the pen to post something...
          </span>
        </v-flex>
        <v-flex v-if="post.isPublic === true" xs12 sm6 md4 xl3 v-for="(post, i) in posts.posts" :key="i">
          <v-card hover class="pa-1 ma-1" id="card">
            <post-comments/>
            <post-image/>
            <v-img :alt="'image for post with description: ' + post.desc" lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-qKxv_sDOMxYNz_-yYrwElcOVIyj9qusYZ0Nd-4y6QSVMkpi&reload=on" @mouseover="$store.commit('hover', i)"
                          @mouseout="$store.commit('hover', i)" @click="bigImg({data:post._id, index: i})"
                          :src="post.img[post.activeImg]" height="200px">
              <v-layout slot="placeholder" fill-height align-center justify-center
                        ma-0>
                <v-progress-circular indeterminate color="grey lighten-5">
                </v-progress-circular>
              </v-layout>
              <div style="width:100%;height:100%;background: rgba(0,0,0,0.2)">
                <v-card-text class="white--text">{{post.title}}</v-card-text>
                <v-layout v-if="post.hover && post.img.length > 1"
                          justify-space-between align-center>
                  <v-btn @click.stop="prevImg(i)" icon color="accent">
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn @click.stop="nextImg(i)" icon
                          color="accent">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-layout>
              </div>
            </v-img>
            <v-card-title primary-title @click.stop="comments({data:post._id, index: i})">
              <v-layout wrap row>
                <v-avatar size="36px">
                  <v-img :src="post.uploaderImg"></v-img>
                </v-avatar>
                <v-card-title class="grey--texts ml-1">{{post.uploader}}</v-card-title>
              </v-layout>
            </v-card-title>
            <v-layout wrap>
              <v-flex>
                <v-card-actions @click="comments({data:post._id, index: i})">
                  <v-tooltip top color="accent" lazy>
                    <v-btn slot="activator" color="secondary" flat icon @click.stop="toggleDescription({data:post, index: i})">
                      <v-icon>{{ post.descriptionStatus ? 'mdi-chevron-double-down' : 'mdi-chevron-double-up' }}</v-icon>
                    </v-btn>
                    <span>description</span>
                  </v-tooltip>
                  <v-spacer></v-spacer>
                  <v-speed-dial direction="top" open-on-hover
                                transition="slide-x-reverse-transition">
                    <v-btn @click.stop slot="activator" color="secondary" flat icon
                    hover>
                      <v-badge bottom overlap color="transparent">
                        <span slot="badge" style="font-weight: 900;" class="grey--texts">{{post.likesCount.total}}</span>
                        <v-icon medium>mdi-heart-pulse</v-icon>
                      </v-badge>
                    </v-btn>
                    <v-btn @click.stop="likePost({mode: 'full', index: i})" icon flat color="error">
                      <v-badge bottom overlap color="transparent">
                        <span slot="badge" style="font-weight: 900;"
                        class="grey--texts">{{post.likesCount.full}}</span>
                        <v-icon>mdi-heart</v-icon>
                      </v-badge>
                    </v-btn>
                    <v-btn @click.stop="likePost({mode: 'half', index: i})" icon flat color="warning">
                      <v-badge bottom overlap color="transparent">
                        <span slot="badge" style="font-weight: 900;"
                        class="grey--texts">{{post.likesCount.half}}</span>
                        <v-icon>mdi-heart-half-full</v-icon>
                      </v-badge>
                    </v-btn>
                    <v-btn @click.stop="likePost({mode: 'dislike', index: i})" icon flat color="accent">
                      <v-badge bottom overlap color="transparent">
                        <span slot="badge" style="font-weight: 900;"
                        class="grey--texts">{{post.likesCount.dislike}}</span>
                        <v-icon>mdi-heart-broken</v-icon>
                      </v-badge>
                    </v-btn>
                  </v-speed-dial>
                  <v-tooltip bottom color="accent" lazy>
                    <v-btn @click.stop="''" style="cursor: initial;" slot="activator" icon color="secondary" flat>
                      <v-badge bottom overlap color="transparent">
                        <span slot="badge" style="font-weight: 900;"
                              class="grey--texts">{{post.views}}</span>
                        <v-icon>mdi-eye</v-icon>
                      </v-badge>
                    </v-btn>
                    <span>view</span>
                  </v-tooltip>
                  <v-tooltip bottom color="accent" lazy>
                    <v-btn slot="activator" @click.stop="openComment(i)" icon
                            color="secondary" flat>
                      <v-badge bottom overlap color="transparent">
                        <span slot="badge" style="font-weight: 900;"
                        class="grey--texts">{{post.commentsCount}}</span>
                        <v-icon>mdi-feather</v-icon>
                      </v-badge>
                    </v-btn>
                    <span>comment</span>
                  </v-tooltip>
                  <v-tooltip bottom color="accent" lazy>
                    <v-btn slot="activator" icon color="secondary" flat>
                      <v-badge bottom overlap color="transparent">
                        <span slot="badge" style="font-weight: 900;"
                        class="grey--texts">0</span>
                        <v-icon>mdi-arrow-down-bold-hexagon-outline</v-icon>
                      </v-badge>
                    </v-btn>
                    <span>download</span>
                  </v-tooltip>
                </v-card-actions>
              </v-flex>
            </v-layout>
            <v-slide-y-transition>
              <v-card-text class="pb-5" v-show="post.descriptionStatus">
                {{ post.description }}
                  <p class="time pa-1 pt-2 right grey--text">
                    {{post.time}}
                  </p>
              </v-card-text>
            </v-slide-y-transition>
            <v-slide-y-reverse-transition>
              <v-card v-show="post.commentStatus" id="commentBox" style="cursor:default; position: absolute; width: 100%; top: 0%; height: 100%;">
                <v-btn @click="closeComment(i)" icon flat class="right" color="secondary">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                  <v-card-text>
                  <v-container row fluid>
                    <v-layout row>
                      <v-flex xs12>
                        <v-textarea
                          id="commentInput" @mouseover="focusComment()"
                          v-model="comment" @focus="isEmoji = false" name="input-7-1"
                          box append-icon="mdi-emoticon" @click:append="()=>{
                            isEmoji = !isEmoji
                          }" label="Express yourself..." auto-grow
                          autofocus browser-autocomplete clearable counter/>
                        <picker v-show="isEmoji" @select="insert" :infiniteScroll="false" color="#FF9A0D" title="Pick your emoji…" emoji="point_up" :perLine="7" />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions style="width: fit-content;position: absolute; bottom: 3%; right: 3%;">
                  <v-btn color="secondary" @click="submitComment(i)" style="">Comment</v-btn>
                </v-card-actions>
              </v-card>
            </v-slide-y-reverse-transition>
          </v-card>
        </v-flex>
      <v-flex xs12 sm6 md4 xl3 v-if="postsLoading && posts.posts.length !== 0">
        <card-skeleton/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import postsActions from '~/mixins/postsActions'
export default {
  mixins: [postsActions],
  components: {},
  data: () => ({}),
  methods: {
    newslet () {
      document.getElementById('newsletter').click()
    }
  },
  mounted () {
    this.$store.dispatch('fetchPosts')
    this.$store.commit('populatePostsCat', 'TRENDS')
    this.$store.commit('isPublic', true)
  },
  computed: {
    content: {
      get () {
        return this.$store.state.home.content
      }
    },
    postsLoading: {
      get () {
        return this.$store.state.postsLoading
      }
    },
    posts: {
      get () {
        // return this.$store.state.posts
        return this.$store.state.postsCat
      }
    },
    num: {
      get () {
        return this.$store.state.activeImg
      }
    },
    sliderHeight: {
      get () {
        return this.$store.state.slider.sliderHeight
      }
    }
  }
}
</script>

<style scoped>
#commentBox {
  transition: 0.4s all ease-in-out;
}
@media (max-width: 415px) {
.v-btn{
  font-size: 2.7vw;
}
}
</style>
