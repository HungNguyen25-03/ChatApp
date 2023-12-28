import User from '~/model/schema/User.schema'
import databaseService from './database.services'

class UserService {
  async register(payload: { name: string; email: string; password: string }) {
    const { name, email, password } = payload
    const result = await databaseService.user.insertOne(
      new User({
        name,
        email,
        password
      })
    )
    return result
  }

  async checkEmailExist(email: string) {
    const user = await databaseService.user.findOne({ email })
    return Boolean(user)
  }
}

const userService = new UserService()
export default userService
