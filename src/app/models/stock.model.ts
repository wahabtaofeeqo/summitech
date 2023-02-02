import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
    DeleteDateColumn,
    ManyToOne,
  } from 'typeorm';
import { Product } from './product.model';

  @Entity({ name: 'stocks' })
  export class Stock {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 0 })
    quantity: number;

    @Column({unique: true})
    batch_id: string;

    @ManyToOne(() => Product, (product) => product.stocks)
    product: Product

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

    @DeleteDateColumn()
    deleted_at: Timestamp;
  }
