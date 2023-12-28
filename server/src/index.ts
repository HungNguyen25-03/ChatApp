import express from 'express'
import databaseService from './services/database.services'
import { config } from 'dotenv'
import userRouter from './routes/users.routes'
config()
const app = express()
databaseService.connect()
app.use(express.json())
app.use('/users', userRouter)

app.listen(process.env.PORT, () => {
  console.log('Server on port 4000')
})
