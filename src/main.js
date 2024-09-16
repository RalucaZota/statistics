import './assets/main.css'
import { initializeApp } from 'firebase/app'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { getDatabase, ref as dbRef, set } from 'firebase/database'

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
const firebaseApp = initializeApp(firebaseConfig)

// Obține instanța bazei de date Firebase
export const database = getDatabase(firebaseApp)
const app = createApp(App)
app.use(createPinia())
app.use(router)
// export const database = getDatabase(app)
app.mount('#app')
