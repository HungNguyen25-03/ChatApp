import { ObjectId } from 'mongodb'

export default class Message {
  _id?: ObjectId
  from: ObjectId
  to: ObjectId
  content: string
  created_at?: Date
  updated_at?: Date
  constructor(message: Message) {
    const date = new Date()
    this._id = message._id || new ObjectId()
    this.from = message.from
    this.to = message.to
    this.content = message.content
    this.created_at = message.created_at || date
    this.updated_at = message.updated_at || date
  }
}
