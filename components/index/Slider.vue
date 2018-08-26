<template>
<div style="position:relative; height:100vh;" id="slider" v-if="component === 'Home' && sliderHeight === 90">
  <v-carousel hide-controls hide-delimiters lazy interval="3000" style="height:100%">
    <v-carousel-item
      v-for="(image,i) in images"
      :key="i"
    ><img v-lazy="image" alt="slider" style="position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); min-width: 100%; will-change: transform; -webkit-transition: inherit; transition: inherit;"></v-carousel-item>
  </v-carousel>
  <v-layout justify-center wrap style="position: absolute; top:0; width:100%; height:100%; background:rgba(0,0,0,0.7);">
            <v-flex xs12 md10 class="mt-5">
              <no-ssr>
	            <vue-typer style="font-size: 9.8vw; letter-spacing: 0.5vw;" class="white--text" :text='["Build IT!","Build your career!"]' :repeat='Infinity' :shuffle='false' initial-action='typing'
	                       :pre-type-delay='70' :type-delay='70' :pre-erase-delay='2000' :erase-delay='250'
	                       erase-style='backspace' :erase-on-complete='false' caret-animation='expand'>
	            </vue-typer>
              </no-ssr>
            </v-flex>
            <v-flex align-content-center xs12 md10 style="font-size: 3vw;position: absolute; bottom: 30%; text-align:center" class="white--text">
	            Welcome to the largest community where dreams come true!!!
	            <div class="mt-3"><v-btn color="secondary" @click="slide">Get Started</v-btn></div>
            </v-flex>
        </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: [
        'download.webp',
        'High-Quality-Website2.webp',
        'login.webp',
        'web-design-glasgow-lanarkshire-edinburgh-cj-designs.webp',
        'webi.webp',
        'Woo.webp'
      ]
    }
  },
  methods: {
    slide () {
      this.$store.commit('populatePostsCat', 'TRENDS')
      let elem = document.querySelector('#slider')
      elem.style.opacity = '0'
      elem.style.height = '0vh'
      this.$store.commit('home/content')
      setTimeout(() => {
        this.$store.commit('slider/sliderHeight')
        elem.style.display = 'none'
      }, 2005)
    }
  },
  computed: {
    component: {
      get () {
        return this.$store.state.default.index
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

