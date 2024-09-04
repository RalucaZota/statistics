<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import FormInput from '../components/FormInput.vue'
import '../../src/style/IntroView.scss'

const event = reactive({ email: '', password: '', verifyPassword: '' })

function onSubmit(event) {
  event.preventDefault()
  console.log('merge')
}
async function login() {
  try {
    const response = await axios('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail: this.email, password: this.password })
    })

    const data = await response.json()
    if (response.ok) {
      this.message = data.message
    } else {
      this.message = data.message
    }
  } catch (error) {
    this.message = 'Eroare la autentificare.'
    console.error('Eroare:', error)
  }
}
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
    <!-- <form-input
      label="Password"
      type="password"
      placeholder="Retype your password"
      v-model="event.verifyPassword"
    /> -->
  </div>
  <button @submit.prevent="LogIn" type="submit">LOGIN</button><br />
  <button @submit.prevent="Register" type="submit">REGISTER</button>
</template>

<style></style>
