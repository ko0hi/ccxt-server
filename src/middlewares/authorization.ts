import { Request, Response, NextFunction } from 'express'

export interface ApiKeySecretRequest extends Request {
  apiKey?: string
  secret?: string
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

  if (!authHeader) {
    res.status(401).send('Missing Authorization header')
    return
  }

  const [type, credentials] = authHeader.split(' ')

  if (type !== 'Basic') {
    res.status(401).send('Invalid Authorization type')
    return
  }

  const [apiKey, secret] = Buffer.from(credentials, 'base64').toString('utf-8').split(':')

  req.apiKey = apiKey
  req.secret = secret

  next()
}
