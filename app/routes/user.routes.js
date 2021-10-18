/**
 * @module:         routes
 * @file:           user.routes.js
 * @description:    API routes
 * @author:         Yash
 */

const helper = require('../utilities/helper')
const controller = require('../controllers/user.controller.js');
const noteController = require('../controllers/note.controller')
const labelController = require('../controllers/label.controller')
module.exports=(app) =>{  
    //Api route for user
    app.post('/register',controller.register);
    app.post('/login', controller.login);
    app.post('/forgotPassword', controller.forgotPassword);
    app.put('/resetPassword', helper.verifyToken ,controller.resetPassword);
    //Api route for notes 
    app.post('/createNote', helper.verifyToken, noteController.createNote);
    app.get('/getNote', helper.verifyToken, noteController.getNote);
    app.get('/getNoteById/:noteId', helper.verifyToken, noteController.getNoteById);
    app.put('/updateNoteByID/:noteId', helper.verifyToken, noteController.updateNoteById);
    app.delete('/deleteNoteById/:noteId', helper.verifyToken, noteController.deleteNoteById);
    //Api routes for label
    app.post('/createLabel', helper.verifyToken, labelController.createLabel);
    app.get('/getLabel', helper.verifyToken, labelController.getLabel);
    app.get('/getLabelById/:labelId', helper.verifyToken, labelController.getLabelById);
    app.put('/updateLabelByID/:labelId', helper.verifyToken, labelController.updateLabelById);
    app.delete('/deleteLabelById/:labelId', helper.verifyToken, labelController.deleteLabelById);

    app.post('/addlabel/:noteId/:labelId', helper.verifyToken, noteController.addLabelById);
    app.post('/deleteLabel/:noteId/:labelId', helper.verifyToken, noteController.deleteLabel);
}