import { createWebHistory, createRouter } from "vue-router";

import Main from "@/pages/Main.vue";
import Mint from "@/pages/Mint.vue";
import Thanks from "@/pages/Thanks.vue";

import routesConstants from "@/constants/routes.js";

const routes = [
  {
    path: routesConstants.MAIN,
    name: "Main",
    component: Main,
  },
  {
    path: routesConstants.MINT,
    name: "Minting",
    component: Mint,
  },
  {
    path: routesConstants.THANKS,
    name: "Thanks",
    component: Thanks,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
