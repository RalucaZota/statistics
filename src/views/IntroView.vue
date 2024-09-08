<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import FormInput from '../components/FormInput.vue'
import '../../src/style/IntroView.scss'

// Definirea variabilelor reactive
const event = reactive({ email: '', password: '' })
const message = ref('')

// Funcția de submit pentru formular
async function login(e) {
  e.preventDefault() // Previne comportamentul implicit al formularului

  console.log('merge') // Verifică dacă funcția este apelată

  try {
    const response = await axios.post(
      'http://localhost:3000/login',
      {
        userEmail: event.email,
        password: event.password
      },
      { withCredentials: true }
    )

    // Actualizează mesajul bazat pe răspunsul de la server
    if (response.data.success) {
      message.value = response.data.message
      console.log(response.data.message)
    } else {
      message.value = response.data.message
    }
  } catch (error) {
    message.value = 'Eroare la autentificare.'
    console.error('Eroare:', error)
  }
}
</script>

<template>
  <div class="about">
    <h1>INTRO PAGE</h1>
    <p v-if="message">{{ message }}</p>
  </div>
  <form @submit.prevent="login">
    <div class="form-input">
      <form-input label="Email" type="text" placeholder="Enter your email" v-model="event.email" />
      <form-input
        label="Password"
        type="password"
        placeholder="Type your password"
        v-model="event.password"
      />
    </div>
    <button type="submit">LOGIN</button>
  </form>
  <p>{{ event.email }} {{ event.password }}</p>
</template>

<style></style>
