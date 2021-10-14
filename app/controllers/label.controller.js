const { logger } = require('../../logger/logger.js');
const labelService = require('../service/label.service');
const validation = require('../utilities/labelValidation');

class labelController{
    createLabel = (req, res) => {
        try{
          const label = {
              id: req.user.id,
              labelName: req.body.labelName
          }
          console.log(label)
          const validate = validation.validate.validate(label);
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
}
module.exports = new labelController();