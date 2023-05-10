import { NextFunction, Response } from 'express'
// apiKeySecretMiddleware.test.js
import { apiKeySecretMiddleware, ApiKeySecretRequest } from './authorization'
import * as apiKeysModule from '../utils/apiKeys'

describe('apiKeySecretMiddleware', () => {
  let req: ApiKeySecretRequest
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {
      headers: {},
      query: {
        exchangeId: 'testExchange',
      },
    } as unknown as ApiKeySecretRequest

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response

    next = jest.fn()
  })

  it('should call next when valid authorization header is provided', () => {
    const apiKey = 'testApiKey'
    const secret = 'testSecret'
    req.headers.authorization = `Basic ${Buffer.from(`${apiKey}:${secret}`).toString('base64')}`

    apiKeySecretMiddleware(req, res, next)

    expect(req.apiKey).toBe(apiKey)
    expect(req.secret).toBe(secret)
    expect(next).toHaveBeenCalled()
  })

  it('should send a 401 response when invalid authorization type is provided', () => {
    req.headers.authorization = 'Bearer some_token'

    apiKeySecretMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.send).toHaveBeenCalledWith('Invalid Authorization type')
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next with API key and secret from file when no authorization header is provided', () => {
    const apiKey = 'testApiKey'
    const secret = 'testSecret'
    jest.spyOn(apiKeysModule, 'hasApiKeys').mockReturnValue(true)
    jest.spyOn(apiKeysModule, 'getApiKeys').mockReturnValue({ testExchange: { apiKey: apiKey, secret: secret } })

    apiKeySecretMiddleware(req, res, next)

    expect(req.apiKey).toBe(apiKey)
    expect(req.secret).toBe(secret)
    expect(next).toHaveBeenCalled()
  })

  it('should send a 401 response when no authorization header and no API key and secret in file', () => {
    jest.spyOn(apiKeysModule, 'hasApiKeys').mockReturnValue(true)
    jest.spyOn(apiKeysModule, 'getApiKeys').mockReturnValue({})

    apiKeySecretMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.send).toHaveBeenCalledWith(
      'No authorization header, and also API key and secret for exchange testExchange in a given apis json file.'
    )
    expect(next).not.toHaveBeenCalled()
  })
})
