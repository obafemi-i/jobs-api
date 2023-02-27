const express = require('express')
const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs')
const routes = express.Router()

routes.get('/', getAllJobs)
routes.get('/:id', getJob)
routes.post('/', createJob)
routes.patch('/:id', updateJob)
routes.delete('/:id', deleteJob)

module.exports = routes