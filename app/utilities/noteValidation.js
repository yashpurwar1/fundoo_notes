const Joi = require('joi');

class noteValidation{
    createValidate = Joi.object({
        id: Joi.string(),
            //.required(),
        title: Joi.string()
          .required(),
        description: Joi.string()
          .required()
          .min(10)
    });
    getValidate = Joi.object({
        id: Joi.string()
            //.required()
    });
    getNoteByIdValidate = Joi.object({
        id: Joi.string(),
            //.required(),
        noteId: Joi.string()
            .required()
    });
    updateValidate = Joi.object({
        id: Joi.string(),
            //.required(),
        noteId: Joi.string(),
            //.required(),
        title: Joi.string()
          .required(),
        description: Joi.string().min(10)
          .required()
    });
    deleteValidate = Joi.object({
        id: Joi.string(),
            //.required(),
        noteId: Joi.string()
            .required()
    });
}
module.exports= new noteValidation();