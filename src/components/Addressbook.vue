<template>
  <div class="wrapper">
    <h1>Address book</h1>
    <Search/>
    <hr>
    <ul>
      <Card
        v-for="address of addressbook"
        :address="address"
        :key=address.id
      />
    </ul>
    <ModalWindow v-if="createWindow" @createContact = "createContact"/>
    <div class="create">
      <span class="material-icons " @click="showModal">
        add
      </span>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card"
import Search from "../components/Search"
import ModalWindow from "../components/ModalWindow"

export default {
  name: "Addressbook",
  components: { Card, Search, ModalWindow },
  props: {
    addressbook: {
      type: Array
    }
  },
  data: () => ({
    createWindow: false
  }),
  methods: {
    showModal () {
      this.createWindow = !this.createWindow
    },
    createContact (data) {
      this.createWindow = !this.createWindow
      console.log(data)
    }
  }
}
</script>

<style  scoped>
.wrapper {
  max-width: 400px;
  margin: auto;
}

ul{
  display: list-item;
  list-style: none;
}

hr{
  color: #cccccc;
}

.create{
  position: absolute;
  bottom: 60px;
  right: 60px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: teal;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
}
</style>>
