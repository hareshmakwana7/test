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

@Entity('MerchantLicence', { schema: 'public' })
export class MerchantLicence {
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
    (MerchantProfile: MerchantProfile) => MerchantProfile.merchantLicences,
    {},
  )
  @JoinColumn({ name: 'merchant_idx' })
  merchantIdx: MerchantProfile | null;

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
