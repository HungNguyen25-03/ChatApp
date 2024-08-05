import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/message'
import Message from '~/model/schema/Message.schema'

class MessageService {
  async addMessage(from: string, to: string, content: string) {
    await databaseService.message.insertOne(
      new Message({
        from: new ObjectId(from),
        to: new ObjectId(to),
        content
      })
    )
    return {
      message: USERS_MESSAGES.ADD_MESSAGE_SUCCESS
    }
  }

  async getAllMessage(from: string, to: string) {
    try {
      const messages = await databaseService.message
        .find({
          $or: [
            { from: new ObjectId(from), to: new ObjectId(to) },
            { from: new ObjectId(to), to: new ObjectId(from) }
          ]
        })
        .sort({ updated_at: 1 })
        .toArray()

      const userMessage = messages.map((message) => {
        return {
          fromSelf: message.from.toString() === from,
          content: message.content
        }
      })
      return userMessage
    } catch (err) {
      console.log(err)
    }
  }
}

const messageService = new MessageService()
export default messageService
