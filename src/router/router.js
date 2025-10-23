import { createRouter, createWebHistory } from "vue-router";
import IndexHome from "../views/home/IndexHome.vue";
import IndexMyMedications from "../views/myMedications/IndexMyMedications.vue";
import IndexStatistics from "../views/statistics/IndexStatistics.vue";
import IndexAddMedications from "../views/addMedications/IndexAddMedications.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: IndexHome,
    meta: { showHeader: true, showSideBar: true },
  },
  {
    path: "/meusmedicamentos",
    name: "myMedications",
    component: IndexMyMedications,
    meta: { showHeader: true, showSideBar: true },
  },
  {
    path: "/estatisticas",
    name: "estatistics",
    component: IndexStatistics,
    meta: { showHeader: true, showSideBar: true },
  },
    {
    path: "/adicionarmedicamentos",
    name: "addMedications",
    component: IndexAddMedications,
    meta: { showHeader: true, showSideBar: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
