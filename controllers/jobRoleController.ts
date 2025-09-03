import { type Request, type Response } from 'express'
import { getJobRoles, addJobRole, editJobRole, getJobRolesById } from '../src/services/jobRoleService'
import { getBanding } from '../services/bandingService'
import { getCapabilities } from '../services/capabilityService'
import { type JobRolesResponse } from '../models/jobRole'
import { type CapabilityResponse } from '../models/capabilityResponse'
import { type BandingResponse } from '../models/bandingResponse'
import { validateJobRole } from '../validator/jobRoleValidator'
import { type CreateJobRoleRequest } from '../models/createJobRoleRequest'
import { type EditJobRoleRequest } from '../models/jobRolePostEdit'

export const getJobRolesResponse = async (req: Request, res: Response): Promise<void> => {
  let data: JobRolesResponse[]

  try {
    data = await getJobRoles()
  } catch (e) {
    data = []
    console.error(e)
  }
  let selectedRole: JobRolesResponse | null = null

  data.forEach((role) => {
    if (role.name === req.query.showSpec) {
      selectedRole = role
    }
  })
  res.render('job-roles', {
    roles: data,
    selectedRole
  })
}

export const showAddNewJobRolePage = async (req: Request, res: Response): Promise<void> => {
  let capabilities: CapabilityResponse[]
  let bands: BandingResponse[]
  try {
    capabilities = await getCapabilities()
    bands = await getBanding()
  } catch (e) {
    capabilities = []
    bands = []
    console.error(e)
  }

  res.render('add-new-job-roles', {
    capability: capabilities,
    band: bands
  })
}

export const postJobRole = async (req: Request, res: Response): Promise<void> => {
  const error = validateJobRole(req.body)
  const data: CreateJobRoleRequest = req.body
  if (error !== '') {
    const capabilities = await getCapabilities()
    const bands = await getBanding()
    res.locals.errormessage = error
    res.render('add-new-job-roles', {
      capability: capabilities,
      band: bands,
      form: req.body
    })
  }
  try {
    await addJobRole(data)
    res.redirect('/job-roles')
  } catch (e) {
    console.error(e)
  }
}
export const showEditJobRolePage = async (req: Request, res: Response): Promise<void> => {
  let capabilities: CapabilityResponse[]
  let bands: BandingResponse[]
  let jobrole: JobRolesResponse | null = null
  const jobId = req.query.id as string
  try {
    capabilities = await getCapabilities()
    bands = await getBanding()
    jobrole = await getJobRolesById(jobId)
  } catch (e) {
    capabilities = []
    bands = []
    console.error(e)
  }

  res.render('edit-job-role', {
    capability: capabilities,
    band: bands,
    role: jobrole
  })
}
export const postEditJobRole = async (req: Request, res: Response): Promise<void> => {
  const error = validateJobRole(req.body)
  const data: EditJobRoleRequest = req.body
  const jobId = req.body.id
  if (error !== '') {
    const capabilities = await getCapabilities()
    const bands = await getBanding()
    const jobrole = await getJobRolesById(jobId)
    res.locals.errormessage = error
    res.render('edit-job-role', {
      capability: capabilities,
      band: bands,
      role: jobrole
    })
  }

  try {
    await editJobRole(data)
    res.redirect('/job-roles')
  } catch (e) {
    console.error(e)
  }
}
