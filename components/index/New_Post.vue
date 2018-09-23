<template>
	<v-layout row justify-center>
    <loader message="Creating New Post..." v-if="loader"></loader>
		<v-dialog class="newPost" v-model="postBox" persistent max-width="500px">
			<v-btn id="newPost" style="display: none;" class="newPost" fab slot="activator"></v-btn>
			<v-card>
				<v-card-actions style="position: absolute;z-index: 99;right: 0;">
				<v-btn @click.native="isPost(false)" right icon color="primary">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				</v-card-actions>
				<v-toolbar color="accent">
					<v-toolbar-title>Create a new Post</v-toolbar-title>
				</v-toolbar>
					<v-container fluid class="pa-0 mt-2">
						<v-layout wrap>
							<v-flex xs2>
								<v-subheader>Profile</v-subheader>
							</v-flex>
							<v-flex xs10 class="text-xs-right">
								<v-chip>
									<v-avatar>
										<img :src="uploaderImg" >
									</v-avatar>
									{{uploader}}
								</v-chip>
							</v-flex>
							<v-flex xs12>
								<v-divider></v-divider>
								<v-text-field
										v-model="title"
										placeholder="Title"
                    autogrow
										full-width
										@blur="checkTitle()"
										@input="checkTitle()"
										counter="50"
										clearable
										:error-messages="titleErrors"
								></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-divider></v-divider>
								<v-textarea
										v-model="description"
										placeholder="Description"
										clearable
										counter="1500"
										@blur="checkDesc()"
										@input="checkDesc()"
										:error-messages="descErrors"
                    auto-grow
										full-width
								></v-textarea>
								<v-divider></v-divider>
							</v-flex>
							<v-flex xs12>
								<input
                    @change="handleImgs()"
                    ref="images"
										id="pickPic"
										style="position:absolute; visibility: hidden"
										:error-messages="imgErrors"
										type="file"
                    accept="image/*"
                    multiple
								>
								<v-tooltip right color="primary">
								<v-btn @click="pickPic()" slot="activator" style="margin-left: auto; margin-right: auto; display: block;" fab color="accent">
									<v-icon>mdi-camera-enhance</v-icon>
								</v-btn>
									<span>{{uploadTip}}</span>
								</v-tooltip>
								<v-flex v-if="imgErrors.length !== 0" class="caption ml-3" style="color:red;">{{ imgErrors[0] }}</v-flex>
								<v-divider></v-divider>
							</v-flex>
							<v-flex xs12 v-if="images !== null">
								<v-expansion-panel inset>
									<v-expansion-panel-content>
										<div v-for="(image, i) in images" :key="i" slot="header">Preview: {{ image.name }}</div>
										<v-card>
											<v-img v-for="(image, i) in imagesPreview" :key="i" :src="image" height="200">
                        <v-btn @click.native="rmvPic(i)" icon color="accent">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
											</v-img>
										</v-card>
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-flex>
							<v-flex xs12 class="pa-1">
								<v-combobox solo-inverted cache-items color="secondary" open-on-clear deletable-chips dense
								          chips no-data-text="Invalid selection" v-model="category" @input="checkCat()"
								          label="Category(ies)" :items="categories" multiple @blur="checkCat()"
								          :error-messages="catErrors" append-icon="mdi-chevron-down"></v-combobox>
							</v-flex>
						</v-layout>
					</v-container>
				<v-card-actions>
          <v-switch :label="`Public: ${isPublic.toString()}`"
                    v-model="isPublic"></v-switch>
          
					<v-spacer></v-spacer>
					<v-btn @click.stop="submit()" color="accent">
						Create Post
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
// import axios from '~/plugins/axios'
import Loader from '~/components/Loader'
export default {
  name: 'New_Post',
  components: {
    Loader
  },
  data () {
    return {
      uploadTip: 'Upload Image',
      images: [],
      imagesPreview: [],
      categories: [
        'Urban Design',
        'Interior Design',
        'Building Design',
        'Landscape Design',
        'Building Visulization',
        'Green/Sustainable Design'
      ],
      titleErrors: [],
      descErrors: [],
      imgErrors: [],
      catErrors: []
    }
  },
  methods: {
    isPost (value) {
      this.img = []
      this.imgName = []
      this.imgErrors = []
      this.titleErrors = []
      this.descErrors = []
      this.$store.commit('postBox', value)
    },
    pickPic () {
      if (this.images.length === 2) {
        this.uploadTip = 'Max exceeded!'
        // e.preventDefault()
        setTimeout(() => {
          this.uploadTip = 'Upload Image'
        }, 2000)
      } else {
        this.$refs.images.click()
      }
    },
    handleImgs (e) {
      let uploadedImages = this.$refs.images.files
      for (var i = 0; i < uploadedImages.length; i++) {
        this.images.push(uploadedImages[i])
        this.imgErrors = []
        let reader = new FileReader()
        reader.onloadend = () => {
          let image = reader.result
          this.imagesPreview.push(image)
        }
        if (uploadedImages[i]) {
          reader.readAsDataURL(uploadedImages[i])
        }
      }
    },
    rmvPic (i) {
      this.images.splice(i, 1)
      this.imagesPreview.splice(i, 1)
    },
    checkTitle () {
      if (this.title && this.title.length < 3) {
        this.titleErrors.splice('Title cannot exceed 50 characters')
        this.titleErrors.push('Title must be minimum of 3 characters')
      } else if (this.title && this.title.length > 50) {
        this.titleErrors.splice('Title must be minimum of 3 characters')
        this.titleErrors.push('Title cannot exceed 50 characters')
      } else {
        this.titleErrors = []
      }
    },
    checkDesc () {
      if (this.description && this.description.length < 20) {
        this.descErrors.splice('Title cannot exceed 1500 characters')
        this.descErrors.push('Title must be minimum of 20 characters')
      } else if (this.description && this.description.length > 1500) {
        this.descErrors.splice('Title must be minimum of 20 characters')
        this.descErrors.push('Title cannot exceed 1500 characters')
      } else {
        this.descErrors = []
      }
    },
    checkImg () {
      if (this.images && this.images.length === 0) {
        this.imgErrors.push('Please upload an image!')
      } else if (this.images && this.images.length !== 0) {
        this.$store.commit('image', this.images)
        this.imgErrors = []
      }
    },
    checkCat () {
      if (this.category && this.category.length === 0) {
        this.catErrors.push('Please select at least one category!')
      } else if (this.category && this.category.length > 0) {
        this.catErrors = []
      }
    },
    submit () {
      this.checkTitle()
      this.checkDesc()
      this.checkImg()
      this.checkCat()
      if (
        this.titleErrors.length === 0 &&
        this.descErrors.length === 0 &&
        this.imgErrors.length === 0 &&
        this.catErrors.length === 0
      ) {
        this.$store.dispatch('pushPost')
        this.images = []
        this.imagesPreview = []
      }
    }
  },
  computed: {
    loader: {
      get () {
        return this.$store.state.newPostLoader
      }
    },
    //  sets and gets the status of the post box and also sends the logged in user information with it
    postBox: {
      get () {
        return this.$store.state.postBox
      },
      set (value) {
        this.$store.commit('postBox', {status: value})
      }
    },
    isPublic: {
      get () {
        return this.$store.state.newPost.isPublic
      },
      set (value) {
        this.$store.commit('isPublic', value)
      }
    },
    title: {
      get () {
        return this.$store.state.newPost.title
      },
      set (value) {
        this.$store.commit('title', value)
      }
    },
    description: {
      get () {
        return this.$store.state.newPost.description
      },
      set (value) {
        this.$store.commit('description', value)
      }
    },
    category: {
      get () {
        return this.$store.state.newPost.category
      },
      set (value) {
        this.$store.commit('category', value)
      }
    },
    uploader: {
      get () {
        return this.$store.state.newPost.uploader
      }
    },
    uploaderImg: {
      get () {
        return this.$store.state.newPost.uploaderImg
      }
    }
  }
}
</script>

<style scoped>
</style>
