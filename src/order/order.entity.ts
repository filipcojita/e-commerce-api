import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { OrderItem } from './order-item.entity';

//constants
export const OrderStatus = {
  PENDING: 0,
  SHIPPED: 1,
  COMPLETED: 2,
  CANCELLED: 3,
};

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  total: number;

  @Column({ default: OrderStatus.PENDING })
  status: number;
}
