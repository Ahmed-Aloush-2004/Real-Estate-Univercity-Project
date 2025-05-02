import * as Joi from "joi";




export default Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'test', 'production', 'staging')
        .default('development'),
    API_VERSION:Joi.string().required(),
    DB_PORT: Joi.number().port().default(3306),
    DB_PASSWORD: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_USER_NAME:Joi.string().required(),
})