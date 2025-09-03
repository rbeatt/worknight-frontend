import { type EnvironmentConfig } from '../models/EnvironmentConfig'

export function getEnvironmentVariables (): EnvironmentConfig {
  // if api URL has a value, skip, else if not truthy, throw an error
  // console.log(process.env)
  if (process.env.API_URL === null || process.env.API_URL === undefined) {
    throw new Error('Api URL not defined!')
  }
  return {
    API_URL: process.env.API_URL
  }
}
