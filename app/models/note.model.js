const userModel = require('../models/user.model')
const mongoose = require('mongoose')
const noteSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  labels: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'labels' }],
    unique: true
  },
  collaborator: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'labels' }],
    unique: true
  },
  title: {
    type: String
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  }
},
{
    timestamps: true
});

const Notes = mongoose.model('Notes', noteSchema);
class NoteModel {
  createNote = (note) => {
    return new Promise((resolve, reject) =>{
      const noteInfo = new Notes({
        userId: note.id,
        title: note.title,
        description: note.description
      });
      noteInfo.save()
        .then((data) =>{
          resolve(data)
        })
        .catch(() => {
          reject()
        })
    })
  }

  getNote = (id) => {
    return new Promise((resolve, reject) =>{
      Notes.find({ userId: id.id })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject("Incorrect note Id")
        })
    })
  }

  getNoteById = async (ids) => {
    try{
      return await Notes.find({ userId: ids.id, _id: ids.noteId })
    }
    catch(error){
      return error;
    }
  }
  
  updateNoteById = async (note) => {
    const filter = {userId: note.id, _id: note.noteId};
    const update = {title: note.title, description: note.description};
    try{
      return await Notes.findOneAndUpdate(filter, update, {new: true})
    }
    catch(error){
      return error;
    }
  }

  deleteNoteById = (ids, callback)=>{
    const filter = {userId: ids.id, _id: ids.noteId};
    Notes.findOneAndDelete(filter, (error, data) =>{
      if(error){
        return callback("Not able to find the note", null)
      }else{
        return callback(null, data);
      }
    })
  }

  addLabelById = async (ids) => {
    try{
      return await Notes.findByIdAndUpdate(ids.noteId, { $push: { labels: ids.labelId } }, {new: true})
    }
    catch(error){
      return error;
    }
  }

  deleteLabel = async (ids) => {
    try {
      return await Notes.findByIdAndUpdate(ids.noteId, { $pull: { labels: ids.labelId } }, { new: true });
    }
    catch (error) {
      return error;
    }
  }

  noteCollaborator(data, callback) {
    try {
      const email= {
        email: data.collabEmail
      }
      userModel.findEmail(email, (err, userData) => {
        if(userData){
          Notes.findOne({_id: data.noteId}, (err, note)=>{
            const collab = note.collaborator;
            for(let i=0; i<collab.length; i++){
              if(collab[i] == userData.id){
                return callback("User already collabrated", null)
              }
            }
            });
          Notes.findByIdAndUpdate(data.noteId, { $push: { collaborator: userData.id } }, { new: true } ,(err, updatedData)=>{
            if (updatedData){
              return callback(null, updatedData);
            }
            else{
              return callback("Not able to update", null)
            }
          });
        }else{
          return callback("Collab user not registered", null)
        }
      });
    } catch (error) {
      return error;
    }
  }
}
module.exports = new NoteModel();