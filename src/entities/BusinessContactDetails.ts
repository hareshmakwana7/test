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

@Entity('BusinessContactDetails', { schema: 'public' })
export class BusinessContactDetails {
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
      MerchantProfile.businessContactDetailss,
    {},
  )
  @JoinColumn({ name: 'merchant_idx' })
  merchantIdx: MerchantProfile | null;

  @Column('text', {
    nullable: false,
    name: 'business_contact_name',
  })
  business_contact_name: string;

  @Column('text', {
    nullable: false,
    name: 'business_contact_number',
  })
  business_contact_number: string;

  @Column('text', {
    nullable: false,
    name: 'business_contact_email',
  })
  business_contact_email: string;

  @Column('text', {
    nullable: true,
    name: 'business_contact_ext',
  })
  business_contact_ext: string | null;
}
