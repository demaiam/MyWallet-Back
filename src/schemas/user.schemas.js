import Joi from "joi";

export const schemaSignUp = Joi.object({ 
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3)
});