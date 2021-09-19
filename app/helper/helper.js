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
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //     bcrypt.hash(newUser.password, salt, function(err, hash) {
    //         // Store hash in your password DB.
    //         newUser.password=hash;
    //         newUser.save();
    //         return callback(null, newUser);
    //     });
    // })