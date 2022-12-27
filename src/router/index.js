import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser } from "../libs/firebase";

import HomeView from "../views/HomeView.vue";
import ContentEditor from "../views/ContentEditor.vue";
import Login from "../views/Login.vue";

/* ContentChildrenViewer */
import HistoryTab from "../views/content/HistoryTab.vue";
import AboutmeTab from "../views/content/AboutmeTab.vue";
import HomeTab from "../views/content/HomeTab.vue";
import MyworksTab from "../views/content/MyworksTab.vue";
import SocialsTab from "../views/content/SocialsTab.vue";

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
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/content",
      name: "ContentEditor",
      component: ContentEditor,
      meta: { requiresAuth: true },
      children: [
        {
          path: "home",
          name: "HomeTab",
          component: HomeTab,
        },
        {
          path: "history",
          name: "history",
          component: HistoryTab,
        },
        {
          path: "aboutme",
          name: "AboutmeTab",
          component: AboutmeTab,
        },
        {
          path: "myworks",
          name: "MyworksTab",
          component: MyworksTab,
        },
        {
          path: "socials",
          name: "SocialsTab",
          component: SocialsTab,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from) => {
  console.log("hello");
  if (to.meta.requiresAuth) {
    console.log("apakah");
    const user = await getCurrentUser();
    console.log(user);

    if (user) {
      return true;
    } else {
      return "/login";
    }
  }

  if (to.path === "/login") {
    console.log("ditunggu");
    const user = await getCurrentUser();
    console.log("sudah ditunggu");
    if (user) {
      return "/content/home";
    }
  }

  return true;
});

export default router;
