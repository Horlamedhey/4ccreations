<template>
  <v-container v-if="content" class="pb-5">
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
      <v-layout class="pt-5 pb-5" justify-center>
          <v-flex headline xs12 class="align-center">
              Explore our constantly updated list of trending and fascinating architecture designs.
          </v-flex>
      </v-layout>
    <v-toolbar class="accent white--text">
        <v-toolbar-title class="headline">{{currentCat}}</v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap>
	    <v-flex xs12 class="mt-5 pt-5" headline v-if="posts.length === 0">
                <span style="color: rgba(0,0,0,0.3)">There is nothing to show, Please click on the pen to post something...</span>
	    </v-flex>
      <v-flex xs12 sm6 md4 xl3 v-for="(post, i) in posts" :key="i">
        <v-card hover id="card">
          <post-comments/>
        <post-image/>
          <v-card-media @click="bigImg(post)" :src="post.img[0]" height="200px"/>
          <v-card-title primary-title @click="comments(post)">
            <span>
              <div class="headline pb-2">{{post.title}}</div>
              <v-avatar size="36px">
                  <img :src="post.uploaderImg">
              </v-avatar>
              <span class="grey--text ml-1">{{post.uploader}}</span>
            </span>
              <v-flex class="grey--text">{{post.time}}</v-flex>
          </v-card-title>
          <v-card-actions @click="comments(post)">
            <v-tooltip top color="accent" lazy>
              <v-btn slot="activator" color="secondary" flat icon @click.stop="toggleDescription(post)">
                <v-icon>{{ post.descriptionStatus ? 'mdi-chevron-double-down' : 'mdi-chevron-double-up' }}</v-icon>
              </v-btn>
              <span>description</span>
            </v-tooltip>
            <v-spacer></v-spacer>
              <v-speed-dial
      direction="top"
      open-on-hover
      transition="slide-x-reverse-transition"
    >
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
            <v-btn slot="activator" @click.stop="openComment(i)" icon color="secondary" flat>
              <v-icon>mdi-feather</v-icon>
            </v-btn>
                  <span>comment</span>
                </v-tooltip>
                  <v-tooltip bottom color="accent" lazy>
            <v-btn slot="activator" icon color="secondary" flat>
              <v-icon>mdi-cloud-download</v-icon>
            </v-btn>
                    <span>download</span>
                  </v-tooltip>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="post.descriptionStatus">{{ post.description }}</v-card-text>
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
                      <v-text-field @focus="isEmoji = false" style="" v-model="comment" id="textfield" no-resize color="secondary" rows="9" solo name="input-1"
                                    placeholder="express yourself..." textarea/>
                      <v-btn @click="isEmoji = !isEmoji" class="emojToggle" fab small color="secondary">
                        <v-icon>mdi-emoticon</v-icon>
                      </v-btn>
                      <picker v-show="isEmoji" @select="insert" :infiniteScroll="off" color="#FF9A0D" title="Pick your emoji…" emoji="point_up" :perLine="7" />
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
      <v-flex xs12 sm6 md4 xl3 v-if="postsLoading && posts.length !== 0">
        <card-skeleton/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CardSkeleton from '~/components/CardSkeleton'
import Newsletter from '~/components/index/Newsletter'
import NewPost from '~/components/index/New_Post'
import PostImage from '~/components/index/Post_Image'
import PostComments from '~/components/index/Post_Comments'
export default {
  components: {
    CardSkeleton,
    Newsletter,
    NewPost,
    PostImage,
    PostComments
  },
  data: () => ({
    snackbar: false,
    isEmoji: false,
    comment: '',
    offset: 0,
    off: false,
    on: true
  }),
  methods: {
    scroll () {
      this.offset = window.pageYOffset
    },
    newslet () {
      document.getElementById('newsletter').click()
    },
    newPost () {
      document.getElementById('newPost').click()
    },
    insert (emoji) {
      this.comment += emoji.native
    },
    toggleDescription (post) {
      this.$store.commit('toggleDescription', post)
    },
    openComment (i) {
      this.comment = ''
      this.isEmoji = false
      this.$store.commit('comment', i)
    },
    closeComment (i) {
      this.$store.commit('unComment', i)
      this.comment = ''
      this.isEmoji = false
    },
    submitComment (i) {
      this.$store.commit('submitComment', { id: i, data: this.comment })
      this.$store.commit('comment', i)
      this.$store.commit('unComment', i)
      this.comment = ''
      this.isEmoji = false
    },
    bigImg (post) {
      if (window.screen.width >= 600) {
        document.querySelector('#postImage').click()
        this.$store.commit('bigPost', post)
      } else if (window.screen.width < 600) {
        this.snackbar = true
      }
    },
    comments (post) {
      document.querySelector('#comments').click()
      this.$store.commit('bigPost', post)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scroll)
  },
  computed: {
    content: {
      get () {
        return this.$store.state.content
      }
    },
    postsLoading: {
      get () {
        return this.$store.state.postsLoading
      }
    },
    currentCat: {
      get () {
        return this.$store.state.postsCat.category
      }
    },
    posts: {
      get () {
        return this.$store.state.posts
      }
    },
    sliderHeight: {
      get () {
        return this.$store.state.sliderHeight
      }
    }
  }
}
</script>

<style scoped>
#commentBox {
  transition: 0.4s all ease-in-out;
}
</style>
