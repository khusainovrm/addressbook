<template>
<div>
  <div class="page-title">
    <!-- <Navbar/> -->
    <h3>{{'Адресная книжка'}}</h3>

    <button class="btn waves-effect waves-light btn-small" >
      <i class="material-icons">refresh</i>
    </button>
  </div>



  <div class="row">
    <input type="text" placeholder="Поиск...">
    <div class="card"></div>
  </div>
</div>
</template>

<script>
// import Navbar from '../components/app/Navbar'

export default {
  name: 'Home',
  data: () => ({
  }),
  components: {
    // Navbar
  },
  mounted () {},
  methods: {
  }
}
</script>
