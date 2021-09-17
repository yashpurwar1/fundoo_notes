const userModel = require('../models/user.model.js')
class userService {
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                //console.log(data.firstName);
                return callback(null, data);
            }
        });
    };

    loginUser = (loginDetails, callback) => {
        userModel.loginUser(loginDetails, (err, data) => {
            if(err){
                return callback (err, null);
            }else{
                if(data.password == loginDetails.password){
                    return callback (null, data)
                }else{
                    return callback ('Invalid password', data);
                }
            }
        });
    }
}

module.exports = new userService();