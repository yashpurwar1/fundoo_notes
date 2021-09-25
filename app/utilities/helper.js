/**
 * @module:         utilities
 * @file:           helper.js
 * @description:    It contains the hashing and token generation
 * @author:         Yash
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

class helper{
    hash = (password, callback) => {
        bcrypt.hash(password, 10, (err, hash) =>{
            if(err){
                throw err
            }else{
                return callback(null,hash)
            }
        })
    }

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

module.exports = new helper();
