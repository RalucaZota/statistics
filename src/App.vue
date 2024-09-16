<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import IntroView from './views/IntroView.vue'
</script>

<template>
  <IntroView />
  <Dashboard />
  <RouterView />
</template>

<style scoped></style>
