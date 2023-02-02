import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
    DeleteDateColumn,
    Index,
  } from 'typeorm';
import { UserStatus } from '../../enums/user-status.enum';

  @Entity({ name: 'users' })
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ default: UserStatus.ACTIVE})
    status: string;

    @Column({ nullable: false })
    password: string;

    @Index({ fulltext: true })
    @Column({ nullable: false })
    email: string;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

    @DeleteDateColumn()
    deleted_at: Timestamp;
  }
