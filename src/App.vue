<template>
  <div id="app">
    <MovieList />
  </div>
</template>

<script>
import MovieList from './components/MovieList.vue'

export default {
  name: 'app',
  components: {
    MovieList
  }
}
</script>

<style lang="scss">
* {
  font-family: 'Oswald', sans-serif;
}
</style>
