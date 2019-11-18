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

@Entity('MerchantLicenceTemp', { schema: 'public' })
export class MerchantLicenceTemp {
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
    (Controller: Controller) => Controller.merchantLicenceTemps,
    {},
  )
  @JoinColumn({ name: 'controller_id' })
  controller_id: Controller | null;

  @Column('text', {
    nullable: false,
    name: 'establishment_licence_no',
  })
  establishment_licence_no: string;

  @Column('text', {
    nullable: false,
    name: 'tax_code',
  })
  tax_code: string;
}
