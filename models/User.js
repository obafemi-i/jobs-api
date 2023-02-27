const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({path:'.env'});


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'You need to enter a name'],
        minlength:5,
        maxlength:20
    },
    email:{
        type:String,
        required:[true,'You need to enter a name'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'P;ease provide a valid email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'You need to enter a name'],
        minlength:5,
        maxlength:20
    },
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id, name:this.name}, process.env.TOKEN, {expiresIn:'10d'})
}

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function(clientpassword){
    const match = await bcrypt.compare(clientpassword, this.password)
    return match
}
module.exports = mongoose.model('User', UserSchema)