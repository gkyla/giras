import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash === "#history") {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 65,
      };
    } else {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 100 /* tittle for each section now will be visible */,
      };
    }
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
