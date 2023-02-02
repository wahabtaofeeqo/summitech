import Joi from "joi";

export class ProductValidator {

  public create: object = {
    body: Joi.object().keys({
        price: Joi.number()
            .required()
            .messages({
                "any.required": `Price is a required field`,
            }),
        name: Joi.string()
            .required()
            .messages({
                "string.empty": `Name cannot be an empty field`,
                "any.required": `Name is a required field`,
            }),
        image: Joi.string()
            .required()
            .messages({
                "string.empty": `Image cannot be an empty field`,
                "any.required": `Image is a required field`,
            }),

        stock_id: Joi.string().optional()
    })
  };
}