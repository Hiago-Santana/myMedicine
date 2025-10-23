<template>
  <div class="flex h-screen">
    <side-bar v-if="route.meta.showSideBar"></side-bar>
    
    <!-- Conteúdo principal -->
    <main class="flex-1 overflow-y-auto pt-16 px-4 pb-6 md:pt-6 md:px-6 md:ml-0">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';
import SideBar from './components/layout/SideBar.vue';

const route = useRoute();
</script>
