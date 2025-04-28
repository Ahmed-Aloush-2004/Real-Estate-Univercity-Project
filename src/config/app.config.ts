
import { registerAs } from '@nestjs/config'



export default registerAs('appConfig',()=>({
    environment:process.env.NODE_ENV || 'test',
    apiVersion: process.env.API_VERSION,
}))