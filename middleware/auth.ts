import { type Request, type Response, type NextFunction } from 'express'

export default function authMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const hasValidToken = req.path === '/begin' || req.path === '/register' || (req.session.token?.length ?? 0) > 0

  if (hasValidToken) {
    next()
  } else {
    res.redirect('/begin')
  }
}
