import { Router } from 'express'
import { wrap } from 'module'
import { loginCotroller, registerController } from '~/controller/users.controller'
import { loginValidator, registerValidator } from '~/middlewares/users.middeware'
import { wrapAsync } from '~/utils/handler'

const userRouter = Router()

/**
 * des: Register a new user
 * method: POST
 * path: users/register
 * body: {username, email, password, confirm_password}
 */
userRouter.post('/register', registerValidator, wrapAsync(registerController))

/**
 * des: đăng nhập
 * path: /users/login
 * method: POST
 * body: {email, password}
 */
userRouter.post('/login', loginValidator, wrapAsync(loginCotroller))
export default userRouter
