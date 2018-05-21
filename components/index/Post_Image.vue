<template>
<v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="900">
      <v-btn absolute style="opacity:0;" id="postImage" slot="activator" color="primary" dark/>
      <v-card>
        <v-card-media class="grey--text" :src="bigImage.image" height="600px" contain>
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{bigImage.title}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent darken-1" flat @click.native="dialog = false">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'Post_Image',
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    bigImage: {
      get () {
        return this.$store.state.bigPost
      }
    }
  }
}
</script>
