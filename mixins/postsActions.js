import io from 'socket.io-client'
import CardSkeleton from '~/components/CardSkeleton'
import Newsletter from '~/components/index/Newsletter'
import NewPost from '~/components/index/New_Post'
import PostImage from '~/components/index/Post_Image'
import PostComments from '~/components/index/Post_Comments'
import PostsComponent from '~/components/PostsComponent'
var mixin = {
  components: {
    CardSkeleton,
    Newsletter,
    NewPost,
    PostImage,
    PostComments,
    PostsComponent
  },
  data: () => ({
    dialog: {status: false, icon: '', color: '', message: ''},
    snackbar: false,
    isEmoji: false,
    comment: '',
    offset: 0
  }),
  methods: {
    focusComment () {
      document.getElementById('commentInput').click()
    },
    scroll () {
      this.offset = window.pageYOffset
    },
    //  Function triggered by clicking the create post pencil,
    //  It trigers the dialog of the new post in the 'New_Post.vue' component if the user is logged in
    newPost () {
      if (this.$auth.loggedIn) {
        document.getElementById('newPost').click()
      } else {
        this.isNotLoggedIn()
      }
    },
    insert (emoji) {
      this.comment += emoji.native
    },
    toggleDescription (payload) {
      this.$store.dispatch('toggleDescription', payload.data)
    },
    openComment (i) {
      if (this.$auth.loggedIn) {
        this.comment = ''
        this.isEmoji = false
        this.$store.commit('comment', i)
      } else {
        this.isNotLoggedIn()
      }
    },
    closeComment (i) {
      this.$store.commit('unComment', i)
      this.comment = ''
      this.isEmoji = false
    },
    submitComment (i) {
      let commentor = this.$auth.user.userData
      this.$store.commit('submitComment', { id: i, data: { text: this.comment, name: commentor.username, image: commentor.picture } })
      this.$store.commit('comment', i)
      this.$store.commit('unComment', i)
      this.comment = ''
      this.isEmoji = false
    },
    async likePost (like) {
      if (this.$auth.loggedIn) {
        let liker = this.$auth.user.userData
        let postLike = { id: like.index, data: { mode: like.mode, name: liker.username, image: liker.picture } }
        this.$store.commit('likePost', postLike)
      } else {
        this.isNotLoggedIn()
      }
    },
    prevImg (i) {
      this.$store.dispatch('prevImg', i)
    },
    nextImg (i) {
      this.$store.dispatch('nextImg', i)
    },
    bigImg (payload) {
      if (window.screen.width >= 600) {
        document.querySelector('#postImage').click()
        this.$store.dispatch('bigPost', payload.data)
      } else if (window.screen.width < 600) {
        this.snackbar = true
      }
    },
    comments (payload) {
      document.querySelector('#comments').click()
      this.$store.dispatch('bigPost', payload.data)
    },
    isNotLoggedIn () {
      this.dialog.icon = 'mdi-account-alert'
      this.dialog.color = 'error'
      this.dialog.message = 'Please login to access this feature.'
      this.dialog.status = true
    },
    realtimePosts () {
      io().on('post', post => {
        this.$store.commit('updatePosts', post)
      })
    },
    realtimeLikes () {
      io().on('like', like => {
        this.$store.commit('updateLikes', like)
        // console.log(like)
      })
    },
    realtimeViews () {
      io().on('view', view => {
        this.$store.commit('updateViews', view)
      })
    },
    realtimeComments () {
      io().on('comment', comment => {
        this.$store.commit('updateComments', comment)
      })
    }
  },
  mounted () {
    this.realtimePosts()
    this.realtimeLikes()
    this.realtimeViews()
    this.realtimeComments()
    window.addEventListener('scroll', this.scroll)
  }
}

export default mixin
