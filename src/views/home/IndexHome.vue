<template>
  <div v-for="uniqueTimes in uniqueTime" :key="uniqueTimes">
    <div class="flex justify-center items-center border rounded-full bg-first w-14 h-14 text-white font-semibold">
      {{ uniqueTimes }}
    </div>

    <div v-for="value in medicationByFrequency" :key="value" class="border-l pl-3 ml-7">
      <div v-if="value.time === uniqueTimes" class="py-4">
        <card-medication :medication=value></card-medication>
      </div>
    </div>
  </div>
  <div v-if="uniqueTime.length > 0"
    class="flex justify-center items-center border rounded-full bg-first w-14 h-14 text-white font-semibold">
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
const today = ref(new Date());
const dayOfWeek = ref(today.value.getDay());
const formattedDate = ref(today.value.toISOString().split('T')[0]);

const medicationByFrequency = computed(() => {
  const result = [];
  medication.value.forEach(item => {
    switch (item.frequencyUnit) {
      case 'daily':
        result.push(...frequencyDaily(item));
        break

      case 'weekly':
        if (item.dayOfWeek?.includes(dayOfWeek.value)) result.push(item);
        break

      case 'biweekly':
        if (isRightDay(item.date, 15)) result.push(item);
        break

      case 'monthly':
        if (isRightDay(item.date, 30)) result.push(item);
        break
    }
  });
  return result;
});

const uniqueTime = computed(() => {
  const time = medicationByFrequency.value.map(item => item.time)
  const unique = [...new Set(time)];
  return unique.sort((a, b) => a.localeCompare(b, 'pt-BR'));
})

const isRightDay = (date, differenceDay) => {
  const differenceMs = today.value - new Date(date);
  const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  if (differenceDays < 0) return false;
  return differenceDays % differenceDay === 0;
}

const frequencyDaily = (item) => {
  const timesPerDay = item.frequencyValue || 1;
  const result = [];

  if (timesPerDay === 1) {
    result.push(item);
  } else {
    const [baseHour, baseMinute] = item.time.split(':').map(Number);
    const interval = Math.floor(24 / timesPerDay);

    for (let i = 0; i < timesPerDay; i++) {
      const newItem = { ...item };
      const newHour = (baseHour + i * interval) % 24;
      newItem.time = `${String(newHour).padStart(2, '0')}:${String(baseMinute).padStart(2, '0')}`;
      result.push(newItem);
    }
  }

  return result;
};

const madicationTaken = (item) => {
  const { id, time } = item;
  const status = true;
  const data = { id, data: formattedDate, time, status }
  
}





</script>