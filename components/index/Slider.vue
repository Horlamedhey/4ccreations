<template>
  <v-carousel hide-controls hide-delimiters :lazy="true" interval="3000" style="height:100%">
    <v-carousel-item
      v-for="(image,i) in images"
      :key="i"
      :src="image"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      images: [
        '/images/download.jpeg',
        '/images/High-Quality-Website2.jpg',
        '/images/Night.jpg',
        '/images/web-design-glasgow-lanarkshire-edinburgh-cj-designs.jpg',
        '/images/webi.jpg',
        '/images/Woo.jpg'
      ]
    }
  }
}
</script>

