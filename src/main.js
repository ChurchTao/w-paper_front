import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/base.css'
import fetch from './service/fetch'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import cookieTools from './service/cookies.js'
import storage from './service/storage.js'

import commentCell from './components/commentCell.vue';
import tagCell from './components/tagCell.vue';
Vue.component('comment-cell', commentCell);
Vue.component('tag-cell', tagCell);


Vue.prototype.$fetch = fetch;
Vue.prototype.$storage=storage;
Vue.prototype.$cookieTools=cookieTools;

Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template:'<App/>'
})
