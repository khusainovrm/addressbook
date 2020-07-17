import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth";
import record from "@/store/record";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    token: null
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const url = `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`;
      const res = await fetch(url);
      return res.json();
    }
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  getters: {
    error: s => s.error,
    token: s => s.token
  },
  modules: {
    auth,
    record
  }
});
