<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import messages from "@/utils/message"

export default {
  computed : {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError){
      this.$error(messages[fbError.message] || "Что-то пошло не так...")
    }
  }
}
</script>

<style>

</style>
