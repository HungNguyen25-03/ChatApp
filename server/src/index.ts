import express, { NextFunction, Request, Response } from 'express'
import http from 'http' // Import HTTP module
import { Socket, Server as SocketIOServer } from 'socket.io' // Import Socket.IO
import databaseService from './services/database.services'
import { config } from 'dotenv'
import userRouter from './routes/users.routes'
import cors from 'cors'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import messageRouter from './routes/messages.routes'
import { on } from 'events'
config()

const app = express()
const server = http.createServer(app) // Create HTTP server
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Allow all origins (customize as needed)
    methods: ['GET', 'POST']
  }
})

databaseService.connect()
app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/message', messageRouter)

app.use(defaultErrorHandler)
const onlineUsers = new Map()
// Socket.IO connection
io.on('connection', (socket: Socket) => {
  console.log('a user connected:', socket.id)
  const chatSocket = socket

  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id)
  })

  socket.on('send-message', (msg) => {
    const sendUserSocket = onlineUsers.get(msg.to)
    console.log(msg)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('receive-message', msg.content)
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  // You can add more event listeners here
})

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server on port ${process.env.PORT || 4000}`)
})
