<template>
    <div :class="medication.status ? takenFormat.body : notTakenFormat.body"
        class="border rounded-md p-4">
        <h2 class="font-semibold capitalize">{{ medication?.name }}</h2>
        <div class="flex items-center gap-2">
            <div>{{ medication?.dosage }} {{ medication?.dosageUnit }}</div>
            <span class="bg-gray-600 rounded-full h-2 w-2"></span>
            <div>{{ medication?.quantity }} {{ medication?.formType }}</div>
            <span class="bg-gray-600 rounded-full h-2 w-2"></span>
            <div class="flex">
                <div v-if="medication?.frequencyUnit === 'daily'">
                    {{ medication?.frequencyValue }}x {{ formatMedication(medication?.frequencyUnit) }}
                </div>
                <div v-if="medication?.frequencyUnit === 'biweekly' || medication?.frequencyUnit === 'monthly'">
                    {{ medication?.frequencyValue }} {{ formatMedication(medication?.frequencyUnit) }}
                </div>

            </div>
        </div>
        <div v-if="medication?.frequencyUnit === 'weekly'" class="flex gap-1">
            <div>Dia:</div>
            {{medication.dayOfWeek.map(day => translate(medication?.frequencyUnit, day)).join(', ')}}
        </div>
        <div class="mt-2">{{ medication?.notes }}</div>
        <button :class="isTaken(medication) ? takenFormat.button : notTakenFormat.button " @click="emits('onClick', medication, )"
            class="flex gap-1 mt-6 justify-center w-full text-center font-semibold p-2 rounded-md">
            <span class="material-symbols-outlined">
                check
            </span>
            Marcar como tomado
        </button>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { translate } from '../../../utils/translations';
const props = defineProps(['medication', 'medicationLog', 'today']);
const emits = defineEmits(['onClick']);

const medication = computed(() => props.medication)
const medicationLog = computed(() => props.medicationLog);
const today = ref(props.today);
const takenFormat = { body: 'bg-green-100 border-green-300 dark:bg-green-500/10 dark:border-green-500/40 dark:text-gray-200', button: 'bg-white text-gray-600 border border-gray-200 dark:bg-fourth dark:border-third dark:text-gray-300'};
const notTakenFormat = { body: 'bg-white border-gray-300 dark:bg-fourth dark:border-gray-800 dark:text-gray-200', button: 'bg-first text-white hover:bg-first/85'}

const formatMedication = (type) => {
    const format = {
        daily: 'por dia',
        biweekly: 'A cada 15 dias',
        monthly: '1 vez por mês'
    }
    return format[type] ?? type
}

const isTaken = (item) => {
    const checkId = medicationLog.value.some(value =>
        value.idMedication === item.id &&
        value.date === today.value &&
        value.time === item.time &&
        value.status === true
    );
    return checkId
}


</script>