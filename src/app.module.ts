import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { UploadsModule } from './uploads/uploads.module';
import cloudinaryConfig from './config/cloudinary.config';
import { Upload } from './uploads/upload.entity';
import { LocationsModule } from './locations/locations.module';
import { PropertyModule } from './property/property.module';
import { Location } from './locations/location.entity';
import { Property } from './property/property.entity';
import { RealEstateOfficeModule } from './real-estate-office/real-estate-office.module';
import { RealEstateOffice } from './real-estate-office/real-estate-office.entity';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig,cloudinaryConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('databaseConfig.host'),
        port: configService.get('databaseConfig.port'),
        username: configService.get('databaseConfig.user'),
        database: configService.get('databaseConfig.name'),
        password: configService.get('databaseConfig.password'),
        synchronize: configService.get('databaseConfig.synchronize'),
        autoLoadEntities: configService.get('databaseConfig.autoLoadEntities'),
        entities:[User,Upload,Location,Property,RealEstateOffice],
      }),
    }),
    AuthModule,
    UploadsModule,
    LocationsModule,
    PropertyModule,
    RealEstateOfficeModule,


  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide:APP_GUARD,
      useClass:AuthenticationGuard
    },

  ],
})
export class AppModule { }
