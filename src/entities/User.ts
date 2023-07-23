import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Index } from 'typeorm'
import { Debt } from './Debt'
import { History } from './History'

export type UserInfo = Omit<User, 'password'>

export const USER_TABLE_NAME = 'users'
@Entity(USER_TABLE_NAME)
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  name: string

  @Index()
  @Column({ length: 50, unique: true })
  username: string

  @Column('text', {
    select: false,
  })
  password: string

  @Index()
  @Column({ unique: true })
  email: string

  @Column()
  isActive: boolean

  @OneToMany(() => Debt, (debt) => debt.user)
  debts: Debt[]

  @OneToMany(() => History, (history) => history.user)
  histories: History[]
}
