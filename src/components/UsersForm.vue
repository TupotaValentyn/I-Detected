<template>
  <div>
  <md-dialog-alert
      :md-active.sync="createdSuccesseded"
      md-content="User has been created!"
      md-confirm-text="Cool!" />

    <form novalidate class="md-layout create-user">
      <md-card class="md-layout-item md-size-50 md-small-size-100 form-card">
        <md-card-content calss="form-content">
          <md-field>
            <label for="first-name">First Name</label>
            <md-input name="name"
                      id="first-name"
                      autocomplete="given-name"
                      v-model="form.firstName"
                      :class="status('name')"/>
          </md-field>

          <md-field>
            <label for="address">Station mac address</label>
            <md-input name="macAddress" id="address" autocomplete="given-name" v-model="form.macAddress"
                      :class="status('address')"/>
          </md-field>

          <md-field>
            <label for="description">Description</label>
            <md-input name="macAddress" id="description" autocomplete="given-name" v-model="form.description"
                      :class="status('description')"/>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary" v-on:click="createUser($event)">Create user</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
    import {
        required
    } from 'vuelidate/lib/validators'
    import axios from "axios";
    import { validationMixin } from "vuelidate/src";
    import { host } from "../config";

    export default {
        mixins: [validationMixin],
        data: () => ({
            createdSuccesseded: false,
            users: [
                {
                    id: null,
                    name: null,
                    macAddress: null,
                    userId: null
                }
            ],
            staticUser: [],
            text: '',
            form: {
                firstName: null,
                macAddress: null,
                description: null,
            },
            currentUser: null,
            file: null,

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
            clearForm() {
              this.form.firstName = null;
              this.form.macAddress = null;
              this.form.description = null;
            },
            setImage(event) {
                const image = new FormData();
                image.append('pic', event.target.files[0]);
                this.file = image;
            },
            addImage(event) {
                event.preventDefault();
                axios
                    .patch(`${host}/users/${this.currentUser}/upload`, this.file)
                    .then(response => {
                        console.log('patch', response);
                    })
            },
            status(validation) {
                return {
                    error: validation.$error,
                    dirty: validation.$dirty
                }
            },
            createUser(event) {
                event.preventDefault();

                const user = {
                    name: this.form.firstName,
                    station_mac: this.form.macAddress,
                    text: this.form.description,
                };

                axios
                    .post(`${host}/users`, [user])
                    .then(response => {
                        this.currentUser = response.data._id;
                        console.log('post', response);

                        this.createdSuccesseded = true;
                        setTimeout(() => {
                          this.createdSuccesseded = false;
                        }, 3000)
                        this.clearForm();
                    })
            },
            deleteUser(userId) {
                console.log(userId);
                axios
                    .delete(`${host}/users/${userId}`);
            },
            getUser() {
                axios.get(`${host}/users/`)
                    .then((response) => {
                        if (response) {
                            this.staticUser = response.data.map((user, index) => {
                                return {
                                    id: ++index,
                                    name: user.name,
                                    macAddress: user.station_mac,
                                    userId: user._id
                                }
                            });
                        }
                    })
            },
        }
    };
</script>
<style>
  .create-user {
    margin: 0 0 1rem 0;
  }

  .md-layout {
    width: 100%;
  }

  .md-card {
    width: 100%;
  }

  /* input[type="file"] {
    opacity: 0;
  } */
</style>
