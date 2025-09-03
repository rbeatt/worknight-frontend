/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Router } from 'express'
import { loginPost, loginGet } from '../controllers/authController'
import { postJobRole, getJobRolesResponse, showAddNewJobRolePage, showEditJobRolePage, postEditJobRole } from '../controllers/jobRoleController'

const router: Router = express.Router()

router.get('/job-roles', getJobRolesResponse)
router.get('/begin', loginGet)
router.post('/login', loginPost)
router.get('/add-new-job-roles', showAddNewJobRolePage)
router.post('/add-new-job-roles', postJobRole)
router.get('/edit-job-role', showEditJobRolePage)
router.post('/edit-job-role', postEditJobRole)

export { router }
