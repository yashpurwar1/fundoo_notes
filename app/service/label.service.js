const labelModel = require('../models/label.model');
class LabelService {
  createNote = (label) => {
    return new Promise((resolve, reject) => {
      labelModel.createLabel(label)
        .then((data) => {
          resolve(data)
        })
        .catch(() => {
          reject()
        })
    })
  }
  getLabel = (id) => {
    return new Promise((resolve, reject) => {
      labelModel.getLabel(id)
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  getLabelById = async (ids) => {
    try{
      return await labelModel.getLabelById(ids)
    }
    catch(error){
      return error;
    }
  }
}
module.exports = new LabelService();