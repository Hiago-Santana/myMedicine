<template>
{{ biweekly }}
    <div v-for="uniqueTimes in uniqueTime" :key="uniqueTimes">
        <div class="flex justify-center items-center border rounded-full bg-first w-14 h-14 text-white font-semibold">
            {{ uniqueTimes }}
        </div>

        <div v-for="value in medication" :key="value" class="border-l pl-3 ml-7">
            <div v-if="value.time === uniqueTimes" class="py-4">
                <card-medication :medication=value></card-medication>
            </div>
        </div>
    </div>
    <div v-if="uniqueTime.length > 0" class="flex justify-center items-center border rounded-full bg-first w-14 h-14 text-white font-semibold">
        Fim
    </div>
    <div v-else class="flex items-center justify-center w-full h-full font-semibold text-2xl">Sem medicação</div>
    
</template>
<script setup>
import { ref, computed } from 'vue';
import { useAppStore } from '../../globalStore/store';
import CardMedication from './components/CardMedication.vue';

const store = useAppStore();

const medication = computed(() => store.medicationsStore);
const daily = computed(() => medication.value.filter(item => item.frequencyUnit === 'daily'));
const weekly = computed(() => medication.value.filter(item => item.frequencyUnit === 'weekly' && item.dayOfWeek.includes(dayOfWeek.value)));
const biweekly = computed(() => medication.value.filter(item => {
    const unit = item.frequencyUnit === 'biweekly'; 
    const differenceMs = today.value - new Date(item.date);
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24)); // em dias
    const checkInteger = Number.isInteger((differenceDays / 15));
    console.log("checkInteger",checkInteger)

}));
// const dailyMadication = computed(() => {
//     const daily = medication.value.filter(item => item.frequencyUnit === 'daily');
//     const weekly = medication.value.filter(item => item.)
//     return daily
// });
const uniqueTime = computed(() => {
    const time = medication.value.map(item => item.time)
    const unique = [...new Set(time)];
    return unique.sort((a, b) => a.localeCompare(b, 'pt-BR'));
})
const today = ref(new Date());
const dayOfWeek = ref(today.value.getDay()) ;
const formattedDate = ref(today.value.toISOString().split('T')[0]);





</script>