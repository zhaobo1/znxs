// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'//引入Vue
import App from './App'//引入App component组件
import router from './router'//引入路由；
import ElementUI from 'element-ui';
// import './variables.scss';
//这里导入会是的app.css体积过大，不太改动的资源不必打包到app.css中；
//使用cdn是一个合适的选择；
//自定义主题皮肤，不可动态选择；
import {Message} from 'element-ui';
import axios from '@/util/http.js';
import store from './store/store.js';
import Api from '@/Api/api.js'; 
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$baseURL = Api.baseURL;
Vue.prototype.$Message = Message;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,//将VUEX注册到根应用上
  router,//路由挂载到实例上；
  components: { App },
  template: '<App></App>'
})
