const noteModel = require('../models/note.model');
class NoteService {
  createNote = (note, callback) => {
    noteModel.createNote(note, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }

  getNote = (id, callback) => {
    noteModel.getNote(id, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }

  getNoteById = (ids, callback) => {
    noteModel.getNoteById(ids, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }

  updateNoteById = (note, callback) => {
    noteModel.updateNoteById(note, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
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

}
module.exports = new NoteService();