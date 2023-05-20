import { NextFunction, Response } from 'express'
import { getApiKeys, hasApiKeys } from '../utils/apiKeys'
import { CcxtServerRequest } from '../types/ccxt'

/**
 *
 * const response = await fetch('http://your_server_url/myTrades?exchangeId=exchangeId&symbol=symbol', {
 *   headers: {
 *     'Authorization': `Basic ${btoa(apiKey + ':' + secret)}`
 *   }
 * });
 *
 */
export function apiKeySecretMiddleware(req: CcxtServerRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const [type, credentials] = authHeader.split(' ')

    if (type !== 'Basic') {
      res.status(401).send('Invalid Authorization type')
      return
    }

    const [apiKey, secret] = Buffer.from(credentials, 'base64').toString('utf-8').split(':')

    req.apiKey = apiKey
    req.secret = secret
  } else {
    if (hasApiKeys()) {
      const exchangeId = req.exchangeId

      const apiKeys = getApiKeys()
      if (!apiKeys.hasOwnProperty(exchangeId)) {
        res
          .status(401)
          .send(
            `There is no authorization header provided, and the API key and secret for the ${exchangeId} exchange are also missing from the provided APIs JSON file.`
          )
        return
      }
      const { apiKey, secret } = apiKeys[exchangeId]
      req.apiKey = apiKey
      req.secret = secret
    } else {
      res
        .status(401)
        .send('Authorization header is missing and the CCXT_SERVER_APIS environment variable is not present.')
      return
    }
  }

  next()
}
