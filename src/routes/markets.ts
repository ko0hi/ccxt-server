import { Request, Router } from 'express'
import { ApiKeySecretRequest } from '../middlewares/authorization'
import { checkRequiredParameters, executeCcxtMethod, initCcxtClientForRest } from '../utils/ccxt'

const router = Router()

interface MyTradesRequest extends Request {
  query: {
    exchangeId: string
  }
}

router.get('/', async (req: MyTradesRequest & ApiKeySecretRequest, res) => {
  const { exchangeId } = req.query
  const method = 'fetchMarkets'

  Promise.resolve()
    .then(() => checkRequiredParameters({ exchangeId }))
    .then(() => initCcxtClientForRest(exchangeId, method, {}))
    .then(exchange => executeCcxtMethod(exchange, method))
    .then(result => res.status(200).json(result))
    .catch(error => res.status(400).send(error.toString()))
    .finally(() => res.end())
})

export default router
