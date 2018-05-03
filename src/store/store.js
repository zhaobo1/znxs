import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
var store = new Vuex.Store({
    state:{
        loginStatus:true,
        count:0,
        countB:0
    },
    getters:{
       revloginStatus(state){
           return !state.loginStatus
       } 
    },
    mutations:{
        loginOut(state){
            state.loginStatus = false
        }
    },
    actions:{
      loginOutAction({commit}){
        return new Promise((resolve,reject)=>{
            commit({
                type:'loginOut'
            });
            resolve()
        })
      }
    }
})
export default store;