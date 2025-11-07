<template>
    <div v-if="isMedication">
        <form @submit.prevent class="mt-4">
            <div
                class="border border-gray-200 rounded-md shadow-md/20 p-2 pb-10 w-full dark:bg-fourth dark:border-gray-700">


                <div class="flex justify-between my-2">
                    <h2 class="font-bold">Editar medicamento</h2>
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </div>

                <div class="flex flex-col gap-4 my-4">
                    <div class="my-1">
                        <label class="font-semibold">Nome do medicamento</label>
                        <input v-model="medication.name" type="text" placeholder="Ex: Losartana" required
                            class="w-full border border-gray-300 rounded-md p-1 capitalize dark:border-gray-700">
                    </div>
                    <div class="my-1">
                        <label class="font-semibold">Dosagem</label>
                        <div class="flex gap-2">
                            <input v-model="medication.dosage" type="number" placeholder="Ex: 50" required
                                class="w-full border border-gray-300 rounded-md p-1 dark:border-gray-700">

                            <select v-model="dosageUnit"
                                class="border border-gray-300 rounded-md p-1 dark:bg-fourth dark:border-gray-700">
                                <option value="mg">mg</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                                <option value="mcg">mcg</option>
                                <option value="UI">UI</option>
                                <option value="gout">gotas</option>
                            </select>
                        </div>
                    </div>
                    <div class="my-1">
                        <label class="font-semibold">Quantidade e apresentação</label>
                        <div class="flex gap-2">
                            <input v-model="medication.quantity" type="number" placeholder="Ex: 2" required
                                class="border border-gray-300 rounded-md p-1 w-12 max-w-20 dark:border-gray-700">

                            <select v-model="formType"
                                class="w-full border border-gray-300 rounded-md p-1 dark:bg-fourth dark:border-gray-700">
                                <option value="cp">comprimido(s)</option>
                                <option value="cap">capsula(s)</option>
                                <option value="gout">gota(s)</option>
                                <option value="ml">ml</option>
                                <option value="aplication">aplicação(ões)</option>
                                <option value="inhalation">inalação(ões)</option>
                                <option value="sachet">sachê(s)</option>
                            </select>
                        </div>
                    </div>
                    <div class="my-1">
                        <label class="font-semibold">Dia e horário da primeira dose</label>
                        <div class="flex gap-2">
                            <input v-model="medication.date" type="date" required
                                class="w-full border border-gray-300 rounded-md p-1 capitalize dark:border-gray-700">
                            <input v-model="medication.time" type="time" required
                                class="w-full border border-gray-300 rounded-md p-1 capitalize dark:border-gray-700">
                        </div>
                    </div>
                    <div class="my-1">
                        <label class="font-semibold">Frequência</label>
                        <div class="flex flex-col gap-4">

                            <div class="flex flex-col">
                                <label class="text-md">Qual frequência?</label>
                                <select v-model="frequencyUnit" required
                                    class="w-full border border-gray-300 rounded-md p-1 dark:bg-fourth dark:border-gray-700">
                                    <option value="daily">diaria</option>
                                    <option value="weekly">semanal</option>
                                    <option value="biweekly">quinzenal</option>
                                    <option value="monthly">mensal</option>
                                </select>
                            </div>

                            <div v-if="frequencyUnit === 'daily'" class="flex flex-col gap-2 mb-2">
                                <label>Quantas vezes por dia?</label>
                                <input v-model="medication.frequencyValue" type="number" required
                                    class="border border-gray-300 rounded-md p-1 dark:border-gray-700">
                            </div>
                            <div v-if="frequencyUnit === 'weekly'">
                                <label>Dias da semana</label>
                                <div class="flex gap-2 justify-between">
                                    <div v-for="days in dayOfWeek" :key="days.day" class="flex-1">
                                        <button type="button" @click="days.active = !days.active" :class="[
                                            days.active ? dayFormatActived : dayFormaDesactived,
                                            'w-full font-semibold border rounded-md p-2 text-center hover:bg-second hover:text-white transition'
                                        ]">
                                            {{ days.day }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="flex flex-col my-1">
                        <label class="font-semibold">Observações</label>
                        <textarea v-model="notes" rows="3"
                            class="w-full border border-gray-300 rounded-md p-1 dark:border-gray-700"></textarea>
                    </div>
                </div>
                <div class="flex gap-4 my-2">
                    <button @click="showConfirmationModal = true" type="button"
                        class="flex justify-center items-center gap-1 w-full text-center font-semibold border border-red-300 bg-red-700 text-white hover:bg-red-800 p-2 rounded-md dark:border-gray-700">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                        <span>Excluir</span>
                    </button>
                    <button @click="goBack(router)" type="button"
                        class="w-full text-center font-semibold border border-gray-300 hover:bg-gray-200 p-2 rounded-md dark:border-gray-700">
                        Cancelar
                    </button>
                    <button :disabled="disabled" type="submit" @click="updadateMedication()"
                        class="w-full text-center font-semibold bg-first text-white hover:bg-first/85 p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                        Alterar
                    </button>
                </div>
            </div>
        </form>
        <dialog-modal v-if="showDialogModal" :title="titleModal" :message="messageModal"
            @close="showDialogModal = false, goBack(router)"></dialog-modal>
        <confirmation-modal v-if="showConfirmationModal" :title="titleConfirmationModal"
            :message="messageConfirmationModal" @response="responseConfirmationModal"></confirmation-modal>

    </div>

</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { goTo, goBack } from '../../router/navigationUtils';
import { openDb, getMedicationById, updateByIdMedication, updateStatusByIdMedication } from '../../composables/indexedDB/useIndexedDB';
import { loadMedicationsLocalData } from '../../initializers/loadLocalData';
import DialogModal from '../../components/modals/DialogModal.vue';
import ConfirmationModal from '../../components/modals/ConfirmationModal.vue';

const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id * 1);
const medication = ref();
const database = ref();
const isMedication = ref(false);
const dosageUnit = ref('mg');
const formType = ref('cp');
const frequencyUnit = ref('daily');
const notes = ref(null);
const showDialogModal = ref(false);
const showConfirmationModal = ref(false);
const titleModal = ref(null);
const messageModal = ref(null);
const titleConfirmationModal = ref('Atenção');
const messageConfirmationModal = ref('Deseja excluir esse medicamento?');
const disabled = computed(() => !isValidData());
const nameTableToUpdate = ref('medication')
const dayFormatActived = ref('bg-first text-white');
const dayFormaDesactived = ref('border border-gray-300')
const dayOfWeek = ref([
    { value: 1, day: 'seg', active: false },
    { value: 2, day: 'ter', active: false },
    { value: 3, day: 'qua', active: false },
    { value: 4, day: 'qui', active: false },
    { value: 5, day: 'sex', active: false },
    { value: 6, day: 'sab', active: false },
    { value: 7, day: 'dom', active: false }
]);
const dayOfWeekSelected = computed(() => {
    const selected = dayOfWeek.value.filter(item => item.active === true);
    return selected.map(item => item.value);
});


