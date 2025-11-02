import { openDb, listItem } from '../composables/indexedDB/useIndexedDB';
import { useAppStore } from '../globalStore/store';

export async function loadMedicationsLocalData() {
    let success;
    try {
        const db = await openDb();
        const medications = await listItem(db, 'medication');
        const medicationLog = await listItem(db, 'medicationLog');

        if (!medications) throw new Error("Error geting medications");
        const store = useAppStore();
        store.medicationsStore = medications;

        if (!medicationLog) throw new Error("Error geting medicatonLog");
        store.medicationLog = medicationLog;
        
        success = true;
        return success;

    } catch (error) {
        console.error('Erro: ', error);
        success = false;
        return success
    }

}