import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  picture: string; // name of the file where the picture is stored

  @CreateDateColumn()
  createdAt: Date; // creation date

  @UpdateDateColumn()
  updatedAt: Date; // last update date
}
