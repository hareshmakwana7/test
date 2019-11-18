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
import { MerchantProfile } from './MerchantProfile';

@Entity('TechnicalContactDetails', { schema: 'public' })
export class TechnicalContactDetails {
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
    () => MerchantProfile,
    (MerchantProfile: MerchantProfile) =>
      MerchantProfile.technicalContactDetailss,
    {},
  )
  @JoinColumn({ name: 'merchant_idx' })
  merchantIdx: MerchantProfile | null;

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
