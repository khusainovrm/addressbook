

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
        throw error
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

        if (contacts.message) {
          throw new Error(contacts.message)
        }

        commit("fetchContacts", contacts.body)

      } catch (error) {
        commit("setError", error)
        throw error
      }
    },
    async saveChanges({ commit }, {name, phone, userId, id, token}) {
      try {
        const url = `http://localhost:3000/contacts/${id}`
        const contactFromServer = await fetch(url, { 
          method: "PUT", headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ name, phone, userId })
        }).then(res => res.json())

        commit("saveChanges", contactFromServer)

      } catch (error) {
        commit("setError", error)
        throw error
      }
    },
    async removeContact({ commit }, { token, id }){
      try {
        const url = `http://localhost:3000/contacts/${id}`
        const data = await fetch(url, { 
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({})
        })
        
        if (data.message) {
          throw new Error(data.message)
        }
        commit("removeContact", id)
      } catch (error) {
        commit("setError", error)
        throw error
      }
    }
  },
  mutations: {
    createContact(state, { contact }) {
      state.contacts.push(contact)
    },
    removeContact(state,id){
      state.contacts = state.contacts.filter(contact => contact.id !== id)
    },
    fetchContacts(state, contacts) {
      state.contacts = contacts
    },
    saveChanges(state, contactUser){
      state.contacts = state.contacts.map(contact => {
        if (contact.id === contactUser.id) {
          return { ...contact, ...contactUser }
        }
        return contact
  
      })
    }
  },
  getters: {
    contacts: s => s.contacts,
    contact: s => s.contact
  }
}
