// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'//引入Vue
import App from './App'//引入App component组件
import router from './router'//引入路由；
import ElementUI from 'element-ui';
import axios from '@/util/http.js';
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/store.js';
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,//将VUEX注册到根应用上
  router,//路由挂载到实例上；
  components: { App },
  template: '<App></App>'
})
