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
  @import '../node_modules/modern-normalize/modern-normalize.css';
  @import '../node_modules/colors-sass/sass/_variables.scss';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: $navy;
    min-height: 100vh;
    border: 10px solid $navy;
  }
</style>
