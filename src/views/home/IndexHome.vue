<template>
  <div v-for="uniqueTimes in uniqueTime" :key="uniqueTimes">
    <div
      class="flex justify-center items-center border border-first rounded-full bg-first w-14 h-14 text-white font-semibold ">
      {{ uniqueTimes }}
    </div>

    <div v-for="value in medicationByFrequency" :key="value" class="border-l pl-3 ml-7">
      <div v-if="value.time === uniqueTimes" class="py-4">
        <card-medication :medication=value :medicationLog="medicationLog" :today="formattedDate"
          @onClick="medicationTaken"></card-medication>
      </div>
    </div>
  </div>
  <div v-if="uniqueTime.length > 0"
    class="flex justify-center items-center border border-first rounded-full bg-first w-14 h-14 text-white font-semibold">
    Fim
  </div>
  <div v-else class="flex items-center justify-center w-full h-full font-semibold text-2xl">Sem medicação</div>

</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from '../../globalStore/store';
import { openDb, addItem, updateByIdMedication, updateByIdMedicationLog } from '../../composables/indexedDB/useIndexedDB';
import { loadMedicationsLocalData } from '../../initializers/loadLocalData';
import CardMedication from './components/CardMedication.vue';

onMounted(async () => {

})

const store = useAppStore();

const medication = computed(() => store.medicationsStore);
const medicationLog = computed(() => store.medicationLog);
const today = ref(new Date());
const dayOfWeek = ref(today.value.getDay());
const formattedDate = ref(
  `${today.value.getFullYear()}-${String(today.value.getMonth() + 1).padStart(2, '0')}-${String(today.value.getDate()).padStart(2, '0')}`
);
const nameTableMedicationLog = ref('medicationLog');
const database = ref(null);

const medicationByFrequency = computed(() => {
  const result = [];

  medication.value.forEach(item => {
    switch (item.frequencyUnit) {
      case 'daily': {
        const dailyItems = frequencyDaily(item).map(r => {
          const response = getMedicationLogStatus(r);
          return { ...r, ...response }; // junta o item e o resultado do log
        });
        result.push(...dailyItems);
        break;
      }

      case 'weekly': {
        if (item.dayOfWeek?.includes(dayOfWeek.value)) {
          const response = getMedicationLogStatus(item);
          result.push({ ...item, ...response });
        }
        break;
      }

      case 'biweekly': {
        if (isRightDay(item.date, 15)) {
          const response = getMedicationLogStatus(item);
          result.push({ ...item, ...response });
        }
        break;
      }

      case 'monthly': {
        if (isRightDay(item.date, 30)) {
          const response = getMedicationLogStatus(item);
          result.push({ ...item, ...response });
        }
        break;
      }
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

const medicationTaken = async (item) => {
  !database.value ? database.value = await openDb() : '';
  let result;
  const { id, time, exists } = item;


  if (exists) {
    const status = !item.status
    const data = { date: formattedDate.value, time, status: status };
    result = await updateByIdMedicationLog(database.value, nameTableMedicationLog.value, id, data);
  } else {
    const data = { idMedication: id, date: formattedDate.value, time, status: true };
    result = await addItem(database.value, nameTableMedicationLog.value, data);
  }
  await loadMedicationsLocalData();
  console.log("result", result)


}

const getMedicationLogStatus = (item) => {
  const check = medicationLog.value.find(value =>
    value.idMedication === item.id &&
    value.date === formattedDate.value &&
    value.time === item.time
  );

  if (!check) return { exists: false, status: false }

  return { exists: true, status: check.status }
}


// const isTaken = (item) => {
//     const checkId = medicationLog.value.some(value =>
//         value.idMedication === item.id &&
//         value.date === formattedDate.value &&
//         value.time === item.time &&
//         value.status === true
//     );
//     return checkId
// }

</script>