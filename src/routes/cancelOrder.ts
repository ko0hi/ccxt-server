import { Router } from 'express'
import { apiKeySecretMiddleware } from '../middlewares/authorization'
import { checkRequiredParameters, executeCcxtMethod, initCcxtClientForRest } from '../utils/ccxt'
import { CcxtServerRequest } from '../types/ccxt'

const router = Router()

interface OrdersRequest extends CcxtServerRequest {
  body: {
    id: string
    symbol: string
  }
}

router.post('/', apiKeySecretMiddleware, async (req: OrdersRequest, res) => {
  const exchangeId = req.exchangeId
  const { id, symbol } = req.body
  const { apiKey, secret } = req
  const method = 'cancelOrder'

  Promise.resolve()
    .then(() => checkRequiredParameters({ exchangeId, id, symbol }))
    .then(() => initCcxtClientForRest(exchangeId, method, { apiKey, secret }))
    .then(exchange => executeCcxtMethod(exchange, method, id, symbol))
    .then(result => res.status(200).json(result))
    .catch(error => res.status(400).send(error.toString()))
    .finally(() => res.end())
})

export default router
