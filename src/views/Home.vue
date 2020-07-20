<template>
<div @click="checkModal"> 
  <div class="page-title">

    <h3>{{'Адресная книжка'}}</h3>

    <button 
      class="btn waves-effect waves-light btn-small" 
      @click="openModalWindow=true" 
      data-modal="true"
    >
      <i class="material-icons" data-modal="true">add</i>
    </button>
  </div>

  <div class="row">
    <input 
      type="text" 
      placeholder="Поиск..." 
      class="col" 
      name="search"
      v-model="search"
    >
    <div class="card"></div>
  </div>

  <div v-if="contacts">
    <Card 
      v-for="contact of contacts"
      :contact="contact"
      :key="contact.id"
    />
  </div>
  <p v-else @click="openModalWindow=true">no contacts here, create new one</p>

  <ModalWindow 
    v-if="openModalWindow"
    @createContact="createContact"
  />
</div>
</template>

<script>
import Card from '../components/Card'
import ModalWindow from '../components/ModalWindow'

export default {
  name: 'Home',
  data: () => ({
    openModalWindow: false,
    search:""
  }),
  components: {
    Card, ModalWindow
  },
  async created() {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"))
      await this.$store.dispatch("fetchContacts", token)
    } catch (error) { 
      console.error(error)
    }

    
  },
  computed:  {
    contacts: function () {
      const c = this.$store.getters.contacts
      console.log(c)  // TODO check
      
      return c
    }
  },
  methods: {
    createContact(data){
      this.openModalWindow = false
      this.$store.dispatch("createContact", data)
    },
    checkModal (e) {
      const isModalOpened = (e.target.dataset.modal === "true")
      if (!isModalOpened) {
        this.openModalWindow = false
      }
    }
  },
  watch:{
    search(){
      const filter = Object.keys(this.contacts).map(contact => {
        console.log(contact)
        if (this.contacts[contact].phone.includes("7")) {
          
          return contact
        }
      })
      console.log(filter)
    }
  }
}
</script>
