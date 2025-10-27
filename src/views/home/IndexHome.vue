<template>
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
const todayMadication = ref();
const uniqueTime = computed(() => {
    const time = medication.value.map(item => item.time)
    const unique = [...new Set(time)];
    return unique.sort((a, b) => a.localeCompare(b, 'pt-BR'));
})



</script>