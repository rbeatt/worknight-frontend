import axios from 'axios'
import { addJobRole, getJobRoles, editJobRole } from '../../src/services/jobRoleService'
import { type JobRolesResponse } from '../../models/jobRole'
import { type EditJobRoleRequest } from '../../models/jobRolePostEdit'
import MockAdapter from 'axios-mock-adapter'
import chai from 'chai'
import { type CreateJobRoleRequest } from '../../models/createJobRoleRequest'

const expect = chai.expect

const job: JobRolesResponse = {
  id: 1,
  name: 'Engineer',
  specificationDesc: 'Q/A testing and Software',
  url: 'hello',
  capability: 'Amazing',
  bandLevel: 'Amazing'
}
const job1: EditJobRoleRequest = {
  id: 25,
  name: 'Engineer',
  specificationDesc: 'Q/A testing and Software',
  url: 'hello',
  capabilityId: 1,
  bandId: 1
}
const jobR: CreateJobRoleRequest = {
  name: 'Engineer',
  specificationDesc: 'Q/A testing and Software',
  url: 'HEllo',
  capabilityId: 1,
  bandId: 1
}

describe('JobRoleService', function () {
  const baseURl: string = 'http://localhost:8080'
  const url: string = baseURl + '/api/job-roles'
  const url1: string = baseURl + '/api/job-roles/'
  describe('getJobRoles', function () {
    it('should return Job Roles from response', async () => {
      const mock = new MockAdapter(axios)
      const data = [job]

      mock.onGet(url).reply(200, data)

      const results = await getJobRoles()

      expect(results[0]).to.deep.equal(job)
    })

    it('should throw exception when 500 error returned from axios', async () => {
      const mock = new MockAdapter(axios)

      mock.onGet(url).reply(500)

      try {
        await getJobRoles()
      } catch (error) {
        expect((error as Error).message).to.equal('Could not get Job Roles')
      }
    })
  })
  describe('addJobRole', function () {
    it('should return Job Role Being added from response', async () => {
      const mock = new MockAdapter(axios)

      const data = [jobR]

      mock.onPost(url).reply(201, data)

      const results = await addJobRole(jobR)
      expect(results).to.deep.equal(data)
    })

    it('should throw exception when 500 error returned from axios', async () => {
      const mock = new MockAdapter(axios)

      mock.onPost(url).reply(500)

      try {
        await addJobRole(jobR)
      } catch (error) {
        expect((error as Error).message).to.equal('Could not add Job Role')
      }
    })
  })
  describe('editJobRole', function () {
    it('should return Job Role Being added from response', async () => {
      const mock = new MockAdapter(axios)

      const data = [job1]
      mock.onPut(url1 + job1.id.toString()).reply(200, data)
      const results = await editJobRole(job1)
      console.log(results)
      expect(results).to.deep.equal(data)
    })

    it('should throw exception when 500 error returned from axios', async () => {
      const mock = new MockAdapter(axios)
      mock.onPut(url1 + job1.id.toString()).reply(500)

      try {
        await editJobRole(job1)
      } catch (error) {
        expect((error as Error).message).to.equal('Could not edit Job Role')
      }
    })
  })
})
