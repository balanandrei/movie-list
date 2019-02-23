<template>
  <div>
    <h3>Average Score:</h3>
    <div class="RangeSlider">
      <input
        class="RangeSlider__Range"
        type="range"
        min="0"
        max="10"
        step="0.5"
        v-model="rangeValue"
        @input="rangeChange"
      >
      <span class="RangeSlider__Value" v-text="rangeVal"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ScoreFilter",
    props: ['rangeVal'],
    data: function() {
      return {
        rangeValue: this.rangeVal
      }
    },
    methods: {
      rangeChange($event) {
        let val = $event.target.value;
        this.$emit('changeVal', val)
      }
    }
  }
</script>

<style lang="scss" scoped>
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
