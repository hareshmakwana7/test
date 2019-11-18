import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class UpdateMerchantLicenseDto {
  idx: string;

  @IsNotEmpty({ message: 'Merchant Idx is required' })
  @IsUUID('4', { message: 'Merchant Idx must be a valid uuid' })
  merchant_idx: string;

  @IsNotEmpty({ message: 'Establishment License Number is required' })
  establishment_licence_no: string;

  @IsNotEmpty({ message: 'Tax code is required' })
  tax_code: string;
}
