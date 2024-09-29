<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// Accesează mesajul din query
const message = route.query.message
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
