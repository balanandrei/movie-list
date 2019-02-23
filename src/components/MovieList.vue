<template>
  <main class="Main">
    <aside class="SidebarFilters">
      <h2 class="MainTitle">Sort By:</h2>
      <div class="">
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
      <div class="Movies">
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
        </footer>
        </article>
    </div>
    
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MovieList',
  data() {
    return {
      movies: [],
      rangeVal: 3,
      baseUrl: 'https://api.themoviedb.org/3',
      apiKey: '0793843734f494d1e81cb086b5fd3871',
      imageUrl: 'https://image.tmdb.org/t/p/w500_and_h282_face',
      selectedGenres: [],
    };
  },
  methods: {
    getMovies() {
      axios
        .get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1&sort_by=popularity.desc`)
        .then(response => (this.movies = response.data.results));
    },
    filterMovies(rangeVal) {
      return this.movies.filter( movie => movie.vote_average >= rangeVal );
    }
  },
  created() {
    this.getMovies();
  },
};
</script>

<style lang="scss" scoped>

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

.Genres {
  display: flex;
  flex-direction: column;
}

.Genre {
  position: relative;
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

.Checkbox {
  &Input {
    opacity: 0;
    position: absolute;
    &:checked + .CheckboxLabel:before {
      background-color: #00d671;
      border-color: #00d671;
      color: #fff;
    }
  }

  &Label {
    cursor: pointer;

    &:before {
      content: '';
      margin-right: 10px;
      display: inline-block;
      vertical-align: text-top;
      width: 20px;
      height: 20px;
      background: white;
      border: 1px solid #cdcdcd;
    }
    &:after {
      content: '';
      position: absolute;
      left: 5px;
      top: 9px;
      background: white;
      width: 2px;
      height: 2px;
      box-shadow: 
      2px 0 0 white,
      4px 0 0 white,
      4px -2px 0 white,
      4px -4px 0 white,
      4px -6px 0 white,
      4px -8px 0 white;
      transform: rotate(45deg);
    }
  }
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
</style>
