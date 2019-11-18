import { ClientKafka } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { CreateMerchantDto } from '@dtos/CreateMerchant.dto';
import { AddOtherDetailsDto } from '@dtos/AddOtherDetails.dto';
import { UpdateOtherDetailsDto } from '@dtos/UpdateOtherDetails.dto';
import { AddMerchantContactDto } from '@dtos/AddMerchantContact.dto';
import { UpdateMerchantContactDto } from '@dtos/UpdateMerchantContact.dto';
import { UpdateLocationDto } from '@dtos/UpdateLocation.dto';
import { AddMerchantLicenseDto } from '@dtos/AddMerchantLicense.dto';
import { UpdateMerchantLicenseDto } from '@dtos/UpdateMerchantLicense.dto';
import { AddBankDetailsDto } from '@dtos/AddBankDetails.dto';
import { UpdateBankDetailsDto } from '@dtos/UpdateBankDetails.dto';

@Injectable()
export class MerchantTempService {
  constructor(@Inject('kafka') private readonly kafka: ClientKafka) {}

  async addMerchantTemp(merchant: CreateMerchantDto) {
    await this.kafka.emit('merchant', {
      data: { ...merchant, operation: 'ADD_MERCHANT_TEMP' },
    });
  }

  async setOtherDetailsTemp(otherDetails: AddOtherDetailsDto) {
    await this.kafka.emit('merchant', {
      data: { ...otherDetails, ...{ operation: 'ADD_OTHER_DETAILS_TEMP' } },
    });
  }

  async updateOtherDetails(otherDetails: UpdateOtherDetailsDto) {
    await this.kafka.emit('merchant', {
      data: { ...otherDetails, ...{ operation: 'OTHER_UPDATE_MERCHANT' } },
    });
  }

  async setContactDetails(merchantContact: AddMerchantContactDto) {
    await this.kafka.emit('merchant', {
      data: { ...merchantContact, ...{ operation: 'CONTACT_ADD_MERCHANT' } },
    });
  }

  async updateContactDetails(merchantContact: UpdateMerchantContactDto) {
    await this.kafka.emit('merchant', {
      data: { ...merchantContact, ...{ operation: 'CONTACT_UPDATE_MERCHANT' } },
    });
  }

  async setLatLong(latLong: UpdateLocationDto) {
    await this.kafka.emit('merchant', {
      data: { ...latLong, ...{ operation: 'LOCATION_ADD_MERCHANT' } },
    });
  }

  async updateLatLong(latLong: UpdateLocationDto) {
    await this.kafka.emit('merchant', {
      data: {
        ...latLong,
        ...{ operation: 'LOCATION_UPDATE_MERCHANT' },
      },
    });
  }

  async setMerchantLicense(merchantLicense: AddMerchantLicenseDto) {
    await this.kafka.emit('merchant', {
      data: { ...merchantLicense, ...{ operation: 'ADD_MERCHANT_LICENSE' } },
    });
  }
  async updateMerchantLicense(merchantLicense: UpdateMerchantLicenseDto) {
    await this.kafka.emit('merchant', {
      data: { ...merchantLicense, ...{ operation: 'UPDATE_MERCHANT_LICENSE' } },
    });
  }

  async setBankDetails(bankdDetails: AddBankDetailsDto) {
    await this.kafka.emit('merchant', {
      data: { ...bankdDetails, ...{ operation: 'ADD_BANK_DETAILS' } },
    });
  }

  async updateBankDetails(bankdDetails: UpdateBankDetailsDto) {
    await this.kafka.emit('merchant', {
      data: { ...bankdDetails, ...{ operation: 'UPDATE_BANK_DETAILS' } },
    });
  }
}
