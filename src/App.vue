<template>
  <div id="app">
    <h1 class="app_welcome">Welcome to
      <mark>I Detected</mark>
      admin-panel
    </h1>

    <section>
      <div>
        <md-table v-model="users" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Users</h1>
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Mac Address" md-sort-by="macAddress">{{ item.macAddress }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </section>

    <section>
      <form novalidate class="md-layout">
        <md-card class="md-layout-item md-size-50 md-small-size-100">

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <input v-model="form.firstName" :class="status('nnnn')">
                <input v-model="form.macAddress" :class="status('nnnn')">

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
      <bubble-chart v-bind:data="chartData" />
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
                    macAddress: null
                }
            ],
            text: '',
            form: {
                firstName: null,
                macAddress: null
            },

            //    cart
            dataPoints: null,
            height: 20,

            //    cart custom
            chartData: [
                {
                    label: 'some name',
                    backgroundColor: '#000',
                    data: [
                        {
                            x: 20,
                            y: 25,
                            r: 50
                        }
                    ]


                }
            ]
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
                    .post('https://i-detected-backend.herokuapp.com/users', user)
                    .then(response => {
                        console.log('post', response)
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
            axios
                .get('https://i-detected-backend.herokuapp.com/users')
                .then(response => {
                    console.log('get', response);

                    this.users = response.data.map((user, index) => {
                        return {
                            id: ++index,
                            name: user.name,
                            macAddress: user.station_mac
                        }
                    });
                });

            // chart
            setInterval(() => {
                this.fillData()
            }, 2000);
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

  .app_welcome {
    text-align: center;
  }
</style>
