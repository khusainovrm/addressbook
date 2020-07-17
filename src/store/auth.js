/* eslint-disable no-useless-catch */
import {localStorageTokenName} from '../../config/config'

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const data = await fetch("http://localhost:3000/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify({ email, password })
        }).then(response => response.json())

        if (data.token) {
          localStorage.setItem(
            localStorageTokenName,
            JSON.stringify({ ...data, email })
          )
        }

        if (!data.message) {
          commit("setToken", data)
          return data
        } else {
          throw new Error(data.message)
        }
      } catch (e) {
        commit("setError", e);
      }
    },
    async register({ commit }, { email, password, name }) {
      try {
          const resp = await fetch("http://localhost:3000/register/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ email, password, name })
          }).then(response => response.json())

          if (resp.token) {
            localStorage.setItem(
              localStorageTokenName,
              JSON.stringify({ ...resp, email })
            )
          }
      } catch (e) {
        commit("setError", e)
        throw e;
      }
    },
    async logout({ commit }) {
      localStorage.removeItem(localStorageTokenName)
      commit("clearInfo")
    }
  }
}
