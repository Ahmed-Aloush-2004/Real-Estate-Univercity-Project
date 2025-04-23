import { IsString, IsOptional, IsEmail, Length, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  @Length(1, 96)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 96)
  lastName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber('SY')
  phoneNumber?: string;

  // @IsOptional()
  // @IsEmail()
  // @Length(5, 96)
  // email?: string;


}
