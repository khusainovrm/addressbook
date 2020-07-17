<template>
  <div class="app-main-layout" >
    <Navbar @click="isOpen=!isOpen"/>

    <main class="app-content full">
      <div class="app-page center">
        <router-view/>
      </div>
    </main>

  </div>
</template>

<script>
import messages from "@/utils/message"
import Navbar from "@/components/app/Navbar.vue"


export default {
  name: "main-layouy",
  data: () => ({
    isOpen: true,
    tooltip: ''
  }),
  components: {
    Navbar
  },
  mounted (){
  },
  computed : {
  },
  watch: {
    error (fbError){
      this.$error(messages[fbError.message] || "Что-то пошло не так...")
    } 
  }
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
</style>
