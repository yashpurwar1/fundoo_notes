const jwt = require('jsonwebtoken');
require("dotenv").config();
class secure{
    token = (data, callback) => {
        const key = jwt.sign({
        firstName: data.firstName,
        lastName: data.lastName
        }, process.env.SECRET_KEY);
        if (key){
            return callback(null, key);    
        }else{
            return callback(err, null);
        }
        
    }
}
module.exports=new secure();

// const token = jwt.sign({
//     firstName: data.firstName,
//     lastName: data.lastName
// }, "secretKey");