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

@Entity('AccountantContactDetailsTemp', { schema: 'public' })
export class AccountantContactDetailsTemp {
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
    (Controller: Controller) => Controller.accountantContactDetailsTemps,
    {},
  )
  @JoinColumn({ name: 'controller_id' })
  controller_id: Controller | null;

  @Column('text', {
    nullable: true,
    name: 'accountant_contact_name',
  })
  accountant_contact_name: string | null;

  @Column('text', {
    nullable: true,
    name: 'accountant_contact_number',
  })
  accountant_contact_number: string | null;

  @Column('text', {
    nullable: true,
    name: 'accountant_contact_email',
  })
  accountant_contact_email: string | null;

  @Column('text', {
    nullable: true,
    name: 'accountant_contact_ext',
  })
  accountant_contact_ext: string | null;
}
