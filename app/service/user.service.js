const userModel = require('../models/user.model.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class userService {
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, data);
            }
        });
    };

    loginUser = (loginDetails, callback) => {
        userModel.loginUser(loginDetails, (err, data) => {
            if(err){
                return callback (err, null);
            }else{
                bcrypt.compare(loginDetails.password, data.password, function(err, result) {
                    if(result){
                        const token = jwt.sign({
                            firstName: data.firstName,
                            lastName: data.lastName
                        }, "secretKey");
                        return callback (null, token)
                    }else{
                        return callback ('Invalid password', data);
                    }
                });
                
            }
        });
    }
}

module.exports = new userService();