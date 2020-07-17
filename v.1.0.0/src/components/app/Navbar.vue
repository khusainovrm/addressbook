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
            "ИМЯ"
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
                <i class="material-icons">account_circle</i>Profile 
            </li>
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
    interval: null,

  }),
  mounted () {
       this.dropDown = M.Dropdown.init(this.$refs.dropDown)
       this.interval =  setInterval(()=> {
         this.date = new Date ()
         }, 1000)
  },
  computed: {
  },
  methods: {
    async logout () {
      await this.$store.dispatch("logout")
      this.$router.push('/login?message=logout')
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropDown && this.dropDown.destroy) {
      this.dropDown.destroy()
    }
  }
}
</script>

<style>

</style>
