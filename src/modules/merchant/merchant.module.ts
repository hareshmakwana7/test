import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantProfile } from '@entities/MerchantProfile';
import { BankDetails } from '@entities/BankDetails';
import { MerchantLicence } from '@entities/MerchantLicence';
import { MerchantContact } from '@entities/MerchantContact';
import config from '@config/index';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { ClientsModule } from '@nestjs/microservices';
import { NestMinioModule } from 'nestjs-minio';
import { MerchantProfileController } from '@modules/merchant/merchantprofile.controller';
import { MerchantProfileService } from '@modules/merchant/merchantprofile.service';
import { MerchantContactController } from '@modules/merchant/merchantcontact.controller';
import { MerchantprofileTempController } from './merchantprofileTemp.controller';
import { MerchantTempService } from './merchantTemp.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'kafka',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [config.kafkaBroker],
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
    NestMinioModule.register({
      endPoint: 'play.min.io',
      port: 9000,
      useSSL: true,
      accessKey: 'Q3AM3UQ867SPQQA43P2F',
      secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
    }),
    TypeOrmModule.forFeature([
      MerchantProfile,
      BankDetails,
      MerchantLicence,
      MerchantContact,
    ]),
  ],
  controllers: [
    MerchantProfileController,
    MerchantContactController,
    MerchantprofileTempController,
  ],
  providers: [MerchantProfileService, MerchantTempService],
})
export class MerchantModule {}
