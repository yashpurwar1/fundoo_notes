/**
 * @module:         service
 * @file:           user.service.js
 * @description:    callbacks from the model and comparision of passwords 
 * @author:         Yash
 */

const userModel = require('../models/user.model.js')
const bcrypt = require('bcrypt');
const helper = require('../utilities/helper.js');
const { logger } = require('../../logger/logger.js');
 
class userService {
    /**
     * @description:    registerUser send response to controller
     * @method:         registerUser to save the user
     * @param:          user, callback for controller
     */
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, data);
            }
        });
    };
 
    /**
     * @description:    loginUser send response to the controller
     * @method:         loginUser
     * @param:          loginDetails, callback for controller
     */
 
    loginUser = (loginDetails, callback) => {
        userModel.findEmail(loginDetails, (err, data) => {
            if(err){
            logger.error(err)
            return callback (err, null);
            }else{
                bcrypt.compare(loginDetails.password, data.password, (err, result) => {
                    if(result){
                        helper.token(data, (err, result)=>{
                            if(result){
                                return callback (null, result)
                            }else{
                                return callback ('Error in token generation', data);
                            }
                        });
                        
                    }else{
                        return callback ('Invalid password', data);
                    }
                });
                
            }
        });
    }
 
    /**
     * @description:    Generates token and send response to the controller
     * @method:         forgotPassword
     * @param:          user, callback for controller
     */
    forgotPassword = (user, callback) => {
        userModel.findEmail(user, (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                helper.tokenForgotPassword(data, (error, result) => {
                    if(error){
                        return callback("Error in token genegration", null)
                    }
                    return callback(null, result);
                })
                
            }
        });
    };
 
    /**
     * @description:    Send response to the controller
     * @method:         resetPassword
     * @param:          user, callback for controller
     */
    resetPassword = (user, callback) =>{         
        userModel.resetPassword(user, (error, data)=>{
            if(error){
                return callback(error, null)               
            }else{
                return callback(null, data)
            }
        })
    };

    socialLogin (googleInfo) {
        return new Promise((resolve, reject) => {
            userModel.socialLogin(googleInfo).then((data) => {
                helper.token(data, (err, token) => {
                    if (token){
                        resolve(token);
                    }
                    else{
                        reject(err)
                    }
                });
                
            }).catch((err) => {
                reject(err);
            });
        });
    };

}
 
 module.exports = new userService();