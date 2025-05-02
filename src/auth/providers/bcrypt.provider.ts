import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcryptjs'
@Injectable()
export class BcryptProvider implements HashingProvider {
   
    public async hashPassword(data: string) {

        // Generate Salt
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(data, salt);
    }

    public async comparePassword(data: string, encryptedPassword: string): Promise<boolean> {

        return await bcrypt.compare(data, encryptedPassword);
    }
}
