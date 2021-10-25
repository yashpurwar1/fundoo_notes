/**
 * @module:         models
 * @file:           user.model.js
 * @description:    user.model is for user schema and for hash of the password
 * @author:         Yash
 */

 const mongoose = require('mongoose');
 const helper = require('../utilities/helper.js');
 const { logger } = require('../../logger/logger.js');
 
 const userSchema = mongoose.Schema({
    googleId: { type: String },
     firstName: {
         type: String,
         required: true
     },
     lastName: {
         type: String,
         required: true
     },
     email: {
         type: String,
         required: true,
         unique: true,
     },
     password: {
         type: String,
         minlength: 5
     },
     googleLogin: { type: Boolean }
   
 },
     {
         timestamps: true
     })
 
 const user = mongoose.model('user', userSchema);
 
 class userModel {
     /**
      * @description:    Register user in the database
      * @param:          userDetails
      * @param:          callback 
      */
     registerUser = (userDetails, callback) => {
 
         const newUser = new user({
             firstName: userDetails.firstName,
             lastName: userDetails.lastName,
             email: userDetails.email,
             password: userDetails.password,
         });
 
         // To create the hash of the password
         helper.passwordHash(newUser.password, (err, hash) => {
             if (hash) {
             newUser.password = hash;

             //To the the user in the database
             newUser.save().then(
                 ()=>{
                     return callback(null, newUser);
                 }).catch(
                 () => {
                     return callback("Email already registered", null)
                 })
             }else {
             return callback("Internal error", null)
             }
         });
     }
 
    /**
     * @description:    Finds email in the database
     * @param:          findEmail 
     * @param:          callback for service
     */
    findEmail = (loginData, callBack) => {
        //To find a user email in the database
        user.findOne({ email: loginData.email }, (error, data) => {
            if (data) {
                return callBack(null, data);           
            } else{
                return callBack("Invalid email", null);
            }
        });
    }

    /**
     * @description:    Reset the password of the user
     * @param:          resetPassword
     * @param:          user and callback for service
     */
    resetPassword = (newUser, callback) =>{
        //To find a user in the database by the user email
        user.findOne({email: newUser.email }, (error, data) =>{
            if(error){
                return callback("No user found with following email", null)
            }else{
                // To generate the hash of the password
                helper.passwordHash(newUser.newPassword, (err, hash) => {
                    if (hash) {
                        const updatedPassword = hash;
                        // To update the old password with the new one
                        user.updateOne({"_id": data._id}, {"password": updatedPassword}, (error, data) => {
                            if(data.acknowledged == true){
                                return callback (null, "Updated successfully")
                            }
                            else{
                                return callback ("Error in updating", null)
                            }
                        })
                    }
                    else{
                        return callback ("Error in hash on password", null)
                    }
                })
            }
        })
    }

    socialLogin = async (userData) => {
        //To find a user in the database by the email
        return await user.findOne({ email: userData.email }).then(data => {
            if (data !== null) {
                return data;
            } else {
                const data = new user({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    password: userData.password,
                    googleId: userData.googleId,
                    googleLogin: userData.googleLogin
                });
                const datauser = async () => {
                    // Save the data in the database if the user is not already saved 
                    await data.save();
                };
                datauser();
                return data;
            }
        }).catch(err => {
          return ('Something went wrong', err);
        });
    };

 }
 module.exports = new userModel();