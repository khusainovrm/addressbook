<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">

    <router-link 
    v-for="link in links"
    :key="link.url"
    tag="li" 
    active-class="active"
    :exact="link.exact"
    :to="link.url"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
</ul>
</template>

<script>


export default {
  data: () => ({
    links: [
      {title:'Bill_name', url: "/", exact: true},
      {title:'Bill_history', url: "/history"},
      {title:'Bill_plan', url: "/planing"},
      {title:'Bill_record', url: "/record"},
      {title:'Bill_category', url: "/categories"}
    ]
  }),
  props: ["value"]

}
</script>

<style>

</style>
