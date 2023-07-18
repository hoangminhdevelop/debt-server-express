import express from 'express'

const authRouter = express.Router()

authRouter.post('/register', (req, res) => {
  res.send('register')
})
authRouter.get('/login', (req, res) => {
  res.send('login')
})
authRouter.get('/profile', (req, res) => {
  res.send('profile')
})

export default authRouter
