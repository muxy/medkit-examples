import Vue from 'vue'
import VueMuxy from '../libs/muxy-plugin';
import App from './App.vue'
import config from '../shared/config';

Vue.use(VueMuxy, {
  client_id: config.clientID
});

new Vue({
  el: '#app',
  render: h => h(App)
})