import { expect } from 'chai'
import sinon from 'sinon'
import { loginGet, loginPost } from '../../controllers/authController'
import * as authService from '../../services/authService'

describe('AuthController', () => {
  describe('loginGet', () => {
    it('should render login page', async () => {
      const mockReq = {} as any
      const mockRes = { render: sinon.spy() } as any

      await loginGet(mockReq, mockRes)

      const expectedRenderCallArgs = [
        'login',
        {
          error: null,
          fieldData: null
        }
      ]
      expect(mockRes.render.calledOnceWithExactly(...expectedRenderCallArgs)).to.equal(true)
    })
  })

  describe('loginPost', () => {
    it('should set session token and redirect on successful login', async () => {
      const fakeLoginData = {
        email: 'user@kainos.com',
        password: 'user'
      }
      const mockReq = {
        body: fakeLoginData,
        session: {
          token: null
        }
      } as any
      const mockRes = { redirect: sinon.spy() } as any
      const authServiceStub = sinon
        .stub(authService, 'login')
        .resolves('token')
      await loginPost(mockReq, mockRes)

      expect(mockReq.session.token).to.equal('token')

      const expectedRedirectArgs = ['/']
      expect(mockRes.redirect.calledOnceWithExactly(...expectedRedirectArgs)).to.equal(true)

      authServiceStub.restore()
    })

    it('should render login page with error on unsuccessful login', async () => {
      const fakeLoginData = {
        email: 'test@kainos.com',
        password: 'test'
      }
      const mockReq = {
        body: fakeLoginData,
        session: {
          token: null
        }
      } as any
      const mockRes = { render: sinon.spy() } as any
      const authServiceStub = sinon
        .stub(authService, 'login')
        .rejects(
          new Error(
            'Invalid credentials. Please check your email and password.'
          )
        )

      await loginPost(mockReq, mockRes)

      expect(mockReq.session.token).to.equal(undefined)

      const expectedRenderCallArgs = [
        'login',
        {
          error: sinon.match.instanceOf(Error),
          fieldData: fakeLoginData
        }
      ]
      expect(mockRes.render.calledOnceWithExactly(...expectedRenderCallArgs)).to.equal(true)

      authServiceStub.restore()
    })
  })
})
