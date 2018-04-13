import jwt from 'jsonwebtoken'
import Configuration from '../Configuration'

class TokenHelper {
  static getTokenOptions() {
    return {
      algorithms: 'RS512',
      issuer: 'Authentication Service'
    }
  }

  static fetchToken(request) {
    if (request['authorization']) {
      let tokenComponents = this.extractToken(request['authorization'])

      if (tokenComponents[0].toUpperCase() == 'BEARER') {
        return tokenComponents[1]
      }
      else {
        return null
      }
    }

    return request['token']
  }

  static extractToken(bearerToken) {
    return bearerToken.trim().split(' ')
  }

  static verify(headers) {
    return new Promise(resolve => {
      jwt.verify(TokenHelper.fetchToken(headers), Configuration.getJwtPublicKey(), this.getTokenOptions())
      resolve()
    })
  }
}

export default TokenHelper