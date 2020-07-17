<template>
  <div class="modalWindow" >
    <div class="formContainer" data-modal="true">
      <h3 data-modal="true">Создание контакта</h3>
      <form @submit.prevent="onSubmit" method="post" data-modal="true">
        <input
          type="text"
          placeholder="Имя"
          name="name"
          data-modal="true"
          v-model="name"
          required
        >
        <input
          type="tel"
          placeholder="Телефон"
          name="phone"
          v-model="phone"
          data-modal="true"
          pattern="[+]?[0-9]+"
          required
        >
        <br data-modal="true">
        <button class="btn" type="submit" data-modal="true">Создать</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  data: () => ({
    name: "",
    phone: ""
  }),
  methods: {
    onSubmit () {
      const localData = JSON.parse(localStorage.getItem("userToken"))
      const contact = { 
        name: this.name, 
        phone: this.phone, 
        userId: localData.userId, 
        token: localData.token 
        }
      this.$emit("createContact", contact)
    },
  }
}
</script>

<style  scoped>
.modalWindow{
  position: absolute;
  max-width: 100%;
  height: 100%;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
.formContainer{
  position: relative;
  top: 100px;
  width: 400px;
  height: 70vh;
  padding: 20px;
  border: 1px solid #cccccc;
  box-shadow: 3px 3px 10px black;
  background:white;
}
input{
  margin-bottom: 10px;
}
button {
  margin-top: 20px;
}

</style>
