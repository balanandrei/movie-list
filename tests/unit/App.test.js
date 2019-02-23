import Vue from "vue";
import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  let cmp, vm;

  beforeEach(() => {
    cmp = Vue.extend(App);
    vm = new cmp({
      data: {
        movies: ["Test"];
      }
    }).$mount();
  });

  it('equals movies to ["Test"]', () => {
    expect(vm.movies).toEqual(["Test"]);
  });
});
