import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class AddOtherDetailsDto {
  @IsNotEmpty({ message: 'Idx is required' })
  //@IsUUID('4', { message: 'Idx must be a valid uuid' })
  idx: string;

  @IsNotEmpty({ message: 'Sweep interval is required' })
  @IsNumber({}, { message: 'Sweep interval must be a number' })
  sweep_interval: number;

  @IsNotEmpty({ message: 'Refund allowed days is required' })
  @IsNumber({}, { message: 'Refund allowed days  must be a number' })
  refund_allowed_days: number;
}
