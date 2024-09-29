import express from 'express'
import helmet from 'helmet'
import crypto from 'crypto'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()
const PORT = 3000

const JWT_SECRET = 'supersecretkey'

//CSP nonce generation
const nonce = crypto.randomBytes(16).toString('base64')

//Helmet middleware for security
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

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]
  console.log(token)

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token lipsă.' })
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Timpul a expirat.' })
      }
      return res.status(403).json({ success: false, message: 'Token invalid.' })
    }
    req.user = decoded // Attach user info to the request
    next() // Move to the next middleware or route handler
  })
}

app.post('/login', (req, res) => {
  const { userEmail, password } = req.body
  // Validează utilizatorul (în exemplul acesta folosim credențiale hardcodate)
  if (userEmail === 'test@gmail.com' && password === 'password') {
    // Creează payload-ul pentru JWT
    const payload = { email: userEmail }
    console.log(payload, 'test')

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' })
    console.log(payload, JWT_SECRET)

    // Trimite token-ul către client
    res.json({ success: true, token, message: 'Autentificare reușită!' })
  } else {
    res.status(401).json({ success: false, message: 'Credențiale incorecte.' })
  }
})

app.get('/dashboard', verifyToken, (req, res) => {
  res.json({ success: true, message: 'Acces permis.', data: req.user })
  console.log('merge here?')
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
