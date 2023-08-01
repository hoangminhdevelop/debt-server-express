import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, RelationId, Index, DeleteDateColumn } from 'typeorm'
import { Debt } from './Debt'
import { User } from './User'

export enum HistoryAction {
  Increment = 'INCREMENT',
  Decrement = 'DECREMENT',
}

@Entity('histories')
export class History {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  reason: string

  @Column()
  amount: number

  @Index()
  @Column({ type: 'enum', enum: HistoryAction })
  type: HistoryAction

  @CreateDateColumn({ default: new Date(), type: 'timestamp with time zone' })
  createdAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deletedDate: Date

  @ManyToOne(() => Debt, (debt) => debt.histories)
  debt: Debt

  @Index()
  @Column()
  @RelationId((history: History) => history.debt)
  debtId: number

  @ManyToOne(() => User, (user) => user.histories)
  user: User

  @Index()
  @Column()
  @RelationId((history: History) => history.user)
  userId: number
}

export type HistoryBase = Omit<Partial<History>, 'debt' | 'user'>
