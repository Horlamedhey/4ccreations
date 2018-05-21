<template>
<v-card-media class='card-skeleton__media' height="200px"></v-card-media>
</template>

<script>
export default {
  name: '',
  props: ['height', 'width']
}
</script>

<style scoped>
.card-skeleton__media {
  background-color: grey;
  height: 200px;
}
</style>
