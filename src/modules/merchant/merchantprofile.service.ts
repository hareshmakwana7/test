import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MerchantProfile } from '@entities/MerchantProfile';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMerchantDto } from '@dtos/CreateMerchant.dto';
import { ClientKafka } from '@nestjs/microservices';
import { UpdateMerchantDto } from '@dtos/UpdateMerchant.dto';
import { AddOtherDetailsDto } from '@dtos/AddOtherDetails.dto';
import { UpdateLocationDto } from '@dtos/UpdateLocation.dto';
import { UpdateOtherDetailsDto } from '@dtos/UpdateOtherDetails.dto';
import { AddMerchantContactDto } from '@dtos/AddMerchantContact.dto';
import { UpdateMerchantContactDto } from '@dtos/UpdateMerchantContact.dto';
import { AddMerchantLicenseDto } from '@dtos/AddMerchantLicense.dto';
import { UpdateMerchantLicenseDto } from '@dtos/UpdateMerchantLicense.dto';
import { AddBankDetailsDto } from '@dtos/AddBankDetails.dto';
import { UpdateBankDetailsDto } from '@dtos/UpdateBankDetails.dto';

@Injectable()
export class MerchantProfileService {
  constructor(
    @InjectRepository(MerchantProfile)
    private readonly merchantRepo: Repository<MerchantProfile>,
    @Inject('kafka') private readonly kafka: ClientKafka,
  ) {}

  async GetAllMerchants(): Promise<MerchantProfile[]> {
    return await this.merchantRepo.find({});
  }

  async GetMerchantsByIdx(idx: string): Promise<MerchantProfile> {
    const merchant = await this.merchantRepo.findOne({ idx });
    if (!merchant) {
      throw new HttpException(
        'Merchant with given idx not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return merchant;
  }

  async CreateMerchant(merchant: CreateMerchantDto): Promise<string> {
    // await this.kafka.emit('merchant', {
    //   data: { ...merchant, ...{ operation: 'CREATE_MERCHANT' } },
    // });
    //
    // return "merchant";

    // const AuthRes = await this.merchantRepo.create(merchant)

    return '';
  }

  async DeleteMerchantProfile(idx: string) {
    await this.kafka.emit('merchant', {
      data: { idx, operation: 'DELETE_MERCHANT' },
    });
    return 'deleted';
  }
  async UpdateMerchant(merchant: Partial<UpdateMerchantDto>): Promise<string> {
    await this.kafka.emit('merchant', {
      data: { ...merchant, ...{ operation: 'UPDATE_MERCHANT' } },
    });
    return 'updated';
  }

  async upLoadFiles(fileNames: Array<string>, idx: string) {
    await this.kafka.emit('merchant', {
      data: {
        ...{
          idcard_front: fileNames[0],
          idcard_back: fileNames[1],
          logo: fileNames[2],
          establishment_image: fileNames[3] || null,
          idx,
        },
        ...{ operation: 'FILE_ADD_MERCHANT' },
      },
    });
  }

  async setOtherDetails(otherDetails: AddOtherDetailsDto) {
    await this.kafka.emit('merchant', {
      data: { ...otherDetails, ...{ operation: 'OTHER_ADD_MERCHANT' } },
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
