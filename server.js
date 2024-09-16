import express from 'express'
import helmet from 'helmet'
import crypto from 'crypto'
import cors from 'cors'

const app = express()
const PORT = 3000

// Generare nonce pentru CSP
const nonce = crypto.randomBytes(16).toString('base64')

// Middleware pentru securitate cu Helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [`'self'`, `'nonce-${nonce}'`]
    }
  })
)

const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  methods: 'GET,POST',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/login', (req, res) => {
  const { userEmail, password } = req.body

  // Validează utilizatorul (în exemplul acesta folosim credențiale hardcodate)
  if (userEmail === 'test@gmail.com' && password === 'password') {
    res.json({ success: true, message: 'Autentificare reușită!' })
  } else {
    res.status(401).json({ success: false, message: 'Credențiale incorecte.' })
  }
})

// Endpoint pentru cereri GET la /login (opțional)
app.get('/login', (req, res) => {
  res.send('Folosește o cerere POST pentru a te autentifica.')
})

// Endpoint pentru pagina principală cu script inline
app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <script nonce="${nonce}">
          console.log('Script inline cu nonce');
        </script>
      </head>
      <body>
        Server for Raluca!
      </body>
    </html>
  `)
})

// Pornește serverul
app.listen(PORT, () => {
  console.log(`Serverul rulează la http://localhost:${PORT}`)
})
