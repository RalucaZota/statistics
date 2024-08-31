<script setup>
import { reactive, ref } from 'vue'
import FormInput from '../components/FormInput.vue'

const event = reactive({ email: '', password: '', verifyPassword: '' })
</script>

<template>
  <div class="about">
    <h1>INTRO PAGE</h1>
  </div>
  <div class="form-input">
    <form-input label="Email" type="text" placeholder="Enter your email" v-model="event.email" />
    <form-input
      label="Password"
      type="password"
      placeholder="Type your password"
      v-model="event.password"
    />
    <form-input
      label="Password"
      type="password"
      placeholder="Retype your password"
      v-model="event.verifyPassword"
    />
  </div>
</template>

<style></style>
