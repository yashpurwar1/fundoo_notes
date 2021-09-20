const bcrypt = require('bcrypt');
const salt = 10;

class helper{
    hash = (password, callback) => {
        bcrypt.hash(password, salt, (err, hash) =>{
            if(err){
                throw err
            }else{
                return callback(null,hash)
            }
        })
    }
}

module.exports = new helper();
