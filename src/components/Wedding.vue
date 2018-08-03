<template>
  <div class="Wedding">
    <Hero />
    <Map />
    <Rsvp />
    <Suggestions />
  </div>
</template>

<script>
  import Hero from './Hero'
  import Map from './Map'
  import Rsvp from './Rsvp'
  import Suggestions from './Suggestions'

export default {
  name: 'Wedding',
  components: {
    Hero,
    Map,
    Rsvp,
    Suggestions
  },
  data () {
    return {
      msg: 'Wedding'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../common.scss';

  .Wedding {
    font-family: 'Avenir', system-ui, Helvetica, Arial, sans-serif;
    color: #b5da00;
    min-height: 100vh;
    border: $spacing solid $aqua;
    background: $navy;
    padding: $spacing;
  }
</style>
