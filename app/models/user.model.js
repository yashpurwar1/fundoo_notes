/**
 * @module:         models
 * @file:           user.model.js
 * @description:    user.model is for user schema and for hash of the password
 * @author:         Yash
 */

const mongoose = require('mongoose');
const helper = require('../utilities/helper.js');
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

    /**
     * @description:    Login user from the database
     * @param:          loginData 
     * @param:          callback for service
     */

    loginUser = (loginData, callBack) => {
        user.findOne({ email: loginData.email }, (error, data) => {
            if (data) {
                return callBack(null, data);           
            } else{
                return callBack("Invalid email", null);
            }
        });
    }
}
module.exports = new userModel();