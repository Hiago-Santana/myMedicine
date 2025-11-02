<template>
    <div class="border border-gray-400 rounded-md p-4">
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
        <button :disabled="disabled" @click="emits('onClick', item)"
            class="flex gap-1 mt-6 justify-center w-full text-center font-semibold bg-first text-white hover:bg-first/85 p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
            <span class="material-symbols-outlined">
                check
            </span>
            Marcar como tomado
        </button>
    </div>
</template>
<script setup>
import { translate } from '../../../utils/translations';
const props = defineProps(['medication']);
const emits = defineEmits(['onClick']);




const formatMedication = (type) => {
    const format = {
        daily: 'por dia',
        biweekly: 'A cada 15 dias',
        monthly: '1 vez por mês'
    }

    return format[type] ?? type
}


</script>