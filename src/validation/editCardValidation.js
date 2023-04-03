import Joi from "joi";
import validation from "./validation";

const editCardSchema = Joi.object({
  img: Joi.string()

    .min(8)
    .max(150),

  title: Joi.string()
    /* .title({ tlds: { allow: false } }) */
    .required()
    .min(2)
    .max(100),
  price: Joi.number()
    /*  .price({ tlds: { allow: false } }) */
    .required(),
  description: Joi.string()
    /*  .description({ tlds: { allow: false } }) */
    .required()
    .min(10)
    .max(150),
});

const editCardParamsSchema = Joi.object({
  id: Joi.string().min(1).required,
});
const validateEditCardSchema = (userInput) =>
  validation(editCardSchema, userInput);
const validateEditCardParamsSchema = (userInput) =>
  validation(editCardParamsSchema, userInput);

export { validateEditCardParamsSchema };
export default validateEditCardSchema;
