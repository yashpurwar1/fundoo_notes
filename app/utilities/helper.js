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
         lastName: data.lastName
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
         }, process.env.SECRET_KEY, {expiresIn: "5m"});
         if (key){
             return callback(null, key);    
         }else{
             return callback(err, null);
         }
     } 
     verifyToken = (token, callback) =>{
         jwt.verify(token, process.env.SECRET_KEY, (error, data) =>{
             if(error){
                 return callback(error, null)
             }
             else{
                 return callback(null, data)
                 
             }
         })
     }
 }
 
 module.exports = new helper();