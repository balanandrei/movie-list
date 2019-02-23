<template>
  <div class="Movies">
    <span v-if="!filterMovies(rangeVal).length">No results.</span>
    <article
      v-for="{title, poster_path, vote_average, genre, id} in filterMovies(rangeVal)"
      :key="id"
      class="Movie"
      >
      <h1 class="Movie__Title">{{ title }}</h1>
      <figure>
        <img :src='imageUrl + poster_path' :alt="title" />
      </figure>
    <footer>
      <p>TMDB Score: {{ vote_average }}</p>
      <p>Genres:</p>
      <ul>
        <li
        v-for="genreItem in genre" :key="genreItem.id"
        >
          <span>{{ genreItem.name }}</span>
        </li>
      </ul>
    </footer>
    </article>
  <div>
  </div>
  </div>
</template>

<script>

export default {
  name: 'MovieItem',
  props: ['movies', 'genres', 'imageUrl', 'rangeVal'],
  methods: {
    filterMovies(rangeVal) {
      return this.movies.filter( movie => movie.vote_average >= rangeVal);
    },
  }
};
</script>

<style lang="scss">
.Movies {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 1fr;
    column-gap: 20px;
}

.Movie {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  h1, ul {
    margin: 0;
    text-align: left;
  }

  &__Title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 10px;
    font-size: 17px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  img {
    width: 100%;
    height: 100%;
  }

  footer {
    padding: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    min-height: 64px;
  }
}
</style>