import axios from 'axios'

import { getCapabilities } from '../../services/capabilityService'
import MockAdapter from 'axios-mock-adapter'
import chai from 'chai'
import { type CapabilityResponse } from '../../models/capabilityResponse'
import { getEnvironmentVariables } from '../../services/environmentConfigService'
const expect = chai.expect

const capability: CapabilityResponse = {
  id: 1,
  name: 'Engineering'
}
describe('CapabilityService', function () {
  const url: string = getEnvironmentVariables().API_URL + '/api/capability'
  describe('getCapability', function () {
    it('should return Capabilities from response', async () => {
      const mock = new MockAdapter(axios)

      const data = [capability]

      mock.onGet(url).reply(200, data)

      const results = await getCapabilities()
      expect(results[0]).to.deep.equal(capability)
    })

    it('should throw exception when 500 error returned from axios', async () => {
      const mock = new MockAdapter(axios)
      mock.onGet(url).reply(500)

      try {
        await getCapabilities()
      } catch (error) {
        expect((error as Error).message).to.equal('Could not get Capability')
      }
    })
  })
})
