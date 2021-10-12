const mongoose = require('mongoose')
const noteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
  createNote = (note, callback) => {
    const noteInfo = new Notes({
      userId: note.id,
      title: note.title,
      description: note.description
    });
    noteInfo.save((error, data) => {
      if (error) {
        return callback("Note not saved in database", null);
      } else {
        return callback(null, data);
      }
    });
  }

  getNote = (id, callback) => {
    Notes.find({ userId: id.id }, (error, data) => {
      if(error){
        return callback("Incorrect note Id", null);
      }
      else{
        return callback(null, data);
      }
    })
  }

  getNoteById = (ids, callback) => {
    Notes.find({ userId: ids.id, _id: ids.noteId }, (error, data) => {
      if(error){
        return callback("Not able to fetch notes", null);
      }
      else{
        return callback(null, data);
      }
    })
  }
  
  updateNoteById = (note, callback) => {
    const filter = {userId: note.id, _id: note.noteId};
    const update = {title: note.title, description: note.description};

    Notes.findOneAndUpdate(filter, update, {new: true},(error, data) => {
        if(error){
          return callback("Not able to update", null);
        }
        else{
          console.log("in model", data)
          return callback(null, data);
        }
    })
  }

  deleteNoteById = (ids, callback)=>{
    const filter = {userId: ids.id, _id: ids.noteId};
    Notes.findOneAndDelete(filter, (error, data) =>{
      if(error){
        return callback("Not able to find the note", null)
      }else{
        console.log(data)
        return callback(null, data);
      }
    })
  }

}
module.exports = new NoteModel();