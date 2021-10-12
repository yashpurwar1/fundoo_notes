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
    passwordHash = (password, callback) => {
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
         lastName: data.lastName,
         id: data._id
         }, process.env.SECRET_KEY);
         if (key){
             return callback(null, key);    
         }else{
             return callback(err, null);
         }
         
     }  
 
     tokenForgotPassword = (data, callback) => {
         const key = jwt.sign({
         firstName: data.firstName,
         lastName: data.lastName,
         email: data.email,
         password: data.password
         }, process.env.SECRET_KEY);
         if (key){
             return callback(null, key);    
         }else{
             return callback(err, null);
         }
     } 
     verifyToken = (req, res, next) => {
        const header = req.headers.authorization;
        const bearerToken = header.split(' ');
        const token = bearerToken[1];
        try {
          if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
              if (error) {
                return res.status(401).send({ 
                  success: false, 
                  message: 'Unauthorized Token or token expired'
                })
              } else {
                req.user = data;
                next();
              }
            });
          } else {
            return res.status(401).send({
               success: false,
               message: 'Invalid Token' 
              });
            }
        } catch (error) {
          return res.status(500).send({
            success: false,
            message: 'Something went wrong!' 
          });
        }
      }
    }
 
 module.exports = new helper();