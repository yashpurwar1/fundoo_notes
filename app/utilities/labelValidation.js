const Joi = require('joi');

/**
 * @module:         labelValidation
 * @file:           labelValidation.js
 * @description:    Validates the label data entered by user
 * @author:         Yash
*/
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