import express, { NextFunction, Request, Response } from 'express'
import databaseService from './services/database.services'
import { config } from 'dotenv'
import userRouter from './routes/users.routes'
import cors from 'cors'
import { defaultErrorHandler } from './middlewares/error.middlewares'
config()

const app = express()

databaseService.connect()
app.use(express.json())
app.use(cors())

app.use('/users', userRouter)

app.use(defaultErrorHandler)

app.listen(process.env.PORT, () => {
  console.log('Server on port 4000')
})
