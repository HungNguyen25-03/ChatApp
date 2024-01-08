import { Router } from 'express'
import { wrap } from 'module'
import { loginCotroller, registerController } from '~/controller/users.controller'
import { registerValidator } from '~/middlewares/users.middeware'
import { wrapAsync } from '~/utils/handler'

const userRouter = Router()

/**
 * des: Register a new user
 * method: POST
 * path: users/register
 * body: {username, email, password, confirm_password}
 */
userRouter.post('/register', registerValidator, wrapAsync(registerController))

export default userRouter
