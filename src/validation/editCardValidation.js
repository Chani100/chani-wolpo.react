import Joi from "joi";
import validation from "./validation";

const editCardSchema = Joi.object({
  img: Joi.string()
    .pattern(new RegExp("(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .messages({
      "string.pattern.base": "regex should be uppercase",
    })
    .required()
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
const validateEditCardSchema = (userInput) =>
  validation(editCardSchema, userInput);

export default validateEditCardSchema;
