import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  
    abstract hashPassword(data: string);

    abstract comparePassword(
        data: string,
        encryptedPassword: string,
    ): Promise<boolean>;
}

