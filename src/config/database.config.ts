import { registerAs } from "@nestjs/config";
console.log("host",process.env.DB_HOST);
console.log("port",process.env.DB_PORT);
console.log("user",process.env.DB_USER_NAME);
console.log("password",process.env.DB_PASSWORD);
console.log("database",process.env.DB_NAME);
console.log("synchronize",process.env.DB_SYNCRONIZE);

export default registerAs('databaseConfig', () => ({

    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCRONIZE === 'true' ? true : false,
    autoLoadEntities: process.env.DB_AUTOLOAD === 'true' ? true : false,
    
}))