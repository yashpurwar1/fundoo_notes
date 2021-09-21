const Joi = require('joi');
const jwt = require('jsonwebtoken');
require("dotenv").config();

class utility {
    registerValidation =Joi.object({
        firstName: Joi.string()
            .min(2)
            .required()
            .pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')),

        lastName: Joi.string()
            .min(2)
            .required()
            .pattern(new RegExp('^[A-Z]{1}[a-z]{1,}$')),

        email: Joi.string()
            .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,16}$'))
            .required()

    });


    loginValidation =Joi.object({
        email: Joi.string()
            .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,16}$'))
            .required()

    });

    token = (data, callback) => {
        const key = jwt.sign({
        firstName: data.firstName,
        lastName: data.lastName
        }, process.env.SECRET_KEY);
        if (key){
            return callback(null, key);    
        }else{
            return callback(err, null);
        }
        
    }    
}
module.exports=new utility();