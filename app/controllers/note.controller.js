const noteService = require('../service/note.service')

class NoteController{
  createNote = (req, res) => {
      try{
          const note = {
              id: req.user.id,
              title: req.body.title,
              description: req.body.description
          }
          noteService.createNote(note, (error, data) => {
              if(error){
                  return res.status(400).json({
                      message: error,
                      success: false
                  })
              }else{
                  return res.status(200).json({
                      message: "Note created successfully",
                      data: data,
                      success: true
                  })
              }
          })
      }
      catch(error){
          return res.status(400).json({
              message: "Internal server error",
              success: false
          })
      }
  }

  getNote = (req, res) => {
    try {
      const id = { id: req.user.id };
      noteService.getNote(id, (error, data) => {
        if (error) {
          return res.status(400).json({
            message: error,
            success: false
          });
        } else {
          return res.status(201).json({
            message: 'Fetched successfully',
            success: true,
            data: data
          });
        }
      });
    } 
    catch {
      return res.status(500).json({
        message: 'Internal server Error'
      });
    }
  }
}

module.exports = new NoteController();