import {
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class AddMerchantContactDto {
  @IsNotEmpty({ message: 'Merchant Idx is required' })
  @IsUUID('4', { message: 'Merchant Idx must be a valid uuid' })
  merchant_idx: string;

  @IsOptional()
  @IsUrl({}, { message: 'Company website must be a valid url' })
  company_website?: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsPhoneNumber('ne-Np', { message: 'Mobile Number must be valid' })
  phone_number: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  email?: string;
}
