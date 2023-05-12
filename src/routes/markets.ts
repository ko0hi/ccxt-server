import { Router } from 'express'
import { checkRequiredParameters, executeCcxtMethod, initCcxtClientForRest } from '../utils/ccxt'
import { CcxtServerRequest } from '../types/ccxt'

const router = Router()

interface MyTradesRequest extends CcxtServerRequest {
  query: {
    exchangeId: string
  }
}

router.get('/', async (req: MyTradesRequest, res) => {
  const exchangeId = req.exchangeId
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
