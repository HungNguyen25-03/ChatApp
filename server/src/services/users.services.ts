import User from '~/model/schema/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/model/schema/User.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'

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

  async register(payload: RegisterReqBody) {
    const result = await databaseService.user.insertOne(
      new User({
        ...payload,
        password: hashPassword(payload.password)
      })
    )

    const user_Id = result.insertedId.toString()

    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(user_Id),
      this.signRefreshToken(user_Id)
    ])
    return { accessToken, refreshToken }
  }

  async checkEmailExist(email: string) {
    const user = await databaseService.user.findOne({ email })
    return Boolean(user)
  }
}

const userService = new UserService()
export default userService
