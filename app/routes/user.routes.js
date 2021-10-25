/**
 * @module:         routes
 * @file:           user.routes.js
 * @description:    API routes
 * @author:         Yash
 */

const helper = require('../utilities/helper')
const redis = require('../utilities/redis')
const controller = require('../controllers/user.controller.js');
const noteController = require('../controllers/note.controller')
const labelController = require('../controllers/label.controller')
const passport = require('passport');
require('../utilities/auth');
module.exports=(app) =>{  
    //Api route for user
    app.post('/register',controller.register);
    app.post('/login', controller.login);
    app.post('/forgotPassword', controller.forgotPassword);
    app.put('/resetPassword', helper.verifyToken ,controller.resetPassword);
    //Api route for notes 
    app.post('/createNote', helper.verifyToken, noteController.createNote);
    app.get('/getNote', helper.verifyToken, noteController.getNote);
    app.get('/getNoteById/:noteId', helper.verifyToken, redis.getNoteById, noteController.getNoteById);
    app.put('/updateNoteByID/:noteId', helper.verifyToken, noteController.updateNoteById);
    app.delete('/deleteNoteById/:noteId', helper.verifyToken, noteController.deleteNoteById);
    //Api routes for label
    app.post('/createLabel', helper.verifyToken, labelController.createLabel);
    app.get('/getLabel', helper.verifyToken, labelController.getLabel);
    app.get('/getLabelById/:labelId', helper.verifyToken, redis.getLabelById, labelController.getLabelById);
    app.put('/updateLabelByID/:labelId', helper.verifyToken, labelController.updateLabelById);
    app.delete('/deleteLabelById/:labelId', helper.verifyToken, labelController.deleteLabelById);
    // Api routes for add label and delete label
    app.post('/addLabel/:noteId/:labelId', helper.verifyToken, noteController.addLabelById);
    app.post('/deleteLabel/:noteId/:labelId', helper.verifyToken, noteController.deleteLabel);
    // Api route for note collaborater
    app.post('/notecollaborator/:noteId', helper.verifyToken, noteController.noteCollaborator);
    //Api for the google social login
    app.get('/failed', (req, res) => res.send('You Have Failed To Login...!!!'));
    app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), helper.tokenAuthentication, controller.socialLogin);
}