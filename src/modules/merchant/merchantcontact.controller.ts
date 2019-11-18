import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MerchantProfileService } from '@modules/merchant/merchantprofile.service';
import { AddMerchantContactDto } from '@dtos/AddMerchantContact.dto';
import { UpdateMerchantContactDto } from '@dtos/UpdateMerchantContact.dto';
import { UpdateLocationDto } from '@dtos/UpdateLocation.dto';

@Controller('merchant')
export class MerchantContactController {
  constructor(private readonly merchantService: MerchantProfileService) {}

  @UsePipes(new ValidationPipe({ validationError: { target: false } }))
  @Post('contact')
  setContactDetails(@Body() merchantContact: AddMerchantContactDto) {
    return this.merchantService.setContactDetails(merchantContact);
  }

  @UsePipes(new ValidationPipe({ validationError: { target: false } }))
  @Put('contact')
  updateContactDetails(@Body() merchantContact: UpdateMerchantContactDto) {
    return this.merchantService.updateContactDetails(merchantContact);
  }

  @Post('location')
  @UsePipes(new ValidationPipe({ validationError: { target: false } }))
  async setLatLong(@Body() latLong: UpdateLocationDto) {
    const merchant = await this.merchantService.GetMerchantsByIdx(
      latLong.merchant_idx,
    );
    if (!merchant) {
      throw new HttpException('Cannot find merchant', HttpStatus.BAD_REQUEST);
    }
    return await this.merchantService.setLatLong(latLong);
  }

  @Put('location')
  @UsePipes(new ValidationPipe({ validationError: { target: false } }))
  async updateLatLong(@Body() latLong: UpdateLocationDto) {
    const merchant = await this.merchantService.GetMerchantsByIdx(
      latLong.merchant_idx,
    );
    if (!merchant) {
      throw new HttpException('Cannot find merchant', HttpStatus.BAD_REQUEST);
    }
    return await this.merchantService.updateLatLong(latLong);
  }
}
