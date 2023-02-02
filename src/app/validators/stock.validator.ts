import Joi from "joi";

export class StockValidator {

  public create: object = {
    body: Joi.object().keys({
        quantity: Joi.number()
            .required()
            .messages({
                "any.required": `Quantity is a required field`,
            }),

        batch_id: Joi.string()
            .required()
            .messages({
                "any.required": `Batch Id is a required field`,
            }),
    })
  };
}