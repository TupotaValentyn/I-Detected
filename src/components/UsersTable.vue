<template>
  <div>
    <md-table v-model="staticUser" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Mac Address" align="center" md-sort-by="macAddress">
          <md-table>
            <md-table-row class="delete-user_row">
              <md-table-cell>
                <div class="delete-user">
                  <span>{{ item.macAddress }}</span>
                  <md-button class="md-primary" v-on:click="deleteUser(item.userId)">Delete user</md-button>
                </div>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">
          <img :src="item.pic" alt="">
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
    import axios from "axios";

    export default {
        data: () => ({
            staticUser: [],
            text: "",
            form: {
                firstName: null,
                macAddress: null
            }
        }),
        props: {},
        methods: {
            deleteUser(userId) {
                console.log(userId);
                axios.delete(`http://192.168.1.152:5000/users/${userId}`);
            },
            getUser() {
                axios
                    .get("http://192.168.1.152:5000/users/")
                    .then(response => {
                        if (response) {
                            this.staticUser = response.data.map((user, index) => {
                                return {
                                    id: ++index,
                                    name: user.name,
                                    macAddress: user.station_mac,
                                    userId: user._id,
                                    pic: `http://192.168.1.152:5000/uploads/${user.pic}`
                                };
                            });
                        }
                    });
            }
        },
        mounted() {
            this.getUser();
        }
    };

</script>

<style scoped>
  tbody .md-table-row td {
    border-top: none;
  }
</style>
