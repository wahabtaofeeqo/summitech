import Joi from "joi";
import dotenv from "dotenv";

//
dotenv.config();

// Schema
const schema = Joi.object()
  .keys({
    DB_NAME: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    NODE_ENV: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    PORT: Joi.number().positive().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    TOKEN_KEY: Joi.string().required(),
    ALGORITHM: Joi.string().required(),
  })
  .unknown();

// Validate
const { value, error } = schema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config Validation Error: ${error.message}`);
}

//
export default {
  ...value,
};
