<template>
  <!-- <app-header v-if="route.meta.showHeader"></app-header> -->
  <side-bar v-if="route.meta.showSideBar"></side-bar>
  <router-view></router-view>
</template>
<script setup>
import { useRoute } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';
import SideBar from './components/layout/SideBar.vue';

const route = useRoute();
</script>
