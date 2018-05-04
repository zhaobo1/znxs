import Vue from 'vue';
import Router from 'vue-router';
import LayOut from '@/components/layout/layout';
import Login from '@/components/login/login';
import people from '@/components/task/people';
import airplane from '@/components/task/airplane';
import weather from '@/components/weather/weather';
import map from '@/components/map/map';
import store from './../store/store.js';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'
Vue.use(Router);
var router = new Router({
  routes:[
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/map',
      component:LayOut,
      children:[{
        path:'',
        component:map
      }]
    },
    {
      path:'/task',
      component:LayOut,
      children:[
        {
          path:'',
          redirect:'people'
        },
        { 
          path:"people",
          component:people
        },
        {
          path:"airplane",
          component:airplane
        },
        {
          path:"online",
          component:{
            template:'<h1>online</h1>'
          }
        }
        
      ]
    },{
      path:'/posterror',
      component:LayOut
    },
    {
      path:'/dataShow',
      component:LayOut,
      children:[
        {
          path:'',
          redirect:'qixiang'
        },
        {
          path:'qixiang',
          component:weather
        },
        {
          path:'ice',
          component:{
            template:'<h1>ice</h1>'
          }
        },
      ]
    }
  ]
});
// 登录控制
const WriteList = ['/login'];
router.beforeEach((to,from,next)=>{
  Nprogress.start();
  //判断是否登录
  var islogin = store.state.loginStatus;
  // alert(islogin)
  if(islogin){
    //已经登录
    //判断即将进入的路由是否是/login;是重定向到task;不是直接next
    if(to.path==='/login')
    {
      next('/map');
    }else{
      next()
    }
  }else{
    //未登录
    //判断即将进入的路由是否是/login;是就直接next;不是，就重定向到login;
    if(WriteList.indexOf(to.path)!==-1)
    {
      next()
    }else{
      next('/login');
      Nprogress.done();
    }
  }
});
router.afterEach((to,from)=>{
  Nprogress.done();
})
export default router;