import databaseService from '~/services/database.services'
import { NextFunction, Request, Response } from 'express'

import { USERS_MESSAGES } from '~/constants/message'
import messageService from '~/services/messages.services'

export const addMessageController = async (req: Request, res: Response, next: NextFunction) => {
  const { from, to, content } = req.body
  const result = await messageService.addMessage(from, to, content)
  return res.status(200).json({
    result: result,
    status: 200
  })
}

export const getAllMessageController = async (req: Request, res: Response, next: NextFunction) => {
  const { from, to } = req.body
  const result = await messageService.getAllMessage(from, to)
  return res.status(200).json({
    result: result,
    status: 200
  })
}
