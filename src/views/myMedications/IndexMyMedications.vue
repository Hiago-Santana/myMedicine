<template>
    <div class="flex flex-col gap-3">
        <div v-for="value in medication" :key="value.id" class="bg-white border border-gray-300 rounded-md p-2 shadow ">
            <h2 class="font-semibold my-2">{{ value.name }}</h2>
            <div class="flex flex-col gap-1">
                <div class="flex gap-1">
                    <label class="font-medium">Dosangem:</label>
                    <div class="flex gap-1 items-center">
                        <div class="">{{ value.dosage }}</div>
                        <div>{{ value.dosageUnit }}</div>
                        <span class="bg-gray-600 rounded-full h-2 w-2"></span>
                        <div>{{ value.quantity }}</div>
                        <div>{{ translate('formType', value.formType) }}</div>
                    </div>
                </div>
                <div class="flex gap-1">
                    <label class="font-medium">Horário:</label>
                    <span>{{ value.time }}</span>
                </div>
                <div class="flex gap-1">
                    <label class="font-medium">Frequência:</label>
                    <div v-if="value?.frequencyUnit === 'daily'">
                        {{ value?.frequencyValue }}x {{ translate('frequencyUnit', value?.frequencyUnit) }}
                    </div>
                    <div v-if="value?.frequencyUnit === 'biweekly' || value?.frequencyUnit === 'monthly'">
                        {{ translate('frequencyUnit', value?.frequencyUnit) }}
                    </div>
                    <div v-if="value?.frequencyUnit === 'weekly'" class="flex gap-1">
                        {{value.dayOfWeek.map(day => translate(value?.frequencyUnit, day)).join(', ')}}
                    </div>
                </div>
                <div v-if="value.notes">
                        <label class="font-medium mr-1">Observações:</label>
                        <span>{{ value.notes }}</span>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { ref, computed } from 'vue';
import { useAppStore } from '../../globalStore/store';
import { translate } from '../../utils/translations';

const store = useAppStore();

const medication = computed(() => store.medicationsStore);


</script>