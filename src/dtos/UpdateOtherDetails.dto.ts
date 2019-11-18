import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateOtherDetailsDto {
  @IsNotEmpty({ message: 'Idx is required' })
  @IsUUID('4', { message: 'Idx must be a valid uuid' })
  idx: string;

  @IsOptional()
  @IsNumber({}, { message: 'Sweep interval must be a number' })
  sweep_interval?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Refund allowed days  must be a number' })
  refund_allowed_days?: number;
}
