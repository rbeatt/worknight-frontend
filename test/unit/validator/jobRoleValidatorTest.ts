import { expect } from 'chai'
import { validateJobRole } from '../../../validator/jobRoleValidator'
import { type CreateJobRoleRequest } from '../../../models/createJobRoleRequest'
describe('jobRoleValidator', function () {
  describe('validateJobRole', function () {
    it('should return null when no errors', () => {
      const job: CreateJobRoleRequest = {
        name: 'Mocha',
        specificationDesc: 'Chai',
        url: 'test@email.com',
        bandId: 2,
        capabilityId: 1
      }

      expect(validateJobRole(job)).to.equal('')
    })
    it('should return error when name is inaccurate length', () => {
      const job: CreateJobRoleRequest = {
        name: 'Mocha'.repeat(50),
        specificationDesc: 'Chai',
        url: 'test@email.com',
        bandId: 2,
        capabilityId: 1
      }

      expect(validateJobRole(job)).to.equal('Job Role Name must be less than 50')
    })
    it('should return error when description is too long', () => {
      const job: CreateJobRoleRequest = {
        name: 'Mocha',
        specificationDesc: 'Chai'.repeat(1000),
        url: 'test@email.com',
        bandId: 2,
        capabilityId: 1
      }

      expect(validateJobRole(job)).to.equal('Job Role Specification must be less than 600')
    })
    it('should return error when name is 0', () => {
      const job: CreateJobRoleRequest = {
        name: '',
        specificationDesc: '',
        url: 'test@email.com',
        bandId: 2,
        capabilityId: 1
      }

      expect(validateJobRole(job)).to.equal('Job Role Name must be greater than 0')
    })
    it('should return error when description is 0', () => {
      const job: CreateJobRoleRequest = {
        name: 'Mocha',
        specificationDesc: 'Chai'.repeat(1000),
        url: 'test@email.com',
        bandId: 2,
        capabilityId: 1
      }

      expect(validateJobRole(job)).to.equal('Job Role Specification must be greater than 0')
    })
  })
})
