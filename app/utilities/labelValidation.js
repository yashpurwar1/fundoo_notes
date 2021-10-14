const Joi = require('joi');

class labelValidation{
    createValidate = Joi.object({
        labelName: Joi.string()
          .required(),
        id: Joi.string()
    });
    updateValidate = Joi.object({
        labelName: Joi.string()
          .required(),
        id: Joi.string(),
        labelId: Joi.string()
    });
}
module.exports = new labelValidation();