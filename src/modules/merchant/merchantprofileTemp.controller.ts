import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { CreateMerchantDto } from '@dtos/CreateMerchant.dto';
import { MerchantTempService } from '@modules/merchant/merchantTemp.service';
import { AddOtherDetailsDto } from '@dtos/AddOtherDetails.dto';

@Controller('merchant-temp')
export class MerchantprofileTempController {
  constructor(private readonly merchantTempService: MerchantTempService) {}

  @Post()
  addMerchantTemp(@Body() merchant: CreateMerchantDto) {
    return this.merchantTempService.addMerchantTemp(merchant);
  }

  @Post('others')
  addOtherDetailsTemp(@Body() merchant: AddOtherDetailsDto) {
    return this.merchantTempService.setOtherDetailsTemp(merchant);
  }
}
