<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome!'
    }
  },
  created() {
    console.log('View initialized')
  },
  methods: {}
}
</script>

<style lang="stylus">
</style>
