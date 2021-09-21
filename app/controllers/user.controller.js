const userService = require('../service/user.service.js')
const utility = require('../utilities/utility.js')
class Controller {
    register = (req, res) => {
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };
            const registerValidation = utility.registerValidation.validate(user);
            if (registerValidation.error){
                return res.status(409).json({
                    success: false,
                    message: "validation failed", 
                })
            }

            userService.registerUser(user, (error, data) => {
                if (error) {
                    return res.status(409).json({
                        success: false,
                        message: error,
                    });
                } else{
                    return res.status(201).json({
                        success: true, 
                        message: "User Registered",
                        data: data,
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false, message: "Error While Registering",
                data: null,
            });
        }
    }

    login = (req, res) => {
        try{
            const loginDetails = {
                email: req.body.email,
                password: req.body.password
            };
            const loginValidation = utility.loginValidation.validate(loginDetails);
            if (loginValidation.error){
                return res.status(409).json({
                    success: false,
                    message: "validation failed", 
                })
            }
            userService.loginUser(loginDetails, (error, token) => {
                if (error){
                    return res.status(401).json({
                        message: error,
                        status: false,
                    })
                }
                else {
                    return res.status(200).json({
                        message: 'Login Success',
                        status: true,
                        token: token
                        
                    });
                }
            });
        }
        catch(error) {
            return res.status(500).json({
                message: "Error while login",
                status: false,
                data: null
            });
        }

    }
}
module.exports = new Controller();