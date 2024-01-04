import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/model/schema/User.requests'

export const loginCotroller = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await userService.register(req.body)
    console.log(result)
    return res.status(200).json({
      message: 'Register successfully',
      result: result
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Register failed',
      error: err
    })
  }
}
