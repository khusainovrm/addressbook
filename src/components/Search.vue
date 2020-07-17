<template>
  <div class="search">
    <form action="">
      <input type="text" placeholder="Поиск по имени или телефону">
      <button type="submit">Search</button>
    </form>

  </div>
</template>

<script>
export default {
  name: "Search"

}
</script>

<style scoped>
.search{
  margin: auto;
}
input{
  margin-right: 10px;
}
</style>
