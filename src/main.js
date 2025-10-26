import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAppStore } from './globalStore/store';
import { loadMedicationsLocalData } from './initializers/loadLocalData';
import './style.css';
import App from './App.vue';
import router from './router/router';

    
async function bootStrap() {
    const app = createApp(App);
    const pinia = createPinia();

    app.use(pinia);
    app.use(router);
    
    const store = useAppStore();
    await store.init();
    await loadMedicationsLocalData();

    app.mount('#app');
};

bootStrap();






