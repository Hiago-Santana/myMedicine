<template>
  <button :type="type" :disabled="disabled || loading" 
  :class="[
    'flex items-center justify-center font-semibold transition-all duration-200 min-w-[10px] cursor-pointer',
    sizeClass,
    colorClass,
    rounded ? 'rounded-full' : 'rounded-md',
    { 'opacity-50 cursor-not-allowed': disabled || loading }
  ]" @click="onClick">
    <span v-if="loading" class="animate-spin mr-2">⏳</span>

    <!-- Ícone à esquerda -->
    <span v-if="$slots.icon && !loading" class="mr-2 material-symbols-outlined" :style="materialIconStyle">
      <slot name="icon" />
    </span>

    <span v-if="iconOnly === 'true'" class="hidden sm:inline">{{ label }}</span>
    <span v-else>{{ label }}</span>

    <!-- Ícone à direita -->
    <span v-if="$slots['icon-right'] && !loading" class="ml-2 material-symbols-outlined" :style="materialIconStyle">
      <slot name="icon-right" />
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, default: 'Clique aqui' },
  type: { type: String, default: 'button' },
  color: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  rounded: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  iconOnly: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])

const sizeClass = computed(() => ({
  sm: 'px-1 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}[props.size]))

const colorClass = computed(() => ({
  primary: 'bg-third text-white hover:bg-third/85 dark:bg-second dark:text-black dark:hover:bg-second/85',
  secondary: 'bg-second text-white hover:bg-gray-600 dark:bg-fifth dark:text-white dark:hover:bg-gray-900',
  tertiary: 'bg-third text-white hover:bg-gray-600',
  quaternary: 'bg-white text-gray-700 border border-gray-300 hover:bg-first/50 dark:bg-transparent dark:text-white dark:border-gray-600',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  success: 'bg-green-600 text-white hover:bg-green-700',
}[props.color] || props.color))

const materialIconStyle = {
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"
}

function onClick(event) {
  if (!props.loading && !props.disabled) {
    emit('click', event)
  }
}
</script>