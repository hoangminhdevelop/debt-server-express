import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from '@/constants/database'
import { Debt, User, History } from '@/entities'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Debt, History],
  subscribers: [],
  migrations: [],
})

export const connectDataSource = () => {
  AppDataSource.initialize()
    .then(async () => {
      console.log('Database connect successfully')
    })
    .catch((error) => {
      console.log('error :>> ', error)
      console.log('Database connect failed')
    })
}
