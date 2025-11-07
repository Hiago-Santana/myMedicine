<template>

    <div class="flex flex-col gap-3">
        <div v-for="value in medication" :key="value.id"
            class="bg-white border border-gray-300 rounded-md p-2 shadow dark:bg-fourth dark:border-gray-800">
            <div class="flex justify-between">
                <h2 class="font-semibold my-2">{{ value.name }}</h2>
                <primary-button @click="goTo(router, 'editMedication', { id: value.id })" label="Editar"
                    color="quaternary">
                    <template #icon>
                        <span class="material-symbols-outlined">
                            edit_square
                        </span>
                    </template>
                </primary-button>
            </div>
            <div class="flex flex-col gap-1 dark:text-gray-200">
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
    <div v-if="medication.length === 0" class="flex items-center justify-center w-full h-full font-semibold text-2xl">Sem
        medicação</div>


</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../../globalStore/store';
import { translate } from '../../utils/translations';
import { goTo } from '../../router/navigationUtils';
import PrimaryButton from '../../components/ui/buttons/PrimaryButton.vue';

const router = useRouter();
const store = useAppStore();

const medication = computed(() => store.medicationsStore);


</script>