import RefreshToken from '~/model/schema/RefreshToken.schema'
import User from '~/model/schema/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/model/schema/User.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/message'

class UserService {
  private signAccessToken(user_Id: string) {
    return signToken({
      payload: { user_Id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
    })
  }

  private signRefreshToken(user_Id: string) {
    return signToken({
      payload: { user_Id, token_type: TokenType.RefreshToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN }
    })
  }

  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }

  async register(payload: RegisterReqBody) {
    const result = await databaseService.user.insertOne(
      new User({
        ...payload,
        password: hashPassword(payload.password)
      })
    )

    const user_id = result.insertedId.toString()

    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(user_id)
    await databaseService.refreshToken.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refreshToken })
    )
    return { accessToken, refreshToken }
  }

  async checkEmailExist(email: string) {
    const user = await databaseService.user.findOne({ email })
    return Boolean(user)
  }

  async login(user_id: string) {
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(user_id)
    await databaseService.refreshToken.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refreshToken })
    )

    const user = await databaseService.user.findOne({ _id: new ObjectId(user_id) })

    return { accessToken, refreshToken, user }
  }

  async getAllUser(user_id: string) {
    const allUser = await databaseService.user.find().toArray()
    const result = allUser.filter((user) => user._id.toString() !== user_id)
    console.log(result.length)
    return result
  }

  async setAvatar(user_id: string, avatar: string) {
    await databaseService.user.updateOne({ _id: new ObjectId(user_id) }, [{ $set: { avatar: avatar } }])
    return {
      message: USERS_MESSAGES.SET_AVATAR_SUCCESS
    }
  }
}

const userService = new UserService()
export default userService
