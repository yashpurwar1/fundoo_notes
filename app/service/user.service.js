/**
 * @module:         service
 * @file:           user.service.js
 * @description:    callbacks from the model and comparision of passwords 
 * @author:         Yash
 */

const userModel = require('../models/user.model.js')
const bcrypt = require('bcrypt');
const helper = require('../utilities/helper.js');

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
        userModel.loginUser(loginDetails, (err, data) => {
            if(err){
                return callback (err, null);
            }else{
                bcrypt.compare(loginDetails.password, data.password, function(err, result) {
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
}

module.exports = new userService();