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

const NoteRegister = mongoose.model('NoteRegister', noteSchema);
class NoteModel {
  createNote = (note, callback) => {
    const noteInfo = new NoteRegister({
      userId: note.id,
      title: note.title,
      description: note.description
    });
    noteInfo.save((error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }
}
module.exports = new NoteModel();