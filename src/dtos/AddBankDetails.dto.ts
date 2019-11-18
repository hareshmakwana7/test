import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class AddBankDetailsDto {
  id: number;
  idx: string;

  @IsNotEmpty({ message: 'Merchant Idx is required' })
  @IsUUID('4', { message: 'Merchant Idx must be a valid uuid' })
  merchantIdx: string;

  bank_code?: string;

  @IsNotEmpty({ message: 'Bank swift code is required' })
  bank_swift_code: string;

  @IsNotEmpty({ message: 'Bank account number is required' })
  bank_account_no: string;

  @IsNotEmpty({ message: 'Branch code  is required' })
  branch_code: string;

  @IsNotEmpty({ message: 'Bank address is required' })
  bank_address: string;
}
