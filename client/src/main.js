import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from "vuelidate/src"
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from '../src/utils/messge.plugin'
import Tabs from 'vue-tabs-component'
import 'material-design-icons-iconfont'
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';


Vue.config.productionTip = false

Vue.use(VueFilterDateFormat)
Vue.use(Tabs);
Vue.use(Vuelidate)
Vue.use(messagePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
