import { Response, Router } from 'express'
import { apiKeySecretMiddleware } from '../middlewares/authorization'
import { checkRequiredParameters, executeCcxtMethod, initCcxtClientForRest } from '../utils/ccxt'
import { CcxtServerRequest } from '../types/ccxt'

const router = Router()

interface CreateOrderRequest extends CcxtServerRequest {
  body: {
    exchangeId: string
    symbol: string
    type: string
    side: string
    amount: string
    price?: string
    [key: string]: any
  }
}

router.post('/', apiKeySecretMiddleware, async (req: CreateOrderRequest, res: Response) => {
  const exchangeId = req.exchangeId
  const { symbol, type, side, amount, price, ...otherParams } = req.body
  const { apiKey, secret } = req

  Promise.resolve()
    .then(() => checkRequiredParameters({ exchangeId, symbol, type, side, amount }))
    .then(() => initCcxtClientForRest(exchangeId, 'createOrder', { apiKey, secret }))
    .then(exchange => executeCcxtMethod(exchange, 'createOrder', symbol, type, side, amount, price, otherParams))
    .then(result => res.status(200).json(result))
    .catch(error => res.status(400).send(error.toString()))
    .finally(() => res.end())
})

export default router
