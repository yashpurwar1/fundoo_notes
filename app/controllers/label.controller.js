/**
 * @module:         controllers
 * @file:           label.controller.js
 * @description:    Taking the request from the client and gives the response.
 * @author:         Yash
*/

const { logger } = require('../../logger/logger.js');
const labelService = require('../service/label.service');
const validation = require('../utilities/labelValidation');
const redis = require('../utilities/redis')
class labelController{
  /**
     * @description:    Creates label and sending response to service
     * @method:         creates the label for the user
     * @param:          req,res for service
     */
  createLabel = (req, res) => {
    try{
      const label = {
          id: req.user.id,
          labelName: req.body.labelName
      }
      const validate = validation.createValidate.validate(label);
      if (validate.error){
        logger.error(validate.error);
        return res.status(422).json({
            success: false,
            message: "validation failed", 
        })
      }
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

  /**
     * @description:    Fetches all the label for the current user and sending response to service
     * @method:         Fetches all th labels for the user
     * @param:          req,res for service
     */
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

    /**
     * @description:    Fetches label by id and sending response to service
     * @method:         Fetches label by id labels for the user
     * @param:          req,res for service
     */
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

    /**
     * @description:    Updates label by id and sending response to service
     * @method:         Updates label by the id for the user
     * @param:          req,res for service
     */
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

    /**
     * @description:    Deletes the entered label id and sending response to service
     * @method:         deletes the label id for the user
     * @param:          req,res for service
     */
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

    /**
     * @description:    Adds note id in the label id and sending response to service
     * @method:         addNoteId
     * @param:          req,res for service
     */
  addNoteId = async (ids) => {
    try {
      const data = await labelService.addNoteId(ids);
      return data;
    } catch (err) {
      return err;
    }
  }

  /**
     * @description:    Deletes note id in the label id and sending response to service
     * @method:         deleteNoteId
     * @param:          req,res for service
     */
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