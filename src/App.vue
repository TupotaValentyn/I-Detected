<template>
  <div id="app">
    <h1>Welcome to
      <mark>I Detected</mark>
      admin-panel
    </h1>
    <section>
      <div v-bind="responseData">

      </div>
    </section>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'app',
        data: () => ({
            responseData: [],
            errors: []
        }),

        created() {
            axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(response => {
                    this.data = response;
                })
                .catch(e => {
                    this.error.push(e);
                })
        }
    }

</script>

<style>
  html, body, .app {
    height: 100%;
  }
</style>
