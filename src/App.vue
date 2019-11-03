<template>
  <div id="app">
    <h1 class="app_welcome">Welcome to
      <mark>I Detected</mark>
      admin-panel
    </h1>

    <section class="table-section">
      <div>
        <md-table v-model="users" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Users</h1>
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Mac Address" align="center" md-sort-by="macAddress">
              <md-table>
                <md-table-row class='delete-user_row'>
                  <md-table-cell>
                    <div class="delete-user">
                      <span>{{ item.macAddress }}</span>
                      <md-button class="md-primary" v-on:click="deleteUser(item.userId)">Delete user</md-button>
                    </div>
                  </md-table-cell>
                </md-table-row>
              </md-table>

            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </section>

    <section class="table-section">
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
                <md-table-row class='delete-user_row'>
                  <md-table-cell>
                    <div class="delete-user">
                      <span>{{ item.macAddress }}</span>
                      <md-button class="md-primary" v-on:click="deleteUser(item.userId)">Delete user</md-button>
                    </div>
                  </md-table-cell>
                </md-table-row>
              </md-table>

            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </section>

    <section>
      <form novalidate class="md-layout">
        <md-card class="md-layout-item md-size-50 md-small-size-100 form-card">

          <md-card-content calss="form-content">
            <md-field>
              <label for="first-name">First Name</label>
              <md-input name="name" id="first-name" autocomplete="given-name" v-model="form.firstName"
                        :class="status('nnnn')"/>

            </md-field>

            <md-field>
              <label for="address">Station mac address</label>
              <md-input name="macAddress" id="address" autocomplete="given-name" v-model="form.macAddress"
                        :class="status('nnnn')"/>


            </md-field>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">

                <!--                <pre>{{ $v }}</pre>-->
              </div>
            </div>
          </md-card-content>

          <md-card-actions>
            <md-button type="submit" class="md-primary" v-on:click="createUser($event)">Create user</md-button>
          </md-card-actions>
        </md-card>
      </form>
    </section>

    <div class="Chart">
      <h1 style="text-align:center;">Bubblechart</h1>
      <bubble-chart v-bind:data="chartData"/>
    </div>
  </div>
</template>

<script>
    import {
        required
    } from 'vuelidate/lib/validators'
    import { validationMixin } from "vuelidate";
    import axios from 'axios';
    import BubbleChart from "./components/chart/BubbleChart";
    import io from 'socket.io-client';

    const App = {
        components: {
            BubbleChart
        },
        mixins: [validationMixin],
        data: () => ({
            users: [
                {
                    id: null,
                    name: null,
                    macAddress: null,
                    userId: null
                }
            ],
            staticUser: [],
            socket: io('http://192.168.1.204:5000'),
            text: '',
            form: {
                firstName: null,
                macAddress: null
            },

            //    cart
            dataPoints: null,
            height: 20,

            //    cart custom
            chartData: null
        }),
        validations: {
            form: {
                firstName: {
                    required,
                },
                macAddress: {
                    required,
                }
            }
        },
        methods: {
            status(validation) {
                return {
                    error: validation.$error,
                    dirty: validation.$dirty
                }
            },
            createUser(event) {
                event.preventDefault();
                console.log(this.form);

                const user = {
                    name: this.form.firstName,
                    station_mac: this.form.macAddress
                };

                axios
                    .post('https://i-detected-backend.herokuapp.com/users', [user])
                    .then(response => {
                        console.log('post', response);
                    })
            },
            deleteUser(userId) {
                console.log(userId);
                axios
                    .delete(`https://i-detected-backend.herokuapp.com/users/${userId}`);
            },
            getUser(){
                axios.get('https://i-detected-backend.herokuapp.com/users/')
                    .then((response) => {
                        console.log(response);
                        this.staticUser = response;
                    })
            },

            // chart

            increaseHeight() {
                this.height += 10
            },
            getRandomInt() {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            },
            fillData() {
                this.dataPoints = {
                    labels: ['January' + this.getRandomInt(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: '#f87979',
                            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
                        }
                    ]
                }
            }

        },
        mounted() {
            // chart
            setInterval(() => {
                this.fillData()
            }, 2000);
        },

        beforeMount() {
            this.socket.on('data-list', (response) => {
                console.log(response);
                if (response) {
                    this.users = response.map((user, index) => {
                        return {
                            id: ++index,
                            name: user.name,
                            macAddress: user.station_mac,
                            userId: user._id
                        }
                    });

                    // this.chartData = this.users.map(user => {
                    //      return {
                    //          label: user.name || '111',
                    //          backgroundColor: '#0f0',
                    //          data: [
                    //              {
                    //                  x: 20,
                    //                  y: 20,
                    //                  r: 15
                    //              }
                    //          ]
                    //      }
                    //  })
                } else {
                    return this.users;
                }
            });
        },

        computed: {
            myStyles() {
                return {
                    height: `${this.height}px`,
                    position: 'relative'
                }
            }
        }
    };

    export default App;

</script>


<style>
  html, body, .app {
    height: 100%;
  }

  html {
    font-family: 'Roboto', sans-serif;
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

  .form-content, .form-card {
    width: 100%;
  }

  .table-section {
    margin: 1rem 0;
  }

</style>
