import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null,
    username:null,
    rol:null,
  },
  getters:{
    token: state => state.token,
    username: state => state.username,
    rol: state => state.rol,
    
  },
  
  actions: {
    getLogin({commit},{username,token,rol}){
      commit('setLogin',{username,token,rol})
    },
    
  },mutations: {
    setLogin(state,{username,token,rol}){
      state.token=token
      state.username=username
      state.rol=rol
    },
    resetLogin(state){
      state.token=null
      state.username=null
      state.rol=null
    },
    setAdmin(state,token){
      state.token=token
    }
  },
  modules: {
  }
})
