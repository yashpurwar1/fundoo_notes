const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
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
        required: true,
        minlength: 5
    }
},
    {
        timestamps: true
    })

const user = mongoose.model('user', userSchema);

class userModel {

    registerUser = (userDetails, callback) => {

        const newUser = new user({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password: userDetails.password,
        });
        try {
            user.findOne({ email: userDetails.email }, (err, data) => {
                if (data) {
                    return callback('User already exist', null)
                }
                else {
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        bcrypt.hash(newUser.password, salt, function(err, hash) {
                            // Store hash in your password DB.
                            newUser.password=hash;
                            newUser.save();
                            return callback(null, newUser);
                        });
                    });
                }
            })
        }
        catch (error) {
            return callback('Internal Error', null)
        }
    }

    loginUser = (loginData, callBack) => {
        user.findOne({ email: loginData.email }, (error, data) => {
            if (error) {
                return callBack(error, null);
            } else if (!data) {
                return callBack("Invalid email", null);
            } else
            {
                return callBack(null, data);
            }
        });
    }
}
module.exports = new userModel();