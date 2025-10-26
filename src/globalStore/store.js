import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore("appStore", () => {
    const medicationsStore = ref(null);

    async function init () {
        medicationsStore.value = [];
    }

    return { medicationsStore, init };
})