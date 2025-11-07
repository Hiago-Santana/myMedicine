<template>
  <div>
    <!-- Botão para abrir a sidebar (mobile) -->
    <div
      class="flex w-full items-center gap-2 md:hidden p-3 fixed top-0 left-0 bg-first z-40 shadow-lg h-16"
    >
      <button
        class="flex items-center justify-center text-white bg-first rounded-lg h-10 w-10"
        @click="toggleSidebar"
      >
        <span class="material-symbols-outlined">menu</span>
      </button>
      <h1 class="text-xl text-white">{{ routeName === 'editMedication' ? 'Editar medicamento' : title }}</h1>
    </div>

    <!-- Overlay escuro (mobile) -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      leave-active-class="transition-opacity duration-300 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/70 bg-opacity-50 z-40 md:hidden"
        @click="closeSidebar"
      ></div>
    </transition>

    <!-- Sidebar -->
    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-300 ease-in"
      enter-from-class="-translate-x-full"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-show="isOpen || isDesktop"
        class="h-screen w-64 bg-gray-200 text-white flex flex-col shadow-lg fixed left-0 top-0 z-50 md:relative md:z-auto dark:bg-third"
      >
        <div class="flex items-center justify-between p-4 border-b bg-first border-gray-700">
          <div class="flex items-center gap-2">
            <span
              class="material-symbols-outlined text-white rounded-full text-4xl"
            >
              pill
            </span>
            <h2 class="text-lg font-bold">LembreMed</h2>
          </div>
          <button class="md:hidden text-white" @click="closeSidebar">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Itens do menu -->
        <nav class="flex-1 overflow-y-auto p-4 space-y-2">
          <router-link
            v-for="item in menuItems"
            :key="item.label"
            :to="{ name: item.name }"
            @click="closeSidebar"
            :class="item.name === routeName ? 'bg-first text-white dark:bg-first' : 'dark:bg-fourth dark:text-white'"
            class="flex items-center gap-3 p-2 rounded-lg hover:bg-first hover:text-white text-gray-700 transition-colors duration-200 no-underline"
          >
            <span class="material-symbols-outlined">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </router-link>
        </nav>
      </aside>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();

const routeName = computed(() => route.name);
const title = computed(() => {
    return menuItems.find(item => item.name === routeName.value)?.label || 'Horários do dia';    
})

const isOpen = ref(false);
const isDesktop = ref(window.innerWidth >= 768);

const toggleSidebar = () => (isOpen.value = !isOpen.value);
const closeSidebar = () => (isOpen.value = false);

const handleResize = () => {
    isDesktop.value = window.innerWidth >= 768;
    if (isDesktop.value) isOpen.value = true;
    else isOpen.value = false;
};

onMounted(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
});

// Itens do menu
const menuItems = [
    { label: "Horários do dia", name: "home", icon: "nest_clock_farsight_analog" },
    { label: "Meus medicamentos", name: "myMedications", icon: "event" },
    { label: "Novo medicamento", name: "addMedications", icon: "add" },
];
</script>
