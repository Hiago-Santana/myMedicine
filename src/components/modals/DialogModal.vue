<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
    <div class="bg-white dark:bg-first rounded-2xl shadow-xl p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{{ title }}</h2>
      <p class="text-gray-700 dark:text-gray-300">{{ message }}</p>
      <div class="mt-5 text-right items-end flex justify-end">
        <primary-button
         @click="$emit('close')"
        label="Fechar"
        color="primary"
        ></primary-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import PrimaryButton from '../ui/buttons/PrimaryButton.vue';
defineProps({
  title: String,
  message: String
})

defineEmits(['close'])
</script>
