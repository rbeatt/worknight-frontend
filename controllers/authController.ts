import { type Request, type Response } from 'express'
import { type Login } from '../models/auth'
import { login } from '../services/authService'

export const loginGet = async (req: Request, res: Response): Promise<void> => {
  res.render('login', {
    error: null,
    fieldData: null
  })
}

export const loginPost = async (req: Request & { session: { token?: string } }, res: Response): Promise<void> => {
  const loginData: Login = req.body
  try {
    req.session.token = await login(loginData)
    res.redirect('/')
  } catch (error) {
    req.session.token = undefined
    res.render('login', {
      error,
      fieldData: loginData
    })
  }
}
