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
  
}
module.exports = new LabelModel();