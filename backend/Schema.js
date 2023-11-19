const joi = require("joi");
module.exports.validateUserSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required().min(8),
});
