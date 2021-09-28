import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null,
    username:null
  },
  getters:{
    token: state => state.token,
    username: state => state.username,
    
  },
  
  actions: {
    getLogin({commit},{username,token}){
      commit('setLogin',{username,token})
    },
    
  },mutations: {
    setLogin(state,{username,token}){
      state.token=token
      state.username=username
    },
    resetLogin(state){
      state.token=null
      state.username=null
    }
  },
  modules: {
  }
})
