import { type CreateJobRoleRequest } from '../models/createJobRoleRequest'

export const validateJobRole = function (job: CreateJobRoleRequest): string {
  const descriptionLength = job.specificationDesc?.length ?? 0
  const nameLength = job.name?.length ?? 0
  if (nameLength > 50) {
    return 'Job Role Name must be less than 50'
  }

  if (descriptionLength > 30000) {
    return 'Job Role Specification must be less than 600'
  }
  if (nameLength === 0) {
    return 'Job Role Name must be greater than 0'
  }

  if (descriptionLength === 0) {
    return 'Job Role Specification must be greater than 0'
  }
  return ''
}
