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

@Entity('AccountantContactDetails', { schema: 'public' })
export class AccountantContactDetails {
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
      MerchantProfile.accountantContactDetailss,
    {},
  )
  @JoinColumn({ name: 'merchant_idx' })
  merchant_idx: MerchantProfile | null;

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
