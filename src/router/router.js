import { createRouter, createWebHistory } from 'vue-router';
import IndexHome from '../views/home/IndexHome.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: IndexHome,
        meta: { showHeader: true, showSideBar: true }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;