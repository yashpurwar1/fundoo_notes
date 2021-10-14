const Joi = require('joi');

class labelValidation{
    validate = Joi.object({
        labelName: Joi.string()
          .required(),
        id: Joi.string()
    });
}
module.exports = new labelValidation();