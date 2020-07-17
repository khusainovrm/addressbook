

export default {
  state: {
    contacts: [],
    contact: []
  },
  actions: {
    async createContact({commit}, {name, phone, userId, token} ){
      try {
        const url = "http://localhost:3000/contacts"
        const response = await fetch(url, { 
          method: "POST", 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ name, phone, userId })
        }).then(res => res.json())
        commit("createContact", response )
      } catch (error) {
        commit("setError", error)
      }
    },
    async fetchContacts({ commit }, { token, userId }) {
      try {
        const url = `http://localhost:3000/contacts?userId=${userId}`
        const contacts = await fetch(url, { 
          method: "GET", headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token }
        }).then(res => res.json())

        commit("fetchContacts", contacts)

      } catch (e) {
        commit("setError", e);
      }
    },
    async removeContact({ commit }, { token, id }){
      try {
        const url = `http://localhost:3000/contacts/${id}`
        await fetch(url, { 
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({})
        })
        commit("removeContact", id)
      } catch (error) {
        commit("setError", error)
      }
    }
  },
   mutations: {
     createContact(state, contact) {
        state.contacts.push(contact)
     },
     removeContact(state,id){
       state.contacts = state.contacts.filter(contact => contact.id !== id)
     },
     fetchContacts(state, contacts) {
       state.contacts = contacts
     }
   },
   getters: {
     contacts: s => s.contacts,
     contact: s => s.contact
   }
}
