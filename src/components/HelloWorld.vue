<template>
  <div class="hello-world">
    <div
      ref="background"
      class="background"
    />
    <div class="my-name">
      <p class="first">{{ firstName }}</p>
      <p class="last">{{ lastName }}</p>
    </div>
  </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill'
import setupCanvas from './canvas'

export default {
  name: 'HelloWorld',
  data() {
    return {
      resizeObserver: null
    }
  },
  props: {
    firstName: String,
    lastName: String
  },
  mounted() {
    const SPEED_MULTIPLIER = 0.2
    const resizeCallback = setupCanvas(this.$refs.background, SPEED_MULTIPLIER)

    this.resizeObserver = new ResizeObserver(resizeCallback)
    this.resizeObserver.observe(this.$refs.background)
  },
  beforeDestroy() {
    this.resizeObserver.disconnect()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../node_modules/colors-sass/sass/_variables.scss';

$my-primary: $olive;
$my-secondary: $navy;
$gutter: 15px;

.hello-world {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: $gutter solid $my-primary;
  > .background {
    background-color: $silver;
    z-index: -1;
    position: fixed;
    height: 100%;
    width: 100%;
    /deep/ canvas {
      opacity: 0.15;
    }
  }
}
.my-name {
  text-align: center;
  font-size: 50px;
  color: $my-primary;
  letter-spacing: 1px;
  > .first {
    font-style: italic;
    color: $my-secondary;
    font-size: 32px;
    margin-bottom: 10px;
  }
}
</style>
