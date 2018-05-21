<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn id="comments" absolute style="opacity:0;" slot="activator" color="primary" dark/>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{post.title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-media :src="post.image" height="400px" contain/>
        <v-card-text>
          <v-container absolute fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <div class="headline">{{post.title}}</div>
              </v-flex>
            </v-layout>
          </v-container>
          </v-card-text>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Notifications</v-list-tile-title>
              <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Sound</v-list-tile-title>
              <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Auto-add widgets</v-list-tile-title>
              <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
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
