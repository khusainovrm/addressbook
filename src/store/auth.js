/* eslint-disable no-useless-catch */
import firebase from 'firebase/app'
import jwt from 'jsonwebtoken'


export default {
  actions: {
    async login( {commit}, {email, password}){
      try {
        const data = await fetch("http://localhost:3000/users/").then(response => response.json())
        const currentUser = data.filter(user => user.email === email && user.password === password)
        const token = jwt.sign(
          { userId: currentUser[0].id },
          process.env.VUE_APP_JWT,
          { expiresIn: '1h' }
        )
        currentUser[0].token = token
  
        commit("login", {email, password})
        return currentUser
      } catch (e) {
        commit("setError", e)
      }
    },
    async register ({commit, dispatch}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch("getUid")
        await firebase.database().ref(`users/${uid}/info/`).set({
          name,
          bill: 1000
        })
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout({commit}) {
      await firebase.auth().signOut()
      commit("clearInfo")
    }
  }
}
