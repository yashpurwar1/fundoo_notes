/**
 * @module:         service
 * @file:           label.service.js
 * @description:    callbacks from the model and takes input from controller
 * @author:         Yash
 */

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

  updateLabelById = async (note) => {
    try{
      return await labelModel.updateLabelById(note)
    }
    catch(error){
      return error;
    }
  }

  deleteLabelById = (ids, callback) => {
    labelModel.deleteLabelById(ids, (error, data)=>{
      if (error){
        return callback(error, null);
      }else{
        return callback(null, data)
      }
    })
  }

  async addNoteId (ids) {
    try {
      return await labelModel.addNoteId(ids);
    } catch (err) {
      return err;
    }
  }
  async deleteLabel (ids) {
    try {
      return await labelModel.deleteLabel(ids);
    } catch (err) {
      return err;
    }
  }
}
module.exports = new LabelService();