<template>
  <div id="app">
    <h1 class="app_welcome">
      Welcome to
      <mark>I Detected</mark>
      admin-panel
    </h1>
    <section class="table-section">
            <UsersTable></UsersTable>
    </section>

    <section>
            <UsersForm></UsersForm>
    </section>

    <section class="bar-chart-container">
      <BarChart></BarChart>
    </section>
  </div>
</template>

<script>
    import UsersTable from "./components/UsersTable";
    import UsersForm from "./components/UsersForm";
    import BarChart from "./components/BarChart";

    const App = {
        components: {BarChart, UsersForm, UsersTable},
    };

    export default App;
</script>


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
