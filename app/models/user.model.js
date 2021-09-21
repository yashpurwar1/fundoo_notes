const mongoose = require('mongoose');
const helper = require('../helper/helper.js');
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

        helper.hash(newUser.password, (err, hash) => {
            if (hash) {
            newUser.password = hash;
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