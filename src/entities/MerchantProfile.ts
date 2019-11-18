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
import { AccountantContactDetails } from './AccountantContactDetails';
import { BankDetails } from './BankDetails';
import { BusinessContactDetails } from './BusinessContactDetails';
import { MerchantContact } from './MerchantContact';
import { MerchantLicence } from './MerchantLicence';
import { TechnicalContactDetails } from './TechnicalContactDetails';

@Entity('MerchantProfile', { schema: 'public' })
@Index('MerchantProfile_idx_key', ['idx'], { unique: true })
export class MerchantProfile {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('uuid', {
    nullable: false,
    unique: true,
    default: () => 'uuid_generate_v1()',
    name: 'idx',
  })
  idx: string;

  @Column('text', {
    nullable: false,
    name: 'mobile_number',
  })
  mobile_number: string;

  @Column('text', {
    nullable: false,
    name: 'company_name',
  })
  company_name: string;

  @Column('date', {
    nullable: true,
    name: 'issue_date',
  })
  issue_date: string | null;

  @Column('bigint', {
    nullable: true,
    name: 'merchant_code',
  })
  merchant_code: string | null;

  @Column('bigint', {
    nullable: true,
    name: 'id_type',
  })
  id_type: string | null;

  @Column('date', {
    nullable: true,
    name: 'id_expiry',
  })
  id_expiry: string | null;

  @Column('bigint', {
    nullable: true,
    name: 'merchant_group',
  })
  merchant_group: string | null;

  @Column('text', {
    nullable: false,
    name: 'nationality',
  })
  nationality: string;

  @Column('bigint', {
    nullable: true,
    name: 'idpassport_no',
  })
  idpassport_no: string | null;

  @Column('text', {
    nullable: true,
    name: 'idcard_front',
  })
  idcard_front: string | null;

  @Column('text', {
    nullable: true,
    name: 'idcard_back',
  })
  idcard_back: string | null;

  @Column('text', {
    nullable: true,
    name: 'establishment_image',
  })
  establishment_image: string | null;

  @Column('text', {
    nullable: true,
    name: 'logo',
  })
  logo: string | null;

  @Column('text', {
    nullable: true,
    name: 'point_rate',
  })
  point_rate: string | null;

  @Column('text', {
    nullable: true,
    name: 'payment_type',
  })
  payment_type: string | null;

  @Column('bigint', {
    nullable: true,
    name: 'sweep_interval',
  })
  sweep_interval: string | null;

  @Column('text', {
    nullable: true,
    name: 'refund_allowed_days',
  })
  refund_allowed_days: string | null;

  @Column('boolean', {
    nullable: true,
    default: () => 'false',
    name: 'is_active',
  })
  is_active: boolean | null;

  @OneToMany(
    () => AccountantContactDetails,
    (AccountantContactDetails: AccountantContactDetails) =>
      AccountantContactDetails.merchant_idx,
  )
  accountantContactDetailss: AccountantContactDetails[];

  @OneToMany(
    () => BankDetails,
    (BankDetails: BankDetails) => BankDetails.merchantIdx,
  )
  bankDetailss: BankDetails[];

  @OneToMany(
    () => BusinessContactDetails,
    (BusinessContactDetails: BusinessContactDetails) =>
      BusinessContactDetails.merchantIdx,
  )
  businessContactDetailss: BusinessContactDetails[];

  @OneToMany(
    () => MerchantContact,
    (MerchantContact: MerchantContact) => MerchantContact.merchant_idx,
  )
  merchantContacts: MerchantContact[];

  @OneToMany(
    () => MerchantLicence,
    (MerchantLicence: MerchantLicence) => MerchantLicence.merchantIdx,
  )
  merchantLicences: MerchantLicence[];

  @OneToMany(
    () => TechnicalContactDetails,
    (TechnicalContactDetails: TechnicalContactDetails) =>
      TechnicalContactDetails.merchantIdx,
  )
  technicalContactDetailss: TechnicalContactDetails[];
}
