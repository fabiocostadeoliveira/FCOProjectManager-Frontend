import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
//import 'vue-material/dist/theme/default.css'
//import 'vue-material/dist/theme/default-dark.css'
//import 'vue-material/dist/theme/black-green-light.css'
import 'vue-material/dist/theme/black-green-dark.css'
import 'material-design-icons/iconfont/material-icons.css'

import { ConfigAxios } from './functions/ConfigAxios'

Vue.use(VueMaterial)

new ConfigAxios()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
