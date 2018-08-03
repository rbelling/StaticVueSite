<template>
  <div class="Rsvp"> {{ msg }} </div>
</template>

<script>
  export default {
    name: 'Rsvp',
    data () {
      return {
        msg: 'Rsvp'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../common.scss';

  .Rsvp {
    @extend %-d-box;
    @extend %-d-border;
  }
</style>
