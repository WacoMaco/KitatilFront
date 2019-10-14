import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import i18n from '../../i18n'
import VueRouter from 'vue-router';
import router from '../router'

import "vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css";
import VueCookieAcceptDecline from "vue-cookie-accept-decline";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('vue-cookie-accept-decline', VueCookieAcceptDecline)


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueCookies)
Vue.prototype.$http = axios


new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

