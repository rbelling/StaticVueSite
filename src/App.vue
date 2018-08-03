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

  #app {
    min-height: 100vh;
  }
</style>
