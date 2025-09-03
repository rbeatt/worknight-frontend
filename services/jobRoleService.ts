import axios from 'axios'
import { type CreateJobRoleRequest } from '../models/createJobRoleRequest'
import { type JobRolesResponse } from '../models/jobRole'
import { getEnvironmentVariables } from './environmentConfigService'

export const getJobRoles = async function (): Promise<JobRolesResponse[]> {
  try {
    const response = await axios.get(getEnvironmentVariables().API_URL + '/api/job-roles')

    return response.data
  } catch (e) {
    throw new Error('Could not get Job Roles')
  }
}

export const addJobRole = async function (job: CreateJobRoleRequest): Promise<CreateJobRoleRequest> {
  try {
    const response = await axios.post(getEnvironmentVariables().API_URL + '/api/job-roles', job)
    return response.data
  } catch (e) {
    return new Error('Could not add Job Role')
  }
}
