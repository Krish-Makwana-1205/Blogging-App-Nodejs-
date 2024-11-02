const jwt = require('jsonwebtoken');
const { create } = require('../models/user');

const secret = "dgfsdfyukyfll;;.ihgcfxfesJsdjfgHRED";

function create_token(user){
    const payload = {
        _id : user._id,
        email : user.email,
        proimgurl : user.proimgurl,
        role: user.role
    }
    const token = jwt.sign(payload, secret);
    return token;
}
function validate(token){
    const details = jwt.verify(token, secret)
}

module.exports  = {
    create_token,
    validate
}