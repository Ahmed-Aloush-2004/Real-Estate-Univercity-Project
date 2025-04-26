import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import cloudinaryConfig from './config/cloudinary.config';
import { PropertyModule } from './property/property.module';
import { Location } from './location/location.entity';
import { Property } from './property/property.entity';
import { OfficeModule } from './office/office.module';
import { Office } from './office/office.entity';
import { PhotoModule } from './photo/photo.module';
import { Photo } from './photo/photo.entity';
import { LocationModule } from './location/location.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
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
        entities:[User,Photo,Location,Property,Office],
      }),
    }),
    UserModule,
    AuthModule, 
    PhotoModule,
    LocationModule,
    PropertyModule,
    OfficeModule,


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

export class jj{}

/// Omar jamal Kahil