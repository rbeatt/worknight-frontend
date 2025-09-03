import axios from 'axios'
import { type BandingResponse } from '../models/bandingResponse'
import { getEnvironmentVariables } from './environmentConfigService'

export const getBanding = async function (): Promise<BandingResponse[]> {
  try {
    // Add API Endpoint
    const response = await axios.get(getEnvironmentVariables().API_URL + '/api/band')
    return response.data
  } catch (e) {
    throw new Error('Could not get Banding')
  }
}
