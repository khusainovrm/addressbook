/* eslint-disable no-useless-catch */
import firebase from "firebase/app";

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const token = await fetch("http://localhost:3000/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify({ email, password })
        }).then(response => response.json());

        const localData = "userToken";
        if (token.token) {
          localStorage.setItem(
            localData,
            JSON.stringify({ ...token, email, password })
          );
          console.log(token.token);
        }

        if (!token.message) {
          commit("setToken", token);
          return token;
        } else {
          throw new Error(token.message);
        }
      } catch (e) {
        commit("setError", e);
      }
    },
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`users/${uid}/info/`)
          .set({
            name,
            bill: 1000
          });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    }
  }
};
