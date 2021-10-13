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

  getNote = (id, callback) => {
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