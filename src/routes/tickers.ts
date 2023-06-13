import { Router } from 'express'
import { apiKeySecretMiddleware } from '../middlewares/authorization'
import { checkRequiredParameters, executeCcxtMethod, initCcxtClientForRest } from '../utils/ccxt'
import { CcxtServerRequest } from '../types/ccxt'

const router = Router()

interface OrdersRequest extends CcxtServerRequest {
  query: {
    symbol?: string
  }
}

router.get('/', async (req: OrdersRequest, res) => {
  const exchangeId = req.exchangeId

  const { symbol } = req.query
  const method = 'fetchTicker'

  Promise.resolve()
    .then(() => checkRequiredParameters({ exchangeId }))
    .then(() => initCcxtClientForRest(exchangeId, method))
    .then(exchange => executeCcxtMethod(exchange, method, symbol))
    .then(result => res.status(200).json(result))
    .catch(error => res.status(400).send(error.toString()))
    .finally(() => res.end())
})

export default router