onMounted(async () => {
    await init();
});

const init = async () => {
    try {
        if (!id.value) { goTo(router, 'home') };
        database.value = await openDb();
        const { success, item } = await getMedicationById(database.value, 'medication', id.value);
        if (!success) return goTo(router, 'home')
        isMedication.value = success;
        medication.value = item;
    } catch (error) {
        goTo(router, 'home')
    }
}

const updadateMedication = async () => {
    try {
        if (!database.value) {
            database.value = await openDb();
        }
        if (!isValidData()) throw new Error("Incomplete data");

        const data = {
            id: id.value,
            name: medication.value.name,
            dosage: medication.value.dosage,
            dosageUnit: medication.value.dosageUnit,
            quantity: medication.value.quantity,
            formType: medication.value.formType,
            time: medication.value.time,
            date: medication.value.date,
            frequencyValue: medication.value.frequencyUnit === 'daily' ? medication.value.frequencyValue : null,
            frequencyUnit: frequencyUnit.value,
            dayOfWeek: frequencyUnit.value === 'weekly' ? dayOfWeekSelected.value : null,
            notes: notes.value,
            status: 'active'
        }

        const result = await updateByIdMedication(database.value, nameTableToUpdate.value, data.id, data);
        setEditDialogModal(result.updated);
    } catch (error) {
        console.error("error: ", error);
        setEditDialogModal(0);
    }
};

const disabledMedication = async () => {
    try {
        if (!id.value) goTo(router, 'myMedications');
        if (!database.value) {
            database.value = await openDb();
        }
        const respose = await updateStatusByIdMedication(database.value, nameTableToUpdate.value, id.value, 'disabled')
        setDisabledDialogModal(respose.updated)
    } catch (error) {
        console.error("error: ", error);
        setDisabledDialogModal(0);
    }
}

const isId = () => !!id.value;
const isName = () => !!medication.value.name?.trim();
const isDosage = () => !!medication.value.dosage;
const isDosageUnit = () => !!medication.value.dosageUnit;
const isQuantity = () => !!medication.value.quantity;
const isformType = () => !!medication.value.formType;
const isTime = () => !!medication.value.time;
const isDate = () => !!medication.value.date;
const isFrequencyValue = () => medication.value.frequencyUnit === 'daily' ? !!(medication.value.frequencyValue > 0) : true;
const isFrequencyUnit = () => !!medication.value.frequencyUnit;
const isDayOfWeek = () => medication.value.frequencyUnit === 'weekly' ? medication.value.dayOfWeek.some(item => item.active === true) : true;

const isValidData = () => {
    const checks = [
        isId(),
        isName(),
        isDosage(),
        isDosageUnit(),
        isQuantity(),
        isformType(),
        isTime(),
        isDate(),
        isFrequencyValue(),
        isFrequencyUnit(),
        isDayOfWeek(),
    ];
    return checks.every(Boolean);
};

const setEditDialogModal = async (result) => {
    if (result > 0) {
        titleModal.value = 'Sucesso';
        messageModal.value = 'Medicamento editado com sucesso!';
        showDialogModal.value = true;
        await loadMedicationsLocalData();
    } else {
        titleModal.value = 'Erro';
        messageModal.value = 'Erro ao editar medicamento!';
        showDialogModal.value = true;
    };
}

const setDisabledDialogModal = async (result) => {
    if (result > 0) {
        titleModal.value = 'Sucesso';
        messageModal.value = 'Medicamento excluido com sucesso!';
        showDialogModal.value = true;
        await loadMedicationsLocalData();
    } else {
        titleModal.value = 'Erro';
        messageModal.value = 'Erro ao excluir medicamento!';
        showDialogModal.value = true;
    };
}

const responseConfirmationModal = async (response) => {
    if (response) {
        showConfirmationModal.value = false;
        await disabledMedication();
    } else {
        showConfirmationModal.value = false;
    }
}
</script>
