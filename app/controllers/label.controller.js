const { logger } = require('../../logger/logger.js');
const labelService = require('../service/label.service');
const validation = require('../utilities/labelValidation');
const redis = require('../utilities/redis')
class labelController{
  createLabel = (req, res) => {
    try{
      const label = {
          id: req.user.id,
          labelName: req.body.labelName
      }
      console.log(label)
      const validate = validation.createValidate.validate(label);
      console.log(validate)
      if (validate.error){
        logger.error(validate.error);
        return res.status(422).json({
            success: false,
            message: "validation failed", 
        })
      }
      console.log("after validation")
      labelService.createNote(label)
        .then((data) => {
          logger.info("Label created successfully")
          return res.status(201).json({
            message: "Label created successfully",
            data: data,
            success: true
          })
        })
        .catch(()=>{
          logger.error("Label not saved in database")
          return res.status(400).json({
            message: "Label not saved in database",
            success: false
          })
        })
    }
    catch(error){
      logger.error(error)
      return res.status(500).json({
          message: "Internal server error",
          success: false
      })
    }
  }

  getLabel = (req, res) => {
    try {
      const id = { id: req.user.id };
      labelService.getLabel(id)
        .then((data) => {
          logger.info("Data fetched successfully")
          return res.status(200).json({
            message: 'Fetched successfully',
            success: true,
            data: data
          });
        })
        .catch((error) => {
          logger.error(error)
          return res.status(400).json({
            message: error,
            success: false
          });
        })
    } 
    catch {
      logger.error(error)
      return res.status(500).json({
        message: 'Internal server Error'
      });
    }
  }

  getLabelById = async (req, res) => {
    try{
      const ids = {
        id: req.user.id,
        labelId: req.params.labelId
      }
      const data = await labelService.getLabelById(ids)
      if (data.name || data.length<=0) {
        logger.error("Incorrect LabelID")
        return res.status(400).json({
          message: "Incorrect LabelId",
          success: false
        });
      } else {
        logger.info("Label fetched successfully")
        redis.setCache(ids.labelId, 600, JSON.stringify(data));
        return res.status(200).json({
          message: 'Fetched successfully',
          success: true,
          data: data
        });
      }
    }
    catch(error){
      logger.error(error)
      return res.status(500).json({
        message: 'Internal server Error'
      });
    }
  }

  updateLabelById = async (req, res)=>{
    try{
      const label ={
        labelId: req.params.labelId,
        id: req.user.id,
        labelName: req.body.labelName
      }
      const validate = validation.updateValidate.validate(label);
      if (validate.error){
        logger.error(validate.error);
        return res.status(422).json({
            success: false,
            message: "validation failed", 
        })
      }
      const data = await labelService.updateLabelById(label)
      if (data.name){
        logger.error("Label not updated")
        return res.status(400).json({
          message: "Label not updated",
          success: false
        });
      }else{
        logger.info("Label updated successfully")
        redis.clearCache(label.labelId)
        return res.status(200).json({
          message: 'Updated successfully',
          success: true,
          data: data
        });
      }
    }
    catch(error){
      logger.error(error)
      return res.status(500).json({
        message: 'Internal server Error'
      });
    }
  }

  deleteLabelById = (req, res) => {
    try{
      const ids = {
        labelId: req.params.labelId,
        id: req.user.id
      }
      labelService.deleteLabelById(ids, (error, data) => {
        if(error){
          logger.error(error)
          return res.status(400).json({
            message: error,
            success: false
          })
        }else if (data == null){
          logger.error(error)
          return res.status(400).json({
            message: "Incorrect labelId or already deleted",
            success: false
          })
        }else{
          logger.info("Label deleted successfully")
          redis.clearCache(ids.labelId)
          return res.status(204).json({
            message: "Label Deleted successfully",
            data: data,
            success: true
          })
        }
      })
    }
    catch(error){
      logger.error(error)
      return res.status(500).json({
        message: "Internal server error"
      });
    }
  }

  addNoteId = async (ids) => {
    try {
      const data = await labelService.addNoteId(ids);
      return data;
    } catch (err) {
      return err;
    }
  }
  deleteLabel = async (ids) => {
    try {
      const data = await labelService.deleteLabel(ids);
      return data;
    } catch (err) {
      return err;
    }
  }
}
module.exports = new labelController();