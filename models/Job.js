const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, 'Please provide a company'],
        maxlength:40
    },
    position:{
        type:String,
        required:[true, 'Please provide a company'],
        maxlength:20
    },
    status:{
        type:String,
        enum:['interview', 'pending', 'decline'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    }
},{timestamps:true})

module.exports = mongoose.model('Job', jobSchema)