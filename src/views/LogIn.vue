<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import FormInput from '../components/FormInput.vue'
import '../../src/style/IntroView.scss'

const router = useRouter()
const event = reactive({ email: '', password: '' })
const message = ref('')

async function login(e) {
  e.preventDefault()
  try {
    const response = await axios.post(
      'http://localhost:3000/login',
      {
        userEmail: event.email,
        password: event.password
      },
      { withCredentials: true }
    )
    if (response.data.success) {
      message.value = response.data.message
      localStorage.setItem('token', response.data.token)
      router.push('/dashboard')
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
    <h1>LOGIN PAGE</h1>
    <p v-if="message">{{ message }}</p>
  </div>
  <form @submit.prevent="login">
    <div class="form-input">
      <form-input label="Email" type="text" placeholder="Enter your email" v-model="event.email" />
      <br />
      <form-input
        style="margin-bottom: 300px"
        label="Password"
        type="password"
        placeholder="Type your password"
        v-model="event.password"
      />
    </div>
    <br />
    <button type="submit">LOGIN</button>
  </form>
</template>
