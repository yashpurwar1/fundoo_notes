const { logger } = require('../../logger/logger.js');
const noteService = require('../service/note.service');
const validation = require('../utilities/noteValidation');
const labelController = require('../controllers/label.controller')
const redis = require('../utilities/redis')

class NoteController{
  createNote = (req, res) => {
    try{
      const note = {
          id: req.user.id,
          title: req.body.title,
          description: req.body.description
      }
      const validate = validation.createValidate.validate(note);
      if (validate.error){
        logger.error(validate.error);
        return res.status(422).json({
            success: false,
            message: "validation failed", 
        })
      }
      noteService.createNote(note)
        .then((data) => {
          logger.info("Note created successfully")
          return res.status(201).json({
            message: "Note created successfully",
            data: data,
            success: true
          })
        })
        .catch(()=>{
          logger.error("Note not saved in database")
          return res.status(400).json({
            message: "Note not saved in database",
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

  getNote = (req, res) => {
    try {
      const id = { id: req.user.id };
      const validate = validation.getValidate.validate(id);
      if (validate.error){
        logger.error(validate.error);
        return res.status(422).json({
            success: false,
            message: "validation failed", 
        })
      }
      noteService.getNote(id)
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

  getNoteById = async (req, res) => {
    try{
      const ids = {
        id: req.user.id,
        noteId: req.params.noteId
      }
      const validate = validation.getNoteByIdValidate.validate(ids);
      if (validate.error){
        logger.error(validate.error);
        return res.status(422).json({
            success: false,
            message: "validation failed", 
        })
      }
      const data = await noteService.getNoteById(ids)
      if (data.name || data.length<=0) {
        logger.error("Incorrect noteID")
        return res.status(400).json({
          message: "Incorrect noteId",
          success: false
        });
      } else {
        logger.info("Note fetched successfully")
        redis.setCache(ids.noteId, 600, JSON.stringify(data));
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
        message: 'Internal server Error from note controller'
      });
    }
  }

  updateNoteById = async (req, res)=>{
    try{
      const note ={
        noteId: req.params.noteId,
        id: req.user.id,
        title: req.body.title,
        description: req.body.description
      }
      const validate = validation.updateValidate.validate(note);
      if (validate.error){
        logger.error(validate.error);
        return res.status(422).json({
            success: false,
            message: "validation failed", 
        })
      }
      const data = await noteService.updateNoteById(note)
      if (data.name){
        logger.error("Note not updated")
        return res.status(400).json({
          message: "Note not updated",
          success: false
        });
      }else{
        logger.info("Note updated successfully")
        redis.clearCache(note.noteId)
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

  deleteNoteById = (req, res) => {
    try{
      const ids = {
        noteId: req.params.noteId,
        id: req.user.id
      }
      const validate = validation.deleteValidate.validate(ids);
      if (validate.error){
        logger.error(validate.error);
        return res.status(422).json({
            success: false,
            message: "validation failed", 
        })
      }
      noteService.deleteNoteById(ids, (error, data) => {
        if(error){
          logger.error(error)
          return res.status(400).json({
            message: error,
            success: false
          })
        }else if (data == null){
          logger.error(error)
          return res.status(400).json({
            message: "Incorrect noteId or already deleted",
            success: false
          })
        }else{
          logger.info("Note deleted successfully")
          redis.clearCache(ids.noteId)
          return res.status(204).json({
            message: "Note Deleted successfully",
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

  addLabelById = async (req, res)=>{
    try{
      const ids ={
        noteId: req.params.noteId,
        id: req.user.id,
        labelId: req.params.labelId
      }
      console.log(ids)
      const data = await noteService.addLabelById(ids)
      const labelData = await labelController.addNoteId(ids)
      if (data.name || labelData.name){
        logger.error("Label not updated")
        return res.status(400).json({
          message: "Label not updated",
          success: false
        });
      }else{
        logger.info("Label updated successfully")
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

  deleteLabel = async (req, res) => {
    try {
      const ids = {
        labelId: req.params.labelId,
        noteId: req.params.noteId,
        userId: req.user.id
      };
      const data = await noteService.deleteLabel(ids);
      const labelData = await labelController.deleteLabel(ids)
      if(data.name || labelData.name){
        logger.error("Label not deleted")
        return res.status(400).json({
          message: "Label not deletes",
          success: false
        });
      }
      else{
        res.status(201).send({
          message: 'Label deleted',
          success: true
        });
      }
    } catch (error) {
      res.status(500).send({
        message: 'Internal server error',
        success: false,
        error: error
      });
    }
  }

  noteCollaborator = (req, res) => {
    try {
      const data = {
        noteId: req.params.noteId,
        userId: req.user.id,
        collabEmail: req.body.collabEmail
      };
      redis.clearCache(data.noteId)
      noteService.noteCollaborator(data, (err, data)=> {
        if(err){
          return res.status(400).json({
            message: err,
            status: false
          })
        }else{
          return res.status(200).json({
            message: data,
            status: true
          })
        }
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal error'
      });
    }
  }
}

module.exports = new NoteController();