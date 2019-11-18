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

@Entity('MerchantContactTemp', { schema: 'public' })
export class MerchantContactTemp {
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
    (Controller: Controller) => Controller.merchantContactTemps,
    {},
  )
  @JoinColumn({ name: 'controller_id' })
  controller_id: Controller | null;

  @Column('text', {
    nullable: true,
    name: 'company_website',
  })
  company_website: string | null;

  @Column('text', {
    nullable: true,
    name: 'email',
  })
  email: string | null;

  @Column('text', {
    nullable: false,
    name: 'phone_number',
  })
  phone_number: string;

  @Column('text', {
    nullable: true,
    name: 'latitude',
  })
  latitude: string | null;

  @Column('text', {
    nullable: true,
    name: 'longitude',
  })
  longitude: string | null;
}
