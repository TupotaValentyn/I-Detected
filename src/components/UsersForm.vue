<template>
  <form novalidate class="md-layout">
    <md-card class="md-layout-item md-size-50 md-small-size-100 form-card">
      <md-card-content calss="form-content">
        <md-field>
          <label for="first-name">First Name</label>
          <md-input
            name="name"
            id="first-name"
            autocomplete="given-name"
            v-model="form.firstName"
            :class="status('nnnn')"
          />
        </md-field>

        <md-field>
          <label for="address">Station mac address</label>
          <md-input
            name="macAddress"
            id="address"
            autocomplete="given-name"
            v-model="form.macAddress"
            :class="status('nnnn')"
          />
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
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import axios from "axios";

export default {
  mixins: [validationMixin],
  data: () => ({
    staticUser: [],
    text: "",
    form: {
      firstName: null,
      macAddress: null
    }
  }),
  validations: {
    form: {
      firstName: {
        required
      },
      macAddress: {
        required
      }
    }
  },
  methods: {
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty
      };
    },
    createUser(event) {
      event.preventDefault();

      const user = {
        name: this.form.firstName,
        station_mac: this.form.macAddress
      };

      axios
        .post("https://i-detected-backend.herokuapp.com/users", [user])
        .then(response => {
          console.log("post", response);
        });
    }
  },
  computed: {
    myStyles() {
      return {
        height: `${this.height}px`,
        position: "relative"
      };
    }
  }
};
</script>