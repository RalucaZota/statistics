<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { database } from '../main'
import { ref as dbRef, set } from 'firebase/database'
import FormInput from '../components/FormInput.vue'
import '../../src/style/IntroView.scss'

const router = useRouter()

const route = useRoute()

const event = reactive({ email: '', password: '' })

const message = ref('')

const isAuthenticated = ref(false)

let verifyTokenValidation

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
      isAuthenticated.value = true
      console.log(response.data.message, isAuthenticated.value)
      await startTokenValidation()
      router.replace('/dashboard')
    } else {
      message.value = response.data.message
    }
  } catch (error) {
    message.value = 'Eroare la autentificare.'
    console.error('Eroare:', error)
  }
}

async function accessProtectedRoute() {
  const token = localStorage.getItem('token')

  try {
    const response = await axios.get('http://localhost:3000/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.data.success) {
      message.value = response.data.message
    } else {
      message.value = 'Accesul nu este permis.'
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Mesaj și redirecționare în cazul în care token-ul a expirat
      message.value = 'Sesiunea ta a expirat. Te rugăm să te autentifici din nou.'
      setTimeout(() => {
        router.replace({ path: '/' }) // Redirecționează utilizatorul către pagina de login după 2 secunde
      }, 2000)
    } else {
      router.replace({
        path: '/dashboard',
        query: { message: 'Eroare la accesarea rutei protejate.' }
      })
    }
  }
}
async function startTokenValidation() {
  // Verifică tokenul imediat
  await accessProtectedRoute()
  verifyTokenValidation = setInterval(accessProtectedRoute, 30000) // Verifică la fiecare 30 secunde
}

onMounted(() => {
  // Dacă există un mesaj în query, îl setăm în variabila `message`
  if (route.query.message) {
    message.value = route.query.message
  }
})

onBeforeUnmount(() => {
  clearInterval(verifyTokenValidation) // Curățăm intervalul când componenta este distrusă
  console.log('verifyTokenValidation cleared')
})
async function addDataToFirebase() {
  try {
    const userRef = dbRef(database, 'users/' + event.email.replace('.', '_')) // Creează o referință către baza de date
    await set(userRef, {
      email: event.email,
      password: event.password // Datele pe care vrei să le stochezi
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

<style></style>
