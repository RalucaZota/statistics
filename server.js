import express from 'express'

const app = express()
const PORT = 3000

// Middleware pentru parsarea corpului cererii (JSON)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Endpoint pentru autentificare
app.post('/login', (req, res) => {
  const { userEmail, password } = req.body

  // Validează utilizatorul (în exemplul acesta folosim credențiale hardcodate)
  if (userEmail === 'zotalorena99@gmail.com' && password === 'password') {
    res.json({ success: true, message: 'Autentificare reușită!' })
  } else {
    res.status(401).json({ success: false, message: 'Credențiale incorecte.' })
  }
})

// Pornește serverul
app.listen(PORT, () => {
  console.log(`Serverul rulează la http://localhost:${PORT}`)
})
