import { Request, Router } from 'express'
import { apiKeySecretMiddleware, ApiKeySecretRequest } from '../middlewares/authorization'
import { checkRequiredParameters, executeCcxtMethod, initCcxtClientForRest } from '../utils/ccxt'

const router = Router()

interface MyTradesRequest extends Request {
  query: {
    exchangeId: string
    symbol: string
  }
}

router.get('/', apiKeySecretMiddleware, async (req: MyTradesRequest & ApiKeySecretRequest, res) => {
  const { exchangeId, symbol } = req.query
  const { apiKey, secret } = req
  const method = 'fetchMyTrades'

  Promise.resolve()
    .then(() => checkRequiredParameters({ exchangeId, symbol }))
    .then(() => initCcxtClientForRest(exchangeId, method, { apiKey, secret }))
    .then(exchange => executeCcxtMethod(exchange, method, symbol))
    .then(result => res.status(200).json(result))
    .catch(error => res.status(400).send(error.toString()))
    .finally(() => res.end())
})

export default router
