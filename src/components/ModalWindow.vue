<template>
  <div class="modalWindow" >
    <div class="formContainer">
      <h3>Создание контакта</h3>
      <form 
        @submit.prevent="onSubmit" 
        method="post"
      >
        <input
          type="text"
          placeholder="Имя"
          name="name"
          v-model="name"
          :class="{invalid:(!$v.name.required && $v.name.$dirty)}"
        >
        <small v-if="!$v.name.required && $v.name.$dirty" class="helper-text invalid">Поле "Имя" не должно быть пустым</small>
        
        <input
          type="tel"
          placeholder="Телефон"
          name="phone"
          v-model="phone"
          pattern="[+]?[0-9]+"
          :class="{invalid:(!$v.phone.required && $v.phone.$dirty)}"
        >
        <small v-if="!$v.phone.required && $v.phone.$dirty" class="helper-text invalid">Поле "Телефон" не должно быть пустым</small>
        <br>
        <button class="btn" type="submit">Создать</button>
        <button class="btn" @click="cancel">Отмена</button>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: "ModalWindow",
  data: () => ({
    name: "",
    phone: ""
  }),
   validations: {
    name: {required},
    phone: {required},

  },
  methods: {
    onSubmit () {
       if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const localData = JSON.parse(localStorage.getItem("userToken"))
      const contact = { 
        name: this.name, 
        phone: this.phone, 
        userId: localData.userId, 
        token: localData.token 
        }
      this.$emit("createContact", contact)
    },
    cancel (e) {
      e.preventDefault()
      this.$emit("cancel")
    }
  }
}
</script>

<style  scoped>
.modalWindow{
  position: absolute;
  max-width: 100%;
  height: 100vh;
  top: 0px;
  right: 0px;
  left: 0px;
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
  height: 50vh;
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

.btn {
  margin-right: 10px;
}

</style>
