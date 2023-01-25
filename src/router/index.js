import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser } from "../libs/firebase";

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
      /* Prevent error when the page doesnt have hash  */
      if (to.hash !== "") {
        return {
          el: to.hash,
          behavior: "smooth",
          top: 100 /* tittle for each section now will be visible */,
        };
      }
    }
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/content",
      name: "ContentEditor",
      component: () => import("../views/ContentEditor.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "home",
          name: "HomeTab",
          component: () => import("../views/content/HomeTab.vue"),
        },
        {
          path: "history",
          name: "history",
          component: () => import("../views/content/HistoryTab.vue"),
        },
        {
          path: "aboutme",
          name: "AboutmeTab",
          component: () => import("../views/content/AboutmeTab.vue"),
        },
        {
          path: "myworks",
          name: "MyworksTab",
          component: () => import("../views/content/MyworksTab.vue"),
        },
        {
          path: "socials",
          name: "SocialsTab",
          component: () => import("../views/content/SocialsTab.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    const user = await getCurrentUser();

    if (user) {
      return true;
    } else {
      return "/login";
    }
  }

  if (to.path === "/login") {
    const user = await getCurrentUser();
    if (user) {
      return "/content/home";
    }
  }

  return true;
});

export default router;
