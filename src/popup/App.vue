<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title">vue-chrome-extension-boilerplate</p>
        <p class="subtitle">
          Boilerplate for Chrome extension using Vue.js and Webpack with
          auto-reload enabled.
        </p>
      </div>
    </section>
    <section>
      <h1>{{ msg }}</h1>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome!',
    }
  },
}
</script>

<style lang="sass"></style>
