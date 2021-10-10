/**
 * @module:         controllers
 * @file:           user.controller.js
 * @description:    Taking the request from the client and gives the response.
 * @author:         Yash
*/

const userService = require('../service/user.service.js')
const validation = require('../utilities/validation.js')
const nodemailer = require('../utilities/nodemailer')
const { logger } = require('../../logger/logger.js');

class Controller {

    /**
     * @description:    Create and save user and sending response to service
     * @method:         register to save the user
     * @param:          req,res for service
     */

    register = (req, res) => {
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };
            const registerValidation = validation.registerValidation.validate(user);
            if (registerValidation.error){
                logger.error(registerValidation.error);
                return res.status(401).json({
                    success: false,
                    message: "validation failed", 
                })
            }

            userService.registerUser(user, (error, data) => {
                if (error) {
                    logger.error(error);
                    return res.status(409).json({
                        success: false,
                        message: error,
                    });
                } else{
                    logger.info("User Registered")
                    return res.status(201).json({
                        success: true, 
                        message: "User Registered",
                        data: data,
                    });
                }
            });
        } catch (error) {
            logger.error("Error while registering")
            return res.status(500).json({
                success: false,
                message: "Error While Registering",
                data: null,
            });
        }
    }

    /**
     * @description:    retrieving login info from user by email and password
     * @method:         login
     * @param:          req,res for service
     */

    login = (req, res) => {
        try{
            const loginDetails = {
                email: req.body.email,
                password: req.body.password
            };
            const loginValidation = validation.loginValidation.validate(loginDetails);
            if (loginValidation.error){
                logger.error(loginValidation.error);
                return res.status(401).json({
                    success: false,
                    message: "validation failed", 
                })
            }
            userService.loginUser(loginDetails, (error, token) => {
                if (error){
                    logger.error(error)
                    return res.status(401).json({
                        message: error,
                        status: false,
                    })
                }
                else {
                    logger.info("Login Success");
                    return res.status(201).json({
                        message: 'Login Success',
                        status: true,
                        token: token
                        
                    });
                }
            });
        }
        catch(error) {
            logger.error("Error while login")
            return res.status(500).json({
                message: "Error while login",
                status: false,
                data: null
            });
        }

    }

    forgotPassword = (req, res) => {
        try{
            const user = {
                email: req.body.email
            }
            userService.forgotPassword(user, (error, data) => {
                if (error){
                    logger.error(error)
                    return res.status(400).json({
                        message: error,
                        status: false,
                    })
                }
                else {
                    const forgotMessage = {
                        email: user.email,
                        subject: 'Forgot Password Link',
                        html:` 
                           <h2>Please copy the following token and use to reset password</h2>
                           <p>${process.env.RESET_URL}/resetPassword/${data}</p>
                         `
                    }
                    nodemailer.sendEmail(forgotMessage);
                    logger.info("Mail Sent Successful");
                    return res.status(201).json({
                        message: "Mail Sent Successful",
                        status: true
                    });
                }
            });
        }
        catch(error) {
            logger.error(error)
            return res.status(500).json({
                message: "Error while finding email",
                status: false,
                data: null
            });
        }

    }

    resetPassword = (req, res) => {
        try{
            const user = {
                email: req.user.email,
                newPassword: req.body.newPassword
            }
            userService.resetPassword(user, (error, data) => {
                if(error){
                    logger.error(error)
                    return res.status(400).json({
                        message: error,
                        status: false
                    })
                }
                logger.info("Password updated")
                return res.status(201).json({
                    message: data,
                    status: true
                })

            })
        }
        catch(error){
            logger.error(error)
            return res.status(400).json({
                message: "Error while sending request in controller",
                status: false
            })
        }
    }
}
module.exports = new Controller();