const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const {validateEmail} = require('../validators');

// model

const userSchema = new Schema({ 
    email: {
        type: String,
        required: [true,'Email jest wymagany'],
        lowercase: true,
        trim: true,
        unique: true,
        validate: [validateEmail,'Nieprawidłowy email'],
    },
    password: {
        type: String,
        required: [true,'Pole "hasło" jest wymagane'],
        minlength: [4, 'Hasło powinno posiadać minimum 4 znaki']
    },
});

// hash password
userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash;
    next();
})

// email duplicated verification
userSchema.post('save', (err, doc, next) => {
   if(err.code === '11000'){
       err.errors = {email: {message: 'Taki email jest już zajęty'}}
   }
   next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;