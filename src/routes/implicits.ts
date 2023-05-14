import { Router } from 'express'
import { apiKeySecretMiddleware } from '../middlewares/authorization'
import { checkRequiredParameters, executeCcxtMethod, initCcxtClientForRest } from '../utils/ccxt'
import { CcxtServerRequest } from '../types/ccxt'

const router = Router()

interface ImplicitApiRequest extends CcxtServerRequest {
  query: {
    method: string
    [key: string]: any
  }
  body: {
    [key: string]: any
  }
}

const handleRequest = async (req: ImplicitApiRequest, res) => {
  const exchangeId = req.exchangeId
  const { method, ...otherQueryParams } = req.query
  const otherBodyParams = req.body
  const { apiKey, secret } = req

  Promise.resolve()
    .then(() => checkRequiredParameters({ exchangeId, method }))
    .then(() => initCcxtClientForRest(exchangeId, method, { apiKey, secret }))
    .then(exchange => executeCcxtMethod(exchange, method, { ...otherQueryParams, ...otherBodyParams }))
    .then(result => res.status(200).json(result))
    .catch(error => res.status(400).send(error.toString()))
    .finally(() => res.end())
}

router.get('/public', apiKeySecretMiddleware, handleRequest)
router.post('/public', apiKeySecretMiddleware, handleRequest)
router.put('/public', apiKeySecretMiddleware, handleRequest)
router.delete('/public', apiKeySecretMiddleware, handleRequest)
router.get('/private', apiKeySecretMiddleware, handleRequest)
router.post('/private', apiKeySecretMiddleware, handleRequest)
router.put('/private', apiKeySecretMiddleware, handleRequest)
router.delete('/private', apiKeySecretMiddleware, handleRequest)

export default router
