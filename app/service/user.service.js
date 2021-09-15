const userModel = require('../models/user.model.js')
class userService {
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                console.log(data.firstName);
                return callback(null, data);
            }
        });
    };
}

module.exports = new userService();