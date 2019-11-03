import Vue from 'vue';
import App from './App.vue';
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
Vue.component('v-chart', ECharts);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
