import { expect } from 'chai'
import sinon from 'sinon'
import axios from 'axios'
import { login } from '../../services/authService'

describe('AuthService', () => {
  describe('login', () => {
    it('should return token on successful login', async () => {
      const fakeLoginData = {
        email: 'user@kainos.com',
        password: 'user'
      }

      const axiosStub = sinon.stub(axios, 'post').resolves({
        data: 'token',
        status: 200
      })

      const token = await login(fakeLoginData)

      expect(token).to.equal('token')
      expect(axiosStub.calledOnce).to.equal(true)
      expect(axiosStub.getCall(0).args[0]).to.equal(
        'http://localhost:8080/api/login'
      ) // Check the URL
      expect(axiosStub.getCall(0).args[1]).to.deep.equal(fakeLoginData)

      axiosStub.restore()
    })

    it('should throw error on invalid credentials', async () => {
      const fakeLoginData = {
        email: 'test@kainos.com',
        password: 'test'
      }
      const fakeError = {
        isAxiosError: true,
        response: {
          status: 401
        }
      }

      const axiosStub = sinon.stub(axios, 'post').rejects(fakeError)

      try {
        await login(fakeLoginData)
        expect.fail('Expected an error to be thrown')
      } catch (error: any) {
        expect(error.message).to.equal(
          'Invalid credentials. Please check your email and password.'
        )
      } finally {
        axiosStub.restore()
      }
    })

    it('should throw generic error on other errors', async () => {
      const fakeLoginData = {
        email: 'user@kainos.com',
        password: 'user'
      }
      const fakeError = new Error('Some other error')

      const axiosStub = sinon.stub(axios, 'post').rejects(fakeError)
      try {
        await login(fakeLoginData)
        expect.fail('Expected an error to be thrown')
      } catch (error: any) {
        expect(error.message).to.equal(
          'Could not login. Please try again later.'
        )
      } finally {
        axiosStub.restore()
      }
    })
  })
})
