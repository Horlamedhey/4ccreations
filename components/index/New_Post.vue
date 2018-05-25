<template>
	<v-layout row justify-center>
		<v-dialog v-model="postBox" persistent max-width="500px">
			<v-btn id="newPost" style="opacity: 0;" class="newPost" fab slot="activator"/>
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
										label="Title"
										single-line
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
								<v-text-field
										v-model="description"
										label="Description"
										clearable
										counter="1500"
										@blur="checkDesc()"
										@input="checkDesc()"
										:error-messages="descErrors"
										no-resize
										full-width
										multi-line
										single-line
								></v-text-field>
								<v-divider></v-divider>
							</v-flex>
							<v-flex xs12>
								<v-text-field
										id="pickPic"
										style="position:absolute; visibility: hidden"
										:error-messages="imgErrors"
										type="file"
                    accept="image/*"
                    multiple
								></v-text-field>
								<v-tooltip right color="primary">
								<v-btn @click="pickPic()" slot="activator" style="margin-left: auto; margin-right: auto; display: block;" fab color="accent">
									<v-icon>mdi-camera-enhance</v-icon>
								</v-btn>
									<span>{{uploadTip}}</span>
								</v-tooltip>
								<v-flex v-if="imgErrors.length !== 0" class="caption ml-3" style="color:red;">{{ imgErrors[0] }}</v-flex>
								<v-divider></v-divider>
							</v-flex>
							<v-flex xs12 v-if="img !== null">
								<v-expansion-panel inset>
									<v-expansion-panel-content>
										<div v-for="(imgNam, i) in imgName" :key="i" slot="header">Preview: {{ imgNam }}</div>
										<v-card>
											<v-card-media v-for="(im, i) in img" :key="i" :src="im" height="200">
                        <v-btn @click.native="rmvPic(i)" icon color="accent">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
											</v-card-media>
										</v-card>
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-flex>
							<v-flex xs12 class="pa-1">
								<v-select color="secondary" open-on-clear autocomplete deletable-chips dense
								          chips no-data-text="Invalid selection" v-model="category" @input="checkCat()"
								          label="Category(ies)" :items="categories" multiple @blur="checkCat()"
								          :error-messages="catErrors" append-icon="mdi-chevron-down"/>
							</v-flex>
						</v-layout>
					</v-container>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="submit()" color="accent">
						Create Post
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
export default {
  name: 'New_Post',
  data () {
    return {
      uploadTip: 'Upload Image',
      img: [],
      imgName: [],
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
      let imgPicker = document.getElementById('pickPic')
      if (this.img.length < 2) {
        if (imgPicker.files.length === 0) {
          imgPicker.click()
          imgPicker.addEventListener('change', () => {
            let file1 = imgPicker.files[0]
            if (file1) {
              this.imgName.push(file1.name)
            }
            let reader = new FileReader()
            reader.onloadend = () => {
              let img1 = reader.result
              this.img.push(img1)
            }
            if (file1) {
              this.imgErrors = []
              reader.readAsDataURL(file1)
            }
          })
        }
        if (imgPicker.files.length > 0) {
          imgPicker.click()
          imgPicker.addEventListener('change', () => {
            let file2 = imgPicker.files[1]
            if (file2) {
              this.imgName.push(file2.name)
            }
            let reader = new FileReader()
            reader.onloadend = () => {
              let img2 = reader.result
              this.img.push(img2)
            }
            if (file2) {
              this.imgErrors = []
              reader.readAsDataURL(file2)
            }
          })
        }
      } if (this.img.length === 2) {
        this.uploadTip = 'Max exceeded!'
        setTimeout(() => {
          this.uploadTip = 'Upload Image'
        }, 1000)
      }
    },
    rmvPic (i) {
      this.img.splice(i, 1)
      this.imgName.splice(i, 1)
    },
    checkTitle () {
      if (this.title.length < 3) {
        this.titleErrors.splice('Title cannot exceed 50 characters')
        this.titleErrors.push('Title must be minimum of 3 characters')
      } else if (this.title.length > 50) {
        this.titleErrors.splice('Title must be minimum of 3 characters')
        this.titleErrors.push('Title cannot exceed 50 characters')
      } else {
        this.titleErrors = []
      }
    },
    checkDesc () {
      if (this.description.length < 20) {
        this.descErrors.splice('Title cannot exceed 1500 characters')
        this.descErrors.push('Title must be minimum of 20 characters')
      } else if (this.description.length > 1500) {
        this.descErrors.splice('Title must be minimum of 20 characters')
        this.descErrors.push('Title cannot exceed 1500 characters')
      } else {
        this.descErrors = []
      }
    },
    checkImg () {
      if (this.img.length === 0) {
        this.imgErrors.push('Please upload an image!')
      } else if (this.img.length !== 0) {
        this.imgErrors = []
      }
    },
    checkCat () {
      if (this.category.length === 0) {
        this.catErrors.push('Please select at least one category!')
      } else if (this.category.length > 0) {
        this.catErrors = []
      }
    },
    submit () {
      this.$store.commit('image', this.img)
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
        this.img = []
        this.imgName = []
      }
    }
  },
  computed: {
    postBox: {
      get () {
        return this.$store.state.postBox
      },
      set (value) {
        this.$store.commit('postBox', value)
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
