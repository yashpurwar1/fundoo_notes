const mongoose = require('mongoose')
const labelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    labelName: {
        type: String
    }
},
{
    timestamps: true
});

const Label = mongoose.model('Labels', labelSchema);
class LabelModel {
  createLabel = (label) => {
    return new Promise((resolve, reject) =>{
      const labelInfo = new Label({
        userId: label.id,
        labelName: label.labelName
      });
      labelInfo.save()
        .then((data) =>{
          resolve(data)
        })
        .catch(() => {
          reject()
        })
    })
  }
  getLabel = (id) => {
    return new Promise((resolve, reject) =>{
      Label.find({ userId: id.id })
        .then((data) => {
          resolve(data)
        })
        .catch(() => {
          reject("Incorrect note Id")
        })
    })
  }

  getLabelById = async (ids) => {
    try{
      return await Label.find({ userId: ids.id, _id: ids.labelId })
    }
    catch(error){
      return error;
    }
  }

  updateLabelById = async (label) => {
    const filter = {userId: label.id, _id: label.labelId};
    const update = {labelName: label.labelName};
    try{
      return await Label.findOneAndUpdate(filter, update, {new: true})
    }
    catch(error){
      return error;
    }
  }
}
module.exports = new LabelModel();