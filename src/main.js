import './assets/main.css'
import { initializeApp } from 'firebase/app'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// const app = createApp()
const firebaseConfig = {
  apiKey: 'AIzaSyCyjeVdPVY_ZiyFeiMET5-qgJ9kqcRq3Ko',
  authDomain: 'statistics-4b2ac.firebaseapp.com',
  projectId: 'statistics-4b2ac',
  storageBucket: 'statistics-4b2ac.appspot.com',
  messagingSenderId: '342281723882',
  appId: '1:342281723882:web:b6d326af12f04d8c39dc93'
}
initializeApp(firebaseConfig)
const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
