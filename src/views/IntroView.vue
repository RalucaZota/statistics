<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import FormInput from '../components/FormInput.vue'
import '../../src/style/IntroView.scss'

// Definirea variabilelor reactive
const event = reactive({ email: '', password: '' })
const message = ref('')
const isAuthenticated = ref(false)

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
async function addDataToFirebase() {
  try {
    const userRef = dbRef(database, 'users/' + event.email.replace('.', '_')) // Creează o referință către baza de date
    await set(userRef, {
      email: event.email,
      data: 'Exemplu de date stocate' // Datele pe care vrei să le stochezi
    })
    message.value = 'Date adăugate cu succes!'
  } catch (error) {
    console.error('Eroare la adăugarea datelor în Firebase:', error)
    message.value = 'Eroare la adăugarea datelor în Firebase.'
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
  <button @click="addDataToFirebase">Adaugă Date în Firebase</button>
  <p>{{ event.email }} {{ event.password }}</p>
</template>

<style></style>
