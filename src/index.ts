require('dotenv').config()
import 'module-alias/register'

import express from 'express'
import cors from 'cors'

import { connectDataSource } from './configs/data-source'
import { responseHelper } from './middlewares/responseHelper'
import mainRouter from './routes'
import { PORT } from '@/constants/common'
import { hashPassword, verifyPassword } from './utils/password'

const server = express()

// -- Middleware --
server.use(cors())
server.use(express.json())

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
