import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth";
import contacts from "@/store/contacts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    token: null
  },
  actions: {

  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
    setToken(state, data) {
      state.token = data.token
    },
    clearInfo(state){
      state.token = null
    }
  },
  getters: {
    error: s => s.error,
    token: s => s.token
  },
  modules: {
    auth,
    contacts
  }
})
