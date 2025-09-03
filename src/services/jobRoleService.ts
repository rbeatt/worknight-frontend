import axios from 'axios'
import { type CreateJobRoleRequest } from '../../models/createJobRoleRequest'
import { type JobRolesResponse } from '../../models/jobRole'
import { type EditJobRoleRequest } from '../../models/jobRolePostEdit'
const apiURL: string = 'http://localhost:8080'

export const getJobRoles = async function (): Promise<JobRolesResponse[]> {
  try {
    // Add API Endpoint
    const response = await axios.get(apiURL + '/api/job-roles')

    return response.data
  } catch (e) {
    throw new Error('Could not get Job Roles')
  }
}
export const addJobRole = async function (job: CreateJobRoleRequest): Promise<CreateJobRoleRequest> {
  try {
    const response = await axios.post(apiURL + '/api/job-roles', job)

    return response.data
  } catch (e) {
    throw new Error('Could not add Job Role')
  }
}
export const editJobRole = async function (job: EditJobRoleRequest): Promise<EditJobRoleRequest> {
  try {
    const URL = apiURL + '/api/job-roles/'
    const response = await axios.put(URL + job.id.toString(), job)

    return response.data
  } catch (e) {
    throw new Error('Could not edit Job Role')
  }
}
export const getJobRolesById = async function (id: string): Promise<JobRolesResponse> {
  try {
    // Add API Endpoint
    const response = await axios.get(apiURL + '/api/job-roles/' + id)

    return response.data
  } catch (e) {
    console.log((e as Error).message)
    throw new Error('Could not get Job Roles')
  }
}
