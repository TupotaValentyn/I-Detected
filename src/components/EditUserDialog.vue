<!--<template>-->
<!--  <div>-->
<!--    <md-dialog :md-active.sync="show">-->
<!--      <md-dialog-title>Change</md-dialog-title>-->
<!--      <form novalidate class="md-layout create-user">-->
<!--        <md-card class="md-layout-item md-size-50 md-small-size-100 form-card">-->

<!--          <md-card-content calss="form-content">-->
<!--            <md-field>-->
<!--              <label for="first-name">First Name</label>-->
<!--              <md-input name="name"-->
<!--                        id="first-name"-->
<!--                        autocomplete="given-name"-->
<!--                        v-model="form.firstName"-->
<!--                        :class="status('name')"/>-->
<!--            </md-field>-->

<!--            <md-field>-->
<!--              <label for="address">Station mac address</label>-->
<!--              <md-input name="macAddress" id="address" autocomplete="given-name" v-model="form.macAddress"-->
<!--                        :class="status('address')"/>-->
<!--            </md-field>-->

<!--            <md-field>-->
<!--              <label for="description">Description</label>-->
<!--              <md-input name="macAddress" id="description" autocomplete="given-name" v-model="form.description"-->
<!--                        :class="status('description')"/>-->
<!--            </md-field>-->
<!--          </md-card-content>-->


<!--          <pre> {{ $v.$model }}</pre>-->

<!--          <md-card-actions>-->
<!--            <md-button type="submit" class="md-primary" v-on:click="createUser($event)">Create user</md-button>-->
<!--          </md-card-actions>-->
<!--        </md-card>-->
<!--      </form>-->
<!--    </md-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        data: () => ({-->
<!--            userData: {-->
<!--                name: null,-->
<!--                macAddress: null,-->
<!--                description: null,-->
<!--                file: null-->
<!--            }-->
<!--        }),-->
<!--        props: ['userId', 'show'],-->
<!--        mounted() {-->
<!--            console.log(this.show);-->
<!--            //     getUser(){-->
<!--        //         axios-->
<!--        //             .get('', this.userId)-->
<!--        //             .then(() => {-->
<!--        //-->
<!--        //             })-->
<!--        //     }-->
<!--        }-->

<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
