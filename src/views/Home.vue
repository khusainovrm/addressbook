<template>
<div> 
  <div class="page-title">

    <h3>{{'Адресная книжка'}}</h3>

    <button 
      class="btn btn-small" 
      @click="openModalWindow=true" 
    >
      <i class="material-icons" data-modal="true">add</i>
    </button>
  </div>

  <div v-if="contacts.length">
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
    <div 
      class="searchWrapper"
      v-if='filtredContacts.length'
    >
     <transition-group name="list" tag="p">
      <Card 
        v-for="contact of filtredContacts"
        :contact="contact"
        :key="contact.id"
      />
       </transition-group>
    </div>
     <p v-else >nothing found</p>
  </div>
  <p v-else @click="openModalWindow=true">У вас еще нет ни одного контакта, создайте новый!</p>

  <ModalWindow 
    v-if="openModalWindow"
    @createContact="createContact"
    @cancel="cancel"
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
      this.$message(error)
      if (error.message){
        await this.$store.dispatch("logout")
        this.$router.push('/login?message=logout')
      }
    }
  },
  computed:  {
    contacts () {
      return this.$store.getters.contacts
    },
    filtredContacts () {
      const contacts = this.$store.getters.contacts.filter(contact => {
        let search = this.search.trim().toLowerCase()
        search = search.replace(/[+()-]+/g, '')
        const phone = contact.phone.replace(/[+()-]+/g, '').toLowerCase()
        const name = contact.name.replace(/[+()-]+/g, '').toLowerCase()

        const isPhoneFound = phone.includes(search)
        const isNameFound = name.includes(search)

        if (isPhoneFound || isNameFound) {
          return true
        }
      })
      return contacts
    }
  },
  methods: {
    createContact(data){
      this.openModalWindow = false
      this.$store.dispatch("createContact", data)
    },
    cancel(){
      this.openModalWindow = false
    }
  }
}
</script>
<style scoped>
.btn{
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
}
.page-title {
  width: 350px;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-move {
  transition: transform 1s
}

</style>
