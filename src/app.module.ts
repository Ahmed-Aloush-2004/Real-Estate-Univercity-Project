import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import cloudinaryConfig from './config/cloudinary.config';
import { PropertyModule } from './property/property.module';
import { Location } from './location/location.entity';
import { Property } from './property/property.entity';
import { OfficeModule } from './office/office.module';
import { Office } from './office/entities/office.entity';
import { PhotoModule } from './photo/photo.module';
import { Photo } from './photo/photo.entity';
import { LocationModule } from './location/location.module';import { FavoriteModule } from './favorite/favorite.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { BlogModule } from './blog/blog.module';import { LicenseModule } from './license/license.module';import { ProblemModule } from './problem/problem.module';import { AttributeModule } from './attribute/attribute.module';
import { PropertyCommentsModule } from './property_comments/property_comments.module';
import { PropertyAttributesModule } from './property_attributes/property_attributes.module';
import { Favorite } from './favorite/entities/favorite.entity';
import { Attribute } from './attribute/entities/attribute.entity';
import { Problem } from './problem/entities/problem.entity';
import { Property_Comments } from './property_comments/entities/property_comment.entity';
import { Property_Problem } from './property/property_problem.entity';
import { Property_Attributes } from './property_attributes/entities/property_attribute.entity';
import { Blog } from './blog/entities/blog.entity';
import { Complaint } from './complaints/entities/complaint.entity';
import { Office_Comments } from './office/entities/office_comments.entity';
import { Office_Rating } from './office/entities/office_rating.entity';
import { License } from './license/entities/license.entity';

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
        entities:[
          User,
          Photo,
          Location,
          Property,
          Office, 
          Favorite, 
          Attribute, 
          Problem, 
          Property_Comments, 
          Property_Problem,
          Property_Attributes,
          Blog,
          Complaint,
          Office_Comments,
          Office_Rating,
          License
        ],
      }),
    }),
    UserModule,
    AuthModule, 
    PhotoModule,
    LocationModule,
    PropertyModule,
    OfficeModule,
    FavoriteModule,
    ComplaintsModule,
    BlogModule,
    LicenseModule,
    ProblemModule,
    AttributeModule,
    PropertyCommentsModule,
    PropertyAttributesModule,
    
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
