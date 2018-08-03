<template>
  <div class="Suggestions"> {{ msg }} </div>
</template>

<script>
  export default {
    name: 'Suggestions',
    data () {
      return {
        msg: 'Suggestions'
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../common.scss';

  .Suggestions {
    @extend %-d-box;
    @extend %-d-border;
  }
</style>
