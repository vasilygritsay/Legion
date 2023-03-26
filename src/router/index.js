import { createWebHistory, createRouter } from "vue-router";

import Main from "@/pages/Main.vue";
import Mint from "@/pages/Mint.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/minting",
    name: "Minting",
    component: Mint,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
