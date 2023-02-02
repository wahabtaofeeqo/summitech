import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
    DeleteDateColumn,
    Index,
    OneToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
import { Stock } from './stock.model';

  @Entity({ name: 'products' })
  export class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ default: true })
    image: string;

    @Column({ default: 0 })
    price: number;

    @OneToMany(() => Stock, (stock) => stock.product)
    @JoinColumn({name: 'stock_id', referencedColumnName: 'id'})
    stocks: Stock[];

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

    @DeleteDateColumn()
    deleted_at: Timestamp;
  }
