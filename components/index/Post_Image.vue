<template>
<v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="900">
      <v-btn absolute style="opacity:0;" id="postImage" slot="activator" color="primary" dark/>
      <v-card>
        <v-img lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-qKxv_sDOMxYNz_-yYrwElcOVIyj9qusYZ0Nd-4y6QSVMkpi&reload=on" :alt="'image for post with description: ' + bigImage.desc" class="grey--text" :src="bigImage.image[bigImage.activeImg]" height="600px" contain>
          <v-layout slot="placeholder" fill-height align-center justify-center
                      ma-0>
            <v-progress-circular indeterminate color="grey lighten-5">
            </v-progress-circular>
          </v-layout>
          <v-container fill-height fluid>
            <v-layout fill-height wrap>
              <v-flex xs12 align-end flexbox>
                <v-card-text class="headline white--text" style="width: fit-content; position: fixed;background: rgba(0,0,0,0.5)">{{bigImage.title}}</v-card-text>
              </v-flex>
            <v-layout justify-space-between align-center v-if="bigImage.image.length > 1">
              <v-btn @click.stop="$store.commit('prevBigImg')" icon color="accent"><v-icon>mdi-chevron-left</v-icon></v-btn>
              <v-btn @click.stop="$store.commit('nextBigImg')" icon color="accent"><v-icon>mdi-chevron-right</v-icon></v-btn>
            </v-layout>
            </v-layout>
          </v-container>
        </v-img>
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
