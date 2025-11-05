<template>
<h1>Edit Medication</h1>
{{ id }}
{{ medication.item }}
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { goTo } from '../../router/navigationUtils';
import { openDb, getMedicationById } from '../../composables/indexedDB/useIndexedDB';

const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id * 1);
const medication = ref();
const database = ref();

onMounted(async () => {
    if(!id.value) {goTo(router, 'home')};
    database.value = await openDb();
    medication.value = await getMedicationById(database.value, 'medication', id.value);
    console.log("medication",medication.value)
})
</script>