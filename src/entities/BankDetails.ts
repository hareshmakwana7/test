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

@Entity('BankDetails', { schema: 'public' })
export class BankDetails {
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
    (MerchantProfile: MerchantProfile) => MerchantProfile.bankDetailss,
    {},
  )
  @JoinColumn({ name: 'merchant_idx' })
  merchantIdx: MerchantProfile | null;

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
