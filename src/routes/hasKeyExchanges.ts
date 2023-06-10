import { Request, Router } from 'express'
import { getApiKeys } from '../utils/apiKeys'

const router = Router()

router.get('/', async (req: Request, res) => {
  Promise.resolve()
    .then(() => getApiKeys())
    .then(keys => (keys === null ? [] : Object.keys(keys)))
    .then(hasKeyExchanges => res.status(200).json(hasKeyExchanges))
    .catch(error => res.status(400).send(error.toString()))
    .finally(() => res.end())
})

export default router
