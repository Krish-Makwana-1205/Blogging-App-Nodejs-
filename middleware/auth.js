const { validate } = require("../models/user");

function authcook(cookiename){
    return(req, res, next)=>{
        const tokenval = req.cookies[cookiename]
        if(!tokenval){
            next();
        }
        try{
            const payload = validate(tokenval);
            req.user = payload;
        }catch(error){
            
        }
        next();
    }
}

module.exports = {
    authcook
}