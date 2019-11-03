import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import { Vuelidate } from 'vuelidate';
import ECharts from 'vue-echarts'; // refers to components/ECharts.vue in webpack
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.component('v-chart', ECharts);

import UsersTable from "./components/UsersTable";
import BarChart from "./components/BarChart";

const routes = [
  {
    path: '/',
    component: BarChart
  },
  {
    path: '/users',
    component: UsersTable
  }
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
