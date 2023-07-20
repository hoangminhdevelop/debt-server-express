require('dotenv').config()
import 'module-alias/register'
import '@/passports/localStrategy'

import cors from 'cors'
import express from 'express'
import passport from 'passport'
import session from 'express-session'

// -- Middleware  --
import { responseHelper } from './middlewares/responseHelper'
import mainRouter from './routes'

// -- Utils --
import { connectDataSource } from './configs/data-source'
import { PORT } from '@/constants/common'
const server = express()

// -- Handle middleware --
server.use(cors())
server.use(express.json())
server.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
)
server.use(passport.initialize())
server.use(passport.session())
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user: any, done) => {
  done(null, user)
})

// -- Routers--
server.use(responseHelper)
server.use(mainRouter)

const init = async () => {
  try {
    connectDataSource()
    server.listen(PORT, async () => {
      console.log(`Example server listening on port ${PORT}`)
    })
  } catch (error) {
    throw error
  }
}

init()
