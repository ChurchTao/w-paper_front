// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/base.css'
import fetch from './service/fetch'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import commentCell from './components/commentCell.vue'
Vue.component('comment-cell', commentCell);


Vue.prototype.$fetch = fetch;

Vue.use(ElementUI)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template:'<App/>'
})
