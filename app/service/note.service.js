/**
 * @module:         service
 * @file:           note.service.js
 * @description:    callbacks from the model and takes input from controller
 * @author:         Yash
 */

const noteModel = require('../models/note.model');
class NoteService {
  /**
      * @description:    Send response to the controller
      * @method:         createNote
      * @param:          note
      */
  createNote = (note) => {
    return new Promise((resolve, reject) => {
      noteModel.createNote(note)
        .then((data) => {
          resolve(data)
        })
        .catch(() => {
          reject()
        })
    })
  }

  /**
      * @description:    Send response to the controller
      * @method:         getNote
      * @param:          ids
      */
  getNote = (id) => {
    return new Promise((resolve, reject) => {
      noteModel.getNote(id)
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
      * @description:    Send response to the controller
      * @method:         getNoteById
      * @param:          ids
      */
  getNoteById = async (ids) => {
    try{
      return await noteModel.getNoteById(ids)
    }
    catch(error){
      return error;
    }
  }

  /**
      * @description:    Send response to the controller
      * @method:         updateNoteById
      * @param:          note
      */
  updateNoteById = async (note) => {
    try{
      return await noteModel.updateNoteById(note)
    }
    catch(error){
      return error;
    }
  }

  /**
      * @description:    Send response to the controller
      * @method:         deleteNoteById
      * @param:          ids, callabck
      */
  deleteNoteById = (ids, callback) => {
    noteModel.deleteNoteById(ids, (error, data)=>{
      if (error){
        return callback(error, null);
      }else{
        return callback(null, data)
      }
    })
  }

  /**
      * @description:    Send response to the controller
      * @method:         addLabelById
      * @param:          ids
      */
  addLabelById = async (ids) => {
    try{
      return await noteModel.addLabelById(ids)
    }
    catch(error){
      return error;
    }
  }

  /**
      * @description:    Send response to the controller
      * @method:         deleteNoteById
      * @param:          ids
      */
  deleteLabel = async (ids) => {
    try {
      const data = await noteModel.deleteLabel(ids);
      return data;
    } catch (error) {
      return error;
    }
  }

  /**
      * @description:    Send response to the controller
      * @method:         noteCollaborator
      * @param:          data, callback
      */
  noteCollaborator = (data, callback)=> {
    try {
      noteModel.noteCollaborator(data, (err, updateData)=>{
        if(err){
          return callback(err, null)
        }else{
          return callback(null, updateData)
        }
      }) ;
    } catch (error) {
      return error;
    }
  }
}
module.exports = new NoteService();