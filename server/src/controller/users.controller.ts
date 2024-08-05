import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/model/schema/User.requests'
import User from '~/model/schema/User.schema'
import { USERS_MESSAGES } from '~/constants/message'

export const loginCotroller = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await userService.login(user_id.toString())

  return res.status(200).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result: result,
    status: 200
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await userService.register(req.body)
  console.log(result)
  return res.status(200).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result: result,
    status: 200
  })
}

export const getAllUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  // const user_id = id as ObjectId
  const result = await userService.getAllUser(id)
  console.log(result.length)

  return res.status(200).json({
    // message: USERS_MESSAGES.GET_ALL_USER_SUCCESS,
    result: result,
    status: 200
  })
}

export const setAvatarController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { avatar } = req.body
  const result = await userService.setAvatar(id, avatar)

  return res.status(200).json({
    result: result,
    status: 200
  })
}
