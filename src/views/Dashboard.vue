<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const message = ref('')
let tokenCheckInterval

async function checkToken() {
  const token = localStorage.getItem('token')
  if (!token) {
    handleTokenExpiration()
    return
  }

  try {
    const response = await axios.get('http://localhost:3000/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.data.success) {
      message.value = response.data.message
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleTokenExpiration()
    } else {
      message.value = 'Eroare la accesarea dashboard-ului.'
    }
  }
}

function handleTokenExpiration() {
  alert('Sesiunea ta a expirat. Te rugăm să te autentifici din nou.')
  localStorage.removeItem('token')
  router.push('/')
}

onMounted(() => {
  checkToken() // Verifică tokenul imediat la încărcarea paginii
  tokenCheckInterval = setInterval(checkToken, 5000) // Verifică la fiecare 5 secunde
})

onBeforeUnmount(() => {
  clearInterval(tokenCheckInterval)
})
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p v-if="message">{{ message }}</p>
    <!-- Aici puteți adăuga conținutul dashboard-ului -->
  </div>
</template>
