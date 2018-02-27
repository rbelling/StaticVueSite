<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import '../node_modules/reset-css/_reset.scss';
  @import '../node_modules/modern-normalize/modern-normalize.css';
  @import '../node_modules/colors-sass/sass/_variables.scss';

  html, body {
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
  #app {
    height: 100%;
  }
</style>
