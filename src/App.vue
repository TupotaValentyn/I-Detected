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
  </div>
</template>

<script>
import UsersTable from "./components/UsersTable";
import UsersForm from "./components/UsersForm";

const App = {
  components: { UsersTable, UsersForm },
  data: () => ({}),
  validations: {},
  methods: {}

  // beforeMount() {
  //   socket.on("data-list", response => {
  //     if (response) {
  //       this.users = response.map((user, index) => {
  //         return {
  //           id: ++index,
  //           name: user.name,
  //           macAddress: user.station_mac,
  //           userId: user._id
  //         };
  //       });
  //     } else {
  //       return this.users;
  //     }
  //   });
  // },
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

tbody .md-table-row td {
  border-top: none;
}

.app_welcome {
  text-align: center;
}

.delete-user {
  display: flex;
  align-items: center;
  background: transparent;
}

.delete-user_row {
  border-top-color: transparent !important;
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
</style>
