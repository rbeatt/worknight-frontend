import axios from 'axios'
import { type CapabilityResponse } from '../models/capabilityResponse'
import { getEnvironmentVariables } from './environmentConfigService'
export const getCapabilities = async function (): Promise<CapabilityResponse[]> {
  try {
    // Add API Endpoint
    const response = await axios.get(getEnvironmentVariables().API_URL + '/api/capability')
    return response.data
  } catch (e) {
    throw new Error('Could not get Capability')
  }
}
