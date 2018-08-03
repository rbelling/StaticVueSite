<template>
  <div class="Map"> {{ msg }} </div>
</template>

<script>
  export default {
    name: 'Map',
    data () {
      return {
        msg: 'Map'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../common.scss';

  .Map {
    @extend %-d-box;
    @extend %-d-border;
  }
</style>
