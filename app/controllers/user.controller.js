/**
 * @module:         controllers
 * @file:           user.controller.js
 * @description:    Taking the request from the client and gives the response.
 * @author:         Yash
*/

const userService = require('../service/user.service.js')
const validation = require('../utilities/validation.js')
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
                success: false, message: "Error While Registering",
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
}
module.exports = new Controller();