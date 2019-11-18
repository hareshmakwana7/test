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

@Entity('TechnicalContactDetailsTemp', { schema: 'public' })
export class TechnicalContactDetailsTemp {
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
    (Controller: Controller) => Controller.technicalContactDetailsTemps,
    {},
  )
  @JoinColumn({ name: 'controller_id' })
  controller_id: Controller | null;

  @Column('text', {
    nullable: true,
    name: 'technical_contact_name',
  })
  technical_contact_name: string | null;

  @Column('text', {
    nullable: true,
    name: 'technical_contact_number',
  })
  technical_contact_number: string | null;

  @Column('text', {
    nullable: true,
    name: 'technical_contact_email',
  })
  technical_contact_email: string | null;

  @Column('text', {
    nullable: true,
    name: 'technical_contact_ext',
  })
  technical_contact_ext: string | null;
}
