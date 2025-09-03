import axios from 'axios'

import { getBanding } from '../../services/bandingService'
import MockAdapter from 'axios-mock-adapter'
import { type BandingResponse } from '../../models/bandingResponse'
import chai from 'chai'
import { getEnvironmentVariables } from '../../services/environmentConfigService'
const expect = chai.expect
const band: BandingResponse = {
  id: 1,
  bandLevel: 'Manager'
}
describe('BandingService', function () {
  const url: string = getEnvironmentVariables().API_URL + '/api/band'
  describe('getBanding', function () {
    it('should return Bands from response', async () => {
      const mock = new MockAdapter(axios)

      const data = [band]

      mock.onGet(url).reply(200, data)

      const results = await getBanding()

      expect(results[0]).to.deep.equal(band)
    })

    it('should throw exception when 500 error returned from axios', async () => {
      const mock = new MockAdapter(axios)

      mock.onGet(url).reply(500)

      try {
        await getBanding()
      } catch (error) {
        expect((error as Error).message).to.equal('Could not get Banding')
      }
    })
  })
})
