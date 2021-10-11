/**
 * @module:         routes
 * @file:           user.routes.js
 * @description:    API routes
 * @author:         Yash
 */

const helper = require('../utilities/helper')
const controller = require('../controllers/user.controller.js');
const noteController = require('../controllers/note.controller')
module.exports=(app) =>{  
    app.post('/register',controller.register);
    app.post('/login', controller.login);
    app.post('/forgotPassword', controller.forgotPassword);
    app.put('/resetPassword', helper.verifyToken ,controller.resetPassword);
    app.post('/createNote', helper.verifyToken, noteController.createNote);
}