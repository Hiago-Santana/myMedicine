<template>
    <div class="flex  h-screen relative">

        <!-- Botão para abrir a sidebar (mobile) -->
        <div
            class="flex justify-between w-full items-center gap-2 md:hidden p-3 fixed top-4 rounded-lg z-50 shadown-lg">

            <div class="flex">                
                <div class="my-4">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined p-2 bg-first text-white rounded-full"
                            style="font-size:40px ;">
                            pill
                        </span>
                        <h1 class="text-xl">Meus Medicamentos</h1>
                    </div>
                </div>
            </div>

            <button class="flex items-center justify-center text-white bg-first rounded-lg h-10 w-10"
                @click="toggleSidebar">
                <span class="material-symbols-outlined">
                    menu
                </span>
            </button>
            
        </div>



        <!-- Overlay escuro (mobile) -->
        <transition name="fade">
            <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" @click="closeSidebar"></div>
        </transition>

        <!-- Sidebar -->
        <transition name="slide">
            <aside v-show="isOpen || isDesktop"
                class="fixed md:static top-0  h-full w-64 bg-gray-200 text-white flex flex-col shadow-lg z-50 md:z-auto">
                <!-- Cabeçalho -->
                <div class="flex items-center justify-between p-4 border-b bg-first border-gray-700">
                    <h2 class="text-lg font-bold">LembreMed</h2>
                    <button class="md:hidden" @click="closeSidebar">
                        <span class="material-symbols-outlined">
                            close
                        </span>
                    </button>
                </div>

                <!-- Itens do menu -->
                <nav class="flex-1 overflow-y-auto p-4 space-y-2">
                    <a v-for="item in menuItems" :key="item.label" :href="item.href"
                        class="flex items-center gap-3 p-2 rounded-lg hover:bg-first hover:text-white text-gray-700 transition no-underline">
                        <span class="material-symbols-outlined">
                            {{ item.icon }}
                        </span>
                        <span>{{ item.label }}</span>
                    </a>
                </nav>
            </aside>
        </transition>

        <!-- Conteúdo principal -->
        <div class="flex-1 text-white p-6 md:ml-64 overflow-y-auto">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

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
    { label: "Horários do dia", href: "/", icon: "nest_clock_farsight_analog" },
    { label: "Agenda", href: "/agenda", icon: "event" },
    { label: "Configurações", href: "/config", icon: "settings" },
];
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
