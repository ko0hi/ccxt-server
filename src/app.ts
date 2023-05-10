import express, { Application } from 'express'
import cors from 'cors'
import routes from './routes'

const app: Application = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// API Routes
app.use('/api', routes)

// Error Handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong')
})

export default app
