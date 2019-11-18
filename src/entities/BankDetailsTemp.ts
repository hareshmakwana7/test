import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Controller } from './Controller';

@Entity('BankDetailsTemp', { schema: 'public' })
export class BankDetailsTemp {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('uuid', {
    nullable: true,
    default: () => 'uuid_generate_v1()',
    name: 'idx',
  })
  idx: string | null;

  @ManyToOne(
    () => Controller,
    (Controller: Controller) => Controller.bankDetailsTemps,
    {},
  )
  @JoinColumn({ name: 'controller_id' })
  controller_id: Controller | null;

  @Column('text', {
    nullable: true,
    name: 'bank_code',
  })
  bank_code: string | null;

  @Column('text', {
    nullable: false,
    name: 'bank_swift_code',
  })
  bank_swift_code: string;

  @Column('text', {
    nullable: false,
    name: 'bank_account_no',
  })
  bank_account_no: string;

  @Column('text', {
    nullable: false,
    name: 'branch_code',
  })
  branch_code: string;

  @Column('text', {
    nullable: false,
    name: 'bank_address',
  })
  bank_address: string;
}
