require('dotenv').config()
import 'module-alias/register'
import 'reflect-metadata'

import express from 'express'
import { PORT } from '@/constants/common'
import authRouter from '@/routes'
import { connectDataSource } from './configs/data-source'

const server = express()
// Routers
server.use('/auth', authRouter)
;(async () => {
  try {
    connectDataSource()
    server.listen(PORT, () => {
      console.log(`Example server listening on port ${PORT}`)
    })
  } catch (error) {
    throw error
  }
})()
