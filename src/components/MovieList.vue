<template>
  <main class="Main">
    <aside class="SidebarFilters">
      <h2 class="MainTitle">Sort By:</h2>
      <div class="SortFilter">
        <h3>Average Score:</h3>
        <div class="RangeSlider">
          <input
            class="RangeSlider__Range"
            type="range"
            min="0"
            max="10"
            step="0.5"
            v-model="rangeVal"
          >
          <span class="RangeSlider__Value" v-text="rangeVal"></span>
        </div>
      </div>
    </aside>
    <section class="MainSection">
      <h2 class="MainTitle">Movies List</h2>
      <MovieItem :movies="movies" :genres="genres" :imageUrl="imageUrl" :rangeVal="rangeVal" />
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import MovieItem from './MovieItem.vue';

export default {
  name: 'MovieList',
  components: {
    MovieItem
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
  },
   created() {
    this.getData();
  }
};
</script>

<style lang="scss">

*, *:before, *:after {
  box-sizing: border-box;
}

figure {
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
a {
  color: #42b983;
}

.flexbox {
  display: flex;
}

.rangeValue {
  margin-left: 5px;
  font-weight: bold;
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

.RangeSlider {
  margin-top: 15px;

  &__Range {
    -webkit-appearance: none;
    height: 10px;
    border-radius: 5px;
    background: #d7dcdf;
    outline: none;
    padding: 0;
    margin: 0;
      &::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #2c3e50;
      cursor: pointer;
      transition: background .15s ease-in-out;
    }
    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border: 0;
      border-radius: 50%;
      background: #2c3e50;
      cursor: pointer;
      transition: background .15s ease-in-out;
    }
  }
  &__Value {
    display: inline-block;
    position: relative;
    width: 60px;
    color: #fff;
    line-height: 20px;
    text-align: center;
    border-radius: 3px;
    background: #2c3e50;
    padding: 5px 10px;
    margin-left: 8px;
    &::after {
      content:'';
      position: absolute;
      top: 8px;
      left: -7px;
      width: 0;
      height: 0;
      border-top: 7px solid transparent;
      border-right: 7px solid #2c3e50;
      border-bottom: 7px solid transparent;
    }
  }
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
