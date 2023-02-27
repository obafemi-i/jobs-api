const User = require('../models/User')
const statusCodes = require('http-status-codes')
const UnauthenticatedError = require('../errors/unauthenticated')
const BadRequestError = require('../errors/bad-request')


const register = async(req,res)=>{
    const user = await User.create({...req.body})

    const token = user.createJWT()
    
    res.status(statusCodes.CREATED).json({ user:{name:user.name}, token })
}

const login = async(req,res)=>{
    const {password, email} = req.body
    if(!password || !email){
        throw new BadRequestError('Missing credentials')
    }

    const user = await User.findOne({email})

    if(!user){
        throw new UnauthenticatedError('No user with that email')
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        throw new UnauthenticatedError('Invalid credentials')
    }

    const token = user.createJWT()
    res.status(statusCodes.OK).json({user:{name:user.name}, token})
}

module.exports = {register, login}