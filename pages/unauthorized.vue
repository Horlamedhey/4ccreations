<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Authorization Error
    </h1>
    <h2 class="info">
      Unauthorized Access, blease go back to the
    <v-btn class="white--text" flat to="/">
      Homepage
    </v-btn>
    </h2>
  </section>
</template>
<script>
export default {
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
