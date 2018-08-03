<template>
  <div class="Hero"> {{ msg }} </div>
</template>

<script>
  export default {
    name: 'Hero',
    data () {
      return {
        msg: 'Hero'
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../common.scss';

  .Hero {
    @extend %-d-box;
    @extend %-d-border;
  }
</style>
