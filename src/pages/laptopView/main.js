import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import i18n from '../../i18n'
import VueRouter from 'vue-router';

import "vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css";
import VueCookieAcceptDecline from "vue-cookie-accept-decline";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import LaptopView from './components/Home.vue';
Vue.component('vue-cookie-accept-decline', VueCookieAcceptDecline)


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueCookies)
Vue.prototype.$http = axios

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/LaptopView', component: LaptopView },
  ]
});

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
