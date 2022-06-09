import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Search from "./components/Search.vue";
import Likes from "./components/Likes.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/search", component: Search },
  { path: "/my_list", component: Likes },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;