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

@Entity('MerchantContact', { schema: 'public' })
export class MerchantContact {
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
    (MerchantProfile: MerchantProfile) => MerchantProfile.merchantContacts,
    {},
  )
  @JoinColumn({ name: 'merchant_idx' })
  merchant_idx: MerchantProfile | null;

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

  @Column('bigint', {
    nullable: true,
    name: 'latitude',
  })
  latitude: string | null;

  @Column('bigint', {
    nullable: true,
    name: 'longitude',
  })
  longitude: string | null;
}
