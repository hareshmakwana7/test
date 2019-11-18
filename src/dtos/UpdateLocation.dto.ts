import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class UpdateLocationDto {
  @IsNotEmpty({ message: 'Merchant Idx is required' })
  @IsUUID('4', { message: 'Merchant Idx must be a valid uuid' })
  merchant_idx: string;

  @IsOptional()
  @IsLatitude({ message: 'Value must be a valid Latitude' })
  latitude?: string;

  @IsOptional()
  @IsLongitude({ message: 'Value must be a valid Longitude' })
  longitude?: string;
}
