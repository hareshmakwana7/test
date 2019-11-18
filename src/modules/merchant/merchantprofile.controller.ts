import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MerchantProfileService } from '@modules/merchant/merchantprofile.service';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { MerchantProfile } from '@entities/MerchantProfile';
import { CreateMerchantDto } from '@dtos/CreateMerchant.dto';
import { UpdateMerchantDto } from '@dtos/UpdateMerchant.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { fileName } from '@utils/helperFunctions.utils';
import config from '@config/index';
import { AddOtherDetailsDto } from '@dtos/AddOtherDetails.dto';
import { UpdateLocationDto } from '@dtos/UpdateLocation.dto';
import { UpdateOtherDetailsDto } from '@dtos/UpdateOtherDetails.dto';
import { AddMerchantLicenseDto } from '@dtos/AddMerchantLicense.dto';
import { UpdateMerchantLicenseDto } from '@dtos/UpdateMerchantLicense.dto';
import { AddBankDetailsDto } from '@dtos/AddBankDetails.dto';
import { UpdateBankDetailsDto } from '@dtos/UpdateBankDetails.dto';

@Controller('merchant')
export class MerchantProfileController {
  constructor(
    @Inject(MINIO_CONNECTION) private readonly minioClient,
    private readonly merchantService: MerchantProfileService,
  ) {}

  @Get()
  async GetAllMerchants(): Promise<MerchantProfile[]> {
    return this.merchantService.GetAllMerchants();
  }

  @Post()
  CreateMerchant(@Body() merchant: CreateMerchantDto) {
    return this.merchantService.CreateMerchant(merchant);
  }

  @Delete(':idx')
  DeleteMerchant(@Param('idx') idx: string) {
    if (!isUUID(idx, 'all')) {
      throw new HttpException('Bad idx value', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return this.merchantService.DeleteMerchantProfile(idx);
  }

  @Put()
  updatePermissionRole(@Body() merchant: UpdateMerchantDto) {
    if (!isUUID(merchant.idx, 'all')) {
      throw new HttpException('Invalid idx', HttpStatus.BAD_REQUEST);
    }
    return this.merchantService.UpdateMerchant(merchant);
  }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'idcardfront', maxCount: 1 },
        { name: 'idcardback', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
        { name: 'establishmentimage', maxCount: 1 },
      ],
      {
        limits: {
          fileSize: config.imageLimit * 1024,
        },
        fileFilter(
          req: any,
          file: {
            fieldname: string;
            originalname: string;
            encoding: string;
            mimetype: string;
            size: number;
            destination: string;
            filename: string;
            path: string;
            buffer: Buffer;
          },
          callback: (error: Error | null, acceptFile: boolean) => void,
        ): void {
          if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Only Images Allowed'), false);
          }
          callback(null, true);
        },
      },
    ),
  )
  async uploadFile(@UploadedFiles() files, @Body('idx') idx: string) {
    const fileNames: Array<string> = [];

    if (!files.idcardback || !files.idcardback || !files.logo) {
      throw new HttpException(
        'Some images are missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.entries(files).forEach(([key, value]) => {
      // @ts-ignore
      const currentFile = value.pop();
      const currentFileName = fileName(currentFile.originalname);
      this.minioClient.putObject(
        config.bucketName,
        currentFileName,
        currentFile.buffer,
        function(error) {
          if (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        },
      );
      fileNames.push(currentFileName);
    });

    await this.merchantService.upLoadFiles(fileNames, idx);
  }

  @Post('other')
  @UsePipes(new ValidationPipe({ validationError: { target: false } }))
  async setOtherDetails(@Body() otherDetails: AddOtherDetailsDto) {
    const merchant = await this.merchantService.GetMerchantsByIdx(
      otherDetails.idx,
    );
    if (!merchant) {
      throw new HttpException('Cannot find merchant', HttpStatus.BAD_REQUEST);
    }
    return this.merchantService.setOtherDetails(otherDetails);
  }

  @Put('other')
  @UsePipes(new ValidationPipe({ validationError: { target: false } }))
  async updateOtherDetails(@Body() otherDetails: UpdateOtherDetailsDto) {
    const merchant = await this.merchantService.GetMerchantsByIdx(
      otherDetails.idx,
    );
    if (!merchant) {
      throw new HttpException('Cannot find merchant', HttpStatus.BAD_REQUEST);
    }
    return this.merchantService.updateOtherDetails(otherDetails);
  }

  @Get(':idx')
  async GetMerchantsByIdx(@Param('idx') idx: string): Promise<MerchantProfile> {
    if (!isUUID(idx, 'all')) {
      throw new HttpException('Bad idx value', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return this.merchantService.GetMerchantsByIdx(idx);
  }

  @Post('license')
  @UsePipes(new ValidationPipe({ validationError: { target: false } }))
  async createMerchantLicense(@Body() merchantLicense: AddMerchantLicenseDto) {
    const merchant = await this.merchantService.GetMerchantsByIdx(
      merchantLicense.merchant_idx,
    );
    if (!merchant) {
      throw new HttpException('Cannot find merchant', HttpStatus.BAD_REQUEST);
    }
    return this.merchantService.setMerchantLicense(merchantLicense);
  }

  @Put('license')
  @UsePipes(new ValidationPipe({ validationError: { target: false } }))
  async updateMerchantLicense(
    @Body() merchantLicense: UpdateMerchantLicenseDto,
  ) {
    const merchant = await this.merchantService.GetMerchantsByIdx(
      merchantLicense.merchant_idx,
    );
    if (!merchant) {
      throw new HttpException('Cannot find merchant', HttpStatus.BAD_REQUEST);
    }
    return this.merchantService.updateMerchantLicense(merchantLicense);
  }

  @Post('bank-details')
  @UsePipes(new ValidationPipe({ validationError: { target: false } }))
  async createBankDetails(@Body() bankDetails: AddBankDetailsDto) {
    const merchant = await this.merchantService.GetMerchantsByIdx(
      bankDetails.merchantIdx,
    );
    if (!merchant) {
      throw new HttpException('Cannot find merchant', HttpStatus.BAD_REQUEST);
    }
    return this.merchantService.setBankDetails(bankDetails);
  }

  @Put('bank-details')
  @UsePipes(new ValidationPipe({ validationError: { target: false } }))
  async updateBankDetails(@Body() bankdDetails: UpdateBankDetailsDto) {
    const merchant = await this.merchantService.GetMerchantsByIdx(
      bankdDetails.merchantIdx,
    );
    if (!merchant) {
      throw new HttpException('Cannot find merchant', HttpStatus.BAD_REQUEST);
    }
    return this.merchantService.updateBankDetails(bankdDetails);
  }
}
