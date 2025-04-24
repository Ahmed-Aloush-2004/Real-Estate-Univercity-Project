import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches } from "class-validator";

export class CreateUserDto {


    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber('SY')
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/, {
        message:
            'Password must be 6-12 characters long, and include at least one letter, one number, and one special character.',
    })
    password: string;
}