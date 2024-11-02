const { Schema, model } = require('mongoose');
const {createHmac, randomBytes} = require('node:crypto');
const { create_token } = require('../services/authentication');


const userSchema = new Schema({
    fullname: ({
        type: String,
        required: true,
    }),
    email: ({
        type: String,
        required: true,
        unique: true
    }),
    salt: ({
        type: String,
    }),
    password: ({
        type: String,
        required: true,
    }),
    profileImageURL: ({
        type: String,
        default: '/public/wallpaper.png',
    }),
    role: ({
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    })

},
    { timestamps: true }
);

userSchema.pre('save', function (next){
    const user = this;

    if(!user.isModified("password")){
        return;
    }

    const salt = randomBytes(8).toString();
    const hashy = createHmac("sha256", salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashy;
    next();
});

userSchema.static('matchpassword', async function(email, password){
    const user = await this.findOne({email:email});
    console.log(user);
    if(!user){
        throw new Error("User does not exist");
    }
    const salt = user.salt;
    const hash = user.password;

    const hashcheck = createHmac('sha256', salt).update(password).digest("hex");
    if(hashcheck !== hash)throw new Error("Incorrect password");

    const token = create_token(user);
    return token;
});

const user = model('user', userSchema);

module.exports = user;