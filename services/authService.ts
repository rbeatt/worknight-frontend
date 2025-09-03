import { type Login } from '../models/auth'
import axios, { type AxiosError } from 'axios'

const apiUrl: string = 'http://localhost:8080'

export const login = async (login: Login): Promise<string> => {
  try {
    const response = await axios.post(apiUrl + '/api/login', login)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 401) {
        throw new Error('Invalid credentials. Please check your email and password.')
      }
    }
    throw new Error('Could not login. Please try again later.')
  }
}
