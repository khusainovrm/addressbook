<template>
  <nav class="navbar blue lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              ref="dropDown"
              href="#"
              data-target="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a class="black-text" @click="logout">
                  <i class="material-icons">assignment_return</i>Logout           
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css'

export default {
  data: () => ({
    name: ""
  }),
  mounted () {
    this.dropDown = M.Dropdown.init(this.$refs.dropDown)
    this.name = JSON.parse(localStorage.getItem("userToken")).name
  },
  methods: {
    async logout () {
      await this.$store.dispatch("logout")
      this.$router.push('/login?message=logout')
    }
  },
  beforeDestroy () {
    if (this.dropDown && this.dropDown.destroy) {
      this.dropDown.destroy()
    }
  }
}
</script>

<style scoped>
nav {
  position: fixed;
}
</style> >

