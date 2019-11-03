<template>
  <div id="app">
    <h1 class="app_welcome">
      Welcome to <mark>I Detected</mark> admin-panel
    </h1>
    <router-link to="/" class="md-button md-theme-default">
      <div class="md-ripple">
        <div class="md-button-content">
          Home
        </div>
      </div>
    </router-link>

    <router-link to="/users" class="md-button md-theme-default">
      <div class="md-ripple">
        <div class="md-button-content">
          Users
        </div>
      </div>
    </router-link>
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
