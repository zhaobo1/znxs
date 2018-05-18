import Vue from 'vue';
import Vuex from 'vuex';
import {LOGININ_MUTATION,LOGINOUT_MUTATION} from './mutationType.js'
Vue.use(Vuex); 
var store = new Vuex.Store({
    state:{
        loginStatus:false,
        count:0,
        countB:0
    },
    getters:{
       revloginStatus(state){
           return !state.loginStatus
       } 
    },
    mutations:{
        [LOGINOUT_MUTATION](state){
            state.loginStatus = false
        },
        [LOGININ_MUTATION](state){
            state.loginStatus = true
        }
    },
    actions:{
      loginOutAction({commit}){
        return new Promise((resolve,reject)=>{
            commit({
                type:'LOGINOUT_MUTATION'
            });
            resolve()
        })
      }
    }
})
export default store;