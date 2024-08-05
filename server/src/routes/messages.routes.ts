import { Router } from 'express'
import { addMessageController, getAllMessageController } from '~/controller/messages.controller'
import { loginValidator, registerValidator } from '~/middlewares/users.middeware'
import { wrapAsync } from '~/utils/handler'

const messageRouter = Router()

/**
 * des: Register a new user
 * method: POST
 * path: users/register
 * body: {username, email, password, confirm_password}
 */
messageRouter.post('/addMessage', wrapAsync(addMessageController))

messageRouter.post('/getAllMessage', wrapAsync(getAllMessageController))

export default messageRouter
