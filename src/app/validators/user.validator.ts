import Joi from "joi";

export class UserValidator {
  public profile: object = {
    body: Joi.object().keys({
      firstname: Joi.string().optional().messages({
        "string.empty": `First Name cannot be an empty field`,
      }),
      lastname: Joi.string().optional().messages({
        "string.empty": `Last Name cannot be an empty field`,
      }),
      phone_number: Joi.string().optional().messages({
        "string.empty": `Phone cannot be an empty field`,
      }),
      dob: Joi.date().optional().messages({
        "string.empty": `dob cannot be an empty field and should be a valid date`,
      }),
      homeAddress: Joi.string().optional().messages({
        "string.empty": `homeAddress cannot be an empty field`,
      }),
      state: Joi.string().optional().messages({
        "string.empty": `state cannot be an empty field`,
      }),
      city: Joi.string().optional().messages({
        "string.empty": `city cannot be an empty field`,
      }),
      image: Joi.string().optional().messages({
        "string.empty": `image cannot be an empty field`,
      }),
      is_active: Joi.boolean().optional().messages({
        "string.empty": `is_active cannot be an empty field`,
      }),
    }),
  };
}

export default new UserValidator();
