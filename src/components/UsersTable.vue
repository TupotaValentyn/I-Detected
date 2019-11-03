<template>
  <div>
    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Change</md-dialog-title>
        <form novalidate class="md-layout create-user">
          <md-card class="md-layout-item md-size-50 md-small-size-100 form-card my-dialog">
            <md-card-content calss="form-content">
              <md-field>
                <label for="first-name">First Name</label>
                <md-input name="name"
                          id="first-name"
                          autocomplete="given-name"
                          v-model="form.firstName"
                />
              </md-field>

              <md-field>
                <label for="address">Station mac address</label>
                <md-input name="macAddress" id="address" autocomplete="given-name" v-model="form.macAddress"
                />
              </md-field>

              <md-field>
                <label for="description">Description</label>
                <md-input name="macAddress" id="description" autocomplete="given-name" v-model="form.description"
                />
              </md-field>
              <md-field>
                <label for="image">Image</label>
                <md-input name="file" id="image" type="file" autocomplete="given-name"
                          v-on:change="setImage($event)" v-model="file"
                />
              </md-field>
            </md-card-content>
            <md-card-actions>
              <md-button type="submit" class="md-primary" v-on:click="changeUser($event)">Change user</md-button>
            </md-card-actions>
          </md-card>
        </form>
      </md-dialog>
    </div>

    <div>
      <md-table v-model="staticUser" md-card>
        <md-table-toolbar>
          <h1 class="md-title">Users</h1>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{
            item.id
            }}
          </md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="name">{{
            item.name
            }}
          </md-table-cell>
          <md-table-cell
            md-label="Mac Address"
            align="center"
            md-sort-by="macAddress"
          >
            <md-table>
              <md-table-row class="delete-user_row">
                <md-table-cell>
                  <div class="delete-user">
                    <span>{{ item.macAddress }}</span>
                    <md-button
                      class="md-primary"
                      v-on:click="deleteUser(item.userId)"
                    >Delete user
                    </md-button>

                    <md-button
                      class="md-primary"
                      v-on:click="editUser(item.userId)"
                    >edit user
                    </md-button
                    >
                  </div>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-table-cell>
          <md-table-cell
            class="picture-cell"
            md-label="Picture"
            md-sort-by="name"
          >
            <img :src="item.pic" alt=""/>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
    import { host } from "../config";
    import {
        required
    } from 'vuelidate/lib/validators'

    export default {
        data: () => ({
            staticUser: [],
            showDialog: false,
            selectedUser: null,
            text: "",
            form: {
                firstName: null,
                macAddress: null,
                description: null,
            },

            file: null
        }),
        props: {},
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
            deleteUser(userId) {
                console.log(userId);
                axios.delete(`${host}/users/${userId}`);
            },
            getUsers() {
                axios.get(`${host}/users/`).then(response => {
                    if (response) {
                        this.staticUser = response.data.map((user, index) => {
                            return {
                                id: ++index,
                                name: user.name,
                                macAddress: user.station_mac,
                                userId: user._id,
                                pic: `${host}/uploads/${user.pic}`
                            };
                        });
                    }
                });



            },
            getUser(id) {
                axios.get(`${host}/users/${this.selectedUser}/upload`).then(response => {
                    console.log(response);
                    console.log(id);
                    // this.form.firstName =
                });
            },
            editUser(userId) {
                this.selectedUser = userId;
                this.showDialog = true;
            },

            setImage(event) {

                const image = new FormData();
                image.append('pic', event.target.files[0]);
                this.file = image;

                event.preventDefault();
                axios
                    .patch(`${host}/users/${this.selectedUser}/upload`, this.file)
                    .then(response => {
                        console.log('patch', response);
                    })
            },

            changeUser(event) {
                event.preventDefault();
                const user = new FormData();
                user.append('name', this.form.firstName);
                user.append('station_mac', this.form.macAddress);
                user.append('text', this.form.description);


                console.log(user);

                axios
                    .put(`${host}/users/${this.selectedUser}`, user, {'Content-Type': 'multipart/form-data'})
                    .then(response => {
                        this.currentUser = response.data._id;
                        console.log('post', response);
                    });
                this.showDialog = false;
            }
        },
        mounted() {
            this.getUsers();
        }
    };
</script>

<style scoped>
  tbody .md-table-row td {
    border-top: none;
  }

  .picture-cell {
    width: 250px;
  }

  .my-dialog, .form-content {
    min-width: 100%;
  }
</style>
