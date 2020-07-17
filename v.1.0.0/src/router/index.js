import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      meta: { layout: "empty" },
      component: () => import("../views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      meta: { layout: "empty" },
      component: () => import("../views/Register.vue")
    },
    {
      path: "/",
      name: "home",
      meta: { layout: "main", auth: true },
      component: () => import("../views/Home.vue")
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.auth)) {
//   }
// });

export default router;
