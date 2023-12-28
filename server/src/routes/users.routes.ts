import { Router } from 'express'
import { loginCotroller, registerController } from '~/controller/users.controller'
import { registerValidator } from '~/middlewares/users.middeware'

const userRouter = Router()

/**
 * des: Register a new user
 * method: POST
 * path: users/register
 * body: {username, email, password, confirm_password}
 */
userRouter.post('/register', registerValidator, registerController)

export default userRouter
