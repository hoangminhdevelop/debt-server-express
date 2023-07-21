import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Debt } from './Debt'

export type UserInfo = Omit<User, 'password'>

export const USER_TABLE_NAME = 'users'
@Entity(USER_TABLE_NAME)
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  name: string

  @Column('text')
  username: string

  @Column('text', {
    select: false,
  })
  password: string

  @Column()
  email: string

  @Column()
  isActive: boolean

  @OneToMany(() => Debt, (debt) => debt.user)
  debts?: Debt[]
}
