import axios from 'axios'
import store from '../store/store.js'
import router from '../router/index.js'
import {Message} from 'element-ui'

axios.defaults.timeout = 8000;
axios.interceptors.request.use(request => {
  if (localStorage.getItem('auth')) {
    request.headers.Authorization = localStorage.getItem('auth');
  } else {
    console.log("现在还没有获取到token");
  }
  return request;
}, error => {
  return Promise.reject(error);
});

//download
const downloadUrl = (url) => {
  let iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  iframe.onload = function () {
    document.body.removeChild(iframe);
  };
  document.body.appendChild(iframe);
};
axios.interceptors.response.use(response => {
  if (response.headers['content-type'] === 'application/octet-stream') {
    //说明响应的是文件类型,需要进行下载
    downloadUrl(response.request.responseURL);
    if (response.status == 200) {
      return '下载成功';
    }
    return '下载失败';
  }
  return response;
}, error => {
  if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
    // store.$dispatch('TIMEOUT');
      alert('请求超时')
  }
  if (error.response) {
    if (error.response.status == 401) {
      store.$dispatch("LOGINOUT_MUTATION");
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
      })
    }
  }
  //弹框
  Message({
    message: error.message,
    type: 'error',
    duration: 4 * 1000
  });
});

export default axios;
