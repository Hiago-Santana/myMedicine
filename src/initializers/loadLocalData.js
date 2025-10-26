import { openDb, listMedications } from '../composables/indexedDB/useIndexedDB';
import { useAppStore } from '../globalStore/store';

export async function loadMedicationsLocalData() {
    let success;
    try {
        const db = await openDb();
        const medications = await listMedications(db);

        if (!medications) throw new Error("Error geting medications");
        const store = useAppStore();
        store.medicationsStore = medications;
        console.log("store", store)
        success = true;
        return success;

    } catch (error) {
        console.error('Erro: ', error);
        success = false;
        return success
    }

}