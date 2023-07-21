import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './User'

export const DEBT_TABLE_NAME = 'debts'

@Entity(DEBT_TABLE_NAME)
export class Debt {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  debtName: string

  @Column()
  amount: number

  @Column()
  icon: string

  @ManyToOne(() => User, (user) => user.debts)
  user: User
}

export type TDebt = {
  id: number
  name: string
  amount: number
  icon?: string
  user: User
}
