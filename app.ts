import express, { type Express, type Request, type Response } from 'express'
import path from 'path'
import nunjucks from 'nunjucks'
import { router } from './routes/routes'
import session from 'express-session'
import authMiddleware from './middleware/auth'
import crypto from 'crypto'

const app: Express = express()

const appViews = path.join(__dirname, '/views/')

const nunjucksConfig = {
  autoescape: true,
  noCache: true,
  express: app
}

nunjucks.configure(appViews, nunjucksConfig)

app.set('view engine', 'html')

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

const generateRandomSecret = (): string => {
  return crypto.randomBytes(32).toString('hex')
}

const secret = generateRandomSecret()

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000, httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' }
  })
)

declare module 'express-session' {
  interface SessionData {
    token: string
  }
}

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
  console.log('Server listening on port 3000.')
})

app.use(router)

app.use(authMiddleware)

app.get('/', (req: Request, res: Response) => {
  res.render('index', {})
})
