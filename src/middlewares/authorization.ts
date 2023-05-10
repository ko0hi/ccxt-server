import { NextFunction, Request, Response } from 'express'
import { getApiKeys, hasApiKeys } from '../utils/apiKeys'

export interface ApiKeySecretRequest extends Request {
  apiKey?: string
  secret?: string
  query: {
    exchangeId: string
  }
}

/**
 *
 * const response = await fetch('http://your_server_url/myTrades?exchangeId=exchangeId&symbol=symbol', {
 *   headers: {
 *     'Authorization': `Basic ${btoa(apiKey + ':' + secret)}`
 *   }
 * });
 *
 */
export function apiKeySecretMiddleware(req: ApiKeySecretRequest, res: Response, next: NextFunction) {
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
      const { exchangeId } = req.query
      const apiKeys = getApiKeys()
      if (!apiKeys.hasOwnProperty(exchangeId)) {
        res
          .status(401)
          .send(
            `No authorization header, and also API key and secret for exchange ${exchangeId} in a given apis json file.`
          )
        return
      }
      const { apiKey, secret } = apiKeys[exchangeId]
      req.apiKey = apiKey
      req.secret = secret
    } else {
      res.status(401).send('Neither authorization header nor CCXT_SERVER_APIS environment variable')
      return
    }
  }

  next()
}
