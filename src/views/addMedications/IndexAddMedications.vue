<template>
    <form @submit.prevent class="mt-4">
        <div
            class="border border-gray-200 rounded-md shadow-md/20 p-2 pb-10 w-full dark:bg-fourth dark:border-gray-700">


            <div class="flex justify-between my-2">
                <h2 class="font-bold">Adicionar medicamento</h2>
                <span class="material-symbols-outlined">
                    close
                </span>
            </div>

            <div class="flex flex-col gap-4 my-4">
                <div class="my-1">
                    <label class="font-semibold">Nome do medicamento</label>
                    <input v-model="name" type="text" placeholder="Ex: Losartana" required
                        class="w-full border border-gray-300 rounded-md p-1 capitalize dark:border-gray-700">
                </div>
                <div class="my-1">
                    <label class="font-semibold">Dosagem</label>
                    <div class="flex gap-2">
                        <input v-model="dosage" type="number" placeholder="Ex: 50" required
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
                        <input v-model="quantity" type="number" placeholder="Ex: 2" required
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
                        <input v-model="date" type="date" required
                            class="w-full border border-gray-300 rounded-md p-1 capitalize dark:border-gray-700">
                        <input v-model="time" type="time" required
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
                            <input v-model="frequencyValue" type="number" required
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
                <button @click="goBack(router)" type="button"
                    class="w-full text-center font-semibold border border-gray-300 hover:bg-gray-200 p-2 rounded-md dark:border-gray-700">
                    Cancelar
                </button>
                <button :disabled="disabled" type="submit" @click="insertNewMedication()"
                    class="w-full text-center font-semibold bg-first text-white hover:bg-first/85 p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                    Adicionar Medicamento
                </button>
            </div>
        </div>
    </form>
    <dialog-modal v-if="showConfirmationModal" :title="titleModal" :message="messageModal"
        @close="showConfirmationModal = false, goBack(router)"></dialog-modal>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { openDb, addMedication } from '../../composables/indexedDB/useIndexedDB';
import { goTo, goBack } from '../../router/navigationUtils';
import { loadMedicationsLocalData } from '../../initializers/loadLocalData'
import DialogModal from '../../components/modals/DialogModal.vue';

const router = useRouter();

const database = ref(null);
const name = ref(null);
const dosage = ref(null);
const dosageUnit = ref('mg');
const quantity = ref(null);
const formType = ref('cp');
const time = ref(null);
const date = ref(null);
const frequencyValue = ref(null);
const frequencyUnit = ref('daily');
const notes = ref(null);
const showConfirmationModal = ref(false);
const titleModal = ref(null);
const messageModal = ref(null);
const disabled = computed(() => !isValidData());
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
    database.value = await openDb();
});

const insertNewMedication = async () => {
    try {
        if (!database.value) {
            database.value = await openDb();
        }
        if (!isValidData()) throw new Error("Incomplete data");

        const data = {
            name: name.value,
            dosage: dosage.value,
            dosageUnit: dosageUnit.value,
            quantity: quantity.value,
            formType: formType.value,
            time: time.value,
            date: date.value,
            frequencyValue: frequencyUnit.value === 'daily' ? frequencyValue.value : null,
            frequencyUnit: frequencyUnit.value,
            dayOfWeek: frequencyUnit.value === 'weekly' ? dayOfWeekSelected.value : null,
            notes: notes.value,
            status: 'active'
        }

        const result = await addMedication(database.value, data);
        setDialogMessage(result.success);
    } catch (error) {
        console.error("error: ", error);
    }
}

const isName = () => !!name.value?.trim();
const isDosage = () => !!dosage.value;
const isDosageUnit = () => !!dosageUnit.value;
const isQuantity = () => !!quantity.value;
const isformType = () => !!formType.value;
const isTime = () => !!time.value;
const isDate = () => !!date.value;
const isFrequencyValue = () => frequencyUnit.value === 'daily' ? !!(frequencyValue.value > 0) : true;
const isFrequencyUnit = () => !!frequencyUnit.value;
const isDayOfWeek = () => frequencyUnit.value === 'weekly' ? dayOfWeek.value.some(item => item.active === true) : true;

const isValidData = () => {
    const checks = [
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

const setDialogMessage = async (result) => {
    if (result) {
        titleModal.value = 'Sucesso';
        messageModal.value = 'Medicamento inserido com sucesso!';
        showConfirmationModal.value = true;
        await loadMedicationsLocalData();
    } else {
        titleModal.value = 'Erro';
        messageModal.value = 'Erro ao inserir medicamento!';
        showConfirmationModal.value = true;
    };
}



</script>