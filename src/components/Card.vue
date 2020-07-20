<template>
  <li class="card main">
    <div class="card-info">
      <div class="card-info_name card-content_name">Имя: </div>
      <div class="card-info_telephone">Телефон: </div>
    </div>
    <div class="card-content">
      <input 
        type="text" 
        class="card-content_name" 
        v-model="contact.name" 
        name="name"
        ref="name"
        readonly="readonly"
      >
      <input 
        type="text" 
        class="card-content_telephone" 
        v-model="contact.phone" 
        ref="phone"
        name="phone"
        readonly="readonly"
      >
    </div>
    <div 
      class="button remove" 
      @click="removeContact"
    >
      <i class="material-icons">delete</i>
    </div>
    <div 
      class="button edit" 
      @click="editContact"
    >
      <i class="material-icons">create</i>
    </div>

    <div 
      v-if="edit"
      class="button edit done" 
      @click="saveChanges"
    >
      <i class="material-icons">done</i>
    </div>
    
  </li>
</template>

<script>
export default {
  name: "Card",
  data:() => ({
    edit: false
  }),
  props: {
    contact: {
      type: Object, required: true
    }
  },
  methods: {
    async removeContact(){
      try {
        const token = JSON.parse(localStorage.getItem("userToken")).token
        const data = { token, id: this.contact.id }
        await this.$store.dispatch("removeContact", data)
        console.log("remove contact", data)
      } catch (error) {
        console.error(error)
      }

    },
    editContact(){
      this.edit = true
      const name = this.$refs.name
      const phone = this.$refs.phone
      name.removeAttribute("readonly")
      phone.removeAttribute("readonly")
      // name.setAttribute("readonly", "editable")
    },
    saveChanges(){
      const name = this.$refs.name
      const phone = this.$refs.phone
      try {
        const token = JSON.parse(localStorage.getItem("userToken")).token
        const contact = {...this.contact, token }
        this.$store.dispatch("saveChanges", contact )

      } catch (error) {
        console.log(error)
      }

      name.setAttribute("readonly", "editable")
      phone.setAttribute("readonly", "editable")
      this.edit = false
    }
  }
}
</script>

<style scoped>
.card{
  position: relative;
  padding: 15px;
  border: 1px solid #ccc;
  width: 300px;
  display: grid;
  grid-template-columns: 35% 65%;
  align-items: center;
  box-shadow: 3px 3px 2px #888;
  border-radius: 5px;
  text-align: left;
  margin-bottom: 10px;
}
.card-info{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
li{
  list-style: none;
}
.button{
  position: absolute;;
  right: 0px;
  padding: 2px;
}
.remove{
  top:0px;
}
.edit{
  top:24px;
}
.done {
  top: 48px;
}
.button.edit :hover{
 color:green;
 cursor:pointer;
}

.button.remove :hover{
 color:red;
 cursor:pointer;
}

</style>>
