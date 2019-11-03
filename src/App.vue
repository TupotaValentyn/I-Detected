<template>
  <div id="app">
    <h1 class="app_welcome">
      Welcome to <mark>I Detected</mark> admin-panel
    </h1>
    <md-button>
      <router-link to="/">Home</router-link>
    </md-button>
    <md-button>
      <router-link to="/users" >Users</router-link>
    </md-button>
    <router-view></router-view>
  </div>
</template>

<style>
  html,
  body,
  .app {
    height: 100%;
  }

  html {
    font-family: "Roboto", sans-serif;
  }

  #app {
    padding: 1rem;
  }

  .app_welcome {
    text-align: center;
  }

  .delete-user {
    display: flex;
    align-items: center;
    background: transparent;
  }

  .form-content,
  .form-card {
    width: 100%;
  }

  .table-section {
    margin: 1rem 0;
  }

  .md-layout {
    justify-content: center;
  }

  .bar-chart-container {
    margin-top: 20px;
  }
</style>
