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
import { AccountantContactDetailsTemp } from './AccountantContactDetailsTemp';
import { BankDetailsTemp } from './BankDetailsTemp';
import { BusinessContactDetailsTemp } from './BusinessContactDetailsTemp';
import { MerchantContactTemp } from './MerchantContactTemp';
import { MerchantLicenceTemp } from './MerchantLicenceTemp';
import { MerchantProfileTemp } from './MerchantProfileTemp';
import { TechnicalContactDetailsTemp } from './TechnicalContactDetailsTemp';

@Entity('Controller', { schema: 'public' })
@Index('Controller_idx_key', ['idx'], { unique: true })
export class Controller {
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

  @Column('bigint', {
    nullable: true,
    name: 'merchant_id',
  })
  merchant_id: string | null;

  @Column('uuid', {
    nullable: true,
    name: 'company_idx',
  })
  company_idx: string | null;

  @Column('boolean', {
    nullable: true,
    name: 'status',
  })
  status: boolean | null;

  @Column('boolean', {
    nullable: true,
    name: 'is_submitted',
  })
  is_submitted: boolean | null;

  @Column('timestamp without time zone', {
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_on',
  })
  created_on: Date | null;

  @OneToMany(
    () => AccountantContactDetailsTemp,
    (AccountantContactDetailsTemp: AccountantContactDetailsTemp) =>
      AccountantContactDetailsTemp.controller_id,
  )
  accountantContactDetailsTemps: AccountantContactDetailsTemp[];

  @OneToMany(
    () => BankDetailsTemp,
    (BankDetailsTemp: BankDetailsTemp) => BankDetailsTemp.controller_id,
  )
  bankDetailsTemps: BankDetailsTemp[];

  @OneToMany(
    () => BusinessContactDetailsTemp,
    (BusinessContactDetailsTemp: BusinessContactDetailsTemp) =>
      BusinessContactDetailsTemp.controller_id,
  )
  businessContactDetailsTemps: BusinessContactDetailsTemp[];

  @OneToMany(
    () => MerchantContactTemp,
    (MerchantContactTemp: MerchantContactTemp) =>
      MerchantContactTemp.controller_id,
  )
  merchantContactTemps: MerchantContactTemp[];

  @OneToMany(
    () => MerchantLicenceTemp,
    (MerchantLicenceTemp: MerchantLicenceTemp) =>
      MerchantLicenceTemp.controller_id,
  )
  merchantLicenceTemps: MerchantLicenceTemp[];

  @OneToMany(
    () => MerchantProfileTemp,
    (MerchantProfileTemp: MerchantProfileTemp) =>
      MerchantProfileTemp.controller_id,
  )
  merchantProfileTemps: MerchantProfileTemp[];

  @OneToMany(
    () => TechnicalContactDetailsTemp,
    (TechnicalContactDetailsTemp: TechnicalContactDetailsTemp) =>
      TechnicalContactDetailsTemp.controller_id,
  )
  technicalContactDetailsTemps: TechnicalContactDetailsTemp[];
}
