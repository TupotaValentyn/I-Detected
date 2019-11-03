<template>
  <div>
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


        <pre> {{ $v.$model }}</pre>

        <md-card-actions>
          <md-button type="submit" class="md-primary" v-on:click="createUser($event)">Create user</md-button>
        </md-card-actions>
      </md-card>
    </form>
    <form novalidate class="md-layout">
      <md-card>

        <md-field>
          <label for="image">Image</label>
          <md-input name="file" id="image" type="file" autocomplete="given-name"
                    v-on:change="setImage($event)" v-model="file"
                    :class="status('file')"/>
        </md-field>

        <md-card-actions>
          <md-button type="submit" class="md-primary" v-on:click="addImage()">Set Image</md-button>
        </md-card-actions>
      </md-card>

    </form>
  </div>
</template>

<script>
    import {
        required
    } from 'vuelidate/lib/validators'
    import io from 'socket.io-client';
    import axios from "axios";
    import { validationMixin } from "vuelidate/src";

    export default {
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
            setImage(event) {
                const image = new FormData();
                image.append(event.target.files[0].name, event.target.files[0]);
                this.file = image;
            },
            addImage() {
                axios
                    .patch(`http://192.168.1.204:5000/users/:${this.currentUser}/upload`, this.file)
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
                    file: this.form.file
                };

                axios
                    .post('http://192.168.1.204:5000/users', [user])
                    .then(response => {
                        this.currentUser = response.data._id;
                        console.log('post', response);
                    })
            },
            deleteUser(userId) {
                console.log(userId);
                axios
                    .delete(`https://i-detected-backend.herokuapp.com/users/${userId}`);
            },
            getUser() {
                axios.get('https://i-detected-backend.herokuapp.com/users/')
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

</style>
