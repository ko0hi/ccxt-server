import express, { Application } from 'express'
import cors from 'cors'
import routes from './routes'
import { logRequestMiddleware, logResponseMiddleware } from './middlewares/logging'

const app: Application = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// API Routes
app.use('/api', logRequestMiddleware, logResponseMiddleware, routes)

export default app
