import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { pick } from "../../utils/pick.util";
import { HTTP_STATUS } from "../constants/http.status";

export const validate = (schema: any): any => (req: Request, res: Response, next: NextFunction): any => {
    
    // Extract keys from schema
    const validSchema = pick(schema, ["params", "query", "body", "headers"]);

    // Extract keys from Request
    const object = pick(req, Object.keys(validSchema));

    // Validate
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" } }).validate(object);
    
    if (error) {
      const errorMessage = error.details
        .map((details): string => details.message).join(", ");

      return next(res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: false,
        message: 'Validation Error',
        error: errorMessage
      }));
    }
    
    Object.assign(req, value);
    return next();
  };