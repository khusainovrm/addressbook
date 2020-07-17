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
      >
      <input 
        type="text" 
        class="card-content_telephone" 
        v-model="contact.phone" 
        name="phone"
      >
    </div>
    <div class="button remove" @click="removeContact">
      <i class="material-icons">delete</i>
    </div>
        <div class="button edit">
      <i class="material-icons">create</i>
    </div>
  </li>
</template>

<script>
export default {
  name: "Card",
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
.button.edit :hover{
 color:green;
 cursor:pointer;
}

.button.remove :hover{
 color:red;
 cursor:pointer;
}

</style>>
