const noteModel = require('../models/note.model');
class NoteService {
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

  getNoteById = async (ids) => {
    try{
      return await noteModel.getNoteById(ids)
    }
    catch(error){
      return error;
    }
  }

  updateNoteById = async (note) => {
    try{
      return await noteModel.updateNoteById(note)
    }
    catch(error){
      return error;
    }
  }

  deleteNoteById = (ids, callback) => {
    noteModel.deleteNoteById(ids, (error, data)=>{
      if (error){
        return callback(error, null);
      }else{
        return callback(null, data)
      }
    })
  }

  addLabelById = async (ids) => {
    try{
      return await noteModel.addLabelById(ids)
    }
    catch(error){
      return error;
    }
  }

  deleteLabel = async (ids) => {
    try {
      const data = await noteModel.deleteLabel(ids);
      return data;
    } catch (error) {
      return error;
    }
  }

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