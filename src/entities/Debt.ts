import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, RelationId, Index } from 'typeorm'
import { User } from './User'
import { History } from './History'

export const DEBT_TABLE_NAME = 'debts'

@Entity(DEBT_TABLE_NAME)
export class Debt {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  debtName: string

  @Column()
  amount: number

  @Column({ default: 'default' })
  icon?: string

  @ManyToOne(() => User, (user) => user.debts)
  user: User

  @Index()
  @Column()
  @RelationId((debt: Debt) => debt.user)
  userId: number

  @OneToMany(() => History, (history) => history.debt)
  histories: History[]
}

export type DebtBase = Omit<Debt, 'user' | 'history'>
