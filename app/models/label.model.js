/**
 * @module:         models
 * @file:           label.model.js
 * @description:    label.model is for label schema and operations on database
 * @author:         Yash
 */
const mongoose = require('mongoose')
// scheme for the database
const labelSchema = mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  labelName: {
      type: String
  },
  noteId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'notes' }]
  },
},
{
    timestamps: true
});

const Label = mongoose.model('Labels', labelSchema);
class LabelModel {
  // Creates a label with respect to the logged in user
  createLabel = (label) => {
    return new Promise((resolve, reject) =>{
      const labelInfo = new Label({
        userId: label.id,
        labelName: label.labelName
      });
      //Saves the label in the database 
      labelInfo.save()
        .then((data) =>{
          resolve(data)
        })
        .catch(() => {
          reject()
        })
    })
  }

  //gets all the label for a particular user 
  getLabel = (id) => {
    return new Promise((resolve, reject) =>{
      //finds label by userId in the database 
      Label.find({ userId: id.id })
        .then((data) => {
          resolve(data)
        })
        .catch(() => {
          reject("Incorrect note Id")
        })
    })
  }

  //gets a label for user by the label id 
  getLabelById = async (ids) => {
    try{
      // finds the label in the databse
      return await Label.find({ userId: ids.id, _id: ids.labelId })
    }
    catch(error){
      return error;
    }
  }

  //updates the name of the label in the database
  updateLabelById = async (label) => {
    const filter = {userId: label.id, _id: label.labelId};
    const update = {labelName: label.labelName};
    try{
      //finds the label by the id the databse and updates its name
      return await Label.findOneAndUpdate(filter, update, {new: true})
    }
    catch(error){
      return error;
    }
  }

  //deletes a label by the label id
  deleteLabelById = (ids, callback)=>{
    const filter = {userId: ids.id, _id: ids.labelId};
    //finds label by id and deletes it
    Label.findOneAndDelete(filter, (error, data) =>{
      if(error){
        return callback("Not able to find the label", null)
      }else{
        return callback(null, data);
      }
    })
  }

  //Adds note ID in the label
  async addNoteId (ids) {
    try {
      //finds label and pushes note id in the label database
      return await Label.findByIdAndUpdate(ids.labelId, { $push: { noteId: ids.noteId } }, {new: true})
    } catch (err) {
      return err;
    }
  }

  //deletes noteId in the label
  async deleteLabel (ids) {
    try {
      //finds a label and pulls noteid in lable database
      return await Label.findByIdAndUpdate(ids.labelId, { $pull: { noteId: ids.noteId } }, {new: true})
    } catch (err) {
      return err;
    }
  }
}
module.exports = new LabelModel();