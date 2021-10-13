const { logger } = require('../../logger/logger.js');
const noteService = require('../service/note.service')

class NoteController{
  createNote = (req, res) => {
    try{
        const note = {
            id: req.user.id,
            title: req.body.title,
            description: req.body.description
        }
        noteService.createNote(note)
          .then((data) => {
            logger.info("Note created successfully")
            return res.status(201).json({
              message: "Note created successfully with id:",
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
      const data = await noteService.getNoteById(ids)
      if (data.name) {
        logger.error("Incorrect noteID")
        return res.status(400).json({
          message: "Incorrect noteId",
          success: false
        });
      } else {
        logger.info("Note fetched successfully")
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

  updateNoteById = async (req, res)=>{
    try{
      const note ={
        noteId: req.params.noteId,
        id: req.user.id,
        title: req.body.title,
        description: req.body.description
      }
      console.log(note)
      const data = await noteService.updateNoteById(note)
      console.log(data.name)
      if (data.name){
        logger.error("Note not updated")
        return res.status(400).json({
          message: "Note not updated",
          success: false
        });
      }else{
        logger.info("Note updated successfully")
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
      noteService.deleteNoteById(ids, (error, data) => {
        if(error){
          logger.error(error)
          return res.status(400).json({
            message: error,
            success: false
          })
        }else{
          logger.info("Note deleted successfully")
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
}

module.exports = new NoteController();