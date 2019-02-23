<template>
  <div id="app">
    <header class="Header">
      <img alt="TMDB Logo" src="./assets/logo.png">
    </header>
    <main class="Main">
    <aside class="SidebarFilters">
      <h2 class="MainTitle">Sort By:</h2>
      <div class="SortFilter">
        <ScoreFilter :rangeVal="rangeVal" @changeVal="changedValue" />
      </div>
    </aside>
    <section class="MainSection">
      <h2 class="MainTitle">Movies List</h2>
      <MovieItems :movies="movies" :genres="genres" :imageUrl="imageUrl" :rangeVal="rangeVal" />
    </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import MovieItems from './components/MovieItems.vue'
import ScoreFilter from './components/ScoreFilter.vue'

export default {
  name: 'app',
  components: {
    MovieItems, ScoreFilter
  },
  data() {
    return {
      movies: [],
      genres: [],
      rangeVal: 3,
      baseUrl: 'https://api.themoviedb.org/3',
      apiKey: '0793843734f494d1e81cb086b5fd3871',
      imageUrl: 'https://image.tmdb.org/t/p/w500_and_h282_face',
    };
  },

  methods: {
    getData() {
      let genresUrl = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`;
      let moviesUrl = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1&sort_by=popularity.desc`;
      Promise.all([axios.get(genresUrl), axios.get(moviesUrl)])
        .then((result) => {
        this.genres = result[0].data.genres;
        this.movies = result[1].data.results;
        this.showGenres();
      })
    },
    showGenres() {
      for (const j in this.movies) {
        const genreList = [];
        for (const i in this.genres) {
          if (this.movies[j].genre_ids.indexOf(this.genres[i].id) !== -1) {
            genreList.push(this.genres[i]);
          }
        }
        this.movies[j].genre = genreList;
      }
    },
    changedValue(val) {
      this.rangeVal = val;
    },
  },
   created() {
    this.getData();
  }
};
</script>

<style lang="scss">
* {
  font-family: 'Oswald', sans-serif;
}

*, *:before, *:after {
  box-sizing: border-box;
}

figure, p {
  margin: 0;
}

h3 {
  margin: 10px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px 0 0;
}

.flexbox {
  display: flex;
}

.Header {
  text-align: center;
  margin: 10px 0;

  img {
    max-width: 200px;
  }
}

.MainTitle {
  text-align: left
}

.Main {
  display: flex;
  flex-direction: row;
  align-items: space-between;
}

.SidebarFilters {
  display: flex;
  flex-direction: column;
  width: 20%;
  text-align: left;
}

.MainSection {
  width: 80%;
}

@media only screen and (max-width: 1024px) {
  .Main {
    flex-direction: column;
  }
  .SidebarFilters, .MainSection {
    width: 100%;
  }
  .SortFilter {
    flex-direction: column;
    align-items: center;
    display: flex;
  }
}
</style>
