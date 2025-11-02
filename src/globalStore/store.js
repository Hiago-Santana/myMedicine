import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore("appStore", () => {
    const medicationsStore = ref(null);
    const medicationLog = ref(null);

    async function init () {
        medicationsStore.value = [];
        medicationLog.value = [];
    }

    return { medicationsStore, medicationLog, init };
})