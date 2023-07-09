import Joi from "joi";

export const schemaTransaction = Joi.object({
  value: Joi.number().positive().required(),
  description: Joi.string().required()
});