const Jobs = require('../models/Job')
const statusCodes = require('http-status-codes')
const { NotFoundError, UnauthenticatedError, BadRequestError } = require('../errors')

const getAllJobs = async(req,res)=>{
    const jobs = await Jobs.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(statusCodes.OK).json({jobs, count:jobs.length})
}

const getJob = async(req,res)=>{
    const {user:{userId}, params:{id:jobId}} = req

    const job = await Jobs.findOne({_id:jobId, createdBy:userId})
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    console.log(req.user.params)
    res.status(statusCodes.OK).json({ job })
};

const createJob = async(req,res)=>{
    req.body.createdBy = req.user.userId
    const name = req.user.name

    const newJob = await Jobs.create(req.body)

    res.status(statusCodes.CREATED).json({job:{newJob}, name})
}

const updateJob = async(req,res)=>{
    res.send('update job')
}

const deleteJob = async(req,res)=>{
    res.send('delete job')
}

module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob}